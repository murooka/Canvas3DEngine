/**
 * 用語
 * viewMatrix : ビュー変換行列
 ** view : 視点
 ** target : 注視点
 *
 * projectionMatrix : 透視変換行列
 *
 * screenMatrix : スクリーン変換行列
 *
 * translate : 平行移動
 * rotate    : 軸を指定しての回転
 * scale     : 拡大・縮小
 *
 * 方向ベクトルも位置ベクトルも両方Vectorクラスで表現する
 * prefixにVecもしくはVector  をつけたら方向ベクトル
 *         PosもしくはPositionをつけたら位置ベクトル
 *
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
 * @class 擬似3Dを実現するためのCanvasクラス
 * TODO: 名前変えたほうがいいかも
 * 
 * @property {Canvas}  canvas  描画するキャンバスへの参照
 * @property {CanvasRenderingContext2D} ctx キャンバスのコンテキストへの参照
 * @property {number}  width   キャンバスの横幅
 * @property {number}  height  キャンバスの縦幅
 * @property {Model[]} objects 描画する3Dオブジェクトモデルの配列
 * @property {Camera}  camera  視点管理用のカメラ
 * @property {Matrix}  screenMatrix スクリーン変換行列
 * @property {Matrix}  transformationMatrix ワールド変換、透視変換、スクリーン変換行列を合成した変換行列
 */

/**
 * @constructor
 * @param {String} canvas_id 利用するcanvas(DOM)のid
 */
var Canvas3D = function (canvas_id) {
    this.canvas = document.getElementById(canvas_id);
    this.ctx = this.canvas.getContext('2d');

    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.setScreenMatrix(this.width, this.height);

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
        nearZ,
        farZ,
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

    var camera = this.camera;
    var objects = this.objects.sort(function (a, b) {
        if (a.depth===b.depth) {
            return camera.viewMatrix.mul(a.center).z - camera.viewMatrix.mul(b.center).z;
        } else {
            return b.depth - a.depth;
        }
    });

    var count = 0;
    for (var i=0; i<objects.length; i++) {
        if (objects[i].draw(this)) count++;
    }
    console.log('draw ' + count + ' models');
};
Canvas3D.prototype.setScreenMatrix = function (width, height) {
    this.screenMatrix =
        Matrix.translating(width/2, height/2, 0).compose(
            Matrix.scaling(width/2, height/2, 1));
};
Canvas3D.prototype.updateMatrix = function () {
    this.camera.updateMatrix();
    this.transformationMatrix = this.screenMatrix.compose(this.camera.matrix);
};





/**
 * @class ワールド座標系上での物の見方を表すカメラクラス
 *
 * @property {Matrix} viewMatrix       ビュー変換行列
 * @property {Matrix} projectionMatrix 透視変換行列
 * @property {Matrix} matrix           ビュー変換と透視変換行列を合成した変換行列
 */
/**
 * @constructor
 * @param {Vector} view   視点座標
 * @param {Vector} target 注視点座標
 * @param {Vecotr} upper  上方向ベクトル
 * @param {number} fovyX  横方向の視野角
 * @param {number} nearZ  物が見える範囲のうち、最も近い距離
 * @param {number} farZ   物が見える範囲のうち、最も遠い距離
 * @param {number} apect_ratio カメラ画面のheight/widthの値
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
 * @param {number} rad 回転量
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

        var viewMatrix = new Matrix([
            xaxis.x, xaxis.y, xaxis.z, -xaxis.dot(view),
            yaxis.x, yaxis.y, yaxis.z, -yaxis.dot(view),
            zaxis.x, zaxis.y, zaxis.z, -zaxis.dot(view),
                  0,       0,       0,                1
        ]);

        return viewMatrix;
    })();

    var projectionMatrix = (function () {
        var sx = 1 / Math.tan(fovyX/2);
        var sy = sx / aspect_ratio;
        var sz = farZ / (farZ-nearZ);
        var mz = -sz*nearZ;

        var projectionMatrix = new Matrix([
            sx,  0,  0,  0,
             0, sy,  0,  0,
             0,  0, sz, mz,
             0,  0,  1,  1
        ]);

        return projectionMatrix;
    })();

    this.viewMatrix = viewMatrix;
    this.projectionMatrix = projectionMatrix;
    this.matrix = projectionMatrix.compose(viewMatrix);
};





/**
 * @class RGB表現の色クラス
 */
/**
 * @constructor
 * @param {number} r rgbのr要素
 * @param {number} g rgbのg要素
 * @param {number} b rgbのb要素
 */
var Color = function (r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
};
Color.prototype.toHexString = function () {
    var to2digitHex = function (value) {
        var str = Math.floor(value).toString(16);
        if (str.length===1) str = '0' + str;
        return str;
    };

    return to2digitHex(this.r) + to2digitHex(this.g) + to2digitHex(this.b);
};
/**
 * r, g, bをg, b, rにする
 * ポリゴンの裏面の色を得るためのテスト的な関数
 */
Color.prototype.negative = function () {
    return new Color(this.g, this.b, this.r);
};






/**
 * Canvas3D上で表示するモデル(PolygonやBillboard)は、draw関数とcenter、depthプロパティを実装する必要がある
 * draw関数は描画対象のCanvas3Dを引数として受け取り、必要ならば変換行列を利用してレンダリングコンテキストへ描画を行う
 * centerプロパティはZソートを行うためのモデルの中心座標である
 * depthプロはティは、centerとは無関係に描画順序を決定するための値である
 * depthが小さいほど手前に表示され、大きいほど奥に表示される
 * デフォルトではdepth = 5とする
 */
var AbstractModel = function () {
};
AbstractModel.prototype.draw = function () {
    throw this + '#draw : draw is not implemented yet';
};

/**
 * @class Canvas3Dで利用する多角形クラス
 */
/**
 * 1つの面に対して1つの色情報を持つ
 * NOTICE: 引数のverticesは同一平面上に無いと歪む可能性がある
 * NOTICE: verticesは反時計回りに指定する
 * @param {Vector[]} vertices 多角形の頂点座標の配列
 * @param {Color}    color    多角形の色
 */
var Polygon = extend(AbstractModel, function (vertices, color) {
    this.vertices = vertices;
    this.color = color;

    this.updateCenter();
    this.depth = 5;
});
Polygon.prototype.move = function (v) {
    for (var i=0; i<this.vertices.length; i++) {
        this.vertices[i] = this.vertices[i].add(v);
    }
    this.updateCenter();
};
Polygon.prototype.rotateX = function (center, rad) {
    for (var i=0; i<this.vertices.length; i++) {
        this.vertices[i] = this.vertices[i].sub(center).rotateX(rad).add(center);
    }
    this.updateCenter();
};
Polygon.prototype.rotateY = function (center, rad) {
    for (var i=0; i<this.vertices.length; i++) {
        this.vertices[i] = this.vertices[i].sub(center).rotateY(rad).add(center);
    }
    this.updateCenter();
};
Polygon.prototype.rotateZ = function (center, rad) {
    for (var i=0; i<this.vertices.length; i++) {
        this.vertices[i] = this.vertices[i].sub(center).rotateZ(rad).add(center);
    }
    this.updateCenter();
};
Polygon.prototype.updateCenter = function () {
    var sumVector = new Vector(0,0,0);
    for (var i=0; i<this.vertices.length; i++) {
        sumVector = sumVector.add(this.vertices[i]);
    }
    this.center = sumVector.div(this.vertices.length);
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

    // 視点より手前にあるものは描画しない
    var isHidden = (function () {
        for (i=0; i<len; i++) if (verts[i].z < 0) return false;
        return true;
    })();
    if (isHidden) return false;

    // 透視変換
    for (i=0; i<len; i++) {
        verts[i] = canvas.camera.projectionMatrix.mul(verts[i]);
    }

    // スクリーン変換
    for (i=0; i<len; i++) {
        verts[i] = canvas.screenMatrix.mul(verts[i]);
    }

    // canvasの外側に位置する場合は表示しない
    var isOutside = (function () {
    })();
    if (isOutside) return false;

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
    if (isRight) return false;

    for (i=0; i<len; i++) {
        if (verts[i].x > 0) {
            isLeft = false;
            break;
        }
    }
    if (isLeft) return false;

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
    if (isBelow) return false;

    // 裏側から見たポリゴンは表示しない
    if (cross2D(verts[1].x-verts[0].x,
                verts[1].y-verts[0].y,
                verts[2].x-verts[0].x,
                verts[2].y-verts[0].y) > 0) {
        return false;
    }
    if (cross2D(verts[2].x-verts[1].x,
                verts[2].y-verts[1].y,
                verts[3].x-verts[1].x,
                verts[3].y-verts[1].y) > 0) {
        return false;
    }
    if (cross2D(verts[3].x-verts[2].x,
                verts[3].y-verts[2].y,
                verts[0].x-verts[2].x,
                verts[0].y-verts[2].y) > 0) {
        return false;
    }
    if (cross2D(verts[0].x-verts[3].x,
                verts[0].y-verts[3].y,
                verts[1].x-verts[3].x,
                verts[1].y-verts[3].y) > 0) {
        return false;
    }

    // 光の計算をしておく
    var center = (function () {
        var posSum = new Vector(0, 0, 0);
        for (var i=0; i<verts.length; i++) {
            posSum = posSum.add(verts[i]);
        }
        return posSum.div(verts.length);
    })();

    var norm = (function () {
        var v1 = verts[1].sub(center);
        var v2 = verts[2].sub(center);

        return v1.cross(v2).unit();
    })();

    var lightPower = norm.dot(center.unit());
    var diffusePower = 0.7;
    var diffuseCoefficient = 0.8;
    var ambientPower = 0.5;

    var colorR = Math.min(255, (diffusePower * diffuseCoefficient * lightPower + ambientPower) * this.color.r);
    var colorG = Math.min(255, (diffusePower * diffuseCoefficient * lightPower + ambientPower) * this.color.g);
    var colorB = Math.min(255, (diffusePower * diffuseCoefficient * lightPower + ambientPower) * this.color.b);

    var color = '#';
    color += new Color(colorR, colorG, colorB).toHexString();

    ctx.strokeStyle = color;
    for (i=0; i<len; i++) {
        ctx.beginPath();
        ctx.moveTo(verts[i].x, verts[i].y);
        ctx.lineTo(verts[(i+1)%len].x, verts[(i+1)%len].y);
        ctx.stroke();
    }

    ctx.fillStyle = color;
    ctx.beginPath();
    for (i=0; i<len; i++) {
        var x = verts[i].x;
        var y = verts[i].y;
        ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();

    return true;
};






/**
 * @class 複数のPolygonを内包するオブジェクトモデルクラス
 * @description 各Polygonの移動・回転を一括して行う
 */
/*
 * @param {Polygon[]}  polygons Polygonの配列
 * @param {Vector}     center   world座標系での原点からの相対ベクトル
 */
var Model = extend(AbstractModel, function (polygons, center) {
    this.polygons = polygons;
    this.center = center;
    this.depth = 5;
});
Model.prototype.move = function (v) {
    for (var i=0; i<this.polygons.length; i++) {
        this.polygons[i].move(v);
    }
    this.center = this.center.add(v);
};
Model.prototype.rotateX = function (rad) {
    for (var i=0; i<this.polygons.length; i++) {
        this.polygons[i].rotateX(this.center, rad);
    }
};
Model.prototype.rotateY = function (rad) {
    for (var i=0; i<this.polygons.length; i++) {
        this.polygons[i].rotateY(this.center, rad);
    }
};
Model.prototype.rotateZ = function (rad) {
    for (var i=0; i<this.polygons.length; i++) {
        this.polygons[i].rotateZ(this.center, rad);
    }
};
Model.prototype.draw = function (canvas) {
    for (var i=0; i<this.polygons.length; i++) {
        this.polygons[i].draw(canvas);
    }
};






/**
 * @class テクスチャを貼ったPolygonを扱うクラス
 */
/**
 * @constructor
 * @description verticesは画像の左下に対応する点から、反時計回りで指定する
 * @param {Vector[]}  vertices ポリゴンの頂点座標の配列
 * @param {String}    src      テクスチャに使う画像ファイル名
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

    this.updateCenter();
    this.depth = 5;
});
Texture.prototype.move = function (v) {
    for (var i=0; i<this.vertices.length; i++) {
        this.vertices[i] = this.vertices[i].add(v);
    }
    this.updateCenter();
    this.worldMatrix = Matrix.translating(v.x, v.y, v.x).compose(this.worldMatrix);
};
Texture.prototype.rotateX = function (center, rad) {
    for (var i=0; i<this.vertices.length; i++) {
        this.vertices[i] = this.vertices[i].sub(center).rotateX(rad).add(center);
    }
    this.updateCenter();
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
    this.updateCenter();
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
    this.updateCenter();
    this.worldMatrix = 
        Matrix.translating(center.x, center.y, center.z).compose(
            Matrix.rotatingZ(rad).compose(
                Matrix.translating(-center.x, -center.y, -center.z).compose(
                    this.worldMatrix
    )));
};
Texture.prototype.draw = function (canvas) {
    if (!this.loaded) return false;

    var ctx = canvas.ctx;

    var i;
    var verts = [];
    for (i=0; i<this.vertices.length; i++) {
        var v = this.vertices[i];
        v = canvas.transformationMatrix.mul(v);
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

    // スクリーン座標系から、テクスチャ画像の座標系への変換行列
    // ポリゴン描画時に行うビュー変換、透視変換、スクリーン変換それぞれの逆変換を逆順で行う
    var inverse = 
        Matrix.scaling(this.image.width/this.width, this.image.height/this.height, 1).compose(
            Matrix.translating(-this.originX, -this.originY, 0).compose(
                this.worldMatrix.invert().compose(
                    canvas.transformationMatrix.invert())));
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

    return true;
};






/**
 * @class アフィン変換を用いて高速にテクスチャを描画するクラス
 * TODO: 継承関係を直す
 */
/**
 * @constructor
 * @description verticesは画像の左下に対応する点から、反時計回りで指定する
 * @param {Vector[]}  vertices ポリゴンの頂点座標の配列
 * @param {String}    src      テクスチャに使う画像ファイル名
 */
var SmoothTexture = extend(Texture, function (vertices, src) {
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

    this.updateCenter();
    this.depth = 5;
});
SmoothTexture.prototype.rotateX = function (rad, center) {
    for (var i=0; i<this.vertices.length; i++) {
        this.vertices[i] = this.vertices[i].sub(center).rotateX(rad).add(center);
    }
    this.updateCenter();
};
SmoothTexture.prototype.rotateY = function (rad, center) {
    for (var i=0; i<this.vertices.length; i++) {
        this.vertices[i] = this.vertices[i].sub(center).rotateY(rad).add(center);
    }
    this.updateCenter();
};
SmoothTexture.prototype.rotateZ = function (rad, center) {
    for (var i=0; i<this.vertices.length; i++) {
        this.vertices[i] = this.vertices[i].sub(center).rotateZ(rad).add(center);
    }
    this.updateCenter();
};
SmoothTexture.prototype.draw = function (canvas) {
    if (!this.loaded) return false;

    var ctx = canvas.ctx;
    
    // world + left or right + top or bottom
    var wltImage = this.vertices[3],
        wlbImage = this.vertices[0],
        wrbImage = this.vertices[1],
        wrtImage = this.vertices[2];

    var isHidden = (function () {
    })();

    if (isHidden) return false;

    // ビュー・透視・スクリーン変換行列
    var matrix =
        canvas.screenMatrix.compose(
            canvas.camera.projectionMatrix.compose(
                canvas.camera.viewMatrix));

    // screen + left or right + top or bottom
    var sltImage = matrix.mul(wltImage),
        slbImage = matrix.mul(wlbImage),
        srbImage = matrix.mul(wrbImage),
        srtImage = matrix.mul(wrtImage);


    /**
     * @function
     * @description 画像をアフィン変換のみを用いて台形へ変換し描画する
     * @description 変換後の台形が極端に歪んでいる場合は分割を行い、この関数を再帰的に読んで描画する
     * @param {Image}  image           描画する画像
     * @param {Vector} wlt wlb wrb wrt ワールド座標系上の、画像の左上、左下、右下、右上の座標
     * @param {Vector} slt slb srb srt 変換後のスクリーン座標系上の、画像の左上、左下、右下、右上の座標
     * @param {number} depth           この関数の再帰呼び出しの回数、最初の呼び出しでは1を指定
     * @param {number} dx              画像を描画する部分のx軸方向のオフセット
     * @param {number} dy              画像を描画する部分のy軸方向のオフセット
     * @param {number} dw              画像を描画する部分の横幅
     * @param {number} dh              画像を描画する部分の縦幅
     */
    var divideAndDrawImage = function (image, wlt, wlb, wrb, wrt, slt, slb, srb, srt, depth, sx, sy, sw, sh) {
        // ベクトルや距離には、prefixにwかsを付けworld座標系かscreen座標系かを区別する
        // 座標の位置は、(world or screen) + (left or right or center) + (top or bottom or center)を組み合わせて表現する
        // 例: world-left-top -> wlp

        var hypotenuse = function (a, b) {
            return Math.sqrt(a*a+b*b);
        };

        var sBottomWidth = hypotenuse(srb.x-slb.x, srb.y-slb.y),
            sTopWidth    = hypotenuse(srt.x-slt.x, srt.y-slt.y),
            sLeftHeight  = hypotenuse(slt.x-slb.x, slt.y-slb.y),
            sRightHeight = hypotenuse(srt.x-srb.x, srt.y-srb.y);

        var widthRatio  = sBottomWidth / sTopWidth,
            heightRatio = sRightHeight / sLeftHeight;

        if (widthRatio  < 1) widthRatio  = 1 / widthRatio;
        if (heightRatio < 1) heightRatio = 1 / heightRatio;

        // var splittingHorizontal = Math.abs(sBottomWidth - sTopWidth)   > 4,
            // splittingVertical   = Math.abs(sRightHeight - sLeftHeight) > 4;
        var splittingHorizontal = widthRatio > 1.01,
            splittingVertical   = heightRatio > 1.01;


            var wct, wcb, wlc, wrc, wcc; 
            var sct, scb, slc, src, scc;
        if (depth <= 2 || (depth <=4 && splittingHorizontal && splittingVertical)) {
            wct = wlt.add(wrt).div(2);
            wcb = wlb.add(wrb).div(2);
            wlc = wlt.add(wlb).div(2);
            wrc = wrt.add(wrb).div(2);
            wcc = wlt.add(wrb).div(2);

            sct = matrix.mul(wct);
            scb = matrix.mul(wcb);
            slc = matrix.mul(wlc);
            src = matrix.mul(wrc);
            scc = matrix.mul(wcc);

            divideAndDrawImage(image, wlt, wlc, wcc, wct, slt, slc, scc, sct, depth+1,      sx, sy     , sw/2, sh/2); // 左上部分
            divideAndDrawImage(image, wlc, wlb, wcb, wcc, slc, slb, scb, scc, depth+1,      sx, sy+sh/2, sw/2, sh/2); // 左下部分
            divideAndDrawImage(image, wct, wcc, wrc, wrt, sct, scc, src, srt, depth+1, sx+sw/2, sy     , sw/2, sh/2); // 右上部分
            divideAndDrawImage(image, wcc, wcb, wrb, wrc, scc, scb, srb, src, depth+1, sx+sw/2, sy+sh/2, sw/2, sh/2); // 右下部分
        } else if (depth <= 6 && splittingVertical) {
            wct = wlt.add(wrt).div(2);
            wcb = wlb.add(wrb).div(2);

            sct = matrix.mul(wct);
            scb = matrix.mul(wcb);

            divideAndDrawImage(image, wlt, wlb, wcb, wct, slt, slb, scb, sct, depth+1,      sx, sy, sw/2, sh); // 左側部分
            divideAndDrawImage(image, wct, wcb, wrb, wrt, sct, scb, srb, srt, depth+1, sx+sw/2, sy, sw/2, sh); // 右側部分
        } else if (depth <= 6 && splittingHorizontal) {
            wlc = wlt.add(wlb).div(2);
            wrc = wrt.add(wrb).div(2);

            slc = matrix.mul(wlc);
            src = matrix.mul(wrc);

            divideAndDrawImage(image, wlt, wlc, wrc, wrt, slt, slc, src, srt, depth+1, sx,      sy, sw, sh/2); // 上側部分
            divideAndDrawImage(image, wlc, wlb, wrb, wrc, slc, slb, srb, src, depth+1, sx, sy+sh/2, sw, sh/2); // 下側部分
        } else {

            var maxX = Math.max(slt.x, slb.x, srb.x, srt.x),
                minX = Math.min(slt.x, slb.x, srb.x, srt.x),
                maxY = Math.max(slt.y, slb.y, srb.y, srt.y),
                minY = Math.min(slt.y, slb.y, srb.y, srt.y);

            var scaleX   = (maxX-minX) / sw,
                scaleY   = (maxY-minY) / sh,
                skewingX = (srt.y-slt.y) / (srt.x-slt.x),
                skewingY = (slb.x-slt.x) / (slb.y-slt.y);
            

            ctx.transform(1, 0, 0, 1, slt.x, slt.y);
            ctx.transform(1, skewingX, skewingY, 1, 0, 0);
            ctx.transform(scaleX, 0, 0, scaleY, 0, 0);
            ctx.drawImage(image, Math.floor(sx), Math.floor(sy), Math.ceil(sw), Math.ceil(sh), 0, 0, Math.ceil(sw), Math.ceil(sh));
            // ctx.drawImage(image, Math.floor(sx), Math.floor(sy), Math.ceil(sw), Math.ceil(sh), slt.x, slt.y, srt.x, slb.y);

            ctx.setTransform(1, 0, 0, 1, 0, 0);
        }
    };

    divideAndDrawImage(this.image, wltImage, wlbImage, wrbImage, wrtImage, sltImage, slbImage, srbImage, srtImage, 1, 0, 0, this.image.width, this.image.height);

    return true;
};





/**
 * @class billboardを表すクラス
 *
 */
/**
 * @param {Vector} center world座標系でのBillboardの中心座標
 * @param {number} width  world座標系でのBillboardの横幅
 * @param {number} height world座標系でのBillboardの縦幅
 * @param {String} src    Billboardで使う画像のファイル名
 */
var Billboard = extend(AbstractModel, function (center, width, height, src) {
    var image = new Image();
    image.src = src + '?' + new Date().getTime();

    this.width = width;
    this.height = height;
    this.src = src;
    this.image = image;

    var self = this;
    image.onload = function () {
        self.loaded = true;
    };

    this.center = center;
    this.depth = 5;
});
Billboard.prototype.draw = function (canvas) {
    var ctx = canvas.ctx;

    if (!this.loaded) return false;


    var projectionAndScreenMatrix = canvas.screenMatrix.compose(canvas.camera.projectionMatrix);

    var vCenter = canvas.camera.viewMatrix.mul(this.center);
    if (vCenter.z > 0) return false;
    // TODO: 座標系のチェック
    var vRightTop = vCenter.sub(new Vector(this.width/2, this.height/2, 0));

    var vpCenter = projectionAndScreenMatrix.mul(vCenter);
    var vpRightTop = projectionAndScreenMatrix.mul(vRightTop);
    var vpHalfWidth = vpRightTop.x - vpCenter.x;
    var vpHalfHeight = vpRightTop.y - vpCenter.y;

    var scaleX = vpHalfWidth  / this.image.width  * 2;
    var scaleY = vpHalfHeight / this.image.height * 2;

    ctx.setTransform(scaleX, 0, 0, scaleY, 0, 0);

    ctx.drawImage(this.image, (vpCenter.x-vpHalfWidth)/scaleX, (vpCenter.y-vpHalfHeight)/scaleY);

    ctx.setTransform(1, 0, 0, 1, 0, 0);

    return true;
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
        return new Model(polygons, new Vector(0, 0, 0));
    })();
    // canvas.addObject(model);

    for (var i=-10; i<10; i++) {
        for (var j=-10; j<10; j++) {
            var polygon = new Polygon([
                new Vector(    i*50, -20,     j*50),
                new Vector((i+1)*50, -20,     j*50),
                new Vector((i+1)*50, -20, (j+1)*50),
                new Vector(    i*50, -20, (j+1)*50)
            ], new Color(128, 255, 128));
            polygon.depth = 8;
            canvas.addObject(polygon);
        }
    }


    for (i=0; i<100; i++) {
        var x = (Math.floor(Math.random()*20)-10)*25;
        var z = (Math.floor(Math.random()*20)-10)*25;
        var billboard = new Billboard(new Vector(x, -3, z), 50, 35, './image/tree.png');
        canvas.addObject(billboard);
    }

    var texture = new SmoothTexture([
        new Vector(-30, -20, 0),
        new Vector( 30, -20, 0),
        new Vector( 30,  20, 0),
        new Vector(-30,  20, 0),
    ], './image/so-nya.png');
    canvas.addObject(texture);



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
        // console.log(e.keyCode);
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

