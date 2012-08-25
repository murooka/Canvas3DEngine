var extend = function (s, c) {
    var F = function () {};
    F.prototype = s.prototype;
    c.prototype = new F();
    c.prototype.__super__ = s.prototype;
    c.prototype.__super__.constructor = s;
    c.prototype.constructor = c;
    return c;
};

var radianWithTwoPoint = function (p1, p2) {
    return Math.atan2(p1.dot(p2), p1.cross(p2));
};


// ３次元ベクトルを表すクラス
var Vector = function (x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = 1;
    this.v = [x, y, z, 1];
};
Vector.origin = function () {
    return new Vector(0, 0, 0);
};

Vector.prototype.add = function (other) {
    return new Vector(
        this.x+other.x,
        this.y+other.y,
        this.z+other.z
    );
};
Vector.prototype.sub = function (other) {
    return new Vector(
        this.x-other.x,
        this.y-other.y,
        this.z-other.z
    );
};
Vector.prototype.mul = function (other) {
    return new Vector(
        this.x/other,
        this.y/other,
        this.z/other
    );
};
Vector.prototype.div = function (other) {
    return new Vector(
        this.x/other,
        this.y/other,
        this.z/other
    );
};
Vector.prototype.dot = function (other) {
    return this.x*other.x + this.y*other.y + this.z*other.z;
};
Vector.prototype.cross = function (other) {
    return new Vector(
        this.y*other.z - this.z*other.y,
        this.z*other.x - this.x*other.z,
        this.x*other.y - this.y*other.x
    );
};
Vector.prototype.unit = function () {
    return this.div(this.abs());
};
Vector.prototype.sqabs = function () {
    return this.x*this.x + this.y*this.y + this.z*this.z;
};
Vector.prototype.abs = function () {
    return Math.sqrt(this.sqabs());
};
Vector.prototype.rotateX = function (rad) {
    var sin = Math.sin(rad),
        cos = Math.cos(rad);
    return new Vector(
        this.x,
        this.y*cos - this.z*sin,
        this.z*cos + this.y*sin
    );
};
Vector.prototype.rotateY = function (rad) {
    var sin = Math.sin(rad),
        cos = Math.cos(rad);
    return new Vector(
        this.x*cos + this.z*sin,
        this.y,
        this.z*cos - this.x*sin
    );
};
Vector.prototype.rotateZ = function (rad) {
    var sin = Math.sin(rad),
        cos = Math.cos(rad);
    return new Vector(
        this.x*cos - this.y*sin,
        this.y*cos + this.x*sin,
        this.z
    );
};
Vector.prototype.radian = function (axis) {
    if (axis.x===0 && axis.y===1 && axis.z===0) {
        var orig = new Vector(1, 0, 0);
        var orig2D = orig.to2D(axis);
        var this2D = this.to2D(axis);
        return radianWithTwoPoint(orig2D, this2D);
    }
};
Vector.prototype.toString = function () {
    return '(' + this.x.toFixed(2) + ',' + this.y.toFixed(2) + ',' + this.z.toFixed(2) + ',' + this.w.toFixed(2) + ')';
};


var Matrix = function () {
    this.m = new Array(Matrix.size*Matrix.size);
    for (var i=0; i<Matrix.size*Matrix.size; i++) this.m[i] = 0;
};
Matrix.size = 4;
Matrix.translating = function () {
    var x, y, z;
    if (arguments.length===1) {
        // 引数をVector型として処理
        var v = arguments[0];
        x = v.x;
        y = v.y;
        z = v.z;
    } else if (arguments.length===3) {
        // 引数をベクトルのx, y, z要素として処理
        x = arguments[0];
        y = arguments[1];
        z = arguments[2];
    }

    return new Matrix().set([
        1, 0, 0, x,
        0, 1, 0, y,
        0, 0, 1, z,
        0, 0, 0, 1,
    ]);
};
Matrix.rotatingX = function (rad) {
    var sin = Math.sin(rad);
    var cos = Math.cos(rad);
    return new Matrix().set([
        1,   0,   0, 0,
        0, cos,-sin, 0,
        0, sin, cos, 0,
        0,   0,   0, 1,
    ]);
};
Matrix.rotatingY = function (rad) {
    var sin = Math.sin(rad);
    var cos = Math.cos(rad);
    return new Matrix().set([
         cos, 0, sin, 0,
           0, 1,   0, 0,
        -sin, 0, cos, 0,
           0, 0,   0, 1,
    ]);
};
Matrix.rotatingZ = function (rad) {
    var sin = Math.sin(rad);
    var cos = Math.cos(rad);
    return new Matrix().set([
        cos,-sin, 0, 0,
        sin, cos, 0, 0,
          0,   0, 1, 0,
          0,   0, 0, 1,
    ]);
};
Matrix.scaling = function (x, y, z) {
    return new Matrix().set([
        x, 0, 0, 0,
        0, y, 0, 0,
        0, 0, z, 0,
        0, 0, 0, 1,
    ]);
};
Matrix.prototype.copy = function () {
    return new Matrix().set(this.m);
};
Matrix.prototype.set = function (ary) {
    for (var i=0; i<Matrix.size*Matrix.size; i++) this.m[i] = ary[i];
    return this;
};
Matrix.identity = function () {
    return new Matrix().set([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
};
Matrix.prototype.setAt = function (row, col, v) {
    this.m[row * Matrix.size + col] = v;
};
Matrix.prototype.getAt = function (row, col) {
    return this.m[row * Matrix.size + col];
};
Matrix.prototype.mul = function (other) {
    var v = [ 0, 0, 0, 0];
    for (var i=0; i<4; i++) {
        for (var j=0; j<4; j++) {
            v[i] += this.getAt(i, j) * other.v[j];
        }
    }
    return new Vector(v[0], v[1], v[2]);
};
Matrix.prototype.compose = function (other) {
    var mat = new Matrix();
    for (var i=0; i<4; i++) {
        for (var j=0; j<4; j++) {
            var a = 0;
            for (var k=0; k<4; k++) {
                a += this.getAt(i, k) * other.getAt(k, j);
            }
            mat.setAt(i, j, a);
        }
    }
    return mat;
};
Matrix.prototype.toString = function () {
    var str = '';
    for (var i=0; i<Matrix.size; i++) {
        var array = [];
        for (var j=0; j<Matrix.size; j++) {
            var v = this.getAt(i, j).toFixed(1);
            var size = 8 - v.length;
            for (var k=0; k<size; k++) v = ' ' + v;
            array.push(v);
        }
        str += '|' + array.join(',') + '|\n';
    }
    return str;
};
// ガウスの消去法
Matrix.prototype.inverse = function () {
    var i, j, k;
    var matrix = this.copy();
    var inverse = Matrix.identity();

    var mat = matrix.m;
    var inv = inverse.m;

    // 前進消去
    for (i=0; i<4-1; i++) {
        var e = mat[i*4+i];
        for (j=0; j<4; j++) {
            mat[i*4+j] = mat[i*4+j]/e;
            inv[i*4+j] = inv[i*4+j]/e;
        }
        for (j=i+1; j<4; j++) {
            var s = mat[j*4+i];
            for (k=0; k<4; k++) {
                mat[j*4+k] -= mat[i*4+k]*s;
                inv[j*4+k] -= inv[i*4+k]*s;
            }
        }
    }
    
    // 後進代入
    for (i=3; i>0; i--) {
        for (j=i-1; j>=0; j--) {
            var t = mat[j*4+i];
            for (k=0; k<4; k++) {
                mat[j*4+k] -= mat[i*4+k]*t;
                inv[j*4+k] -= inv[i*4+k]*t;
            }
        }
    }

    return inverse;
};


var Canvas3D = function (canvas_id) {
    this.canvas = document.getElementById(canvas_id);
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.ctx = this.canvas.getContext('2d');
    this.objects = [];
    this.viewportMatrix = Matrix.translating(this.width/2, this.height/2, 0);
    this.setViewportMatrix(this.width, this.height);
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
Canvas3D.prototype.setViewMatrix = function (view, target, upper) {
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

    this.viewMatrix = viewMatrix;
};
Canvas3D.prototype.setProjectionMatrix = function (fovyX, nearZ, farZ) {
    var projectionMatrix = new Matrix();

    var sx = 1 / Math.tan(fovyX/2);
    var sy = sx;
    var sz = farZ / (farZ-nearZ);

    projectionMatrix.setAt(0, 0, sx);
    projectionMatrix.setAt(1, 1, sy);
    projectionMatrix.setAt(2, 2, sz);
    projectionMatrix.setAt(2, 3, 1);
    projectionMatrix.setAt(3, 2, -sz*nearZ);
    projectionMatrix.setAt(3, 3, 1);

    this.projectionMatrix = projectionMatrix;
};
Canvas3D.prototype.setViewportMatrix = function (width, height) {
    this.viewportMatrix = Matrix.translating(width/2, height/2, 0);
};
Canvas3D.prototype.composeMatrix = function () {
    this.translatingMatrix = this.viewportMatrix.compose(this.projectionMatrix).compose(this.viewMatrix);
};


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


var Polygon = function (vertices, color) {
    // TODO: verticesの正当性のチェック
    this.vertices = vertices;
    this.color = color;
    this.updateDepth();
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
Polygon.prototype.normal = function () {
    var verts = this.vertices;
    var v1 = verts[1].sub(verts[0]);
    var v2 = verts[2].sub(verts[0]);

    return v1.cross(v2).unit();
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

    for (var i=0; i<len; i++) {
        // ビュー変換
        // verts[i] = canvas.viewMatrix.mul(this.vertices[i]);
        
        // 透視変換
        // verts[i] = canvas.projectionMatrix.mul(verts[i]);

        // ビューポート変換
        // verts[i] = canvas.viewportMatrix.mul(verts[i]);

        // ビュー変換・透視変換・ビューポート変換
        verts[i] = canvas.translatingMatrix.mul(this.vertices[i]);
    }

    for (i=0; i<len; i++) {
        ctx.beginPath();
        ctx.moveTo(verts[i].x, verts[i].y);
        ctx.lineTo(verts[(i+1)%len].x, verts[(i+1)%len].y);
        ctx.stroke();
    }

    // var color = Math.abs(Math.floor(this.normal().z * 128)) + 64;
    // color = Math.max(color, 0).toString(16);
    // if (color.length===1) color = ' ' + color;
    // ctx.fillStyle = '#' + color + color + color;
    var color = '#';
    var norm = this.normal().z;
    if (norm>=0) {
        color += this.color.hueBy(norm).toHexString();
    } else {
        color += this.color.negative().hueBy(-norm).toHexString();
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
};


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

var Texture = extend(Polygon, function (vertices, src) {
    var image = new Image();
    image.src = src;

    var canvas = document.getElementById('tmp_canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    var ctx = canvas.getContext('2d');

    ctx.drawImage(image, 0, 0);

    this.imageData = ctx.getImageData(0, 0, image.width, image.height);
    this.image = image;
    this.vertices = vertices;
    this.worldMatrix = Matrix.identity();
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
    var inverse = this.worldMatrix.inverse().compose(canvas.translatingMatrix.inverse());
    var din = this.imageData.data;
    var cross2D = function (x1, y1, x2, y2) {
        return x1*y2 - x2*y1;
    };
    var normal = verts[1].sub(verts[0]).cross(verts[2].sub(verts[0]));
    var calcZ = function (x, y) {
        var n = normal;
        var o = verts[0];
        return o.z - (n.x*(x-o.x) + n.y*(y-o.y)) / n.z;
    };
    for (var y=0; y<height; y++) {
        for (var x=0; x<width; x++) {
            var v0, v1;
            var xx = offsetX + x;
            var yy = offsetY + y;
            // 表示範囲の内外判定
            v0 = verts[3];
            v1 = verts[0];
            var sign = cross2D(v1.x-v0.x, v1.y-v0.y, xx-v0.x, yy-v0.y);
            var isIn = true;
            for (i=0; i<3; i++) {
                v0 = verts[i];
                v1 = verts[(i+1)%4];
                var cross = cross2D(v1.x-v0.x, v1.y-v0.y, xx-v0.x, yy-v0.y);

                if ((sign<0 && cross>0) || (sign>0 && cross<0)) {
                    isIn = false;
                }
            }

            if (isIn) {
                var zz = calcZ(xx, yy);
                var world = inverse.mul(new Vector(xx, yy, zz));
                var ix = Math.floor(world.x / 97 * this.image.width);
                var iy = Math.floor(world.y / 97 * this.image.height);

                dout[(y*width+x)*4+0] = din[(iy*this.image.width+ix)*4+0];
                dout[(y*width+x)*4+1] = din[(iy*this.image.width+ix)*4+1];
                dout[(y*width+x)*4+2] = din[(iy*this.image.width+ix)*4+2];
                dout[(y*width+x)*4+3] = din[(iy*this.image.width+ix)*4+3];
            } else {
                dout[(y*width+x)*4+0] = dback[(y*width+x)*4+0];
                dout[(y*width+x)*4+1] = dback[(y*width+x)*4+1];
                dout[(y*width+x)*4+2] = dback[(y*width+x)*4+2];
                dout[(y*width+x)*4+3] = dback[(y*width+x)*4+3];
            }
        }
    }
    ctx.putImageData(output, offsetX, offsetY);

};


var canvasInit = function () {
    var canvas = new Canvas3D('canvas');
    canvas.setViewMatrix(
        new Vector(  0,   0,-100),
        new Vector(  0,   0,   0),
        new Vector(  0,   1,   0)
    );
    canvas.setProjectionMatrix(Math.PI/3, 0, 100);
    canvas.composeMatrix();

    // var ringVerts = function (r) {
    //     var verts = [];
    //     var size = 64;
    //     var x, y;
    //     for (var i=0; i<size+1; i++) {
    //         x = Math.cos(Math.PI/size*2*i) * r;
    //         y = Math.sin(Math.PI/size*2*i) * r;
    //         verts.push(new Vector(x, y, 0));
    //     }
    //     for (var j=size; j>=0; j--) {
    //         x = Math.cos(Math.PI/size*2*j) * (r-10);
    //         y = Math.sin(Math.PI/size*2*j) * (r-10);
    //         verts.push(new Vector(x, y, 0));
    //     }
    //     return verts;
    // };
    // var model = new Model([
    //     new Polygon(ringVerts(100))
    // ], center);
    // var model = new Model([
    //     new Polygon([
    //         new Vector( 100, 100, 0),
    //         new Vector(-100, 100, 0),
    //         new Vector(-100,-100, 0),
    //         new Vector( 100,-100, 0),
    //     ], new Color(191, 191, 255))
    // ], center);
    var model = new Model([
        new Texture([
            new Vector(   0,   0, 0),
            new Vector(  97,   0, 0),
            new Vector(  97,  97, 0),
            new Vector(   0,  97, 0),
        ], 'image/so-nya.png')
    ], new Vector(48.5, 48.5, 0));
    // model.move(new Vector(-100, -100, 0));
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
        console.log(e.charCode);
        switch (e.charCode) {
            case 120: // 'x'
                break;
            case 122: // 'z'
                break;
        }
    };
    var counter = 0;
    setInterval(function () {
        counter += 0.01;
        var sin = Math.sin(counter);
        var cos = Math.cos(counter);
        model.rotateY(cos*Math.PI*0.01);
        model.rotateZ(sin*Math.PI*0.01);
        canvas.update();
    }, 20);
};

window.onload = canvasInit;

