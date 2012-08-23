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
var upper = new Point3D(0, 1, 0);
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
Point3D.prototype.sqabs = function () {
    return this.x*this.x + this.y*this.y + this.z*this.z;
};
Point3D.prototype.abs = function () {
    return Math.sqrt(this.sqabs());
};
Point3D.prototype.rotate = function (axis, rad) {
    if (axis.x===0 && axis.y===1 && axis.z===0) {
        var sin = Math.sin(rad),
            cos = Math.cos(rad);
        return new Point3D(
            this.x*cos + this.z*sin,
            this.y,
            this.z*cos - this.x*sin
        );
    }
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
    this.lookingFrom = new Point3D(400, 300, 0);
    this.lookingAt   = new Point3D(400, 300, 200);
    this.fovy = Math.PI / 180 * 120;
};
Canvas3D.prototype.addObject = function (o) {
    this.objects.push(o);
};
Canvas3D.prototype.update = function () {
    this.ctx.fillStyle = 'rgb(255, 255, 255)';
    this.ctx.fillRect(0, 0, this.width, this.height);

    var objects = this.objects;
    this.ctx.fillStyle = 'rgb(0, 0, 0)';

    var length = objects.length;
    for (var i=0; i<length; i++) {
        objects[i].draw(this);
    }
};


var Polygon = function (vertices) {
    this.vertices = vertices;
};
Polygon.prototype.move = function (v) {
    // var vertices = [];
    // for (var i=0; i<this.vertices.length; i++) {
        // vertices.push(this.vertices[i].add(v));
    // }
    // return new Polygon(vertices);
    for (var i=0; i<this.vertices.length; i++) {
        this.vertices[i] = this.vertices[i].add(v);
    }
};
Polygon.prototype.rotate = function (axis, rad) {
    for (var i=0; i<this.vertices.length; i++) {
        this.vertices[i] = this.vertices[i].sub(axis).rotate(upper, rad).add(axis);
    }
};
Polygon.prototype.toString = function () {
    var str = '[';
    for (var i=0; i<this.vertices.length; i++) str += this.vertices[i] + ',';
    str += ']';
    return str;
};
Polygon.prototype.draw = function (canvas) {
    var at = canvas.lookingAt,
        from = canvas.lookingFrom;

    var baseRad = -at.sub(from).radian(upper);

    var dispVertices = [];
    for (var i=0; i<this.vertices.length; i++) {
        var v = this.vertices[i];
        dispVertices.push(v.sub(from).rotate(upper, baseRad).div(v.sub(from).abs()));
    }

    var ctx = canvas.ctx;
    var virtualWidth = Math.tan(canvas.fovy / 2);
    var magnification = 1 / virtualWidth * canvas.width;

    ctx.beginPath();
    for (i=0; i<dispVertices.length; i++) {
        var x = dispVertices[i].x*magnification+400;
        var y = dispVertices[i].y*magnification+300;
        if (i===0) ctx.moveTo(x, y);
        else       ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
};

var Texture = function (src, vertices) {
    this.img = new Image();
    this.img.src = src;
    this.vertices = vertices;
    this.rad = 0;
};
Texture.prototype.rotate = function (rad) {
    this.rad += rad;
};
Texture.prototype.draw = function (canvas) {
    var ctx = canvas.ctx;
    var cos = Math.cos(this.rad);
    ctx.setTransform( cos, 0, 0, 1, (1-cos)*canvas.width*0, 0);

    var x = this.vertices[0].x;
    var y = this.vertices[0].y;
    var width = this.vertices[2].x - x;
    var height = this.vertices[2].y - y;
    ctx.drawImage(this.img, x, y, width, height);

    ctx.setTransform( 1, 0, 0, 1, 0, 0);
};


var canvasInit = function () {
    var canvas = new Canvas3D('canvas');
    var rect = new Polygon([
        new Point3D(370, 290, 50),
        new Point3D(370, 310, 50),
        new Point3D(390, 310, 50),
        new Point3D(390, 290, 50),
    ]);
    var axis = new Point3D(380, 0, 50);
    canvas.addObject(rect);

    var tex = new Texture('image/so-nya.png', [
        new Point3D(500-200, 200, 50),
        new Point3D(500-200, 400, 50),
        new Point3D(700-200, 400, 50),
        new Point3D(700-200, 200, 50),
    ]);
    canvas.addObject(tex);

    setInterval(function () {
        rect.rotate(axis, 0.05);
        tex.rotate(0.01);
        canvas.update();
    },10);
};

window.onload = canvasInit;

