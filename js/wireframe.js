Object.prototype.isPoint2D = function () { return false; };
Object.prototype.isPoint3D = function () { return false; };
Object.prototype.isMatrix = function () { return false; };


var radianWithTwoPoint = function (p1, p2) {
    return Math.atan2(p1.dot(p2), p1.cross(p2));
};


// ３次元ベクトルを表すクラス
var Point3D = function (x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = 1;
    this.v = [x, y, z, 1];
};
Point3D.origin = new Point3D(0, 0, 0);
Point3D.prototype.isPoint3D = function () { return true; };
Point3D.prototype.add = function (other) {
    return new Point3D(
        this.x+other.x,
        this.y+other.y,
        this.z+other.z
    );
};
Point3D.prototype.sub = function (other) {
    return new Point3D(
        this.x-other.x,
        this.y-other.y,
        this.z-other.z
    );
};
Point3D.prototype.mul = function (other) {
    return new Point3D(
        this.x/other,
        this.y/other,
        this.z/other
    );
};
Point3D.prototype.div = function (other) {
    return new Point3D(
        this.x/other,
        this.y/other,
        this.z/other
    );
};
Point3D.prototype.dot = function (other) {
    return this.x*other.x + this.y*other.y + this.z*other.z;
};
Point3D.prototype.cross = function (other) {
    return new Point3D(
        this.y*other.z - this.z*other.y,
        this.z*other.x - this.x*other.z,
        this.x*other.y - this.y*other.x
    );
};
Point3D.prototype.unit = function () {
    return this.div(this.abs());
};
Point3D.prototype.sqabs = function () {
    return this.x*this.x + this.y*this.y + this.z*this.z;
};
Point3D.prototype.abs = function () {
    return Math.sqrt(this.sqabs());
};
Point3D.prototype.rotateX = function (rad) {
    var sin = Math.sin(rad),
        cos = Math.cos(rad);
    return new Point3D(
        this.x,
        this.y*cos - this.z*sin,
        this.z*cos + this.y*sin
    );
};
Point3D.prototype.rotateY = function (rad) {
    var sin = Math.sin(rad),
        cos = Math.cos(rad);
    return new Point3D(
        this.x*cos + this.z*sin,
        this.y,
        this.z*cos - this.x*sin
    );
};
Point3D.prototype.rotateZ = function (rad) {
    var sin = Math.sin(rad),
        cos = Math.cos(rad);
    return new Point3D(
        this.x*cos - this.y*sin,
        this.y*cos + this.x*sin,
        this.z
    );
};
Point3D.prototype.radian = function (axis) {
    if (axis.x===0 && axis.y===1 && axis.z===0) {
        var orig = new Point3D(1, 0, 0);
        var orig2D = orig.to2D(axis);
        var this2D = this.to2D(axis);
        return radianWithTwoPoint(orig2D, this2D);
    }
};
Point3D.prototype.toString = function () {
    return '(' + this.x.toFixed(2) + ',' + this.y.toFixed(2) + ',' + this.z.toFixed(2) + ',' + this.w.toFixed(2) + ')';
};


var Matrix = function () {
    this.m = new Array(Matrix.size*Matrix.size);
    for (var i=0; i<Matrix.size*Matrix.size; i++) this.m[i] = 0;
};
Matrix.size = 4;
Matrix.prototype.isMatrix = function () { return true; };
Matrix.prototype.copy = function () {
    return new Matrix().set(this.m);
};
Matrix.prototype.set = function (ary) {
    for (var i=0; i<Matrix.size*Matrix.size; i++) this.m[i] = ary[i];
};
Matrix.identity = new Matrix().set([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
Matrix.prototype.setAt = function (row, col, v) {
    this.m[row * Matrix.size + col] = v;
};
Matrix.prototype.getAt = function (row, col) {
    return this.m[row * Matrix.size + col];
};
Matrix.prototype.mul = function (other) {
    var i, j, k;
    if (other.isPoint3D()) {
        var v = [ 0, 0, 0, 0];
        for (i=0; i<4; i++) {
            for (j=0; j<4; j++) {
                v[i] += this.getAt(i, j) * other.v[j];
            }
        }
        return new Point3D(v[0], v[1], v[2]);
    } else if (other.isMatrix()) {
        var mat = new Matrix();
        for (i=0; i<4; i++) {
            for (j=0; j<4; j++) {
                var a = 0;
                for (k=0; k<4; k++) {
                    a += this.getAt(i, k) * other.getAt(k, j);
                }
                mat.set(i, j, a);
            }
        }
        return mat;
    } else {
        return undefined;
    }
};


var Canvas3D = function (canvas_id) {
    this.canvas = document.getElementById(canvas_id);
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.ctx = this.canvas.getContext('2d');
    this.objects = [];
};
Canvas3D.prototype.addObject = function (o) {
    this.objects.push(o);
};
Canvas3D.prototype.update = function () {
    this.ctx.fillStyle = 'rgb(255, 255, 255)';
    this.ctx.fillRect(0, 0, this.width, this.height);

    var objects = this.objects;
    objects = objects.sort(function (a, b) {
        return a.depth - b.depth;
    });
    this.ctx.fillStyle = 'rgb(0, 0, 0)';

    var length = objects.length;
    for (var i=0; i<length; i++) {
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


var Polygon = function (vertices) {
    // TODO: verticesの正当性のチェック
    this.vertices = vertices;
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

    var cx = canvas.width/2,
        cy = canvas.height/2,
        center = new Point3D(cx, cy, 0);

    for (var i=0; i<len; i++) {
        verts[i] = canvas.viewMatrix.mul(this.vertices[i]);
        var d = verts[i].abs();
        verts[i] = verts[i].mul(d/(d-verts[i].z));
        verts[i] = verts[i].add(center);
    }

    for (i=0; i<len; i++) {
        ctx.beginPath();
        ctx.moveTo(verts[i].x, verts[i].y);
        ctx.lineTo(verts[(i+1)%len].x, verts[(i+1)%len].y);
        ctx.stroke();
    }

    var color = Math.abs(Math.floor(this.normal().z * 128)) + 64;
    color = Math.max(color, 0).toString(16);
    if (color.length===1) color = ' ' + color;
    ctx.fillStyle = '#' + color + color + color;
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
        this.polygons.move(v);
    }
};
Model.prototype.rotateX = function (rad) {
    for (var i=0; i<this.polygons.length; i++) {
        this.polygons.rotateX(this.origin, rad);
    }
};
Model.prototype.rotateY = function (rad) {
    for (var i=0; i<this.polygons.length; i++) {
        this.polygons.rotateY(this.origin, rad);
    }
};
Model.prototype.rotateZ = function (rad) {
    for (var i=0; i<this.polygons.length; i++) {
        this.polygons.rotateZ(this.origin, rad);
    }
};



var canvasInit = function () {
    var canvas = new Canvas3D('canvas');
    canvas.setViewMatrix(
        new Point3D(  0,   0,-100),
        new Point3D(  0,   0,   0),
        new Point3D(  0,   1,   0)
    );
    var vertexData = [
        new Point3D(-100,   0,   0),
        new Point3D(   0, 100,   0),
        new Point3D(   0,   0,-100),
        new Point3D( 100,   0,   0),
        new Point3D(   0,   0, 100),
        new Point3D(   0,-100,   0),
    ];
    var faceData = [
        [ 1, 4, 2],
        [ 1, 0, 4],
        [ 1, 2, 0],
        [ 3, 2, 4],
        [ 0, 5, 4],
        [ 4, 5, 3],
        [ 3, 5, 2],
        [ 2, 5, 0],
    ];
    var center = Point3D.origin;
    var polygons = [];
    // for (var i=0; i<faceData.length; i++) {
        // var polygon = new Polygon([
            // vertexData[faceData[i][0]],
            // vertexData[faceData[i][1]],
            // vertexData[faceData[i][2]],
        // ]);
        // polygons.push(polygon);
        // canvas.addObject(polygon);
    // }
    var polygon = new Polygon([
            new Point3D( 100, 100, 0),
            new Point3D(-100, 100, 0),
            new Point3D(-100,-100, 0),
            new Point3D( 100,-100, 0),
    ]);
    polygons.push(polygon);
    canvas.addObject(polygon);

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

            for (var i=0; i<polygons.length; i++) {
                polygons[i].rotateY(center, - (mouse_x - old_x) / 100);
                // polygons[i].rotateX(center, - (mouse_y - old_y) / 100);
            }
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
        var i;
        for (i=0; i<polygons.length; i++) polygons[i].rotateY(center, cos*Math.PI*0.01);
        for (i=0; i<polygons.length; i++) polygons[i].rotateZ(center, sin*Math.PI*0.01);
        canvas.update();
    }, 1);
};

window.onload = canvasInit;

