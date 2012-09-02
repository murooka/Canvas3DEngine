/**
 * 用語
 * viewMatrix : ビュー変換行列
 ** view : 視点
 ** target : 注視点
 *
 * projectionMatrix : 透視変換行列
 *
 * viewportMatrix : ビューポート変換行列
 * 
 */



/**
 * クラスを継承させるための汎用関数
 * @param {Object} s 親クラス
 * @param {Object} c 子クラス
 */
var extend = function (s, c) {
    var F = function () {};
    F.prototype = s.prototype;
    c.prototype = new F();
    c.prototype.__super__ = s.prototype;
    c.prototype.__super__.constructor = s;
    c.prototype.constructor = c;
    return c;
};

/**
 * 2次元ベクトルの外積を計算する汎用関数
 */
var cross2D = function (x1, y1, x2, y2) { return x1*y2 - x2*y1; };

/**
 * 擬似3Dを実現するためのCanvasクラス
 * TODO: 名前変えたほうがいいかも
 * @param {String} canvas_id 利用するcanvas(DOM)のid
 */
var Canvas3D = function (canvas_id) {
    this.canvas = document.getElementById(canvas_id);
    this.ctx = this.canvas.getContext('2d');

    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.setViewportMatrix(this.width, this.height);

    this.objects = [];

    var viewPosition   = new Vector(0, 0, -100),
        targetPosition = new Vector(0, 0, 0),
        upperVector    = new Vector(0, 1, 0),
        fovyX          = Math.PI/3,
        nearZ          = 0,
        farZ           = 100,
        aspect_ratio   = this.height / this.width;
    this.camera = new Camera(
        viewPosition,
        targetPosition,
        upperVector,
        fovyX,
        0,
        100,
        aspect_ratio
    );

    this.updateMatrix();
};
Canvas3D.prototype.addObject = function (o) {
    this.objects.push(o);
};
Canvas3D.prototype.update = function () {
    this.ctx.fillStyle = 'rgb(255, 255, 255)';
    this.ctx.fillRect(0, 0, this.width, this.height);

    var i;

    var size = 7;
    this.ctx.beginPath();
    this.ctx.moveTo(400+100, 300);
    for (i=0; i<=size; i++) {
        var sin = Math.sin(Math.PI*2/size*((i*3)%size));
        var cos = Math.cos(Math.PI*2/size*((i*3)%size));
        this.ctx.lineTo(400+cos*100, 300+sin*100);
    }
    this.ctx.stroke();

    var objects = this.objects;
    objects = objects.sort(function (a, b) {
        return a.depth - b.depth;
    });
    this.ctx.fillStyle = 'rgb(0, 0, 0)';

    var length = objects.length;
    for (i=0; i<length; i++) {
        objects[i].draw(this);
    }
};
Canvas3D.prototype.setViewportMatrix = function (width, height) {
    this.viewportMatrix = Matrix.translating(width/2, height/2, 0).compose(Matrix.scaling(width/2, height/2, 1));
};
Canvas3D.prototype.updateMatrix = function () {
    this.camera.updateMatrix();
    this.translatingMatrix = this.viewportMatrix.compose(this.camera.matrix);
};



/**
 * ワールド座標系上での物の見方を表すカメラクラス
 * @param {Vector} view   視点座標
 * @param {Vector} target 注視点座標
 * @param {Vecotr} upper  上方向ベクトル
 * @param {Number} fovyX  横方向の視野角
 * @param {Number} nearZ  物が見える範囲のうち、最も近い距離
 * @param {Number} farZ   物が見える範囲のうち、最も遠い距離
 * @param {Number} apect_ratio カメラ画面のheight/widthの値
 */
var Camera = function (view, target, upper, fovyX, nearZ, farZ, aspect_ratio) {
    this.view   = view;
    this.target = target;
    this.upper  = upper;
    this.fovyX  = fovyX;
    this.nearZ  = nearZ;
    this.farZ   = farZ;
    this.aspect_ratio = aspect_ratio;

    this.rotatingMatrix = new Matrix();

    this.updateMatrix();
};
/**
 * カメラの位置を移動させる
 * @param {Vector} v 移動させる方向ベクトル
 */
Camera.prototype.move = function (v) {
    var vector = this.rotatingMatrix.mul(v);
    this.view = this.view.add(vector);
    this.target = this.target.add(vector);
};
/**
 * Y軸を中心に反時計回りにカメラの向きを反時計回りに回転させる
 * @param {Number} rad 回転量
 */
Camera.prototype.rotateY = function (rad) {
    var lookingVec =  this.target.sub(this.view);
    lookingVec = Matrix.rotatingY(rad).mul(lookingVec);
    this.target = lookingVec.add(this.view);

    this.rotatingMatrix = Matrix.rotatingY(rad).compose(this.rotatingMatrix);
};
/**
 * カメラ情報に基づいて変換行列を更新する
 * 変換行列はビュー変換->透視変換を行う
 */
Camera.prototype.updateMatrix = function () {
    var view = this.view,
        target = this.target,
        upper  = this.upper,
        fovyX  = this.fovyX,
        nearZ  = this.nearZ,
        farZ   = this.farZ,
        aspect_ratio = this.aspect_ratio;

    var viewMatrix = (function () {
        var zaxis = view.sub(target).unit();
        var xaxis = upper.cross(zaxis).unit();
        var yaxis = zaxis.cross(xaxis).unit();

        var viewMatrix = new Matrix();

        viewMatrix.setAt(0, 0, xaxis.x);
        viewMatrix.setAt(0, 1, xaxis.y);
        viewMatrix.setAt(0, 2, xaxis.z);
        viewMatrix.setAt(0, 3, -xaxis.dot(view));

        viewMatrix.setAt(1, 0, yaxis.x);
        viewMatrix.setAt(1, 1, yaxis.y);
        viewMatrix.setAt(1, 2, yaxis.z);
        viewMatrix.setAt(1, 3, -yaxis.dot(view));

        viewMatrix.setAt(2, 0, zaxis.x);
        viewMatrix.setAt(2, 1, zaxis.y);
        viewMatrix.setAt(2, 2, zaxis.z);
        viewMatrix.setAt(2, 3, -zaxis.dot(view));

        viewMatrix.setAt(3, 3, 1);

        return viewMatrix;
    })();

    var projectionMatrix = (function () {
        var projectionMatrix = new Matrix();

        var sx = 1 / Math.tan(fovyX/2);
        var sy = sx / aspect_ratio;
        var sz = farZ / (farZ-nearZ);

        projectionMatrix.setAt(0, 0, sx);
        projectionMatrix.setAt(1, 1, sy);
        projectionMatrix.setAt(2, 2, sz);

        projectionMatrix.setAt(3, 2, 1);
        projectionMatrix.setAt(2, 3, -sz*nearZ);

        projectionMatrix.setAt(3, 3, 1);

        return projectionMatrix;
    })();

    this.viewMatrix = viewMatrix;
    this.projectionMatrix = projectionMatrix;
    this.matrix = projectionMatrix.compose(viewMatrix);
};


/**
 * RGB表現の色クラス
 * @param {Number} r rgbのr要素
 * @param {Number} g rgbのg要素
 * @param {Number} b rgbのb要素
 */
var Color = function (r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
};
Color.prototype.toHexString = function () {
    var digit2Hex = function (value) {
        var str = Math.floor(value).toString(16);
        if (str.length===1) str = '0' + str;
        return str;
    };

    return digit2Hex(this.r) + digit2Hex(this.g) + digit2Hex(this.b);
};
Color.prototype.hueBy = function (hue) {
    // TODO: 全然正しくない計算
    var h = 1 - (1-hue)*(1-hue);
    return new Color(this.r*h, this.g*h, this.b*h);
};
// r, g, bをg, b, rにする
// ポリゴンの裏面の色を得るためのテスト的な関数
Color.prototype.negative = function () {
    return new Color(this.g, this.b, this.r);
};


/**
 * Canvas3Dで利用する多角形クラス
 * 1つの面に対して1つの色情報を持つ
 * NOTICE: 引数のverticesは同一平面上に無いと歪む可能性がある
 * NOTICE: verticesは反時計回りに指定する
 * @param {Array} vertices 多角形の頂点座標の配列
 * @param {Color} color    多角形の色
 */
var Polygon = function (vertices, color) {
    this.vertices = vertices;
    this.color = color;
    this.updateDepth();
    this.wireEnabled = true;
};
Polygon.prototype.move = function (v) {
    for (var i=0; i<this.vertices.length; i++) {
        this.vertices[i] = this.vertices[i].add(v);
    }
    this.updateDepth();
};
Polygon.prototype.rotateX = function (center, rad) {
    for (var i=0; i<this.vertices.length; i++) {
        this.vertices[i] = this.vertices[i].sub(center).rotateX(rad).add(center);
    }
    this.updateDepth();
};
Polygon.prototype.rotateY = function (center, rad) {
    for (var i=0; i<this.vertices.length; i++) {
        this.vertices[i] = this.vertices[i].sub(center).rotateY(rad).add(center);
    }
    this.updateDepth();
};
Polygon.prototype.rotateZ = function (center, rad) {
    for (var i=0; i<this.vertices.length; i++) {
        this.vertices[i] = this.vertices[i].sub(center).rotateZ(rad).add(center);
    }
    this.updateDepth();
};
Polygon.prototype.updateDepth = function () {
    this.depth = 0;
    for (var i=0; i<this.vertices.length; i++) {
        this.depth += this.vertices[i].z;
    }
    this.depth = this.depth / this.vertices.length;
};
Polygon.prototype.toString = function () {
    var str = '[';
    for (var i=0; i<this.vertices.length; i++) str += this.vertices[i] + ',';
    str += ']';
    return str;
};
Polygon.prototype.draw = function (canvas) {
    var ctx = canvas.ctx;
    var len = this.vertices.length;
    var verts = new Array(len);

    // ビュー変換
    for (var i=0; i<len; i++) {
        verts[i] = canvas.camera.viewMatrix.mul(this.vertices[i]);
    }

    // 光の計算をしておく
    var center = (function () {
        var center = new Vector(0, 0, 0);
        for (var i=0; i<len; i++) {
            center = center.add(verts[i]);
        }
        return center.div(len);
    })();

    var norm = (function () {
        var v1 = verts[1].sub(center);
        var v2 = verts[2].sub(center);

        return v1.cross(v2).unit();
    })();

    var lightPower = norm.dot(center.unit());
    var lightSpecular = Math.pow(Math.max(lightPower, 0), 2);
    var diffusePower = 0.7;
    var diffuseCoefficient = 0.8;
    var ambientPower = 0.5;

    // var colorR = Math.min(255, 64 + this.color.r * lightPower + lightSpecular);
    // var colorG = Math.min(255, 64 + this.color.g * lightPower + lightSpecular);
    // var colorB = Math.min(255, 64 + this.color.b * lightPower + lightSpecular);
    var colorR = Math.min(255, (diffusePower * diffuseCoefficient * lightPower + ambientPower) * this.color.r);
    var colorG = Math.min(255, (diffusePower * diffuseCoefficient * lightPower + ambientPower) * this.color.g);
    var colorB = Math.min(255, (diffusePower * diffuseCoefficient * lightPower + ambientPower) * this.color.b);

    var isHidden = true;
    for (i=0; i<len; i++) {
        if (verts[i].z < 0) {
            isHidden = false;
            break;
        }
    }

    for (var i=0; i<len; i++) {
        // console.log(verts[i].toString());
    }


    if (isHidden) return;

    // 透視変換
    for (i=0; i<len; i++) {
        verts[i] = canvas.camera.projectionMatrix.mul(verts[i]);
    }

    // ビューポート変換
    for (i=0; i<len; i++) {
        verts[i] = canvas.viewportMatrix.mul(verts[i]);
    }

    // canvasの外側に位置する場合は表示しない
    var isRight = true,
        isLeft  = true,
        isBelow = true,
        isAbove = true;
    for (i=0; i<len; i++) {
        if (verts[i].x < canvas.width) {
            isRight = false;
            break;
        }
    }
    if (isRight) return;

    for (i=0; i<len; i++) {
        if (verts[i].x > 0) {
            isLeft = false;
            break;
        }
    }
    if (isLeft) return;

    for (i=0; i<len; i++) {
        if (verts[i].y > 0) {
            isAbove = false;
            break;
        }
    }
    if (isAbove) return;

    for (i=0; i<len; i++) {
        if (verts[i].y < canvas.height) {
            isBelow = false;
            break;
        }
    }
    if (isBelow) return;

    // 裏側から見たポリゴンは表示しない
    if (cross2D(verts[1].x-verts[0].x,
                verts[1].y-verts[0].y,
                verts[2].x-verts[0].x,
                verts[2].y-verts[0].y) > 0) {
        return;
    }
    if (cross2D(verts[2].x-verts[1].x,
                verts[2].y-verts[1].y,
                verts[3].x-verts[1].x,
                verts[3].y-verts[1].y) > 0) {
        return;
    }
    if (cross2D(verts[3].x-verts[2].x,
                verts[3].y-verts[2].y,
                verts[0].x-verts[2].x,
                verts[0].y-verts[2].y) > 0) {
        return;
    }
    if (cross2D(verts[0].x-verts[3].x,
                verts[0].y-verts[3].y,
                verts[1].x-verts[3].x,
                verts[1].y-verts[3].y) > 0) {
        return;
    }

    var color = '#';
    color += new Color(colorR, colorG, colorB).toHexString();

    ctx.strokeStyle = color;
    if (this.wireEnabled) {
        for (i=0; i<len; i++) {
            ctx.beginPath();
            ctx.moveTo(verts[i].x, verts[i].y);
            ctx.lineTo(verts[(i+1)%len].x, verts[(i+1)%len].y);
            ctx.stroke();
        }
    }

    // if (norm>=0) {
    //     color += this.color.hueBy(1-(1-norm)/2).toHexString();
    // } else {
    //     color += '888888';
    // }
    ctx.fillStyle = color;
    ctx.beginPath();
    for (i=0; i<len; i++) {
        var x = verts[i].x;
        var y = verts[i].y;
        ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
};


/*
 * 複数のPolygonを内包するオブジェクトモデルクラス
 * 各Polygonの移動・回転を一括して行う
 * @param {Array}  polygons Polygonの配列
 * @param {Vector} origin   world座標系での原点からの相対ベクトル
 */
var Model = function (polygons, origin) {
    this.polygons = polygons;
    this.origin = origin;
};
Model.prototype.move = function (v) {
    for (var i=0; i<this.polygons.length; i++) {
        this.polygons[i].move(v);
    }
    this.origin = this.origin.add(v);
};
Model.prototype.rotateX = function (rad) {
    for (var i=0; i<this.polygons.length; i++) {
        this.polygons[i].rotateX(this.origin, rad);
    }
};
Model.prototype.rotateY = function (rad) {
    for (var i=0; i<this.polygons.length; i++) {
        this.polygons[i].rotateY(this.origin, rad);
    }
};
Model.prototype.rotateZ = function (rad) {
    for (var i=0; i<this.polygons.length; i++) {
        this.polygons[i].rotateZ(this.origin, rad);
    }
};
Model.prototype.draw = function (canvas) {
    for (var i=0; i<this.polygons.length; i++) {
        this.polygons[i].draw(canvas);
    }
};


/**
 * テクスチャを貼ったPolygonを扱うクラス
 * verticesは画像の左下に対応する点から、反時計回りで指定する
 * @param {Array}  vertices ポリゴンの頂点座標の配列
 * @param {String} src      テクスチャに使う画像ファイル名
 */
var Texture = extend(Polygon, function (vertices, src) {
    var image = new Image();
    image.src = src + '?' + new Date().getTime();

    this.image = image;
    this.vertices = vertices;
    this.worldMatrix = new Matrix();
    this.loaded = false;

    this.originX = vertices[0].x;
    this.originY = vertices[0].y;
    this.width  = Math.abs(vertices[1].sub(vertices[0]).abs());
    this.height = Math.abs(vertices[2].sub(vertices[1]).abs());

    var canvas = document.getElementById('tmp_canvas');
    var ctx = canvas.getContext('2d');

    var self = this;
    image.onload = function () {
        ctx.drawImage(image, 0, 0);
        self.imageData = ctx.getImageData(0, 0, image.width, image.height);
        self.loaded = true;
    };

});
Texture.prototype.move = function (v) {
    for (var i=0; i<this.vertices.length; i++) {
        this.vertices[i] = this.vertices[i].add(v);
    }
    this.updateDepth();
    this.worldMatrix = Matrix.translating(v.x, v.y, v.x).compose(this.worldMatrix);
};
Texture.prototype.rotateX = function (center, rad) {
    for (var i=0; i<this.vertices.length; i++) {
        this.vertices[i] = this.vertices[i].sub(center).rotateX(rad).add(center);
    }
    this.updateDepth();
    this.worldMatrix = 
        Matrix.translating(center.x, center.y, center.z).compose(
            Matrix.rotatingX(rad).compose(
                Matrix.translating(-center.x, -center.y, -center.z).compose(
                    this.worldMatrix
    )));
};
Texture.prototype.rotateY = function (center, rad) {
    for (var i=0; i<this.vertices.length; i++) {
        this.vertices[i] = this.vertices[i].sub(center).rotateY(rad).add(center);
    }
    this.updateDepth();
    this.worldMatrix = 
        Matrix.translating(center.x, center.y, center.z).compose(
            Matrix.rotatingY(rad).compose(
                Matrix.translating(-center.x, -center.y, -center.z).compose(
                    this.worldMatrix
    )));
};
Texture.prototype.rotateZ = function (center, rad) {
    for (var i=0; i<this.vertices.length; i++) {
        this.vertices[i] = this.vertices[i].sub(center).rotateZ(rad).add(center);
    }
    this.updateDepth();
    this.worldMatrix = 
        Matrix.translating(center.x, center.y, center.z).compose(
            Matrix.rotatingZ(rad).compose(
                Matrix.translating(-center.x, -center.y, -center.z).compose(
                    this.worldMatrix
    )));
};
Texture.prototype.draw = function (canvas) {
    if (!this.loaded) return;

    var ctx = canvas.ctx;

    var i;
    var verts = [];
    for (i=0; i<this.vertices.length; i++) {
        var v = this.vertices[i];
        v = canvas.translatingMatrix.mul(v);
        verts.push(v);
    }

    var lx = verts[0].x,
        rx = verts[0].x,
        ty = verts[0].y,
        by = verts[0].y;
    for (i=1; i<verts.length; i++) {
        lx = Math.min(lx, verts[i].x);
        rx = Math.max(rx, verts[i].x);
        ty = Math.min(ty, verts[i].y);
        by = Math.max(by, verts[i].y);
    }

    var offsetX = Math.floor(lx),
        offsetY = Math.floor(ty),
        width  = Math.floor(rx - lx),
        height = Math.floor(by - ty);

    // テクスチャが表示される範囲を包括するような長方形で、ImageDataを確保
    var output = ctx.createImageData(width, height);
    var background = ctx.getImageData(offsetX, offsetY, width, height);
    var dout = output.data;
    var dback = background.data;

    // ビューポート座標系から、テクスチャ画像の座標系への変換行列
    // ポリゴン描画時に行うビュー変換、透視変換、ビューポート変換それぞれの逆変換を逆順で行う
    var inverse = 
        Matrix.scaling(this.image.width/this.width, this.image.height/this.height, 1).compose(
            Matrix.translating(-this.originX, -this.originY, 0).compose(
                this.worldMatrix.inverse().compose(
                    canvas.translatingMatrix.inverse())));
    var din = this.imageData.data;
    var contained = function (target, points) {
        var from = points[3],
            to   = points[0];
        var cross = cross2D(to.x-from.x, to.y-from.y, target.x-from.x, target.y-from.y);
        for (var i=0; i<3; i++) {
            from = points[i];
            to   = points[(i+1)%4];
            var otherCross = cross2D(to.x-from.x, to.y-from.y, target.x-from.x, target.y-from.y);
            if ((cross<0 && otherCross>0) || (cross>0 && otherCross<0)) return false;
        }
        return true;
    };
    var normal = verts[1].sub(verts[0]).cross(verts[2].sub(verts[0]));
    var calcZ = function (x, y) {
        var n = normal;
        var o = verts[0];
        return o.z - (n.x*(x-o.x) + n.y*(y-o.y)) / n.z;
    };
    for (var y=0; y<height; y++) {
        for (var x=0; x<width; x++) {
            var xx = offsetX + x;
            var yy = offsetY + y;
            var isContained = contained({x:xx, y:yy}, verts);

            if (isContained) {
                var zz = calcZ(xx, yy);
                var local = inverse.mul(new Vector(xx, yy, zz));
                var ix = Math.floor(local.x);
                var iy = Math.floor(local.y);

                for (i=0; i<4; i++) {
                    dout[(y*width+x)*4+i] = din[(iy*this.image.width+ix)*4+i];
                }
            } else {
                for (i=0; i<4; i++) {
                    dout[(y*width+x)*4+i] = dback[(y*width+x)*4+i];
                }
            }
        }
    }
    ctx.putImageData(output, offsetX, offsetY);

};


var canvasInit = function () {
    var canvas = new Canvas3D('canvas');

    var model = (function () {
        var polygons = [];
        for (var i=-10; i<10; i++) {
            for (var j=-10; j<10; j++) {
                var polygon = new Polygon([
                    new Vector(    i*50, -20,     j*50),
                    new Vector((i+1)*50, -20,     j*50),
                    new Vector((i+1)*50, -20, (j+1)*50),
                    new Vector(    i*50, -20, (j+1)*50)
                ], new Color(128, 255, 128));
                polygons.push(polygon);
            }
        }
        polygons.push(
            new Polygon([
                new Vector(-50, -20, 0),
                new Vector( 50, -20, 0),
                new Vector( 50,  30, 0),
                new Vector(-50,  30, 0),
            ], new Color(255, 0, 0))
        );
        polygons.push(
            new Polygon([
                new Vector( 50, -20,   0),
                new Vector( 50, -20, 100),
                new Vector( 50,  30, 100),
                new Vector( 50,  30,   0),
            ], new Color(255, 0, 0))
        );
        polygons.push(
            new Polygon([
                new Vector( 50, -20, 100),
                new Vector(-50, -20, 100),
                new Vector(-50,  30, 100),
                new Vector( 50,  30, 100),
            ], new Color(255, 0, 0))
        );
        polygons.push(
            new Polygon([
                new Vector(-50, -20, 100),
                new Vector(-50, -20,   0),
                new Vector(-50,  30,   0),
                new Vector(-50,  30, 100),
            ], new Color(255, 0, 0))
        );
        return new Model(polygons, new Vector(0, 0, 0));
    })();
    canvas.addObject(model);



    canvas.update();

    var dragging = false;
    var old_x, old_y;
    canvas.canvas.onmousedown = function (e) {
        dragging = true;
        old_x = e.clientX - canvas.canvas.offsetLeft;
        old_y = e.clientY - canvas.canvas.offsetTop;
    };
    canvas.canvas.onmouseup = function () {
        dragging = false;
    };
    canvas.canvas.onmousemove = function (e) {
        if (dragging) {
            var mouse_x = e.clientX - canvas.canvas.offsetLeft;
            var mouse_y = e.clientY - canvas.canvas.offsetTop;

            model.rotateY(-(mouse_x - old_x) / 100);
            canvas.update();

            old_x = mouse_x;
            old_y = mouse_y;
        }
    };
    document.onkeypress = function (e) {
        console.log(e.keyCode);
        switch (e.keyCode) {
            case 119: // 'w'
                canvas.camera.move(new Vector(0, 0, 10));
                canvas.updateMatrix();
                break;
            case 115: // 's'
                canvas.camera.move(new Vector(0, 0, -10));
                canvas.updateMatrix();
                break;
            case 97:  // 'a'
                canvas.camera.rotateY(-Math.PI/32);
                canvas.updateMatrix();
                break;
            case 100: // 'd'
                canvas.camera.rotateY(Math.PI/32);
                canvas.updateMatrix();
                break;
            case 106: // 'j'
                break;
            case 107: // 'k'
                break;
        }
        canvas.update();
    };
};

window.onload = canvasInit;

