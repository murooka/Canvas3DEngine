var Point2D = function (x, y) {
    this.x = x;
    this.y = y;
};
Point2D.prototype.add = function (other) {
    return new Point2D(
        this.x+other.x,
        this.y+other.y
    );
};
Point2D.prototype.sub = function (other) {
    return new Point2D(
        this.x-other.x,
        this.y-other.y
    );
};
Point2D.prototype.mul = function (other) {
    return new Point2D(
        this.x*other,
        this.y*other
    );
};
Point2D.prototype.div = function (other) {
    return new Point2D(
        this.x/other,
        this.y/other
    );
};
Point2D.prototype.sqabs = function () {
    return this.x*this.x + this.y*this.y;
};
Point2D.prototype.abs = function () {
    return Math.sqrt(this.sqabs());
};
Point2D.prototype.dot = function (other) {
    return this.x*other.x + this.y*other.y;
};
Point2D.prototype.cross = function (other) {
    return this.x*other.y - this.y*other.x;
};
Point2D.prototype.unit = function () {
    return this.div(this.abs());
};


var radianWithTwoPoint = function (p1, p2) {
    return Math.atan2(p1.dot(p2), p1.cross(p2));
};


var Point3D = function (x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
};
Point3D.prototype.origin = new Point3D(0, 0, 0);
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
Point3D.prototype.to2D = function (axis) {
    if (axis.x===0 && axis.y===1 && axis.z===0) {
        return new Point2D(this.x, this.z);
    } else if (axis.x===0 && axis.y===0 && axis.z===1) {
        return new Point2D(this.x, this.y);
    }
};
Point3D.prototype.toString = function () {
    return '(' + this.x.toFixed(2) + ',' + this.y.toFixed(2) + ',' + this.z.toFixed(2) + ')';
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
    var verts = this.vertices;
    var len = verts.length;

    for (var i=0; i<len; i++) {
        ctx.beginPath();
        ctx.moveTo(verts[i].x, verts[i].y);
        ctx.lineTo(verts[(i+1)%len].x, verts[(i+1)%len].y);
        ctx.stroke();
    }

    var color = (192 - Math.abs(Math.floor(this.normal().x * 128))).toString(16);
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


var canvasInit = function () {
    var canvas = new Canvas3D('canvas');
    var vertexData = [
        new Point3D(300, 300, 100),
        new Point3D(400, 400, 100),
        new Point3D(400, 300,   0),
        new Point3D(500, 300, 100),
        new Point3D(400, 300, 200),
        new Point3D(400, 200, 100),
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
    var center = new Point3D(400, 300, 100);
    var polygons = [];
    for (var i=0; i<faceData.length; i++) {
        var polygon = new Polygon([
            vertexData[faceData[i][0]],
            vertexData[faceData[i][1]],
            vertexData[faceData[i][2]],
        ]);
        polygons.push(polygon);
        canvas.addObject(polygon);
    }

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
                polygons[i].rotateY(center, (mouse_x - old_x) / 100);
                polygons[i].rotateX(center, - (mouse_y - old_y) / 100);
            }
            canvas.update();

            old_x = mouse_x;
            old_y = mouse_y;
        }
    };

    // setInterval(function () {
    //     for (var i=0; i<polygons.length; i++) {
    //         polygons[i].rotateZ(center, 0.02);
    //         polygons[i].rotateX(center, 0.015);
    //     }
    //     canvas.update();
    // },10);
};

window.onload = canvasInit;

