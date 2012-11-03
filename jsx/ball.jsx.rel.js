var JSX = {};
(function () {

/**
 * copies the implementations from source interface to target
 */
function $__jsx_merge_interface(target, source) {
	for (var k in source.prototype)
		if (source.prototype.hasOwnProperty(k))
			target.prototype[k] = source.prototype[k];
}

/**
 * defers the initialization of the property
 */
function $__jsx_lazy_init(obj, prop, func) {
	function reset(obj, prop, value) {
		delete obj[prop];
		obj[prop] = value;
		return value;
	}

	Object.defineProperty(obj, prop, {
		get: function () {
			return reset(obj, prop, func());
		},
		set: function (v) {
			reset(obj, prop, v);
		},
		enumerable: true,
		configurable: true
	});
}

/**
 * sideeffect().a /= b
 */
function $__jsx_div_assign(obj, prop, divisor) {
	return obj[prop] = (obj[prop] / divisor) | 0;
}

/*
 * global functions called by JSX
 * (enamed so that they do not conflict with local variable names)
 */
var $__jsx_parseInt = parseInt;
var $__jsx_parseFloat = parseFloat;
var $__jsx_isNaN = isNaN;
var $__jsx_isFinite = isFinite;

var $__jsx_encodeURIComponent = encodeURIComponent;
var $__jsx_decodeURIComponent = decodeURIComponent;
var $__jsx_encodeURI = encodeURI;
var $__jsx_decodeURI = decodeURI;

var $__jsx_ObjectToString = Object.prototype.toString;
var $__jsx_ObjectHasOwnProperty = Object.prototype.hasOwnProperty;

/*
 * profiler object, initialized afterwards
 */
function $__jsx_profiler() {
}

/*
 * public interface to JSX code
 */
JSX.require = function (path) {
	var m = $__jsx_classMap[path];
	return m !== undefined ? m : null;
};

JSX.profilerIsRunning = function () {
	return $__jsx_profiler.getResults != null;
};

JSX.getProfileResults = function () {
	return ($__jsx_profiler.getResults || function () { return {}; })();
};

JSX.postProfileResults = function (url) {
	if ($__jsx_profiler.postResults == null)
		throw new Error("profiler has not been turned on");
	return $__jsx_profiler.postResults(url);
};

JSX.resetProfileResults = function () {
	if ($__jsx_profiler.resetResults == null)
		throw new Error("profiler has not been turned on");
	return $__jsx_profiler.resetResults();
};
/**
 * class Util3D extends Object
 * @constructor
 */
function Util3D() {
}

Util3D.prototype = new Object;
/**
 * @constructor
 */
function Util3D$() {
};

Util3D$.prototype = new Util3D;

/**
 * @param {Context3D} context
 * @param {!number} size
 * @param {!number} div
 */
Util3D.sphere$LContext3D$NI = function (context, size, div) {
	/** @type {!number} */
	var ver;
	/** @type {!number} */
	var hor;
	var sin;
	var cos;
	/** @type {!number} */
	var pi;
	/** @type {!number} */
	var i;
	/** @type {!number} */
	var i1;
	/** @type {!number} */
	var i2;
	/** @type {!number} */
	var j1;
	/** @type {!number} */
	var j2;
	/** @type {!number} */
	var j;
	/** @type {Vector} */
	var center$0;
	ver = div;
	hor = div * 2;
	sin = Math.sin;
	cos = Math.cos;
	pi = 3.141592653589793;
	center$0 = new Vector$NNN(0, 0, 0);
	context._polygonList = new List$Polygon$E$();
	context._groupCenter = center$0;
	context._ignoringZHidden = false;
	for (i = 0; i < hor; i++) {
		i1 = 0;
		i2 = 1;
		j1 = i + 1;
		j2 = i;
		Context3D$renderPolygonGroup$LContext3D$ALVector$LColor$(context, [ new Vector$NNN(cos(2 * pi * j1 / hor) * sin(pi * 0 / ver) * size, cos(pi * 0 / ver) * size, sin(2 * pi * j1 / hor) * sin(pi * 0 / ver) * size), new Vector$NNN(cos(2 * pi * j1 / hor) * sin(pi * i2 / ver) * size, cos(pi * i2 / ver) * size, sin(2 * pi * j1 / hor) * sin(pi * i2 / ver) * size), new Vector$NNN(cos(2 * pi * j2 / hor) * sin(pi * i2 / ver) * size, cos(pi * i2 / ver) * size, sin(2 * pi * j2 / hor) * sin(pi * i2 / ver) * size) ], new Color$III(128, 128, 255));
	}
	for (i = 1; i < ver - 1; i++) {
		for (j = 0; j < hor; j++) {
			i1 = i;
			i2 = i + 1;
			j1 = j + 1;
			j2 = j;
			Context3D$renderPolygonGroup$LContext3D$ALVector$LColor$(context, [ new Vector$NNN(cos(2 * pi * j1 / hor) * sin(pi * i / ver) * size, cos(pi * i / ver) * size, sin(2 * pi * j1 / hor) * sin(pi * i / ver) * size), new Vector$NNN(cos(2 * pi * j1 / hor) * sin(pi * i2 / ver) * size, cos(pi * i2 / ver) * size, sin(2 * pi * j1 / hor) * sin(pi * i2 / ver) * size), new Vector$NNN(cos(2 * pi * j2 / hor) * sin(pi * i2 / ver) * size, cos(pi * i2 / ver) * size, sin(2 * pi * j2 / hor) * sin(pi * i2 / ver) * size), new Vector$NNN(cos(2 * pi * j2 / hor) * sin(pi * i1 / ver) * size, cos(pi * i1 / ver) * size, sin(2 * pi * j2 / hor) * sin(pi * i1 / ver) * size) ], new Color$III(128, 128, 255));
		}
	}
	for (i = 0; i < hor; i++) {
		i1 = ver - 1;
		i2 = ver;
		j1 = i + 1;
		j2 = i;
		Context3D$renderPolygonGroup$LContext3D$ALVector$LColor$(context, [ new Vector$NNN(cos(2 * pi * i / hor) * sin(pi * i1 / ver) * size, cos(pi * i1 / ver) * size, sin(2 * pi * i / hor) * sin(pi * i1 / ver) * size), new Vector$NNN(cos(2 * pi * j1 / hor) * sin(pi * i1 / ver) * size, cos(pi * i1 / ver) * size, sin(2 * pi * j1 / hor) * sin(pi * i1 / ver) * size), new Vector$NNN(cos(2 * pi * j2 / hor) * sin(pi * i2 / ver) * size, cos(pi * i2 / ver) * size, sin(2 * pi * j2 / hor) * sin(pi * i2 / ver) * size) ], new Color$III(128, 128, 255));
	}
	Context3D$endGroup$LContext3D$(context);
};

var Util3D$sphere$LContext3D$NI = Util3D.sphere$LContext3D$NI;

/**
 * @param {Context3D} context
 * @param {!number} x
 * @param {!number} y
 * @param {!number} z
 * @param {!number} size
 * @param {Color} color
 */
Util3D.tile$LContext3D$IIIILColor$ = function (context, x, y, z, size, color) {
	/** @type {Array.<undefined|Vector>} */
	var vertices$0;
	vertices$0 = [ new Vector$NNN(x - size / 2, y, z - size / 2), new Vector$NNN(x - size / 2, y, z + size / 2), new Vector$NNN(x + size / 2, y, z + size / 2), new Vector$NNN(x + size / 2, y, z - size / 2) ];
	Context3D$renderModel$LContext3D$LRenderable$(context, new Polygon$ALVector$LColor$(vertices$0, color));
};

var Util3D$tile$LContext3D$IIIILColor$ = Util3D.tile$LContext3D$IIIILColor$;

/**
 * @param {Context3D} context
 * @param {!number} x
 * @param {!number} y
 * @param {!number} z
 * @param {!number} size
 * @param {Color} color
 */
Util3D.tileOnGroup$LContext3D$IIIILColor$ = function (context, x, y, z, size, color) {
	Context3D$renderPolygonGroup$LContext3D$ALVector$LColor$(context, [ new Vector$NNN(x - size / 2, y, z - size / 2), new Vector$NNN(x - size / 2, y, z + size / 2), new Vector$NNN(x + size / 2, y, z + size / 2), new Vector$NNN(x + size / 2, y, z - size / 2) ], color);
};

var Util3D$tileOnGroup$LContext3D$IIIILColor$ = Util3D.tileOnGroup$LContext3D$IIIILColor$;

/**
 * @param {Context3D} context
 * @param {!number} cx
 * @param {!number} cz
 * @param {!number} width
 * @param {!number} height
 * @param {!number} y
 * @param {!number} size
 * @param {Color} color1
 * @param {Color} color2
 */
Util3D.tileRectXZ$LContext3D$IIIIIILColor$LColor$ = function (context, cx, cz, width, height, y, size, color1, color2) {
	/** @type {!number} */
	var row;
	/** @type {!number} */
	var col;
	/** @type {!number} */
	var i;
	/** @type {!number} */
	var j;
	/** @type {Color} */
	var color;
	/** @type {Vector} */
	var center$0;
	row = height / size;
	col = width / size;
	center$0 = new Vector$NNN(0, 0, 0);
	context._polygonList = new List$Polygon$E$();
	context._groupCenter = center$0;
	context._ignoringZHidden = true;
	for (i = 0; i < row; i++) {
		for (j = 0; j < col; j++) {
			color = ((i + j) % 2 === 0 ? color1 : color2);
			Util3D$tileOnGroup$LContext3D$IIIILColor$(context, cx - width / 2 + (j + 0.5) * size, y, cz - height / 2 + (i + 0.5) * size, size, color);
		}
	}
	Context3D$endGroup$LContext3D$(context);
};

var Util3D$tileRectXZ$LContext3D$IIIIIILColor$LColor$ = Util3D.tileRectXZ$LContext3D$IIIIIILColor$LColor$;

/**
 * class Player extends Object
 * @constructor
 */
function Player() {
}

Player.prototype = new Object;
/**
 * @constructor
 */
function Player$() {
	/** @type {!number} */
	var cos$0;
	/** @type {!number} */
	var sin$0;
	this.r = 12;
	this.x = 0;
	this.y = 10;
	this.z = 0;
	this.vx = 0;
	this.vy = 0;
	this.vz = 0;
	this.ax = 0;
	this.ay = -120;
	this.az = 0;
	cos$0 = Math.cos(0);
	sin$0 = Math.sin(0);
	this.rot = new Quaternion$NNNN(cos$0, sin$0, 0 * sin$0, 0 * sin$0);
	this.radius = 8;
	this.isBraking = false;
};

Player$.prototype = new Player;

/**
 * @param {Player} $this
 */
Player.moveForward$LPlayer$ = function ($this) {
	Player$move$LPlayer$NN($this, 50, 0);
};

var Player$moveForward$LPlayer$ = Player.moveForward$LPlayer$;

/**
 * @param {Player} $this
 * @param {!number} dz
 * @param {!number} dx
 */
Player.move$LPlayer$NN = function ($this, dz, dx) {
	/** @type {!number} */
	var x;
	/** @type {!number} */
	var z;
	/** @type {!number} */
	var len;
	/** @type {!number} */
	var rad;
	/** @type {!number} */
	var sin;
	/** @type {!number} */
	var cos;
	x = $this.vx;
	z = $this.vz;
	len = Math.sqrt(x * x + z * z);
	if ((z >= 0 ? z : - z) > 1e-9) {
		z /= len;
	}
	if ((x >= 0 ? x : - x) > 1e-9) {
		x /= len;
	}
	rad = Math.atan2(x, z);
	sin = Math.sin(rad);
	cos = Math.cos(rad);
	$this.az = cos * dz - sin * dx;
	$this.ax = sin * dz + cos * dx;
};

var Player$move$LPlayer$NN = Player.move$LPlayer$NN;

/**
 * @param {Player} $this
 */
Player.brake$LPlayer$ = function ($this) {
	$this.isBraking = true;
};

var Player$brake$LPlayer$ = Player.brake$LPlayer$;

/**
 * @param {Player} $this
 */
Player.unbrake$LPlayer$ = function ($this) {
	$this.isBraking = false;
};

var Player$unbrake$LPlayer$ = Player.unbrake$LPlayer$;

/**
 * @param {Player} $this
 * @param {!number} elapsedMsec
 */
Player.update$LPlayer$N = function ($this, elapsedMsec) {
	/** @type {!number} */
	var sec;
	/** @type {!number} */
	var dx;
	/** @type {!number} */
	var dy;
	/** @type {!number} */
	var dz;
	/** @type {!number} */
	var velocityDecl;
	/** @type {!number} */
	var decl;
	/** @type {Vector} */
	var c;
	/** @type {!number} */
	var value2$0;
	/** @type {!number} */
	var value2$1;
	/** @type {!number} */
	var value2$2;
	/** @type {Vector} */
	var this$0;
	/** @type {!number} */
	var length$0;
	/** @type {!number} */
	var rad$0;
	/** @type {!number} */
	var x$0$0;
	/** @type {!number} */
	var y$0$0;
	/** @type {!number} */
	var z$0$0;
	/** @type {!number} */
	var cos$0$0;
	/** @type {!number} */
	var sin$0$0;
	/** @type {Quaternion} */
	var this$1;
	/** @type {!number} */
	var t$0;
	/** @type {!number} */
	var x$0;
	/** @type {!number} */
	var y$0;
	/** @type {!number} */
	var z$0;
	/** @type {!number} */
	var value2$3;
	/** @type {!number} */
	var value2$4;
	/** @type {!number} */
	var value2$5;
	/** @type {!number} */
	var vx$0;
	/** @type {!number} */
	var vz$0;
	/** @type {!number} */
	var z$1;
	/** @type {!number} */
	var z$2;
	/** @type {!number} */
	var x$1;
	/** @type {!number} */
	var y$1;
	/** @type {!number} */
	var y$2;
	/** @type {!number} */
	var x$2;
	/** @type {!number} */
	var x$3;
	/** @type {!number} */
	var y$3;
	/** @type {!number} */
	var z$3;
	/** @type {!number} */
	var x$4;
	/** @type {!number} */
	var y$4;
	/** @type {!number} */
	var z$4;
	/** @type {!number} */
	var t$1;
	/** @type {!number} */
	var x$5;
	/** @type {!number} */
	var t$2;
	/** @type {!number} */
	var x$6;
	/** @type {!number} */
	var y$5;
	/** @type {!number} */
	var z$5;
	/** @type {!number} */
	var z$6;
	/** @type {!number} */
	var y$6;
	/** @type {!number} */
	var v$x$0;
	/** @type {!number} */
	var v$y$0;
	/** @type {!number} */
	var v$z$0;
	/** @type {!number} */
	var v$w$0;
	/** @type {!number} */
	var q$t$0;
	/** @type {!number} */
	var q$x$0;
	/** @type {!number} */
	var q$y$0;
	/** @type {!number} */
	var q$z$0;
	/** @type {!number} */
	var other$0$x$0;
	/** @type {!number} */
	var other$0$y$0;
	/** @type {!number} */
	var other$0$z$0;
	/** @type {!number} */
	var other$0$w$0;
	sec = elapsedMsec / 1000;
	if (sec > 0.1) {
		sec = 0.1;
	}
	vx$0 = $this.vx += $this.ax * sec;
	$this.vy += $this.ay * sec;
	$this.vz += $this.az * sec;
	value2$3 = vx$0;
	value2$0 = (-100 >= value2$3 ? -100 : value2$3);
	$this.vx = (100 <= value2$0 ? 100 : value2$0);
	value2$4 = $this.vy;
	value2$1 = (-3000 >= value2$4 ? -3000 : value2$4);
	$this.vy = (3000 <= value2$1 ? 3000 : value2$1);
	value2$5 = $this.vz;
	value2$2 = (-100 >= value2$5 ? -100 : value2$5);
	vz$0 = $this.vz = (100 <= value2$2 ? 100 : value2$2);
	dx = $this.vx * sec;
	dy = $this.vy * sec;
	dz = vz$0 * sec;
	$this.x += dx;
	$this.y += dy;
	$this.z += dz;
	velocityDecl = ($this.isBraking ? 0.05 : 0.001);
	$this.vx -= (dx >= 0 ? dx : - dx) * $this.vx * velocityDecl;
	$this.vz -= (dz >= 0 ? dz : - dz) * $this.vz * velocityDecl;
	if ($this.isBraking) {
		decl = Math.pow(2.718281828459045, - sec);
		$this.az *= decl;
		$this.ax *= decl;
	}
	v$x$0 = dx;
	v$y$0 = 0;
	v$z$0 = dz;
	v$w$0 = 1;
	other$0$x$0 = 0;
	other$0$y$0 = 1;
	other$0$z$0 = 0;
	other$0$w$0 = 1;
	this$0 = new Vector$NNN((y$2 = v$y$0) * (z$2 = other$0$z$0) - (z$1 = v$z$0) * (y$1 = other$0$y$0), z$1 * (x$2 = other$0$x$0) - (x$1 = v$x$0) * z$2, x$1 * y$1 - y$2 * x$2);
	length$0 = Math.sqrt((x$3 = this$0.x) * x$3 + (y$3 = this$0.y) * y$3 + (z$3 = this$0.z) * z$3);
	c = (length$0 < 1e-9 ? new Vector$NNN(0, 0, 0) : this$0.divSelf$N(length$0));
	rad$0 = Math.sqrt((x$4 = v$x$0) * x$4 + (y$4 = v$y$0) * y$4 + (z$4 = v$z$0) * z$4) / $this.r;
	x$0$0 = c.x;
	y$0$0 = c.y;
	z$0$0 = c.z;
	cos$0$0 = Math.cos(rad$0 / 2);
	sin$0$0 = Math.sin(rad$0 / 2);
	q$t$0 = cos$0$0;
	q$x$0 = x$0$0 * sin$0$0;
	q$y$0 = y$0$0 * sin$0$0;
	q$z$0 = z$0$0 * sin$0$0;
	this$1 = $this.rot;
	t$0 = (t$1 = this$1.t) * (t$2 = q$t$0) - ((x$6 = this$1.x) * (x$5 = q$x$0) + (y$5 = this$1.y) * (y$6 = q$y$0) + (z$6 = this$1.z) * (z$5 = q$z$0));
	x$0 = t$1 * x$5 + t$2 * x$6 + (y$5 * z$5 - z$6 * y$6);
	y$0 = t$1 * y$6 + t$2 * y$5 + (z$6 * x$5 - x$6 * z$5);
	z$0 = t$1 * z$5 + t$2 * z$6 + (x$6 * y$6 - y$5 * x$5);
	this$1.t = t$0;
	this$1.x = x$0;
	this$1.y = y$0;
	this$1.z = z$0;
};

var Player$update$LPlayer$N = Player.update$LPlayer$N;

/**
 * @param {Player} $this
 * @param {Vector} normal
 */
Player.bounce$LPlayer$LVector$ = function ($this, normal) {
	/** @type {!number} */
	var vdot;
	/** @type {!number} */
	var x$0;
	/** @type {!number} */
	var y$0;
	/** @type {!number} */
	var z$0;
	vdot = $this.vx * (x$0 = normal.x) + $this.vy * (y$0 = normal.y) + $this.vz * (z$0 = normal.z);
	$this.vx -= 1.5 * vdot * x$0;
	$this.vy -= 1.5 * vdot * y$0;
	$this.vz -= 1.5 * vdot * z$0;
};

var Player$bounce$LPlayer$LVector$ = Player.bounce$LPlayer$LVector$;

/**
 * class BlueBall extends Object
 * @constructor
 */
function BlueBall() {
}

BlueBall.prototype = new Object;
/**
 * @constructor
 */
function BlueBall$() {
	var $this = this;
	var gameUpdate;
	var clearedUpdate;
	var update;
	var gameRender;
	var clearedRender;
	var render;
	/** @type {!boolean} */
	var isCleared;
	/** @type {Color} */
	var backgroundColor;
	/** @type {Engine} */
	var this$0;
	/** @type {Engine} */
	var this$1;
	/** @type {Camera} */
	var this$2;
	/** @type {Vector} */
	var view$0;
	/** @type {Vector} */
	var target$0;
	/** @type {Vector} */
	var upper$0;
	/** @type {!number} */
	var fovyX$0;
	/** @type {!number} */
	var nearZ$0;
	/** @type {!number} */
	var farZ$0;
	/** @type {!number} */
	var aspectRatio$0;
	/** @type {Matrix} */
	var viewMatrix$0;
	/** @type {Matrix} */
	var projectionMatrix$0;
	/** @type {Vector} */
	var zaxis$0$0;
	/** @type {Vector} */
	var xaxis$0$0;
	/** @type {Vector} */
	var yaxis$0$0;
	/** @type {Vector} */
	var this$0$0$0;
	/** @type {!number} */
	var length$0$0$0;
	/** @type {Vector} */
	var this$1$0$0;
	/** @type {!number} */
	var length$1$0$0;
	/** @type {Vector} */
	var this$2$0$0;
	/** @type {!number} */
	var length$2$0$0;
	/** @type {!number} */
	var sx$0$0;
	/** @type {!number} */
	var sy$0$0;
	/** @type {!number} */
	var sz$0$0;
	/** @type {!number} */
	var mz$0$0;
	/** @type {!number} */
	var m11$0$0;
	/** @type {!number} */
	var m12$0$0;
	/** @type {!number} */
	var m13$0$0;
	/** @type {!number} */
	var m14$0$0;
	/** @type {!number} */
	var m21$0$0;
	/** @type {!number} */
	var m22$0$0;
	/** @type {!number} */
	var m23$0$0;
	/** @type {!number} */
	var m24$0$0;
	/** @type {!number} */
	var m31$0$0;
	/** @type {!number} */
	var m32$0$0;
	/** @type {!number} */
	var m33$0$0;
	/** @type {!number} */
	var m34$0$0;
	/** @type {!number} */
	var m41$0$0;
	/** @type {!number} */
	var m42$0$0;
	/** @type {!number} */
	var m43$0$0;
	/** @type {!number} */
	var m44$0$0;
	/** @type {Engine} */
	var this$3;
	/** @type {Camera} */
	var camera$0;
	/** @type {Engine} */
	var engine$0;
	/** @type {!number} */
	var x$0;
	/** @type {!number} */
	var y$0;
	/** @type {!number} */
	var z$0;
	/** @type {!number} */
	var z$1;
	/** @type {!number} */
	var z$2;
	/** @type {!number} */
	var x$1;
	/** @type {!number} */
	var y$1;
	/** @type {!number} */
	var y$2;
	/** @type {!number} */
	var x$2;
	/** @type {!number} */
	var x$3;
	/** @type {!number} */
	var y$3;
	/** @type {!number} */
	var z$3;
	/** @type {!number} */
	var z$4;
	/** @type {!number} */
	var z$5;
	/** @type {!number} */
	var x$4;
	/** @type {!number} */
	var y$4;
	/** @type {!number} */
	var y$5;
	/** @type {!number} */
	var x$5;
	/** @type {!number} */
	var x$6;
	/** @type {!number} */
	var y$6;
	/** @type {!number} */
	var z$6;
	/** @type {!number} */
	var x$7;
	/** @type {!number} */
	var y$7;
	/** @type {!number} */
	var z$7;
	/** @type {!number} */
	var x$8;
	/** @type {!number} */
	var x$9;
	/** @type {!number} */
	var y$8;
	/** @type {!number} */
	var y$9;
	/** @type {!number} */
	var z$8;
	/** @type {!number} */
	var z$9;
	/** @type {!number} */
	var x$10;
	/** @type {!number} */
	var y$10;
	/** @type {!number} */
	var z$10;
	/** @type {!number} */
	var _m11$0;
	/** @type {!number} */
	var _m12$0;
	/** @type {!number} */
	var _m13$0;
	/** @type {!number} */
	var _m14$0;
	/** @type {!number} */
	var _m11$1;
	/** @type {!number} */
	var _m21$0;
	/** @type {!number} */
	var _m31$0;
	/** @type {!number} */
	var _m41$0;
	/** @type {!number} */
	var _m21$1;
	/** @type {!number} */
	var _m12$1;
	/** @type {!number} */
	var _m22$0;
	/** @type {!number} */
	var _m22$1;
	/** @type {!number} */
	var _m23$0;
	/** @type {!number} */
	var _m32$0;
	/** @type {!number} */
	var _m24$0;
	/** @type {!number} */
	var _m42$0;
	/** @type {!number} */
	var _m13$1;
	/** @type {!number} */
	var _m23$1;
	/** @type {!number} */
	var _m33$0;
	/** @type {!number} */
	var _m43$0;
	/** @type {!number} */
	var _m14$1;
	/** @type {!number} */
	var _m24$1;
	/** @type {!number} */
	var _m34$0;
	/** @type {!number} */
	var _m44$0;
	/** @type {!number} */
	var _m31$1;
	/** @type {!number} */
	var _m32$1;
	/** @type {!number} */
	var _m33$1;
	/** @type {!number} */
	var _m34$1;
	/** @type {!number} */
	var _m41$1;
	/** @type {!number} */
	var _m42$1;
	/** @type {!number} */
	var _m43$1;
	/** @type {!number} */
	var _m44$1;
	/** @type {Engine} */
	var engine$1;
	this.player = null;
	this.trees = null;
	this.treeRadius = 0;
	this.items = null;
	this.itemRadius = 0;
	this.totalElapsedMsec = 0;
	Engine$loadImages$AS([ './image/tree.png', './image/so-nya.png', './image/redbull_free.png', './image/sky1.jpg' ]);
	this.isStarted = false;
	engine$1 = this.engine = new Engine$S('canvas');
	this$0 = engine$1;
	this$0._skyImageSrc = './image/sky1.jpg';
	this$0._skyImage = Engine.images['./image/sky1.jpg'];
	this$1 = engine$1;
	if (this$1._isMobile) {
		(camera$0 = (engine$0 = this.engine).camera).farZ = 200;
		camera$0.fovyX = 0.7853981633974483;
		this$2 = camera$0;
		view$0 = this$2.view;
		target$0 = this$2.target;
		upper$0 = this$2.upper;
		fovyX$0 = this$2.fovyX;
		nearZ$0 = this$2.nearZ;
		farZ$0 = this$2.farZ;
		aspectRatio$0 = this$2.aspectRatio;
		this$0$0$0 = new Vector$NNN(target$0.x - view$0.x, target$0.y - view$0.y, target$0.z - view$0.z);
		length$0$0$0 = Math.sqrt((x$0 = this$0$0$0.x) * x$0 + (y$0 = this$0$0$0.y) * y$0 + (z$0 = this$0$0$0.z) * z$0);
		zaxis$0$0 = (length$0$0$0 < 1e-9 ? new Vector$NNN(0, 0, 0) : this$0$0$0.divSelf$N(length$0$0$0));
		this$1$0$0 = new Vector$NNN((y$2 = upper$0.y) * (z$2 = zaxis$0$0.z) - (z$1 = upper$0.z) * (y$1 = zaxis$0$0.y), z$1 * (x$2 = zaxis$0$0.x) - (x$1 = upper$0.x) * z$2, x$1 * y$1 - y$2 * x$2);
		length$1$0$0 = Math.sqrt((x$3 = this$1$0$0.x) * x$3 + (y$3 = this$1$0$0.y) * y$3 + (z$3 = this$1$0$0.z) * z$3);
		xaxis$0$0 = (length$1$0$0 < 1e-9 ? new Vector$NNN(0, 0, 0) : this$1$0$0.divSelf$N(length$1$0$0));
		this$2$0$0 = new Vector$NNN((y$5 = zaxis$0$0.y) * (z$5 = xaxis$0$0.z) - (z$4 = zaxis$0$0.z) * (y$4 = xaxis$0$0.y), z$4 * (x$5 = xaxis$0$0.x) - (x$4 = zaxis$0$0.x) * z$5, x$4 * y$4 - y$5 * x$5);
		length$2$0$0 = Math.sqrt((x$6 = this$2$0$0.x) * x$6 + (y$6 = this$2$0$0.y) * y$6 + (z$6 = this$2$0$0.z) * z$6);
		yaxis$0$0 = (length$2$0$0 < 1e-9 ? new Vector$NNN(0, 0, 0) : this$2$0$0.divSelf$N(length$2$0$0));
		viewMatrix$0 = new Matrix$AN([ x$7 = xaxis$0$0.x, y$7 = xaxis$0$0.y, z$7 = xaxis$0$0.z, - (x$7 * (x$9 = view$0.x) + y$7 * (y$9 = view$0.y) + z$7 * (z$9 = view$0.z)), x$8 = yaxis$0$0.x, y$8 = yaxis$0$0.y, z$8 = yaxis$0$0.z, - (x$8 * x$9 + y$8 * y$9 + z$8 * z$9), x$10 = zaxis$0$0.x, y$10 = zaxis$0$0.y, z$10 = zaxis$0$0.z, - (x$10 * x$9 + y$10 * y$9 + z$10 * z$9), 0, 0, 0, 1 ]);
		sx$0$0 = 1 / Math.tan(fovyX$0 / 2);
		sy$0$0 = sx$0$0 / aspectRatio$0;
		sz$0$0 = farZ$0 / (farZ$0 - nearZ$0);
		mz$0$0 = - sz$0$0 * nearZ$0;
		projectionMatrix$0 = new Matrix$AN([ sx$0$0, 0, 0, 0, 0, sy$0$0, 0, 0, 0, 0, sz$0$0, mz$0$0, 0, 0, 1, 0 ]);
		this$2.viewMatrix = viewMatrix$0;
		this$2.projectionMatrix = projectionMatrix$0;
		m11$0$0 = (_m11$0 = projectionMatrix$0._m11) * (_m11$1 = viewMatrix$0._m11) + (_m12$0 = projectionMatrix$0._m12) * (_m21$0 = viewMatrix$0._m21) + (_m13$0 = projectionMatrix$0._m13) * (_m31$0 = viewMatrix$0._m31) + (_m14$0 = projectionMatrix$0._m14) * (_m41$0 = viewMatrix$0._m41);
		m12$0$0 = _m11$0 * (_m12$1 = viewMatrix$0._m12) + _m12$0 * (_m22$1 = viewMatrix$0._m22) + _m13$0 * (_m32$0 = viewMatrix$0._m32) + _m14$0 * (_m42$0 = viewMatrix$0._m42);
		m13$0$0 = _m11$0 * (_m13$1 = viewMatrix$0._m13) + _m12$0 * (_m23$1 = viewMatrix$0._m23) + _m13$0 * (_m33$0 = viewMatrix$0._m33) + _m14$0 * (_m43$0 = viewMatrix$0._m43);
		m14$0$0 = _m11$0 * (_m14$1 = viewMatrix$0._m14) + _m12$0 * (_m24$1 = viewMatrix$0._m24) + _m13$0 * (_m34$0 = viewMatrix$0._m34) + _m14$0 * (_m44$0 = viewMatrix$0._m44);
		m21$0$0 = (_m21$1 = projectionMatrix$0._m21) * _m11$1 + (_m22$0 = projectionMatrix$0._m22) * _m21$0 + (_m23$0 = projectionMatrix$0._m23) * _m31$0 + (_m24$0 = projectionMatrix$0._m24) * _m41$0;
		m22$0$0 = _m21$1 * _m12$1 + _m22$0 * _m22$1 + _m23$0 * _m32$0 + _m24$0 * _m42$0;
		m23$0$0 = _m21$1 * _m13$1 + _m22$0 * _m23$1 + _m23$0 * _m33$0 + _m24$0 * _m43$0;
		m24$0$0 = _m21$1 * _m14$1 + _m22$0 * _m24$1 + _m23$0 * _m34$0 + _m24$0 * _m44$0;
		m31$0$0 = (_m31$1 = projectionMatrix$0._m31) * _m11$1 + (_m32$1 = projectionMatrix$0._m32) * _m21$0 + (_m33$1 = projectionMatrix$0._m33) * _m31$0 + (_m34$1 = projectionMatrix$0._m34) * _m41$0;
		m32$0$0 = _m31$1 * _m12$1 + _m32$1 * _m22$1 + _m33$1 * _m32$0 + _m34$1 * _m42$0;
		m33$0$0 = _m31$1 * _m13$1 + _m32$1 * _m23$1 + _m33$1 * _m33$0 + _m34$1 * _m43$0;
		m34$0$0 = _m31$1 * _m14$1 + _m32$1 * _m24$1 + _m33$1 * _m34$0 + _m34$1 * _m44$0;
		m41$0$0 = (_m41$1 = projectionMatrix$0._m41) * _m11$1 + (_m42$1 = projectionMatrix$0._m42) * _m21$0 + (_m43$1 = projectionMatrix$0._m43) * _m31$0 + (_m44$1 = projectionMatrix$0._m44) * _m41$0;
		m42$0$0 = _m41$1 * _m12$1 + _m42$1 * _m22$1 + _m43$1 * _m32$0 + _m44$1 * _m42$0;
		m43$0$0 = _m41$1 * _m13$1 + _m42$1 * _m23$1 + _m43$1 * _m33$0 + _m44$1 * _m43$0;
		m44$0$0 = _m41$1 * _m14$1 + _m42$1 * _m24$1 + _m43$1 * _m34$0 + _m44$1 * _m44$0;
		this$2.matrix = new Matrix$AN([ m11$0$0, m12$0$0, m13$0$0, m14$0$0, m21$0$0, m22$0$0, m23$0$0, m24$0$0, m31$0$0, m32$0$0, m33$0$0, m34$0$0, m41$0$0, m42$0$0, m43$0$0, m44$0$0 ]);
	}
	this.player = {r: 12, x: 0, y: 10, z: 0, vx: 0, vy: 0, vz: 0, ax: 0, ay: - 120, az: 0, rot: Quaternion$rotating$NNNN(0, 1, 0, 0), radius: 8, isBraking: false};
	this.trees = new List$Vector$E$ALVector$([ new Vector$NNN(-271, -3, 450), new Vector$NNN(-200, -3, 720), new Vector$NNN(139, -3, 351), new Vector$NNN(171, -3, 254), new Vector$NNN(214, -3, 192), new Vector$NNN(-253, -3, 555), new Vector$NNN(29, -3, 385), new Vector$NNN(-72, -3, 530), new Vector$NNN(96, -3, 678), new Vector$NNN(-49, -3, 222) ]);
	this.treeRadius = 24;
	this.items = new List$Vector$E$ALVector$([ new Vector$NNN(149, -10, 724), new Vector$NNN(107, -10, 483), new Vector$NNN(279, -10, 551), new Vector$NNN(-295, -10, 261), new Vector$NNN(-16, -10, 225), new Vector$NNN(95, -10, 165), new Vector$NNN(264, -10, 161), new Vector$NNN(-50, -10, 325), new Vector$NNN(-169, -10, 254), new Vector$NNN(271, -10, 401) ]);
	this.itemRadius = 8;
	gameUpdate = (function (elapsedMsec) {
		$this._checkCollisionWithFloor$N(elapsedMsec);
		$this._checkCollisionWithTrees$();
		$this._checkCollisionWithItems$();
		$this._updateViewpoint$();
	});
	clearedUpdate = (function (elapsedMsec) {
		/** @type {Player} */
		var player$0;
		/** @type {Vector} */
		var view$0;
		/** @type {Vector} */
		var target$0;
		/** @type {Camera} */
		var this$0$0;
		/** @type {Vector} */
		var view$0$0;
		/** @type {Vector} */
		var target$0$0;
		/** @type {Vector} */
		var upper$0$0;
		/** @type {!number} */
		var fovyX$0$0;
		/** @type {!number} */
		var nearZ$0$0;
		/** @type {!number} */
		var farZ$0$0;
		/** @type {!number} */
		var aspectRatio$0$0;
		/** @type {Matrix} */
		var viewMatrix$0$0;
		/** @type {Matrix} */
		var projectionMatrix$0$0;
		/** @type {Vector} */
		var zaxis$0$0$0;
		/** @type {Vector} */
		var xaxis$0$0$0;
		/** @type {Vector} */
		var yaxis$0$0$0;
		/** @type {Vector} */
		var this$0$0$0$0;
		/** @type {!number} */
		var length$0$0$0$0;
		/** @type {Vector} */
		var this$1$0$0$0;
		/** @type {!number} */
		var length$1$0$0$0;
		/** @type {Vector} */
		var this$2$0$0$0;
		/** @type {!number} */
		var length$2$0$0$0;
		/** @type {!number} */
		var sx$0$0$0;
		/** @type {!number} */
		var sy$0$0$0;
		/** @type {!number} */
		var sz$0$0$0;
		/** @type {!number} */
		var mz$0$0$0;
		/** @type {!number} */
		var m11$0$0$0;
		/** @type {!number} */
		var m12$0$0$0;
		/** @type {!number} */
		var m13$0$0$0;
		/** @type {!number} */
		var m14$0$0$0;
		/** @type {!number} */
		var m21$0$0$0;
		/** @type {!number} */
		var m22$0$0$0;
		/** @type {!number} */
		var m23$0$0$0;
		/** @type {!number} */
		var m24$0$0$0;
		/** @type {!number} */
		var m31$0$0$0;
		/** @type {!number} */
		var m32$0$0$0;
		/** @type {!number} */
		var m33$0$0$0;
		/** @type {!number} */
		var m34$0$0$0;
		/** @type {!number} */
		var m41$0$0$0;
		/** @type {!number} */
		var m42$0$0$0;
		/** @type {!number} */
		var m43$0$0$0;
		/** @type {!number} */
		var m44$0$0$0;
		/** @type {Camera} */
		var camera$0;
		/** @type {Engine} */
		var engine$0;
		/** @type {!number} */
		var x$0;
		/** @type {!number} */
		var y$0;
		/** @type {!number} */
		var z$0;
		/** @type {!number} */
		var z$1;
		/** @type {!number} */
		var z$2;
		/** @type {!number} */
		var x$1;
		/** @type {!number} */
		var y$1;
		/** @type {!number} */
		var y$2;
		/** @type {!number} */
		var x$2;
		/** @type {!number} */
		var x$3;
		/** @type {!number} */
		var y$3;
		/** @type {!number} */
		var z$3;
		/** @type {!number} */
		var z$4;
		/** @type {!number} */
		var z$5;
		/** @type {!number} */
		var x$4;
		/** @type {!number} */
		var y$4;
		/** @type {!number} */
		var y$5;
		/** @type {!number} */
		var x$5;
		/** @type {!number} */
		var x$6;
		/** @type {!number} */
		var y$6;
		/** @type {!number} */
		var z$6;
		/** @type {!number} */
		var x$7;
		/** @type {!number} */
		var y$7;
		/** @type {!number} */
		var z$7;
		/** @type {!number} */
		var x$8;
		/** @type {!number} */
		var x$9;
		/** @type {!number} */
		var y$8;
		/** @type {!number} */
		var y$9;
		/** @type {!number} */
		var z$8;
		/** @type {!number} */
		var z$9;
		/** @type {!number} */
		var x$10;
		/** @type {!number} */
		var y$10;
		/** @type {!number} */
		var z$10;
		/** @type {!number} */
		var _m11$0;
		/** @type {!number} */
		var _m12$0;
		/** @type {!number} */
		var _m13$0;
		/** @type {!number} */
		var _m14$0;
		/** @type {!number} */
		var _m11$1;
		/** @type {!number} */
		var _m21$0;
		/** @type {!number} */
		var _m31$0;
		/** @type {!number} */
		var _m41$0;
		/** @type {!number} */
		var _m21$1;
		/** @type {!number} */
		var _m12$1;
		/** @type {!number} */
		var _m22$0;
		/** @type {!number} */
		var _m22$1;
		/** @type {!number} */
		var _m23$0;
		/** @type {!number} */
		var _m32$0;
		/** @type {!number} */
		var _m24$0;
		/** @type {!number} */
		var _m42$0;
		/** @type {!number} */
		var _m13$1;
		/** @type {!number} */
		var _m23$1;
		/** @type {!number} */
		var _m33$0;
		/** @type {!number} */
		var _m43$0;
		/** @type {!number} */
		var _m14$1;
		/** @type {!number} */
		var _m24$1;
		/** @type {!number} */
		var _m34$0;
		/** @type {!number} */
		var _m44$0;
		/** @type {!number} */
		var _m31$1;
		/** @type {!number} */
		var _m32$1;
		/** @type {!number} */
		var _m33$1;
		/** @type {!number} */
		var _m34$1;
		/** @type {!number} */
		var _m41$1;
		/** @type {!number} */
		var _m42$1;
		/** @type {!number} */
		var _m43$1;
		/** @type {!number} */
		var _m44$1;
		$this._updateClearedPlayer$N(elapsedMsec);
		player$0 = $this.player;
		view$0 = new Vector$NNN(player$0.x + Math.sin($this.totalElapsedMsec / 5000) * 50, player$0.y + 20, player$0.z + Math.cos($this.totalElapsedMsec / 5000) * 50);
		target$0 = new Vector$NNN(player$0.x, player$0.y, player$0.z);
		(camera$0 = (engine$0 = $this.engine).camera).target = target$0;
		camera$0.view = view$0;
		this$0$0 = camera$0;
		view$0$0 = this$0$0.view;
		target$0$0 = this$0$0.target;
		upper$0$0 = this$0$0.upper;
		fovyX$0$0 = this$0$0.fovyX;
		nearZ$0$0 = this$0$0.nearZ;
		farZ$0$0 = this$0$0.farZ;
		aspectRatio$0$0 = this$0$0.aspectRatio;
		this$0$0$0$0 = new Vector$NNN(target$0$0.x - view$0$0.x, target$0$0.y - view$0$0.y, target$0$0.z - view$0$0.z);
		length$0$0$0$0 = Math.sqrt((x$0 = this$0$0$0$0.x) * x$0 + (y$0 = this$0$0$0$0.y) * y$0 + (z$0 = this$0$0$0$0.z) * z$0);
		zaxis$0$0$0 = (length$0$0$0$0 < 1e-9 ? new Vector$NNN(0, 0, 0) : this$0$0$0$0.divSelf$N(length$0$0$0$0));
		this$1$0$0$0 = new Vector$NNN((y$2 = upper$0$0.y) * (z$2 = zaxis$0$0$0.z) - (z$1 = upper$0$0.z) * (y$1 = zaxis$0$0$0.y), z$1 * (x$2 = zaxis$0$0$0.x) - (x$1 = upper$0$0.x) * z$2, x$1 * y$1 - y$2 * x$2);
		length$1$0$0$0 = Math.sqrt((x$3 = this$1$0$0$0.x) * x$3 + (y$3 = this$1$0$0$0.y) * y$3 + (z$3 = this$1$0$0$0.z) * z$3);
		xaxis$0$0$0 = (length$1$0$0$0 < 1e-9 ? new Vector$NNN(0, 0, 0) : this$1$0$0$0.divSelf$N(length$1$0$0$0));
		this$2$0$0$0 = new Vector$NNN((y$5 = zaxis$0$0$0.y) * (z$5 = xaxis$0$0$0.z) - (z$4 = zaxis$0$0$0.z) * (y$4 = xaxis$0$0$0.y), z$4 * (x$5 = xaxis$0$0$0.x) - (x$4 = zaxis$0$0$0.x) * z$5, x$4 * y$4 - y$5 * x$5);
		length$2$0$0$0 = Math.sqrt((x$6 = this$2$0$0$0.x) * x$6 + (y$6 = this$2$0$0$0.y) * y$6 + (z$6 = this$2$0$0$0.z) * z$6);
		yaxis$0$0$0 = (length$2$0$0$0 < 1e-9 ? new Vector$NNN(0, 0, 0) : this$2$0$0$0.divSelf$N(length$2$0$0$0));
		viewMatrix$0$0 = new Matrix$AN([ x$7 = xaxis$0$0$0.x, y$7 = xaxis$0$0$0.y, z$7 = xaxis$0$0$0.z, - (x$7 * (x$9 = view$0$0.x) + y$7 * (y$9 = view$0$0.y) + z$7 * (z$9 = view$0$0.z)), x$8 = yaxis$0$0$0.x, y$8 = yaxis$0$0$0.y, z$8 = yaxis$0$0$0.z, - (x$8 * x$9 + y$8 * y$9 + z$8 * z$9), x$10 = zaxis$0$0$0.x, y$10 = zaxis$0$0$0.y, z$10 = zaxis$0$0$0.z, - (x$10 * x$9 + y$10 * y$9 + z$10 * z$9), 0, 0, 0, 1 ]);
		sx$0$0$0 = 1 / Math.tan(fovyX$0$0 / 2);
		sy$0$0$0 = sx$0$0$0 / aspectRatio$0$0;
		sz$0$0$0 = farZ$0$0 / (farZ$0$0 - nearZ$0$0);
		mz$0$0$0 = - sz$0$0$0 * nearZ$0$0;
		projectionMatrix$0$0 = new Matrix$AN([ sx$0$0$0, 0, 0, 0, 0, sy$0$0$0, 0, 0, 0, 0, sz$0$0$0, mz$0$0$0, 0, 0, 1, 0 ]);
		this$0$0.viewMatrix = viewMatrix$0$0;
		this$0$0.projectionMatrix = projectionMatrix$0$0;
		m11$0$0$0 = (_m11$0 = projectionMatrix$0$0._m11) * (_m11$1 = viewMatrix$0$0._m11) + (_m12$0 = projectionMatrix$0$0._m12) * (_m21$0 = viewMatrix$0$0._m21) + (_m13$0 = projectionMatrix$0$0._m13) * (_m31$0 = viewMatrix$0$0._m31) + (_m14$0 = projectionMatrix$0$0._m14) * (_m41$0 = viewMatrix$0$0._m41);
		m12$0$0$0 = _m11$0 * (_m12$1 = viewMatrix$0$0._m12) + _m12$0 * (_m22$1 = viewMatrix$0$0._m22) + _m13$0 * (_m32$0 = viewMatrix$0$0._m32) + _m14$0 * (_m42$0 = viewMatrix$0$0._m42);
		m13$0$0$0 = _m11$0 * (_m13$1 = viewMatrix$0$0._m13) + _m12$0 * (_m23$1 = viewMatrix$0$0._m23) + _m13$0 * (_m33$0 = viewMatrix$0$0._m33) + _m14$0 * (_m43$0 = viewMatrix$0$0._m43);
		m14$0$0$0 = _m11$0 * (_m14$1 = viewMatrix$0$0._m14) + _m12$0 * (_m24$1 = viewMatrix$0$0._m24) + _m13$0 * (_m34$0 = viewMatrix$0$0._m34) + _m14$0 * (_m44$0 = viewMatrix$0$0._m44);
		m21$0$0$0 = (_m21$1 = projectionMatrix$0$0._m21) * _m11$1 + (_m22$0 = projectionMatrix$0$0._m22) * _m21$0 + (_m23$0 = projectionMatrix$0$0._m23) * _m31$0 + (_m24$0 = projectionMatrix$0$0._m24) * _m41$0;
		m22$0$0$0 = _m21$1 * _m12$1 + _m22$0 * _m22$1 + _m23$0 * _m32$0 + _m24$0 * _m42$0;
		m23$0$0$0 = _m21$1 * _m13$1 + _m22$0 * _m23$1 + _m23$0 * _m33$0 + _m24$0 * _m43$0;
		m24$0$0$0 = _m21$1 * _m14$1 + _m22$0 * _m24$1 + _m23$0 * _m34$0 + _m24$0 * _m44$0;
		m31$0$0$0 = (_m31$1 = projectionMatrix$0$0._m31) * _m11$1 + (_m32$1 = projectionMatrix$0$0._m32) * _m21$0 + (_m33$1 = projectionMatrix$0$0._m33) * _m31$0 + (_m34$1 = projectionMatrix$0$0._m34) * _m41$0;
		m32$0$0$0 = _m31$1 * _m12$1 + _m32$1 * _m22$1 + _m33$1 * _m32$0 + _m34$1 * _m42$0;
		m33$0$0$0 = _m31$1 * _m13$1 + _m32$1 * _m23$1 + _m33$1 * _m33$0 + _m34$1 * _m43$0;
		m34$0$0$0 = _m31$1 * _m14$1 + _m32$1 * _m24$1 + _m33$1 * _m34$0 + _m34$1 * _m44$0;
		m41$0$0$0 = (_m41$1 = projectionMatrix$0$0._m41) * _m11$1 + (_m42$1 = projectionMatrix$0$0._m42) * _m21$0 + (_m43$1 = projectionMatrix$0$0._m43) * _m31$0 + (_m44$1 = projectionMatrix$0$0._m44) * _m41$0;
		m42$0$0$0 = _m41$1 * _m12$1 + _m42$1 * _m22$1 + _m43$1 * _m32$0 + _m44$1 * _m42$0;
		m43$0$0$0 = _m41$1 * _m13$1 + _m42$1 * _m23$1 + _m43$1 * _m33$0 + _m44$1 * _m43$0;
		m44$0$0$0 = _m41$1 * _m14$1 + _m42$1 * _m24$1 + _m43$1 * _m34$0 + _m44$1 * _m44$0;
		this$0$0.matrix = new Matrix$AN([ m11$0$0$0, m12$0$0$0, m13$0$0$0, m14$0$0$0, m21$0$0$0, m22$0$0$0, m23$0$0$0, m24$0$0$0, m31$0$0$0, m32$0$0$0, m33$0$0$0, m34$0$0$0, m41$0$0$0, m42$0$0$0, m43$0$0$0, m44$0$0$0 ]);
	});
	update = gameUpdate;
	gameRender = (function (context) {
		$this._renderPlayer$LContext3D$(context);
		$this._renderTrees$LContext3D$(context);
		$this._renderItems$LContext3D$(context);
		$this._renderField$LContext3D$(context);
	});
	clearedRender = (function (context) {
		$this._renderPlayer$LContext3D$(context);
		$this._renderField$LContext3D$(context);
	});
	render = gameRender;
	isCleared = false;
	this.engine.onUpdate = (function (elapsedMsec) {
		/** @type {!number} */
		var x$0;
		/** @type {Player} */
		var player$0;
		/** @type {!number} */
		var z$0;
		if (! $this.isStarted) {
			return;
		}
		if ($this.player.y < -1000) {
			$this.player = {r: 12, x: 0, y: 10, z: 0, vx: 0, vy: 0, vz: 0, ax: 0, ay: - 120, az: 0, rot: Quaternion$rotating$NNNN(0, 1, 0, 0), radius: 8, isBraking: false};
			$this.isStarted = false;
		}
		if (! isCleared && (1050 <= (x$0 = (player$0 = $this.player).x) && x$0 <= 1110) && (1350 <= (z$0 = player$0.z) && z$0 <= 1410)) {
			update = clearedUpdate;
			render = clearedRender;
			isCleared = true;
		}
		update(elapsedMsec);
	});
	backgroundColor = new Color$III(90, 135, 150);
	this.engine.onRender = (function (context, elapsedMsec) {
		$this.totalElapsedMsec += elapsedMsec;
		context.backgroundColor = backgroundColor;
		render(context);
	});
	this$3 = this.engine;
	if (this$3._isMobile) {
		this._setMobileOperation$();
	} else {
		this._setPCOperation$();
	}
};

BlueBall$.prototype = new BlueBall;

/**
 */
BlueBall.prototype._initTrees$ = function () {
	this.trees = new List$Vector$E$ALVector$([ new Vector$NNN(-271, -3, 450), new Vector$NNN(-200, -3, 720), new Vector$NNN(139, -3, 351), new Vector$NNN(171, -3, 254), new Vector$NNN(214, -3, 192), new Vector$NNN(-253, -3, 555), new Vector$NNN(29, -3, 385), new Vector$NNN(-72, -3, 530), new Vector$NNN(96, -3, 678), new Vector$NNN(-49, -3, 222) ]);
	this.treeRadius = 24;
};

/**
 */
BlueBall.prototype._initItems$ = function () {
	this.items = new List$Vector$E$ALVector$([ new Vector$NNN(149, -10, 724), new Vector$NNN(107, -10, 483), new Vector$NNN(279, -10, 551), new Vector$NNN(-295, -10, 261), new Vector$NNN(-16, -10, 225), new Vector$NNN(95, -10, 165), new Vector$NNN(264, -10, 161), new Vector$NNN(-50, -10, 325), new Vector$NNN(-169, -10, 254), new Vector$NNN(271, -10, 401) ]);
	this.itemRadius = 8;
};

/**
 * @param {!number} elapsedMsec
 */
BlueBall.prototype._checkCollisionWithFloor$N = function (elapsedMsec) {
	/** @type {Player} */
	var player;
	/** @type {!number} */
	var x;
	/** @type {!number} */
	var y;
	/** @type {!number} */
	var z;
	/** @type {!number} */
	var height;
	/** @type {!number} */
	var vdot$0;
	/** @type {Vector} */
	var normal$1;
	/** @type {!number} */
	var vdot$1;
	/** @type {Vector} */
	var normal$2;
	/** @type {!number} */
	var vdot$2;
	/** @type {Vector} */
	var normal$3;
	/** @type {!number} */
	var vdot$3;
	/** @type {Vector} */
	var this$0;
	/** @type {!number} */
	var length$0;
	/** @type {Vector} */
	var this$1;
	/** @type {!number} */
	var length$1;
	/** @type {Vector} */
	var this$2;
	/** @type {!number} */
	var length$2;
	/** @type {!number} */
	var x$0;
	/** @type {!number} */
	var y$0;
	/** @type {!number} */
	var z$0;
	/** @type {!number} */
	var x$1;
	/** @type {!number} */
	var y$1;
	/** @type {!number} */
	var z$1;
	/** @type {!number} */
	var x$2;
	/** @type {!number} */
	var y$2;
	/** @type {!number} */
	var z$2;
	/** @type {!number} */
	var x$3;
	/** @type {!number} */
	var y$3;
	/** @type {!number} */
	var z$3;
	/** @type {!number} */
	var x$4;
	/** @type {!number} */
	var y$4;
	/** @type {!number} */
	var z$4;
	/** @type {!number} */
	var x$5;
	/** @type {!number} */
	var y$5;
	/** @type {!number} */
	var z$5;
	/** @type {!number} */
	var x$6;
	/** @type {!number} */
	var y$6;
	/** @type {!number} */
	var z$6;
	/** @type {!number} */
	var normal$0$x$0;
	/** @type {!number} */
	var normal$0$y$0;
	/** @type {!number} */
	var normal$0$z$0;
	/** @type {!number} */
	var normal$0$w$0;
	player = this.player;
	Player$update$LPlayer$N(player, elapsedMsec);
	x = player.x;
	y = player.y;
	z = player.z;
	if (-30 <= x && x <= 30 && -30 <= z && z <= 150 || -300 <= x && x <= 300 && 150 <= z && z <= 750 || -30 <= x && x <= 30 && 750 <= z && z <= 810 || -30 <= x && x <= 570 && 810 <= z && z <= 870 || 510 <= x && x <= 1110 && 150 <= z && z <= 210 || 1050 <= x && x <= 1110 && 750 <= z && z <= 1350) {
		if (- player.radius * 2 < y && y < 0) {
			normal$0$x$0 = 0;
			normal$0$y$0 = 1;
			normal$0$z$0 = 0;
			normal$0$w$0 = 1;
			vdot$0 = player.vx * (x$0 = normal$0$x$0) + player.vy * (y$0 = normal$0$y$0) + player.vz * (z$0 = normal$0$z$0);
			player.vx -= 1.5 * vdot$0 * x$0;
			player.vy -= 1.5 * vdot$0 * y$0;
			player.vz -= 1.5 * vdot$0 * z$0;
			player.y = 0;
		}
	}
	if (510 <= x && x <= 570 && 510 <= z && z <= 810) {
		height = Math.floor((810 - z) / 30);
		height *= 5;
		if (height - player.radius * 2 < y && y < height) {
			this$0 = new Vector$NNN(0, 30, 5);
			length$0 = Math.sqrt((x$1 = this$0.x) * x$1 + (y$1 = this$0.y) * y$1 + (z$1 = this$0.z) * z$1);
			normal$1 = (length$0 < 1e-9 ? new Vector$NNN(0, 0, 0) : this$0.divSelf$N(length$0));
			vdot$1 = player.vx * (x$2 = normal$1.x) + player.vy * (y$2 = normal$1.y) + player.vz * (z$2 = normal$1.z);
			player.vx -= 1.5 * vdot$1 * x$2;
			player.vy -= 1.5 * vdot$1 * y$2;
			player.vz -= 1.5 * vdot$1 * z$2;
			player.y = height;
		}
	}
	if (510 <= x && x <= 570 && 210 <= z && z < 510) {
		height = Math.floor((z - 210) / 30);
		height *= 5;
		if (height - player.radius * 2 < y && y < height) {
			this$1 = new Vector$NNN(0, 30, -5);
			length$1 = Math.sqrt((x$3 = this$1.x) * x$3 + (y$3 = this$1.y) * y$3 + (z$3 = this$1.z) * z$3);
			normal$2 = (length$1 < 1e-9 ? new Vector$NNN(0, 0, 0) : this$1.divSelf$N(length$1));
			vdot$2 = player.vx * (x$4 = normal$2.x) + player.vy * (y$4 = normal$2.y) + player.vz * (z$4 = normal$2.z);
			player.vx -= 1.5 * vdot$2 * x$4;
			player.vy -= 1.5 * vdot$2 * y$4;
			player.vz -= 1.5 * vdot$2 * z$4;
			player.y = height;
		}
	}
	if (1110 <= x && x <= 1270 && 150 <= z && z <= 810) {
		height = (x - 1110) / 160 * 80;
		if (height - player.radius * 2 < y && y < height) {
			this$2 = new Vector$NNN(-1, 2, 0);
			length$2 = Math.sqrt((x$5 = this$2.x) * x$5 + (y$5 = this$2.y) * y$5 + (z$5 = this$2.z) * z$5);
			normal$3 = (length$2 < 1e-9 ? new Vector$NNN(0, 0, 0) : this$2.divSelf$N(length$2));
			vdot$3 = player.vx * (x$6 = normal$3.x) + player.vy * (y$6 = normal$3.y) + player.vz * (z$6 = normal$3.z);
			player.vx -= 1.5 * vdot$3 * x$6;
			player.vy -= 1.5 * vdot$3 * y$6;
			player.vz -= 1.5 * vdot$3 * z$6;
			player.y = height;
		}
	}
};

/**
 */
BlueBall.prototype._checkCollisionWithTrees$ = function () {
	var $this = this;
	/** @type {Player} */
	var player;
	player = this.player;
	this.trees.forEach$F$LVector$V$((function (tree) {
		/** @type {!number} */
		var dx;
		/** @type {!number} */
		var dy;
		/** @type {!number} */
		var dz;
		/** @type {!number} */
		var dr;
		/** @type {Vector} */
		var normalVec;
		/** @type {!number} */
		var a;
		/** @type {Vector} */
		var this$0;
		/** @type {!number} */
		var length$0;
		/** @type {!number} */
		var x$0;
		/** @type {!number} */
		var y$0;
		/** @type {!number} */
		var z$0;
		/** @type {!number} */
		var vx$0;
		/** @type {!number} */
		var vy$0;
		/** @type {!number} */
		var vz$0;
		/** @type {!number} */
		var x$1;
		/** @type {!number} */
		var z$1;
		/** @type {!number} */
		var treeRadius$0;
		dx = player.x - tree.x;
		dy = player.y - tree.y;
		dz = player.z - tree.z;
		dr = $this.treeRadius + player.radius;
		if (dx * dx + dy * dy + dz * dz < dr * dr) {
			this$0 = new Vector$NNN(dx, dy, dz);
			length$0 = Math.sqrt((x$0 = this$0.x) * x$0 + (y$0 = this$0.y) * y$0 + (z$0 = this$0.z) * z$0);
			normalVec = (length$0 < 1e-9 ? new Vector$NNN(0, 0, 0) : this$0.divSelf$N(length$0));
			a = Math.sqrt((vx$0 = player.vx) * vx$0 + (vy$0 = player.vy) * vy$0 + (vz$0 = player.vz) * vz$0);
			player.ax += 2 * a * (x$1 = normalVec.x);
			player.vy += 2 * a * normalVec.y;
			player.az += 2 * a * (z$1 = normalVec.z);
			player.x += x$1 * (treeRadius$0 = $this.treeRadius) / 4;
			player.z += z$1 * treeRadius$0 / 4;
		}
	}));
};

/**
 */
BlueBall.prototype._checkCollisionWithItems$ = function () {
	/** @type {Player} */
	var player;
	/** @type {List$Vector$E} */
	var items;
	/** @type {!number} */
	var radius;
	/** @type {Node$Vector$E} */
	var n;
	/** @type {Vector} */
	var item;
	/** @type {!number} */
	var dx;
	/** @type {!number} */
	var dy;
	/** @type {!number} */
	var dz;
	/** @type {!number} */
	var dr;
	player = this.player;
	items = this.items;
	radius = this.itemRadius;
	for (n = items.head; n; n = n._next) {
		item = n.value;
		dx = item.x - player.x;
		dy = item.y - player.y;
		dz = item.z - player.z;
		dr = radius + player.radius;
		if (dx * dx + dy * dy + dz * dz < dr * dr) {
			items.remove$LNode$Vector$E$(n);
		}
	}
};

/**
 */
BlueBall.prototype._updateViewpoint$ = function () {
	/** @type {Player} */
	var player;
	/** @type {!number} */
	var dz;
	/** @type {!number} */
	var dx;
	/** @type {!number} */
	var len;
	/** @type {!number} */
	var y;
	/** @type {!number} */
	var yOffset;
	/** @type {!number} */
	var xzVelocity;
	/** @type {Vector} */
	var view;
	/** @type {Vector} */
	var target;
	/** @type {Camera} */
	var this$0;
	/** @type {Vector} */
	var view$0;
	/** @type {Vector} */
	var target$0;
	/** @type {Vector} */
	var upper$0;
	/** @type {!number} */
	var fovyX$0;
	/** @type {!number} */
	var nearZ$0;
	/** @type {!number} */
	var farZ$0;
	/** @type {!number} */
	var aspectRatio$0;
	/** @type {Matrix} */
	var viewMatrix$0;
	/** @type {Matrix} */
	var projectionMatrix$0;
	/** @type {Vector} */
	var zaxis$0$0;
	/** @type {Vector} */
	var xaxis$0$0;
	/** @type {Vector} */
	var yaxis$0$0;
	/** @type {Vector} */
	var this$0$0$0;
	/** @type {!number} */
	var length$0$0$0;
	/** @type {Vector} */
	var this$1$0$0;
	/** @type {!number} */
	var length$1$0$0;
	/** @type {Vector} */
	var this$2$0$0;
	/** @type {!number} */
	var length$2$0$0;
	/** @type {!number} */
	var sx$0$0;
	/** @type {!number} */
	var sy$0$0;
	/** @type {!number} */
	var sz$0$0;
	/** @type {!number} */
	var mz$0$0;
	/** @type {!number} */
	var m11$0$0;
	/** @type {!number} */
	var m12$0$0;
	/** @type {!number} */
	var m13$0$0;
	/** @type {!number} */
	var m14$0$0;
	/** @type {!number} */
	var m21$0$0;
	/** @type {!number} */
	var m22$0$0;
	/** @type {!number} */
	var m23$0$0;
	/** @type {!number} */
	var m24$0$0;
	/** @type {!number} */
	var m31$0$0;
	/** @type {!number} */
	var m32$0$0;
	/** @type {!number} */
	var m33$0$0;
	/** @type {!number} */
	var m34$0$0;
	/** @type {!number} */
	var m41$0$0;
	/** @type {!number} */
	var m42$0$0;
	/** @type {!number} */
	var m43$0$0;
	/** @type {!number} */
	var m44$0$0;
	/** @type {!number} */
	var vx$0;
	/** @type {!number} */
	var vz$0;
	/** @type {Camera} */
	var camera$0;
	/** @type {Engine} */
	var engine$0;
	/** @type {!number} */
	var x$0;
	/** @type {!number} */
	var y$0;
	/** @type {!number} */
	var z$0;
	/** @type {!number} */
	var z$1;
	/** @type {!number} */
	var z$2;
	/** @type {!number} */
	var x$1;
	/** @type {!number} */
	var y$1;
	/** @type {!number} */
	var y$2;
	/** @type {!number} */
	var x$2;
	/** @type {!number} */
	var x$3;
	/** @type {!number} */
	var y$3;
	/** @type {!number} */
	var z$3;
	/** @type {!number} */
	var z$4;
	/** @type {!number} */
	var z$5;
	/** @type {!number} */
	var x$4;
	/** @type {!number} */
	var y$4;
	/** @type {!number} */
	var y$5;
	/** @type {!number} */
	var x$5;
	/** @type {!number} */
	var x$6;
	/** @type {!number} */
	var y$6;
	/** @type {!number} */
	var z$6;
	/** @type {!number} */
	var x$7;
	/** @type {!number} */
	var y$7;
	/** @type {!number} */
	var z$7;
	/** @type {!number} */
	var x$8;
	/** @type {!number} */
	var x$9;
	/** @type {!number} */
	var y$8;
	/** @type {!number} */
	var y$9;
	/** @type {!number} */
	var z$8;
	/** @type {!number} */
	var z$9;
	/** @type {!number} */
	var x$10;
	/** @type {!number} */
	var y$10;
	/** @type {!number} */
	var z$10;
	/** @type {!number} */
	var _m11$0;
	/** @type {!number} */
	var _m12$0;
	/** @type {!number} */
	var _m13$0;
	/** @type {!number} */
	var _m14$0;
	/** @type {!number} */
	var _m11$1;
	/** @type {!number} */
	var _m21$0;
	/** @type {!number} */
	var _m31$0;
	/** @type {!number} */
	var _m41$0;
	/** @type {!number} */
	var _m21$1;
	/** @type {!number} */
	var _m12$1;
	/** @type {!number} */
	var _m22$0;
	/** @type {!number} */
	var _m22$1;
	/** @type {!number} */
	var _m23$0;
	/** @type {!number} */
	var _m32$0;
	/** @type {!number} */
	var _m24$0;
	/** @type {!number} */
	var _m42$0;
	/** @type {!number} */
	var _m13$1;
	/** @type {!number} */
	var _m23$1;
	/** @type {!number} */
	var _m33$0;
	/** @type {!number} */
	var _m43$0;
	/** @type {!number} */
	var _m14$1;
	/** @type {!number} */
	var _m24$1;
	/** @type {!number} */
	var _m34$0;
	/** @type {!number} */
	var _m44$0;
	/** @type {!number} */
	var _m31$1;
	/** @type {!number} */
	var _m32$1;
	/** @type {!number} */
	var _m33$1;
	/** @type {!number} */
	var _m34$1;
	/** @type {!number} */
	var _m41$1;
	/** @type {!number} */
	var _m42$1;
	/** @type {!number} */
	var _m43$1;
	/** @type {!number} */
	var _m44$1;
	player = this.player;
	dz = - player.vz;
	dx = - player.vx;
	len = Math.sqrt(dz * dz + dx * dx);
	if (len < 1e-9) {
		dz = -1;
		dx = 0;
	} else {
		dz /= len;
		dx /= len;
	}
	y = player.y;
	if (y < 0) {
		y = (y >= -300 ? y : -300);
		y = - y / 2;
	}
	yOffset = 10;
	xzVelocity = Math.sqrt((vx$0 = player.vx) * vx$0 + (vz$0 = player.vz) * vz$0);
	if (xzVelocity < 50) {
		yOffset -= (50 - xzVelocity) * 0.6;
	}
	view = new Vector$NNN(player.x + dx * 50, y * 1.2 + yOffset, player.z + dz * 50);
	target = new Vector$NNN(player.x, player.y, player.z);
	(camera$0 = (engine$0 = this.engine).camera).target = target;
	camera$0.view = view;
	this$0 = camera$0;
	view$0 = this$0.view;
	target$0 = this$0.target;
	upper$0 = this$0.upper;
	fovyX$0 = this$0.fovyX;
	nearZ$0 = this$0.nearZ;
	farZ$0 = this$0.farZ;
	aspectRatio$0 = this$0.aspectRatio;
	this$0$0$0 = new Vector$NNN(target$0.x - view$0.x, target$0.y - view$0.y, target$0.z - view$0.z);
	length$0$0$0 = Math.sqrt((x$0 = this$0$0$0.x) * x$0 + (y$0 = this$0$0$0.y) * y$0 + (z$0 = this$0$0$0.z) * z$0);
	zaxis$0$0 = (length$0$0$0 < 1e-9 ? new Vector$NNN(0, 0, 0) : this$0$0$0.divSelf$N(length$0$0$0));
	this$1$0$0 = new Vector$NNN((y$2 = upper$0.y) * (z$2 = zaxis$0$0.z) - (z$1 = upper$0.z) * (y$1 = zaxis$0$0.y), z$1 * (x$2 = zaxis$0$0.x) - (x$1 = upper$0.x) * z$2, x$1 * y$1 - y$2 * x$2);
	length$1$0$0 = Math.sqrt((x$3 = this$1$0$0.x) * x$3 + (y$3 = this$1$0$0.y) * y$3 + (z$3 = this$1$0$0.z) * z$3);
	xaxis$0$0 = (length$1$0$0 < 1e-9 ? new Vector$NNN(0, 0, 0) : this$1$0$0.divSelf$N(length$1$0$0));
	this$2$0$0 = new Vector$NNN((y$5 = zaxis$0$0.y) * (z$5 = xaxis$0$0.z) - (z$4 = zaxis$0$0.z) * (y$4 = xaxis$0$0.y), z$4 * (x$5 = xaxis$0$0.x) - (x$4 = zaxis$0$0.x) * z$5, x$4 * y$4 - y$5 * x$5);
	length$2$0$0 = Math.sqrt((x$6 = this$2$0$0.x) * x$6 + (y$6 = this$2$0$0.y) * y$6 + (z$6 = this$2$0$0.z) * z$6);
	yaxis$0$0 = (length$2$0$0 < 1e-9 ? new Vector$NNN(0, 0, 0) : this$2$0$0.divSelf$N(length$2$0$0));
	viewMatrix$0 = new Matrix$AN([ x$7 = xaxis$0$0.x, y$7 = xaxis$0$0.y, z$7 = xaxis$0$0.z, - (x$7 * (x$9 = view$0.x) + y$7 * (y$9 = view$0.y) + z$7 * (z$9 = view$0.z)), x$8 = yaxis$0$0.x, y$8 = yaxis$0$0.y, z$8 = yaxis$0$0.z, - (x$8 * x$9 + y$8 * y$9 + z$8 * z$9), x$10 = zaxis$0$0.x, y$10 = zaxis$0$0.y, z$10 = zaxis$0$0.z, - (x$10 * x$9 + y$10 * y$9 + z$10 * z$9), 0, 0, 0, 1 ]);
	sx$0$0 = 1 / Math.tan(fovyX$0 / 2);
	sy$0$0 = sx$0$0 / aspectRatio$0;
	sz$0$0 = farZ$0 / (farZ$0 - nearZ$0);
	mz$0$0 = - sz$0$0 * nearZ$0;
	projectionMatrix$0 = new Matrix$AN([ sx$0$0, 0, 0, 0, 0, sy$0$0, 0, 0, 0, 0, sz$0$0, mz$0$0, 0, 0, 1, 0 ]);
	this$0.viewMatrix = viewMatrix$0;
	this$0.projectionMatrix = projectionMatrix$0;
	m11$0$0 = (_m11$0 = projectionMatrix$0._m11) * (_m11$1 = viewMatrix$0._m11) + (_m12$0 = projectionMatrix$0._m12) * (_m21$0 = viewMatrix$0._m21) + (_m13$0 = projectionMatrix$0._m13) * (_m31$0 = viewMatrix$0._m31) + (_m14$0 = projectionMatrix$0._m14) * (_m41$0 = viewMatrix$0._m41);
	m12$0$0 = _m11$0 * (_m12$1 = viewMatrix$0._m12) + _m12$0 * (_m22$1 = viewMatrix$0._m22) + _m13$0 * (_m32$0 = viewMatrix$0._m32) + _m14$0 * (_m42$0 = viewMatrix$0._m42);
	m13$0$0 = _m11$0 * (_m13$1 = viewMatrix$0._m13) + _m12$0 * (_m23$1 = viewMatrix$0._m23) + _m13$0 * (_m33$0 = viewMatrix$0._m33) + _m14$0 * (_m43$0 = viewMatrix$0._m43);
	m14$0$0 = _m11$0 * (_m14$1 = viewMatrix$0._m14) + _m12$0 * (_m24$1 = viewMatrix$0._m24) + _m13$0 * (_m34$0 = viewMatrix$0._m34) + _m14$0 * (_m44$0 = viewMatrix$0._m44);
	m21$0$0 = (_m21$1 = projectionMatrix$0._m21) * _m11$1 + (_m22$0 = projectionMatrix$0._m22) * _m21$0 + (_m23$0 = projectionMatrix$0._m23) * _m31$0 + (_m24$0 = projectionMatrix$0._m24) * _m41$0;
	m22$0$0 = _m21$1 * _m12$1 + _m22$0 * _m22$1 + _m23$0 * _m32$0 + _m24$0 * _m42$0;
	m23$0$0 = _m21$1 * _m13$1 + _m22$0 * _m23$1 + _m23$0 * _m33$0 + _m24$0 * _m43$0;
	m24$0$0 = _m21$1 * _m14$1 + _m22$0 * _m24$1 + _m23$0 * _m34$0 + _m24$0 * _m44$0;
	m31$0$0 = (_m31$1 = projectionMatrix$0._m31) * _m11$1 + (_m32$1 = projectionMatrix$0._m32) * _m21$0 + (_m33$1 = projectionMatrix$0._m33) * _m31$0 + (_m34$1 = projectionMatrix$0._m34) * _m41$0;
	m32$0$0 = _m31$1 * _m12$1 + _m32$1 * _m22$1 + _m33$1 * _m32$0 + _m34$1 * _m42$0;
	m33$0$0 = _m31$1 * _m13$1 + _m32$1 * _m23$1 + _m33$1 * _m33$0 + _m34$1 * _m43$0;
	m34$0$0 = _m31$1 * _m14$1 + _m32$1 * _m24$1 + _m33$1 * _m34$0 + _m34$1 * _m44$0;
	m41$0$0 = (_m41$1 = projectionMatrix$0._m41) * _m11$1 + (_m42$1 = projectionMatrix$0._m42) * _m21$0 + (_m43$1 = projectionMatrix$0._m43) * _m31$0 + (_m44$1 = projectionMatrix$0._m44) * _m41$0;
	m42$0$0 = _m41$1 * _m12$1 + _m42$1 * _m22$1 + _m43$1 * _m32$0 + _m44$1 * _m42$0;
	m43$0$0 = _m41$1 * _m13$1 + _m42$1 * _m23$1 + _m43$1 * _m33$0 + _m44$1 * _m43$0;
	m44$0$0 = _m41$1 * _m14$1 + _m42$1 * _m24$1 + _m43$1 * _m34$0 + _m44$1 * _m44$0;
	this$0.matrix = new Matrix$AN([ m11$0$0, m12$0$0, m13$0$0, m14$0$0, m21$0$0, m22$0$0, m23$0$0, m24$0$0, m31$0$0, m32$0$0, m33$0$0, m34$0$0, m41$0$0, m42$0$0, m43$0$0, m44$0$0 ]);
};

/**
 * @param {!number} elapsedMsec
 */
BlueBall.prototype._updateClearedPlayer$N = function (elapsedMsec) {
	/** @type {Player} */
	var player;
	/** @type {!number} */
	var dx;
	/** @type {!number} */
	var dy;
	/** @type {!number} */
	var dz;
	player = this.player;
	dx = player.x - 1080;
	dy = player.y - 20;
	dz = player.z - 1380;
	if ((dx >= 0 ? dx : - dx) < 1 && (dz >= 0 ? dz : - dz) < 1) {
		player.y -= Math.sin(this.totalElapsedMsec / 1000) * 10 * elapsedMsec / 1000;
	} else {
		player.x -= dx * elapsedMsec / 1000;
		player.y -= dy * elapsedMsec / 1000;
		player.z -= dz * elapsedMsec / 1000;
	}
};

/**
 */
BlueBall.prototype._updateClearedViewpoint$ = function () {
	/** @type {Player} */
	var player;
	/** @type {Vector} */
	var view;
	/** @type {Vector} */
	var target;
	/** @type {Camera} */
	var this$0;
	/** @type {Vector} */
	var view$0;
	/** @type {Vector} */
	var target$0;
	/** @type {Vector} */
	var upper$0;
	/** @type {!number} */
	var fovyX$0;
	/** @type {!number} */
	var nearZ$0;
	/** @type {!number} */
	var farZ$0;
	/** @type {!number} */
	var aspectRatio$0;
	/** @type {Matrix} */
	var viewMatrix$0;
	/** @type {Matrix} */
	var projectionMatrix$0;
	/** @type {Vector} */
	var zaxis$0$0;
	/** @type {Vector} */
	var xaxis$0$0;
	/** @type {Vector} */
	var yaxis$0$0;
	/** @type {Vector} */
	var this$0$0$0;
	/** @type {!number} */
	var length$0$0$0;
	/** @type {Vector} */
	var this$1$0$0;
	/** @type {!number} */
	var length$1$0$0;
	/** @type {Vector} */
	var this$2$0$0;
	/** @type {!number} */
	var length$2$0$0;
	/** @type {!number} */
	var sx$0$0;
	/** @type {!number} */
	var sy$0$0;
	/** @type {!number} */
	var sz$0$0;
	/** @type {!number} */
	var mz$0$0;
	/** @type {!number} */
	var m11$0$0;
	/** @type {!number} */
	var m12$0$0;
	/** @type {!number} */
	var m13$0$0;
	/** @type {!number} */
	var m14$0$0;
	/** @type {!number} */
	var m21$0$0;
	/** @type {!number} */
	var m22$0$0;
	/** @type {!number} */
	var m23$0$0;
	/** @type {!number} */
	var m24$0$0;
	/** @type {!number} */
	var m31$0$0;
	/** @type {!number} */
	var m32$0$0;
	/** @type {!number} */
	var m33$0$0;
	/** @type {!number} */
	var m34$0$0;
	/** @type {!number} */
	var m41$0$0;
	/** @type {!number} */
	var m42$0$0;
	/** @type {!number} */
	var m43$0$0;
	/** @type {!number} */
	var m44$0$0;
	/** @type {Camera} */
	var camera$0;
	/** @type {Engine} */
	var engine$0;
	/** @type {!number} */
	var x$0;
	/** @type {!number} */
	var y$0;
	/** @type {!number} */
	var z$0;
	/** @type {!number} */
	var z$1;
	/** @type {!number} */
	var z$2;
	/** @type {!number} */
	var x$1;
	/** @type {!number} */
	var y$1;
	/** @type {!number} */
	var y$2;
	/** @type {!number} */
	var x$2;
	/** @type {!number} */
	var x$3;
	/** @type {!number} */
	var y$3;
	/** @type {!number} */
	var z$3;
	/** @type {!number} */
	var z$4;
	/** @type {!number} */
	var z$5;
	/** @type {!number} */
	var x$4;
	/** @type {!number} */
	var y$4;
	/** @type {!number} */
	var y$5;
	/** @type {!number} */
	var x$5;
	/** @type {!number} */
	var x$6;
	/** @type {!number} */
	var y$6;
	/** @type {!number} */
	var z$6;
	/** @type {!number} */
	var x$7;
	/** @type {!number} */
	var y$7;
	/** @type {!number} */
	var z$7;
	/** @type {!number} */
	var x$8;
	/** @type {!number} */
	var x$9;
	/** @type {!number} */
	var y$8;
	/** @type {!number} */
	var y$9;
	/** @type {!number} */
	var z$8;
	/** @type {!number} */
	var z$9;
	/** @type {!number} */
	var x$10;
	/** @type {!number} */
	var y$10;
	/** @type {!number} */
	var z$10;
	/** @type {!number} */
	var _m11$0;
	/** @type {!number} */
	var _m12$0;
	/** @type {!number} */
	var _m13$0;
	/** @type {!number} */
	var _m14$0;
	/** @type {!number} */
	var _m11$1;
	/** @type {!number} */
	var _m21$0;
	/** @type {!number} */
	var _m31$0;
	/** @type {!number} */
	var _m41$0;
	/** @type {!number} */
	var _m21$1;
	/** @type {!number} */
	var _m12$1;
	/** @type {!number} */
	var _m22$0;
	/** @type {!number} */
	var _m22$1;
	/** @type {!number} */
	var _m23$0;
	/** @type {!number} */
	var _m32$0;
	/** @type {!number} */
	var _m24$0;
	/** @type {!number} */
	var _m42$0;
	/** @type {!number} */
	var _m13$1;
	/** @type {!number} */
	var _m23$1;
	/** @type {!number} */
	var _m33$0;
	/** @type {!number} */
	var _m43$0;
	/** @type {!number} */
	var _m14$1;
	/** @type {!number} */
	var _m24$1;
	/** @type {!number} */
	var _m34$0;
	/** @type {!number} */
	var _m44$0;
	/** @type {!number} */
	var _m31$1;
	/** @type {!number} */
	var _m32$1;
	/** @type {!number} */
	var _m33$1;
	/** @type {!number} */
	var _m34$1;
	/** @type {!number} */
	var _m41$1;
	/** @type {!number} */
	var _m42$1;
	/** @type {!number} */
	var _m43$1;
	/** @type {!number} */
	var _m44$1;
	player = this.player;
	view = new Vector$NNN(player.x + Math.sin(this.totalElapsedMsec / 5000) * 50, player.y + 20, player.z + Math.cos(this.totalElapsedMsec / 5000) * 50);
	target = new Vector$NNN(player.x, player.y, player.z);
	(camera$0 = (engine$0 = this.engine).camera).target = target;
	camera$0.view = view;
	this$0 = camera$0;
	view$0 = this$0.view;
	target$0 = this$0.target;
	upper$0 = this$0.upper;
	fovyX$0 = this$0.fovyX;
	nearZ$0 = this$0.nearZ;
	farZ$0 = this$0.farZ;
	aspectRatio$0 = this$0.aspectRatio;
	this$0$0$0 = new Vector$NNN(target$0.x - view$0.x, target$0.y - view$0.y, target$0.z - view$0.z);
	length$0$0$0 = Math.sqrt((x$0 = this$0$0$0.x) * x$0 + (y$0 = this$0$0$0.y) * y$0 + (z$0 = this$0$0$0.z) * z$0);
	zaxis$0$0 = (length$0$0$0 < 1e-9 ? new Vector$NNN(0, 0, 0) : this$0$0$0.divSelf$N(length$0$0$0));
	this$1$0$0 = new Vector$NNN((y$2 = upper$0.y) * (z$2 = zaxis$0$0.z) - (z$1 = upper$0.z) * (y$1 = zaxis$0$0.y), z$1 * (x$2 = zaxis$0$0.x) - (x$1 = upper$0.x) * z$2, x$1 * y$1 - y$2 * x$2);
	length$1$0$0 = Math.sqrt((x$3 = this$1$0$0.x) * x$3 + (y$3 = this$1$0$0.y) * y$3 + (z$3 = this$1$0$0.z) * z$3);
	xaxis$0$0 = (length$1$0$0 < 1e-9 ? new Vector$NNN(0, 0, 0) : this$1$0$0.divSelf$N(length$1$0$0));
	this$2$0$0 = new Vector$NNN((y$5 = zaxis$0$0.y) * (z$5 = xaxis$0$0.z) - (z$4 = zaxis$0$0.z) * (y$4 = xaxis$0$0.y), z$4 * (x$5 = xaxis$0$0.x) - (x$4 = zaxis$0$0.x) * z$5, x$4 * y$4 - y$5 * x$5);
	length$2$0$0 = Math.sqrt((x$6 = this$2$0$0.x) * x$6 + (y$6 = this$2$0$0.y) * y$6 + (z$6 = this$2$0$0.z) * z$6);
	yaxis$0$0 = (length$2$0$0 < 1e-9 ? new Vector$NNN(0, 0, 0) : this$2$0$0.divSelf$N(length$2$0$0));
	viewMatrix$0 = new Matrix$AN([ x$7 = xaxis$0$0.x, y$7 = xaxis$0$0.y, z$7 = xaxis$0$0.z, - (x$7 * (x$9 = view$0.x) + y$7 * (y$9 = view$0.y) + z$7 * (z$9 = view$0.z)), x$8 = yaxis$0$0.x, y$8 = yaxis$0$0.y, z$8 = yaxis$0$0.z, - (x$8 * x$9 + y$8 * y$9 + z$8 * z$9), x$10 = zaxis$0$0.x, y$10 = zaxis$0$0.y, z$10 = zaxis$0$0.z, - (x$10 * x$9 + y$10 * y$9 + z$10 * z$9), 0, 0, 0, 1 ]);
	sx$0$0 = 1 / Math.tan(fovyX$0 / 2);
	sy$0$0 = sx$0$0 / aspectRatio$0;
	sz$0$0 = farZ$0 / (farZ$0 - nearZ$0);
	mz$0$0 = - sz$0$0 * nearZ$0;
	projectionMatrix$0 = new Matrix$AN([ sx$0$0, 0, 0, 0, 0, sy$0$0, 0, 0, 0, 0, sz$0$0, mz$0$0, 0, 0, 1, 0 ]);
	this$0.viewMatrix = viewMatrix$0;
	this$0.projectionMatrix = projectionMatrix$0;
	m11$0$0 = (_m11$0 = projectionMatrix$0._m11) * (_m11$1 = viewMatrix$0._m11) + (_m12$0 = projectionMatrix$0._m12) * (_m21$0 = viewMatrix$0._m21) + (_m13$0 = projectionMatrix$0._m13) * (_m31$0 = viewMatrix$0._m31) + (_m14$0 = projectionMatrix$0._m14) * (_m41$0 = viewMatrix$0._m41);
	m12$0$0 = _m11$0 * (_m12$1 = viewMatrix$0._m12) + _m12$0 * (_m22$1 = viewMatrix$0._m22) + _m13$0 * (_m32$0 = viewMatrix$0._m32) + _m14$0 * (_m42$0 = viewMatrix$0._m42);
	m13$0$0 = _m11$0 * (_m13$1 = viewMatrix$0._m13) + _m12$0 * (_m23$1 = viewMatrix$0._m23) + _m13$0 * (_m33$0 = viewMatrix$0._m33) + _m14$0 * (_m43$0 = viewMatrix$0._m43);
	m14$0$0 = _m11$0 * (_m14$1 = viewMatrix$0._m14) + _m12$0 * (_m24$1 = viewMatrix$0._m24) + _m13$0 * (_m34$0 = viewMatrix$0._m34) + _m14$0 * (_m44$0 = viewMatrix$0._m44);
	m21$0$0 = (_m21$1 = projectionMatrix$0._m21) * _m11$1 + (_m22$0 = projectionMatrix$0._m22) * _m21$0 + (_m23$0 = projectionMatrix$0._m23) * _m31$0 + (_m24$0 = projectionMatrix$0._m24) * _m41$0;
	m22$0$0 = _m21$1 * _m12$1 + _m22$0 * _m22$1 + _m23$0 * _m32$0 + _m24$0 * _m42$0;
	m23$0$0 = _m21$1 * _m13$1 + _m22$0 * _m23$1 + _m23$0 * _m33$0 + _m24$0 * _m43$0;
	m24$0$0 = _m21$1 * _m14$1 + _m22$0 * _m24$1 + _m23$0 * _m34$0 + _m24$0 * _m44$0;
	m31$0$0 = (_m31$1 = projectionMatrix$0._m31) * _m11$1 + (_m32$1 = projectionMatrix$0._m32) * _m21$0 + (_m33$1 = projectionMatrix$0._m33) * _m31$0 + (_m34$1 = projectionMatrix$0._m34) * _m41$0;
	m32$0$0 = _m31$1 * _m12$1 + _m32$1 * _m22$1 + _m33$1 * _m32$0 + _m34$1 * _m42$0;
	m33$0$0 = _m31$1 * _m13$1 + _m32$1 * _m23$1 + _m33$1 * _m33$0 + _m34$1 * _m43$0;
	m34$0$0 = _m31$1 * _m14$1 + _m32$1 * _m24$1 + _m33$1 * _m34$0 + _m34$1 * _m44$0;
	m41$0$0 = (_m41$1 = projectionMatrix$0._m41) * _m11$1 + (_m42$1 = projectionMatrix$0._m42) * _m21$0 + (_m43$1 = projectionMatrix$0._m43) * _m31$0 + (_m44$1 = projectionMatrix$0._m44) * _m41$0;
	m42$0$0 = _m41$1 * _m12$1 + _m42$1 * _m22$1 + _m43$1 * _m32$0 + _m44$1 * _m42$0;
	m43$0$0 = _m41$1 * _m13$1 + _m42$1 * _m23$1 + _m43$1 * _m33$0 + _m44$1 * _m43$0;
	m44$0$0 = _m41$1 * _m14$1 + _m42$1 * _m24$1 + _m43$1 * _m34$0 + _m44$1 * _m44$0;
	this$0.matrix = new Matrix$AN([ m11$0$0, m12$0$0, m13$0$0, m14$0$0, m21$0$0, m22$0$0, m23$0$0, m24$0$0, m31$0$0, m32$0$0, m33$0$0, m34$0$0, m41$0$0, m42$0$0, m43$0$0, m44$0$0 ]);
};

/**
 * @param {Context3D} context
 */
BlueBall.prototype._renderPlayer$LContext3D$ = function (context) {
	/** @type {!number} */
	var x$0;
	/** @type {!number} */
	var y$0;
	/** @type {!number} */
	var z$0;
	/** @type {Matrix} */
	var this$0$0;
	/** @type {!number} */
	var m11$0$0;
	/** @type {!number} */
	var m12$0$0;
	/** @type {!number} */
	var m13$0$0;
	/** @type {!number} */
	var m14$0$0;
	/** @type {!number} */
	var m21$0$0;
	/** @type {!number} */
	var m22$0$0;
	/** @type {!number} */
	var m23$0$0;
	/** @type {!number} */
	var m24$0$0;
	/** @type {!number} */
	var m31$0$0;
	/** @type {!number} */
	var m32$0$0;
	/** @type {!number} */
	var m33$0$0;
	/** @type {!number} */
	var m34$0$0;
	/** @type {!number} */
	var m41$0$0;
	/** @type {!number} */
	var m42$0$0;
	/** @type {!number} */
	var m43$0$0;
	/** @type {!number} */
	var m44$0$0;
	/** @type {Quaternion} */
	var q$0;
	/** @type {Matrix} */
	var this$0$1;
	/** @type {!number} */
	var m11$0$1;
	/** @type {!number} */
	var m12$0$1;
	/** @type {!number} */
	var m13$0$1;
	/** @type {!number} */
	var m14$0$1;
	/** @type {!number} */
	var m21$0$1;
	/** @type {!number} */
	var m22$0$1;
	/** @type {!number} */
	var m23$0$1;
	/** @type {!number} */
	var m24$0$1;
	/** @type {!number} */
	var m31$0$1;
	/** @type {!number} */
	var m32$0$1;
	/** @type {!number} */
	var m33$0$1;
	/** @type {!number} */
	var m34$0$1;
	/** @type {!number} */
	var m41$0$1;
	/** @type {!number} */
	var m42$0$1;
	/** @type {!number} */
	var m43$0$1;
	/** @type {!number} */
	var m44$0$1;
	/** @type {!number} */
	var x2$0$0;
	/** @type {!number} */
	var y2$0$0;
	/** @type {!number} */
	var z2$0$0;
	/** @type {!number} */
	var xy$0$0;
	/** @type {!number} */
	var zx$0$0;
	/** @type {!number} */
	var yz$0$0;
	/** @type {!number} */
	var xt$0$0;
	/** @type {!number} */
	var yt$0$0;
	/** @type {!number} */
	var zt$0$0;
	/** @type {Player} */
	var player$0;
	/** @type {Player} */
	var player$1;
	/** @type {!number} */
	var _m11$0;
	/** @type {!number} */
	var _m21$0;
	/** @type {!number} */
	var _m31$0;
	/** @type {!number} */
	var _m41$0;
	/** @type {!number} */
	var _m12$0;
	/** @type {!number} */
	var _m22$0;
	/** @type {!number} */
	var _m32$0;
	/** @type {!number} */
	var _m42$0;
	/** @type {!number} */
	var _m13$0;
	/** @type {!number} */
	var _m23$0;
	/** @type {!number} */
	var _m33$0;
	/** @type {!number} */
	var _m43$0;
	/** @type {!number} */
	var _m14$0;
	/** @type {!number} */
	var _m24$0;
	/** @type {!number} */
	var _m34$0;
	/** @type {!number} */
	var _m44$0;
	/** @type {!number} */
	var x$1;
	/** @type {!number} */
	var y$1;
	/** @type {!number} */
	var z$1;
	/** @type {!number} */
	var t$0;
	/** @type {!number} */
	var _m11$1;
	/** @type {!number} */
	var _m21$1;
	/** @type {!number} */
	var _m31$1;
	/** @type {!number} */
	var _m41$1;
	/** @type {!number} */
	var _m12$1;
	/** @type {!number} */
	var _m22$1;
	/** @type {!number} */
	var _m32$1;
	/** @type {!number} */
	var _m42$1;
	/** @type {!number} */
	var _m13$1;
	/** @type {!number} */
	var _m23$1;
	/** @type {!number} */
	var _m33$1;
	/** @type {!number} */
	var _m43$1;
	/** @type {!number} */
	var _m14$1;
	/** @type {!number} */
	var _m24$1;
	/** @type {!number} */
	var _m34$1;
	/** @type {!number} */
	var _m44$1;
	/** @type {!number} */
	var other$0$0$_m11$0;
	/** @type {!number} */
	var other$0$0$_m12$0;
	/** @type {!number} */
	var other$0$0$_m13$0;
	/** @type {!number} */
	var other$0$0$_m14$0;
	/** @type {!number} */
	var other$0$0$_m21$0;
	/** @type {!number} */
	var other$0$0$_m22$0;
	/** @type {!number} */
	var other$0$0$_m23$0;
	/** @type {!number} */
	var other$0$0$_m24$0;
	/** @type {!number} */
	var other$0$0$_m31$0;
	/** @type {!number} */
	var other$0$0$_m32$0;
	/** @type {!number} */
	var other$0$0$_m33$0;
	/** @type {!number} */
	var other$0$0$_m34$0;
	/** @type {!number} */
	var other$0$0$_m41$0;
	/** @type {!number} */
	var other$0$0$_m42$0;
	/** @type {!number} */
	var other$0$0$_m43$0;
	/** @type {!number} */
	var other$0$0$_m44$0;
	/** @type {!number} */
	var other$0$1$_m11$0;
	/** @type {!number} */
	var other$0$1$_m12$0;
	/** @type {!number} */
	var other$0$1$_m13$0;
	/** @type {!number} */
	var other$0$1$_m14$0;
	/** @type {!number} */
	var other$0$1$_m21$0;
	/** @type {!number} */
	var other$0$1$_m22$0;
	/** @type {!number} */
	var other$0$1$_m23$0;
	/** @type {!number} */
	var other$0$1$_m24$0;
	/** @type {!number} */
	var other$0$1$_m31$0;
	/** @type {!number} */
	var other$0$1$_m32$0;
	/** @type {!number} */
	var other$0$1$_m33$0;
	/** @type {!number} */
	var other$0$1$_m34$0;
	/** @type {!number} */
	var other$0$1$_m41$0;
	/** @type {!number} */
	var other$0$1$_m42$0;
	/** @type {!number} */
	var other$0$1$_m43$0;
	/** @type {!number} */
	var other$0$1$_m44$0;
	if ((player$0 = this.player).y < - player$0.radius) {
		Context3D$setDepth$LContext3D$I(context, 5);
	} else {
		Context3D$setDepth$LContext3D$I(context, 3);
	}
	x$0 = (player$1 = this.player).x;
	y$0 = player$1.y - 12;
	z$0 = player$1.z;
	this$0$0 = context._worldMatrix;
	other$0$0$_m11$0 = [ 1, 0, 0, x$0, 0, 1, 0, y$0, 0, 0, 1, z$0, 0, 0, 0, 1 ][0];
	other$0$0$_m12$0 = [ 1, 0, 0, x$0, 0, 1, 0, y$0, 0, 0, 1, z$0, 0, 0, 0, 1 ][1];
	other$0$0$_m13$0 = [ 1, 0, 0, x$0, 0, 1, 0, y$0, 0, 0, 1, z$0, 0, 0, 0, 1 ][2];
	other$0$0$_m14$0 = [ 1, 0, 0, x$0, 0, 1, 0, y$0, 0, 0, 1, z$0, 0, 0, 0, 1 ][3];
	other$0$0$_m21$0 = [ 1, 0, 0, x$0, 0, 1, 0, y$0, 0, 0, 1, z$0, 0, 0, 0, 1 ][4];
	other$0$0$_m22$0 = [ 1, 0, 0, x$0, 0, 1, 0, y$0, 0, 0, 1, z$0, 0, 0, 0, 1 ][5];
	other$0$0$_m23$0 = [ 1, 0, 0, x$0, 0, 1, 0, y$0, 0, 0, 1, z$0, 0, 0, 0, 1 ][6];
	other$0$0$_m24$0 = [ 1, 0, 0, x$0, 0, 1, 0, y$0, 0, 0, 1, z$0, 0, 0, 0, 1 ][7];
	other$0$0$_m31$0 = [ 1, 0, 0, x$0, 0, 1, 0, y$0, 0, 0, 1, z$0, 0, 0, 0, 1 ][8];
	other$0$0$_m32$0 = [ 1, 0, 0, x$0, 0, 1, 0, y$0, 0, 0, 1, z$0, 0, 0, 0, 1 ][9];
	other$0$0$_m33$0 = [ 1, 0, 0, x$0, 0, 1, 0, y$0, 0, 0, 1, z$0, 0, 0, 0, 1 ][10];
	other$0$0$_m34$0 = [ 1, 0, 0, x$0, 0, 1, 0, y$0, 0, 0, 1, z$0, 0, 0, 0, 1 ][11];
	other$0$0$_m41$0 = [ 1, 0, 0, x$0, 0, 1, 0, y$0, 0, 0, 1, z$0, 0, 0, 0, 1 ][12];
	other$0$0$_m42$0 = [ 1, 0, 0, x$0, 0, 1, 0, y$0, 0, 0, 1, z$0, 0, 0, 0, 1 ][13];
	other$0$0$_m43$0 = [ 1, 0, 0, x$0, 0, 1, 0, y$0, 0, 0, 1, z$0, 0, 0, 0, 1 ][14];
	other$0$0$_m44$0 = [ 1, 0, 0, x$0, 0, 1, 0, y$0, 0, 0, 1, z$0, 0, 0, 0, 1 ][15];
	m11$0$0 = this$0$0._m11;
	m12$0$0 = this$0$0._m12;
	m13$0$0 = this$0$0._m13;
	m14$0$0 = this$0$0._m14;
	m21$0$0 = this$0$0._m21;
	m22$0$0 = this$0$0._m22;
	m23$0$0 = this$0$0._m23;
	m24$0$0 = this$0$0._m24;
	m31$0$0 = this$0$0._m31;
	m32$0$0 = this$0$0._m32;
	m33$0$0 = this$0$0._m33;
	m34$0$0 = this$0$0._m34;
	m41$0$0 = this$0$0._m41;
	m42$0$0 = this$0$0._m42;
	m43$0$0 = this$0$0._m43;
	m44$0$0 = this$0$0._m44;
	this$0$0._m11 = m11$0$0 * (_m11$0 = other$0$0$_m11$0) + m12$0$0 * (_m21$0 = other$0$0$_m21$0) + m13$0$0 * (_m31$0 = other$0$0$_m31$0) + m14$0$0 * (_m41$0 = other$0$0$_m41$0);
	this$0$0._m12 = m11$0$0 * (_m12$0 = other$0$0$_m12$0) + m12$0$0 * (_m22$0 = other$0$0$_m22$0) + m13$0$0 * (_m32$0 = other$0$0$_m32$0) + m14$0$0 * (_m42$0 = other$0$0$_m42$0);
	this$0$0._m13 = m11$0$0 * (_m13$0 = other$0$0$_m13$0) + m12$0$0 * (_m23$0 = other$0$0$_m23$0) + m13$0$0 * (_m33$0 = other$0$0$_m33$0) + m14$0$0 * (_m43$0 = other$0$0$_m43$0);
	this$0$0._m14 = m11$0$0 * (_m14$0 = other$0$0$_m14$0) + m12$0$0 * (_m24$0 = other$0$0$_m24$0) + m13$0$0 * (_m34$0 = other$0$0$_m34$0) + m14$0$0 * (_m44$0 = other$0$0$_m44$0);
	this$0$0._m21 = m21$0$0 * _m11$0 + m22$0$0 * _m21$0 + m23$0$0 * _m31$0 + m24$0$0 * _m41$0;
	this$0$0._m22 = m21$0$0 * _m12$0 + m22$0$0 * _m22$0 + m23$0$0 * _m32$0 + m24$0$0 * _m42$0;
	this$0$0._m23 = m21$0$0 * _m13$0 + m22$0$0 * _m23$0 + m23$0$0 * _m33$0 + m24$0$0 * _m43$0;
	this$0$0._m24 = m21$0$0 * _m14$0 + m22$0$0 * _m24$0 + m23$0$0 * _m34$0 + m24$0$0 * _m44$0;
	this$0$0._m31 = m31$0$0 * _m11$0 + m32$0$0 * _m21$0 + m33$0$0 * _m31$0 + m34$0$0 * _m41$0;
	this$0$0._m32 = m31$0$0 * _m12$0 + m32$0$0 * _m22$0 + m33$0$0 * _m32$0 + m34$0$0 * _m42$0;
	this$0$0._m33 = m31$0$0 * _m13$0 + m32$0$0 * _m23$0 + m33$0$0 * _m33$0 + m34$0$0 * _m43$0;
	this$0$0._m34 = m31$0$0 * _m14$0 + m32$0$0 * _m24$0 + m33$0$0 * _m34$0 + m34$0$0 * _m44$0;
	this$0$0._m41 = m41$0$0 * _m11$0 + m42$0$0 * _m21$0 + m43$0$0 * _m31$0 + m44$0$0 * _m41$0;
	this$0$0._m42 = m41$0$0 * _m12$0 + m42$0$0 * _m22$0 + m43$0$0 * _m32$0 + m44$0$0 * _m42$0;
	this$0$0._m43 = m41$0$0 * _m13$0 + m42$0$0 * _m23$0 + m43$0$0 * _m33$0 + m44$0$0 * _m43$0;
	this$0$0._m44 = m41$0$0 * _m14$0 + m42$0$0 * _m24$0 + m43$0$0 * _m34$0 + m44$0$0 * _m44$0;
	q$0 = this.player.rot;
	this$0$1 = context._worldMatrix;
	x2$0$0 = 2 * (x$1 = q$0.x) * x$1;
	y2$0$0 = 2 * (y$1 = q$0.y) * y$1;
	z2$0$0 = 2 * (z$1 = q$0.z) * z$1;
	xy$0$0 = 2 * x$1 * y$1;
	zx$0$0 = 2 * x$1 * z$1;
	yz$0$0 = 2 * y$1 * z$1;
	xt$0$0 = 2 * x$1 * (t$0 = q$0.t);
	yt$0$0 = 2 * y$1 * t$0;
	zt$0$0 = 2 * z$1 * t$0;
	other$0$1$_m11$0 = [ 1 - y2$0$0 - z2$0$0, xy$0$0 + zt$0$0, zx$0$0 - yt$0$0, 0, xy$0$0 - zt$0$0, 1 - x2$0$0 - z2$0$0, yz$0$0 + xt$0$0, 0, zx$0$0 + yt$0$0, yz$0$0 - xt$0$0, 1 - x2$0$0 - y2$0$0, 0, 0, 0, 0, 1 ][0];
	other$0$1$_m12$0 = [ 1 - y2$0$0 - z2$0$0, xy$0$0 + zt$0$0, zx$0$0 - yt$0$0, 0, xy$0$0 - zt$0$0, 1 - x2$0$0 - z2$0$0, yz$0$0 + xt$0$0, 0, zx$0$0 + yt$0$0, yz$0$0 - xt$0$0, 1 - x2$0$0 - y2$0$0, 0, 0, 0, 0, 1 ][1];
	other$0$1$_m13$0 = [ 1 - y2$0$0 - z2$0$0, xy$0$0 + zt$0$0, zx$0$0 - yt$0$0, 0, xy$0$0 - zt$0$0, 1 - x2$0$0 - z2$0$0, yz$0$0 + xt$0$0, 0, zx$0$0 + yt$0$0, yz$0$0 - xt$0$0, 1 - x2$0$0 - y2$0$0, 0, 0, 0, 0, 1 ][2];
	other$0$1$_m14$0 = [ 1 - y2$0$0 - z2$0$0, xy$0$0 + zt$0$0, zx$0$0 - yt$0$0, 0, xy$0$0 - zt$0$0, 1 - x2$0$0 - z2$0$0, yz$0$0 + xt$0$0, 0, zx$0$0 + yt$0$0, yz$0$0 - xt$0$0, 1 - x2$0$0 - y2$0$0, 0, 0, 0, 0, 1 ][3];
	other$0$1$_m21$0 = [ 1 - y2$0$0 - z2$0$0, xy$0$0 + zt$0$0, zx$0$0 - yt$0$0, 0, xy$0$0 - zt$0$0, 1 - x2$0$0 - z2$0$0, yz$0$0 + xt$0$0, 0, zx$0$0 + yt$0$0, yz$0$0 - xt$0$0, 1 - x2$0$0 - y2$0$0, 0, 0, 0, 0, 1 ][4];
	other$0$1$_m22$0 = [ 1 - y2$0$0 - z2$0$0, xy$0$0 + zt$0$0, zx$0$0 - yt$0$0, 0, xy$0$0 - zt$0$0, 1 - x2$0$0 - z2$0$0, yz$0$0 + xt$0$0, 0, zx$0$0 + yt$0$0, yz$0$0 - xt$0$0, 1 - x2$0$0 - y2$0$0, 0, 0, 0, 0, 1 ][5];
	other$0$1$_m23$0 = [ 1 - y2$0$0 - z2$0$0, xy$0$0 + zt$0$0, zx$0$0 - yt$0$0, 0, xy$0$0 - zt$0$0, 1 - x2$0$0 - z2$0$0, yz$0$0 + xt$0$0, 0, zx$0$0 + yt$0$0, yz$0$0 - xt$0$0, 1 - x2$0$0 - y2$0$0, 0, 0, 0, 0, 1 ][6];
	other$0$1$_m24$0 = [ 1 - y2$0$0 - z2$0$0, xy$0$0 + zt$0$0, zx$0$0 - yt$0$0, 0, xy$0$0 - zt$0$0, 1 - x2$0$0 - z2$0$0, yz$0$0 + xt$0$0, 0, zx$0$0 + yt$0$0, yz$0$0 - xt$0$0, 1 - x2$0$0 - y2$0$0, 0, 0, 0, 0, 1 ][7];
	other$0$1$_m31$0 = [ 1 - y2$0$0 - z2$0$0, xy$0$0 + zt$0$0, zx$0$0 - yt$0$0, 0, xy$0$0 - zt$0$0, 1 - x2$0$0 - z2$0$0, yz$0$0 + xt$0$0, 0, zx$0$0 + yt$0$0, yz$0$0 - xt$0$0, 1 - x2$0$0 - y2$0$0, 0, 0, 0, 0, 1 ][8];
	other$0$1$_m32$0 = [ 1 - y2$0$0 - z2$0$0, xy$0$0 + zt$0$0, zx$0$0 - yt$0$0, 0, xy$0$0 - zt$0$0, 1 - x2$0$0 - z2$0$0, yz$0$0 + xt$0$0, 0, zx$0$0 + yt$0$0, yz$0$0 - xt$0$0, 1 - x2$0$0 - y2$0$0, 0, 0, 0, 0, 1 ][9];
	other$0$1$_m33$0 = [ 1 - y2$0$0 - z2$0$0, xy$0$0 + zt$0$0, zx$0$0 - yt$0$0, 0, xy$0$0 - zt$0$0, 1 - x2$0$0 - z2$0$0, yz$0$0 + xt$0$0, 0, zx$0$0 + yt$0$0, yz$0$0 - xt$0$0, 1 - x2$0$0 - y2$0$0, 0, 0, 0, 0, 1 ][10];
	other$0$1$_m34$0 = [ 1 - y2$0$0 - z2$0$0, xy$0$0 + zt$0$0, zx$0$0 - yt$0$0, 0, xy$0$0 - zt$0$0, 1 - x2$0$0 - z2$0$0, yz$0$0 + xt$0$0, 0, zx$0$0 + yt$0$0, yz$0$0 - xt$0$0, 1 - x2$0$0 - y2$0$0, 0, 0, 0, 0, 1 ][11];
	other$0$1$_m41$0 = [ 1 - y2$0$0 - z2$0$0, xy$0$0 + zt$0$0, zx$0$0 - yt$0$0, 0, xy$0$0 - zt$0$0, 1 - x2$0$0 - z2$0$0, yz$0$0 + xt$0$0, 0, zx$0$0 + yt$0$0, yz$0$0 - xt$0$0, 1 - x2$0$0 - y2$0$0, 0, 0, 0, 0, 1 ][12];
	other$0$1$_m42$0 = [ 1 - y2$0$0 - z2$0$0, xy$0$0 + zt$0$0, zx$0$0 - yt$0$0, 0, xy$0$0 - zt$0$0, 1 - x2$0$0 - z2$0$0, yz$0$0 + xt$0$0, 0, zx$0$0 + yt$0$0, yz$0$0 - xt$0$0, 1 - x2$0$0 - y2$0$0, 0, 0, 0, 0, 1 ][13];
	other$0$1$_m43$0 = [ 1 - y2$0$0 - z2$0$0, xy$0$0 + zt$0$0, zx$0$0 - yt$0$0, 0, xy$0$0 - zt$0$0, 1 - x2$0$0 - z2$0$0, yz$0$0 + xt$0$0, 0, zx$0$0 + yt$0$0, yz$0$0 - xt$0$0, 1 - x2$0$0 - y2$0$0, 0, 0, 0, 0, 1 ][14];
	other$0$1$_m44$0 = [ 1 - y2$0$0 - z2$0$0, xy$0$0 + zt$0$0, zx$0$0 - yt$0$0, 0, xy$0$0 - zt$0$0, 1 - x2$0$0 - z2$0$0, yz$0$0 + xt$0$0, 0, zx$0$0 + yt$0$0, yz$0$0 - xt$0$0, 1 - x2$0$0 - y2$0$0, 0, 0, 0, 0, 1 ][15];
	m11$0$1 = this$0$1._m11;
	m12$0$1 = this$0$1._m12;
	m13$0$1 = this$0$1._m13;
	m14$0$1 = this$0$1._m14;
	m21$0$1 = this$0$1._m21;
	m22$0$1 = this$0$1._m22;
	m23$0$1 = this$0$1._m23;
	m24$0$1 = this$0$1._m24;
	m31$0$1 = this$0$1._m31;
	m32$0$1 = this$0$1._m32;
	m33$0$1 = this$0$1._m33;
	m34$0$1 = this$0$1._m34;
	m41$0$1 = this$0$1._m41;
	m42$0$1 = this$0$1._m42;
	m43$0$1 = this$0$1._m43;
	m44$0$1 = this$0$1._m44;
	this$0$1._m11 = m11$0$1 * (_m11$1 = other$0$1$_m11$0) + m12$0$1 * (_m21$1 = other$0$1$_m21$0) + m13$0$1 * (_m31$1 = other$0$1$_m31$0) + m14$0$1 * (_m41$1 = other$0$1$_m41$0);
	this$0$1._m12 = m11$0$1 * (_m12$1 = other$0$1$_m12$0) + m12$0$1 * (_m22$1 = other$0$1$_m22$0) + m13$0$1 * (_m32$1 = other$0$1$_m32$0) + m14$0$1 * (_m42$1 = other$0$1$_m42$0);
	this$0$1._m13 = m11$0$1 * (_m13$1 = other$0$1$_m13$0) + m12$0$1 * (_m23$1 = other$0$1$_m23$0) + m13$0$1 * (_m33$1 = other$0$1$_m33$0) + m14$0$1 * (_m43$1 = other$0$1$_m43$0);
	this$0$1._m14 = m11$0$1 * (_m14$1 = other$0$1$_m14$0) + m12$0$1 * (_m24$1 = other$0$1$_m24$0) + m13$0$1 * (_m34$1 = other$0$1$_m34$0) + m14$0$1 * (_m44$1 = other$0$1$_m44$0);
	this$0$1._m21 = m21$0$1 * _m11$1 + m22$0$1 * _m21$1 + m23$0$1 * _m31$1 + m24$0$1 * _m41$1;
	this$0$1._m22 = m21$0$1 * _m12$1 + m22$0$1 * _m22$1 + m23$0$1 * _m32$1 + m24$0$1 * _m42$1;
	this$0$1._m23 = m21$0$1 * _m13$1 + m22$0$1 * _m23$1 + m23$0$1 * _m33$1 + m24$0$1 * _m43$1;
	this$0$1._m24 = m21$0$1 * _m14$1 + m22$0$1 * _m24$1 + m23$0$1 * _m34$1 + m24$0$1 * _m44$1;
	this$0$1._m31 = m31$0$1 * _m11$1 + m32$0$1 * _m21$1 + m33$0$1 * _m31$1 + m34$0$1 * _m41$1;
	this$0$1._m32 = m31$0$1 * _m12$1 + m32$0$1 * _m22$1 + m33$0$1 * _m32$1 + m34$0$1 * _m42$1;
	this$0$1._m33 = m31$0$1 * _m13$1 + m32$0$1 * _m23$1 + m33$0$1 * _m33$1 + m34$0$1 * _m43$1;
	this$0$1._m34 = m31$0$1 * _m14$1 + m32$0$1 * _m24$1 + m33$0$1 * _m34$1 + m34$0$1 * _m44$1;
	this$0$1._m41 = m41$0$1 * _m11$1 + m42$0$1 * _m21$1 + m43$0$1 * _m31$1 + m44$0$1 * _m41$1;
	this$0$1._m42 = m41$0$1 * _m12$1 + m42$0$1 * _m22$1 + m43$0$1 * _m32$1 + m44$0$1 * _m42$1;
	this$0$1._m43 = m41$0$1 * _m13$1 + m42$0$1 * _m23$1 + m43$0$1 * _m33$1 + m44$0$1 * _m43$1;
	this$0$1._m44 = m41$0$1 * _m14$1 + m42$0$1 * _m24$1 + m43$0$1 * _m34$1 + m44$0$1 * _m44$1;
	Util3D$sphere$LContext3D$NI(context, this.player.radius, 6);
	context._worldMatrix = new Matrix$();
};

/**
 * @param {Context3D} context
 */
BlueBall.prototype._renderTrees$LContext3D$ = function (context) {
	var $this = this;
	Context3D$setDepth$LContext3D$I(context, 3);
	this.trees.forEach$F$LVector$V$((function (tree) {
		/** @type {!number} */
		var x;
		/** @type {!number} */
		var y;
		/** @type {!number} */
		var z;
		/** @type {Matrix} */
		var this$0$0;
		/** @type {!number} */
		var m11$0$0;
		/** @type {!number} */
		var m12$0$0;
		/** @type {!number} */
		var m13$0$0;
		/** @type {!number} */
		var m14$0$0;
		/** @type {!number} */
		var m21$0$0;
		/** @type {!number} */
		var m22$0$0;
		/** @type {!number} */
		var m23$0$0;
		/** @type {!number} */
		var m24$0$0;
		/** @type {!number} */
		var m31$0$0;
		/** @type {!number} */
		var m32$0$0;
		/** @type {!number} */
		var m33$0$0;
		/** @type {!number} */
		var m34$0$0;
		/** @type {!number} */
		var m41$0$0;
		/** @type {!number} */
		var m42$0$0;
		/** @type {!number} */
		var m43$0$0;
		/** @type {!number} */
		var m44$0$0;
		/** @type {!number} */
		var _m11$0;
		/** @type {!number} */
		var _m21$0;
		/** @type {!number} */
		var _m31$0;
		/** @type {!number} */
		var _m41$0;
		/** @type {!number} */
		var _m12$0;
		/** @type {!number} */
		var _m22$0;
		/** @type {!number} */
		var _m32$0;
		/** @type {!number} */
		var _m42$0;
		/** @type {!number} */
		var _m13$0;
		/** @type {!number} */
		var _m23$0;
		/** @type {!number} */
		var _m33$0;
		/** @type {!number} */
		var _m43$0;
		/** @type {!number} */
		var _m14$0;
		/** @type {!number} */
		var _m24$0;
		/** @type {!number} */
		var _m34$0;
		/** @type {!number} */
		var _m44$0;
		/** @type {!number} */
		var other$0$0$_m11$0;
		/** @type {!number} */
		var other$0$0$_m12$0;
		/** @type {!number} */
		var other$0$0$_m13$0;
		/** @type {!number} */
		var other$0$0$_m14$0;
		/** @type {!number} */
		var other$0$0$_m21$0;
		/** @type {!number} */
		var other$0$0$_m22$0;
		/** @type {!number} */
		var other$0$0$_m23$0;
		/** @type {!number} */
		var other$0$0$_m24$0;
		/** @type {!number} */
		var other$0$0$_m31$0;
		/** @type {!number} */
		var other$0$0$_m32$0;
		/** @type {!number} */
		var other$0$0$_m33$0;
		/** @type {!number} */
		var other$0$0$_m34$0;
		/** @type {!number} */
		var other$0$0$_m41$0;
		/** @type {!number} */
		var other$0$0$_m42$0;
		/** @type {!number} */
		var other$0$0$_m43$0;
		/** @type {!number} */
		var other$0$0$_m44$0;
		x = tree.x;
		y = tree.y;
		z = tree.z;
		context._matrixStack.prepend$LMatrix$(context._worldMatrix.copy$());
		this$0$0 = context._worldMatrix;
		other$0$0$_m11$0 = [ 1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1 ][0];
		other$0$0$_m12$0 = [ 1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1 ][1];
		other$0$0$_m13$0 = [ 1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1 ][2];
		other$0$0$_m14$0 = [ 1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1 ][3];
		other$0$0$_m21$0 = [ 1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1 ][4];
		other$0$0$_m22$0 = [ 1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1 ][5];
		other$0$0$_m23$0 = [ 1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1 ][6];
		other$0$0$_m24$0 = [ 1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1 ][7];
		other$0$0$_m31$0 = [ 1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1 ][8];
		other$0$0$_m32$0 = [ 1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1 ][9];
		other$0$0$_m33$0 = [ 1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1 ][10];
		other$0$0$_m34$0 = [ 1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1 ][11];
		other$0$0$_m41$0 = [ 1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1 ][12];
		other$0$0$_m42$0 = [ 1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1 ][13];
		other$0$0$_m43$0 = [ 1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1 ][14];
		other$0$0$_m44$0 = [ 1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1 ][15];
		m11$0$0 = this$0$0._m11;
		m12$0$0 = this$0$0._m12;
		m13$0$0 = this$0$0._m13;
		m14$0$0 = this$0$0._m14;
		m21$0$0 = this$0$0._m21;
		m22$0$0 = this$0$0._m22;
		m23$0$0 = this$0$0._m23;
		m24$0$0 = this$0$0._m24;
		m31$0$0 = this$0$0._m31;
		m32$0$0 = this$0$0._m32;
		m33$0$0 = this$0$0._m33;
		m34$0$0 = this$0$0._m34;
		m41$0$0 = this$0$0._m41;
		m42$0$0 = this$0$0._m42;
		m43$0$0 = this$0$0._m43;
		m44$0$0 = this$0$0._m44;
		this$0$0._m11 = m11$0$0 * (_m11$0 = other$0$0$_m11$0) + m12$0$0 * (_m21$0 = other$0$0$_m21$0) + m13$0$0 * (_m31$0 = other$0$0$_m31$0) + m14$0$0 * (_m41$0 = other$0$0$_m41$0);
		this$0$0._m12 = m11$0$0 * (_m12$0 = other$0$0$_m12$0) + m12$0$0 * (_m22$0 = other$0$0$_m22$0) + m13$0$0 * (_m32$0 = other$0$0$_m32$0) + m14$0$0 * (_m42$0 = other$0$0$_m42$0);
		this$0$0._m13 = m11$0$0 * (_m13$0 = other$0$0$_m13$0) + m12$0$0 * (_m23$0 = other$0$0$_m23$0) + m13$0$0 * (_m33$0 = other$0$0$_m33$0) + m14$0$0 * (_m43$0 = other$0$0$_m43$0);
		this$0$0._m14 = m11$0$0 * (_m14$0 = other$0$0$_m14$0) + m12$0$0 * (_m24$0 = other$0$0$_m24$0) + m13$0$0 * (_m34$0 = other$0$0$_m34$0) + m14$0$0 * (_m44$0 = other$0$0$_m44$0);
		this$0$0._m21 = m21$0$0 * _m11$0 + m22$0$0 * _m21$0 + m23$0$0 * _m31$0 + m24$0$0 * _m41$0;
		this$0$0._m22 = m21$0$0 * _m12$0 + m22$0$0 * _m22$0 + m23$0$0 * _m32$0 + m24$0$0 * _m42$0;
		this$0$0._m23 = m21$0$0 * _m13$0 + m22$0$0 * _m23$0 + m23$0$0 * _m33$0 + m24$0$0 * _m43$0;
		this$0$0._m24 = m21$0$0 * _m14$0 + m22$0$0 * _m24$0 + m23$0$0 * _m34$0 + m24$0$0 * _m44$0;
		this$0$0._m31 = m31$0$0 * _m11$0 + m32$0$0 * _m21$0 + m33$0$0 * _m31$0 + m34$0$0 * _m41$0;
		this$0$0._m32 = m31$0$0 * _m12$0 + m32$0$0 * _m22$0 + m33$0$0 * _m32$0 + m34$0$0 * _m42$0;
		this$0$0._m33 = m31$0$0 * _m13$0 + m32$0$0 * _m23$0 + m33$0$0 * _m33$0 + m34$0$0 * _m43$0;
		this$0$0._m34 = m31$0$0 * _m14$0 + m32$0$0 * _m24$0 + m33$0$0 * _m34$0 + m34$0$0 * _m44$0;
		this$0$0._m41 = m41$0$0 * _m11$0 + m42$0$0 * _m21$0 + m43$0$0 * _m31$0 + m44$0$0 * _m41$0;
		this$0$0._m42 = m41$0$0 * _m12$0 + m42$0$0 * _m22$0 + m43$0$0 * _m32$0 + m44$0$0 * _m42$0;
		this$0$0._m43 = m41$0$0 * _m13$0 + m42$0$0 * _m23$0 + m43$0$0 * _m33$0 + m44$0$0 * _m43$0;
		this$0$0._m44 = m41$0$0 * _m14$0 + m42$0$0 * _m24$0 + m43$0$0 * _m34$0 + m44$0$0 * _m44$0;
		Context3D$renderBillboard$LContext3D$LVector$IIS(context, new Vector$NNN(0, 0, 0), 50, 34, './image/tree.png');
		context._worldMatrix = context._matrixStack.removeFirst$();
	}));
};

/**
 * @param {Context3D} context
 */
BlueBall.prototype._renderItems$LContext3D$ = function (context) {
	var $this = this;
	/** @type {!number} */
	var rad;
	/** @type {!number} */
	var cos$0;
	/** @type {!number} */
	var sin$0;
	/** @type {!number} */
	var axis$t$0;
	/** @type {!number} */
	var axis$x$0;
	/** @type {!number} */
	var axis$y$0;
	/** @type {!number} */
	var axis$z$0;
	Context3D$setDepth$LContext3D$I(context, 3);
	rad = 3.141592653589793 * this.totalElapsedMsec / 1000;
	cos$0 = Math.cos(rad / 2);
	sin$0 = Math.sin(rad / 2);
	axis$t$0 = cos$0;
	axis$x$0 = 0 * sin$0;
	axis$y$0 = sin$0;
	axis$z$0 = 0 * sin$0;
	this.items.forEach$F$LVector$V$((function (item) {
		/** @type {!number} */
		var x;
		/** @type {!number} */
		var y;
		/** @type {!number} */
		var z;
		/** @type {Matrix} */
		var this$0$0;
		/** @type {!number} */
		var m11$0$0;
		/** @type {!number} */
		var m12$0$0;
		/** @type {!number} */
		var m13$0$0;
		/** @type {!number} */
		var m14$0$0;
		/** @type {!number} */
		var m21$0$0;
		/** @type {!number} */
		var m22$0$0;
		/** @type {!number} */
		var m23$0$0;
		/** @type {!number} */
		var m24$0$0;
		/** @type {!number} */
		var m31$0$0;
		/** @type {!number} */
		var m32$0$0;
		/** @type {!number} */
		var m33$0$0;
		/** @type {!number} */
		var m34$0$0;
		/** @type {!number} */
		var m41$0$0;
		/** @type {!number} */
		var m42$0$0;
		/** @type {!number} */
		var m43$0$0;
		/** @type {!number} */
		var m44$0$0;
		/** @type {Matrix} */
		var this$0$1;
		/** @type {!number} */
		var m11$0$1;
		/** @type {!number} */
		var m12$0$1;
		/** @type {!number} */
		var m13$0$1;
		/** @type {!number} */
		var m14$0$1;
		/** @type {!number} */
		var m21$0$1;
		/** @type {!number} */
		var m22$0$1;
		/** @type {!number} */
		var m23$0$1;
		/** @type {!number} */
		var m24$0$1;
		/** @type {!number} */
		var m31$0$1;
		/** @type {!number} */
		var m32$0$1;
		/** @type {!number} */
		var m33$0$1;
		/** @type {!number} */
		var m34$0$1;
		/** @type {!number} */
		var m41$0$1;
		/** @type {!number} */
		var m42$0$1;
		/** @type {!number} */
		var m43$0$1;
		/** @type {!number} */
		var m44$0$1;
		/** @type {!number} */
		var x2$0$0;
		/** @type {!number} */
		var y2$0$0;
		/** @type {!number} */
		var z2$0$0;
		/** @type {!number} */
		var xy$0$0;
		/** @type {!number} */
		var zx$0$0;
		/** @type {!number} */
		var yz$0$0;
		/** @type {!number} */
		var xt$0$0;
		/** @type {!number} */
		var yt$0$0;
		/** @type {!number} */
		var zt$0$0;
		/** @type {!number} */
		var _m11$0;
		/** @type {!number} */
		var _m21$0;
		/** @type {!number} */
		var _m31$0;
		/** @type {!number} */
		var _m41$0;
		/** @type {!number} */
		var _m12$0;
		/** @type {!number} */
		var _m22$0;
		/** @type {!number} */
		var _m32$0;
		/** @type {!number} */
		var _m42$0;
		/** @type {!number} */
		var _m13$0;
		/** @type {!number} */
		var _m23$0;
		/** @type {!number} */
		var _m33$0;
		/** @type {!number} */
		var _m43$0;
		/** @type {!number} */
		var _m14$0;
		/** @type {!number} */
		var _m24$0;
		/** @type {!number} */
		var _m34$0;
		/** @type {!number} */
		var _m44$0;
		/** @type {!number} */
		var x$0;
		/** @type {!number} */
		var y$0;
		/** @type {!number} */
		var z$0;
		/** @type {!number} */
		var t$0;
		/** @type {!number} */
		var _m11$1;
		/** @type {!number} */
		var _m21$1;
		/** @type {!number} */
		var _m31$1;
		/** @type {!number} */
		var _m41$1;
		/** @type {!number} */
		var _m12$1;
		/** @type {!number} */
		var _m22$1;
		/** @type {!number} */
		var _m32$1;
		/** @type {!number} */
		var _m42$1;
		/** @type {!number} */
		var _m13$1;
		/** @type {!number} */
		var _m23$1;
		/** @type {!number} */
		var _m33$1;
		/** @type {!number} */
		var _m43$1;
		/** @type {!number} */
		var _m14$1;
		/** @type {!number} */
		var _m24$1;
		/** @type {!number} */
		var _m34$1;
		/** @type {!number} */
		var _m44$1;
		/** @type {!number} */
		var other$0$0$_m11$0;
		/** @type {!number} */
		var other$0$0$_m12$0;
		/** @type {!number} */
		var other$0$0$_m13$0;
		/** @type {!number} */
		var other$0$0$_m14$0;
		/** @type {!number} */
		var other$0$0$_m21$0;
		/** @type {!number} */
		var other$0$0$_m22$0;
		/** @type {!number} */
		var other$0$0$_m23$0;
		/** @type {!number} */
		var other$0$0$_m24$0;
		/** @type {!number} */
		var other$0$0$_m31$0;
		/** @type {!number} */
		var other$0$0$_m32$0;
		/** @type {!number} */
		var other$0$0$_m33$0;
		/** @type {!number} */
		var other$0$0$_m34$0;
		/** @type {!number} */
		var other$0$0$_m41$0;
		/** @type {!number} */
		var other$0$0$_m42$0;
		/** @type {!number} */
		var other$0$0$_m43$0;
		/** @type {!number} */
		var other$0$0$_m44$0;
		/** @type {!number} */
		var other$0$1$_m11$0;
		/** @type {!number} */
		var other$0$1$_m12$0;
		/** @type {!number} */
		var other$0$1$_m13$0;
		/** @type {!number} */
		var other$0$1$_m14$0;
		/** @type {!number} */
		var other$0$1$_m21$0;
		/** @type {!number} */
		var other$0$1$_m22$0;
		/** @type {!number} */
		var other$0$1$_m23$0;
		/** @type {!number} */
		var other$0$1$_m24$0;
		/** @type {!number} */
		var other$0$1$_m31$0;
		/** @type {!number} */
		var other$0$1$_m32$0;
		/** @type {!number} */
		var other$0$1$_m33$0;
		/** @type {!number} */
		var other$0$1$_m34$0;
		/** @type {!number} */
		var other$0$1$_m41$0;
		/** @type {!number} */
		var other$0$1$_m42$0;
		/** @type {!number} */
		var other$0$1$_m43$0;
		/** @type {!number} */
		var other$0$1$_m44$0;
		x = item.x;
		y = item.y;
		z = item.z;
		context._matrixStack.prepend$LMatrix$(context._worldMatrix.copy$());
		this$0$0 = context._worldMatrix;
		other$0$0$_m11$0 = [ 1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1 ][0];
		other$0$0$_m12$0 = [ 1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1 ][1];
		other$0$0$_m13$0 = [ 1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1 ][2];
		other$0$0$_m14$0 = [ 1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1 ][3];
		other$0$0$_m21$0 = [ 1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1 ][4];
		other$0$0$_m22$0 = [ 1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1 ][5];
		other$0$0$_m23$0 = [ 1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1 ][6];
		other$0$0$_m24$0 = [ 1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1 ][7];
		other$0$0$_m31$0 = [ 1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1 ][8];
		other$0$0$_m32$0 = [ 1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1 ][9];
		other$0$0$_m33$0 = [ 1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1 ][10];
		other$0$0$_m34$0 = [ 1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1 ][11];
		other$0$0$_m41$0 = [ 1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1 ][12];
		other$0$0$_m42$0 = [ 1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1 ][13];
		other$0$0$_m43$0 = [ 1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1 ][14];
		other$0$0$_m44$0 = [ 1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1 ][15];
		m11$0$0 = this$0$0._m11;
		m12$0$0 = this$0$0._m12;
		m13$0$0 = this$0$0._m13;
		m14$0$0 = this$0$0._m14;
		m21$0$0 = this$0$0._m21;
		m22$0$0 = this$0$0._m22;
		m23$0$0 = this$0$0._m23;
		m24$0$0 = this$0$0._m24;
		m31$0$0 = this$0$0._m31;
		m32$0$0 = this$0$0._m32;
		m33$0$0 = this$0$0._m33;
		m34$0$0 = this$0$0._m34;
		m41$0$0 = this$0$0._m41;
		m42$0$0 = this$0$0._m42;
		m43$0$0 = this$0$0._m43;
		m44$0$0 = this$0$0._m44;
		this$0$0._m11 = m11$0$0 * (_m11$0 = other$0$0$_m11$0) + m12$0$0 * (_m21$0 = other$0$0$_m21$0) + m13$0$0 * (_m31$0 = other$0$0$_m31$0) + m14$0$0 * (_m41$0 = other$0$0$_m41$0);
		this$0$0._m12 = m11$0$0 * (_m12$0 = other$0$0$_m12$0) + m12$0$0 * (_m22$0 = other$0$0$_m22$0) + m13$0$0 * (_m32$0 = other$0$0$_m32$0) + m14$0$0 * (_m42$0 = other$0$0$_m42$0);
		this$0$0._m13 = m11$0$0 * (_m13$0 = other$0$0$_m13$0) + m12$0$0 * (_m23$0 = other$0$0$_m23$0) + m13$0$0 * (_m33$0 = other$0$0$_m33$0) + m14$0$0 * (_m43$0 = other$0$0$_m43$0);
		this$0$0._m14 = m11$0$0 * (_m14$0 = other$0$0$_m14$0) + m12$0$0 * (_m24$0 = other$0$0$_m24$0) + m13$0$0 * (_m34$0 = other$0$0$_m34$0) + m14$0$0 * (_m44$0 = other$0$0$_m44$0);
		this$0$0._m21 = m21$0$0 * _m11$0 + m22$0$0 * _m21$0 + m23$0$0 * _m31$0 + m24$0$0 * _m41$0;
		this$0$0._m22 = m21$0$0 * _m12$0 + m22$0$0 * _m22$0 + m23$0$0 * _m32$0 + m24$0$0 * _m42$0;
		this$0$0._m23 = m21$0$0 * _m13$0 + m22$0$0 * _m23$0 + m23$0$0 * _m33$0 + m24$0$0 * _m43$0;
		this$0$0._m24 = m21$0$0 * _m14$0 + m22$0$0 * _m24$0 + m23$0$0 * _m34$0 + m24$0$0 * _m44$0;
		this$0$0._m31 = m31$0$0 * _m11$0 + m32$0$0 * _m21$0 + m33$0$0 * _m31$0 + m34$0$0 * _m41$0;
		this$0$0._m32 = m31$0$0 * _m12$0 + m32$0$0 * _m22$0 + m33$0$0 * _m32$0 + m34$0$0 * _m42$0;
		this$0$0._m33 = m31$0$0 * _m13$0 + m32$0$0 * _m23$0 + m33$0$0 * _m33$0 + m34$0$0 * _m43$0;
		this$0$0._m34 = m31$0$0 * _m14$0 + m32$0$0 * _m24$0 + m33$0$0 * _m34$0 + m34$0$0 * _m44$0;
		this$0$0._m41 = m41$0$0 * _m11$0 + m42$0$0 * _m21$0 + m43$0$0 * _m31$0 + m44$0$0 * _m41$0;
		this$0$0._m42 = m41$0$0 * _m12$0 + m42$0$0 * _m22$0 + m43$0$0 * _m32$0 + m44$0$0 * _m42$0;
		this$0$0._m43 = m41$0$0 * _m13$0 + m42$0$0 * _m23$0 + m43$0$0 * _m33$0 + m44$0$0 * _m43$0;
		this$0$0._m44 = m41$0$0 * _m14$0 + m42$0$0 * _m24$0 + m43$0$0 * _m34$0 + m44$0$0 * _m44$0;
		this$0$1 = context._worldMatrix;
		x2$0$0 = 2 * (x$0 = axis$x$0) * x$0;
		y2$0$0 = 2 * (y$0 = axis$y$0) * y$0;
		z2$0$0 = 2 * (z$0 = axis$z$0) * z$0;
		xy$0$0 = 2 * x$0 * y$0;
		zx$0$0 = 2 * x$0 * z$0;
		yz$0$0 = 2 * y$0 * z$0;
		xt$0$0 = 2 * x$0 * (t$0 = axis$t$0);
		yt$0$0 = 2 * y$0 * t$0;
		zt$0$0 = 2 * z$0 * t$0;
		other$0$1$_m11$0 = [ 1 - y2$0$0 - z2$0$0, xy$0$0 + zt$0$0, zx$0$0 - yt$0$0, 0, xy$0$0 - zt$0$0, 1 - x2$0$0 - z2$0$0, yz$0$0 + xt$0$0, 0, zx$0$0 + yt$0$0, yz$0$0 - xt$0$0, 1 - x2$0$0 - y2$0$0, 0, 0, 0, 0, 1 ][0];
		other$0$1$_m12$0 = [ 1 - y2$0$0 - z2$0$0, xy$0$0 + zt$0$0, zx$0$0 - yt$0$0, 0, xy$0$0 - zt$0$0, 1 - x2$0$0 - z2$0$0, yz$0$0 + xt$0$0, 0, zx$0$0 + yt$0$0, yz$0$0 - xt$0$0, 1 - x2$0$0 - y2$0$0, 0, 0, 0, 0, 1 ][1];
		other$0$1$_m13$0 = [ 1 - y2$0$0 - z2$0$0, xy$0$0 + zt$0$0, zx$0$0 - yt$0$0, 0, xy$0$0 - zt$0$0, 1 - x2$0$0 - z2$0$0, yz$0$0 + xt$0$0, 0, zx$0$0 + yt$0$0, yz$0$0 - xt$0$0, 1 - x2$0$0 - y2$0$0, 0, 0, 0, 0, 1 ][2];
		other$0$1$_m14$0 = [ 1 - y2$0$0 - z2$0$0, xy$0$0 + zt$0$0, zx$0$0 - yt$0$0, 0, xy$0$0 - zt$0$0, 1 - x2$0$0 - z2$0$0, yz$0$0 + xt$0$0, 0, zx$0$0 + yt$0$0, yz$0$0 - xt$0$0, 1 - x2$0$0 - y2$0$0, 0, 0, 0, 0, 1 ][3];
		other$0$1$_m21$0 = [ 1 - y2$0$0 - z2$0$0, xy$0$0 + zt$0$0, zx$0$0 - yt$0$0, 0, xy$0$0 - zt$0$0, 1 - x2$0$0 - z2$0$0, yz$0$0 + xt$0$0, 0, zx$0$0 + yt$0$0, yz$0$0 - xt$0$0, 1 - x2$0$0 - y2$0$0, 0, 0, 0, 0, 1 ][4];
		other$0$1$_m22$0 = [ 1 - y2$0$0 - z2$0$0, xy$0$0 + zt$0$0, zx$0$0 - yt$0$0, 0, xy$0$0 - zt$0$0, 1 - x2$0$0 - z2$0$0, yz$0$0 + xt$0$0, 0, zx$0$0 + yt$0$0, yz$0$0 - xt$0$0, 1 - x2$0$0 - y2$0$0, 0, 0, 0, 0, 1 ][5];
		other$0$1$_m23$0 = [ 1 - y2$0$0 - z2$0$0, xy$0$0 + zt$0$0, zx$0$0 - yt$0$0, 0, xy$0$0 - zt$0$0, 1 - x2$0$0 - z2$0$0, yz$0$0 + xt$0$0, 0, zx$0$0 + yt$0$0, yz$0$0 - xt$0$0, 1 - x2$0$0 - y2$0$0, 0, 0, 0, 0, 1 ][6];
		other$0$1$_m24$0 = [ 1 - y2$0$0 - z2$0$0, xy$0$0 + zt$0$0, zx$0$0 - yt$0$0, 0, xy$0$0 - zt$0$0, 1 - x2$0$0 - z2$0$0, yz$0$0 + xt$0$0, 0, zx$0$0 + yt$0$0, yz$0$0 - xt$0$0, 1 - x2$0$0 - y2$0$0, 0, 0, 0, 0, 1 ][7];
		other$0$1$_m31$0 = [ 1 - y2$0$0 - z2$0$0, xy$0$0 + zt$0$0, zx$0$0 - yt$0$0, 0, xy$0$0 - zt$0$0, 1 - x2$0$0 - z2$0$0, yz$0$0 + xt$0$0, 0, zx$0$0 + yt$0$0, yz$0$0 - xt$0$0, 1 - x2$0$0 - y2$0$0, 0, 0, 0, 0, 1 ][8];
		other$0$1$_m32$0 = [ 1 - y2$0$0 - z2$0$0, xy$0$0 + zt$0$0, zx$0$0 - yt$0$0, 0, xy$0$0 - zt$0$0, 1 - x2$0$0 - z2$0$0, yz$0$0 + xt$0$0, 0, zx$0$0 + yt$0$0, yz$0$0 - xt$0$0, 1 - x2$0$0 - y2$0$0, 0, 0, 0, 0, 1 ][9];
		other$0$1$_m33$0 = [ 1 - y2$0$0 - z2$0$0, xy$0$0 + zt$0$0, zx$0$0 - yt$0$0, 0, xy$0$0 - zt$0$0, 1 - x2$0$0 - z2$0$0, yz$0$0 + xt$0$0, 0, zx$0$0 + yt$0$0, yz$0$0 - xt$0$0, 1 - x2$0$0 - y2$0$0, 0, 0, 0, 0, 1 ][10];
		other$0$1$_m34$0 = [ 1 - y2$0$0 - z2$0$0, xy$0$0 + zt$0$0, zx$0$0 - yt$0$0, 0, xy$0$0 - zt$0$0, 1 - x2$0$0 - z2$0$0, yz$0$0 + xt$0$0, 0, zx$0$0 + yt$0$0, yz$0$0 - xt$0$0, 1 - x2$0$0 - y2$0$0, 0, 0, 0, 0, 1 ][11];
		other$0$1$_m41$0 = [ 1 - y2$0$0 - z2$0$0, xy$0$0 + zt$0$0, zx$0$0 - yt$0$0, 0, xy$0$0 - zt$0$0, 1 - x2$0$0 - z2$0$0, yz$0$0 + xt$0$0, 0, zx$0$0 + yt$0$0, yz$0$0 - xt$0$0, 1 - x2$0$0 - y2$0$0, 0, 0, 0, 0, 1 ][12];
		other$0$1$_m42$0 = [ 1 - y2$0$0 - z2$0$0, xy$0$0 + zt$0$0, zx$0$0 - yt$0$0, 0, xy$0$0 - zt$0$0, 1 - x2$0$0 - z2$0$0, yz$0$0 + xt$0$0, 0, zx$0$0 + yt$0$0, yz$0$0 - xt$0$0, 1 - x2$0$0 - y2$0$0, 0, 0, 0, 0, 1 ][13];
		other$0$1$_m43$0 = [ 1 - y2$0$0 - z2$0$0, xy$0$0 + zt$0$0, zx$0$0 - yt$0$0, 0, xy$0$0 - zt$0$0, 1 - x2$0$0 - z2$0$0, yz$0$0 + xt$0$0, 0, zx$0$0 + yt$0$0, yz$0$0 - xt$0$0, 1 - x2$0$0 - y2$0$0, 0, 0, 0, 0, 1 ][14];
		other$0$1$_m44$0 = [ 1 - y2$0$0 - z2$0$0, xy$0$0 + zt$0$0, zx$0$0 - yt$0$0, 0, xy$0$0 - zt$0$0, 1 - x2$0$0 - z2$0$0, yz$0$0 + xt$0$0, 0, zx$0$0 + yt$0$0, yz$0$0 - xt$0$0, 1 - x2$0$0 - y2$0$0, 0, 0, 0, 0, 1 ][15];
		m11$0$1 = this$0$1._m11;
		m12$0$1 = this$0$1._m12;
		m13$0$1 = this$0$1._m13;
		m14$0$1 = this$0$1._m14;
		m21$0$1 = this$0$1._m21;
		m22$0$1 = this$0$1._m22;
		m23$0$1 = this$0$1._m23;
		m24$0$1 = this$0$1._m24;
		m31$0$1 = this$0$1._m31;
		m32$0$1 = this$0$1._m32;
		m33$0$1 = this$0$1._m33;
		m34$0$1 = this$0$1._m34;
		m41$0$1 = this$0$1._m41;
		m42$0$1 = this$0$1._m42;
		m43$0$1 = this$0$1._m43;
		m44$0$1 = this$0$1._m44;
		this$0$1._m11 = m11$0$1 * (_m11$1 = other$0$1$_m11$0) + m12$0$1 * (_m21$1 = other$0$1$_m21$0) + m13$0$1 * (_m31$1 = other$0$1$_m31$0) + m14$0$1 * (_m41$1 = other$0$1$_m41$0);
		this$0$1._m12 = m11$0$1 * (_m12$1 = other$0$1$_m12$0) + m12$0$1 * (_m22$1 = other$0$1$_m22$0) + m13$0$1 * (_m32$1 = other$0$1$_m32$0) + m14$0$1 * (_m42$1 = other$0$1$_m42$0);
		this$0$1._m13 = m11$0$1 * (_m13$1 = other$0$1$_m13$0) + m12$0$1 * (_m23$1 = other$0$1$_m23$0) + m13$0$1 * (_m33$1 = other$0$1$_m33$0) + m14$0$1 * (_m43$1 = other$0$1$_m43$0);
		this$0$1._m14 = m11$0$1 * (_m14$1 = other$0$1$_m14$0) + m12$0$1 * (_m24$1 = other$0$1$_m24$0) + m13$0$1 * (_m34$1 = other$0$1$_m34$0) + m14$0$1 * (_m44$1 = other$0$1$_m44$0);
		this$0$1._m21 = m21$0$1 * _m11$1 + m22$0$1 * _m21$1 + m23$0$1 * _m31$1 + m24$0$1 * _m41$1;
		this$0$1._m22 = m21$0$1 * _m12$1 + m22$0$1 * _m22$1 + m23$0$1 * _m32$1 + m24$0$1 * _m42$1;
		this$0$1._m23 = m21$0$1 * _m13$1 + m22$0$1 * _m23$1 + m23$0$1 * _m33$1 + m24$0$1 * _m43$1;
		this$0$1._m24 = m21$0$1 * _m14$1 + m22$0$1 * _m24$1 + m23$0$1 * _m34$1 + m24$0$1 * _m44$1;
		this$0$1._m31 = m31$0$1 * _m11$1 + m32$0$1 * _m21$1 + m33$0$1 * _m31$1 + m34$0$1 * _m41$1;
		this$0$1._m32 = m31$0$1 * _m12$1 + m32$0$1 * _m22$1 + m33$0$1 * _m32$1 + m34$0$1 * _m42$1;
		this$0$1._m33 = m31$0$1 * _m13$1 + m32$0$1 * _m23$1 + m33$0$1 * _m33$1 + m34$0$1 * _m43$1;
		this$0$1._m34 = m31$0$1 * _m14$1 + m32$0$1 * _m24$1 + m33$0$1 * _m34$1 + m34$0$1 * _m44$1;
		this$0$1._m41 = m41$0$1 * _m11$1 + m42$0$1 * _m21$1 + m43$0$1 * _m31$1 + m44$0$1 * _m41$1;
		this$0$1._m42 = m41$0$1 * _m12$1 + m42$0$1 * _m22$1 + m43$0$1 * _m32$1 + m44$0$1 * _m42$1;
		this$0$1._m43 = m41$0$1 * _m13$1 + m42$0$1 * _m23$1 + m43$0$1 * _m33$1 + m44$0$1 * _m43$1;
		this$0$1._m44 = m41$0$1 * _m14$1 + m42$0$1 * _m24$1 + m43$0$1 * _m34$1 + m44$0$1 * _m44$1;
		Context3D$renderTexture$LContext3D$ALVector$SIIII(context, [ new Vector$NNN(-15, -10, 0), new Vector$NNN(15, -10, 0), new Vector$NNN(15, 10, 0), new Vector$NNN(-15, 10, 0) ], './image/redbull_free.png', 2, 2, 1, 1);
		context._worldMatrix = context._matrixStack.removeFirst$();
	}));
};

/**
 * @param {Context3D} context
 */
BlueBall.prototype._renderField$LContext3D$ = function (context) {
	/** @type {Color} */
	var gray;
	/** @type {Color} */
	var lightGreen;
	/** @type {Color} */
	var green;
	/** @type {!number} */
	var size;
	/** @type {!number} */
	var i;
	/** @type {!number} */
	var j;
	/** @type {Color} */
	var color;
	/** @type {Vector} */
	var center$0;
	/** @type {Matrix} */
	var this$0$0;
	/** @type {!number} */
	var m11$0$0;
	/** @type {!number} */
	var m12$0$0;
	/** @type {!number} */
	var m13$0$0;
	/** @type {!number} */
	var m14$0$0;
	/** @type {!number} */
	var m21$0$0;
	/** @type {!number} */
	var m22$0$0;
	/** @type {!number} */
	var m23$0$0;
	/** @type {!number} */
	var m24$0$0;
	/** @type {!number} */
	var m31$0$0;
	/** @type {!number} */
	var m32$0$0;
	/** @type {!number} */
	var m33$0$0;
	/** @type {!number} */
	var m34$0$0;
	/** @type {!number} */
	var m41$0$0;
	/** @type {!number} */
	var m42$0$0;
	/** @type {!number} */
	var m43$0$0;
	/** @type {!number} */
	var m44$0$0;
	/** @type {Vector} */
	var center$1;
	/** @type {Matrix} */
	var this$0$1;
	/** @type {!number} */
	var m11$0$1;
	/** @type {!number} */
	var m12$0$1;
	/** @type {!number} */
	var m13$0$1;
	/** @type {!number} */
	var m14$0$1;
	/** @type {!number} */
	var m21$0$1;
	/** @type {!number} */
	var m22$0$1;
	/** @type {!number} */
	var m23$0$1;
	/** @type {!number} */
	var m24$0$1;
	/** @type {!number} */
	var m31$0$1;
	/** @type {!number} */
	var m32$0$1;
	/** @type {!number} */
	var m33$0$1;
	/** @type {!number} */
	var m34$0$1;
	/** @type {!number} */
	var m41$0$1;
	/** @type {!number} */
	var m42$0$1;
	/** @type {!number} */
	var m43$0$1;
	/** @type {!number} */
	var m44$0$1;
	/** @type {!number} */
	var _m11$0;
	/** @type {!number} */
	var _m21$0;
	/** @type {!number} */
	var _m31$0;
	/** @type {!number} */
	var _m41$0;
	/** @type {!number} */
	var _m12$0;
	/** @type {!number} */
	var _m22$0;
	/** @type {!number} */
	var _m32$0;
	/** @type {!number} */
	var _m42$0;
	/** @type {!number} */
	var _m13$0;
	/** @type {!number} */
	var _m23$0;
	/** @type {!number} */
	var _m33$0;
	/** @type {!number} */
	var _m43$0;
	/** @type {!number} */
	var _m14$0;
	/** @type {!number} */
	var _m24$0;
	/** @type {!number} */
	var _m34$0;
	/** @type {!number} */
	var _m44$0;
	/** @type {!number} */
	var _m11$1;
	/** @type {!number} */
	var _m21$1;
	/** @type {!number} */
	var _m31$1;
	/** @type {!number} */
	var _m41$1;
	/** @type {!number} */
	var _m12$1;
	/** @type {!number} */
	var _m22$1;
	/** @type {!number} */
	var _m32$1;
	/** @type {!number} */
	var _m42$1;
	/** @type {!number} */
	var _m13$1;
	/** @type {!number} */
	var _m23$1;
	/** @type {!number} */
	var _m33$1;
	/** @type {!number} */
	var _m43$1;
	/** @type {!number} */
	var _m14$1;
	/** @type {!number} */
	var _m24$1;
	/** @type {!number} */
	var _m34$1;
	/** @type {!number} */
	var _m44$1;
	/** @type {!number} */
	var other$0$0$_m11$0;
	/** @type {!number} */
	var other$0$0$_m12$0;
	/** @type {!number} */
	var other$0$0$_m13$0;
	/** @type {!number} */
	var other$0$0$_m14$0;
	/** @type {!number} */
	var other$0$0$_m21$0;
	/** @type {!number} */
	var other$0$0$_m22$0;
	/** @type {!number} */
	var other$0$0$_m23$0;
	/** @type {!number} */
	var other$0$0$_m24$0;
	/** @type {!number} */
	var other$0$0$_m31$0;
	/** @type {!number} */
	var other$0$0$_m32$0;
	/** @type {!number} */
	var other$0$0$_m33$0;
	/** @type {!number} */
	var other$0$0$_m34$0;
	/** @type {!number} */
	var other$0$0$_m41$0;
	/** @type {!number} */
	var other$0$0$_m42$0;
	/** @type {!number} */
	var other$0$0$_m43$0;
	/** @type {!number} */
	var other$0$0$_m44$0;
	/** @type {!number} */
	var other$0$1$_m11$0;
	/** @type {!number} */
	var other$0$1$_m12$0;
	/** @type {!number} */
	var other$0$1$_m13$0;
	/** @type {!number} */
	var other$0$1$_m14$0;
	/** @type {!number} */
	var other$0$1$_m21$0;
	/** @type {!number} */
	var other$0$1$_m22$0;
	/** @type {!number} */
	var other$0$1$_m23$0;
	/** @type {!number} */
	var other$0$1$_m24$0;
	/** @type {!number} */
	var other$0$1$_m31$0;
	/** @type {!number} */
	var other$0$1$_m32$0;
	/** @type {!number} */
	var other$0$1$_m33$0;
	/** @type {!number} */
	var other$0$1$_m34$0;
	/** @type {!number} */
	var other$0$1$_m41$0;
	/** @type {!number} */
	var other$0$1$_m42$0;
	/** @type {!number} */
	var other$0$1$_m43$0;
	/** @type {!number} */
	var other$0$1$_m44$0;
	gray = new Color$III(192, 192, 192);
	lightGreen = new Color$III(160, 255, 160);
	green = new Color$III(96, 255, 96);
	size = 30;
	Context3D$setDepth$LContext3D$I(context, 4);
	Util3D$tileRectXZ$LContext3D$IIIIIILColor$LColor$(context, 0, 60, 60, 180, -20, 30, gray, gray);
	Util3D$tileRectXZ$LContext3D$IIIIIILColor$LColor$(context, 0, 450, 600, 600, -20, 30, lightGreen, green);
	Util3D$tileRectXZ$LContext3D$IIIIIILColor$LColor$(context, 0, 780, 60, 60, -20, 30, green, lightGreen);
	Util3D$tileRectXZ$LContext3D$IIIIIILColor$LColor$(context, 270, 840, 600, 60, -20, 30, green, lightGreen);
	context._matrixStack.prepend$LMatrix$(context._worldMatrix.copy$());
	center$0 = new Vector$NNN(0, 0, 0);
	context._polygonList = new List$Polygon$E$();
	context._groupCenter = center$0;
	context._ignoringZHidden = true;
	this$0$0 = context._worldMatrix;
	other$0$0$_m11$0 = [ 1, 0, 0, 510, 0, 1, 0, 0, 0, 0, 1, 510, 0, 0, 0, 1 ][0];
	other$0$0$_m12$0 = [ 1, 0, 0, 510, 0, 1, 0, 0, 0, 0, 1, 510, 0, 0, 0, 1 ][1];
	other$0$0$_m13$0 = [ 1, 0, 0, 510, 0, 1, 0, 0, 0, 0, 1, 510, 0, 0, 0, 1 ][2];
	other$0$0$_m14$0 = [ 1, 0, 0, 510, 0, 1, 0, 0, 0, 0, 1, 510, 0, 0, 0, 1 ][3];
	other$0$0$_m21$0 = [ 1, 0, 0, 510, 0, 1, 0, 0, 0, 0, 1, 510, 0, 0, 0, 1 ][4];
	other$0$0$_m22$0 = [ 1, 0, 0, 510, 0, 1, 0, 0, 0, 0, 1, 510, 0, 0, 0, 1 ][5];
	other$0$0$_m23$0 = [ 1, 0, 0, 510, 0, 1, 0, 0, 0, 0, 1, 510, 0, 0, 0, 1 ][6];
	other$0$0$_m24$0 = [ 1, 0, 0, 510, 0, 1, 0, 0, 0, 0, 1, 510, 0, 0, 0, 1 ][7];
	other$0$0$_m31$0 = [ 1, 0, 0, 510, 0, 1, 0, 0, 0, 0, 1, 510, 0, 0, 0, 1 ][8];
	other$0$0$_m32$0 = [ 1, 0, 0, 510, 0, 1, 0, 0, 0, 0, 1, 510, 0, 0, 0, 1 ][9];
	other$0$0$_m33$0 = [ 1, 0, 0, 510, 0, 1, 0, 0, 0, 0, 1, 510, 0, 0, 0, 1 ][10];
	other$0$0$_m34$0 = [ 1, 0, 0, 510, 0, 1, 0, 0, 0, 0, 1, 510, 0, 0, 0, 1 ][11];
	other$0$0$_m41$0 = [ 1, 0, 0, 510, 0, 1, 0, 0, 0, 0, 1, 510, 0, 0, 0, 1 ][12];
	other$0$0$_m42$0 = [ 1, 0, 0, 510, 0, 1, 0, 0, 0, 0, 1, 510, 0, 0, 0, 1 ][13];
	other$0$0$_m43$0 = [ 1, 0, 0, 510, 0, 1, 0, 0, 0, 0, 1, 510, 0, 0, 0, 1 ][14];
	other$0$0$_m44$0 = [ 1, 0, 0, 510, 0, 1, 0, 0, 0, 0, 1, 510, 0, 0, 0, 1 ][15];
	m11$0$0 = this$0$0._m11;
	m12$0$0 = this$0$0._m12;
	m13$0$0 = this$0$0._m13;
	m14$0$0 = this$0$0._m14;
	m21$0$0 = this$0$0._m21;
	m22$0$0 = this$0$0._m22;
	m23$0$0 = this$0$0._m23;
	m24$0$0 = this$0$0._m24;
	m31$0$0 = this$0$0._m31;
	m32$0$0 = this$0$0._m32;
	m33$0$0 = this$0$0._m33;
	m34$0$0 = this$0$0._m34;
	m41$0$0 = this$0$0._m41;
	m42$0$0 = this$0$0._m42;
	m43$0$0 = this$0$0._m43;
	m44$0$0 = this$0$0._m44;
	this$0$0._m11 = m11$0$0 * (_m11$0 = other$0$0$_m11$0) + m12$0$0 * (_m21$0 = other$0$0$_m21$0) + m13$0$0 * (_m31$0 = other$0$0$_m31$0) + m14$0$0 * (_m41$0 = other$0$0$_m41$0);
	this$0$0._m12 = m11$0$0 * (_m12$0 = other$0$0$_m12$0) + m12$0$0 * (_m22$0 = other$0$0$_m22$0) + m13$0$0 * (_m32$0 = other$0$0$_m32$0) + m14$0$0 * (_m42$0 = other$0$0$_m42$0);
	this$0$0._m13 = m11$0$0 * (_m13$0 = other$0$0$_m13$0) + m12$0$0 * (_m23$0 = other$0$0$_m23$0) + m13$0$0 * (_m33$0 = other$0$0$_m33$0) + m14$0$0 * (_m43$0 = other$0$0$_m43$0);
	this$0$0._m14 = m11$0$0 * (_m14$0 = other$0$0$_m14$0) + m12$0$0 * (_m24$0 = other$0$0$_m24$0) + m13$0$0 * (_m34$0 = other$0$0$_m34$0) + m14$0$0 * (_m44$0 = other$0$0$_m44$0);
	this$0$0._m21 = m21$0$0 * _m11$0 + m22$0$0 * _m21$0 + m23$0$0 * _m31$0 + m24$0$0 * _m41$0;
	this$0$0._m22 = m21$0$0 * _m12$0 + m22$0$0 * _m22$0 + m23$0$0 * _m32$0 + m24$0$0 * _m42$0;
	this$0$0._m23 = m21$0$0 * _m13$0 + m22$0$0 * _m23$0 + m23$0$0 * _m33$0 + m24$0$0 * _m43$0;
	this$0$0._m24 = m21$0$0 * _m14$0 + m22$0$0 * _m24$0 + m23$0$0 * _m34$0 + m24$0$0 * _m44$0;
	this$0$0._m31 = m31$0$0 * _m11$0 + m32$0$0 * _m21$0 + m33$0$0 * _m31$0 + m34$0$0 * _m41$0;
	this$0$0._m32 = m31$0$0 * _m12$0 + m32$0$0 * _m22$0 + m33$0$0 * _m32$0 + m34$0$0 * _m42$0;
	this$0$0._m33 = m31$0$0 * _m13$0 + m32$0$0 * _m23$0 + m33$0$0 * _m33$0 + m34$0$0 * _m43$0;
	this$0$0._m34 = m31$0$0 * _m14$0 + m32$0$0 * _m24$0 + m33$0$0 * _m34$0 + m34$0$0 * _m44$0;
	this$0$0._m41 = m41$0$0 * _m11$0 + m42$0$0 * _m21$0 + m43$0$0 * _m31$0 + m44$0$0 * _m41$0;
	this$0$0._m42 = m41$0$0 * _m12$0 + m42$0$0 * _m22$0 + m43$0$0 * _m32$0 + m44$0$0 * _m42$0;
	this$0$0._m43 = m41$0$0 * _m13$0 + m42$0$0 * _m23$0 + m43$0$0 * _m33$0 + m44$0$0 * _m43$0;
	this$0$0._m44 = m41$0$0 * _m14$0 + m42$0$0 * _m24$0 + m43$0$0 * _m34$0 + m44$0$0 * _m44$0;
	for (i = 0; i < 10; i++) {
		for (j = 0; j < 2; j++) {
			color = ((i + j) % 2 === 0 ? lightGreen : green);
			Util3D$tileOnGroup$LContext3D$IIIILColor$(context, j * size + size / 2, -20 + (9 - i) * 5, i * size + size / 2, size, color);
		}
	}
	for (i = 0; i < 10; i++) {
		for (j = 0; j < 2; j++) {
			color = ((i + j) % 2 === 0 ? lightGreen : green);
			Util3D$tileOnGroup$LContext3D$IIIILColor$(context, j * size + size / 2, -20 + (9 - i) * 5, - i * size - size / 2, size, color);
		}
	}
	Context3D$endGroup$LContext3D$(context);
	context._worldMatrix = context._matrixStack.removeFirst$();
	Util3D$tileRectXZ$LContext3D$IIIIIILColor$LColor$(context, 810, 180, 600, 60, -20, size, green, lightGreen);
	context._matrixStack.prepend$LMatrix$(context._worldMatrix.copy$());
	center$1 = new Vector$NNN(0, 0, 0);
	context._polygonList = new List$Polygon$E$();
	context._groupCenter = center$1;
	context._ignoringZHidden = true;
	this$0$1 = context._worldMatrix;
	other$0$1$_m11$0 = [ 1, 0, 0, 1110, 0, 1, 0, 0, 0, 0, 1, 150, 0, 0, 0, 1 ][0];
	other$0$1$_m12$0 = [ 1, 0, 0, 1110, 0, 1, 0, 0, 0, 0, 1, 150, 0, 0, 0, 1 ][1];
	other$0$1$_m13$0 = [ 1, 0, 0, 1110, 0, 1, 0, 0, 0, 0, 1, 150, 0, 0, 0, 1 ][2];
	other$0$1$_m14$0 = [ 1, 0, 0, 1110, 0, 1, 0, 0, 0, 0, 1, 150, 0, 0, 0, 1 ][3];
	other$0$1$_m21$0 = [ 1, 0, 0, 1110, 0, 1, 0, 0, 0, 0, 1, 150, 0, 0, 0, 1 ][4];
	other$0$1$_m22$0 = [ 1, 0, 0, 1110, 0, 1, 0, 0, 0, 0, 1, 150, 0, 0, 0, 1 ][5];
	other$0$1$_m23$0 = [ 1, 0, 0, 1110, 0, 1, 0, 0, 0, 0, 1, 150, 0, 0, 0, 1 ][6];
	other$0$1$_m24$0 = [ 1, 0, 0, 1110, 0, 1, 0, 0, 0, 0, 1, 150, 0, 0, 0, 1 ][7];
	other$0$1$_m31$0 = [ 1, 0, 0, 1110, 0, 1, 0, 0, 0, 0, 1, 150, 0, 0, 0, 1 ][8];
	other$0$1$_m32$0 = [ 1, 0, 0, 1110, 0, 1, 0, 0, 0, 0, 1, 150, 0, 0, 0, 1 ][9];
	other$0$1$_m33$0 = [ 1, 0, 0, 1110, 0, 1, 0, 0, 0, 0, 1, 150, 0, 0, 0, 1 ][10];
	other$0$1$_m34$0 = [ 1, 0, 0, 1110, 0, 1, 0, 0, 0, 0, 1, 150, 0, 0, 0, 1 ][11];
	other$0$1$_m41$0 = [ 1, 0, 0, 1110, 0, 1, 0, 0, 0, 0, 1, 150, 0, 0, 0, 1 ][12];
	other$0$1$_m42$0 = [ 1, 0, 0, 1110, 0, 1, 0, 0, 0, 0, 1, 150, 0, 0, 0, 1 ][13];
	other$0$1$_m43$0 = [ 1, 0, 0, 1110, 0, 1, 0, 0, 0, 0, 1, 150, 0, 0, 0, 1 ][14];
	other$0$1$_m44$0 = [ 1, 0, 0, 1110, 0, 1, 0, 0, 0, 0, 1, 150, 0, 0, 0, 1 ][15];
	m11$0$1 = this$0$1._m11;
	m12$0$1 = this$0$1._m12;
	m13$0$1 = this$0$1._m13;
	m14$0$1 = this$0$1._m14;
	m21$0$1 = this$0$1._m21;
	m22$0$1 = this$0$1._m22;
	m23$0$1 = this$0$1._m23;
	m24$0$1 = this$0$1._m24;
	m31$0$1 = this$0$1._m31;
	m32$0$1 = this$0$1._m32;
	m33$0$1 = this$0$1._m33;
	m34$0$1 = this$0$1._m34;
	m41$0$1 = this$0$1._m41;
	m42$0$1 = this$0$1._m42;
	m43$0$1 = this$0$1._m43;
	m44$0$1 = this$0$1._m44;
	this$0$1._m11 = m11$0$1 * (_m11$1 = other$0$1$_m11$0) + m12$0$1 * (_m21$1 = other$0$1$_m21$0) + m13$0$1 * (_m31$1 = other$0$1$_m31$0) + m14$0$1 * (_m41$1 = other$0$1$_m41$0);
	this$0$1._m12 = m11$0$1 * (_m12$1 = other$0$1$_m12$0) + m12$0$1 * (_m22$1 = other$0$1$_m22$0) + m13$0$1 * (_m32$1 = other$0$1$_m32$0) + m14$0$1 * (_m42$1 = other$0$1$_m42$0);
	this$0$1._m13 = m11$0$1 * (_m13$1 = other$0$1$_m13$0) + m12$0$1 * (_m23$1 = other$0$1$_m23$0) + m13$0$1 * (_m33$1 = other$0$1$_m33$0) + m14$0$1 * (_m43$1 = other$0$1$_m43$0);
	this$0$1._m14 = m11$0$1 * (_m14$1 = other$0$1$_m14$0) + m12$0$1 * (_m24$1 = other$0$1$_m24$0) + m13$0$1 * (_m34$1 = other$0$1$_m34$0) + m14$0$1 * (_m44$1 = other$0$1$_m44$0);
	this$0$1._m21 = m21$0$1 * _m11$1 + m22$0$1 * _m21$1 + m23$0$1 * _m31$1 + m24$0$1 * _m41$1;
	this$0$1._m22 = m21$0$1 * _m12$1 + m22$0$1 * _m22$1 + m23$0$1 * _m32$1 + m24$0$1 * _m42$1;
	this$0$1._m23 = m21$0$1 * _m13$1 + m22$0$1 * _m23$1 + m23$0$1 * _m33$1 + m24$0$1 * _m43$1;
	this$0$1._m24 = m21$0$1 * _m14$1 + m22$0$1 * _m24$1 + m23$0$1 * _m34$1 + m24$0$1 * _m44$1;
	this$0$1._m31 = m31$0$1 * _m11$1 + m32$0$1 * _m21$1 + m33$0$1 * _m31$1 + m34$0$1 * _m41$1;
	this$0$1._m32 = m31$0$1 * _m12$1 + m32$0$1 * _m22$1 + m33$0$1 * _m32$1 + m34$0$1 * _m42$1;
	this$0$1._m33 = m31$0$1 * _m13$1 + m32$0$1 * _m23$1 + m33$0$1 * _m33$1 + m34$0$1 * _m43$1;
	this$0$1._m34 = m31$0$1 * _m14$1 + m32$0$1 * _m24$1 + m33$0$1 * _m34$1 + m34$0$1 * _m44$1;
	this$0$1._m41 = m41$0$1 * _m11$1 + m42$0$1 * _m21$1 + m43$0$1 * _m31$1 + m44$0$1 * _m41$1;
	this$0$1._m42 = m41$0$1 * _m12$1 + m42$0$1 * _m22$1 + m43$0$1 * _m32$1 + m44$0$1 * _m42$1;
	this$0$1._m43 = m41$0$1 * _m13$1 + m42$0$1 * _m23$1 + m43$0$1 * _m33$1 + m44$0$1 * _m43$1;
	this$0$1._m44 = m41$0$1 * _m14$1 + m42$0$1 * _m24$1 + m43$0$1 * _m34$1 + m44$0$1 * _m44$1;
	for (i = 0; i < 4; i++) {
		for (j = 0; j < 22; j++) {
			color = ((i + j) % 2 === 0 ? lightGreen : green);
			Context3D$renderPolygonGroup$LContext3D$ALVector$LColor$(context, [ new Vector$NNN(i * 40, -20 + i * 20, j * size), new Vector$NNN(i * 40, -20 + i * 20, (j + 1) * size), new Vector$NNN((i + 1) * 40, -20 + (i + 1) * 20, (j + 1) * size), new Vector$NNN((i + 1) * 40, -20 + (i + 1) * 20, j * size) ], color);
		}
	}
	Context3D$endGroup$LContext3D$(context);
	context._worldMatrix = context._matrixStack.removeFirst$();
	Util3D$tileRectXZ$LContext3D$IIIIIILColor$LColor$(context, 1080, 1050, 60, 600, -20, size, green, lightGreen);
	Util3D$tileRectXZ$LContext3D$IIIIIILColor$LColor$(context, 1080, 1380, 60, 60, -20, size / 2, new Color$III(0xff, 0xd7, 0x00), new Color$III(0xff, 0xff, 255));
	Context3D$setDepth$LContext3D$I(context, 3);
};

/**
 */
BlueBall.prototype._setMobileOperation$ = function () {
	var $this = this;
	dom.window.addEventListener('devicemotion', (function (e) {
		/** @type {DeviceMotionEvent} */
		var de;
		/** @type {!number} */
		var az;
		/** @type {!number} */
		var ax;
		/** @type {Player} */
		var $this$0;
		/** @type {Player} */
		var $this$1;
		/** @type {Player} */
		var $this$2;
		/** @type {Player} */
		var player$0;
		/** @type {Player} */
		var player$1;
		/** @type {Player} */
		var player$2;
		de = (function (o) { return o instanceof DeviceMotionEvent ? o : null; })(e);
		az = de.accelerationIncludingGravity.y * 30;
		ax = de.accelerationIncludingGravity.x * 30 / 2;
		az = (az <= 120 ? az : 120);
		if (az < -60) {
			$this$0 = player$0 = $this.player;
			$this$0.isBraking = true;
			Player$move$LPlayer$NN(player$0, 0, ax / 4);
		} else {
			if (az < 0) {
				$this$1 = player$1 = $this.player;
				$this$1.isBraking = false;
				Player$move$LPlayer$NN(player$1, 0, ax / 2);
			} else {
				$this$2 = player$2 = $this.player;
				$this$2.isBraking = false;
				Player$move$LPlayer$NN(player$2, az, ax);
			}
		}
	}));
	dom.window.addEventListener('touchstart', (function (e) {
		if (! $this.isStarted) {
			$this.isStarted = true;
			$this.player.vz = 100;
		} else {
			$this.player.vy = 80;
		}
	}));
};

/**
 */
BlueBall.prototype._setPCOperation$ = function () {
	var $this = this;
	dom.window.document.addEventListener('keypress', (function (e) {
		/** @type {KeyboardEvent} */
		var ke;
		/** @type {!number} */
		var accel;
		/** @type {Player} */
		var $this$0;
		/** @type {Player} */
		var $this$1;
		/** @type {Player} */
		var $this$2;
		/** @type {Player} */
		var $this$3;
		/** @type {Player} */
		var $this$4;
		/** @type {Player} */
		var $this$5;
		/** @type {Player} */
		var $this$6;
		/** @type {Player} */
		var $this$7;
		/** @type {Player} */
		var player$0;
		/** @type {Player} */
		var player$1;
		/** @type {Player} */
		var player$2;
		/** @type {Player} */
		var player$3;
		/** @type {Player} */
		var player$4;
		/** @type {Player} */
		var player$5;
		if (! $this.isStarted) {
			$this.isStarted = true;
			$this.player.vz = 100;
			return;
		}
		ke = (function (o) { return o instanceof KeyboardEvent ? o : null; })(e);
		accel = 100;
		switch (ke.keyCode) {
		case 119:
			$this$0 = player$0 = $this.player;
			$this$0.isBraking = false;
			Player$move$LPlayer$NN(player$0, accel, 0);
			break;
		case 115:
			$this$1 = $this.player;
			$this$1.isBraking = true;
			break;
		case 97:
			$this$2 = player$1 = $this.player;
			$this$2.isBraking = false;
			Player$move$LPlayer$NN(player$1, 0, - accel / 2);
			break;
		case 100:
			$this$3 = player$2 = $this.player;
			$this$3.isBraking = false;
			Player$move$LPlayer$NN(player$2, 0, accel / 2);
			break;
		case 104:
			$this$4 = player$3 = $this.player;
			$this$4.isBraking = false;
			Player$move$LPlayer$NN(player$3, 0, - accel / 2);
			break;
		case 106:
			$this$5 = $this.player;
			$this$5.isBraking = true;
			break;
		case 107:
			$this$6 = player$4 = $this.player;
			$this$6.isBraking = false;
			Player$move$LPlayer$NN(player$4, accel, 0);
			break;
		case 108:
			$this$7 = player$5 = $this.player;
			$this$7.isBraking = false;
			Player$move$LPlayer$NN(player$5, 0, accel / 2);
			break;
		case 32:
			$this.player.vy = 80;
			break;
		}
	}), false);
};

/**
 */
BlueBall.prototype.run$ = function () {
	this.engine.start$();
};

/**
 * class _Main extends Object
 * @constructor
 */
function _Main() {
}

_Main.prototype = new Object;
/**
 * @constructor
 */
function _Main$() {
};

_Main$.prototype = new _Main;

/**
 * @param {Array.<undefined|!string>} args
 */
_Main.main$AS = function (args) {
	/** @type {BlueBall} */
	var game;
	game = new BlueBall$();
	game.engine.start$();
};

var _Main$main$AS = _Main.main$AS;

/**
 * class Vector extends Object
 * @constructor
 */
function Vector() {
}

Vector.prototype = new Object;
/**
 * @constructor
 * @param {!number} x
 * @param {!number} y
 * @param {!number} z
 */
function Vector$NNN(x, y, z) {
	this.x = x;
	this.y = y;
	this.z = z;
	this.w = 1;
};

Vector$NNN.prototype = new Vector;

/**
 * @constructor
 * @param {!number} x
 * @param {!number} y
 * @param {!number} z
 * @param {!number} w
 */
function Vector$NNNN(x, y, z, w) {
	/** @type {!number} */
	var x$0;
	x$0 = this.x = x / w;
	this.y = y / w;
	this.z = z / w;
	this.w = 1;
	if (x$0 === NaN) {
		console.log(w);
	}
};

Vector$NNNN.prototype = new Vector;

/**
 * @constructor
 * @param {Vector} v
 */
function Vector$LVector$(v) {
	this.x = v.x;
	this.y = v.y;
	this.z = v.z;
	this.w = 1;
};

Vector$LVector$.prototype = new Vector;

/**
 * @return {Vector}
 */
Vector.origin$ = function () {
	return new Vector$NNN(0, 0, 0);
};

var Vector$origin$ = Vector.origin$;

/**
 * @param {Vector} other
 * @return {Vector}
 */
Vector.prototype.add$LVector$ = function (other) {
	return new Vector$NNN(this.x + other.x, this.y + other.y, this.z + other.z);
};

/**
 * @param {Vector} other
 * @return {Vector}
 */
Vector.prototype.addSelf$LVector$ = function (other) {
	this.x += other.x;
	this.y += other.y;
	this.z += other.z;
	return this;
};

/**
 * @param {Vector} other
 * @return {Vector}
 */
Vector.prototype.sub$LVector$ = function (other) {
	return new Vector$NNN(this.x - other.x, this.y - other.y, this.z - other.z);
};

/**
 * @param {Vector} other
 * @return {Vector}
 */
Vector.prototype.subSelf$LVector$ = function (other) {
	this.x -= other.x;
	this.y -= other.y;
	this.z -= other.z;
	return this;
};

/**
 * @param {!number} other
 * @return {Vector}
 */
Vector.prototype.mul$N = function (other) {
	return new Vector$NNN(this.x * other, this.y * other, this.z * other);
};

/**
 * @param {!number} other
 * @return {Vector}
 */
Vector.prototype.mulSelf$N = function (other) {
	this.x *= other;
	this.y *= other;
	this.z *= other;
	return this;
};

/**
 * @param {!number} other
 * @return {Vector}
 */
Vector.prototype.div$N = function (other) {
	return new Vector$NNN(this.x / other, this.y / other, this.z / other);
};

/**
 * @param {!number} other
 * @return {Vector}
 */
Vector.prototype.divSelf$N = function (other) {
	this.x /= other;
	this.y /= other;
	this.z /= other;
	return this;
};

/**
 * @param {Vector} other
 * @return {!number}
 */
Vector.prototype.dot$LVector$ = function (other) {
	return this.x * other.x + this.y * other.y + this.z * other.z;
};

/**
 * @param {Vector} other
 * @return {Vector}
 */
Vector.prototype.cross$LVector$ = function (other) {
	/** @type {!number} */
	var z$0;
	/** @type {!number} */
	var z$1;
	/** @type {!number} */
	var x$0;
	/** @type {!number} */
	var y$0;
	/** @type {!number} */
	var y$1;
	/** @type {!number} */
	var x$1;
	return new Vector$NNN((y$1 = this.y) * (z$1 = other.z) - (z$0 = this.z) * (y$0 = other.y), z$0 * (x$1 = other.x) - (x$0 = this.x) * z$1, x$0 * y$0 - y$1 * x$1);
};

/**
 * @param {Vector} other
 * @return {Vector}
 */
Vector.prototype.crossSelf$LVector$ = function (other) {
	/** @type {!number} */
	var x;
	/** @type {!number} */
	var y;
	/** @type {!number} */
	var z;
	/** @type {!number} */
	var z$0;
	/** @type {!number} */
	var z$1;
	/** @type {!number} */
	var x$0;
	/** @type {!number} */
	var y$0;
	/** @type {!number} */
	var y$1;
	/** @type {!number} */
	var x$1;
	x = (y$1 = this.y) * (z$1 = other.z) - (z$0 = this.z) * (y$0 = other.y);
	y = z$0 * (x$1 = other.x) - (x$0 = this.x) * z$1;
	z = x$0 * y$0 - y$1 * x$1;
	this.x = x;
	this.y = y;
	this.z = z;
	return this;
};

/**
 * @return {Vector}
 */
Vector.prototype.unit$ = function () {
	/** @type {!number} */
	var length;
	/** @type {!number} */
	var x$0;
	/** @type {!number} */
	var y$0;
	/** @type {!number} */
	var z$0;
	length = Math.sqrt((x$0 = this.x) * x$0 + (y$0 = this.y) * y$0 + (z$0 = this.z) * z$0);
	return (length < 1e-9 ? new Vector$NNN(0, 0, 0) : new Vector$NNN(this.x / length, this.y / length, this.z / length));
};

/**
 * @return {Vector}
 */
Vector.prototype.unitSelf$ = function () {
	/** @type {!number} */
	var length;
	/** @type {!number} */
	var x$0;
	/** @type {!number} */
	var y$0;
	/** @type {!number} */
	var z$0;
	length = Math.sqrt((x$0 = this.x) * x$0 + (y$0 = this.y) * y$0 + (z$0 = this.z) * z$0);
	return (length < 1e-9 ? new Vector$NNN(0, 0, 0) : this.divSelf$N(length));
};

/**
 * @return {!number}
 */
Vector.prototype.sqabs$ = function () {
	/** @type {!number} */
	var x$0;
	/** @type {!number} */
	var y$0;
	/** @type {!number} */
	var z$0;
	return (x$0 = this.x) * x$0 + (y$0 = this.y) * y$0 + (z$0 = this.z) * z$0;
};

/**
 * @return {!number}
 */
Vector.prototype.abs$ = function () {
	/** @type {!number} */
	var x$0;
	/** @type {!number} */
	var y$0;
	/** @type {!number} */
	var z$0;
	return Math.sqrt((x$0 = this.x) * x$0 + (y$0 = this.y) * y$0 + (z$0 = this.z) * z$0);
};

/**
 * @param {!number} rad
 * @return {Vector}
 */
Vector.prototype.rotateX$N = function (rad) {
	/** @type {!number} */
	var sin;
	/** @type {!number} */
	var cos;
	/** @type {!number} */
	var z$0;
	/** @type {!number} */
	var y$0;
	sin = Math.sin(rad);
	cos = Math.cos(rad);
	return new Vector$NNN(this.x, (y$0 = this.y) * cos - (z$0 = this.z) * sin, z$0 * cos + y$0 * sin);
};

/**
 * @param {!number} rad
 * @return {Vector}
 */
Vector.prototype.rotateXSelf$N = function (rad) {
	/** @type {!number} */
	var sin;
	/** @type {!number} */
	var cos;
	/** @type {!number} */
	var y;
	/** @type {!number} */
	var z;
	/** @type {!number} */
	var z$0;
	/** @type {!number} */
	var y$0;
	sin = Math.sin(rad);
	cos = Math.cos(rad);
	y = (y$0 = this.y) * cos - (z$0 = this.z) * sin;
	z = z$0 * cos + y$0 * sin;
	this.y = y;
	this.z = z;
	return this;
};

/**
 * @param {!number} rad
 * @return {Vector}
 */
Vector.prototype.rotateY$N = function (rad) {
	/** @type {!number} */
	var sin;
	/** @type {!number} */
	var cos;
	/** @type {!number} */
	var z$0;
	/** @type {!number} */
	var x$0;
	sin = Math.sin(rad);
	cos = Math.cos(rad);
	return new Vector$NNN((x$0 = this.x) * cos + (z$0 = this.z) * sin, this.y, z$0 * cos - x$0 * sin);
};

/**
 * @param {!number} rad
 * @return {Vector}
 */
Vector.prototype.rotateYSelf$N = function (rad) {
	/** @type {!number} */
	var sin;
	/** @type {!number} */
	var cos;
	/** @type {!number} */
	var x;
	/** @type {!number} */
	var z;
	/** @type {!number} */
	var z$0;
	/** @type {!number} */
	var x$0;
	sin = Math.sin(rad);
	cos = Math.cos(rad);
	x = (x$0 = this.x) * cos + (z$0 = this.z) * sin;
	z = z$0 * cos - x$0 * sin;
	this.x = x;
	this.z = z;
	return this;
};

/**
 * @param {!number} rad
 * @return {Vector}
 */
Vector.prototype.rotateZ$N = function (rad) {
	/** @type {!number} */
	var sin;
	/** @type {!number} */
	var cos;
	/** @type {!number} */
	var y$0;
	/** @type {!number} */
	var z$0;
	sin = Math.sin(rad);
	cos = Math.cos(rad);
	return new Vector$NNN(this.x * cos - (y$0 = this.y) * sin, y$0 * cos + (z$0 = this.z) * sin, z$0);
};

/**
 * @param {!number} rad
 * @return {Vector}
 */
Vector.prototype.rotateZSelf$N = function (rad) {
	/** @type {!number} */
	var sin;
	/** @type {!number} */
	var cos;
	/** @type {!number} */
	var x;
	/** @type {!number} */
	var y;
	/** @type {!number} */
	var y$0;
	sin = Math.sin(rad);
	cos = Math.cos(rad);
	x = this.x * cos - (y$0 = this.y) * sin;
	y = y$0 * cos + this.z * sin;
	this.x = x;
	this.y = y;
	return this;
};

/**
 * @param {Matrix} m
 * @return {Vector}
 */
Vector.prototype.transform$LMatrix$ = function (m) {
	/** @type {!number} */
	var x;
	/** @type {!number} */
	var y;
	/** @type {!number} */
	var z;
	/** @type {!number} */
	var w;
	/** @type {!number} */
	var x$0;
	/** @type {!number} */
	var y$0;
	/** @type {!number} */
	var z$0;
	/** @type {!number} */
	var w$0;
	x = m._m11 * (x$0 = this.x) + m._m12 * (y$0 = this.y) + m._m13 * (z$0 = this.z) + m._m14 * (w$0 = this.w);
	y = m._m21 * x$0 + m._m22 * y$0 + m._m23 * z$0 + m._m24 * w$0;
	z = m._m31 * x$0 + m._m32 * y$0 + m._m33 * z$0 + m._m34 * w$0;
	w = m._m41 * x$0 + m._m42 * y$0 + m._m43 * z$0 + m._m44 * w$0;
	return new Vector$NNNN(x, y, z, w);
};

/**
 * @param {Matrix} m
 * @return {Vector}
 */
Vector.prototype.transformSelf$LMatrix$ = function (m) {
	/** @type {!number} */
	var x;
	/** @type {!number} */
	var y;
	/** @type {!number} */
	var z;
	/** @type {!number} */
	var w;
	/** @type {!number} */
	var x$0;
	/** @type {!number} */
	var y$0;
	/** @type {!number} */
	var z$0;
	/** @type {!number} */
	var w$0;
	x = m._m11 * (x$0 = this.x) + m._m12 * (y$0 = this.y) + m._m13 * (z$0 = this.z) + m._m14 * (w$0 = this.w);
	y = m._m21 * x$0 + m._m22 * y$0 + m._m23 * z$0 + m._m24 * w$0;
	z = m._m31 * x$0 + m._m32 * y$0 + m._m33 * z$0 + m._m34 * w$0;
	w = m._m41 * x$0 + m._m42 * y$0 + m._m43 * z$0 + m._m44 * w$0;
	this.x = x / w;
	this.y = y / w;
	this.z = z / w;
	this.w = 1;
	return this;
};

/**
 * @return {!string}
 */
Vector.prototype.toString = function () {
	var $this = this;
	var fix;
	fix = (function (value) {
		/** @type {!string} */
		var str;
		/** @type {!number} */
		var len;
		/** @type {!number} */
		var i;
		str = value.toFixed(1);
		len = str.length;
		for (i = 0; i < 8 - len; i++) {
			str = ' ' + str;
		}
		return str;
	});
	return '(' + fix(this.x) + ',' + fix(this.y) + ',' + fix(this.z) + ',' + fix(this.w) + ')';
};

/**
 * class Matrix extends Object
 * @constructor
 */
function Matrix() {
}

Matrix.prototype = new Object;
/**
 * @constructor
 */
function Matrix$() {
	this._m11 = 1;
	this._m12 = 0;
	this._m13 = 0;
	this._m14 = 0;
	this._m21 = 0;
	this._m22 = 1;
	this._m23 = 0;
	this._m24 = 0;
	this._m31 = 0;
	this._m32 = 0;
	this._m33 = 1;
	this._m34 = 0;
	this._m41 = 0;
	this._m42 = 0;
	this._m43 = 0;
	this._m44 = 1;
};

Matrix$.prototype = new Matrix;

/**
 * @constructor
 * @param {Array.<undefined|!number>} m
 */
function Matrix$AN(m) {
	this._m11 = m[0];
	this._m12 = m[1];
	this._m13 = m[2];
	this._m14 = m[3];
	this._m21 = m[4];
	this._m22 = m[5];
	this._m23 = m[6];
	this._m24 = m[7];
	this._m31 = m[8];
	this._m32 = m[9];
	this._m33 = m[10];
	this._m34 = m[11];
	this._m41 = m[12];
	this._m42 = m[13];
	this._m43 = m[14];
	this._m44 = m[15];
};

Matrix$AN.prototype = new Matrix;

/**
 * @return {Matrix}
 */
Matrix.prototype.copy$ = function () {
	return new Matrix$AN([ this._m11, this._m12, this._m13, this._m14, this._m21, this._m22, this._m23, this._m24, this._m31, this._m32, this._m33, this._m34, this._m41, this._m42, this._m43, this._m44 ]);
};

/**
 * @param {Vector} v
 * @return {Matrix}
 */
Matrix.translating$LVector$ = function (v) {
	/** @type {!number} */
	var x$0;
	/** @type {!number} */
	var y$0;
	/** @type {!number} */
	var z$0;
	x$0 = v.x;
	y$0 = v.y;
	z$0 = v.z;
	return new Matrix$AN([ 1, 0, 0, x$0, 0, 1, 0, y$0, 0, 0, 1, z$0, 0, 0, 0, 1 ]);
};

var Matrix$translating$LVector$ = Matrix.translating$LVector$;

/**
 * @param {!number} x
 * @param {!number} y
 * @param {!number} z
 * @return {Matrix}
 */
Matrix.translating$NNN = function (x, y, z) {
	return new Matrix$AN([ 1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1 ]);
};

var Matrix$translating$NNN = Matrix.translating$NNN;

/**
 * @param {!number} rad
 * @return {Matrix}
 */
Matrix.rotatingX$N = function (rad) {
	/** @type {!number} */
	var sin;
	/** @type {!number} */
	var cos;
	sin = Math.sin(rad);
	cos = Math.cos(rad);
	return new Matrix$AN([ 1, 0, 0, 0, 0, cos, - sin, 0, 0, sin, cos, 0, 0, 0, 0, 1 ]);
};

var Matrix$rotatingX$N = Matrix.rotatingX$N;

/**
 * @param {!number} rad
 * @return {Matrix}
 */
Matrix.rotatingY$N = function (rad) {
	/** @type {!number} */
	var sin;
	/** @type {!number} */
	var cos;
	sin = Math.sin(rad);
	cos = Math.cos(rad);
	return new Matrix$AN([ cos, 0, sin, 0, 0, 1, 0, 0, - sin, 0, cos, 0, 0, 0, 0, 1 ]);
};

var Matrix$rotatingY$N = Matrix.rotatingY$N;

/**
 * @param {!number} rad
 * @return {Matrix}
 */
Matrix.rotatingZ$N = function (rad) {
	/** @type {!number} */
	var sin;
	/** @type {!number} */
	var cos;
	sin = Math.sin(rad);
	cos = Math.cos(rad);
	return new Matrix$AN([ cos, - sin, 0, 0, sin, cos, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ]);
};

var Matrix$rotatingZ$N = Matrix.rotatingZ$N;

/**
 * @param {!number} x
 * @param {!number} y
 * @param {!number} z
 * @return {Matrix}
 */
Matrix.scaling$NNN = function (x, y, z) {
	return new Matrix$AN([ x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1 ]);
};

var Matrix$scaling$NNN = Matrix.scaling$NNN;

/**
 * @param {Vector} other
 * @return {Vector}
 */
Matrix.prototype.mul$LVector$ = function (other) {
	/** @type {!number} */
	var x;
	/** @type {!number} */
	var y;
	/** @type {!number} */
	var z;
	/** @type {!number} */
	var w;
	/** @type {!number} */
	var x$0;
	/** @type {!number} */
	var y$0;
	/** @type {!number} */
	var z$0;
	/** @type {!number} */
	var w$0;
	x = this._m11 * (x$0 = other.x) + this._m12 * (y$0 = other.y) + this._m13 * (z$0 = other.z) + this._m14 * (w$0 = other.w);
	y = this._m21 * x$0 + this._m22 * y$0 + this._m23 * z$0 + this._m24 * w$0;
	z = this._m31 * x$0 + this._m32 * y$0 + this._m33 * z$0 + this._m34 * w$0;
	w = this._m41 * x$0 + this._m42 * y$0 + this._m43 * z$0 + this._m44 * w$0;
	return new Vector$NNNN(x, y, z, w);
};

/**
 * @param {Matrix} other
 * @return {Matrix}
 */
Matrix.prototype.compose$LMatrix$ = function (other) {
	/** @type {!number} */
	var m11;
	/** @type {!number} */
	var m12;
	/** @type {!number} */
	var m13;
	/** @type {!number} */
	var m14;
	/** @type {!number} */
	var m21;
	/** @type {!number} */
	var m22;
	/** @type {!number} */
	var m23;
	/** @type {!number} */
	var m24;
	/** @type {!number} */
	var m31;
	/** @type {!number} */
	var m32;
	/** @type {!number} */
	var m33;
	/** @type {!number} */
	var m34;
	/** @type {!number} */
	var m41;
	/** @type {!number} */
	var m42;
	/** @type {!number} */
	var m43;
	/** @type {!number} */
	var m44;
	/** @type {!number} */
	var _m11$0;
	/** @type {!number} */
	var _m12$0;
	/** @type {!number} */
	var _m13$0;
	/** @type {!number} */
	var _m14$0;
	/** @type {!number} */
	var _m11$1;
	/** @type {!number} */
	var _m21$0;
	/** @type {!number} */
	var _m31$0;
	/** @type {!number} */
	var _m41$0;
	/** @type {!number} */
	var _m21$1;
	/** @type {!number} */
	var _m12$1;
	/** @type {!number} */
	var _m22$0;
	/** @type {!number} */
	var _m22$1;
	/** @type {!number} */
	var _m23$0;
	/** @type {!number} */
	var _m32$0;
	/** @type {!number} */
	var _m24$0;
	/** @type {!number} */
	var _m42$0;
	/** @type {!number} */
	var _m13$1;
	/** @type {!number} */
	var _m23$1;
	/** @type {!number} */
	var _m33$0;
	/** @type {!number} */
	var _m43$0;
	/** @type {!number} */
	var _m14$1;
	/** @type {!number} */
	var _m24$1;
	/** @type {!number} */
	var _m34$0;
	/** @type {!number} */
	var _m44$0;
	/** @type {!number} */
	var _m31$1;
	/** @type {!number} */
	var _m32$1;
	/** @type {!number} */
	var _m33$1;
	/** @type {!number} */
	var _m34$1;
	/** @type {!number} */
	var _m41$1;
	/** @type {!number} */
	var _m42$1;
	/** @type {!number} */
	var _m43$1;
	/** @type {!number} */
	var _m44$1;
	m11 = (_m11$0 = this._m11) * (_m11$1 = other._m11) + (_m12$0 = this._m12) * (_m21$0 = other._m21) + (_m13$0 = this._m13) * (_m31$0 = other._m31) + (_m14$0 = this._m14) * (_m41$0 = other._m41);
	m12 = _m11$0 * (_m12$1 = other._m12) + _m12$0 * (_m22$1 = other._m22) + _m13$0 * (_m32$0 = other._m32) + _m14$0 * (_m42$0 = other._m42);
	m13 = _m11$0 * (_m13$1 = other._m13) + _m12$0 * (_m23$1 = other._m23) + _m13$0 * (_m33$0 = other._m33) + _m14$0 * (_m43$0 = other._m43);
	m14 = _m11$0 * (_m14$1 = other._m14) + _m12$0 * (_m24$1 = other._m24) + _m13$0 * (_m34$0 = other._m34) + _m14$0 * (_m44$0 = other._m44);
	m21 = (_m21$1 = this._m21) * _m11$1 + (_m22$0 = this._m22) * _m21$0 + (_m23$0 = this._m23) * _m31$0 + (_m24$0 = this._m24) * _m41$0;
	m22 = _m21$1 * _m12$1 + _m22$0 * _m22$1 + _m23$0 * _m32$0 + _m24$0 * _m42$0;
	m23 = _m21$1 * _m13$1 + _m22$0 * _m23$1 + _m23$0 * _m33$0 + _m24$0 * _m43$0;
	m24 = _m21$1 * _m14$1 + _m22$0 * _m24$1 + _m23$0 * _m34$0 + _m24$0 * _m44$0;
	m31 = (_m31$1 = this._m31) * _m11$1 + (_m32$1 = this._m32) * _m21$0 + (_m33$1 = this._m33) * _m31$0 + (_m34$1 = this._m34) * _m41$0;
	m32 = _m31$1 * _m12$1 + _m32$1 * _m22$1 + _m33$1 * _m32$0 + _m34$1 * _m42$0;
	m33 = _m31$1 * _m13$1 + _m32$1 * _m23$1 + _m33$1 * _m33$0 + _m34$1 * _m43$0;
	m34 = _m31$1 * _m14$1 + _m32$1 * _m24$1 + _m33$1 * _m34$0 + _m34$1 * _m44$0;
	m41 = (_m41$1 = this._m41) * _m11$1 + (_m42$1 = this._m42) * _m21$0 + (_m43$1 = this._m43) * _m31$0 + (_m44$1 = this._m44) * _m41$0;
	m42 = _m41$1 * _m12$1 + _m42$1 * _m22$1 + _m43$1 * _m32$0 + _m44$1 * _m42$0;
	m43 = _m41$1 * _m13$1 + _m42$1 * _m23$1 + _m43$1 * _m33$0 + _m44$1 * _m43$0;
	m44 = _m41$1 * _m14$1 + _m42$1 * _m24$1 + _m43$1 * _m34$0 + _m44$1 * _m44$0;
	return new Matrix$AN([ m11, m12, m13, m14, m21, m22, m23, m24, m31, m32, m33, m34, m41, m42, m43, m44 ]);
};

/**
 * @param {Matrix} other
 * @return {Matrix}
 */
Matrix.prototype.composeSelf$LMatrix$ = function (other) {
	/** @type {!number} */
	var m11;
	/** @type {!number} */
	var m12;
	/** @type {!number} */
	var m13;
	/** @type {!number} */
	var m14;
	/** @type {!number} */
	var m21;
	/** @type {!number} */
	var m22;
	/** @type {!number} */
	var m23;
	/** @type {!number} */
	var m24;
	/** @type {!number} */
	var m31;
	/** @type {!number} */
	var m32;
	/** @type {!number} */
	var m33;
	/** @type {!number} */
	var m34;
	/** @type {!number} */
	var m41;
	/** @type {!number} */
	var m42;
	/** @type {!number} */
	var m43;
	/** @type {!number} */
	var m44;
	/** @type {!number} */
	var _m11$0;
	/** @type {!number} */
	var _m21$0;
	/** @type {!number} */
	var _m31$0;
	/** @type {!number} */
	var _m41$0;
	/** @type {!number} */
	var _m12$0;
	/** @type {!number} */
	var _m22$0;
	/** @type {!number} */
	var _m32$0;
	/** @type {!number} */
	var _m42$0;
	/** @type {!number} */
	var _m13$0;
	/** @type {!number} */
	var _m23$0;
	/** @type {!number} */
	var _m33$0;
	/** @type {!number} */
	var _m43$0;
	/** @type {!number} */
	var _m14$0;
	/** @type {!number} */
	var _m24$0;
	/** @type {!number} */
	var _m34$0;
	/** @type {!number} */
	var _m44$0;
	m11 = this._m11;
	m12 = this._m12;
	m13 = this._m13;
	m14 = this._m14;
	m21 = this._m21;
	m22 = this._m22;
	m23 = this._m23;
	m24 = this._m24;
	m31 = this._m31;
	m32 = this._m32;
	m33 = this._m33;
	m34 = this._m34;
	m41 = this._m41;
	m42 = this._m42;
	m43 = this._m43;
	m44 = this._m44;
	this._m11 = m11 * (_m11$0 = other._m11) + m12 * (_m21$0 = other._m21) + m13 * (_m31$0 = other._m31) + m14 * (_m41$0 = other._m41);
	this._m12 = m11 * (_m12$0 = other._m12) + m12 * (_m22$0 = other._m22) + m13 * (_m32$0 = other._m32) + m14 * (_m42$0 = other._m42);
	this._m13 = m11 * (_m13$0 = other._m13) + m12 * (_m23$0 = other._m23) + m13 * (_m33$0 = other._m33) + m14 * (_m43$0 = other._m43);
	this._m14 = m11 * (_m14$0 = other._m14) + m12 * (_m24$0 = other._m24) + m13 * (_m34$0 = other._m34) + m14 * (_m44$0 = other._m44);
	this._m21 = m21 * _m11$0 + m22 * _m21$0 + m23 * _m31$0 + m24 * _m41$0;
	this._m22 = m21 * _m12$0 + m22 * _m22$0 + m23 * _m32$0 + m24 * _m42$0;
	this._m23 = m21 * _m13$0 + m22 * _m23$0 + m23 * _m33$0 + m24 * _m43$0;
	this._m24 = m21 * _m14$0 + m22 * _m24$0 + m23 * _m34$0 + m24 * _m44$0;
	this._m31 = m31 * _m11$0 + m32 * _m21$0 + m33 * _m31$0 + m34 * _m41$0;
	this._m32 = m31 * _m12$0 + m32 * _m22$0 + m33 * _m32$0 + m34 * _m42$0;
	this._m33 = m31 * _m13$0 + m32 * _m23$0 + m33 * _m33$0 + m34 * _m43$0;
	this._m34 = m31 * _m14$0 + m32 * _m24$0 + m33 * _m34$0 + m34 * _m44$0;
	this._m41 = m41 * _m11$0 + m42 * _m21$0 + m43 * _m31$0 + m44 * _m41$0;
	this._m42 = m41 * _m12$0 + m42 * _m22$0 + m43 * _m32$0 + m44 * _m42$0;
	this._m43 = m41 * _m13$0 + m42 * _m23$0 + m43 * _m33$0 + m44 * _m43$0;
	this._m44 = m41 * _m14$0 + m42 * _m24$0 + m43 * _m34$0 + m44 * _m44$0;
	return this;
};

/**
 * @return {!string}
 */
Matrix.prototype.toString = function () {
	var $this = this;
	var fix;
	/** @type {!string} */
	var str;
	fix = (function (val) {
		/** @type {!string} */
		var str;
		/** @type {!number} */
		var len;
		/** @type {!number} */
		var i;
		str = val.toFixed(1);
		len = str.length;
		for (i = 0; i < 8 - len; i++) {
			str = ' ' + str;
		}
		return str;
	});
	str = '';
	str += '|' + fix(this._m11) + ',' + fix(this._m12) + ',' + fix(this._m13) + ',' + fix(this._m14) + '|\n';
	str += '|' + fix(this._m21) + ',' + fix(this._m22) + ',' + fix(this._m23) + ',' + fix(this._m24) + '|\n';
	str += '|' + fix(this._m31) + ',' + fix(this._m32) + ',' + fix(this._m33) + ',' + fix(this._m34) + '|\n';
	str += '|' + fix(this._m41) + ',' + fix(this._m42) + ',' + fix(this._m43) + ',' + fix(this._m44) + '|\n';
	return str;
};

/**
 * @return {Matrix}
 */
Matrix.prototype.invert$ = function () {
	/** @type {!number} */
	var i;
	/** @type {!number} */
	var j;
	/** @type {!number} */
	var k;
	/** @type {Array.<undefined|!number>} */
	var mat;
	/** @type {Array.<undefined|!number>} */
	var inv;
	/** @type {undefined|!number} */
	var e;
	/** @type {undefined|!number} */
	var s;
	/** @type {undefined|!number} */
	var t;
	mat = [ this._m11, this._m12, this._m13, this._m14, this._m21, this._m22, this._m23, this._m24, this._m31, this._m32, this._m33, this._m34, this._m41, this._m42, this._m43, this._m44 ];
	inv = [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ];
	for (i = 0; i < 3; i++) {
		e = mat[i * 4 + i];
		for (j = 0; j < 4; j++) {
			mat[i * 4 + j] = mat[i * 4 + j] / e;
			inv[i * 4 + j] = inv[i * 4 + j] / e;
		}
		for (j = i + 1; j < 4; j++) {
			s = mat[j * 4 + i];
			for (k = 0; k < 4; k++) {
				mat[j * 4 + k] -= mat[i * 4 + k] * s;
				inv[j * 4 + k] -= inv[i * 4 + k] * s;
			}
		}
	}
	for (i = 3; i > 0; i--) {
		for (j = i - 1; j >= 0; j--) {
			t = mat[j * 4 + i];
			for (k = 0; k < 4; k++) {
				mat[j * 4 + k] -= mat[i * 4 + k] * t;
				inv[j * 4 + k] -= inv[i * 4 + k] * t;
			}
		}
	}
	return new Matrix$AN(inv);
};

/**
 * class Quaternion extends Object
 * @constructor
 */
function Quaternion() {
}

Quaternion.prototype = new Object;
/**
 * @constructor
 * @param {!number} t
 * @param {Vector} v
 */
function Quaternion$NLVector$(t, v) {
	this.t = t;
	this.x = v.x;
	this.y = v.y;
	this.z = v.z;
};

Quaternion$NLVector$.prototype = new Quaternion;

/**
 * @constructor
 * @param {Vector} v
 */
function Quaternion$LVector$(v) {
	this.t = 0;
	this.x = v.x;
	this.y = v.y;
	this.z = v.z;
};

Quaternion$LVector$.prototype = new Quaternion;

/**
 * @constructor
 * @param {!number} t
 * @param {!number} x
 * @param {!number} y
 * @param {!number} z
 */
function Quaternion$NNNN(t, x, y, z) {
	this.t = t;
	this.x = x;
	this.y = y;
	this.z = z;
};

Quaternion$NNNN.prototype = new Quaternion;

/**
 * @return {Quaternion}
 */
Quaternion.prototype.copy$ = function () {
	return new Quaternion$NNNN(this.t, this.x, this.y, this.z);
};

/**
 * @param {Quaternion} other
 * @return {Quaternion}
 */
Quaternion.prototype.mul$LQuaternion$ = function (other) {
	/** @type {Quaternion} */
	var this$0;
	/** @type {!number} */
	var t$0;
	/** @type {!number} */
	var x$0;
	/** @type {!number} */
	var y$0;
	/** @type {!number} */
	var z$0;
	/** @type {!number} */
	var t$1;
	/** @type {!number} */
	var x$1;
	/** @type {!number} */
	var t$2;
	/** @type {!number} */
	var x$2;
	/** @type {!number} */
	var y$1;
	/** @type {!number} */
	var z$1;
	/** @type {!number} */
	var z$2;
	/** @type {!number} */
	var y$2;
	this$0 = new Quaternion$NNNN(this.t, this.x, this.y, this.z);
	t$0 = (t$1 = this$0.t) * (t$2 = other.t) - ((x$2 = this$0.x) * (x$1 = other.x) + (y$1 = this$0.y) * (y$2 = other.y) + (z$2 = this$0.z) * (z$1 = other.z));
	x$0 = t$1 * x$1 + t$2 * x$2 + (y$1 * z$1 - z$2 * y$2);
	y$0 = t$1 * y$2 + t$2 * y$1 + (z$2 * x$1 - x$2 * z$1);
	z$0 = t$1 * z$1 + t$2 * z$2 + (x$2 * y$2 - y$1 * x$1);
	this$0.t = t$0;
	this$0.x = x$0;
	this$0.y = y$0;
	this$0.z = z$0;
	return this$0;
};

/**
 * @param {Quaternion} other
 * @return {Quaternion}
 */
Quaternion.prototype.mulSelf$LQuaternion$ = function (other) {
	/** @type {Quaternion} */
	var a;
	/** @type {!number} */
	var t;
	/** @type {!number} */
	var x;
	/** @type {!number} */
	var y;
	/** @type {!number} */
	var z;
	/** @type {!number} */
	var t$0;
	/** @type {!number} */
	var x$0;
	/** @type {!number} */
	var t$1;
	/** @type {!number} */
	var x$1;
	/** @type {!number} */
	var y$0;
	/** @type {!number} */
	var z$0;
	/** @type {!number} */
	var z$1;
	/** @type {!number} */
	var y$1;
	a = this;
	t = (t$0 = a.t) * (t$1 = other.t) - ((x$1 = a.x) * (x$0 = other.x) + (y$0 = a.y) * (y$1 = other.y) + (z$1 = a.z) * (z$0 = other.z));
	x = t$0 * x$0 + t$1 * x$1 + (y$0 * z$0 - z$1 * y$1);
	y = t$0 * y$1 + t$1 * y$0 + (z$1 * x$0 - x$1 * z$0);
	z = t$0 * z$0 + t$1 * z$1 + (x$1 * y$1 - y$0 * x$0);
	this.t = t;
	this.x = x;
	this.y = y;
	this.z = z;
	return this;
};

/**
 * @return {Matrix}
 */
Quaternion.prototype.toMatrix$ = function () {
	/** @type {!number} */
	var x2;
	/** @type {!number} */
	var y2;
	/** @type {!number} */
	var z2;
	/** @type {!number} */
	var xy;
	/** @type {!number} */
	var zx;
	/** @type {!number} */
	var yz;
	/** @type {!number} */
	var xt;
	/** @type {!number} */
	var yt;
	/** @type {!number} */
	var zt;
	/** @type {!number} */
	var x$0;
	/** @type {!number} */
	var y$0;
	/** @type {!number} */
	var z$0;
	/** @type {!number} */
	var t$0;
	x2 = 2 * (x$0 = this.x) * x$0;
	y2 = 2 * (y$0 = this.y) * y$0;
	z2 = 2 * (z$0 = this.z) * z$0;
	xy = 2 * x$0 * y$0;
	zx = 2 * x$0 * z$0;
	yz = 2 * y$0 * z$0;
	xt = 2 * x$0 * (t$0 = this.t);
	yt = 2 * y$0 * t$0;
	zt = 2 * z$0 * t$0;
	return new Matrix$AN([ 1 - y2 - z2, xy + zt, zx - yt, 0, xy - zt, 1 - x2 - z2, yz + xt, 0, zx + yt, yz - xt, 1 - x2 - y2, 0, 0, 0, 0, 1 ]);
};

/**
 * @return {!string}
 */
Quaternion.prototype.toString = function () {
	/** @type {!string} */
	var x;
	/** @type {!string} */
	var y;
	/** @type {!string} */
	var z;
	/** @type {!string} */
	var t;
	x = this.x.toFixed(3);
	y = this.y.toFixed(3);
	z = this.z.toFixed(3);
	t = this.t.toFixed(3);
	return t + ' : (' + x + ', ' + y + ', ' + z + ', ' + ')';
};

/**
 * @param {!number} rad
 * @param {!number} x
 * @param {!number} y
 * @param {!number} z
 * @return {Quaternion}
 */
Quaternion.rotating$NNNN = function (rad, x, y, z) {
	/** @type {!number} */
	var cos;
	/** @type {!number} */
	var sin;
	cos = Math.cos(rad / 2);
	sin = Math.sin(rad / 2);
	return new Quaternion$NNNN(cos, x * sin, y * sin, z * sin);
};

var Quaternion$rotating$NNNN = Quaternion.rotating$NNNN;

/**
 * @param {!number} rad
 * @param {Vector} v
 * @return {Quaternion}
 */
Quaternion.rotating$NLVector$ = function (rad, v) {
	/** @type {!number} */
	var x$0;
	/** @type {!number} */
	var y$0;
	/** @type {!number} */
	var z$0;
	/** @type {!number} */
	var cos$0;
	/** @type {!number} */
	var sin$0;
	x$0 = v.x;
	y$0 = v.y;
	z$0 = v.z;
	cos$0 = Math.cos(rad / 2);
	sin$0 = Math.sin(rad / 2);
	return new Quaternion$NNNN(cos$0, x$0 * sin$0, y$0 * sin$0, z$0 * sin$0);
};

var Quaternion$rotating$NLVector$ = Quaternion.rotating$NLVector$;

/**
 * @param {Vector} src
 * @param {Vector} axis
 * @param {!number} rad
 * @return {Vector}
 */
Quaternion.rotate$LVector$LVector$N = function (src, axis, rad) {
	/** @type {!number} */
	var cos;
	/** @type {!number} */
	var sin;
	/** @type {!number} */
	var t$0;
	/** @type {!number} */
	var x$0;
	/** @type {!number} */
	var y$0;
	/** @type {!number} */
	var z$0;
	/** @type {!number} */
	var t$1;
	/** @type {!number} */
	var x$1;
	/** @type {!number} */
	var y$1;
	/** @type {!number} */
	var z$1;
	/** @type {!number} */
	var t$2;
	/** @type {!number} */
	var x$2;
	/** @type {!number} */
	var t$3;
	/** @type {!number} */
	var x$3;
	/** @type {!number} */
	var y$2;
	/** @type {!number} */
	var z$2;
	/** @type {!number} */
	var z$3;
	/** @type {!number} */
	var y$3;
	/** @type {!number} */
	var t$4;
	/** @type {!number} */
	var x$4;
	/** @type {!number} */
	var y$4;
	/** @type {!number} */
	var z$4;
	/** @type {!number} */
	var x$5;
	/** @type {!number} */
	var t$5;
	/** @type {!number} */
	var z$5;
	/** @type {!number} */
	var y$5;
	/** @type {!number} */
	var x$6;
	/** @type {!number} */
	var y$6;
	/** @type {!number} */
	var z$6;
	/** @type {!number} */
	var p$t$0;
	/** @type {!number} */
	var p$x$0;
	/** @type {!number} */
	var p$y$0;
	/** @type {!number} */
	var p$z$0;
	/** @type {!number} */
	var q$t$0;
	/** @type {!number} */
	var q$x$0;
	/** @type {!number} */
	var q$y$0;
	/** @type {!number} */
	var q$z$0;
	/** @type {!number} */
	var r$t$0;
	/** @type {!number} */
	var r$x$0;
	/** @type {!number} */
	var r$y$0;
	/** @type {!number} */
	var r$z$0;
	cos = Math.cos(rad / 2);
	sin = Math.sin(rad / 2);
	p$t$0 = 0;
	p$x$0 = src.x;
	p$y$0 = src.y;
	p$z$0 = src.z;
	q$t$0 = cos;
	q$x$0 = axis.x * sin;
	q$y$0 = axis.y * sin;
	q$z$0 = axis.z * sin;
	r$t$0 = cos;
	r$x$0 = - axis.x * sin;
	r$y$0 = - axis.y * sin;
	r$z$0 = - axis.z * sin;
	t$1 = (t$2 = r$t$0) * (t$3 = p$t$0) - ((x$3 = r$x$0) * (x$2 = p$x$0) + (y$2 = r$y$0) * (y$3 = p$y$0) + (z$3 = r$z$0) * (z$2 = p$z$0));
	x$1 = t$2 * x$2 + t$3 * x$3 + (y$2 * z$2 - z$3 * y$3);
	y$1 = t$2 * y$3 + t$3 * y$2 + (z$3 * x$2 - x$3 * z$2);
	z$1 = t$2 * z$2 + t$3 * z$3 + (x$3 * y$3 - y$2 * x$2);
	t$4 = r$t$0 = t$1;
	x$4 = r$x$0 = x$1;
	y$4 = r$y$0 = y$1;
	z$4 = r$z$0 = z$1;
	t$0 = t$4 * (t$5 = q$t$0) - (x$4 * (x$5 = q$x$0) + y$4 * (y$5 = q$y$0) + z$4 * (z$5 = q$z$0));
	x$0 = t$4 * x$5 + t$5 * x$4 + (y$4 * z$5 - z$4 * y$5);
	y$0 = t$4 * y$5 + t$5 * y$4 + (z$4 * x$5 - x$4 * z$5);
	z$0 = t$4 * z$5 + t$5 * z$4 + (x$4 * y$5 - y$4 * x$5);
	r$t$0 = t$0;
	x$6 = r$x$0 = x$0;
	y$6 = r$y$0 = y$0;
	z$6 = r$z$0 = z$0;
	return new Vector$NNN(x$6, y$6, z$6);
};

var Quaternion$rotate$LVector$LVector$N = Quaternion.rotate$LVector$LVector$N;

/**
 * class Engine extends Object
 * @constructor
 */
function Engine() {
}

Engine.prototype = new Object;
/**
 * @constructor
 * @param {!string} canvasId
 */
function Engine$S(canvasId) {
	/** @type {!string} */
	var userAgent;
	/** @type {HTMLCanvasElement} */
	var canvas;
	/** @type {Vector} */
	var viewPosition;
	/** @type {Vector} */
	var targetPosition;
	/** @type {Vector} */
	var upperVector;
	/** @type {!number} */
	var aspectRatio;
	/** @type {!number} */
	var width$0;
	/** @type {!number} */
	var height$0;
	/** @type {Matrix} */
	var this$0$0;
	/** @type {!number} */
	var m11$0$0;
	/** @type {!number} */
	var m12$0$0;
	/** @type {!number} */
	var m13$0$0;
	/** @type {!number} */
	var m14$0$0;
	/** @type {!number} */
	var m21$0$0;
	/** @type {!number} */
	var m22$0$0;
	/** @type {!number} */
	var m23$0$0;
	/** @type {!number} */
	var m24$0$0;
	/** @type {!number} */
	var m31$0$0;
	/** @type {!number} */
	var m32$0$0;
	/** @type {!number} */
	var m33$0$0;
	/** @type {!number} */
	var m34$0$0;
	/** @type {!number} */
	var m41$0$0;
	/** @type {!number} */
	var m42$0$0;
	/** @type {!number} */
	var m43$0$0;
	/** @type {!number} */
	var m44$0$0;
	/** @type {!number} */
	var x$0$0;
	/** @type {!number} */
	var y$0$0;
	/** @type {!number} */
	var x$1$0;
	/** @type {!number} */
	var y$1$0;
	/** @type {Camera} */
	var this$0$1;
	/** @type {Vector} */
	var view$0$0;
	/** @type {Vector} */
	var target$0$0;
	/** @type {Vector} */
	var upper$0$0;
	/** @type {!number} */
	var fovyX$0$0;
	/** @type {!number} */
	var nearZ$0$0;
	/** @type {!number} */
	var farZ$0$0;
	/** @type {!number} */
	var aspectRatio$0$0;
	/** @type {Matrix} */
	var viewMatrix$0$0;
	/** @type {Matrix} */
	var projectionMatrix$0$0;
	/** @type {Vector} */
	var zaxis$0$0$0;
	/** @type {Vector} */
	var xaxis$0$0$0;
	/** @type {Vector} */
	var yaxis$0$0$0;
	/** @type {Vector} */
	var this$0$0$0$0;
	/** @type {!number} */
	var length$0$0$0$0;
	/** @type {Vector} */
	var this$1$0$0$0;
	/** @type {!number} */
	var length$1$0$0$0;
	/** @type {Vector} */
	var this$2$0$0$0;
	/** @type {!number} */
	var length$2$0$0$0;
	/** @type {!number} */
	var sx$0$0$0;
	/** @type {!number} */
	var sy$0$0$0;
	/** @type {!number} */
	var sz$0$0$0;
	/** @type {!number} */
	var mz$0$0$0;
	/** @type {!number} */
	var m11$0$0$0;
	/** @type {!number} */
	var m12$0$0$0;
	/** @type {!number} */
	var m13$0$0$0;
	/** @type {!number} */
	var m14$0$0$0;
	/** @type {!number} */
	var m21$0$0$0;
	/** @type {!number} */
	var m22$0$0$0;
	/** @type {!number} */
	var m23$0$0$0;
	/** @type {!number} */
	var m24$0$0$0;
	/** @type {!number} */
	var m31$0$0$0;
	/** @type {!number} */
	var m32$0$0$0;
	/** @type {!number} */
	var m33$0$0$0;
	/** @type {!number} */
	var m34$0$0$0;
	/** @type {!number} */
	var m41$0$0$0;
	/** @type {!number} */
	var m42$0$0$0;
	/** @type {!number} */
	var m43$0$0$0;
	/** @type {!number} */
	var m44$0$0$0;
	/** @type {!number} */
	var _width$0;
	/** @type {!number} */
	var _height$0;
	/** @type {!number} */
	var _m11$0;
	/** @type {!number} */
	var _m21$0;
	/** @type {!number} */
	var _m31$0;
	/** @type {!number} */
	var _m41$0;
	/** @type {!number} */
	var _m12$0;
	/** @type {!number} */
	var _m22$0;
	/** @type {!number} */
	var _m32$0;
	/** @type {!number} */
	var _m42$0;
	/** @type {!number} */
	var _m13$0;
	/** @type {!number} */
	var _m23$0;
	/** @type {!number} */
	var _m33$0;
	/** @type {!number} */
	var _m43$0;
	/** @type {!number} */
	var _m14$0;
	/** @type {!number} */
	var _m24$0;
	/** @type {!number} */
	var _m34$0;
	/** @type {!number} */
	var _m44$0;
	/** @type {Camera} */
	var camera$0;
	/** @type {!number} */
	var x$0;
	/** @type {!number} */
	var y$0;
	/** @type {!number} */
	var z$0;
	/** @type {!number} */
	var z$1;
	/** @type {!number} */
	var z$2;
	/** @type {!number} */
	var x$1;
	/** @type {!number} */
	var y$1;
	/** @type {!number} */
	var y$2;
	/** @type {!number} */
	var x$2;
	/** @type {!number} */
	var x$3;
	/** @type {!number} */
	var y$3;
	/** @type {!number} */
	var z$3;
	/** @type {!number} */
	var z$4;
	/** @type {!number} */
	var z$5;
	/** @type {!number} */
	var x$4;
	/** @type {!number} */
	var y$4;
	/** @type {!number} */
	var y$5;
	/** @type {!number} */
	var x$5;
	/** @type {!number} */
	var x$6;
	/** @type {!number} */
	var y$6;
	/** @type {!number} */
	var z$6;
	/** @type {!number} */
	var x$7;
	/** @type {!number} */
	var y$7;
	/** @type {!number} */
	var z$7;
	/** @type {!number} */
	var x$8;
	/** @type {!number} */
	var x$9;
	/** @type {!number} */
	var y$8;
	/** @type {!number} */
	var y$9;
	/** @type {!number} */
	var z$8;
	/** @type {!number} */
	var z$9;
	/** @type {!number} */
	var x$10;
	/** @type {!number} */
	var y$10;
	/** @type {!number} */
	var z$10;
	/** @type {!number} */
	var _m11$1;
	/** @type {!number} */
	var _m12$1;
	/** @type {!number} */
	var _m13$1;
	/** @type {!number} */
	var _m14$1;
	/** @type {!number} */
	var _m11$2;
	/** @type {!number} */
	var _m21$1;
	/** @type {!number} */
	var _m31$1;
	/** @type {!number} */
	var _m41$1;
	/** @type {!number} */
	var _m21$2;
	/** @type {!number} */
	var _m12$2;
	/** @type {!number} */
	var _m22$1;
	/** @type {!number} */
	var _m22$2;
	/** @type {!number} */
	var _m23$1;
	/** @type {!number} */
	var _m32$1;
	/** @type {!number} */
	var _m24$1;
	/** @type {!number} */
	var _m42$1;
	/** @type {!number} */
	var _m13$2;
	/** @type {!number} */
	var _m23$2;
	/** @type {!number} */
	var _m33$1;
	/** @type {!number} */
	var _m43$1;
	/** @type {!number} */
	var _m14$2;
	/** @type {!number} */
	var _m24$2;
	/** @type {!number} */
	var _m34$1;
	/** @type {!number} */
	var _m44$1;
	/** @type {!number} */
	var _m31$2;
	/** @type {!number} */
	var _m32$2;
	/** @type {!number} */
	var _m33$2;
	/** @type {!number} */
	var _m34$2;
	/** @type {!number} */
	var _m41$2;
	/** @type {!number} */
	var _m42$2;
	/** @type {!number} */
	var _m43$2;
	/** @type {!number} */
	var _m44$2;
	/** @type {!number} */
	var other$0$0$_m11$0;
	/** @type {!number} */
	var other$0$0$_m12$0;
	/** @type {!number} */
	var other$0$0$_m13$0;
	/** @type {!number} */
	var other$0$0$_m14$0;
	/** @type {!number} */
	var other$0$0$_m21$0;
	/** @type {!number} */
	var other$0$0$_m22$0;
	/** @type {!number} */
	var other$0$0$_m23$0;
	/** @type {!number} */
	var other$0$0$_m24$0;
	/** @type {!number} */
	var other$0$0$_m31$0;
	/** @type {!number} */
	var other$0$0$_m32$0;
	/** @type {!number} */
	var other$0$0$_m33$0;
	/** @type {!number} */
	var other$0$0$_m34$0;
	/** @type {!number} */
	var other$0$0$_m41$0;
	/** @type {!number} */
	var other$0$0$_m42$0;
	/** @type {!number} */
	var other$0$0$_m43$0;
	/** @type {!number} */
	var other$0$0$_m44$0;
	this.camera = null;
	this.screenMatrix = null;
	this.onUpdate = null;
	this.onRender = null;
	this._skyImageSrc = null;
	this._skyImage = null;
	this._isRunning = false;
	userAgent = dom.window.navigator.userAgent;
	this._isMobile = /iPhone/.test(userAgent) || /Android/.test(userAgent) || /iPad/.test(userAgent);
	canvas = (function (o) { return o instanceof HTMLCanvasElement ? o : null; })((function (o) { return o instanceof HTMLElement ? o : null; })(dom.document.getElementById(canvasId)));
	this.context = (function (o) { return o instanceof CanvasRenderingContext2D ? o : null; })(canvas.getContext('2d'));
	_width$0 = this._width = canvas.width;
	_height$0 = this._height = canvas.height;
	width$0 = _width$0;
	height$0 = _height$0;
	x$0$0 = width$0 / 2;
	y$0$0 = height$0 / 2;
	this$0$0 = new Matrix$AN([ 1, 0, 0, x$0$0, 0, 1, 0, y$0$0, 0, 0, 1, 0, 0, 0, 0, 1 ]);
	x$1$0 = width$0 / 2;
	y$1$0 = - height$0 / 2;
	other$0$0$_m11$0 = [ x$1$0, 0, 0, 0, 0, y$1$0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ][0];
	other$0$0$_m12$0 = [ x$1$0, 0, 0, 0, 0, y$1$0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ][1];
	other$0$0$_m13$0 = [ x$1$0, 0, 0, 0, 0, y$1$0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ][2];
	other$0$0$_m14$0 = [ x$1$0, 0, 0, 0, 0, y$1$0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ][3];
	other$0$0$_m21$0 = [ x$1$0, 0, 0, 0, 0, y$1$0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ][4];
	other$0$0$_m22$0 = [ x$1$0, 0, 0, 0, 0, y$1$0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ][5];
	other$0$0$_m23$0 = [ x$1$0, 0, 0, 0, 0, y$1$0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ][6];
	other$0$0$_m24$0 = [ x$1$0, 0, 0, 0, 0, y$1$0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ][7];
	other$0$0$_m31$0 = [ x$1$0, 0, 0, 0, 0, y$1$0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ][8];
	other$0$0$_m32$0 = [ x$1$0, 0, 0, 0, 0, y$1$0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ][9];
	other$0$0$_m33$0 = [ x$1$0, 0, 0, 0, 0, y$1$0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ][10];
	other$0$0$_m34$0 = [ x$1$0, 0, 0, 0, 0, y$1$0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ][11];
	other$0$0$_m41$0 = [ x$1$0, 0, 0, 0, 0, y$1$0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ][12];
	other$0$0$_m42$0 = [ x$1$0, 0, 0, 0, 0, y$1$0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ][13];
	other$0$0$_m43$0 = [ x$1$0, 0, 0, 0, 0, y$1$0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ][14];
	other$0$0$_m44$0 = [ x$1$0, 0, 0, 0, 0, y$1$0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ][15];
	m11$0$0 = this$0$0._m11;
	m12$0$0 = this$0$0._m12;
	m13$0$0 = this$0$0._m13;
	m14$0$0 = this$0$0._m14;
	m21$0$0 = this$0$0._m21;
	m22$0$0 = this$0$0._m22;
	m23$0$0 = this$0$0._m23;
	m24$0$0 = this$0$0._m24;
	m31$0$0 = this$0$0._m31;
	m32$0$0 = this$0$0._m32;
	m33$0$0 = this$0$0._m33;
	m34$0$0 = this$0$0._m34;
	m41$0$0 = this$0$0._m41;
	m42$0$0 = this$0$0._m42;
	m43$0$0 = this$0$0._m43;
	m44$0$0 = this$0$0._m44;
	this$0$0._m11 = m11$0$0 * (_m11$0 = other$0$0$_m11$0) + m12$0$0 * (_m21$0 = other$0$0$_m21$0) + m13$0$0 * (_m31$0 = other$0$0$_m31$0) + m14$0$0 * (_m41$0 = other$0$0$_m41$0);
	this$0$0._m12 = m11$0$0 * (_m12$0 = other$0$0$_m12$0) + m12$0$0 * (_m22$0 = other$0$0$_m22$0) + m13$0$0 * (_m32$0 = other$0$0$_m32$0) + m14$0$0 * (_m42$0 = other$0$0$_m42$0);
	this$0$0._m13 = m11$0$0 * (_m13$0 = other$0$0$_m13$0) + m12$0$0 * (_m23$0 = other$0$0$_m23$0) + m13$0$0 * (_m33$0 = other$0$0$_m33$0) + m14$0$0 * (_m43$0 = other$0$0$_m43$0);
	this$0$0._m14 = m11$0$0 * (_m14$0 = other$0$0$_m14$0) + m12$0$0 * (_m24$0 = other$0$0$_m24$0) + m13$0$0 * (_m34$0 = other$0$0$_m34$0) + m14$0$0 * (_m44$0 = other$0$0$_m44$0);
	this$0$0._m21 = m21$0$0 * _m11$0 + m22$0$0 * _m21$0 + m23$0$0 * _m31$0 + m24$0$0 * _m41$0;
	this$0$0._m22 = m21$0$0 * _m12$0 + m22$0$0 * _m22$0 + m23$0$0 * _m32$0 + m24$0$0 * _m42$0;
	this$0$0._m23 = m21$0$0 * _m13$0 + m22$0$0 * _m23$0 + m23$0$0 * _m33$0 + m24$0$0 * _m43$0;
	this$0$0._m24 = m21$0$0 * _m14$0 + m22$0$0 * _m24$0 + m23$0$0 * _m34$0 + m24$0$0 * _m44$0;
	this$0$0._m31 = m31$0$0 * _m11$0 + m32$0$0 * _m21$0 + m33$0$0 * _m31$0 + m34$0$0 * _m41$0;
	this$0$0._m32 = m31$0$0 * _m12$0 + m32$0$0 * _m22$0 + m33$0$0 * _m32$0 + m34$0$0 * _m42$0;
	this$0$0._m33 = m31$0$0 * _m13$0 + m32$0$0 * _m23$0 + m33$0$0 * _m33$0 + m34$0$0 * _m43$0;
	this$0$0._m34 = m31$0$0 * _m14$0 + m32$0$0 * _m24$0 + m33$0$0 * _m34$0 + m34$0$0 * _m44$0;
	this$0$0._m41 = m41$0$0 * _m11$0 + m42$0$0 * _m21$0 + m43$0$0 * _m31$0 + m44$0$0 * _m41$0;
	this$0$0._m42 = m41$0$0 * _m12$0 + m42$0$0 * _m22$0 + m43$0$0 * _m32$0 + m44$0$0 * _m42$0;
	this$0$0._m43 = m41$0$0 * _m13$0 + m42$0$0 * _m23$0 + m43$0$0 * _m33$0 + m44$0$0 * _m43$0;
	this$0$0._m44 = m41$0$0 * _m14$0 + m42$0$0 * _m24$0 + m43$0$0 * _m34$0 + m44$0$0 * _m44$0;
	this.screenMatrix = this$0$0;
	this._skyImageSrc = null;
	this._skyImage = null;
	this._isRunning = false;
	viewPosition = new Vector$NNN(0, 0, -90);
	targetPosition = new Vector$NNN(0, 0, 0);
	upperVector = new Vector$NNN(0, 1, 0);
	aspectRatio = this._height / this._width;
	camera$0 = this.camera = new Camera$LVector$LVector$LVector$NNNN(viewPosition, targetPosition, upperVector, 1.0471975511965976, 0, 500, aspectRatio);
	this$0$1 = camera$0;
	view$0$0 = this$0$1.view;
	target$0$0 = this$0$1.target;
	upper$0$0 = this$0$1.upper;
	fovyX$0$0 = this$0$1.fovyX;
	nearZ$0$0 = this$0$1.nearZ;
	farZ$0$0 = this$0$1.farZ;
	aspectRatio$0$0 = this$0$1.aspectRatio;
	this$0$0$0$0 = new Vector$NNN(target$0$0.x - view$0$0.x, target$0$0.y - view$0$0.y, target$0$0.z - view$0$0.z);
	length$0$0$0$0 = Math.sqrt((x$0 = this$0$0$0$0.x) * x$0 + (y$0 = this$0$0$0$0.y) * y$0 + (z$0 = this$0$0$0$0.z) * z$0);
	zaxis$0$0$0 = (length$0$0$0$0 < 1e-9 ? new Vector$NNN(0, 0, 0) : this$0$0$0$0.divSelf$N(length$0$0$0$0));
	this$1$0$0$0 = new Vector$NNN((y$2 = upper$0$0.y) * (z$2 = zaxis$0$0$0.z) - (z$1 = upper$0$0.z) * (y$1 = zaxis$0$0$0.y), z$1 * (x$2 = zaxis$0$0$0.x) - (x$1 = upper$0$0.x) * z$2, x$1 * y$1 - y$2 * x$2);
	length$1$0$0$0 = Math.sqrt((x$3 = this$1$0$0$0.x) * x$3 + (y$3 = this$1$0$0$0.y) * y$3 + (z$3 = this$1$0$0$0.z) * z$3);
	xaxis$0$0$0 = (length$1$0$0$0 < 1e-9 ? new Vector$NNN(0, 0, 0) : this$1$0$0$0.divSelf$N(length$1$0$0$0));
	this$2$0$0$0 = new Vector$NNN((y$5 = zaxis$0$0$0.y) * (z$5 = xaxis$0$0$0.z) - (z$4 = zaxis$0$0$0.z) * (y$4 = xaxis$0$0$0.y), z$4 * (x$5 = xaxis$0$0$0.x) - (x$4 = zaxis$0$0$0.x) * z$5, x$4 * y$4 - y$5 * x$5);
	length$2$0$0$0 = Math.sqrt((x$6 = this$2$0$0$0.x) * x$6 + (y$6 = this$2$0$0$0.y) * y$6 + (z$6 = this$2$0$0$0.z) * z$6);
	yaxis$0$0$0 = (length$2$0$0$0 < 1e-9 ? new Vector$NNN(0, 0, 0) : this$2$0$0$0.divSelf$N(length$2$0$0$0));
	viewMatrix$0$0 = new Matrix$AN([ x$7 = xaxis$0$0$0.x, y$7 = xaxis$0$0$0.y, z$7 = xaxis$0$0$0.z, - (x$7 * (x$9 = view$0$0.x) + y$7 * (y$9 = view$0$0.y) + z$7 * (z$9 = view$0$0.z)), x$8 = yaxis$0$0$0.x, y$8 = yaxis$0$0$0.y, z$8 = yaxis$0$0$0.z, - (x$8 * x$9 + y$8 * y$9 + z$8 * z$9), x$10 = zaxis$0$0$0.x, y$10 = zaxis$0$0$0.y, z$10 = zaxis$0$0$0.z, - (x$10 * x$9 + y$10 * y$9 + z$10 * z$9), 0, 0, 0, 1 ]);
	sx$0$0$0 = 1 / Math.tan(fovyX$0$0 / 2);
	sy$0$0$0 = sx$0$0$0 / aspectRatio$0$0;
	sz$0$0$0 = farZ$0$0 / (farZ$0$0 - nearZ$0$0);
	mz$0$0$0 = - sz$0$0$0 * nearZ$0$0;
	projectionMatrix$0$0 = new Matrix$AN([ sx$0$0$0, 0, 0, 0, 0, sy$0$0$0, 0, 0, 0, 0, sz$0$0$0, mz$0$0$0, 0, 0, 1, 0 ]);
	this$0$1.viewMatrix = viewMatrix$0$0;
	this$0$1.projectionMatrix = projectionMatrix$0$0;
	m11$0$0$0 = (_m11$1 = projectionMatrix$0$0._m11) * (_m11$2 = viewMatrix$0$0._m11) + (_m12$1 = projectionMatrix$0$0._m12) * (_m21$1 = viewMatrix$0$0._m21) + (_m13$1 = projectionMatrix$0$0._m13) * (_m31$1 = viewMatrix$0$0._m31) + (_m14$1 = projectionMatrix$0$0._m14) * (_m41$1 = viewMatrix$0$0._m41);
	m12$0$0$0 = _m11$1 * (_m12$2 = viewMatrix$0$0._m12) + _m12$1 * (_m22$2 = viewMatrix$0$0._m22) + _m13$1 * (_m32$1 = viewMatrix$0$0._m32) + _m14$1 * (_m42$1 = viewMatrix$0$0._m42);
	m13$0$0$0 = _m11$1 * (_m13$2 = viewMatrix$0$0._m13) + _m12$1 * (_m23$2 = viewMatrix$0$0._m23) + _m13$1 * (_m33$1 = viewMatrix$0$0._m33) + _m14$1 * (_m43$1 = viewMatrix$0$0._m43);
	m14$0$0$0 = _m11$1 * (_m14$2 = viewMatrix$0$0._m14) + _m12$1 * (_m24$2 = viewMatrix$0$0._m24) + _m13$1 * (_m34$1 = viewMatrix$0$0._m34) + _m14$1 * (_m44$1 = viewMatrix$0$0._m44);
	m21$0$0$0 = (_m21$2 = projectionMatrix$0$0._m21) * _m11$2 + (_m22$1 = projectionMatrix$0$0._m22) * _m21$1 + (_m23$1 = projectionMatrix$0$0._m23) * _m31$1 + (_m24$1 = projectionMatrix$0$0._m24) * _m41$1;
	m22$0$0$0 = _m21$2 * _m12$2 + _m22$1 * _m22$2 + _m23$1 * _m32$1 + _m24$1 * _m42$1;
	m23$0$0$0 = _m21$2 * _m13$2 + _m22$1 * _m23$2 + _m23$1 * _m33$1 + _m24$1 * _m43$1;
	m24$0$0$0 = _m21$2 * _m14$2 + _m22$1 * _m24$2 + _m23$1 * _m34$1 + _m24$1 * _m44$1;
	m31$0$0$0 = (_m31$2 = projectionMatrix$0$0._m31) * _m11$2 + (_m32$2 = projectionMatrix$0$0._m32) * _m21$1 + (_m33$2 = projectionMatrix$0$0._m33) * _m31$1 + (_m34$2 = projectionMatrix$0$0._m34) * _m41$1;
	m32$0$0$0 = _m31$2 * _m12$2 + _m32$2 * _m22$2 + _m33$2 * _m32$1 + _m34$2 * _m42$1;
	m33$0$0$0 = _m31$2 * _m13$2 + _m32$2 * _m23$2 + _m33$2 * _m33$1 + _m34$2 * _m43$1;
	m34$0$0$0 = _m31$2 * _m14$2 + _m32$2 * _m24$2 + _m33$2 * _m34$1 + _m34$2 * _m44$1;
	m41$0$0$0 = (_m41$2 = projectionMatrix$0$0._m41) * _m11$2 + (_m42$2 = projectionMatrix$0$0._m42) * _m21$1 + (_m43$2 = projectionMatrix$0$0._m43) * _m31$1 + (_m44$2 = projectionMatrix$0$0._m44) * _m41$1;
	m42$0$0$0 = _m41$2 * _m12$2 + _m42$2 * _m22$2 + _m43$2 * _m32$1 + _m44$2 * _m42$1;
	m43$0$0$0 = _m41$2 * _m13$2 + _m42$2 * _m23$2 + _m43$2 * _m33$1 + _m44$2 * _m43$1;
	m44$0$0$0 = _m41$2 * _m14$2 + _m42$2 * _m24$2 + _m43$2 * _m34$1 + _m44$2 * _m44$1;
	this$0$1.matrix = new Matrix$AN([ m11$0$0$0, m12$0$0$0, m13$0$0$0, m14$0$0$0, m21$0$0$0, m22$0$0$0, m23$0$0$0, m24$0$0$0, m31$0$0$0, m32$0$0$0, m33$0$0$0, m34$0$0$0, m41$0$0$0, m42$0$0$0, m43$0$0$0, m44$0$0$0 ]);
};

Engine$S.prototype = new Engine;

/**
 * @return {!boolean}
 */
Engine.prototype.isMobile$ = function () {
	return this._isMobile;
};

/**
 * @param {Array.<undefined|!string>} srcs
 */
Engine.loadImages$AS = function (srcs) {
	/** @type {HTMLCanvasElement} */
	var canvas;
	/** @type {CanvasRenderingContext2D} */
	var context;
	var setOnload;
	/** @type {!number} */
	var i;
	/** @type {undefined|!string} */
	var src;
	/** @type {HTMLImageElement} */
	var image;
	canvas = (function (o) { return o instanceof HTMLCanvasElement ? o : null; })(dom.document.createElement('canvas'));
	context = (function (o) { return o instanceof CanvasRenderingContext2D ? o : null; })(canvas.getContext('2d'));
	setOnload = (function (src) {
		Engine.images[src].onload = (function (e) {
			/** @type {HTMLImageElement} */
			var image;
			image = Engine.images[src];
			Engine.isLoadedImage[src] = true;
			context.drawImage(image, 0, 0);
			Engine.imageDatas[src] = context.getImageData(0, 0, image.width, image.height);
		});
	});
	for (i = 0; i < srcs.length; i++) {
		src = srcs[i];
		image = (function (o) { return o instanceof HTMLImageElement ? o : null; })(dom.document.createElement('img'));
		image.src = src;
		Engine.isLoadedImage[src] = false;
		Engine.images[src] = image;
		setOnload(src);
	}
};

var Engine$loadImages$AS = Engine.loadImages$AS;

/**
 * @param {!string} src
 */
Engine.prototype.setSkyImage$S = function (src) {
	this._skyImageSrc = src;
	this._skyImage = Engine.images[src];
};

/**
 */
Engine.prototype.start$ = function () {
	var $this = this;
	/** @type {FpsManager} */
	var fpsManager;
	var update;
	fpsManager = new FpsManager$();
	fpsManager.setEnabledHtmlLog$B(true);
	Stopwatch$start$LStopwatch$(fpsManager._stopwatch);
	this._isRunning = true;
	update = (function () {
		/** @type {!number} */
		var lap;
		/** @type {Context3D} */
		var context;
		fpsManager.update$();
		lap = fpsManager._lastMsec;
		$this.onUpdate(lap);
		context = {_worldMatrix: new Matrix$(), _matrixStack: new List$Matrix$E$(), camera: $this.camera, _depth: 3, modelList1: new List$Renderable$E$(), modelList2: new List$Renderable$E$(), modelList3: new List$Renderable$E$(), modelList4: new List$Renderable$E$(), modelList5: new List$Renderable$E$(), _polygonList: null, _groupCenter: null, _ignoringZHidden: false, backgroundColor: new Color$III(90, 135, 158)};
		if ($this._skyImage && Engine.isLoadedImage[$this._skyImageSrc]) {
			$this.context.fillStyle = '#' + context.backgroundColor.toHexString$();
			$this.context.fillRect(0, 0, $this._width, $this._height);
			$this.renderSkyImage$();
		} else {
			$this.context.fillStyle = '#' + context.backgroundColor.toHexString$();
			$this.context.fillRect(0, 0, $this._width, $this._height);
		}
		$this.onRender(context, lap);
		context.modelList5.forEach$F$LRenderable$V$((function (model) {
			model.draw$LEngine$($this);
		}));
		context.modelList4.forEach$F$LRenderable$V$((function (model) {
			model.draw$LEngine$($this);
		}));
		context.modelList3.forEach$F$LRenderable$V$((function (model) {
			model.draw$LEngine$($this);
		}));
		context.modelList2.forEach$F$LRenderable$V$((function (model) {
			model.draw$LEngine$($this);
		}));
		context.modelList1.forEach$F$LRenderable$V$((function (model) {
			model.draw$LEngine$($this);
		}));
		if ($this._isRunning) {
			js.global.setTimeout(update, 0);
		}
	});
	js.global.setTimeout((function () {
		dom.window.scrollTo(0, 1);
	}), 500);
	js.global.setTimeout(update, 0);
};

/**
 */
Engine.prototype.stop$ = function () {
	this._isRunning = false;
};

/**
 */
Engine.prototype.renderSkyImage$ = function () {
	/** @type {!number} */
	var x;
	/** @type {!number} */
	var y;
	/** @type {!number} */
	var z;
	/** @type {!number} */
	var horRad;
	/** @type {!number} */
	var verRad;
	/** @type {!number} */
	var imgWidth;
	/** @type {!number} */
	var imgHeight;
	/** @type {!number} */
	var iCenterX;
	/** @type {!number} */
	var iCenterY;
	/** @type {!number} */
	var iWidth;
	/** @type {!number} */
	var iHeight;
	/** @type {!number} */
	var sx;
	/** @type {!number} */
	var sy;
	/** @type {!number} */
	var sw;
	/** @type {!number} */
	var sh;
	/** @type {!boolean} */
	var overflowingRight;
	/** @type {!boolean} */
	var overflowingBelow;
	/** @type {!number} */
	var perHor;
	/** @type {!number} */
	var perVer;
	/** @type {!number} */
	var per;
	/** @type {Vector} */
	var this$0;
	/** @type {Vector} */
	var other$0;
	/** @type {Camera} */
	var camera$0;
	/** @type {HTMLImageElement} */
	var _skyImage$0;
	/** @type {Camera} */
	var camera$1;
	/** @type {!number} */
	var _width$0;
	/** @type {!number} */
	var _width$1;
	/** @type {!number} */
	var lookingVec$x$0;
	/** @type {!number} */
	var lookingVec$y$0;
	/** @type {!number} */
	var lookingVec$z$0;
	/** @type {!number} */
	var lookingVec$w$0;
	this$0 = (camera$0 = this.camera).target;
	other$0 = camera$0.view;
	lookingVec$x$0 = this$0.x - other$0.x;
	lookingVec$y$0 = this$0.y - other$0.y;
	lookingVec$z$0 = this$0.z - other$0.z;
	lookingVec$w$0 = 1;
	x = lookingVec$x$0;
	y = - lookingVec$y$0;
	z = lookingVec$z$0;
	horRad = Math.atan2(x, z);
	verRad = Math.atan2(y, Math.sqrt(x * x + z * z));
	imgWidth = (_skyImage$0 = this._skyImage).width;
	imgHeight = _skyImage$0.height;
	iCenterX = (horRad / 3.141592653589793 / 2 + 0.5) * imgWidth;
	iCenterY = (verRad / 3.141592653589793 + 0.5) * imgHeight;
	iWidth = (camera$1 = this.camera).fovyX / 3.141592653589793 / 2 * imgWidth;
	iHeight = iWidth * camera$1.aspectRatio;
	sx = iCenterX - iWidth / 2;
	sy = iCenterY - iHeight / 2;
	if (sx < 0) {
		sx += imgWidth;
	}
	if (sy < 0) {
		sy += imgHeight;
	}
	sw = iWidth;
	sh = iHeight;
	overflowingRight = sx + iWidth >= imgWidth;
	overflowingBelow = sy + iHeight >= imgHeight;
	if (overflowingRight && overflowingBelow) {
		perHor = (imgWidth - sx) / sw;
		perVer = (imgHeight - sy) / sh;
		this.context.drawImage(this._skyImage, ~ ~ sx, ~ ~ sy, ~ ~ (imgWidth - sx), ~ ~ (imgHeight - sy), 0, 0, ~ ~ (this._width * perHor), ~ ~ (this._height * perVer));
		if (~ ~ (sx + sw - imgWidth) !== 0) {
			this.context.drawImage(this._skyImage, 0, ~ ~ sy, ~ ~ (sx + sw - imgWidth), ~ ~ (imgHeight - sy), ~ ~ ((_width$0 = this._width) * perHor), 0, ~ ~ (_width$0 * (1 - perHor)), ~ ~ (this._height * perVer));
		}
	} else {
		if (overflowingRight) {
			per = (imgWidth - sx) / sw;
			if (~ ~ (imgWidth - sx) !== 0 && ~ ~ (this._width * per) !== 0) {
				this.context.drawImage(this._skyImage, ~ ~ sx, ~ ~ sy, ~ ~ (imgWidth - sx), ~ ~ sh, 0, 0, ~ ~ (this._width * per), this._height);
			}
			if (~ ~ (sx + sw - imgWidth) !== 0 && ~ ~ (this._width * (1 - per)) !== 0) {
				this.context.drawImage(this._skyImage, 0, ~ ~ sy, ~ ~ (sx + sw - imgWidth), ~ ~ sh, ~ ~ ((_width$1 = this._width) * per), 0, ~ ~ (_width$1 * (1 - per)), this._height);
			}
		} else {
			if (overflowingBelow) {
				per = (imgHeight - sy) / sh;
				this.context.drawImage(this._skyImage, ~ ~ sx, ~ ~ sy, ~ ~ sw, ~ ~ (imgHeight - sy), 0, 0, this._width, ~ ~ (this._height * per));
			} else {
				this.context.drawImage(this._skyImage, ~ ~ sx, ~ ~ sy, ~ ~ sw, ~ ~ sh, 0, 0, this._width, this._height);
			}
		}
	}
};

/**
 * @param {!number} width
 * @param {!number} height
 */
Engine.prototype.setScreenSize$NN = function (width, height) {
	/** @type {Matrix} */
	var this$0;
	/** @type {!number} */
	var m11$0;
	/** @type {!number} */
	var m12$0;
	/** @type {!number} */
	var m13$0;
	/** @type {!number} */
	var m14$0;
	/** @type {!number} */
	var m21$0;
	/** @type {!number} */
	var m22$0;
	/** @type {!number} */
	var m23$0;
	/** @type {!number} */
	var m24$0;
	/** @type {!number} */
	var m31$0;
	/** @type {!number} */
	var m32$0;
	/** @type {!number} */
	var m33$0;
	/** @type {!number} */
	var m34$0;
	/** @type {!number} */
	var m41$0;
	/** @type {!number} */
	var m42$0;
	/** @type {!number} */
	var m43$0;
	/** @type {!number} */
	var m44$0;
	/** @type {!number} */
	var x$0;
	/** @type {!number} */
	var y$0;
	/** @type {!number} */
	var x$1;
	/** @type {!number} */
	var y$1;
	/** @type {!number} */
	var _m11$0;
	/** @type {!number} */
	var _m21$0;
	/** @type {!number} */
	var _m31$0;
	/** @type {!number} */
	var _m41$0;
	/** @type {!number} */
	var _m12$0;
	/** @type {!number} */
	var _m22$0;
	/** @type {!number} */
	var _m32$0;
	/** @type {!number} */
	var _m42$0;
	/** @type {!number} */
	var _m13$0;
	/** @type {!number} */
	var _m23$0;
	/** @type {!number} */
	var _m33$0;
	/** @type {!number} */
	var _m43$0;
	/** @type {!number} */
	var _m14$0;
	/** @type {!number} */
	var _m24$0;
	/** @type {!number} */
	var _m34$0;
	/** @type {!number} */
	var _m44$0;
	/** @type {!number} */
	var other$0$_m11$0;
	/** @type {!number} */
	var other$0$_m12$0;
	/** @type {!number} */
	var other$0$_m13$0;
	/** @type {!number} */
	var other$0$_m14$0;
	/** @type {!number} */
	var other$0$_m21$0;
	/** @type {!number} */
	var other$0$_m22$0;
	/** @type {!number} */
	var other$0$_m23$0;
	/** @type {!number} */
	var other$0$_m24$0;
	/** @type {!number} */
	var other$0$_m31$0;
	/** @type {!number} */
	var other$0$_m32$0;
	/** @type {!number} */
	var other$0$_m33$0;
	/** @type {!number} */
	var other$0$_m34$0;
	/** @type {!number} */
	var other$0$_m41$0;
	/** @type {!number} */
	var other$0$_m42$0;
	/** @type {!number} */
	var other$0$_m43$0;
	/** @type {!number} */
	var other$0$_m44$0;
	x$0 = width / 2;
	y$0 = height / 2;
	this$0 = new Matrix$AN([ 1, 0, 0, x$0, 0, 1, 0, y$0, 0, 0, 1, 0, 0, 0, 0, 1 ]);
	x$1 = width / 2;
	y$1 = - height / 2;
	other$0$_m11$0 = [ x$1, 0, 0, 0, 0, y$1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ][0];
	other$0$_m12$0 = [ x$1, 0, 0, 0, 0, y$1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ][1];
	other$0$_m13$0 = [ x$1, 0, 0, 0, 0, y$1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ][2];
	other$0$_m14$0 = [ x$1, 0, 0, 0, 0, y$1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ][3];
	other$0$_m21$0 = [ x$1, 0, 0, 0, 0, y$1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ][4];
	other$0$_m22$0 = [ x$1, 0, 0, 0, 0, y$1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ][5];
	other$0$_m23$0 = [ x$1, 0, 0, 0, 0, y$1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ][6];
	other$0$_m24$0 = [ x$1, 0, 0, 0, 0, y$1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ][7];
	other$0$_m31$0 = [ x$1, 0, 0, 0, 0, y$1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ][8];
	other$0$_m32$0 = [ x$1, 0, 0, 0, 0, y$1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ][9];
	other$0$_m33$0 = [ x$1, 0, 0, 0, 0, y$1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ][10];
	other$0$_m34$0 = [ x$1, 0, 0, 0, 0, y$1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ][11];
	other$0$_m41$0 = [ x$1, 0, 0, 0, 0, y$1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ][12];
	other$0$_m42$0 = [ x$1, 0, 0, 0, 0, y$1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ][13];
	other$0$_m43$0 = [ x$1, 0, 0, 0, 0, y$1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ][14];
	other$0$_m44$0 = [ x$1, 0, 0, 0, 0, y$1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ][15];
	m11$0 = this$0._m11;
	m12$0 = this$0._m12;
	m13$0 = this$0._m13;
	m14$0 = this$0._m14;
	m21$0 = this$0._m21;
	m22$0 = this$0._m22;
	m23$0 = this$0._m23;
	m24$0 = this$0._m24;
	m31$0 = this$0._m31;
	m32$0 = this$0._m32;
	m33$0 = this$0._m33;
	m34$0 = this$0._m34;
	m41$0 = this$0._m41;
	m42$0 = this$0._m42;
	m43$0 = this$0._m43;
	m44$0 = this$0._m44;
	this$0._m11 = m11$0 * (_m11$0 = other$0$_m11$0) + m12$0 * (_m21$0 = other$0$_m21$0) + m13$0 * (_m31$0 = other$0$_m31$0) + m14$0 * (_m41$0 = other$0$_m41$0);
	this$0._m12 = m11$0 * (_m12$0 = other$0$_m12$0) + m12$0 * (_m22$0 = other$0$_m22$0) + m13$0 * (_m32$0 = other$0$_m32$0) + m14$0 * (_m42$0 = other$0$_m42$0);
	this$0._m13 = m11$0 * (_m13$0 = other$0$_m13$0) + m12$0 * (_m23$0 = other$0$_m23$0) + m13$0 * (_m33$0 = other$0$_m33$0) + m14$0 * (_m43$0 = other$0$_m43$0);
	this$0._m14 = m11$0 * (_m14$0 = other$0$_m14$0) + m12$0 * (_m24$0 = other$0$_m24$0) + m13$0 * (_m34$0 = other$0$_m34$0) + m14$0 * (_m44$0 = other$0$_m44$0);
	this$0._m21 = m21$0 * _m11$0 + m22$0 * _m21$0 + m23$0 * _m31$0 + m24$0 * _m41$0;
	this$0._m22 = m21$0 * _m12$0 + m22$0 * _m22$0 + m23$0 * _m32$0 + m24$0 * _m42$0;
	this$0._m23 = m21$0 * _m13$0 + m22$0 * _m23$0 + m23$0 * _m33$0 + m24$0 * _m43$0;
	this$0._m24 = m21$0 * _m14$0 + m22$0 * _m24$0 + m23$0 * _m34$0 + m24$0 * _m44$0;
	this$0._m31 = m31$0 * _m11$0 + m32$0 * _m21$0 + m33$0 * _m31$0 + m34$0 * _m41$0;
	this$0._m32 = m31$0 * _m12$0 + m32$0 * _m22$0 + m33$0 * _m32$0 + m34$0 * _m42$0;
	this$0._m33 = m31$0 * _m13$0 + m32$0 * _m23$0 + m33$0 * _m33$0 + m34$0 * _m43$0;
	this$0._m34 = m31$0 * _m14$0 + m32$0 * _m24$0 + m33$0 * _m34$0 + m34$0 * _m44$0;
	this$0._m41 = m41$0 * _m11$0 + m42$0 * _m21$0 + m43$0 * _m31$0 + m44$0 * _m41$0;
	this$0._m42 = m41$0 * _m12$0 + m42$0 * _m22$0 + m43$0 * _m32$0 + m44$0 * _m42$0;
	this$0._m43 = m41$0 * _m13$0 + m42$0 * _m23$0 + m43$0 * _m33$0 + m44$0 * _m43$0;
	this$0._m44 = m41$0 * _m14$0 + m42$0 * _m24$0 + m43$0 * _m34$0 + m44$0 * _m44$0;
	this.screenMatrix = this$0;
};

/**
 */
Engine.prototype.updateMatrix$ = function () {
	/** @type {Camera} */
	var this$0;
	/** @type {Vector} */
	var view$0;
	/** @type {Vector} */
	var target$0;
	/** @type {Vector} */
	var upper$0;
	/** @type {!number} */
	var fovyX$0;
	/** @type {!number} */
	var nearZ$0;
	/** @type {!number} */
	var farZ$0;
	/** @type {!number} */
	var aspectRatio$0;
	/** @type {Matrix} */
	var viewMatrix$0;
	/** @type {Matrix} */
	var projectionMatrix$0;
	/** @type {Vector} */
	var zaxis$0$0;
	/** @type {Vector} */
	var xaxis$0$0;
	/** @type {Vector} */
	var yaxis$0$0;
	/** @type {Vector} */
	var this$0$0$0;
	/** @type {!number} */
	var length$0$0$0;
	/** @type {Vector} */
	var this$1$0$0;
	/** @type {!number} */
	var length$1$0$0;
	/** @type {Vector} */
	var this$2$0$0;
	/** @type {!number} */
	var length$2$0$0;
	/** @type {!number} */
	var sx$0$0;
	/** @type {!number} */
	var sy$0$0;
	/** @type {!number} */
	var sz$0$0;
	/** @type {!number} */
	var mz$0$0;
	/** @type {!number} */
	var m11$0$0;
	/** @type {!number} */
	var m12$0$0;
	/** @type {!number} */
	var m13$0$0;
	/** @type {!number} */
	var m14$0$0;
	/** @type {!number} */
	var m21$0$0;
	/** @type {!number} */
	var m22$0$0;
	/** @type {!number} */
	var m23$0$0;
	/** @type {!number} */
	var m24$0$0;
	/** @type {!number} */
	var m31$0$0;
	/** @type {!number} */
	var m32$0$0;
	/** @type {!number} */
	var m33$0$0;
	/** @type {!number} */
	var m34$0$0;
	/** @type {!number} */
	var m41$0$0;
	/** @type {!number} */
	var m42$0$0;
	/** @type {!number} */
	var m43$0$0;
	/** @type {!number} */
	var m44$0$0;
	/** @type {!number} */
	var x$0;
	/** @type {!number} */
	var y$0;
	/** @type {!number} */
	var z$0;
	/** @type {!number} */
	var z$1;
	/** @type {!number} */
	var z$2;
	/** @type {!number} */
	var x$1;
	/** @type {!number} */
	var y$1;
	/** @type {!number} */
	var y$2;
	/** @type {!number} */
	var x$2;
	/** @type {!number} */
	var x$3;
	/** @type {!number} */
	var y$3;
	/** @type {!number} */
	var z$3;
	/** @type {!number} */
	var z$4;
	/** @type {!number} */
	var z$5;
	/** @type {!number} */
	var x$4;
	/** @type {!number} */
	var y$4;
	/** @type {!number} */
	var y$5;
	/** @type {!number} */
	var x$5;
	/** @type {!number} */
	var x$6;
	/** @type {!number} */
	var y$6;
	/** @type {!number} */
	var z$6;
	/** @type {!number} */
	var x$7;
	/** @type {!number} */
	var y$7;
	/** @type {!number} */
	var z$7;
	/** @type {!number} */
	var x$8;
	/** @type {!number} */
	var x$9;
	/** @type {!number} */
	var y$8;
	/** @type {!number} */
	var y$9;
	/** @type {!number} */
	var z$8;
	/** @type {!number} */
	var z$9;
	/** @type {!number} */
	var x$10;
	/** @type {!number} */
	var y$10;
	/** @type {!number} */
	var z$10;
	/** @type {!number} */
	var _m11$0;
	/** @type {!number} */
	var _m12$0;
	/** @type {!number} */
	var _m13$0;
	/** @type {!number} */
	var _m14$0;
	/** @type {!number} */
	var _m11$1;
	/** @type {!number} */
	var _m21$0;
	/** @type {!number} */
	var _m31$0;
	/** @type {!number} */
	var _m41$0;
	/** @type {!number} */
	var _m21$1;
	/** @type {!number} */
	var _m12$1;
	/** @type {!number} */
	var _m22$0;
	/** @type {!number} */
	var _m22$1;
	/** @type {!number} */
	var _m23$0;
	/** @type {!number} */
	var _m32$0;
	/** @type {!number} */
	var _m24$0;
	/** @type {!number} */
	var _m42$0;
	/** @type {!number} */
	var _m13$1;
	/** @type {!number} */
	var _m23$1;
	/** @type {!number} */
	var _m33$0;
	/** @type {!number} */
	var _m43$0;
	/** @type {!number} */
	var _m14$1;
	/** @type {!number} */
	var _m24$1;
	/** @type {!number} */
	var _m34$0;
	/** @type {!number} */
	var _m44$0;
	/** @type {!number} */
	var _m31$1;
	/** @type {!number} */
	var _m32$1;
	/** @type {!number} */
	var _m33$1;
	/** @type {!number} */
	var _m34$1;
	/** @type {!number} */
	var _m41$1;
	/** @type {!number} */
	var _m42$1;
	/** @type {!number} */
	var _m43$1;
	/** @type {!number} */
	var _m44$1;
	this$0 = this.camera;
	view$0 = this$0.view;
	target$0 = this$0.target;
	upper$0 = this$0.upper;
	fovyX$0 = this$0.fovyX;
	nearZ$0 = this$0.nearZ;
	farZ$0 = this$0.farZ;
	aspectRatio$0 = this$0.aspectRatio;
	this$0$0$0 = new Vector$NNN(target$0.x - view$0.x, target$0.y - view$0.y, target$0.z - view$0.z);
	length$0$0$0 = Math.sqrt((x$0 = this$0$0$0.x) * x$0 + (y$0 = this$0$0$0.y) * y$0 + (z$0 = this$0$0$0.z) * z$0);
	zaxis$0$0 = (length$0$0$0 < 1e-9 ? new Vector$NNN(0, 0, 0) : this$0$0$0.divSelf$N(length$0$0$0));
	this$1$0$0 = new Vector$NNN((y$2 = upper$0.y) * (z$2 = zaxis$0$0.z) - (z$1 = upper$0.z) * (y$1 = zaxis$0$0.y), z$1 * (x$2 = zaxis$0$0.x) - (x$1 = upper$0.x) * z$2, x$1 * y$1 - y$2 * x$2);
	length$1$0$0 = Math.sqrt((x$3 = this$1$0$0.x) * x$3 + (y$3 = this$1$0$0.y) * y$3 + (z$3 = this$1$0$0.z) * z$3);
	xaxis$0$0 = (length$1$0$0 < 1e-9 ? new Vector$NNN(0, 0, 0) : this$1$0$0.divSelf$N(length$1$0$0));
	this$2$0$0 = new Vector$NNN((y$5 = zaxis$0$0.y) * (z$5 = xaxis$0$0.z) - (z$4 = zaxis$0$0.z) * (y$4 = xaxis$0$0.y), z$4 * (x$5 = xaxis$0$0.x) - (x$4 = zaxis$0$0.x) * z$5, x$4 * y$4 - y$5 * x$5);
	length$2$0$0 = Math.sqrt((x$6 = this$2$0$0.x) * x$6 + (y$6 = this$2$0$0.y) * y$6 + (z$6 = this$2$0$0.z) * z$6);
	yaxis$0$0 = (length$2$0$0 < 1e-9 ? new Vector$NNN(0, 0, 0) : this$2$0$0.divSelf$N(length$2$0$0));
	viewMatrix$0 = new Matrix$AN([ x$7 = xaxis$0$0.x, y$7 = xaxis$0$0.y, z$7 = xaxis$0$0.z, - (x$7 * (x$9 = view$0.x) + y$7 * (y$9 = view$0.y) + z$7 * (z$9 = view$0.z)), x$8 = yaxis$0$0.x, y$8 = yaxis$0$0.y, z$8 = yaxis$0$0.z, - (x$8 * x$9 + y$8 * y$9 + z$8 * z$9), x$10 = zaxis$0$0.x, y$10 = zaxis$0$0.y, z$10 = zaxis$0$0.z, - (x$10 * x$9 + y$10 * y$9 + z$10 * z$9), 0, 0, 0, 1 ]);
	sx$0$0 = 1 / Math.tan(fovyX$0 / 2);
	sy$0$0 = sx$0$0 / aspectRatio$0;
	sz$0$0 = farZ$0 / (farZ$0 - nearZ$0);
	mz$0$0 = - sz$0$0 * nearZ$0;
	projectionMatrix$0 = new Matrix$AN([ sx$0$0, 0, 0, 0, 0, sy$0$0, 0, 0, 0, 0, sz$0$0, mz$0$0, 0, 0, 1, 0 ]);
	this$0.viewMatrix = viewMatrix$0;
	this$0.projectionMatrix = projectionMatrix$0;
	m11$0$0 = (_m11$0 = projectionMatrix$0._m11) * (_m11$1 = viewMatrix$0._m11) + (_m12$0 = projectionMatrix$0._m12) * (_m21$0 = viewMatrix$0._m21) + (_m13$0 = projectionMatrix$0._m13) * (_m31$0 = viewMatrix$0._m31) + (_m14$0 = projectionMatrix$0._m14) * (_m41$0 = viewMatrix$0._m41);
	m12$0$0 = _m11$0 * (_m12$1 = viewMatrix$0._m12) + _m12$0 * (_m22$1 = viewMatrix$0._m22) + _m13$0 * (_m32$0 = viewMatrix$0._m32) + _m14$0 * (_m42$0 = viewMatrix$0._m42);
	m13$0$0 = _m11$0 * (_m13$1 = viewMatrix$0._m13) + _m12$0 * (_m23$1 = viewMatrix$0._m23) + _m13$0 * (_m33$0 = viewMatrix$0._m33) + _m14$0 * (_m43$0 = viewMatrix$0._m43);
	m14$0$0 = _m11$0 * (_m14$1 = viewMatrix$0._m14) + _m12$0 * (_m24$1 = viewMatrix$0._m24) + _m13$0 * (_m34$0 = viewMatrix$0._m34) + _m14$0 * (_m44$0 = viewMatrix$0._m44);
	m21$0$0 = (_m21$1 = projectionMatrix$0._m21) * _m11$1 + (_m22$0 = projectionMatrix$0._m22) * _m21$0 + (_m23$0 = projectionMatrix$0._m23) * _m31$0 + (_m24$0 = projectionMatrix$0._m24) * _m41$0;
	m22$0$0 = _m21$1 * _m12$1 + _m22$0 * _m22$1 + _m23$0 * _m32$0 + _m24$0 * _m42$0;
	m23$0$0 = _m21$1 * _m13$1 + _m22$0 * _m23$1 + _m23$0 * _m33$0 + _m24$0 * _m43$0;
	m24$0$0 = _m21$1 * _m14$1 + _m22$0 * _m24$1 + _m23$0 * _m34$0 + _m24$0 * _m44$0;
	m31$0$0 = (_m31$1 = projectionMatrix$0._m31) * _m11$1 + (_m32$1 = projectionMatrix$0._m32) * _m21$0 + (_m33$1 = projectionMatrix$0._m33) * _m31$0 + (_m34$1 = projectionMatrix$0._m34) * _m41$0;
	m32$0$0 = _m31$1 * _m12$1 + _m32$1 * _m22$1 + _m33$1 * _m32$0 + _m34$1 * _m42$0;
	m33$0$0 = _m31$1 * _m13$1 + _m32$1 * _m23$1 + _m33$1 * _m33$0 + _m34$1 * _m43$0;
	m34$0$0 = _m31$1 * _m14$1 + _m32$1 * _m24$1 + _m33$1 * _m34$0 + _m34$1 * _m44$0;
	m41$0$0 = (_m41$1 = projectionMatrix$0._m41) * _m11$1 + (_m42$1 = projectionMatrix$0._m42) * _m21$0 + (_m43$1 = projectionMatrix$0._m43) * _m31$0 + (_m44$1 = projectionMatrix$0._m44) * _m41$0;
	m42$0$0 = _m41$1 * _m12$1 + _m42$1 * _m22$1 + _m43$1 * _m32$0 + _m44$1 * _m42$0;
	m43$0$0 = _m41$1 * _m13$1 + _m42$1 * _m23$1 + _m43$1 * _m33$0 + _m44$1 * _m43$0;
	m44$0$0 = _m41$1 * _m14$1 + _m42$1 * _m24$1 + _m43$1 * _m34$0 + _m44$1 * _m44$0;
	this$0.matrix = new Matrix$AN([ m11$0$0, m12$0$0, m13$0$0, m14$0$0, m21$0$0, m22$0$0, m23$0$0, m24$0$0, m31$0$0, m32$0$0, m33$0$0, m34$0$0, m41$0$0, m42$0$0, m43$0$0, m44$0$0 ]);
};

/**
 * class Context3D extends Object
 * @constructor
 */
function Context3D() {
}

Context3D.prototype = new Object;
/**
 * @constructor
 * @param {Camera} camera
 */
function Context3D$LCamera$(camera) {
	this._polygonList = null;
	this._groupCenter = null;
	this._ignoringZHidden = false;
	this._worldMatrix = new Matrix$();
	this._matrixStack = new List$Matrix$E$();
	this.camera = camera;
	this._depth = 3;
	this.modelList1 = new List$Renderable$E$();
	this.modelList2 = new List$Renderable$E$();
	this.modelList3 = new List$Renderable$E$();
	this.modelList4 = new List$Renderable$E$();
	this.modelList5 = new List$Renderable$E$();
	this.backgroundColor = new Color$III(90, 135, 158);
};

Context3D$LCamera$.prototype = new Context3D;

/**
 * @param {Context3D} $this
 * @param {!number} depth
 */
Context3D.setDepth$LContext3D$I = function ($this, depth) {
	if (! (1 <= depth && depth <= 5)) {
		debugger;
		throw new Error("[jsx/engine.jsx:274] assertion failure");
	}
	$this._depth = depth;
};

var Context3D$setDepth$LContext3D$I = Context3D.setDepth$LContext3D$I;

/**
 * @param {Context3D} $this
 * @return {!number}
 */
Context3D.getDepth$LContext3D$ = function ($this) {
	return $this._depth;
};

var Context3D$getDepth$LContext3D$ = Context3D.getDepth$LContext3D$;

/**
 * @param {Context3D} $this
 * @param {Color} color
 */
Context3D.setBackgroundColor$LContext3D$LColor$ = function ($this, color) {
	$this.backgroundColor = color;
};

var Context3D$setBackgroundColor$LContext3D$LColor$ = Context3D.setBackgroundColor$LContext3D$LColor$;

/**
 * @param {Context3D} $this
 */
Context3D.pushMatrix$LContext3D$ = function ($this) {
	$this._matrixStack.prepend$LMatrix$($this._worldMatrix.copy$());
};

var Context3D$pushMatrix$LContext3D$ = Context3D.pushMatrix$LContext3D$;

/**
 * @param {Context3D} $this
 */
Context3D.popMatrix$LContext3D$ = function ($this) {
	$this._worldMatrix = $this._matrixStack.removeFirst$();
};

var Context3D$popMatrix$LContext3D$ = Context3D.popMatrix$LContext3D$;

/**
 * @param {Context3D} $this
 */
Context3D.resetMatrix$LContext3D$ = function ($this) {
	$this._worldMatrix = new Matrix$();
};

var Context3D$resetMatrix$LContext3D$ = Context3D.resetMatrix$LContext3D$;

/**
 * @param {Context3D} $this
 * @param {!number} x
 * @param {!number} y
 * @param {!number} z
 */
Context3D.translate$LContext3D$NNN = function ($this, x, y, z) {
	/** @type {Matrix} */
	var this$0;
	/** @type {!number} */
	var m11$0;
	/** @type {!number} */
	var m12$0;
	/** @type {!number} */
	var m13$0;
	/** @type {!number} */
	var m14$0;
	/** @type {!number} */
	var m21$0;
	/** @type {!number} */
	var m22$0;
	/** @type {!number} */
	var m23$0;
	/** @type {!number} */
	var m24$0;
	/** @type {!number} */
	var m31$0;
	/** @type {!number} */
	var m32$0;
	/** @type {!number} */
	var m33$0;
	/** @type {!number} */
	var m34$0;
	/** @type {!number} */
	var m41$0;
	/** @type {!number} */
	var m42$0;
	/** @type {!number} */
	var m43$0;
	/** @type {!number} */
	var m44$0;
	/** @type {!number} */
	var _m11$0;
	/** @type {!number} */
	var _m21$0;
	/** @type {!number} */
	var _m31$0;
	/** @type {!number} */
	var _m41$0;
	/** @type {!number} */
	var _m12$0;
	/** @type {!number} */
	var _m22$0;
	/** @type {!number} */
	var _m32$0;
	/** @type {!number} */
	var _m42$0;
	/** @type {!number} */
	var _m13$0;
	/** @type {!number} */
	var _m23$0;
	/** @type {!number} */
	var _m33$0;
	/** @type {!number} */
	var _m43$0;
	/** @type {!number} */
	var _m14$0;
	/** @type {!number} */
	var _m24$0;
	/** @type {!number} */
	var _m34$0;
	/** @type {!number} */
	var _m44$0;
	/** @type {!number} */
	var other$0$_m11$0;
	/** @type {!number} */
	var other$0$_m12$0;
	/** @type {!number} */
	var other$0$_m13$0;
	/** @type {!number} */
	var other$0$_m14$0;
	/** @type {!number} */
	var other$0$_m21$0;
	/** @type {!number} */
	var other$0$_m22$0;
	/** @type {!number} */
	var other$0$_m23$0;
	/** @type {!number} */
	var other$0$_m24$0;
	/** @type {!number} */
	var other$0$_m31$0;
	/** @type {!number} */
	var other$0$_m32$0;
	/** @type {!number} */
	var other$0$_m33$0;
	/** @type {!number} */
	var other$0$_m34$0;
	/** @type {!number} */
	var other$0$_m41$0;
	/** @type {!number} */
	var other$0$_m42$0;
	/** @type {!number} */
	var other$0$_m43$0;
	/** @type {!number} */
	var other$0$_m44$0;
	this$0 = $this._worldMatrix;
	other$0$_m11$0 = [ 1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1 ][0];
	other$0$_m12$0 = [ 1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1 ][1];
	other$0$_m13$0 = [ 1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1 ][2];
	other$0$_m14$0 = [ 1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1 ][3];
	other$0$_m21$0 = [ 1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1 ][4];
	other$0$_m22$0 = [ 1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1 ][5];
	other$0$_m23$0 = [ 1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1 ][6];
	other$0$_m24$0 = [ 1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1 ][7];
	other$0$_m31$0 = [ 1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1 ][8];
	other$0$_m32$0 = [ 1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1 ][9];
	other$0$_m33$0 = [ 1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1 ][10];
	other$0$_m34$0 = [ 1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1 ][11];
	other$0$_m41$0 = [ 1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1 ][12];
	other$0$_m42$0 = [ 1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1 ][13];
	other$0$_m43$0 = [ 1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1 ][14];
	other$0$_m44$0 = [ 1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1 ][15];
	m11$0 = this$0._m11;
	m12$0 = this$0._m12;
	m13$0 = this$0._m13;
	m14$0 = this$0._m14;
	m21$0 = this$0._m21;
	m22$0 = this$0._m22;
	m23$0 = this$0._m23;
	m24$0 = this$0._m24;
	m31$0 = this$0._m31;
	m32$0 = this$0._m32;
	m33$0 = this$0._m33;
	m34$0 = this$0._m34;
	m41$0 = this$0._m41;
	m42$0 = this$0._m42;
	m43$0 = this$0._m43;
	m44$0 = this$0._m44;
	this$0._m11 = m11$0 * (_m11$0 = other$0$_m11$0) + m12$0 * (_m21$0 = other$0$_m21$0) + m13$0 * (_m31$0 = other$0$_m31$0) + m14$0 * (_m41$0 = other$0$_m41$0);
	this$0._m12 = m11$0 * (_m12$0 = other$0$_m12$0) + m12$0 * (_m22$0 = other$0$_m22$0) + m13$0 * (_m32$0 = other$0$_m32$0) + m14$0 * (_m42$0 = other$0$_m42$0);
	this$0._m13 = m11$0 * (_m13$0 = other$0$_m13$0) + m12$0 * (_m23$0 = other$0$_m23$0) + m13$0 * (_m33$0 = other$0$_m33$0) + m14$0 * (_m43$0 = other$0$_m43$0);
	this$0._m14 = m11$0 * (_m14$0 = other$0$_m14$0) + m12$0 * (_m24$0 = other$0$_m24$0) + m13$0 * (_m34$0 = other$0$_m34$0) + m14$0 * (_m44$0 = other$0$_m44$0);
	this$0._m21 = m21$0 * _m11$0 + m22$0 * _m21$0 + m23$0 * _m31$0 + m24$0 * _m41$0;
	this$0._m22 = m21$0 * _m12$0 + m22$0 * _m22$0 + m23$0 * _m32$0 + m24$0 * _m42$0;
	this$0._m23 = m21$0 * _m13$0 + m22$0 * _m23$0 + m23$0 * _m33$0 + m24$0 * _m43$0;
	this$0._m24 = m21$0 * _m14$0 + m22$0 * _m24$0 + m23$0 * _m34$0 + m24$0 * _m44$0;
	this$0._m31 = m31$0 * _m11$0 + m32$0 * _m21$0 + m33$0 * _m31$0 + m34$0 * _m41$0;
	this$0._m32 = m31$0 * _m12$0 + m32$0 * _m22$0 + m33$0 * _m32$0 + m34$0 * _m42$0;
	this$0._m33 = m31$0 * _m13$0 + m32$0 * _m23$0 + m33$0 * _m33$0 + m34$0 * _m43$0;
	this$0._m34 = m31$0 * _m14$0 + m32$0 * _m24$0 + m33$0 * _m34$0 + m34$0 * _m44$0;
	this$0._m41 = m41$0 * _m11$0 + m42$0 * _m21$0 + m43$0 * _m31$0 + m44$0 * _m41$0;
	this$0._m42 = m41$0 * _m12$0 + m42$0 * _m22$0 + m43$0 * _m32$0 + m44$0 * _m42$0;
	this$0._m43 = m41$0 * _m13$0 + m42$0 * _m23$0 + m43$0 * _m33$0 + m44$0 * _m43$0;
	this$0._m44 = m41$0 * _m14$0 + m42$0 * _m24$0 + m43$0 * _m34$0 + m44$0 * _m44$0;
};

var Context3D$translate$LContext3D$NNN = Context3D.translate$LContext3D$NNN;

/**
 * @param {Context3D} $this
 * @param {!number} x
 * @param {!number} y
 * @param {!number} z
 */
Context3D.scale$LContext3D$NNN = function ($this, x, y, z) {
	/** @type {Matrix} */
	var this$0;
	/** @type {!number} */
	var m11$0;
	/** @type {!number} */
	var m12$0;
	/** @type {!number} */
	var m13$0;
	/** @type {!number} */
	var m14$0;
	/** @type {!number} */
	var m21$0;
	/** @type {!number} */
	var m22$0;
	/** @type {!number} */
	var m23$0;
	/** @type {!number} */
	var m24$0;
	/** @type {!number} */
	var m31$0;
	/** @type {!number} */
	var m32$0;
	/** @type {!number} */
	var m33$0;
	/** @type {!number} */
	var m34$0;
	/** @type {!number} */
	var m41$0;
	/** @type {!number} */
	var m42$0;
	/** @type {!number} */
	var m43$0;
	/** @type {!number} */
	var m44$0;
	/** @type {!number} */
	var _m11$0;
	/** @type {!number} */
	var _m21$0;
	/** @type {!number} */
	var _m31$0;
	/** @type {!number} */
	var _m41$0;
	/** @type {!number} */
	var _m12$0;
	/** @type {!number} */
	var _m22$0;
	/** @type {!number} */
	var _m32$0;
	/** @type {!number} */
	var _m42$0;
	/** @type {!number} */
	var _m13$0;
	/** @type {!number} */
	var _m23$0;
	/** @type {!number} */
	var _m33$0;
	/** @type {!number} */
	var _m43$0;
	/** @type {!number} */
	var _m14$0;
	/** @type {!number} */
	var _m24$0;
	/** @type {!number} */
	var _m34$0;
	/** @type {!number} */
	var _m44$0;
	/** @type {!number} */
	var other$0$_m11$0;
	/** @type {!number} */
	var other$0$_m12$0;
	/** @type {!number} */
	var other$0$_m13$0;
	/** @type {!number} */
	var other$0$_m14$0;
	/** @type {!number} */
	var other$0$_m21$0;
	/** @type {!number} */
	var other$0$_m22$0;
	/** @type {!number} */
	var other$0$_m23$0;
	/** @type {!number} */
	var other$0$_m24$0;
	/** @type {!number} */
	var other$0$_m31$0;
	/** @type {!number} */
	var other$0$_m32$0;
	/** @type {!number} */
	var other$0$_m33$0;
	/** @type {!number} */
	var other$0$_m34$0;
	/** @type {!number} */
	var other$0$_m41$0;
	/** @type {!number} */
	var other$0$_m42$0;
	/** @type {!number} */
	var other$0$_m43$0;
	/** @type {!number} */
	var other$0$_m44$0;
	this$0 = $this._worldMatrix;
	other$0$_m11$0 = [ x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1 ][0];
	other$0$_m12$0 = [ x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1 ][1];
	other$0$_m13$0 = [ x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1 ][2];
	other$0$_m14$0 = [ x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1 ][3];
	other$0$_m21$0 = [ x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1 ][4];
	other$0$_m22$0 = [ x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1 ][5];
	other$0$_m23$0 = [ x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1 ][6];
	other$0$_m24$0 = [ x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1 ][7];
	other$0$_m31$0 = [ x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1 ][8];
	other$0$_m32$0 = [ x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1 ][9];
	other$0$_m33$0 = [ x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1 ][10];
	other$0$_m34$0 = [ x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1 ][11];
	other$0$_m41$0 = [ x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1 ][12];
	other$0$_m42$0 = [ x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1 ][13];
	other$0$_m43$0 = [ x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1 ][14];
	other$0$_m44$0 = [ x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1 ][15];
	m11$0 = this$0._m11;
	m12$0 = this$0._m12;
	m13$0 = this$0._m13;
	m14$0 = this$0._m14;
	m21$0 = this$0._m21;
	m22$0 = this$0._m22;
	m23$0 = this$0._m23;
	m24$0 = this$0._m24;
	m31$0 = this$0._m31;
	m32$0 = this$0._m32;
	m33$0 = this$0._m33;
	m34$0 = this$0._m34;
	m41$0 = this$0._m41;
	m42$0 = this$0._m42;
	m43$0 = this$0._m43;
	m44$0 = this$0._m44;
	this$0._m11 = m11$0 * (_m11$0 = other$0$_m11$0) + m12$0 * (_m21$0 = other$0$_m21$0) + m13$0 * (_m31$0 = other$0$_m31$0) + m14$0 * (_m41$0 = other$0$_m41$0);
	this$0._m12 = m11$0 * (_m12$0 = other$0$_m12$0) + m12$0 * (_m22$0 = other$0$_m22$0) + m13$0 * (_m32$0 = other$0$_m32$0) + m14$0 * (_m42$0 = other$0$_m42$0);
	this$0._m13 = m11$0 * (_m13$0 = other$0$_m13$0) + m12$0 * (_m23$0 = other$0$_m23$0) + m13$0 * (_m33$0 = other$0$_m33$0) + m14$0 * (_m43$0 = other$0$_m43$0);
	this$0._m14 = m11$0 * (_m14$0 = other$0$_m14$0) + m12$0 * (_m24$0 = other$0$_m24$0) + m13$0 * (_m34$0 = other$0$_m34$0) + m14$0 * (_m44$0 = other$0$_m44$0);
	this$0._m21 = m21$0 * _m11$0 + m22$0 * _m21$0 + m23$0 * _m31$0 + m24$0 * _m41$0;
	this$0._m22 = m21$0 * _m12$0 + m22$0 * _m22$0 + m23$0 * _m32$0 + m24$0 * _m42$0;
	this$0._m23 = m21$0 * _m13$0 + m22$0 * _m23$0 + m23$0 * _m33$0 + m24$0 * _m43$0;
	this$0._m24 = m21$0 * _m14$0 + m22$0 * _m24$0 + m23$0 * _m34$0 + m24$0 * _m44$0;
	this$0._m31 = m31$0 * _m11$0 + m32$0 * _m21$0 + m33$0 * _m31$0 + m34$0 * _m41$0;
	this$0._m32 = m31$0 * _m12$0 + m32$0 * _m22$0 + m33$0 * _m32$0 + m34$0 * _m42$0;
	this$0._m33 = m31$0 * _m13$0 + m32$0 * _m23$0 + m33$0 * _m33$0 + m34$0 * _m43$0;
	this$0._m34 = m31$0 * _m14$0 + m32$0 * _m24$0 + m33$0 * _m34$0 + m34$0 * _m44$0;
	this$0._m41 = m41$0 * _m11$0 + m42$0 * _m21$0 + m43$0 * _m31$0 + m44$0 * _m41$0;
	this$0._m42 = m41$0 * _m12$0 + m42$0 * _m22$0 + m43$0 * _m32$0 + m44$0 * _m42$0;
	this$0._m43 = m41$0 * _m13$0 + m42$0 * _m23$0 + m43$0 * _m33$0 + m44$0 * _m43$0;
	this$0._m44 = m41$0 * _m14$0 + m42$0 * _m24$0 + m43$0 * _m34$0 + m44$0 * _m44$0;
};

var Context3D$scale$LContext3D$NNN = Context3D.scale$LContext3D$NNN;

/**
 * @param {Context3D} $this
 * @param {Quaternion} q
 */
Context3D.rotate$LContext3D$LQuaternion$ = function ($this, q) {
	/** @type {Matrix} */
	var this$0;
	/** @type {!number} */
	var m11$0;
	/** @type {!number} */
	var m12$0;
	/** @type {!number} */
	var m13$0;
	/** @type {!number} */
	var m14$0;
	/** @type {!number} */
	var m21$0;
	/** @type {!number} */
	var m22$0;
	/** @type {!number} */
	var m23$0;
	/** @type {!number} */
	var m24$0;
	/** @type {!number} */
	var m31$0;
	/** @type {!number} */
	var m32$0;
	/** @type {!number} */
	var m33$0;
	/** @type {!number} */
	var m34$0;
	/** @type {!number} */
	var m41$0;
	/** @type {!number} */
	var m42$0;
	/** @type {!number} */
	var m43$0;
	/** @type {!number} */
	var m44$0;
	/** @type {!number} */
	var x2$0;
	/** @type {!number} */
	var y2$0;
	/** @type {!number} */
	var z2$0;
	/** @type {!number} */
	var xy$0;
	/** @type {!number} */
	var zx$0;
	/** @type {!number} */
	var yz$0;
	/** @type {!number} */
	var xt$0;
	/** @type {!number} */
	var yt$0;
	/** @type {!number} */
	var zt$0;
	/** @type {!number} */
	var x$0;
	/** @type {!number} */
	var y$0;
	/** @type {!number} */
	var z$0;
	/** @type {!number} */
	var t$0;
	/** @type {!number} */
	var _m11$0;
	/** @type {!number} */
	var _m21$0;
	/** @type {!number} */
	var _m31$0;
	/** @type {!number} */
	var _m41$0;
	/** @type {!number} */
	var _m12$0;
	/** @type {!number} */
	var _m22$0;
	/** @type {!number} */
	var _m32$0;
	/** @type {!number} */
	var _m42$0;
	/** @type {!number} */
	var _m13$0;
	/** @type {!number} */
	var _m23$0;
	/** @type {!number} */
	var _m33$0;
	/** @type {!number} */
	var _m43$0;
	/** @type {!number} */
	var _m14$0;
	/** @type {!number} */
	var _m24$0;
	/** @type {!number} */
	var _m34$0;
	/** @type {!number} */
	var _m44$0;
	/** @type {!number} */
	var other$0$_m11$0;
	/** @type {!number} */
	var other$0$_m12$0;
	/** @type {!number} */
	var other$0$_m13$0;
	/** @type {!number} */
	var other$0$_m14$0;
	/** @type {!number} */
	var other$0$_m21$0;
	/** @type {!number} */
	var other$0$_m22$0;
	/** @type {!number} */
	var other$0$_m23$0;
	/** @type {!number} */
	var other$0$_m24$0;
	/** @type {!number} */
	var other$0$_m31$0;
	/** @type {!number} */
	var other$0$_m32$0;
	/** @type {!number} */
	var other$0$_m33$0;
	/** @type {!number} */
	var other$0$_m34$0;
	/** @type {!number} */
	var other$0$_m41$0;
	/** @type {!number} */
	var other$0$_m42$0;
	/** @type {!number} */
	var other$0$_m43$0;
	/** @type {!number} */
	var other$0$_m44$0;
	this$0 = $this._worldMatrix;
	x2$0 = 2 * (x$0 = q.x) * x$0;
	y2$0 = 2 * (y$0 = q.y) * y$0;
	z2$0 = 2 * (z$0 = q.z) * z$0;
	xy$0 = 2 * x$0 * y$0;
	zx$0 = 2 * x$0 * z$0;
	yz$0 = 2 * y$0 * z$0;
	xt$0 = 2 * x$0 * (t$0 = q.t);
	yt$0 = 2 * y$0 * t$0;
	zt$0 = 2 * z$0 * t$0;
	other$0$_m11$0 = [ 1 - y2$0 - z2$0, xy$0 + zt$0, zx$0 - yt$0, 0, xy$0 - zt$0, 1 - x2$0 - z2$0, yz$0 + xt$0, 0, zx$0 + yt$0, yz$0 - xt$0, 1 - x2$0 - y2$0, 0, 0, 0, 0, 1 ][0];
	other$0$_m12$0 = [ 1 - y2$0 - z2$0, xy$0 + zt$0, zx$0 - yt$0, 0, xy$0 - zt$0, 1 - x2$0 - z2$0, yz$0 + xt$0, 0, zx$0 + yt$0, yz$0 - xt$0, 1 - x2$0 - y2$0, 0, 0, 0, 0, 1 ][1];
	other$0$_m13$0 = [ 1 - y2$0 - z2$0, xy$0 + zt$0, zx$0 - yt$0, 0, xy$0 - zt$0, 1 - x2$0 - z2$0, yz$0 + xt$0, 0, zx$0 + yt$0, yz$0 - xt$0, 1 - x2$0 - y2$0, 0, 0, 0, 0, 1 ][2];
	other$0$_m14$0 = [ 1 - y2$0 - z2$0, xy$0 + zt$0, zx$0 - yt$0, 0, xy$0 - zt$0, 1 - x2$0 - z2$0, yz$0 + xt$0, 0, zx$0 + yt$0, yz$0 - xt$0, 1 - x2$0 - y2$0, 0, 0, 0, 0, 1 ][3];
	other$0$_m21$0 = [ 1 - y2$0 - z2$0, xy$0 + zt$0, zx$0 - yt$0, 0, xy$0 - zt$0, 1 - x2$0 - z2$0, yz$0 + xt$0, 0, zx$0 + yt$0, yz$0 - xt$0, 1 - x2$0 - y2$0, 0, 0, 0, 0, 1 ][4];
	other$0$_m22$0 = [ 1 - y2$0 - z2$0, xy$0 + zt$0, zx$0 - yt$0, 0, xy$0 - zt$0, 1 - x2$0 - z2$0, yz$0 + xt$0, 0, zx$0 + yt$0, yz$0 - xt$0, 1 - x2$0 - y2$0, 0, 0, 0, 0, 1 ][5];
	other$0$_m23$0 = [ 1 - y2$0 - z2$0, xy$0 + zt$0, zx$0 - yt$0, 0, xy$0 - zt$0, 1 - x2$0 - z2$0, yz$0 + xt$0, 0, zx$0 + yt$0, yz$0 - xt$0, 1 - x2$0 - y2$0, 0, 0, 0, 0, 1 ][6];
	other$0$_m24$0 = [ 1 - y2$0 - z2$0, xy$0 + zt$0, zx$0 - yt$0, 0, xy$0 - zt$0, 1 - x2$0 - z2$0, yz$0 + xt$0, 0, zx$0 + yt$0, yz$0 - xt$0, 1 - x2$0 - y2$0, 0, 0, 0, 0, 1 ][7];
	other$0$_m31$0 = [ 1 - y2$0 - z2$0, xy$0 + zt$0, zx$0 - yt$0, 0, xy$0 - zt$0, 1 - x2$0 - z2$0, yz$0 + xt$0, 0, zx$0 + yt$0, yz$0 - xt$0, 1 - x2$0 - y2$0, 0, 0, 0, 0, 1 ][8];
	other$0$_m32$0 = [ 1 - y2$0 - z2$0, xy$0 + zt$0, zx$0 - yt$0, 0, xy$0 - zt$0, 1 - x2$0 - z2$0, yz$0 + xt$0, 0, zx$0 + yt$0, yz$0 - xt$0, 1 - x2$0 - y2$0, 0, 0, 0, 0, 1 ][9];
	other$0$_m33$0 = [ 1 - y2$0 - z2$0, xy$0 + zt$0, zx$0 - yt$0, 0, xy$0 - zt$0, 1 - x2$0 - z2$0, yz$0 + xt$0, 0, zx$0 + yt$0, yz$0 - xt$0, 1 - x2$0 - y2$0, 0, 0, 0, 0, 1 ][10];
	other$0$_m34$0 = [ 1 - y2$0 - z2$0, xy$0 + zt$0, zx$0 - yt$0, 0, xy$0 - zt$0, 1 - x2$0 - z2$0, yz$0 + xt$0, 0, zx$0 + yt$0, yz$0 - xt$0, 1 - x2$0 - y2$0, 0, 0, 0, 0, 1 ][11];
	other$0$_m41$0 = [ 1 - y2$0 - z2$0, xy$0 + zt$0, zx$0 - yt$0, 0, xy$0 - zt$0, 1 - x2$0 - z2$0, yz$0 + xt$0, 0, zx$0 + yt$0, yz$0 - xt$0, 1 - x2$0 - y2$0, 0, 0, 0, 0, 1 ][12];
	other$0$_m42$0 = [ 1 - y2$0 - z2$0, xy$0 + zt$0, zx$0 - yt$0, 0, xy$0 - zt$0, 1 - x2$0 - z2$0, yz$0 + xt$0, 0, zx$0 + yt$0, yz$0 - xt$0, 1 - x2$0 - y2$0, 0, 0, 0, 0, 1 ][13];
	other$0$_m43$0 = [ 1 - y2$0 - z2$0, xy$0 + zt$0, zx$0 - yt$0, 0, xy$0 - zt$0, 1 - x2$0 - z2$0, yz$0 + xt$0, 0, zx$0 + yt$0, yz$0 - xt$0, 1 - x2$0 - y2$0, 0, 0, 0, 0, 1 ][14];
	other$0$_m44$0 = [ 1 - y2$0 - z2$0, xy$0 + zt$0, zx$0 - yt$0, 0, xy$0 - zt$0, 1 - x2$0 - z2$0, yz$0 + xt$0, 0, zx$0 + yt$0, yz$0 - xt$0, 1 - x2$0 - y2$0, 0, 0, 0, 0, 1 ][15];
	m11$0 = this$0._m11;
	m12$0 = this$0._m12;
	m13$0 = this$0._m13;
	m14$0 = this$0._m14;
	m21$0 = this$0._m21;
	m22$0 = this$0._m22;
	m23$0 = this$0._m23;
	m24$0 = this$0._m24;
	m31$0 = this$0._m31;
	m32$0 = this$0._m32;
	m33$0 = this$0._m33;
	m34$0 = this$0._m34;
	m41$0 = this$0._m41;
	m42$0 = this$0._m42;
	m43$0 = this$0._m43;
	m44$0 = this$0._m44;
	this$0._m11 = m11$0 * (_m11$0 = other$0$_m11$0) + m12$0 * (_m21$0 = other$0$_m21$0) + m13$0 * (_m31$0 = other$0$_m31$0) + m14$0 * (_m41$0 = other$0$_m41$0);
	this$0._m12 = m11$0 * (_m12$0 = other$0$_m12$0) + m12$0 * (_m22$0 = other$0$_m22$0) + m13$0 * (_m32$0 = other$0$_m32$0) + m14$0 * (_m42$0 = other$0$_m42$0);
	this$0._m13 = m11$0 * (_m13$0 = other$0$_m13$0) + m12$0 * (_m23$0 = other$0$_m23$0) + m13$0 * (_m33$0 = other$0$_m33$0) + m14$0 * (_m43$0 = other$0$_m43$0);
	this$0._m14 = m11$0 * (_m14$0 = other$0$_m14$0) + m12$0 * (_m24$0 = other$0$_m24$0) + m13$0 * (_m34$0 = other$0$_m34$0) + m14$0 * (_m44$0 = other$0$_m44$0);
	this$0._m21 = m21$0 * _m11$0 + m22$0 * _m21$0 + m23$0 * _m31$0 + m24$0 * _m41$0;
	this$0._m22 = m21$0 * _m12$0 + m22$0 * _m22$0 + m23$0 * _m32$0 + m24$0 * _m42$0;
	this$0._m23 = m21$0 * _m13$0 + m22$0 * _m23$0 + m23$0 * _m33$0 + m24$0 * _m43$0;
	this$0._m24 = m21$0 * _m14$0 + m22$0 * _m24$0 + m23$0 * _m34$0 + m24$0 * _m44$0;
	this$0._m31 = m31$0 * _m11$0 + m32$0 * _m21$0 + m33$0 * _m31$0 + m34$0 * _m41$0;
	this$0._m32 = m31$0 * _m12$0 + m32$0 * _m22$0 + m33$0 * _m32$0 + m34$0 * _m42$0;
	this$0._m33 = m31$0 * _m13$0 + m32$0 * _m23$0 + m33$0 * _m33$0 + m34$0 * _m43$0;
	this$0._m34 = m31$0 * _m14$0 + m32$0 * _m24$0 + m33$0 * _m34$0 + m34$0 * _m44$0;
	this$0._m41 = m41$0 * _m11$0 + m42$0 * _m21$0 + m43$0 * _m31$0 + m44$0 * _m41$0;
	this$0._m42 = m41$0 * _m12$0 + m42$0 * _m22$0 + m43$0 * _m32$0 + m44$0 * _m42$0;
	this$0._m43 = m41$0 * _m13$0 + m42$0 * _m23$0 + m43$0 * _m33$0 + m44$0 * _m43$0;
	this$0._m44 = m41$0 * _m14$0 + m42$0 * _m24$0 + m43$0 * _m34$0 + m44$0 * _m44$0;
};

var Context3D$rotate$LContext3D$LQuaternion$ = Context3D.rotate$LContext3D$LQuaternion$;

/**
 * @param {Context3D} $this
 * @param {Vector} center
 */
Context3D.beginGroup$LContext3D$LVector$ = function ($this, center) {
	$this._polygonList = new List$Polygon$E$();
	$this._groupCenter = center;
	$this._ignoringZHidden = false;
};

var Context3D$beginGroup$LContext3D$LVector$ = Context3D.beginGroup$LContext3D$LVector$;

/**
 * @param {Context3D} $this
 * @param {Vector} center
 * @param {!boolean} ignoringZHidden
 */
Context3D.beginGroup$LContext3D$LVector$B = function ($this, center, ignoringZHidden) {
	$this._polygonList = new List$Polygon$E$();
	$this._groupCenter = center;
	$this._ignoringZHidden = ignoringZHidden;
};

var Context3D$beginGroup$LContext3D$LVector$B = Context3D.beginGroup$LContext3D$LVector$B;

/**
 * @param {Context3D} $this
 * @param {Array.<undefined|Vector>} vertices
 * @param {Color} color
 */
Context3D.renderPolygonGroup$LContext3D$ALVector$LColor$ = function ($this, vertices, color) {
	/** @type {Polygon} */
	var polygon;
	polygon = new Polygon$ALVector$LColor$(vertices, color);
	polygon.applyWorldMatrix$LMatrix$($this._worldMatrix);
	polygon.applyViewMatrix$LMatrix$($this.camera.viewMatrix);
	if (polygon.isHidden$LCamera$($this.camera)) {
		return;
	}
	$this._polygonList.prepend$LPolygon$(polygon);
};

var Context3D$renderPolygonGroup$LContext3D$ALVector$LColor$ = Context3D.renderPolygonGroup$LContext3D$ALVector$LColor$;

/**
 * @param {Context3D} $this
 */
Context3D.endGroup$LContext3D$ = function ($this) {
	if ($this._polygonList.length !== 0) {
		Context3D$renderModel$LContext3D$LRenderable$($this, new PolygonGroup$LList$Polygon$E$LVector$B($this._polygonList, $this._groupCenter, $this._ignoringZHidden));
	}
};

var Context3D$endGroup$LContext3D$ = Context3D.endGroup$LContext3D$;

/**
 * @param {Context3D} $this
 * @param {Array.<undefined|Vector>} vertices
 * @param {Color} color
 */
Context3D.renderPolygon$LContext3D$ALVector$LColor$ = function ($this, vertices, color) {
	Context3D$renderModel$LContext3D$LRenderable$($this, new Polygon$ALVector$LColor$(vertices, color));
};

var Context3D$renderPolygon$LContext3D$ALVector$LColor$ = Context3D.renderPolygon$LContext3D$ALVector$LColor$;

/**
 * @param {Context3D} $this
 * @param {Vector} center
 * @param {!number} width
 * @param {!number} height
 * @param {!string} src
 */
Context3D.renderBillboard$LContext3D$LVector$IIS = function ($this, center, width, height, src) {
	Context3D$renderModel$LContext3D$LRenderable$($this, new Billboard$LVector$NNS(center, width, height, src));
};

var Context3D$renderBillboard$LContext3D$LVector$IIS = Context3D.renderBillboard$LContext3D$LVector$IIS;

/**
 * @param {Context3D} $this
 * @param {Array.<undefined|Vector>} vertices
 * @param {!string} src
 * @param {!number} maxHorDiv
 * @param {!number} maxVerDiv
 * @param {!number} maxDiv
 * @param {!number} minDiv
 */
Context3D.renderTexture$LContext3D$ALVector$SIIII = function ($this, vertices, src, maxHorDiv, maxVerDiv, maxDiv, minDiv) {
	Context3D$renderModel$LContext3D$LRenderable$($this, new SmoothTexture$ALVector$SIIII(vertices, src, maxHorDiv, maxVerDiv, maxDiv, minDiv));
};

var Context3D$renderTexture$LContext3D$ALVector$SIIII = Context3D.renderTexture$LContext3D$ALVector$SIIII;

/**
 * @param {Context3D} $this
 * @param {Array.<undefined|Vector>} vertices
 * @param {!string} src
 */
Context3D.renderTexture$LContext3D$ALVector$S = function ($this, vertices, src) {
	Context3D$renderModel$LContext3D$LRenderable$($this, new SmoothTexture$ALVector$S(vertices, src));
};

var Context3D$renderTexture$LContext3D$ALVector$S = Context3D.renderTexture$LContext3D$ALVector$S;

/**
 * @param {Context3D} $this
 * @param {Renderable} model
 */
Context3D.renderModel$LContext3D$LRenderable$ = function ($this, model) {
	model.applyWorldMatrix$LMatrix$($this._worldMatrix);
	model.applyViewMatrix$LMatrix$($this.camera.viewMatrix);
	if (model.isHidden$LCamera$($this.camera)) {
		return;
	}
	switch ($this._depth) {
	case 1:
		Context3D$insertModelByZValue$LContext3D$LList$Renderable$E$LRenderable$($this, $this.modelList1, model);
		break;
	case 2:
		Context3D$insertModelByZValue$LContext3D$LList$Renderable$E$LRenderable$($this, $this.modelList2, model);
		break;
	case 3:
		Context3D$insertModelByZValue$LContext3D$LList$Renderable$E$LRenderable$($this, $this.modelList3, model);
		break;
	case 4:
		Context3D$insertModelByZValue$LContext3D$LList$Renderable$E$LRenderable$($this, $this.modelList4, model);
		break;
	case 5:
		Context3D$insertModelByZValue$LContext3D$LList$Renderable$E$LRenderable$($this, $this.modelList5, model);
		break;
	}
};

var Context3D$renderModel$LContext3D$LRenderable$ = Context3D.renderModel$LContext3D$LRenderable$;

/**
 * @param {Context3D} $this
 * @param {List$Renderable$E} list
 * @param {Renderable} model
 */
Context3D.insertModelByZValue$LContext3D$LList$Renderable$E$LRenderable$ = function ($this, list, model) {
	/** @type {!boolean} */
	var inserted;
	/** @type {Node$Renderable$E} */
	var n;
	inserted = false;
	for (n = list.head; n != null; n = n._next) {
		if (n.value.vCenter.z < model.vCenter.z) {
			list.insertBefore$LNode$Renderable$E$LRenderable$(n, model);
			inserted = true;
			break;
		}
	}
	if (! inserted) {
		list.append$LRenderable$(model);
	}
};

var Context3D$insertModelByZValue$LContext3D$LList$Renderable$E$LRenderable$ = Context3D.insertModelByZValue$LContext3D$LList$Renderable$E$LRenderable$;

/**
 * class Camera extends Object
 * @constructor
 */
function Camera() {
}

Camera.prototype = new Object;
/**
 * @constructor
 * @param {Vector} view
 * @param {Vector} target
 * @param {Vector} upper
 * @param {!number} fovyX
 * @param {!number} nearZ
 * @param {!number} farZ
 * @param {!number} aspectRatio
 */
function Camera$LVector$LVector$LVector$NNNN(view, target, upper, fovyX, nearZ, farZ, aspectRatio) {
	/** @type {Vector} */
	var view$0;
	/** @type {Vector} */
	var target$0;
	/** @type {Vector} */
	var upper$0;
	/** @type {!number} */
	var fovyX$0;
	/** @type {!number} */
	var nearZ$0;
	/** @type {!number} */
	var farZ$0;
	/** @type {!number} */
	var aspectRatio$0;
	/** @type {Matrix} */
	var viewMatrix$0;
	/** @type {Matrix} */
	var projectionMatrix$0;
	/** @type {Vector} */
	var zaxis$0$0;
	/** @type {Vector} */
	var xaxis$0$0;
	/** @type {Vector} */
	var yaxis$0$0;
	/** @type {Vector} */
	var this$0$0$0;
	/** @type {!number} */
	var length$0$0$0;
	/** @type {Vector} */
	var this$1$0$0;
	/** @type {!number} */
	var length$1$0$0;
	/** @type {Vector} */
	var this$2$0$0;
	/** @type {!number} */
	var length$2$0$0;
	/** @type {!number} */
	var sx$0$0;
	/** @type {!number} */
	var sy$0$0;
	/** @type {!number} */
	var sz$0$0;
	/** @type {!number} */
	var mz$0$0;
	/** @type {!number} */
	var m11$0$0;
	/** @type {!number} */
	var m12$0$0;
	/** @type {!number} */
	var m13$0$0;
	/** @type {!number} */
	var m14$0$0;
	/** @type {!number} */
	var m21$0$0;
	/** @type {!number} */
	var m22$0$0;
	/** @type {!number} */
	var m23$0$0;
	/** @type {!number} */
	var m24$0$0;
	/** @type {!number} */
	var m31$0$0;
	/** @type {!number} */
	var m32$0$0;
	/** @type {!number} */
	var m33$0$0;
	/** @type {!number} */
	var m34$0$0;
	/** @type {!number} */
	var m41$0$0;
	/** @type {!number} */
	var m42$0$0;
	/** @type {!number} */
	var m43$0$0;
	/** @type {!number} */
	var m44$0$0;
	/** @type {!number} */
	var x$0;
	/** @type {!number} */
	var y$0;
	/** @type {!number} */
	var z$0;
	/** @type {!number} */
	var z$1;
	/** @type {!number} */
	var z$2;
	/** @type {!number} */
	var x$1;
	/** @type {!number} */
	var y$1;
	/** @type {!number} */
	var y$2;
	/** @type {!number} */
	var x$2;
	/** @type {!number} */
	var x$3;
	/** @type {!number} */
	var y$3;
	/** @type {!number} */
	var z$3;
	/** @type {!number} */
	var z$4;
	/** @type {!number} */
	var z$5;
	/** @type {!number} */
	var x$4;
	/** @type {!number} */
	var y$4;
	/** @type {!number} */
	var y$5;
	/** @type {!number} */
	var x$5;
	/** @type {!number} */
	var x$6;
	/** @type {!number} */
	var y$6;
	/** @type {!number} */
	var z$6;
	/** @type {!number} */
	var x$7;
	/** @type {!number} */
	var y$7;
	/** @type {!number} */
	var z$7;
	/** @type {!number} */
	var x$8;
	/** @type {!number} */
	var x$9;
	/** @type {!number} */
	var y$8;
	/** @type {!number} */
	var y$9;
	/** @type {!number} */
	var z$8;
	/** @type {!number} */
	var z$9;
	/** @type {!number} */
	var x$10;
	/** @type {!number} */
	var y$10;
	/** @type {!number} */
	var z$10;
	/** @type {!number} */
	var _m11$0;
	/** @type {!number} */
	var _m12$0;
	/** @type {!number} */
	var _m13$0;
	/** @type {!number} */
	var _m14$0;
	/** @type {!number} */
	var _m11$1;
	/** @type {!number} */
	var _m21$0;
	/** @type {!number} */
	var _m31$0;
	/** @type {!number} */
	var _m41$0;
	/** @type {!number} */
	var _m21$1;
	/** @type {!number} */
	var _m12$1;
	/** @type {!number} */
	var _m22$0;
	/** @type {!number} */
	var _m22$1;
	/** @type {!number} */
	var _m23$0;
	/** @type {!number} */
	var _m32$0;
	/** @type {!number} */
	var _m24$0;
	/** @type {!number} */
	var _m42$0;
	/** @type {!number} */
	var _m13$1;
	/** @type {!number} */
	var _m23$1;
	/** @type {!number} */
	var _m33$0;
	/** @type {!number} */
	var _m43$0;
	/** @type {!number} */
	var _m14$1;
	/** @type {!number} */
	var _m24$1;
	/** @type {!number} */
	var _m34$0;
	/** @type {!number} */
	var _m44$0;
	/** @type {!number} */
	var _m31$1;
	/** @type {!number} */
	var _m32$1;
	/** @type {!number} */
	var _m33$1;
	/** @type {!number} */
	var _m34$1;
	/** @type {!number} */
	var _m41$1;
	/** @type {!number} */
	var _m42$1;
	/** @type {!number} */
	var _m43$1;
	/** @type {!number} */
	var _m44$1;
	this.viewMatrix = null;
	this.projectionMatrix = null;
	this.matrix = null;
	this.view = view;
	this.target = target;
	this.upper = upper;
	this.fovyX = fovyX;
	this.nearZ = nearZ;
	this.farZ = farZ;
	this.aspectRatio = aspectRatio;
	this.rotatingMatrix = new Matrix$();
	view$0 = this.view;
	target$0 = this.target;
	upper$0 = this.upper;
	fovyX$0 = this.fovyX;
	nearZ$0 = this.nearZ;
	farZ$0 = this.farZ;
	aspectRatio$0 = this.aspectRatio;
	this$0$0$0 = new Vector$NNN(target$0.x - view$0.x, target$0.y - view$0.y, target$0.z - view$0.z);
	length$0$0$0 = Math.sqrt((x$0 = this$0$0$0.x) * x$0 + (y$0 = this$0$0$0.y) * y$0 + (z$0 = this$0$0$0.z) * z$0);
	zaxis$0$0 = (length$0$0$0 < 1e-9 ? new Vector$NNN(0, 0, 0) : this$0$0$0.divSelf$N(length$0$0$0));
	this$1$0$0 = new Vector$NNN((y$2 = upper$0.y) * (z$2 = zaxis$0$0.z) - (z$1 = upper$0.z) * (y$1 = zaxis$0$0.y), z$1 * (x$2 = zaxis$0$0.x) - (x$1 = upper$0.x) * z$2, x$1 * y$1 - y$2 * x$2);
	length$1$0$0 = Math.sqrt((x$3 = this$1$0$0.x) * x$3 + (y$3 = this$1$0$0.y) * y$3 + (z$3 = this$1$0$0.z) * z$3);
	xaxis$0$0 = (length$1$0$0 < 1e-9 ? new Vector$NNN(0, 0, 0) : this$1$0$0.divSelf$N(length$1$0$0));
	this$2$0$0 = new Vector$NNN((y$5 = zaxis$0$0.y) * (z$5 = xaxis$0$0.z) - (z$4 = zaxis$0$0.z) * (y$4 = xaxis$0$0.y), z$4 * (x$5 = xaxis$0$0.x) - (x$4 = zaxis$0$0.x) * z$5, x$4 * y$4 - y$5 * x$5);
	length$2$0$0 = Math.sqrt((x$6 = this$2$0$0.x) * x$6 + (y$6 = this$2$0$0.y) * y$6 + (z$6 = this$2$0$0.z) * z$6);
	yaxis$0$0 = (length$2$0$0 < 1e-9 ? new Vector$NNN(0, 0, 0) : this$2$0$0.divSelf$N(length$2$0$0));
	viewMatrix$0 = new Matrix$AN([ x$7 = xaxis$0$0.x, y$7 = xaxis$0$0.y, z$7 = xaxis$0$0.z, - (x$7 * (x$9 = view$0.x) + y$7 * (y$9 = view$0.y) + z$7 * (z$9 = view$0.z)), x$8 = yaxis$0$0.x, y$8 = yaxis$0$0.y, z$8 = yaxis$0$0.z, - (x$8 * x$9 + y$8 * y$9 + z$8 * z$9), x$10 = zaxis$0$0.x, y$10 = zaxis$0$0.y, z$10 = zaxis$0$0.z, - (x$10 * x$9 + y$10 * y$9 + z$10 * z$9), 0, 0, 0, 1 ]);
	sx$0$0 = 1 / Math.tan(fovyX$0 / 2);
	sy$0$0 = sx$0$0 / aspectRatio$0;
	sz$0$0 = farZ$0 / (farZ$0 - nearZ$0);
	mz$0$0 = - sz$0$0 * nearZ$0;
	projectionMatrix$0 = new Matrix$AN([ sx$0$0, 0, 0, 0, 0, sy$0$0, 0, 0, 0, 0, sz$0$0, mz$0$0, 0, 0, 1, 0 ]);
	this.viewMatrix = viewMatrix$0;
	this.projectionMatrix = projectionMatrix$0;
	m11$0$0 = (_m11$0 = projectionMatrix$0._m11) * (_m11$1 = viewMatrix$0._m11) + (_m12$0 = projectionMatrix$0._m12) * (_m21$0 = viewMatrix$0._m21) + (_m13$0 = projectionMatrix$0._m13) * (_m31$0 = viewMatrix$0._m31) + (_m14$0 = projectionMatrix$0._m14) * (_m41$0 = viewMatrix$0._m41);
	m12$0$0 = _m11$0 * (_m12$1 = viewMatrix$0._m12) + _m12$0 * (_m22$1 = viewMatrix$0._m22) + _m13$0 * (_m32$0 = viewMatrix$0._m32) + _m14$0 * (_m42$0 = viewMatrix$0._m42);
	m13$0$0 = _m11$0 * (_m13$1 = viewMatrix$0._m13) + _m12$0 * (_m23$1 = viewMatrix$0._m23) + _m13$0 * (_m33$0 = viewMatrix$0._m33) + _m14$0 * (_m43$0 = viewMatrix$0._m43);
	m14$0$0 = _m11$0 * (_m14$1 = viewMatrix$0._m14) + _m12$0 * (_m24$1 = viewMatrix$0._m24) + _m13$0 * (_m34$0 = viewMatrix$0._m34) + _m14$0 * (_m44$0 = viewMatrix$0._m44);
	m21$0$0 = (_m21$1 = projectionMatrix$0._m21) * _m11$1 + (_m22$0 = projectionMatrix$0._m22) * _m21$0 + (_m23$0 = projectionMatrix$0._m23) * _m31$0 + (_m24$0 = projectionMatrix$0._m24) * _m41$0;
	m22$0$0 = _m21$1 * _m12$1 + _m22$0 * _m22$1 + _m23$0 * _m32$0 + _m24$0 * _m42$0;
	m23$0$0 = _m21$1 * _m13$1 + _m22$0 * _m23$1 + _m23$0 * _m33$0 + _m24$0 * _m43$0;
	m24$0$0 = _m21$1 * _m14$1 + _m22$0 * _m24$1 + _m23$0 * _m34$0 + _m24$0 * _m44$0;
	m31$0$0 = (_m31$1 = projectionMatrix$0._m31) * _m11$1 + (_m32$1 = projectionMatrix$0._m32) * _m21$0 + (_m33$1 = projectionMatrix$0._m33) * _m31$0 + (_m34$1 = projectionMatrix$0._m34) * _m41$0;
	m32$0$0 = _m31$1 * _m12$1 + _m32$1 * _m22$1 + _m33$1 * _m32$0 + _m34$1 * _m42$0;
	m33$0$0 = _m31$1 * _m13$1 + _m32$1 * _m23$1 + _m33$1 * _m33$0 + _m34$1 * _m43$0;
	m34$0$0 = _m31$1 * _m14$1 + _m32$1 * _m24$1 + _m33$1 * _m34$0 + _m34$1 * _m44$0;
	m41$0$0 = (_m41$1 = projectionMatrix$0._m41) * _m11$1 + (_m42$1 = projectionMatrix$0._m42) * _m21$0 + (_m43$1 = projectionMatrix$0._m43) * _m31$0 + (_m44$1 = projectionMatrix$0._m44) * _m41$0;
	m42$0$0 = _m41$1 * _m12$1 + _m42$1 * _m22$1 + _m43$1 * _m32$0 + _m44$1 * _m42$0;
	m43$0$0 = _m41$1 * _m13$1 + _m42$1 * _m23$1 + _m43$1 * _m33$0 + _m44$1 * _m43$0;
	m44$0$0 = _m41$1 * _m14$1 + _m42$1 * _m24$1 + _m43$1 * _m34$0 + _m44$1 * _m44$0;
	this.matrix = new Matrix$AN([ m11$0$0, m12$0$0, m13$0$0, m14$0$0, m21$0$0, m22$0$0, m23$0$0, m24$0$0, m31$0$0, m32$0$0, m33$0$0, m34$0$0, m41$0$0, m42$0$0, m43$0$0, m44$0$0 ]);
};

Camera$LVector$LVector$LVector$NNNN.prototype = new Camera;

/**
 * @param {Vector} v
 */
Camera.prototype.move$LVector$ = function (v) {
	/** @type {Vector} */
	var vector;
	/** @type {Matrix} */
	var m$0;
	/** @type {!number} */
	var x$0;
	/** @type {!number} */
	var y$0;
	/** @type {!number} */
	var z$0;
	/** @type {!number} */
	var w$0;
	/** @type {Vector} */
	var this$0;
	/** @type {Vector} */
	var this$1;
	/** @type {!number} */
	var x$1;
	/** @type {!number} */
	var y$1;
	/** @type {!number} */
	var z$1;
	/** @type {!number} */
	var w$1;
	/** @type {!number} */
	var x$2;
	/** @type {!number} */
	var y$2;
	/** @type {!number} */
	var z$2;
	m$0 = this.rotatingMatrix;
	x$0 = m$0._m11 * (x$1 = v.x) + m$0._m12 * (y$1 = v.y) + m$0._m13 * (z$1 = v.z) + m$0._m14 * (w$1 = v.w);
	y$0 = m$0._m21 * x$1 + m$0._m22 * y$1 + m$0._m23 * z$1 + m$0._m24 * w$1;
	z$0 = m$0._m31 * x$1 + m$0._m32 * y$1 + m$0._m33 * z$1 + m$0._m34 * w$1;
	w$0 = m$0._m41 * x$1 + m$0._m42 * y$1 + m$0._m43 * z$1 + m$0._m44 * w$1;
	vector = new Vector$NNNN(x$0, y$0, z$0, w$0);
	this$0 = this.view;
	this$0.x += x$2 = vector.x;
	this$0.y += y$2 = vector.y;
	this$0.z += z$2 = vector.z;
	this$1 = this.target;
	this$1.x += x$2;
	this$1.y += y$2;
	this$1.z += z$2;
};

/**
 * @param {!number} rad
 */
Camera.prototype.rotateY$N = function (rad) {
	/** @type {Vector} */
	var lookingVec;
	/** @type {Vector} */
	var this$0;
	/** @type {Vector} */
	var other$0;
	/** @type {!number} */
	var x$0;
	/** @type {!number} */
	var y$0;
	/** @type {!number} */
	var z$0;
	/** @type {!number} */
	var w$0;
	/** @type {Vector} */
	var other$1;
	/** @type {Matrix} */
	var this$1;
	/** @type {Matrix} */
	var other$2;
	/** @type {!number} */
	var m11$0;
	/** @type {!number} */
	var m12$0;
	/** @type {!number} */
	var m13$0;
	/** @type {!number} */
	var m14$0;
	/** @type {!number} */
	var m21$0;
	/** @type {!number} */
	var m22$0;
	/** @type {!number} */
	var m23$0;
	/** @type {!number} */
	var m24$0;
	/** @type {!number} */
	var m31$0;
	/** @type {!number} */
	var m32$0;
	/** @type {!number} */
	var m33$0;
	/** @type {!number} */
	var m34$0;
	/** @type {!number} */
	var m41$0;
	/** @type {!number} */
	var m42$0;
	/** @type {!number} */
	var m43$0;
	/** @type {!number} */
	var m44$0;
	/** @type {!number} */
	var sin$0;
	/** @type {!number} */
	var cos$0;
	/** @type {!number} */
	var sin$1;
	/** @type {!number} */
	var cos$1;
	/** @type {!number} */
	var x$1;
	/** @type {!number} */
	var y$1;
	/** @type {!number} */
	var z$1;
	/** @type {!number} */
	var w$1;
	/** @type {!number} */
	var _m11$0;
	/** @type {!number} */
	var _m21$0;
	/** @type {!number} */
	var _m31$0;
	/** @type {!number} */
	var _m41$0;
	/** @type {!number} */
	var _m12$0;
	/** @type {!number} */
	var _m22$0;
	/** @type {!number} */
	var _m32$0;
	/** @type {!number} */
	var _m42$0;
	/** @type {!number} */
	var _m13$0;
	/** @type {!number} */
	var _m23$0;
	/** @type {!number} */
	var _m33$0;
	/** @type {!number} */
	var _m43$0;
	/** @type {!number} */
	var _m14$0;
	/** @type {!number} */
	var _m24$0;
	/** @type {!number} */
	var _m34$0;
	/** @type {!number} */
	var _m44$0;
	/** @type {!number} */
	var m$0$_m11$0;
	/** @type {!number} */
	var m$0$_m12$0;
	/** @type {!number} */
	var m$0$_m13$0;
	/** @type {!number} */
	var m$0$_m14$0;
	/** @type {!number} */
	var m$0$_m21$0;
	/** @type {!number} */
	var m$0$_m22$0;
	/** @type {!number} */
	var m$0$_m23$0;
	/** @type {!number} */
	var m$0$_m24$0;
	/** @type {!number} */
	var m$0$_m31$0;
	/** @type {!number} */
	var m$0$_m32$0;
	/** @type {!number} */
	var m$0$_m33$0;
	/** @type {!number} */
	var m$0$_m34$0;
	/** @type {!number} */
	var m$0$_m41$0;
	/** @type {!number} */
	var m$0$_m42$0;
	/** @type {!number} */
	var m$0$_m43$0;
	/** @type {!number} */
	var m$0$_m44$0;
	this$0 = this.target;
	other$0 = this.view;
	lookingVec = new Vector$NNN(this$0.x - other$0.x, this$0.y - other$0.y, this$0.z - other$0.z);
	sin$0 = Math.sin(rad);
	cos$0 = Math.cos(rad);
	m$0$_m11$0 = [ cos$0, 0, sin$0, 0, 0, 1, 0, 0, - sin$0, 0, cos$0, 0, 0, 0, 0, 1 ][0];
	m$0$_m12$0 = [ cos$0, 0, sin$0, 0, 0, 1, 0, 0, - sin$0, 0, cos$0, 0, 0, 0, 0, 1 ][1];
	m$0$_m13$0 = [ cos$0, 0, sin$0, 0, 0, 1, 0, 0, - sin$0, 0, cos$0, 0, 0, 0, 0, 1 ][2];
	m$0$_m14$0 = [ cos$0, 0, sin$0, 0, 0, 1, 0, 0, - sin$0, 0, cos$0, 0, 0, 0, 0, 1 ][3];
	m$0$_m21$0 = [ cos$0, 0, sin$0, 0, 0, 1, 0, 0, - sin$0, 0, cos$0, 0, 0, 0, 0, 1 ][4];
	m$0$_m22$0 = [ cos$0, 0, sin$0, 0, 0, 1, 0, 0, - sin$0, 0, cos$0, 0, 0, 0, 0, 1 ][5];
	m$0$_m23$0 = [ cos$0, 0, sin$0, 0, 0, 1, 0, 0, - sin$0, 0, cos$0, 0, 0, 0, 0, 1 ][6];
	m$0$_m24$0 = [ cos$0, 0, sin$0, 0, 0, 1, 0, 0, - sin$0, 0, cos$0, 0, 0, 0, 0, 1 ][7];
	m$0$_m31$0 = [ cos$0, 0, sin$0, 0, 0, 1, 0, 0, - sin$0, 0, cos$0, 0, 0, 0, 0, 1 ][8];
	m$0$_m32$0 = [ cos$0, 0, sin$0, 0, 0, 1, 0, 0, - sin$0, 0, cos$0, 0, 0, 0, 0, 1 ][9];
	m$0$_m33$0 = [ cos$0, 0, sin$0, 0, 0, 1, 0, 0, - sin$0, 0, cos$0, 0, 0, 0, 0, 1 ][10];
	m$0$_m34$0 = [ cos$0, 0, sin$0, 0, 0, 1, 0, 0, - sin$0, 0, cos$0, 0, 0, 0, 0, 1 ][11];
	m$0$_m41$0 = [ cos$0, 0, sin$0, 0, 0, 1, 0, 0, - sin$0, 0, cos$0, 0, 0, 0, 0, 1 ][12];
	m$0$_m42$0 = [ cos$0, 0, sin$0, 0, 0, 1, 0, 0, - sin$0, 0, cos$0, 0, 0, 0, 0, 1 ][13];
	m$0$_m43$0 = [ cos$0, 0, sin$0, 0, 0, 1, 0, 0, - sin$0, 0, cos$0, 0, 0, 0, 0, 1 ][14];
	m$0$_m44$0 = [ cos$0, 0, sin$0, 0, 0, 1, 0, 0, - sin$0, 0, cos$0, 0, 0, 0, 0, 1 ][15];
	x$0 = m$0$_m11$0 * (x$1 = lookingVec.x) + m$0$_m12$0 * (y$1 = lookingVec.y) + m$0$_m13$0 * (z$1 = lookingVec.z) + m$0$_m14$0 * (w$1 = lookingVec.w);
	y$0 = m$0$_m21$0 * x$1 + m$0$_m22$0 * y$1 + m$0$_m23$0 * z$1 + m$0$_m24$0 * w$1;
	z$0 = m$0$_m31$0 * x$1 + m$0$_m32$0 * y$1 + m$0$_m33$0 * z$1 + m$0$_m34$0 * w$1;
	w$0 = m$0$_m41$0 * x$1 + m$0$_m42$0 * y$1 + m$0$_m43$0 * z$1 + m$0$_m44$0 * w$1;
	lookingVec.x = x$0 / w$0;
	lookingVec.y = y$0 / w$0;
	lookingVec.z = z$0 / w$0;
	lookingVec.w = 1;
	other$1 = this.view;
	lookingVec.x += other$1.x;
	lookingVec.y += other$1.y;
	lookingVec.z += other$1.z;
	this.target = lookingVec;
	sin$1 = Math.sin(rad);
	cos$1 = Math.cos(rad);
	this$1 = new Matrix$AN([ cos$1, 0, sin$1, 0, 0, 1, 0, 0, - sin$1, 0, cos$1, 0, 0, 0, 0, 1 ]);
	other$2 = this.rotatingMatrix;
	m11$0 = this$1._m11;
	m12$0 = this$1._m12;
	m13$0 = this$1._m13;
	m14$0 = this$1._m14;
	m21$0 = this$1._m21;
	m22$0 = this$1._m22;
	m23$0 = this$1._m23;
	m24$0 = this$1._m24;
	m31$0 = this$1._m31;
	m32$0 = this$1._m32;
	m33$0 = this$1._m33;
	m34$0 = this$1._m34;
	m41$0 = this$1._m41;
	m42$0 = this$1._m42;
	m43$0 = this$1._m43;
	m44$0 = this$1._m44;
	this$1._m11 = m11$0 * (_m11$0 = other$2._m11) + m12$0 * (_m21$0 = other$2._m21) + m13$0 * (_m31$0 = other$2._m31) + m14$0 * (_m41$0 = other$2._m41);
	this$1._m12 = m11$0 * (_m12$0 = other$2._m12) + m12$0 * (_m22$0 = other$2._m22) + m13$0 * (_m32$0 = other$2._m32) + m14$0 * (_m42$0 = other$2._m42);
	this$1._m13 = m11$0 * (_m13$0 = other$2._m13) + m12$0 * (_m23$0 = other$2._m23) + m13$0 * (_m33$0 = other$2._m33) + m14$0 * (_m43$0 = other$2._m43);
	this$1._m14 = m11$0 * (_m14$0 = other$2._m14) + m12$0 * (_m24$0 = other$2._m24) + m13$0 * (_m34$0 = other$2._m34) + m14$0 * (_m44$0 = other$2._m44);
	this$1._m21 = m21$0 * _m11$0 + m22$0 * _m21$0 + m23$0 * _m31$0 + m24$0 * _m41$0;
	this$1._m22 = m21$0 * _m12$0 + m22$0 * _m22$0 + m23$0 * _m32$0 + m24$0 * _m42$0;
	this$1._m23 = m21$0 * _m13$0 + m22$0 * _m23$0 + m23$0 * _m33$0 + m24$0 * _m43$0;
	this$1._m24 = m21$0 * _m14$0 + m22$0 * _m24$0 + m23$0 * _m34$0 + m24$0 * _m44$0;
	this$1._m31 = m31$0 * _m11$0 + m32$0 * _m21$0 + m33$0 * _m31$0 + m34$0 * _m41$0;
	this$1._m32 = m31$0 * _m12$0 + m32$0 * _m22$0 + m33$0 * _m32$0 + m34$0 * _m42$0;
	this$1._m33 = m31$0 * _m13$0 + m32$0 * _m23$0 + m33$0 * _m33$0 + m34$0 * _m43$0;
	this$1._m34 = m31$0 * _m14$0 + m32$0 * _m24$0 + m33$0 * _m34$0 + m34$0 * _m44$0;
	this$1._m41 = m41$0 * _m11$0 + m42$0 * _m21$0 + m43$0 * _m31$0 + m44$0 * _m41$0;
	this$1._m42 = m41$0 * _m12$0 + m42$0 * _m22$0 + m43$0 * _m32$0 + m44$0 * _m42$0;
	this$1._m43 = m41$0 * _m13$0 + m42$0 * _m23$0 + m43$0 * _m33$0 + m44$0 * _m43$0;
	this$1._m44 = m41$0 * _m14$0 + m42$0 * _m24$0 + m43$0 * _m34$0 + m44$0 * _m44$0;
	this.rotatingMatrix = this$1;
};

/**
 */
Camera.prototype.updateMatrix$ = function () {
	var $this = this;
	/** @type {Vector} */
	var view;
	/** @type {Vector} */
	var target;
	/** @type {Vector} */
	var upper;
	/** @type {!number} */
	var fovyX;
	/** @type {!number} */
	var nearZ;
	/** @type {!number} */
	var farZ;
	/** @type {!number} */
	var aspectRatio;
	/** @type {Matrix} */
	var viewMatrix;
	/** @type {Matrix} */
	var projectionMatrix;
	/** @type {Vector} */
	var zaxis$0;
	/** @type {Vector} */
	var xaxis$0;
	/** @type {Vector} */
	var yaxis$0;
	/** @type {Vector} */
	var this$0$0;
	/** @type {!number} */
	var length$0$0;
	/** @type {Vector} */
	var this$1$0;
	/** @type {!number} */
	var length$1$0;
	/** @type {Vector} */
	var this$2$0;
	/** @type {!number} */
	var length$2$0;
	/** @type {!number} */
	var sx$0;
	/** @type {!number} */
	var sy$0;
	/** @type {!number} */
	var sz$0;
	/** @type {!number} */
	var mz$0;
	/** @type {!number} */
	var m11$0;
	/** @type {!number} */
	var m12$0;
	/** @type {!number} */
	var m13$0;
	/** @type {!number} */
	var m14$0;
	/** @type {!number} */
	var m21$0;
	/** @type {!number} */
	var m22$0;
	/** @type {!number} */
	var m23$0;
	/** @type {!number} */
	var m24$0;
	/** @type {!number} */
	var m31$0;
	/** @type {!number} */
	var m32$0;
	/** @type {!number} */
	var m33$0;
	/** @type {!number} */
	var m34$0;
	/** @type {!number} */
	var m41$0;
	/** @type {!number} */
	var m42$0;
	/** @type {!number} */
	var m43$0;
	/** @type {!number} */
	var m44$0;
	/** @type {!number} */
	var x$0;
	/** @type {!number} */
	var y$0;
	/** @type {!number} */
	var z$0;
	/** @type {!number} */
	var z$1;
	/** @type {!number} */
	var z$2;
	/** @type {!number} */
	var x$1;
	/** @type {!number} */
	var y$1;
	/** @type {!number} */
	var y$2;
	/** @type {!number} */
	var x$2;
	/** @type {!number} */
	var x$3;
	/** @type {!number} */
	var y$3;
	/** @type {!number} */
	var z$3;
	/** @type {!number} */
	var z$4;
	/** @type {!number} */
	var z$5;
	/** @type {!number} */
	var x$4;
	/** @type {!number} */
	var y$4;
	/** @type {!number} */
	var y$5;
	/** @type {!number} */
	var x$5;
	/** @type {!number} */
	var x$6;
	/** @type {!number} */
	var y$6;
	/** @type {!number} */
	var z$6;
	/** @type {!number} */
	var x$7;
	/** @type {!number} */
	var y$7;
	/** @type {!number} */
	var z$7;
	/** @type {!number} */
	var x$8;
	/** @type {!number} */
	var x$9;
	/** @type {!number} */
	var y$8;
	/** @type {!number} */
	var y$9;
	/** @type {!number} */
	var z$8;
	/** @type {!number} */
	var z$9;
	/** @type {!number} */
	var x$10;
	/** @type {!number} */
	var y$10;
	/** @type {!number} */
	var z$10;
	/** @type {!number} */
	var _m11$0;
	/** @type {!number} */
	var _m12$0;
	/** @type {!number} */
	var _m13$0;
	/** @type {!number} */
	var _m14$0;
	/** @type {!number} */
	var _m11$1;
	/** @type {!number} */
	var _m21$0;
	/** @type {!number} */
	var _m31$0;
	/** @type {!number} */
	var _m41$0;
	/** @type {!number} */
	var _m21$1;
	/** @type {!number} */
	var _m12$1;
	/** @type {!number} */
	var _m22$0;
	/** @type {!number} */
	var _m22$1;
	/** @type {!number} */
	var _m23$0;
	/** @type {!number} */
	var _m32$0;
	/** @type {!number} */
	var _m24$0;
	/** @type {!number} */
	var _m42$0;
	/** @type {!number} */
	var _m13$1;
	/** @type {!number} */
	var _m23$1;
	/** @type {!number} */
	var _m33$0;
	/** @type {!number} */
	var _m43$0;
	/** @type {!number} */
	var _m14$1;
	/** @type {!number} */
	var _m24$1;
	/** @type {!number} */
	var _m34$0;
	/** @type {!number} */
	var _m44$0;
	/** @type {!number} */
	var _m31$1;
	/** @type {!number} */
	var _m32$1;
	/** @type {!number} */
	var _m33$1;
	/** @type {!number} */
	var _m34$1;
	/** @type {!number} */
	var _m41$1;
	/** @type {!number} */
	var _m42$1;
	/** @type {!number} */
	var _m43$1;
	/** @type {!number} */
	var _m44$1;
	view = this.view;
	target = this.target;
	upper = this.upper;
	fovyX = this.fovyX;
	nearZ = this.nearZ;
	farZ = this.farZ;
	aspectRatio = this.aspectRatio;
	this$0$0 = new Vector$NNN(target.x - view.x, target.y - view.y, target.z - view.z);
	length$0$0 = Math.sqrt((x$0 = this$0$0.x) * x$0 + (y$0 = this$0$0.y) * y$0 + (z$0 = this$0$0.z) * z$0);
	zaxis$0 = (length$0$0 < 1e-9 ? new Vector$NNN(0, 0, 0) : this$0$0.divSelf$N(length$0$0));
	this$1$0 = new Vector$NNN((y$2 = upper.y) * (z$2 = zaxis$0.z) - (z$1 = upper.z) * (y$1 = zaxis$0.y), z$1 * (x$2 = zaxis$0.x) - (x$1 = upper.x) * z$2, x$1 * y$1 - y$2 * x$2);
	length$1$0 = Math.sqrt((x$3 = this$1$0.x) * x$3 + (y$3 = this$1$0.y) * y$3 + (z$3 = this$1$0.z) * z$3);
	xaxis$0 = (length$1$0 < 1e-9 ? new Vector$NNN(0, 0, 0) : this$1$0.divSelf$N(length$1$0));
	this$2$0 = new Vector$NNN((y$5 = zaxis$0.y) * (z$5 = xaxis$0.z) - (z$4 = zaxis$0.z) * (y$4 = xaxis$0.y), z$4 * (x$5 = xaxis$0.x) - (x$4 = zaxis$0.x) * z$5, x$4 * y$4 - y$5 * x$5);
	length$2$0 = Math.sqrt((x$6 = this$2$0.x) * x$6 + (y$6 = this$2$0.y) * y$6 + (z$6 = this$2$0.z) * z$6);
	yaxis$0 = (length$2$0 < 1e-9 ? new Vector$NNN(0, 0, 0) : this$2$0.divSelf$N(length$2$0));
	viewMatrix = new Matrix$AN([ x$7 = xaxis$0.x, y$7 = xaxis$0.y, z$7 = xaxis$0.z, - (x$7 * (x$9 = view.x) + y$7 * (y$9 = view.y) + z$7 * (z$9 = view.z)), x$8 = yaxis$0.x, y$8 = yaxis$0.y, z$8 = yaxis$0.z, - (x$8 * x$9 + y$8 * y$9 + z$8 * z$9), x$10 = zaxis$0.x, y$10 = zaxis$0.y, z$10 = zaxis$0.z, - (x$10 * x$9 + y$10 * y$9 + z$10 * z$9), 0, 0, 0, 1 ]);
	sx$0 = 1 / Math.tan(fovyX / 2);
	sy$0 = sx$0 / aspectRatio;
	sz$0 = farZ / (farZ - nearZ);
	mz$0 = - sz$0 * nearZ;
	projectionMatrix = new Matrix$AN([ sx$0, 0, 0, 0, 0, sy$0, 0, 0, 0, 0, sz$0, mz$0, 0, 0, 1, 0 ]);
	this.viewMatrix = viewMatrix;
	this.projectionMatrix = projectionMatrix;
	m11$0 = (_m11$0 = projectionMatrix._m11) * (_m11$1 = viewMatrix._m11) + (_m12$0 = projectionMatrix._m12) * (_m21$0 = viewMatrix._m21) + (_m13$0 = projectionMatrix._m13) * (_m31$0 = viewMatrix._m31) + (_m14$0 = projectionMatrix._m14) * (_m41$0 = viewMatrix._m41);
	m12$0 = _m11$0 * (_m12$1 = viewMatrix._m12) + _m12$0 * (_m22$1 = viewMatrix._m22) + _m13$0 * (_m32$0 = viewMatrix._m32) + _m14$0 * (_m42$0 = viewMatrix._m42);
	m13$0 = _m11$0 * (_m13$1 = viewMatrix._m13) + _m12$0 * (_m23$1 = viewMatrix._m23) + _m13$0 * (_m33$0 = viewMatrix._m33) + _m14$0 * (_m43$0 = viewMatrix._m43);
	m14$0 = _m11$0 * (_m14$1 = viewMatrix._m14) + _m12$0 * (_m24$1 = viewMatrix._m24) + _m13$0 * (_m34$0 = viewMatrix._m34) + _m14$0 * (_m44$0 = viewMatrix._m44);
	m21$0 = (_m21$1 = projectionMatrix._m21) * _m11$1 + (_m22$0 = projectionMatrix._m22) * _m21$0 + (_m23$0 = projectionMatrix._m23) * _m31$0 + (_m24$0 = projectionMatrix._m24) * _m41$0;
	m22$0 = _m21$1 * _m12$1 + _m22$0 * _m22$1 + _m23$0 * _m32$0 + _m24$0 * _m42$0;
	m23$0 = _m21$1 * _m13$1 + _m22$0 * _m23$1 + _m23$0 * _m33$0 + _m24$0 * _m43$0;
	m24$0 = _m21$1 * _m14$1 + _m22$0 * _m24$1 + _m23$0 * _m34$0 + _m24$0 * _m44$0;
	m31$0 = (_m31$1 = projectionMatrix._m31) * _m11$1 + (_m32$1 = projectionMatrix._m32) * _m21$0 + (_m33$1 = projectionMatrix._m33) * _m31$0 + (_m34$1 = projectionMatrix._m34) * _m41$0;
	m32$0 = _m31$1 * _m12$1 + _m32$1 * _m22$1 + _m33$1 * _m32$0 + _m34$1 * _m42$0;
	m33$0 = _m31$1 * _m13$1 + _m32$1 * _m23$1 + _m33$1 * _m33$0 + _m34$1 * _m43$0;
	m34$0 = _m31$1 * _m14$1 + _m32$1 * _m24$1 + _m33$1 * _m34$0 + _m34$1 * _m44$0;
	m41$0 = (_m41$1 = projectionMatrix._m41) * _m11$1 + (_m42$1 = projectionMatrix._m42) * _m21$0 + (_m43$1 = projectionMatrix._m43) * _m31$0 + (_m44$1 = projectionMatrix._m44) * _m41$0;
	m42$0 = _m41$1 * _m12$1 + _m42$1 * _m22$1 + _m43$1 * _m32$0 + _m44$1 * _m42$0;
	m43$0 = _m41$1 * _m13$1 + _m42$1 * _m23$1 + _m43$1 * _m33$0 + _m44$1 * _m43$0;
	m44$0 = _m41$1 * _m14$1 + _m42$1 * _m24$1 + _m43$1 * _m34$0 + _m44$1 * _m44$0;
	this.matrix = new Matrix$AN([ m11$0, m12$0, m13$0, m14$0, m21$0, m22$0, m23$0, m24$0, m31$0, m32$0, m33$0, m34$0, m41$0, m42$0, m43$0, m44$0 ]);
};

/**
 * class Color extends Object
 * @constructor
 */
function Color() {
}

Color.prototype = new Object;
/**
 * @constructor
 * @param {!number} r
 * @param {!number} g
 * @param {!number} b
 */
function Color$III(r, g, b) {
	this.r = r;
	this.g = g;
	this.b = b;
};

Color$III.prototype = new Color;

/**
 * @param {!number} value
 * @return {!string}
 */
Color.prototype._to2DigitHex$I = function (value) {
	/** @type {!string} */
	var str;
	str = Math.floor(value).toString(16);
	if (str.length === 1) {
		str = '0' + str;
	}
	return str;
};

/**
 * @return {!string}
 */
Color.prototype.toHexString$ = function () {
	return this._to2DigitHex$I(this.r) + this._to2DigitHex$I(this.g) + this._to2DigitHex$I(this.b);
};

/**
 * @return {!string}
 */
Color.prototype.toString = function () {
	return '#' + this._to2DigitHex$I(this.r) + this._to2DigitHex$I(this.g) + this._to2DigitHex$I(this.b);
};

/**
 * class Renderable extends Object
 * @constructor
 */
function Renderable() {
}

Renderable.prototype = new Object;
/**
 * @constructor
 */
function Renderable$() {
	this.center = null;
	this.vCenter = null;
};

Renderable$.prototype = new Renderable;

/**
 * @param {Array.<undefined|Vector>} vertices
 * @param {Engine} engine
 * @return {!boolean}
 */
Renderable.isHiddenXY$ALVector$LEngine$ = function (vertices, engine) {
	/** @type {!number} */
	var margin;
	/** @type {!number} */
	var i;
	/** @type {Vector} */
	var v;
	/** @type {!number} */
	var x$0;
	/** @type {!number} */
	var y$0;
	/** @type {!number} */
	var vertices$len$0;
	margin = 0;
	for ((i = 0, vertices$len$0 = vertices.length); i < vertices$len$0; i++) {
		v = vertices[i];
		if (- margin < (x$0 = v.x) && x$0 < engine._width + margin && - margin < (y$0 = v.y) && y$0 < engine._height + margin) {
			return false;
		}
	}
	return true;
};

var Renderable$isHiddenXY$ALVector$LEngine$ = Renderable.isHiddenXY$ALVector$LEngine$;

/**
 * class Polygon extends Renderable
 * @constructor
 */
function Polygon() {
}

Polygon.prototype = new Renderable;
/**
 * @constructor
 * @param {Array.<undefined|Vector>} vertices
 * @param {Color} color
 */
function Polygon$ALVector$LColor$(vertices, color) {
	this.center = null;
	this.vCenter = null;
	this.vVertices = null;
	this.vertices = vertices;
	this._color = color;
	this._enabledLighting = true;
	this.updateCenter$();
};

Polygon$ALVector$LColor$.prototype = new Polygon;

/**
 * @param {Matrix} worldMatrix
 */
Polygon.prototype.applyWorldMatrix$LMatrix$ = function (worldMatrix) {
	/** @type {!number} */
	var i;
	/** @type {Vector} */
	var this$0;
	/** @type {!number} */
	var x$0;
	/** @type {!number} */
	var y$0;
	/** @type {!number} */
	var z$0;
	/** @type {!number} */
	var w$0;
	/** @type {!number} */
	var x$1;
	/** @type {!number} */
	var y$1;
	/** @type {!number} */
	var z$1;
	/** @type {!number} */
	var w$1;
	for (i = 0; i < this.vertices.length; i++) {
		this$0 = this.vertices[i];
		x$0 = worldMatrix._m11 * (x$1 = this$0.x) + worldMatrix._m12 * (y$1 = this$0.y) + worldMatrix._m13 * (z$1 = this$0.z) + worldMatrix._m14 * (w$1 = this$0.w);
		y$0 = worldMatrix._m21 * x$1 + worldMatrix._m22 * y$1 + worldMatrix._m23 * z$1 + worldMatrix._m24 * w$1;
		z$0 = worldMatrix._m31 * x$1 + worldMatrix._m32 * y$1 + worldMatrix._m33 * z$1 + worldMatrix._m34 * w$1;
		w$0 = worldMatrix._m41 * x$1 + worldMatrix._m42 * y$1 + worldMatrix._m43 * z$1 + worldMatrix._m44 * w$1;
		this$0.x = x$0 / w$0;
		this$0.y = y$0 / w$0;
		this$0.z = z$0 / w$0;
		this$0.w = 1;
	}
	this.updateCenter$();
};

/**
 * @param {Matrix} viewMatrix
 */
Polygon.prototype.applyViewMatrix$LMatrix$ = function (viewMatrix) {
	/** @type {Array.<undefined|Vector>} */
	var vVertices;
	/** @type {!number} */
	var i;
	/** @type {Vector} */
	var vVertex;
	/** @type {Vector} */
	var this$0;
	/** @type {!number} */
	var x$0;
	/** @type {!number} */
	var y$0;
	/** @type {!number} */
	var z$0;
	/** @type {!number} */
	var w$0;
	/** @type {!number} */
	var other$0;
	/** @type {!number} */
	var x$1;
	/** @type {!number} */
	var y$1;
	/** @type {!number} */
	var z$1;
	/** @type {!number} */
	var w$1;
	/** @type {!number} */
	var vSumPos$x$0;
	/** @type {!number} */
	var vSumPos$y$0;
	/** @type {!number} */
	var vSumPos$z$0;
	/** @type {!number} */
	var vSumPos$w$0;
	vVertices = [  ];
	vSumPos$x$0 = 0;
	vSumPos$y$0 = 0;
	vSumPos$z$0 = 0;
	vSumPos$w$0 = 1;
	for (i = 0; i < this.vertices.length; i++) {
		this$0 = this.vertices[i];
		x$0 = viewMatrix._m11 * (x$1 = this$0.x) + viewMatrix._m12 * (y$1 = this$0.y) + viewMatrix._m13 * (z$1 = this$0.z) + viewMatrix._m14 * (w$1 = this$0.w);
		y$0 = viewMatrix._m21 * x$1 + viewMatrix._m22 * y$1 + viewMatrix._m23 * z$1 + viewMatrix._m24 * w$1;
		z$0 = viewMatrix._m31 * x$1 + viewMatrix._m32 * y$1 + viewMatrix._m33 * z$1 + viewMatrix._m34 * w$1;
		w$0 = viewMatrix._m41 * x$1 + viewMatrix._m42 * y$1 + viewMatrix._m43 * z$1 + viewMatrix._m44 * w$1;
		vVertex = new Vector$NNNN(x$0, y$0, z$0, w$0);
		vVertices.push(vVertex);
		vSumPos$x$0 += vVertex.x;
		vSumPos$y$0 += vVertex.y;
		vSumPos$z$0 += vVertex.z;
	}
	other$0 = this.vertices.length;
	this.vCenter = new Vector$NNN(vSumPos$x$0 / other$0, vSumPos$y$0 / other$0, vSumPos$z$0 / other$0);
	this.vVertices = vVertices;
};

/**
 * @param {Camera} camera
 * @return {!boolean}
 */
Polygon.prototype.isHidden$LCamera$ = function (camera) {
	/** @type {!number} */
	var z$0;
	/** @type {Vector} */
	var vCenter$0;
	return (camera.nearZ < (z$0 = (vCenter$0 = this.vCenter).z) && z$0 < camera.farZ ? false : true);
};

/**
 * @param {Vector} v
 */
Polygon.prototype.move$LVector$ = function (v) {
	/** @type {!number} */
	var i;
	/** @type {Vector} */
	var this$0;
	for (i = 0; i < this.vertices.length; i++) {
		this$0 = this.vertices[i];
		this$0.x += v.x;
		this$0.y += v.y;
		this$0.z += v.z;
	}
	this.updateCenter$();
};

/**
 */
Polygon.prototype.updateCenter$ = function () {
	/** @type {!number} */
	var i;
	/** @type {Vector} */
	var other$0;
	/** @type {!number} */
	var other$1;
	/** @type {!number} */
	var sumVector$x$0;
	/** @type {!number} */
	var sumVector$y$0;
	/** @type {!number} */
	var sumVector$z$0;
	/** @type {!number} */
	var sumVector$w$0;
	sumVector$x$0 = 0;
	sumVector$y$0 = 0;
	sumVector$z$0 = 0;
	sumVector$w$0 = 1;
	for (i = 0; i < this.vertices.length; i++) {
		other$0 = this.vertices[i];
		sumVector$x$0 += other$0.x;
		sumVector$y$0 += other$0.y;
		sumVector$z$0 += other$0.z;
	}
	other$1 = this.vertices.length;
	this.center = new Vector$NNN(sumVector$x$0 / other$1, sumVector$y$0 / other$1, sumVector$z$0 / other$1);
};

/**
 * @return {!string}
 */
Polygon.prototype.toString = function () {
	/** @type {!string} */
	var str;
	/** @type {!number} */
	var i;
	str = '[';
	for (i = 0; i < this.vertices.length; i++) {
		str += this.vertices[i].toString() + ',';
	}
	str += ']';
	return str;
};

/**
 * @param {Engine} engine
 * @return {!boolean}
 */
Polygon.prototype.draw$LEngine$ = function (engine) {
	var $this = this;
	/** @type {CanvasRenderingContext2D} */
	var context;
	/** @type {!number} */
	var len;
	/** @type {Array.<undefined|Vector>} */
	var verts;
	/** @type {Color} */
	var color;
	/** @type {!number} */
	var i;
	/** @type {!boolean} */
	var isHiddenXY;
	/** @type {!number} */
	var i1;
	/** @type {!number} */
	var i2;
	/** @type {!string} */
	var colorStr;
	/** @type {!number} */
	var x;
	/** @type {!number} */
	var y;
	/** @type {Vector} */
	var center$0;
	/** @type {Vector} */
	var v2$0;
	/** @type {Vector} */
	var norm$0;
	/** @type {!number} */
	var lightPower$0;
	/** @type {!number} */
	var r$0;
	/** @type {!number} */
	var g$0;
	/** @type {!number} */
	var b$0;
	/** @type {Vector} */
	var this$0$0;
	/** @type {Vector} */
	var this$1$0;
	/** @type {Vector} */
	var this$2$0;
	/** @type {!number} */
	var length$0$0;
	/** @type {Vector} */
	var other$0$0;
	/** @type {!number} */
	var value2$0$0;
	/** @type {!number} */
	var value2$1$0;
	/** @type {!number} */
	var value2$2$0;
	/** @type {!number} */
	var x$0$0;
	/** @type {!number} */
	var y$0$0;
	/** @type {!number} */
	var z$0$0;
	/** @type {!number} */
	var length$1$0;
	/** @type {Vector} */
	var this$0;
	/** @type {Matrix} */
	var m$0;
	/** @type {!number} */
	var x$0;
	/** @type {!number} */
	var y$0;
	/** @type {!number} */
	var z$0;
	/** @type {!number} */
	var w$0;
	/** @type {Vector} */
	var this$1;
	/** @type {Matrix} */
	var m$1;
	/** @type {!number} */
	var x$1;
	/** @type {!number} */
	var y$1;
	/** @type {!number} */
	var z$1;
	/** @type {!number} */
	var w$1;
	/** @type {!number} */
	var z$2;
	/** @type {!number} */
	var z$3;
	/** @type {!number} */
	var x$2;
	/** @type {!number} */
	var y$2;
	/** @type {!number} */
	var y$3;
	/** @type {!number} */
	var x$3;
	/** @type {!number} */
	var x$4;
	/** @type {!number} */
	var y$4;
	/** @type {!number} */
	var z$4;
	/** @type {!number} */
	var x$5;
	/** @type {!number} */
	var y$5;
	/** @type {!number} */
	var z$5;
	/** @type {!number} */
	var x$6;
	/** @type {!number} */
	var y$6;
	/** @type {!number} */
	var z$6;
	/** @type {!number} */
	var w$2;
	/** @type {!number} */
	var x$7;
	/** @type {!number} */
	var y$7;
	/** @type {!number} */
	var z$7;
	/** @type {!number} */
	var w$3;
	/** @type {!number} */
	var verts$len$0;
	/** @type {!number} */
	var v1$0$x$0;
	/** @type {!number} */
	var v1$0$y$0;
	/** @type {!number} */
	var v1$0$z$0;
	/** @type {!number} */
	var v1$0$w$0;
	context = engine.context;
	len = this.vertices.length;
	verts = this.vVertices;
	color = this._color;
	if (this._enabledLighting) {
		center$0 = this.vCenter;
		this$0$0 = verts[0];
		v1$0$x$0 = this$0$0.x - center$0.x;
		v1$0$y$0 = this$0$0.y - center$0.y;
		v1$0$z$0 = this$0$0.z - center$0.z;
		v1$0$w$0 = 1;
		this$1$0 = verts[1];
		v2$0 = new Vector$NNN(this$1$0.x - center$0.x, this$1$0.y - center$0.y, this$1$0.z - center$0.z);
		x$0$0 = (y$3 = v2$0.y) * (z$3 = v1$0$z$0) - (z$2 = v2$0.z) * (y$2 = v1$0$y$0);
		y$0$0 = z$2 * (x$3 = v1$0$x$0) - (x$2 = v2$0.x) * z$3;
		z$0$0 = x$2 * y$2 - y$3 * x$3;
		x$4 = v2$0.x = x$0$0;
		y$4 = v2$0.y = y$0$0;
		z$4 = v2$0.z = z$0$0;
		this$2$0 = v2$0;
		length$0$0 = Math.sqrt(x$4 * x$4 + y$4 * y$4 + z$4 * z$4);
		norm$0 = (length$0$0 < 1e-9 ? new Vector$NNN(0, 0, 0) : this$2$0.divSelf$N(length$0$0));
		length$1$0 = Math.sqrt((x$5 = center$0.x) * x$5 + (y$5 = center$0.y) * y$5 + (z$5 = center$0.z) * z$5);
		other$0$0 = (length$1$0 < 1e-9 ? new Vector$NNN(0, 0, 0) : new Vector$NNN(center$0.x / length$1$0, center$0.y / length$1$0, center$0.z / length$1$0));
		lightPower$0 = norm$0.x * other$0$0.x + norm$0.y * other$0$0.y + norm$0.z * other$0$0.z;
		value2$0$0 = (0.5599999999999999 * lightPower$0 + 0.5) * color.r;
		r$0 = (255 <= value2$0$0 ? 255 : value2$0$0);
		value2$1$0 = (0.5599999999999999 * lightPower$0 + 0.5) * color.g;
		g$0 = (255 <= value2$1$0 ? 255 : value2$1$0);
		value2$2$0 = (0.5599999999999999 * lightPower$0 + 0.5) * color.b;
		b$0 = (255 <= value2$2$0 ? 255 : value2$2$0);
		color = new Color$III(r$0, g$0, b$0);
	}
	for (i = 0; i < len; i++) {
		this$0 = verts[i];
		m$0 = engine.camera.projectionMatrix;
		x$0 = m$0._m11 * (x$6 = this$0.x) + m$0._m12 * (y$6 = this$0.y) + m$0._m13 * (z$6 = this$0.z) + m$0._m14 * (w$2 = this$0.w);
		y$0 = m$0._m21 * x$6 + m$0._m22 * y$6 + m$0._m23 * z$6 + m$0._m24 * w$2;
		z$0 = m$0._m31 * x$6 + m$0._m32 * y$6 + m$0._m33 * z$6 + m$0._m34 * w$2;
		w$0 = m$0._m41 * x$6 + m$0._m42 * y$6 + m$0._m43 * z$6 + m$0._m44 * w$2;
		this$0.x = x$0 / w$0;
		this$0.y = y$0 / w$0;
		this$0.z = z$0 / w$0;
		this$0.w = 1;
	}
	for (i = 0; i < len; i++) {
		this$1 = verts[i];
		m$1 = engine.screenMatrix;
		x$1 = m$1._m11 * (x$7 = this$1.x) + m$1._m12 * (y$7 = this$1.y) + m$1._m13 * (z$7 = this$1.z) + m$1._m14 * (w$3 = this$1.w);
		y$1 = m$1._m21 * x$7 + m$1._m22 * y$7 + m$1._m23 * z$7 + m$1._m24 * w$3;
		z$1 = m$1._m31 * x$7 + m$1._m32 * y$7 + m$1._m33 * z$7 + m$1._m34 * w$3;
		w$1 = m$1._m41 * x$7 + m$1._m42 * y$7 + m$1._m43 * z$7 + m$1._m44 * w$3;
		this$1.x = x$1 / w$1;
		this$1.y = y$1 / w$1;
		this$1.z = z$1 / w$1;
		this$1.w = 1;
	}
	isHiddenXY = Renderable$isHiddenXY$ALVector$LEngine$(verts, engine);
	if (isHiddenXY) {
		return false;
	}
	for ((i = 0, verts$len$0 = verts.length); i < verts$len$0; i++) {
		i1 = (i + 1) % verts$len$0;
		i2 = (i + 2) % verts$len$0;
		if (Math2D$cross$NNNN(verts[i1].x - verts[i].x, verts[i1].y - verts[i].y, verts[i2].x - verts[i].x, verts[i2].y - verts[i].y) < 0) {
			return false;
		}
	}
	colorStr = '#' + (color._to2DigitHex$I(color.r) + color._to2DigitHex$I(color.g) + color._to2DigitHex$I(color.b));
	context.strokeStyle = colorStr;
	for (i = 0; i < len; i++) {
		context.beginPath();
		context.moveTo(verts[i].x, verts[i].y);
		context.lineTo(verts[(i + 1) % len].x, verts[(i + 1) % len].y);
		context.stroke();
	}
	context.fillStyle = colorStr;
	context.beginPath();
	for (i = 0; i < len; i++) {
		x = verts[i].x;
		y = verts[i].y;
		context.lineTo(x, y);
	}
	context.closePath();
	context.fill();
	return true;
};

/**
 * class PolygonGroup extends Renderable
 * @constructor
 */
function PolygonGroup() {
}

PolygonGroup.prototype = new Renderable;
/**
 * @constructor
 * @param {List$Polygon$E} polygons
 * @param {Vector} center
 */
function PolygonGroup$LList$Polygon$E$LVector$(polygons, center) {
	this.vCenter = null;
	this.polygons = polygons;
	this.center = center;
	this._ignoringZHidden = false;
};

PolygonGroup$LList$Polygon$E$LVector$.prototype = new PolygonGroup;

/**
 * @constructor
 * @param {List$Polygon$E} polygons
 * @param {Vector} center
 * @param {!boolean} ignoringZHidden
 */
function PolygonGroup$LList$Polygon$E$LVector$B(polygons, center, ignoringZHidden) {
	this.vCenter = null;
	this.polygons = polygons;
	this.center = center;
	this._ignoringZHidden = ignoringZHidden;
};

PolygonGroup$LList$Polygon$E$LVector$B.prototype = new PolygonGroup;

/**
 * @param {Matrix} worldMatrix
 */
PolygonGroup.prototype.applyWorldMatrix$LMatrix$ = function (worldMatrix) {
	/** @type {Vector} */
	var this$0;
	/** @type {!number} */
	var x$0;
	/** @type {!number} */
	var y$0;
	/** @type {!number} */
	var z$0;
	/** @type {!number} */
	var w$0;
	/** @type {!number} */
	var x$1;
	/** @type {!number} */
	var y$1;
	/** @type {!number} */
	var z$1;
	/** @type {!number} */
	var w$1;
	this$0 = this.center;
	x$0 = worldMatrix._m11 * (x$1 = this$0.x) + worldMatrix._m12 * (y$1 = this$0.y) + worldMatrix._m13 * (z$1 = this$0.z) + worldMatrix._m14 * (w$1 = this$0.w);
	y$0 = worldMatrix._m21 * x$1 + worldMatrix._m22 * y$1 + worldMatrix._m23 * z$1 + worldMatrix._m24 * w$1;
	z$0 = worldMatrix._m31 * x$1 + worldMatrix._m32 * y$1 + worldMatrix._m33 * z$1 + worldMatrix._m34 * w$1;
	w$0 = worldMatrix._m41 * x$1 + worldMatrix._m42 * y$1 + worldMatrix._m43 * z$1 + worldMatrix._m44 * w$1;
	this$0.x = x$0 / w$0;
	this$0.y = y$0 / w$0;
	this$0.z = z$0 / w$0;
	this$0.w = 1;
};

/**
 * @param {Matrix} viewMatrix
 */
PolygonGroup.prototype.applyViewMatrix$LMatrix$ = function (viewMatrix) {
	/** @type {Vector} */
	var this$0;
	/** @type {!number} */
	var x$0;
	/** @type {!number} */
	var y$0;
	/** @type {!number} */
	var z$0;
	/** @type {!number} */
	var w$0;
	/** @type {!number} */
	var x$1;
	/** @type {!number} */
	var y$1;
	/** @type {!number} */
	var z$1;
	/** @type {!number} */
	var w$1;
	this$0 = this.center;
	x$0 = viewMatrix._m11 * (x$1 = this$0.x) + viewMatrix._m12 * (y$1 = this$0.y) + viewMatrix._m13 * (z$1 = this$0.z) + viewMatrix._m14 * (w$1 = this$0.w);
	y$0 = viewMatrix._m21 * x$1 + viewMatrix._m22 * y$1 + viewMatrix._m23 * z$1 + viewMatrix._m24 * w$1;
	z$0 = viewMatrix._m31 * x$1 + viewMatrix._m32 * y$1 + viewMatrix._m33 * z$1 + viewMatrix._m34 * w$1;
	w$0 = viewMatrix._m41 * x$1 + viewMatrix._m42 * y$1 + viewMatrix._m43 * z$1 + viewMatrix._m44 * w$1;
	this.vCenter = new Vector$NNNN(x$0, y$0, z$0, w$0);
};

/**
 * @param {Camera} camera
 * @return {!boolean}
 */
PolygonGroup.prototype.isHidden$LCamera$ = function (camera) {
	return (this._ignoringZHidden ? false : camera.nearZ < this.vCenter.z && this.vCenter.z < camera.farZ ? false : true);
};

/**
 * @param {Engine} engine
 * @return {!boolean}
 */
PolygonGroup.prototype.draw$LEngine$ = function (engine) {
	var $this = this;
	/** @type {List$Polygon$E} */
	var polygons;
	polygons = this.polygons;
	polygons.forEach$F$LPolygon$V$((function (polygon) {
		if (polygon.isHidden$LCamera$(engine.camera)) {
			return;
		}
		polygon.draw$LEngine$(engine);
	}));
	return true;
};

/**
 * class SmoothTexture extends Polygon
 * @constructor
 */
function SmoothTexture() {
}

SmoothTexture.prototype = new Polygon;
/**
 * @constructor
 * @param {Array.<undefined|Vector>} vertices
 * @param {!string} src
 */
function SmoothTexture$ALVector$S(vertices, src) {
	SmoothTexture$ALVector$SIIII.call(this, vertices, src, 6, 6, 4, 2);
};

SmoothTexture$ALVector$S.prototype = new SmoothTexture;

/**
 * @constructor
 * @param {Array.<undefined|Vector>} vertices
 * @param {!string} src
 * @param {!number} maxHorDiv
 * @param {!number} maxVerDiv
 * @param {!number} maxDiv
 * @param {!number} minDiv
 */
function SmoothTexture$ALVector$SIIII(vertices, src, maxHorDiv, maxVerDiv, maxDiv, minDiv) {
	/** @type {Color} */
	var color$0;
	/** @type {!number} */
	var x$0;
	/** @type {!number} */
	var x$1;
	/** @type {Vector} */
	var this$2;
	/** @type {Vector} */
	var other$0;
	/** @type {Vector} */
	var this$3;
	/** @type {Vector} */
	var other$1;
	/** @type {!number} */
	var x$2;
	/** @type {!number} */
	var y$0;
	/** @type {!number} */
	var z$0;
	/** @type {!number} */
	var x$3;
	/** @type {!number} */
	var y$1;
	/** @type {!number} */
	var z$1;
	/** @type {!number} */
	var this$0$x$0;
	/** @type {!number} */
	var this$0$y$0;
	/** @type {!number} */
	var this$0$z$0;
	/** @type {!number} */
	var this$0$w$0;
	/** @type {!number} */
	var this$1$x$0;
	/** @type {!number} */
	var this$1$y$0;
	/** @type {!number} */
	var this$1$z$0;
	/** @type {!number} */
	var this$1$w$0;
	color$0 = new Color$III(0, 0, 0);
	this.center = null;
	this.vCenter = null;
	this.vVertices = null;
	this.vertices = vertices;
	this._color = color$0;
	this._enabledLighting = true;
	this.updateCenter$();
	this._src = src;
	this._image = Engine.images[src];
	this.vertices = vertices;
	this$2 = vertices[1];
	other$0 = vertices[0];
	this$0$x$0 = this$2.x - other$0.x;
	this$0$y$0 = this$2.y - other$0.y;
	this$0$z$0 = this$2.z - other$0.z;
	this$0$w$0 = 1;
	x$0 = Math.sqrt((x$2 = this$0$x$0) * x$2 + (y$0 = this$0$y$0) * y$0 + (z$0 = this$0$z$0) * z$0);
	this._width = (x$0 >= 0 ? x$0 : - x$0);
	this$3 = vertices[2];
	other$1 = vertices[1];
	this$1$x$0 = this$3.x - other$1.x;
	this$1$y$0 = this$3.y - other$1.y;
	this$1$z$0 = this$3.z - other$1.z;
	this$1$w$0 = 1;
	x$1 = Math.sqrt((x$3 = this$1$x$0) * x$3 + (y$1 = this$1$y$0) * y$1 + (z$1 = this$1$z$0) * z$1);
	this._height = (x$1 >= 0 ? x$1 : - x$1);
	this._maxHorizontalDiv = maxHorDiv;
	this._maxVerticalDiv = maxVerDiv;
	this._maxDiv = maxDiv;
	this._minDiv = minDiv;
	this.updateCenter$();
};

SmoothTexture$ALVector$SIIII.prototype = new SmoothTexture;

/**
 * @param {Matrix} worldMatrix
 */
SmoothTexture.prototype.applyWorldMatrix$LMatrix$ = function (worldMatrix) {
	/** @type {!number} */
	var i;
	/** @type {Vector} */
	var this$0;
	/** @type {!number} */
	var x$0;
	/** @type {!number} */
	var y$0;
	/** @type {!number} */
	var z$0;
	/** @type {!number} */
	var w$0;
	/** @type {Vector} */
	var this$1;
	/** @type {!number} */
	var x$1;
	/** @type {!number} */
	var y$1;
	/** @type {!number} */
	var z$1;
	/** @type {!number} */
	var w$1;
	/** @type {!number} */
	var x$2;
	/** @type {!number} */
	var y$2;
	/** @type {!number} */
	var z$2;
	/** @type {!number} */
	var w$2;
	/** @type {!number} */
	var x$3;
	/** @type {!number} */
	var y$3;
	/** @type {!number} */
	var z$3;
	/** @type {!number} */
	var w$3;
	for (i = 0; i < this.vertices.length; i++) {
		this$0 = this.vertices[i];
		x$0 = worldMatrix._m11 * (x$2 = this$0.x) + worldMatrix._m12 * (y$2 = this$0.y) + worldMatrix._m13 * (z$2 = this$0.z) + worldMatrix._m14 * (w$2 = this$0.w);
		y$0 = worldMatrix._m21 * x$2 + worldMatrix._m22 * y$2 + worldMatrix._m23 * z$2 + worldMatrix._m24 * w$2;
		z$0 = worldMatrix._m31 * x$2 + worldMatrix._m32 * y$2 + worldMatrix._m33 * z$2 + worldMatrix._m34 * w$2;
		w$0 = worldMatrix._m41 * x$2 + worldMatrix._m42 * y$2 + worldMatrix._m43 * z$2 + worldMatrix._m44 * w$2;
		this$0.x = x$0 / w$0;
		this$0.y = y$0 / w$0;
		this$0.z = z$0 / w$0;
		this$0.w = 1;
	}
	this$1 = this.center;
	x$1 = worldMatrix._m11 * (x$3 = this$1.x) + worldMatrix._m12 * (y$3 = this$1.y) + worldMatrix._m13 * (z$3 = this$1.z) + worldMatrix._m14 * (w$3 = this$1.w);
	y$1 = worldMatrix._m21 * x$3 + worldMatrix._m22 * y$3 + worldMatrix._m23 * z$3 + worldMatrix._m24 * w$3;
	z$1 = worldMatrix._m31 * x$3 + worldMatrix._m32 * y$3 + worldMatrix._m33 * z$3 + worldMatrix._m34 * w$3;
	w$1 = worldMatrix._m41 * x$3 + worldMatrix._m42 * y$3 + worldMatrix._m43 * z$3 + worldMatrix._m44 * w$3;
	this$1.x = x$1 / w$1;
	this$1.y = y$1 / w$1;
	this$1.z = z$1 / w$1;
	this$1.w = 1;
};

/**
 * @param {Matrix} viewMatrix
 */
SmoothTexture.prototype.applyViewMatrix$LMatrix$ = function (viewMatrix) {
	/** @type {Array.<undefined|Vector>} */
	var vVertices;
	/** @type {!number} */
	var i;
	/** @type {Vector} */
	var this$0;
	/** @type {!number} */
	var x$0;
	/** @type {!number} */
	var y$0;
	/** @type {!number} */
	var z$0;
	/** @type {!number} */
	var w$0;
	/** @type {!number} */
	var x$1;
	/** @type {!number} */
	var y$1;
	/** @type {!number} */
	var z$1;
	/** @type {!number} */
	var w$1;
	vVertices = [  ];
	for (i = 0; i < this.vertices.length; i++) {
		vVertices.push(this.vertices[i].transform$LMatrix$(viewMatrix));
	}
	this.vVertices = vVertices;
	this$0 = this.center;
	x$0 = viewMatrix._m11 * (x$1 = this$0.x) + viewMatrix._m12 * (y$1 = this$0.y) + viewMatrix._m13 * (z$1 = this$0.z) + viewMatrix._m14 * (w$1 = this$0.w);
	y$0 = viewMatrix._m21 * x$1 + viewMatrix._m22 * y$1 + viewMatrix._m23 * z$1 + viewMatrix._m24 * w$1;
	z$0 = viewMatrix._m31 * x$1 + viewMatrix._m32 * y$1 + viewMatrix._m33 * z$1 + viewMatrix._m34 * w$1;
	w$0 = viewMatrix._m41 * x$1 + viewMatrix._m42 * y$1 + viewMatrix._m43 * z$1 + viewMatrix._m44 * w$1;
	this.vCenter = new Vector$NNNN(x$0, y$0, z$0, w$0);
};

/**
 * @param {Camera} camera
 * @return {!boolean}
 */
SmoothTexture.prototype.isHidden$LCamera$ = function (camera) {
	/** @type {!number} */
	var z$0;
	/** @type {Vector} */
	var vCenter$0;
	return (camera.nearZ < (z$0 = (vCenter$0 = this.vCenter).z) && z$0 < camera.farZ ? false : true);
};

/**
 * @param {Engine} engine
 * @return {!boolean}
 */
SmoothTexture.prototype.draw$LEngine$ = function (engine) {
	var $this = this;
	/** @type {CanvasRenderingContext2D} */
	var context;
	/** @type {Vector} */
	var wltImage;
	/** @type {Vector} */
	var wlbImage;
	/** @type {Vector} */
	var wrbImage;
	/** @type {Vector} */
	var wrtImage;
	/** @type {Vector} */
	var sltImage;
	/** @type {Vector} */
	var slbImage;
	/** @type {Vector} */
	var srbImage;
	/** @type {Vector} */
	var srtImage;
	/** @type {!boolean} */
	var isHiddenXY;
	var divideAndDrawImage;
	/** @type {Matrix} */
	var this$0;
	/** @type {!number} */
	var m11$0;
	/** @type {!number} */
	var m12$0;
	/** @type {!number} */
	var m13$0;
	/** @type {!number} */
	var m14$0;
	/** @type {!number} */
	var m21$0;
	/** @type {!number} */
	var m22$0;
	/** @type {!number} */
	var m23$0;
	/** @type {!number} */
	var m24$0;
	/** @type {!number} */
	var m31$0;
	/** @type {!number} */
	var m32$0;
	/** @type {!number} */
	var m33$0;
	/** @type {!number} */
	var m34$0;
	/** @type {!number} */
	var m41$0;
	/** @type {!number} */
	var m42$0;
	/** @type {!number} */
	var m43$0;
	/** @type {!number} */
	var m44$0;
	/** @type {!number} */
	var x$0;
	/** @type {!number} */
	var y$0;
	/** @type {!number} */
	var z$0;
	/** @type {!number} */
	var w$0;
	/** @type {!number} */
	var x$1;
	/** @type {!number} */
	var y$1;
	/** @type {!number} */
	var z$1;
	/** @type {!number} */
	var w$1;
	/** @type {!number} */
	var x$2;
	/** @type {!number} */
	var y$2;
	/** @type {!number} */
	var z$2;
	/** @type {!number} */
	var w$2;
	/** @type {!number} */
	var x$3;
	/** @type {!number} */
	var y$3;
	/** @type {!number} */
	var z$3;
	/** @type {!number} */
	var w$3;
	/** @type {Matrix} */
	var this$1;
	/** @type {Matrix} */
	var other$1;
	/** @type {!number} */
	var m11$1;
	/** @type {!number} */
	var m12$1;
	/** @type {!number} */
	var m13$1;
	/** @type {!number} */
	var m14$1;
	/** @type {!number} */
	var m21$1;
	/** @type {!number} */
	var m22$1;
	/** @type {!number} */
	var m23$1;
	/** @type {!number} */
	var m24$1;
	/** @type {!number} */
	var m31$1;
	/** @type {!number} */
	var m32$1;
	/** @type {!number} */
	var m33$1;
	/** @type {!number} */
	var m34$1;
	/** @type {!number} */
	var m41$1;
	/** @type {!number} */
	var m42$1;
	/** @type {!number} */
	var m43$1;
	/** @type {!number} */
	var m44$1;
	/** @type {Array.<undefined|Vector>} */
	var vertices$0;
	/** @type {Camera} */
	var camera$0;
	/** @type {!number} */
	var _m11$0;
	/** @type {!number} */
	var _m12$0;
	/** @type {!number} */
	var _m13$0;
	/** @type {!number} */
	var _m14$0;
	/** @type {!number} */
	var _m11$1;
	/** @type {!number} */
	var _m21$0;
	/** @type {!number} */
	var _m31$0;
	/** @type {!number} */
	var _m41$0;
	/** @type {!number} */
	var _m21$1;
	/** @type {!number} */
	var _m12$1;
	/** @type {!number} */
	var _m22$0;
	/** @type {!number} */
	var _m22$1;
	/** @type {!number} */
	var _m23$0;
	/** @type {!number} */
	var _m32$0;
	/** @type {!number} */
	var _m24$0;
	/** @type {!number} */
	var _m42$0;
	/** @type {!number} */
	var _m13$1;
	/** @type {!number} */
	var _m23$1;
	/** @type {!number} */
	var _m33$0;
	/** @type {!number} */
	var _m43$0;
	/** @type {!number} */
	var _m14$1;
	/** @type {!number} */
	var _m24$1;
	/** @type {!number} */
	var _m34$0;
	/** @type {!number} */
	var _m44$0;
	/** @type {!number} */
	var _m31$1;
	/** @type {!number} */
	var _m32$1;
	/** @type {!number} */
	var _m33$1;
	/** @type {!number} */
	var _m34$1;
	/** @type {!number} */
	var _m41$1;
	/** @type {!number} */
	var _m42$1;
	/** @type {!number} */
	var _m43$1;
	/** @type {!number} */
	var _m44$1;
	/** @type {!number} */
	var _m11$2;
	/** @type {!number} */
	var _m12$2;
	/** @type {!number} */
	var _m13$2;
	/** @type {!number} */
	var _m14$2;
	/** @type {!number} */
	var _m11$3;
	/** @type {!number} */
	var _m21$2;
	/** @type {!number} */
	var _m31$2;
	/** @type {!number} */
	var _m41$2;
	/** @type {!number} */
	var _m21$3;
	/** @type {!number} */
	var _m12$3;
	/** @type {!number} */
	var _m22$2;
	/** @type {!number} */
	var _m22$3;
	/** @type {!number} */
	var _m23$2;
	/** @type {!number} */
	var _m32$2;
	/** @type {!number} */
	var _m24$2;
	/** @type {!number} */
	var _m42$2;
	/** @type {!number} */
	var _m13$3;
	/** @type {!number} */
	var _m23$3;
	/** @type {!number} */
	var _m33$2;
	/** @type {!number} */
	var _m43$2;
	/** @type {!number} */
	var _m14$3;
	/** @type {!number} */
	var _m24$3;
	/** @type {!number} */
	var _m34$2;
	/** @type {!number} */
	var _m44$2;
	/** @type {!number} */
	var _m31$3;
	/** @type {!number} */
	var _m32$3;
	/** @type {!number} */
	var _m33$3;
	/** @type {!number} */
	var _m34$3;
	/** @type {!number} */
	var _m41$3;
	/** @type {!number} */
	var _m42$3;
	/** @type {!number} */
	var _m43$3;
	/** @type {!number} */
	var _m44$3;
	/** @type {!number} */
	var x$4;
	/** @type {!number} */
	var y$4;
	/** @type {!number} */
	var z$4;
	/** @type {!number} */
	var w$4;
	/** @type {!number} */
	var x$5;
	/** @type {!number} */
	var y$5;
	/** @type {!number} */
	var z$5;
	/** @type {!number} */
	var w$5;
	/** @type {!number} */
	var x$6;
	/** @type {!number} */
	var y$6;
	/** @type {!number} */
	var z$6;
	/** @type {!number} */
	var w$6;
	/** @type {!number} */
	var x$7;
	/** @type {!number} */
	var y$7;
	/** @type {!number} */
	var z$7;
	/** @type {!number} */
	var w$7;
	/** @type {HTMLImageElement} */
	var _image$0;
	/** @type {!number} */
	var matrix$_m11$0;
	/** @type {!number} */
	var matrix$_m12$0;
	/** @type {!number} */
	var matrix$_m13$0;
	/** @type {!number} */
	var matrix$_m14$0;
	/** @type {!number} */
	var matrix$_m21$0;
	/** @type {!number} */
	var matrix$_m22$0;
	/** @type {!number} */
	var matrix$_m23$0;
	/** @type {!number} */
	var matrix$_m24$0;
	/** @type {!number} */
	var matrix$_m31$0;
	/** @type {!number} */
	var matrix$_m32$0;
	/** @type {!number} */
	var matrix$_m33$0;
	/** @type {!number} */
	var matrix$_m34$0;
	/** @type {!number} */
	var matrix$_m41$0;
	/** @type {!number} */
	var matrix$_m42$0;
	/** @type {!number} */
	var matrix$_m43$0;
	/** @type {!number} */
	var matrix$_m44$0;
	/** @type {!number} */
	var other$0$_m11$0;
	/** @type {!number} */
	var other$0$_m12$0;
	/** @type {!number} */
	var other$0$_m13$0;
	/** @type {!number} */
	var other$0$_m14$0;
	/** @type {!number} */
	var other$0$_m21$0;
	/** @type {!number} */
	var other$0$_m22$0;
	/** @type {!number} */
	var other$0$_m23$0;
	/** @type {!number} */
	var other$0$_m24$0;
	/** @type {!number} */
	var other$0$_m31$0;
	/** @type {!number} */
	var other$0$_m32$0;
	/** @type {!number} */
	var other$0$_m33$0;
	/** @type {!number} */
	var other$0$_m34$0;
	/** @type {!number} */
	var other$0$_m41$0;
	/** @type {!number} */
	var other$0$_m42$0;
	/** @type {!number} */
	var other$0$_m43$0;
	/** @type {!number} */
	var other$0$_m44$0;
	if (! Engine.isLoadedImage[this._src]) {
		return false;
	}
	context = engine.context;
	wltImage = (vertices$0 = this.vertices)[3];
	wlbImage = vertices$0[0];
	wrbImage = vertices$0[1];
	wrtImage = vertices$0[2];
	this$0 = engine.screenMatrix;
	this$1 = (camera$0 = engine.camera).projectionMatrix;
	other$1 = camera$0.viewMatrix;
	m11$1 = (_m11$0 = this$1._m11) * (_m11$1 = other$1._m11) + (_m12$0 = this$1._m12) * (_m21$0 = other$1._m21) + (_m13$0 = this$1._m13) * (_m31$0 = other$1._m31) + (_m14$0 = this$1._m14) * (_m41$0 = other$1._m41);
	m12$1 = _m11$0 * (_m12$1 = other$1._m12) + _m12$0 * (_m22$1 = other$1._m22) + _m13$0 * (_m32$0 = other$1._m32) + _m14$0 * (_m42$0 = other$1._m42);
	m13$1 = _m11$0 * (_m13$1 = other$1._m13) + _m12$0 * (_m23$1 = other$1._m23) + _m13$0 * (_m33$0 = other$1._m33) + _m14$0 * (_m43$0 = other$1._m43);
	m14$1 = _m11$0 * (_m14$1 = other$1._m14) + _m12$0 * (_m24$1 = other$1._m24) + _m13$0 * (_m34$0 = other$1._m34) + _m14$0 * (_m44$0 = other$1._m44);
	m21$1 = (_m21$1 = this$1._m21) * _m11$1 + (_m22$0 = this$1._m22) * _m21$0 + (_m23$0 = this$1._m23) * _m31$0 + (_m24$0 = this$1._m24) * _m41$0;
	m22$1 = _m21$1 * _m12$1 + _m22$0 * _m22$1 + _m23$0 * _m32$0 + _m24$0 * _m42$0;
	m23$1 = _m21$1 * _m13$1 + _m22$0 * _m23$1 + _m23$0 * _m33$0 + _m24$0 * _m43$0;
	m24$1 = _m21$1 * _m14$1 + _m22$0 * _m24$1 + _m23$0 * _m34$0 + _m24$0 * _m44$0;
	m31$1 = (_m31$1 = this$1._m31) * _m11$1 + (_m32$1 = this$1._m32) * _m21$0 + (_m33$1 = this$1._m33) * _m31$0 + (_m34$1 = this$1._m34) * _m41$0;
	m32$1 = _m31$1 * _m12$1 + _m32$1 * _m22$1 + _m33$1 * _m32$0 + _m34$1 * _m42$0;
	m33$1 = _m31$1 * _m13$1 + _m32$1 * _m23$1 + _m33$1 * _m33$0 + _m34$1 * _m43$0;
	m34$1 = _m31$1 * _m14$1 + _m32$1 * _m24$1 + _m33$1 * _m34$0 + _m34$1 * _m44$0;
	m41$1 = (_m41$1 = this$1._m41) * _m11$1 + (_m42$1 = this$1._m42) * _m21$0 + (_m43$1 = this$1._m43) * _m31$0 + (_m44$1 = this$1._m44) * _m41$0;
	m42$1 = _m41$1 * _m12$1 + _m42$1 * _m22$1 + _m43$1 * _m32$0 + _m44$1 * _m42$0;
	m43$1 = _m41$1 * _m13$1 + _m42$1 * _m23$1 + _m43$1 * _m33$0 + _m44$1 * _m43$0;
	m44$1 = _m41$1 * _m14$1 + _m42$1 * _m24$1 + _m43$1 * _m34$0 + _m44$1 * _m44$0;
	other$0$_m11$0 = [ m11$1, m12$1, m13$1, m14$1, m21$1, m22$1, m23$1, m24$1, m31$1, m32$1, m33$1, m34$1, m41$1, m42$1, m43$1, m44$1 ][0];
	other$0$_m12$0 = [ m11$1, m12$1, m13$1, m14$1, m21$1, m22$1, m23$1, m24$1, m31$1, m32$1, m33$1, m34$1, m41$1, m42$1, m43$1, m44$1 ][1];
	other$0$_m13$0 = [ m11$1, m12$1, m13$1, m14$1, m21$1, m22$1, m23$1, m24$1, m31$1, m32$1, m33$1, m34$1, m41$1, m42$1, m43$1, m44$1 ][2];
	other$0$_m14$0 = [ m11$1, m12$1, m13$1, m14$1, m21$1, m22$1, m23$1, m24$1, m31$1, m32$1, m33$1, m34$1, m41$1, m42$1, m43$1, m44$1 ][3];
	other$0$_m21$0 = [ m11$1, m12$1, m13$1, m14$1, m21$1, m22$1, m23$1, m24$1, m31$1, m32$1, m33$1, m34$1, m41$1, m42$1, m43$1, m44$1 ][4];
	other$0$_m22$0 = [ m11$1, m12$1, m13$1, m14$1, m21$1, m22$1, m23$1, m24$1, m31$1, m32$1, m33$1, m34$1, m41$1, m42$1, m43$1, m44$1 ][5];
	other$0$_m23$0 = [ m11$1, m12$1, m13$1, m14$1, m21$1, m22$1, m23$1, m24$1, m31$1, m32$1, m33$1, m34$1, m41$1, m42$1, m43$1, m44$1 ][6];
	other$0$_m24$0 = [ m11$1, m12$1, m13$1, m14$1, m21$1, m22$1, m23$1, m24$1, m31$1, m32$1, m33$1, m34$1, m41$1, m42$1, m43$1, m44$1 ][7];
	other$0$_m31$0 = [ m11$1, m12$1, m13$1, m14$1, m21$1, m22$1, m23$1, m24$1, m31$1, m32$1, m33$1, m34$1, m41$1, m42$1, m43$1, m44$1 ][8];
	other$0$_m32$0 = [ m11$1, m12$1, m13$1, m14$1, m21$1, m22$1, m23$1, m24$1, m31$1, m32$1, m33$1, m34$1, m41$1, m42$1, m43$1, m44$1 ][9];
	other$0$_m33$0 = [ m11$1, m12$1, m13$1, m14$1, m21$1, m22$1, m23$1, m24$1, m31$1, m32$1, m33$1, m34$1, m41$1, m42$1, m43$1, m44$1 ][10];
	other$0$_m34$0 = [ m11$1, m12$1, m13$1, m14$1, m21$1, m22$1, m23$1, m24$1, m31$1, m32$1, m33$1, m34$1, m41$1, m42$1, m43$1, m44$1 ][11];
	other$0$_m41$0 = [ m11$1, m12$1, m13$1, m14$1, m21$1, m22$1, m23$1, m24$1, m31$1, m32$1, m33$1, m34$1, m41$1, m42$1, m43$1, m44$1 ][12];
	other$0$_m42$0 = [ m11$1, m12$1, m13$1, m14$1, m21$1, m22$1, m23$1, m24$1, m31$1, m32$1, m33$1, m34$1, m41$1, m42$1, m43$1, m44$1 ][13];
	other$0$_m43$0 = [ m11$1, m12$1, m13$1, m14$1, m21$1, m22$1, m23$1, m24$1, m31$1, m32$1, m33$1, m34$1, m41$1, m42$1, m43$1, m44$1 ][14];
	other$0$_m44$0 = [ m11$1, m12$1, m13$1, m14$1, m21$1, m22$1, m23$1, m24$1, m31$1, m32$1, m33$1, m34$1, m41$1, m42$1, m43$1, m44$1 ][15];
	m11$0 = (_m11$2 = this$0._m11) * (_m11$3 = other$0$_m11$0) + (_m12$2 = this$0._m12) * (_m21$2 = other$0$_m21$0) + (_m13$2 = this$0._m13) * (_m31$2 = other$0$_m31$0) + (_m14$2 = this$0._m14) * (_m41$2 = other$0$_m41$0);
	m12$0 = _m11$2 * (_m12$3 = other$0$_m12$0) + _m12$2 * (_m22$3 = other$0$_m22$0) + _m13$2 * (_m32$2 = other$0$_m32$0) + _m14$2 * (_m42$2 = other$0$_m42$0);
	m13$0 = _m11$2 * (_m13$3 = other$0$_m13$0) + _m12$2 * (_m23$3 = other$0$_m23$0) + _m13$2 * (_m33$2 = other$0$_m33$0) + _m14$2 * (_m43$2 = other$0$_m43$0);
	m14$0 = _m11$2 * (_m14$3 = other$0$_m14$0) + _m12$2 * (_m24$3 = other$0$_m24$0) + _m13$2 * (_m34$2 = other$0$_m34$0) + _m14$2 * (_m44$2 = other$0$_m44$0);
	m21$0 = (_m21$3 = this$0._m21) * _m11$3 + (_m22$2 = this$0._m22) * _m21$2 + (_m23$2 = this$0._m23) * _m31$2 + (_m24$2 = this$0._m24) * _m41$2;
	m22$0 = _m21$3 * _m12$3 + _m22$2 * _m22$3 + _m23$2 * _m32$2 + _m24$2 * _m42$2;
	m23$0 = _m21$3 * _m13$3 + _m22$2 * _m23$3 + _m23$2 * _m33$2 + _m24$2 * _m43$2;
	m24$0 = _m21$3 * _m14$3 + _m22$2 * _m24$3 + _m23$2 * _m34$2 + _m24$2 * _m44$2;
	m31$0 = (_m31$3 = this$0._m31) * _m11$3 + (_m32$3 = this$0._m32) * _m21$2 + (_m33$3 = this$0._m33) * _m31$2 + (_m34$3 = this$0._m34) * _m41$2;
	m32$0 = _m31$3 * _m12$3 + _m32$3 * _m22$3 + _m33$3 * _m32$2 + _m34$3 * _m42$2;
	m33$0 = _m31$3 * _m13$3 + _m32$3 * _m23$3 + _m33$3 * _m33$2 + _m34$3 * _m43$2;
	m34$0 = _m31$3 * _m14$3 + _m32$3 * _m24$3 + _m33$3 * _m34$2 + _m34$3 * _m44$2;
	m41$0 = (_m41$3 = this$0._m41) * _m11$3 + (_m42$3 = this$0._m42) * _m21$2 + (_m43$3 = this$0._m43) * _m31$2 + (_m44$3 = this$0._m44) * _m41$2;
	m42$0 = _m41$3 * _m12$3 + _m42$3 * _m22$3 + _m43$3 * _m32$2 + _m44$3 * _m42$2;
	m43$0 = _m41$3 * _m13$3 + _m42$3 * _m23$3 + _m43$3 * _m33$2 + _m44$3 * _m43$2;
	m44$0 = _m41$3 * _m14$3 + _m42$3 * _m24$3 + _m43$3 * _m34$2 + _m44$3 * _m44$2;
	matrix$_m11$0 = [ m11$0, m12$0, m13$0, m14$0, m21$0, m22$0, m23$0, m24$0, m31$0, m32$0, m33$0, m34$0, m41$0, m42$0, m43$0, m44$0 ][0];
	matrix$_m12$0 = [ m11$0, m12$0, m13$0, m14$0, m21$0, m22$0, m23$0, m24$0, m31$0, m32$0, m33$0, m34$0, m41$0, m42$0, m43$0, m44$0 ][1];
	matrix$_m13$0 = [ m11$0, m12$0, m13$0, m14$0, m21$0, m22$0, m23$0, m24$0, m31$0, m32$0, m33$0, m34$0, m41$0, m42$0, m43$0, m44$0 ][2];
	matrix$_m14$0 = [ m11$0, m12$0, m13$0, m14$0, m21$0, m22$0, m23$0, m24$0, m31$0, m32$0, m33$0, m34$0, m41$0, m42$0, m43$0, m44$0 ][3];
	matrix$_m21$0 = [ m11$0, m12$0, m13$0, m14$0, m21$0, m22$0, m23$0, m24$0, m31$0, m32$0, m33$0, m34$0, m41$0, m42$0, m43$0, m44$0 ][4];
	matrix$_m22$0 = [ m11$0, m12$0, m13$0, m14$0, m21$0, m22$0, m23$0, m24$0, m31$0, m32$0, m33$0, m34$0, m41$0, m42$0, m43$0, m44$0 ][5];
	matrix$_m23$0 = [ m11$0, m12$0, m13$0, m14$0, m21$0, m22$0, m23$0, m24$0, m31$0, m32$0, m33$0, m34$0, m41$0, m42$0, m43$0, m44$0 ][6];
	matrix$_m24$0 = [ m11$0, m12$0, m13$0, m14$0, m21$0, m22$0, m23$0, m24$0, m31$0, m32$0, m33$0, m34$0, m41$0, m42$0, m43$0, m44$0 ][7];
	matrix$_m31$0 = [ m11$0, m12$0, m13$0, m14$0, m21$0, m22$0, m23$0, m24$0, m31$0, m32$0, m33$0, m34$0, m41$0, m42$0, m43$0, m44$0 ][8];
	matrix$_m32$0 = [ m11$0, m12$0, m13$0, m14$0, m21$0, m22$0, m23$0, m24$0, m31$0, m32$0, m33$0, m34$0, m41$0, m42$0, m43$0, m44$0 ][9];
	matrix$_m33$0 = [ m11$0, m12$0, m13$0, m14$0, m21$0, m22$0, m23$0, m24$0, m31$0, m32$0, m33$0, m34$0, m41$0, m42$0, m43$0, m44$0 ][10];
	matrix$_m34$0 = [ m11$0, m12$0, m13$0, m14$0, m21$0, m22$0, m23$0, m24$0, m31$0, m32$0, m33$0, m34$0, m41$0, m42$0, m43$0, m44$0 ][11];
	matrix$_m41$0 = [ m11$0, m12$0, m13$0, m14$0, m21$0, m22$0, m23$0, m24$0, m31$0, m32$0, m33$0, m34$0, m41$0, m42$0, m43$0, m44$0 ][12];
	matrix$_m42$0 = [ m11$0, m12$0, m13$0, m14$0, m21$0, m22$0, m23$0, m24$0, m31$0, m32$0, m33$0, m34$0, m41$0, m42$0, m43$0, m44$0 ][13];
	matrix$_m43$0 = [ m11$0, m12$0, m13$0, m14$0, m21$0, m22$0, m23$0, m24$0, m31$0, m32$0, m33$0, m34$0, m41$0, m42$0, m43$0, m44$0 ][14];
	matrix$_m44$0 = [ m11$0, m12$0, m13$0, m14$0, m21$0, m22$0, m23$0, m24$0, m31$0, m32$0, m33$0, m34$0, m41$0, m42$0, m43$0, m44$0 ][15];
	x$0 = matrix$_m11$0 * (x$4 = wltImage.x) + matrix$_m12$0 * (y$4 = wltImage.y) + matrix$_m13$0 * (z$4 = wltImage.z) + matrix$_m14$0 * (w$4 = wltImage.w);
	y$0 = matrix$_m21$0 * x$4 + matrix$_m22$0 * y$4 + matrix$_m23$0 * z$4 + matrix$_m24$0 * w$4;
	z$0 = matrix$_m31$0 * x$4 + matrix$_m32$0 * y$4 + matrix$_m33$0 * z$4 + matrix$_m34$0 * w$4;
	w$0 = matrix$_m41$0 * x$4 + matrix$_m42$0 * y$4 + matrix$_m43$0 * z$4 + matrix$_m44$0 * w$4;
	sltImage = new Vector$NNNN(x$0, y$0, z$0, w$0);
	x$1 = matrix$_m11$0 * (x$5 = wlbImage.x) + matrix$_m12$0 * (y$5 = wlbImage.y) + matrix$_m13$0 * (z$5 = wlbImage.z) + matrix$_m14$0 * (w$5 = wlbImage.w);
	y$1 = matrix$_m21$0 * x$5 + matrix$_m22$0 * y$5 + matrix$_m23$0 * z$5 + matrix$_m24$0 * w$5;
	z$1 = matrix$_m31$0 * x$5 + matrix$_m32$0 * y$5 + matrix$_m33$0 * z$5 + matrix$_m34$0 * w$5;
	w$1 = matrix$_m41$0 * x$5 + matrix$_m42$0 * y$5 + matrix$_m43$0 * z$5 + matrix$_m44$0 * w$5;
	slbImage = new Vector$NNNN(x$1, y$1, z$1, w$1);
	x$2 = matrix$_m11$0 * (x$6 = wrbImage.x) + matrix$_m12$0 * (y$6 = wrbImage.y) + matrix$_m13$0 * (z$6 = wrbImage.z) + matrix$_m14$0 * (w$6 = wrbImage.w);
	y$2 = matrix$_m21$0 * x$6 + matrix$_m22$0 * y$6 + matrix$_m23$0 * z$6 + matrix$_m24$0 * w$6;
	z$2 = matrix$_m31$0 * x$6 + matrix$_m32$0 * y$6 + matrix$_m33$0 * z$6 + matrix$_m34$0 * w$6;
	w$2 = matrix$_m41$0 * x$6 + matrix$_m42$0 * y$6 + matrix$_m43$0 * z$6 + matrix$_m44$0 * w$6;
	srbImage = new Vector$NNNN(x$2, y$2, z$2, w$2);
	x$3 = matrix$_m11$0 * (x$7 = wrtImage.x) + matrix$_m12$0 * (y$7 = wrtImage.y) + matrix$_m13$0 * (z$7 = wrtImage.z) + matrix$_m14$0 * (w$7 = wrtImage.w);
	y$3 = matrix$_m21$0 * x$7 + matrix$_m22$0 * y$7 + matrix$_m23$0 * z$7 + matrix$_m24$0 * w$7;
	z$3 = matrix$_m31$0 * x$7 + matrix$_m32$0 * y$7 + matrix$_m33$0 * z$7 + matrix$_m34$0 * w$7;
	w$3 = matrix$_m41$0 * x$7 + matrix$_m42$0 * y$7 + matrix$_m43$0 * z$7 + matrix$_m44$0 * w$7;
	srtImage = new Vector$NNNN(x$3, y$3, z$3, w$3);
	isHiddenXY = Renderable$isHiddenXY$ALVector$LEngine$([ sltImage, slbImage, srbImage, srtImage ], engine);
	if (isHiddenXY) {
		return false;
	}
	divideAndDrawImage = (function (image, wlt, wlb, wrb, wrt, slt, slb, srb, srt, depth, sx, sy, sw, sh) {
		var hypotenuse;
		/** @type {!number} */
		var sBottomWidth;
		/** @type {!number} */
		var sTopWidth;
		/** @type {!number} */
		var sLeftHeight;
		/** @type {!number} */
		var sRightHeight;
		/** @type {!number} */
		var widthRatio;
		/** @type {!number} */
		var heightRatio;
		/** @type {!boolean} */
		var splittingHorizontal;
		/** @type {!boolean} */
		var splittingVertical;
		/** @type {Vector} */
		var wct;
		/** @type {Vector} */
		var wcb;
		/** @type {Vector} */
		var wlc;
		/** @type {Vector} */
		var wrc;
		/** @type {Vector} */
		var wcc;
		/** @type {Vector} */
		var sct;
		/** @type {Vector} */
		var scb;
		/** @type {Vector} */
		var slc;
		/** @type {Vector} */
		var src;
		/** @type {Vector} */
		var scc;
		/** @type {!number} */
		var scaleX;
		/** @type {!number} */
		var scaleY;
		/** @type {!number} */
		var skewingX;
		/** @type {!number} */
		var skewingY;
		/** @type {Vector} */
		var this$0;
		/** @type {Vector} */
		var this$1;
		/** @type {Vector} */
		var this$2;
		/** @type {Vector} */
		var this$3;
		/** @type {Vector} */
		var this$4;
		/** @type {!number} */
		var x$0;
		/** @type {!number} */
		var y$0;
		/** @type {!number} */
		var z$0;
		/** @type {!number} */
		var w$0;
		/** @type {!number} */
		var x$1;
		/** @type {!number} */
		var y$1;
		/** @type {!number} */
		var z$1;
		/** @type {!number} */
		var w$1;
		/** @type {!number} */
		var x$2;
		/** @type {!number} */
		var y$2;
		/** @type {!number} */
		var z$2;
		/** @type {!number} */
		var w$2;
		/** @type {!number} */
		var x$3;
		/** @type {!number} */
		var y$3;
		/** @type {!number} */
		var z$3;
		/** @type {!number} */
		var w$3;
		/** @type {!number} */
		var x$4;
		/** @type {!number} */
		var y$4;
		/** @type {!number} */
		var z$4;
		/** @type {!number} */
		var w$4;
		/** @type {Vector} */
		var this$5;
		/** @type {Vector} */
		var this$6;
		/** @type {!number} */
		var x$5;
		/** @type {!number} */
		var y$5;
		/** @type {!number} */
		var z$5;
		/** @type {!number} */
		var w$5;
		/** @type {!number} */
		var x$6;
		/** @type {!number} */
		var y$6;
		/** @type {!number} */
		var z$6;
		/** @type {!number} */
		var w$6;
		/** @type {Vector} */
		var this$7;
		/** @type {Vector} */
		var this$8;
		/** @type {!number} */
		var x$7;
		/** @type {!number} */
		var y$7;
		/** @type {!number} */
		var z$7;
		/** @type {!number} */
		var w$7;
		/** @type {!number} */
		var x$8;
		/** @type {!number} */
		var y$8;
		/** @type {!number} */
		var z$8;
		/** @type {!number} */
		var w$8;
		/** @type {!number} */
		var x$9;
		/** @type {!number} */
		var y$9;
		/** @type {!number} */
		var z$9;
		/** @type {!number} */
		var w$9;
		/** @type {!number} */
		var x$10;
		/** @type {!number} */
		var y$10;
		/** @type {!number} */
		var z$10;
		/** @type {!number} */
		var w$10;
		/** @type {!number} */
		var x$11;
		/** @type {!number} */
		var y$11;
		/** @type {!number} */
		var z$11;
		/** @type {!number} */
		var w$11;
		/** @type {!number} */
		var x$12;
		/** @type {!number} */
		var y$12;
		/** @type {!number} */
		var z$12;
		/** @type {!number} */
		var w$12;
		/** @type {!number} */
		var x$13;
		/** @type {!number} */
		var y$13;
		/** @type {!number} */
		var z$13;
		/** @type {!number} */
		var w$13;
		/** @type {!number} */
		var x$14;
		/** @type {!number} */
		var y$14;
		/** @type {!number} */
		var z$14;
		/** @type {!number} */
		var w$14;
		/** @type {!number} */
		var x$15;
		/** @type {!number} */
		var y$15;
		/** @type {!number} */
		var z$15;
		/** @type {!number} */
		var w$15;
		/** @type {!number} */
		var x$16;
		/** @type {!number} */
		var y$16;
		/** @type {!number} */
		var z$16;
		/** @type {!number} */
		var w$16;
		/** @type {!number} */
		var x$17;
		/** @type {!number} */
		var y$17;
		/** @type {!number} */
		var z$17;
		/** @type {!number} */
		var w$17;
		/** @type {!number} */
		var y$18;
		/** @type {!number} */
		var x$18;
		/** @type {!number} */
		var x$19;
		/** @type {!number} */
		var y$19;
		hypotenuse = (function (a, b) {
			return Math.sqrt(a * a + b * b);
		});
		sBottomWidth = hypotenuse(srb.x - slb.x, srb.y - slb.y);
		sTopWidth = hypotenuse(srt.x - slt.x, srt.y - slt.y);
		sLeftHeight = hypotenuse(slt.x - slb.x, slt.y - slb.y);
		sRightHeight = hypotenuse(srt.x - srb.x, srt.y - srb.y);
		widthRatio = sBottomWidth / sTopWidth;
		heightRatio = sRightHeight / sLeftHeight;
		if (widthRatio < 1) {
			widthRatio = 1 / widthRatio;
		}
		if (heightRatio < 1) {
			heightRatio = 1 / heightRatio;
		}
		splittingHorizontal = widthRatio > 1.01;
		splittingVertical = heightRatio > 1.01;
		if (depth <= $this._minDiv || depth <= $this._maxDiv && splittingHorizontal && splittingVertical) {
			this$0 = new Vector$NNN(wlt.x + wrt.x, wlt.y + wrt.y, wlt.z + wrt.z);
			this$0.x /= 2;
			this$0.y /= 2;
			this$0.z /= 2;
			wct = this$0;
			this$1 = new Vector$NNN(wlb.x + wrb.x, wlb.y + wrb.y, wlb.z + wrb.z);
			this$1.x /= 2;
			this$1.y /= 2;
			this$1.z /= 2;
			wcb = this$1;
			this$2 = new Vector$NNN(wlt.x + wlb.x, wlt.y + wlb.y, wlt.z + wlb.z);
			this$2.x /= 2;
			this$2.y /= 2;
			this$2.z /= 2;
			wlc = this$2;
			this$3 = new Vector$NNN(wrt.x + wrb.x, wrt.y + wrb.y, wrt.z + wrb.z);
			this$3.x /= 2;
			this$3.y /= 2;
			this$3.z /= 2;
			wrc = this$3;
			this$4 = new Vector$NNN(wlt.x + wrb.x, wlt.y + wrb.y, wlt.z + wrb.z);
			this$4.x /= 2;
			this$4.y /= 2;
			this$4.z /= 2;
			wcc = this$4;
			x$0 = matrix$_m11$0 * (x$9 = wct.x) + matrix$_m12$0 * (y$9 = wct.y) + matrix$_m13$0 * (z$9 = wct.z) + matrix$_m14$0 * (w$9 = wct.w);
			y$0 = matrix$_m21$0 * x$9 + matrix$_m22$0 * y$9 + matrix$_m23$0 * z$9 + matrix$_m24$0 * w$9;
			z$0 = matrix$_m31$0 * x$9 + matrix$_m32$0 * y$9 + matrix$_m33$0 * z$9 + matrix$_m34$0 * w$9;
			w$0 = matrix$_m41$0 * x$9 + matrix$_m42$0 * y$9 + matrix$_m43$0 * z$9 + matrix$_m44$0 * w$9;
			sct = new Vector$NNNN(x$0, y$0, z$0, w$0);
			x$1 = matrix$_m11$0 * (x$10 = wcb.x) + matrix$_m12$0 * (y$10 = wcb.y) + matrix$_m13$0 * (z$10 = wcb.z) + matrix$_m14$0 * (w$10 = wcb.w);
			y$1 = matrix$_m21$0 * x$10 + matrix$_m22$0 * y$10 + matrix$_m23$0 * z$10 + matrix$_m24$0 * w$10;
			z$1 = matrix$_m31$0 * x$10 + matrix$_m32$0 * y$10 + matrix$_m33$0 * z$10 + matrix$_m34$0 * w$10;
			w$1 = matrix$_m41$0 * x$10 + matrix$_m42$0 * y$10 + matrix$_m43$0 * z$10 + matrix$_m44$0 * w$10;
			scb = new Vector$NNNN(x$1, y$1, z$1, w$1);
			x$2 = matrix$_m11$0 * (x$11 = wlc.x) + matrix$_m12$0 * (y$11 = wlc.y) + matrix$_m13$0 * (z$11 = wlc.z) + matrix$_m14$0 * (w$11 = wlc.w);
			y$2 = matrix$_m21$0 * x$11 + matrix$_m22$0 * y$11 + matrix$_m23$0 * z$11 + matrix$_m24$0 * w$11;
			z$2 = matrix$_m31$0 * x$11 + matrix$_m32$0 * y$11 + matrix$_m33$0 * z$11 + matrix$_m34$0 * w$11;
			w$2 = matrix$_m41$0 * x$11 + matrix$_m42$0 * y$11 + matrix$_m43$0 * z$11 + matrix$_m44$0 * w$11;
			slc = new Vector$NNNN(x$2, y$2, z$2, w$2);
			x$3 = matrix$_m11$0 * (x$12 = wrc.x) + matrix$_m12$0 * (y$12 = wrc.y) + matrix$_m13$0 * (z$12 = wrc.z) + matrix$_m14$0 * (w$12 = wrc.w);
			y$3 = matrix$_m21$0 * x$12 + matrix$_m22$0 * y$12 + matrix$_m23$0 * z$12 + matrix$_m24$0 * w$12;
			z$3 = matrix$_m31$0 * x$12 + matrix$_m32$0 * y$12 + matrix$_m33$0 * z$12 + matrix$_m34$0 * w$12;
			w$3 = matrix$_m41$0 * x$12 + matrix$_m42$0 * y$12 + matrix$_m43$0 * z$12 + matrix$_m44$0 * w$12;
			src = new Vector$NNNN(x$3, y$3, z$3, w$3);
			x$4 = matrix$_m11$0 * (x$13 = wcc.x) + matrix$_m12$0 * (y$13 = wcc.y) + matrix$_m13$0 * (z$13 = wcc.z) + matrix$_m14$0 * (w$13 = wcc.w);
			y$4 = matrix$_m21$0 * x$13 + matrix$_m22$0 * y$13 + matrix$_m23$0 * z$13 + matrix$_m24$0 * w$13;
			z$4 = matrix$_m31$0 * x$13 + matrix$_m32$0 * y$13 + matrix$_m33$0 * z$13 + matrix$_m34$0 * w$13;
			w$4 = matrix$_m41$0 * x$13 + matrix$_m42$0 * y$13 + matrix$_m43$0 * z$13 + matrix$_m44$0 * w$13;
			scc = new Vector$NNNN(x$4, y$4, z$4, w$4);
			divideAndDrawImage(image, wlt, wlc, wcc, wct, slt, slc, scc, sct, depth + 1, sx, sy, sw / 2, sh / 2);
			divideAndDrawImage(image, wlc, wlb, wcb, wcc, slc, slb, scb, scc, depth + 1, sx, sy + sh / 2, sw / 2, sh / 2);
			divideAndDrawImage(image, wct, wcc, wrc, wrt, sct, scc, src, srt, depth + 1, sx + sw / 2, sy, sw / 2, sh / 2);
			divideAndDrawImage(image, wcc, wcb, wrb, wrc, scc, scb, srb, src, depth + 1, sx + sw / 2, sy + sh / 2, sw / 2, sh / 2);
		} else {
			if (depth <= $this._maxVerticalDiv && splittingVertical) {
				this$5 = new Vector$NNN(wlt.x + wrt.x, wlt.y + wrt.y, wlt.z + wrt.z);
				this$5.x /= 2;
				this$5.y /= 2;
				this$5.z /= 2;
				wct = this$5;
				this$6 = new Vector$NNN(wlb.x + wrb.x, wlb.y + wrb.y, wlb.z + wrb.z);
				this$6.x /= 2;
				this$6.y /= 2;
				this$6.z /= 2;
				wcb = this$6;
				x$5 = matrix$_m11$0 * (x$14 = wct.x) + matrix$_m12$0 * (y$14 = wct.y) + matrix$_m13$0 * (z$14 = wct.z) + matrix$_m14$0 * (w$14 = wct.w);
				y$5 = matrix$_m21$0 * x$14 + matrix$_m22$0 * y$14 + matrix$_m23$0 * z$14 + matrix$_m24$0 * w$14;
				z$5 = matrix$_m31$0 * x$14 + matrix$_m32$0 * y$14 + matrix$_m33$0 * z$14 + matrix$_m34$0 * w$14;
				w$5 = matrix$_m41$0 * x$14 + matrix$_m42$0 * y$14 + matrix$_m43$0 * z$14 + matrix$_m44$0 * w$14;
				sct = new Vector$NNNN(x$5, y$5, z$5, w$5);
				x$6 = matrix$_m11$0 * (x$15 = wcb.x) + matrix$_m12$0 * (y$15 = wcb.y) + matrix$_m13$0 * (z$15 = wcb.z) + matrix$_m14$0 * (w$15 = wcb.w);
				y$6 = matrix$_m21$0 * x$15 + matrix$_m22$0 * y$15 + matrix$_m23$0 * z$15 + matrix$_m24$0 * w$15;
				z$6 = matrix$_m31$0 * x$15 + matrix$_m32$0 * y$15 + matrix$_m33$0 * z$15 + matrix$_m34$0 * w$15;
				w$6 = matrix$_m41$0 * x$15 + matrix$_m42$0 * y$15 + matrix$_m43$0 * z$15 + matrix$_m44$0 * w$15;
				scb = new Vector$NNNN(x$6, y$6, z$6, w$6);
				divideAndDrawImage(image, wlt, wlb, wcb, wct, slt, slb, scb, sct, depth + 1, sx, sy, sw / 2, sh);
				divideAndDrawImage(image, wct, wcb, wrb, wrt, sct, scb, srb, srt, depth + 1, sx + sw / 2, sy, sw / 2, sh);
			} else {
				if (depth <= $this._maxHorizontalDiv && splittingHorizontal) {
					this$7 = new Vector$NNN(wlt.x + wlb.x, wlt.y + wlb.y, wlt.z + wlb.z);
					this$7.x /= 2;
					this$7.y /= 2;
					this$7.z /= 2;
					wlc = this$7;
					this$8 = new Vector$NNN(wrt.x + wrb.x, wrt.y + wrb.y, wrt.z + wrb.z);
					this$8.x /= 2;
					this$8.y /= 2;
					this$8.z /= 2;
					wrc = this$8;
					x$7 = matrix$_m11$0 * (x$16 = wlc.x) + matrix$_m12$0 * (y$16 = wlc.y) + matrix$_m13$0 * (z$16 = wlc.z) + matrix$_m14$0 * (w$16 = wlc.w);
					y$7 = matrix$_m21$0 * x$16 + matrix$_m22$0 * y$16 + matrix$_m23$0 * z$16 + matrix$_m24$0 * w$16;
					z$7 = matrix$_m31$0 * x$16 + matrix$_m32$0 * y$16 + matrix$_m33$0 * z$16 + matrix$_m34$0 * w$16;
					w$7 = matrix$_m41$0 * x$16 + matrix$_m42$0 * y$16 + matrix$_m43$0 * z$16 + matrix$_m44$0 * w$16;
					slc = new Vector$NNNN(x$7, y$7, z$7, w$7);
					x$8 = matrix$_m11$0 * (x$17 = wrc.x) + matrix$_m12$0 * (y$17 = wrc.y) + matrix$_m13$0 * (z$17 = wrc.z) + matrix$_m14$0 * (w$17 = wrc.w);
					y$8 = matrix$_m21$0 * x$17 + matrix$_m22$0 * y$17 + matrix$_m23$0 * z$17 + matrix$_m24$0 * w$17;
					z$8 = matrix$_m31$0 * x$17 + matrix$_m32$0 * y$17 + matrix$_m33$0 * z$17 + matrix$_m34$0 * w$17;
					w$8 = matrix$_m41$0 * x$17 + matrix$_m42$0 * y$17 + matrix$_m43$0 * z$17 + matrix$_m44$0 * w$17;
					src = new Vector$NNNN(x$8, y$8, z$8, w$8);
					divideAndDrawImage(image, wlt, wlc, wrc, wrt, slt, slc, src, srt, depth + 1, sx, sy, sw, sh / 2);
					divideAndDrawImage(image, wlc, wlb, wrb, wrc, slc, slb, srb, src, depth + 1, sx, sy + sh / 2, sw, sh / 2);
				} else {
					scaleX = ((x$18 = srt.x) - (x$19 = slt.x)) / sw;
					scaleY = ((y$19 = slb.y) - (y$18 = slt.y)) / sh;
					skewingX = (srt.y - y$18) / (x$18 - x$19);
					skewingY = (slb.x - x$19) / (y$19 - y$18);
					context.transform(1, 0, 0, 1, x$19, y$18);
					context.transform(1, skewingX, skewingY, 1, 0, 0);
					context.transform(scaleX, 0, 0, scaleY, 0, 0);
					context.drawImage(image, ~ ~ sx, ~ ~ sy, ~ ~ sw, ~ ~ sh, 0, 0, Math.ceil(sw), Math.ceil(sh));
					context.setTransform(1, 0, 0, 1, 0, 0);
				}
			}
		}
	});
	divideAndDrawImage(_image$0 = this._image, wltImage, wlbImage, wrbImage, wrtImage, sltImage, slbImage, srbImage, srtImage, 1, 0, 0, _image$0.width, _image$0.height);
	return true;
};

/**
 * class Billboard extends Renderable
 * @constructor
 */
function Billboard() {
}

Billboard.prototype = new Renderable;
/**
 * @constructor
 * @param {Vector} center
 * @param {!number} width
 * @param {!number} height
 * @param {!string} src
 */
function Billboard$LVector$NNS(center, width, height, src) {
	this.vCenter = null;
	this._width = width;
	this._height = height;
	this._src = src;
	this._image = Engine.images[src];
	this.center = center;
};

Billboard$LVector$NNS.prototype = new Billboard;

/**
 * @param {Matrix} worldMatrix
 */
Billboard.prototype.applyWorldMatrix$LMatrix$ = function (worldMatrix) {
	/** @type {Vector} */
	var this$0;
	/** @type {!number} */
	var x$0;
	/** @type {!number} */
	var y$0;
	/** @type {!number} */
	var z$0;
	/** @type {!number} */
	var w$0;
	/** @type {!number} */
	var x$1;
	/** @type {!number} */
	var y$1;
	/** @type {!number} */
	var z$1;
	/** @type {!number} */
	var w$1;
	this$0 = this.center;
	x$0 = worldMatrix._m11 * (x$1 = this$0.x) + worldMatrix._m12 * (y$1 = this$0.y) + worldMatrix._m13 * (z$1 = this$0.z) + worldMatrix._m14 * (w$1 = this$0.w);
	y$0 = worldMatrix._m21 * x$1 + worldMatrix._m22 * y$1 + worldMatrix._m23 * z$1 + worldMatrix._m24 * w$1;
	z$0 = worldMatrix._m31 * x$1 + worldMatrix._m32 * y$1 + worldMatrix._m33 * z$1 + worldMatrix._m34 * w$1;
	w$0 = worldMatrix._m41 * x$1 + worldMatrix._m42 * y$1 + worldMatrix._m43 * z$1 + worldMatrix._m44 * w$1;
	this$0.x = x$0 / w$0;
	this$0.y = y$0 / w$0;
	this$0.z = z$0 / w$0;
	this$0.w = 1;
};

/**
 * @param {Matrix} viewMatrix
 */
Billboard.prototype.applyViewMatrix$LMatrix$ = function (viewMatrix) {
	/** @type {Vector} */
	var this$0;
	/** @type {!number} */
	var x$0;
	/** @type {!number} */
	var y$0;
	/** @type {!number} */
	var z$0;
	/** @type {!number} */
	var w$0;
	/** @type {!number} */
	var x$1;
	/** @type {!number} */
	var y$1;
	/** @type {!number} */
	var z$1;
	/** @type {!number} */
	var w$1;
	this$0 = this.center;
	x$0 = viewMatrix._m11 * (x$1 = this$0.x) + viewMatrix._m12 * (y$1 = this$0.y) + viewMatrix._m13 * (z$1 = this$0.z) + viewMatrix._m14 * (w$1 = this$0.w);
	y$0 = viewMatrix._m21 * x$1 + viewMatrix._m22 * y$1 + viewMatrix._m23 * z$1 + viewMatrix._m24 * w$1;
	z$0 = viewMatrix._m31 * x$1 + viewMatrix._m32 * y$1 + viewMatrix._m33 * z$1 + viewMatrix._m34 * w$1;
	w$0 = viewMatrix._m41 * x$1 + viewMatrix._m42 * y$1 + viewMatrix._m43 * z$1 + viewMatrix._m44 * w$1;
	this.vCenter = new Vector$NNNN(x$0, y$0, z$0, w$0);
};

/**
 * @param {Camera} camera
 * @return {!boolean}
 */
Billboard.prototype.isHidden$LCamera$ = function (camera) {
	/** @type {!number} */
	var z$0;
	/** @type {Vector} */
	var vCenter$0;
	return (camera.nearZ < (z$0 = (vCenter$0 = this.vCenter).z) && z$0 < camera.farZ ? false : true);
};

/**
 * @param {Engine} engine
 * @return {!boolean}
 */
Billboard.prototype.draw$LEngine$ = function (engine) {
	/** @type {CanvasRenderingContext2D} */
	var context;
	/** @type {Vector} */
	var sCenter;
	/** @type {Vector} */
	var sLeftBottom;
	/** @type {!number} */
	var sHalfWidth;
	/** @type {!number} */
	var sHalfHeight;
	/** @type {!boolean} */
	var isHiddenXY;
	/** @type {!number} */
	var scaleX;
	/** @type {!number} */
	var scaleY;
	/** @type {Matrix} */
	var this$0;
	/** @type {Matrix} */
	var other$0;
	/** @type {!number} */
	var m11$0;
	/** @type {!number} */
	var m12$0;
	/** @type {!number} */
	var m13$0;
	/** @type {!number} */
	var m14$0;
	/** @type {!number} */
	var m21$0;
	/** @type {!number} */
	var m22$0;
	/** @type {!number} */
	var m23$0;
	/** @type {!number} */
	var m24$0;
	/** @type {!number} */
	var m31$0;
	/** @type {!number} */
	var m32$0;
	/** @type {!number} */
	var m33$0;
	/** @type {!number} */
	var m34$0;
	/** @type {!number} */
	var m41$0;
	/** @type {!number} */
	var m42$0;
	/** @type {!number} */
	var m43$0;
	/** @type {!number} */
	var m44$0;
	/** @type {Vector} */
	var this$1;
	/** @type {Vector} */
	var this$2;
	/** @type {!number} */
	var x$0;
	/** @type {!number} */
	var y$0;
	/** @type {!number} */
	var z$0;
	/** @type {!number} */
	var w$0;
	/** @type {!number} */
	var x$1;
	/** @type {!number} */
	var y$1;
	/** @type {!number} */
	var z$1;
	/** @type {!number} */
	var w$1;
	/** @type {!number} */
	var _m11$0;
	/** @type {!number} */
	var _m12$0;
	/** @type {!number} */
	var _m13$0;
	/** @type {!number} */
	var _m14$0;
	/** @type {!number} */
	var _m11$1;
	/** @type {!number} */
	var _m21$0;
	/** @type {!number} */
	var _m31$0;
	/** @type {!number} */
	var _m41$0;
	/** @type {!number} */
	var _m21$1;
	/** @type {!number} */
	var _m12$1;
	/** @type {!number} */
	var _m22$0;
	/** @type {!number} */
	var _m22$1;
	/** @type {!number} */
	var _m23$0;
	/** @type {!number} */
	var _m32$0;
	/** @type {!number} */
	var _m24$0;
	/** @type {!number} */
	var _m42$0;
	/** @type {!number} */
	var _m13$1;
	/** @type {!number} */
	var _m23$1;
	/** @type {!number} */
	var _m33$0;
	/** @type {!number} */
	var _m43$0;
	/** @type {!number} */
	var _m14$1;
	/** @type {!number} */
	var _m24$1;
	/** @type {!number} */
	var _m34$0;
	/** @type {!number} */
	var _m44$0;
	/** @type {!number} */
	var _m31$1;
	/** @type {!number} */
	var _m32$1;
	/** @type {!number} */
	var _m33$1;
	/** @type {!number} */
	var _m34$1;
	/** @type {!number} */
	var _m41$1;
	/** @type {!number} */
	var _m42$1;
	/** @type {!number} */
	var _m43$1;
	/** @type {!number} */
	var _m44$1;
	/** @type {!number} */
	var x$2;
	/** @type {!number} */
	var y$2;
	/** @type {!number} */
	var z$2;
	/** @type {!number} */
	var w$2;
	/** @type {!number} */
	var x$3;
	/** @type {!number} */
	var y$3;
	/** @type {!number} */
	var z$3;
	/** @type {!number} */
	var w$3;
	/** @type {HTMLImageElement} */
	var _image$0;
	/** @type {!number} */
	var projectionAndScreenMatrix$_m11$0;
	/** @type {!number} */
	var projectionAndScreenMatrix$_m12$0;
	/** @type {!number} */
	var projectionAndScreenMatrix$_m13$0;
	/** @type {!number} */
	var projectionAndScreenMatrix$_m14$0;
	/** @type {!number} */
	var projectionAndScreenMatrix$_m21$0;
	/** @type {!number} */
	var projectionAndScreenMatrix$_m22$0;
	/** @type {!number} */
	var projectionAndScreenMatrix$_m23$0;
	/** @type {!number} */
	var projectionAndScreenMatrix$_m24$0;
	/** @type {!number} */
	var projectionAndScreenMatrix$_m31$0;
	/** @type {!number} */
	var projectionAndScreenMatrix$_m32$0;
	/** @type {!number} */
	var projectionAndScreenMatrix$_m33$0;
	/** @type {!number} */
	var projectionAndScreenMatrix$_m34$0;
	/** @type {!number} */
	var projectionAndScreenMatrix$_m41$0;
	/** @type {!number} */
	var projectionAndScreenMatrix$_m42$0;
	/** @type {!number} */
	var projectionAndScreenMatrix$_m43$0;
	/** @type {!number} */
	var projectionAndScreenMatrix$_m44$0;
	/** @type {!number} */
	var vLeftBottom$x$0;
	/** @type {!number} */
	var vLeftBottom$y$0;
	/** @type {!number} */
	var vLeftBottom$z$0;
	/** @type {!number} */
	var vLeftBottom$w$0;
	/** @type {!number} */
	var other$1$x$0;
	/** @type {!number} */
	var other$1$y$0;
	/** @type {!number} */
	var other$1$z$0;
	/** @type {!number} */
	var other$1$w$0;
	if (! Engine.isLoadedImage[this._src]) {
		return false;
	}
	context = engine.context;
	this$0 = engine.screenMatrix;
	other$0 = engine.camera.projectionMatrix;
	m11$0 = (_m11$0 = this$0._m11) * (_m11$1 = other$0._m11) + (_m12$0 = this$0._m12) * (_m21$0 = other$0._m21) + (_m13$0 = this$0._m13) * (_m31$0 = other$0._m31) + (_m14$0 = this$0._m14) * (_m41$0 = other$0._m41);
	m12$0 = _m11$0 * (_m12$1 = other$0._m12) + _m12$0 * (_m22$1 = other$0._m22) + _m13$0 * (_m32$0 = other$0._m32) + _m14$0 * (_m42$0 = other$0._m42);
	m13$0 = _m11$0 * (_m13$1 = other$0._m13) + _m12$0 * (_m23$1 = other$0._m23) + _m13$0 * (_m33$0 = other$0._m33) + _m14$0 * (_m43$0 = other$0._m43);
	m14$0 = _m11$0 * (_m14$1 = other$0._m14) + _m12$0 * (_m24$1 = other$0._m24) + _m13$0 * (_m34$0 = other$0._m34) + _m14$0 * (_m44$0 = other$0._m44);
	m21$0 = (_m21$1 = this$0._m21) * _m11$1 + (_m22$0 = this$0._m22) * _m21$0 + (_m23$0 = this$0._m23) * _m31$0 + (_m24$0 = this$0._m24) * _m41$0;
	m22$0 = _m21$1 * _m12$1 + _m22$0 * _m22$1 + _m23$0 * _m32$0 + _m24$0 * _m42$0;
	m23$0 = _m21$1 * _m13$1 + _m22$0 * _m23$1 + _m23$0 * _m33$0 + _m24$0 * _m43$0;
	m24$0 = _m21$1 * _m14$1 + _m22$0 * _m24$1 + _m23$0 * _m34$0 + _m24$0 * _m44$0;
	m31$0 = (_m31$1 = this$0._m31) * _m11$1 + (_m32$1 = this$0._m32) * _m21$0 + (_m33$1 = this$0._m33) * _m31$0 + (_m34$1 = this$0._m34) * _m41$0;
	m32$0 = _m31$1 * _m12$1 + _m32$1 * _m22$1 + _m33$1 * _m32$0 + _m34$1 * _m42$0;
	m33$0 = _m31$1 * _m13$1 + _m32$1 * _m23$1 + _m33$1 * _m33$0 + _m34$1 * _m43$0;
	m34$0 = _m31$1 * _m14$1 + _m32$1 * _m24$1 + _m33$1 * _m34$0 + _m34$1 * _m44$0;
	m41$0 = (_m41$1 = this$0._m41) * _m11$1 + (_m42$1 = this$0._m42) * _m21$0 + (_m43$1 = this$0._m43) * _m31$0 + (_m44$1 = this$0._m44) * _m41$0;
	m42$0 = _m41$1 * _m12$1 + _m42$1 * _m22$1 + _m43$1 * _m32$0 + _m44$1 * _m42$0;
	m43$0 = _m41$1 * _m13$1 + _m42$1 * _m23$1 + _m43$1 * _m33$0 + _m44$1 * _m43$0;
	m44$0 = _m41$1 * _m14$1 + _m42$1 * _m24$1 + _m43$1 * _m34$0 + _m44$1 * _m44$0;
	projectionAndScreenMatrix$_m11$0 = [ m11$0, m12$0, m13$0, m14$0, m21$0, m22$0, m23$0, m24$0, m31$0, m32$0, m33$0, m34$0, m41$0, m42$0, m43$0, m44$0 ][0];
	projectionAndScreenMatrix$_m12$0 = [ m11$0, m12$0, m13$0, m14$0, m21$0, m22$0, m23$0, m24$0, m31$0, m32$0, m33$0, m34$0, m41$0, m42$0, m43$0, m44$0 ][1];
	projectionAndScreenMatrix$_m13$0 = [ m11$0, m12$0, m13$0, m14$0, m21$0, m22$0, m23$0, m24$0, m31$0, m32$0, m33$0, m34$0, m41$0, m42$0, m43$0, m44$0 ][2];
	projectionAndScreenMatrix$_m14$0 = [ m11$0, m12$0, m13$0, m14$0, m21$0, m22$0, m23$0, m24$0, m31$0, m32$0, m33$0, m34$0, m41$0, m42$0, m43$0, m44$0 ][3];
	projectionAndScreenMatrix$_m21$0 = [ m11$0, m12$0, m13$0, m14$0, m21$0, m22$0, m23$0, m24$0, m31$0, m32$0, m33$0, m34$0, m41$0, m42$0, m43$0, m44$0 ][4];
	projectionAndScreenMatrix$_m22$0 = [ m11$0, m12$0, m13$0, m14$0, m21$0, m22$0, m23$0, m24$0, m31$0, m32$0, m33$0, m34$0, m41$0, m42$0, m43$0, m44$0 ][5];
	projectionAndScreenMatrix$_m23$0 = [ m11$0, m12$0, m13$0, m14$0, m21$0, m22$0, m23$0, m24$0, m31$0, m32$0, m33$0, m34$0, m41$0, m42$0, m43$0, m44$0 ][6];
	projectionAndScreenMatrix$_m24$0 = [ m11$0, m12$0, m13$0, m14$0, m21$0, m22$0, m23$0, m24$0, m31$0, m32$0, m33$0, m34$0, m41$0, m42$0, m43$0, m44$0 ][7];
	projectionAndScreenMatrix$_m31$0 = [ m11$0, m12$0, m13$0, m14$0, m21$0, m22$0, m23$0, m24$0, m31$0, m32$0, m33$0, m34$0, m41$0, m42$0, m43$0, m44$0 ][8];
	projectionAndScreenMatrix$_m32$0 = [ m11$0, m12$0, m13$0, m14$0, m21$0, m22$0, m23$0, m24$0, m31$0, m32$0, m33$0, m34$0, m41$0, m42$0, m43$0, m44$0 ][9];
	projectionAndScreenMatrix$_m33$0 = [ m11$0, m12$0, m13$0, m14$0, m21$0, m22$0, m23$0, m24$0, m31$0, m32$0, m33$0, m34$0, m41$0, m42$0, m43$0, m44$0 ][10];
	projectionAndScreenMatrix$_m34$0 = [ m11$0, m12$0, m13$0, m14$0, m21$0, m22$0, m23$0, m24$0, m31$0, m32$0, m33$0, m34$0, m41$0, m42$0, m43$0, m44$0 ][11];
	projectionAndScreenMatrix$_m41$0 = [ m11$0, m12$0, m13$0, m14$0, m21$0, m22$0, m23$0, m24$0, m31$0, m32$0, m33$0, m34$0, m41$0, m42$0, m43$0, m44$0 ][12];
	projectionAndScreenMatrix$_m42$0 = [ m11$0, m12$0, m13$0, m14$0, m21$0, m22$0, m23$0, m24$0, m31$0, m32$0, m33$0, m34$0, m41$0, m42$0, m43$0, m44$0 ][13];
	projectionAndScreenMatrix$_m43$0 = [ m11$0, m12$0, m13$0, m14$0, m21$0, m22$0, m23$0, m24$0, m31$0, m32$0, m33$0, m34$0, m41$0, m42$0, m43$0, m44$0 ][14];
	projectionAndScreenMatrix$_m44$0 = [ m11$0, m12$0, m13$0, m14$0, m21$0, m22$0, m23$0, m24$0, m31$0, m32$0, m33$0, m34$0, m41$0, m42$0, m43$0, m44$0 ][15];
	this$1 = this.vCenter;
	other$1$x$0 = this._width / 2;
	other$1$y$0 = this._height / 2;
	other$1$z$0 = 0;
	other$1$w$0 = 1;
	vLeftBottom$x$0 = this$1.x - other$1$x$0;
	vLeftBottom$y$0 = this$1.y - other$1$y$0;
	vLeftBottom$z$0 = this$1.z - other$1$z$0;
	vLeftBottom$w$0 = 1;
	this$2 = this.vCenter;
	x$0 = projectionAndScreenMatrix$_m11$0 * (x$2 = this$2.x) + projectionAndScreenMatrix$_m12$0 * (y$2 = this$2.y) + projectionAndScreenMatrix$_m13$0 * (z$2 = this$2.z) + projectionAndScreenMatrix$_m14$0 * (w$2 = this$2.w);
	y$0 = projectionAndScreenMatrix$_m21$0 * x$2 + projectionAndScreenMatrix$_m22$0 * y$2 + projectionAndScreenMatrix$_m23$0 * z$2 + projectionAndScreenMatrix$_m24$0 * w$2;
	z$0 = projectionAndScreenMatrix$_m31$0 * x$2 + projectionAndScreenMatrix$_m32$0 * y$2 + projectionAndScreenMatrix$_m33$0 * z$2 + projectionAndScreenMatrix$_m34$0 * w$2;
	w$0 = projectionAndScreenMatrix$_m41$0 * x$2 + projectionAndScreenMatrix$_m42$0 * y$2 + projectionAndScreenMatrix$_m43$0 * z$2 + projectionAndScreenMatrix$_m44$0 * w$2;
	sCenter = new Vector$NNNN(x$0, y$0, z$0, w$0);
	x$1 = projectionAndScreenMatrix$_m11$0 * (x$3 = vLeftBottom$x$0) + projectionAndScreenMatrix$_m12$0 * (y$3 = vLeftBottom$y$0) + projectionAndScreenMatrix$_m13$0 * (z$3 = vLeftBottom$z$0) + projectionAndScreenMatrix$_m14$0 * (w$3 = vLeftBottom$w$0);
	y$1 = projectionAndScreenMatrix$_m21$0 * x$3 + projectionAndScreenMatrix$_m22$0 * y$3 + projectionAndScreenMatrix$_m23$0 * z$3 + projectionAndScreenMatrix$_m24$0 * w$3;
	z$1 = projectionAndScreenMatrix$_m31$0 * x$3 + projectionAndScreenMatrix$_m32$0 * y$3 + projectionAndScreenMatrix$_m33$0 * z$3 + projectionAndScreenMatrix$_m34$0 * w$3;
	w$1 = projectionAndScreenMatrix$_m41$0 * x$3 + projectionAndScreenMatrix$_m42$0 * y$3 + projectionAndScreenMatrix$_m43$0 * z$3 + projectionAndScreenMatrix$_m44$0 * w$3;
	sLeftBottom = new Vector$NNNN(x$1, y$1, z$1, w$1);
	sHalfWidth = sLeftBottom.x - sCenter.x;
	sHalfHeight = sLeftBottom.y - sCenter.y;
	isHiddenXY = Renderable$isHiddenXY$ALVector$LEngine$([ sCenter ], engine);
	if (isHiddenXY) {
		return false;
	}
	scaleX = sHalfWidth / (_image$0 = this._image).width * 2;
	scaleY = sHalfHeight / _image$0.height * 2;
	context.setTransform(scaleX, 0, 0, scaleY, 0, 0);
	context.drawImage(this._image, ~ ~ ((sCenter.x - sHalfWidth) / scaleX), ~ ~ ((sCenter.y - sHalfHeight) / scaleY));
	context.setTransform(1, 0, 0, 1, 0, 0);
	return true;
};

/**
 * class List$Vector$E extends Object
 * @constructor
 */
function List$Vector$E() {
}

List$Vector$E.prototype = new Object;
/**
 * @constructor
 */
function List$Vector$E$() {
	this.head = null;
	this.tail = null;
	this.length = 0;
};

List$Vector$E$.prototype = new List$Vector$E;

/**
 * @constructor
 * @param {Array.<undefined|Vector>} array
 */
function List$Vector$E$ALVector$(array) {
	/** @type {!number} */
	var len;
	/** @type {!number} */
	var i;
	this.head = null;
	this.tail = null;
	this.length = 0;
	len = array.length;
	for (i = 0; i < len; i++) {
		this.prepend$LVector$(array.pop());
	}
};

List$Vector$E$ALVector$.prototype = new List$Vector$E;

/**
 * @param {Vector} value
 * @return {List$Vector$E}
 */
List$Vector$E.prototype.prepend$LVector$ = function (value) {
	/** @type {Node$Vector$E} */
	var node;
	/** @type {Node$Vector$E} */
	var head$0;
	node = {value: value, _prev: null, _next: null};
	if (this.length === 0) {
		this.head = node;
		this.tail = node;
	} else {
		node._next = head$0 = this.head;
		head$0._prev = node;
		this.head = node;
	}
	this.length++;
	return this;
};

/**
 * @param {Vector} value
 * @return {List$Vector$E}
 */
List$Vector$E.prototype.append$LVector$ = function (value) {
	/** @type {Node$Vector$E} */
	var node;
	/** @type {Node$Vector$E} */
	var tail$0;
	node = {value: value, _prev: null, _next: null};
	if (this.length === 0) {
		this.head = node;
		this.tail = node;
	} else {
		node._prev = tail$0 = this.tail;
		tail$0._next = node;
		this.tail = node;
	}
	this.length++;
	return this;
};

/**
 * @param {Node$Vector$E} node
 * @return {Vector}
 */
List$Vector$E.prototype.remove$LNode$Vector$E$ = function (node) {
	if (node._prev) {
		node._prev._next = node._next;
	} else {
		this.head = node._next;
	}
	if (node._next) {
		node._next._prev = node._prev;
	} else {
		this.tail = node._prev;
	}
	return node.value;
};

/**
 * @return {Vector}
 */
List$Vector$E.prototype.removeFirst$ = function () {
	/** @type {Node$Vector$E} */
	var node;
	/** @type {Node$Vector$E} */
	var _next$0;
	node = this.head;
	this.head = _next$0 = node._next;
	if (_next$0 != null) {
		node._next._prev = null;
	}
	this.length--;
	return node.value;
};

/**
 * @return {Vector}
 */
List$Vector$E.prototype.removeLast$ = function () {
	/** @type {Node$Vector$E} */
	var node;
	/** @type {Node$Vector$E} */
	var _prev$0;
	node = this.tail;
	this.tail = _prev$0 = node._prev;
	if (_prev$0 != null) {
		node._prev._next = null;
	}
	this.length--;
	return node.value;
};

/**
 * @param {Node$Vector$E} node
 * @param {Vector} value
 * @return {List$Vector$E}
 */
List$Vector$E.prototype.insertAfter$LNode$Vector$E$LVector$ = function (node, value) {
	/** @type {Node$Vector$E} */
	var newNode;
	/** @type {Node$Vector$E} */
	var _next$0;
	newNode = {value: value, _prev: null, _next: null};
	if (node._next == null) {
		newNode._prev = node;
		node._next = newNode;
		this.tail = newNode;
	} else {
		newNode._next = _next$0 = node._next;
		newNode._prev = node;
		_next$0._prev = newNode;
		node._next = newNode;
	}
	this.length++;
	return this;
};

/**
 * @param {Node$Vector$E} node
 * @param {Vector} value
 * @return {List$Vector$E}
 */
List$Vector$E.prototype.insertBefore$LNode$Vector$E$LVector$ = function (node, value) {
	/** @type {Node$Vector$E} */
	var newNode;
	/** @type {Node$Vector$E} */
	var _prev$0;
	newNode = {value: value, _prev: null, _next: null};
	if (node._prev == null) {
		newNode._next = node;
		node._prev = newNode;
		this.head = newNode;
	} else {
		newNode._next = node;
		newNode._prev = _prev$0 = node._prev;
		_prev$0._next = newNode;
		node._prev = newNode;
	}
	this.length++;
	return this;
};

/**
 */
List$Vector$E.prototype.forEach$F$LVector$V$ = function (f) {
	/** @type {Node$Vector$E} */
	var n;
	for (n = this.head; n; n = n._next) {
		f(n.value);
	}
};

/**
 * @return {!string}
 */
List$Vector$E.prototype.toString = function () {
	/** @type {!string} */
	var str;
	/** @type {Node$Vector$E} */
	var n;
	str = 'list : [';
	for (n = this.head; n != null; n = n._next) {
		str += ' ' + n.value.toString() + ',';
	}
	str += ']';
	return str;
};

/**
 * class Node$Vector$E extends Object
 * @constructor
 */
function Node$Vector$E() {
}

Node$Vector$E.prototype = new Object;
/**
 * @constructor
 * @param {Vector} value
 */
function Node$Vector$E$LVector$(value) {
	this.value = value;
	this._prev = null;
	this._next = null;
};

Node$Vector$E$LVector$.prototype = new Node$Vector$E;

/**
 * @param {Node$Vector$E} $this
 * @return {Node$Vector$E}
 */
Node$Vector$E.prev$LNode$Vector$E$ = function ($this) {
	return $this._prev;
};

var Node$Vector$E$prev$LNode$Vector$E$ = Node$Vector$E.prev$LNode$Vector$E$;

/**
 * @param {Node$Vector$E} $this
 * @return {Node$Vector$E}
 */
Node$Vector$E.next$LNode$Vector$E$ = function ($this) {
	return $this._next;
};

var Node$Vector$E$next$LNode$Vector$E$ = Node$Vector$E.next$LNode$Vector$E$;

/**
 * class List$Matrix$E extends Object
 * @constructor
 */
function List$Matrix$E() {
}

List$Matrix$E.prototype = new Object;
/**
 * @constructor
 */
function List$Matrix$E$() {
	this.head = null;
	this.tail = null;
	this.length = 0;
};

List$Matrix$E$.prototype = new List$Matrix$E;

/**
 * @constructor
 * @param {Array.<undefined|Matrix>} array
 */
function List$Matrix$E$ALMatrix$(array) {
	/** @type {!number} */
	var len;
	/** @type {!number} */
	var i;
	this.head = null;
	this.tail = null;
	this.length = 0;
	len = array.length;
	for (i = 0; i < len; i++) {
		this.prepend$LMatrix$(array.pop());
	}
};

List$Matrix$E$ALMatrix$.prototype = new List$Matrix$E;

/**
 * @param {Matrix} value
 * @return {List$Matrix$E}
 */
List$Matrix$E.prototype.prepend$LMatrix$ = function (value) {
	/** @type {Node$Matrix$E} */
	var node;
	/** @type {Node$Matrix$E} */
	var head$0;
	node = {value: value, _prev: null, _next: null};
	if (this.length === 0) {
		this.head = node;
		this.tail = node;
	} else {
		node._next = head$0 = this.head;
		head$0._prev = node;
		this.head = node;
	}
	this.length++;
	return this;
};

/**
 * @param {Matrix} value
 * @return {List$Matrix$E}
 */
List$Matrix$E.prototype.append$LMatrix$ = function (value) {
	/** @type {Node$Matrix$E} */
	var node;
	/** @type {Node$Matrix$E} */
	var tail$0;
	node = {value: value, _prev: null, _next: null};
	if (this.length === 0) {
		this.head = node;
		this.tail = node;
	} else {
		node._prev = tail$0 = this.tail;
		tail$0._next = node;
		this.tail = node;
	}
	this.length++;
	return this;
};

/**
 * @param {Node$Matrix$E} node
 * @return {Matrix}
 */
List$Matrix$E.prototype.remove$LNode$Matrix$E$ = function (node) {
	if (node._prev) {
		node._prev._next = node._next;
	} else {
		this.head = node._next;
	}
	if (node._next) {
		node._next._prev = node._prev;
	} else {
		this.tail = node._prev;
	}
	return node.value;
};

/**
 * @return {Matrix}
 */
List$Matrix$E.prototype.removeFirst$ = function () {
	/** @type {Node$Matrix$E} */
	var node;
	/** @type {Node$Matrix$E} */
	var _next$0;
	node = this.head;
	this.head = _next$0 = node._next;
	if (_next$0 != null) {
		node._next._prev = null;
	}
	this.length--;
	return node.value;
};

/**
 * @return {Matrix}
 */
List$Matrix$E.prototype.removeLast$ = function () {
	/** @type {Node$Matrix$E} */
	var node;
	/** @type {Node$Matrix$E} */
	var _prev$0;
	node = this.tail;
	this.tail = _prev$0 = node._prev;
	if (_prev$0 != null) {
		node._prev._next = null;
	}
	this.length--;
	return node.value;
};

/**
 * @param {Node$Matrix$E} node
 * @param {Matrix} value
 * @return {List$Matrix$E}
 */
List$Matrix$E.prototype.insertAfter$LNode$Matrix$E$LMatrix$ = function (node, value) {
	/** @type {Node$Matrix$E} */
	var newNode;
	/** @type {Node$Matrix$E} */
	var _next$0;
	newNode = {value: value, _prev: null, _next: null};
	if (node._next == null) {
		newNode._prev = node;
		node._next = newNode;
		this.tail = newNode;
	} else {
		newNode._next = _next$0 = node._next;
		newNode._prev = node;
		_next$0._prev = newNode;
		node._next = newNode;
	}
	this.length++;
	return this;
};

/**
 * @param {Node$Matrix$E} node
 * @param {Matrix} value
 * @return {List$Matrix$E}
 */
List$Matrix$E.prototype.insertBefore$LNode$Matrix$E$LMatrix$ = function (node, value) {
	/** @type {Node$Matrix$E} */
	var newNode;
	/** @type {Node$Matrix$E} */
	var _prev$0;
	newNode = {value: value, _prev: null, _next: null};
	if (node._prev == null) {
		newNode._next = node;
		node._prev = newNode;
		this.head = newNode;
	} else {
		newNode._next = node;
		newNode._prev = _prev$0 = node._prev;
		_prev$0._next = newNode;
		node._prev = newNode;
	}
	this.length++;
	return this;
};

/**
 */
List$Matrix$E.prototype.forEach$F$LMatrix$V$ = function (f) {
	/** @type {Node$Matrix$E} */
	var n;
	for (n = this.head; n; n = n._next) {
		f(n.value);
	}
};

/**
 * @return {!string}
 */
List$Matrix$E.prototype.toString = function () {
	/** @type {!string} */
	var str;
	/** @type {Node$Matrix$E} */
	var n;
	str = 'list : [';
	for (n = this.head; n != null; n = n._next) {
		str += ' ' + n.value.toString() + ',';
	}
	str += ']';
	return str;
};

/**
 * class Node$Matrix$E extends Object
 * @constructor
 */
function Node$Matrix$E() {
}

Node$Matrix$E.prototype = new Object;
/**
 * @constructor
 * @param {Matrix} value
 */
function Node$Matrix$E$LMatrix$(value) {
	this.value = value;
	this._prev = null;
	this._next = null;
};

Node$Matrix$E$LMatrix$.prototype = new Node$Matrix$E;

/**
 * @param {Node$Matrix$E} $this
 * @return {Node$Matrix$E}
 */
Node$Matrix$E.prev$LNode$Matrix$E$ = function ($this) {
	return $this._prev;
};

var Node$Matrix$E$prev$LNode$Matrix$E$ = Node$Matrix$E.prev$LNode$Matrix$E$;

/**
 * @param {Node$Matrix$E} $this
 * @return {Node$Matrix$E}
 */
Node$Matrix$E.next$LNode$Matrix$E$ = function ($this) {
	return $this._next;
};

var Node$Matrix$E$next$LNode$Matrix$E$ = Node$Matrix$E.next$LNode$Matrix$E$;

/**
 * class List$Renderable$E extends Object
 * @constructor
 */
function List$Renderable$E() {
}

List$Renderable$E.prototype = new Object;
/**
 * @constructor
 */
function List$Renderable$E$() {
	this.head = null;
	this.tail = null;
	this.length = 0;
};

List$Renderable$E$.prototype = new List$Renderable$E;

/**
 * @constructor
 * @param {Array.<undefined|Renderable>} array
 */
function List$Renderable$E$ALRenderable$(array) {
	/** @type {!number} */
	var len;
	/** @type {!number} */
	var i;
	this.head = null;
	this.tail = null;
	this.length = 0;
	len = array.length;
	for (i = 0; i < len; i++) {
		this.prepend$LRenderable$(array.pop());
	}
};

List$Renderable$E$ALRenderable$.prototype = new List$Renderable$E;

/**
 * @param {Renderable} value
 * @return {List$Renderable$E}
 */
List$Renderable$E.prototype.prepend$LRenderable$ = function (value) {
	/** @type {Node$Renderable$E} */
	var node;
	/** @type {Node$Renderable$E} */
	var head$0;
	node = {value: value, _prev: null, _next: null};
	if (this.length === 0) {
		this.head = node;
		this.tail = node;
	} else {
		node._next = head$0 = this.head;
		head$0._prev = node;
		this.head = node;
	}
	this.length++;
	return this;
};

/**
 * @param {Renderable} value
 * @return {List$Renderable$E}
 */
List$Renderable$E.prototype.append$LRenderable$ = function (value) {
	/** @type {Node$Renderable$E} */
	var node;
	/** @type {Node$Renderable$E} */
	var tail$0;
	node = {value: value, _prev: null, _next: null};
	if (this.length === 0) {
		this.head = node;
		this.tail = node;
	} else {
		node._prev = tail$0 = this.tail;
		tail$0._next = node;
		this.tail = node;
	}
	this.length++;
	return this;
};

/**
 * @param {Node$Renderable$E} node
 * @return {Renderable}
 */
List$Renderable$E.prototype.remove$LNode$Renderable$E$ = function (node) {
	if (node._prev) {
		node._prev._next = node._next;
	} else {
		this.head = node._next;
	}
	if (node._next) {
		node._next._prev = node._prev;
	} else {
		this.tail = node._prev;
	}
	return node.value;
};

/**
 * @return {Renderable}
 */
List$Renderable$E.prototype.removeFirst$ = function () {
	/** @type {Node$Renderable$E} */
	var node;
	/** @type {Node$Renderable$E} */
	var _next$0;
	node = this.head;
	this.head = _next$0 = node._next;
	if (_next$0 != null) {
		node._next._prev = null;
	}
	this.length--;
	return node.value;
};

/**
 * @return {Renderable}
 */
List$Renderable$E.prototype.removeLast$ = function () {
	/** @type {Node$Renderable$E} */
	var node;
	/** @type {Node$Renderable$E} */
	var _prev$0;
	node = this.tail;
	this.tail = _prev$0 = node._prev;
	if (_prev$0 != null) {
		node._prev._next = null;
	}
	this.length--;
	return node.value;
};

/**
 * @param {Node$Renderable$E} node
 * @param {Renderable} value
 * @return {List$Renderable$E}
 */
List$Renderable$E.prototype.insertAfter$LNode$Renderable$E$LRenderable$ = function (node, value) {
	/** @type {Node$Renderable$E} */
	var newNode;
	/** @type {Node$Renderable$E} */
	var _next$0;
	newNode = {value: value, _prev: null, _next: null};
	if (node._next == null) {
		newNode._prev = node;
		node._next = newNode;
		this.tail = newNode;
	} else {
		newNode._next = _next$0 = node._next;
		newNode._prev = node;
		_next$0._prev = newNode;
		node._next = newNode;
	}
	this.length++;
	return this;
};

/**
 * @param {Node$Renderable$E} node
 * @param {Renderable} value
 * @return {List$Renderable$E}
 */
List$Renderable$E.prototype.insertBefore$LNode$Renderable$E$LRenderable$ = function (node, value) {
	/** @type {Node$Renderable$E} */
	var newNode;
	/** @type {Node$Renderable$E} */
	var _prev$0;
	newNode = {value: value, _prev: null, _next: null};
	if (node._prev == null) {
		newNode._next = node;
		node._prev = newNode;
		this.head = newNode;
	} else {
		newNode._next = node;
		newNode._prev = _prev$0 = node._prev;
		_prev$0._next = newNode;
		node._prev = newNode;
	}
	this.length++;
	return this;
};

/**
 */
List$Renderable$E.prototype.forEach$F$LRenderable$V$ = function (f) {
	/** @type {Node$Renderable$E} */
	var n;
	for (n = this.head; n; n = n._next) {
		f(n.value);
	}
};

/**
 * @return {!string}
 */
List$Renderable$E.prototype.toString = function () {
	/** @type {!string} */
	var str;
	/** @type {Node$Renderable$E} */
	var n;
	str = 'list : [';
	for (n = this.head; n != null; n = n._next) {
		str += ' ' + n.value.toString() + ',';
	}
	str += ']';
	return str;
};

/**
 * class Node$Renderable$E extends Object
 * @constructor
 */
function Node$Renderable$E() {
}

Node$Renderable$E.prototype = new Object;
/**
 * @constructor
 * @param {Renderable} value
 */
function Node$Renderable$E$LRenderable$(value) {
	this.value = value;
	this._prev = null;
	this._next = null;
};

Node$Renderable$E$LRenderable$.prototype = new Node$Renderable$E;

/**
 * @param {Node$Renderable$E} $this
 * @return {Node$Renderable$E}
 */
Node$Renderable$E.prev$LNode$Renderable$E$ = function ($this) {
	return $this._prev;
};

var Node$Renderable$E$prev$LNode$Renderable$E$ = Node$Renderable$E.prev$LNode$Renderable$E$;

/**
 * @param {Node$Renderable$E} $this
 * @return {Node$Renderable$E}
 */
Node$Renderable$E.next$LNode$Renderable$E$ = function ($this) {
	return $this._next;
};

var Node$Renderable$E$next$LNode$Renderable$E$ = Node$Renderable$E.next$LNode$Renderable$E$;

/**
 * class List$Polygon$E extends Object
 * @constructor
 */
function List$Polygon$E() {
}

List$Polygon$E.prototype = new Object;
/**
 * @constructor
 */
function List$Polygon$E$() {
	this.head = null;
	this.tail = null;
	this.length = 0;
};

List$Polygon$E$.prototype = new List$Polygon$E;

/**
 * @constructor
 * @param {Array.<undefined|Polygon>} array
 */
function List$Polygon$E$ALPolygon$(array) {
	/** @type {!number} */
	var len;
	/** @type {!number} */
	var i;
	this.head = null;
	this.tail = null;
	this.length = 0;
	len = array.length;
	for (i = 0; i < len; i++) {
		this.prepend$LPolygon$(array.pop());
	}
};

List$Polygon$E$ALPolygon$.prototype = new List$Polygon$E;

/**
 * @param {Polygon} value
 * @return {List$Polygon$E}
 */
List$Polygon$E.prototype.prepend$LPolygon$ = function (value) {
	/** @type {Node$Polygon$E} */
	var node;
	/** @type {Node$Polygon$E} */
	var head$0;
	node = {value: value, _prev: null, _next: null};
	if (this.length === 0) {
		this.head = node;
		this.tail = node;
	} else {
		node._next = head$0 = this.head;
		head$0._prev = node;
		this.head = node;
	}
	this.length++;
	return this;
};

/**
 * @param {Polygon} value
 * @return {List$Polygon$E}
 */
List$Polygon$E.prototype.append$LPolygon$ = function (value) {
	/** @type {Node$Polygon$E} */
	var node;
	/** @type {Node$Polygon$E} */
	var tail$0;
	node = {value: value, _prev: null, _next: null};
	if (this.length === 0) {
		this.head = node;
		this.tail = node;
	} else {
		node._prev = tail$0 = this.tail;
		tail$0._next = node;
		this.tail = node;
	}
	this.length++;
	return this;
};

/**
 * @param {Node$Polygon$E} node
 * @return {Polygon}
 */
List$Polygon$E.prototype.remove$LNode$Polygon$E$ = function (node) {
	if (node._prev) {
		node._prev._next = node._next;
	} else {
		this.head = node._next;
	}
	if (node._next) {
		node._next._prev = node._prev;
	} else {
		this.tail = node._prev;
	}
	return node.value;
};

/**
 * @return {Polygon}
 */
List$Polygon$E.prototype.removeFirst$ = function () {
	/** @type {Node$Polygon$E} */
	var node;
	/** @type {Node$Polygon$E} */
	var _next$0;
	node = this.head;
	this.head = _next$0 = node._next;
	if (_next$0 != null) {
		node._next._prev = null;
	}
	this.length--;
	return node.value;
};

/**
 * @return {Polygon}
 */
List$Polygon$E.prototype.removeLast$ = function () {
	/** @type {Node$Polygon$E} */
	var node;
	/** @type {Node$Polygon$E} */
	var _prev$0;
	node = this.tail;
	this.tail = _prev$0 = node._prev;
	if (_prev$0 != null) {
		node._prev._next = null;
	}
	this.length--;
	return node.value;
};

/**
 * @param {Node$Polygon$E} node
 * @param {Polygon} value
 * @return {List$Polygon$E}
 */
List$Polygon$E.prototype.insertAfter$LNode$Polygon$E$LPolygon$ = function (node, value) {
	/** @type {Node$Polygon$E} */
	var newNode;
	/** @type {Node$Polygon$E} */
	var _next$0;
	newNode = {value: value, _prev: null, _next: null};
	if (node._next == null) {
		newNode._prev = node;
		node._next = newNode;
		this.tail = newNode;
	} else {
		newNode._next = _next$0 = node._next;
		newNode._prev = node;
		_next$0._prev = newNode;
		node._next = newNode;
	}
	this.length++;
	return this;
};

/**
 * @param {Node$Polygon$E} node
 * @param {Polygon} value
 * @return {List$Polygon$E}
 */
List$Polygon$E.prototype.insertBefore$LNode$Polygon$E$LPolygon$ = function (node, value) {
	/** @type {Node$Polygon$E} */
	var newNode;
	/** @type {Node$Polygon$E} */
	var _prev$0;
	newNode = {value: value, _prev: null, _next: null};
	if (node._prev == null) {
		newNode._next = node;
		node._prev = newNode;
		this.head = newNode;
	} else {
		newNode._next = node;
		newNode._prev = _prev$0 = node._prev;
		_prev$0._next = newNode;
		node._prev = newNode;
	}
	this.length++;
	return this;
};

/**
 */
List$Polygon$E.prototype.forEach$F$LPolygon$V$ = function (f) {
	/** @type {Node$Polygon$E} */
	var n;
	for (n = this.head; n; n = n._next) {
		f(n.value);
	}
};

/**
 * @return {!string}
 */
List$Polygon$E.prototype.toString = function () {
	/** @type {!string} */
	var str;
	/** @type {Node$Polygon$E} */
	var n;
	str = 'list : [';
	for (n = this.head; n != null; n = n._next) {
		str += ' ' + n.value.toString() + ',';
	}
	str += ']';
	return str;
};

/**
 * class Node$Polygon$E extends Object
 * @constructor
 */
function Node$Polygon$E() {
}

Node$Polygon$E.prototype = new Object;
/**
 * @constructor
 * @param {Polygon} value
 */
function Node$Polygon$E$LPolygon$(value) {
	this.value = value;
	this._prev = null;
	this._next = null;
};

Node$Polygon$E$LPolygon$.prototype = new Node$Polygon$E;

/**
 * @param {Node$Polygon$E} $this
 * @return {Node$Polygon$E}
 */
Node$Polygon$E.prev$LNode$Polygon$E$ = function ($this) {
	return $this._prev;
};

var Node$Polygon$E$prev$LNode$Polygon$E$ = Node$Polygon$E.prev$LNode$Polygon$E$;

/**
 * @param {Node$Polygon$E} $this
 * @return {Node$Polygon$E}
 */
Node$Polygon$E.next$LNode$Polygon$E$ = function ($this) {
	return $this._next;
};

var Node$Polygon$E$next$LNode$Polygon$E$ = Node$Polygon$E.next$LNode$Polygon$E$;

/**
 * class dom extends Object
 * @constructor
 */
function dom() {
}

dom.prototype = new Object;
/**
 * @constructor
 */
function dom$() {
};

dom$.prototype = new dom;

/**
 * @param {!string} id
 * @return {HTMLElement}
 */
dom.id$S = function (id) {
	return (function (o) { return o instanceof HTMLElement ? o : null; })(dom.document.getElementById(id));
};

var dom$id$S = dom.id$S;

/**
 * @param {!string} id
 * @return {HTMLElement}
 */
dom.getElementById$S = function (id) {
	return (function (o) { return o instanceof HTMLElement ? o : null; })(dom.document.getElementById(id));
};

var dom$getElementById$S = dom.getElementById$S;

/**
 * @param {!string} tag
 * @return {HTMLElement}
 */
dom.createElement$S = function (tag) {
	return dom.document.createElement(tag);
};

var dom$createElement$S = dom.createElement$S;

/**
 * class Timer extends Object
 * @constructor
 */
function Timer() {
}

Timer.prototype = new Object;
/**
 * @constructor
 */
function Timer$() {
};

Timer$.prototype = new Timer;

/**
 * @param {!number} intervalMS
 * @return {TimerHandle}
 */
Timer.setTimeout$F$V$N = function (callback, intervalMS) {
	return js.global.setTimeout(callback, intervalMS);
};

var Timer$setTimeout$F$V$N = Timer.setTimeout$F$V$N;

/**
 * @param {TimerHandle} timer
 */
Timer.clearTimeout$LTimerHandle$ = function (timer) {
	js.global.clearTimeout(timer);
};

var Timer$clearTimeout$LTimerHandle$ = Timer.clearTimeout$LTimerHandle$;

/**
 * @param {!number} intervalMS
 * @return {TimerHandle}
 */
Timer.setInterval$F$V$N = function (callback, intervalMS) {
	return js.global.setInterval(callback, intervalMS);
};

var Timer$setInterval$F$V$N = Timer.setInterval$F$V$N;

/**
 * @param {TimerHandle} timer
 */
Timer.clearInterval$LTimerHandle$ = function (timer) {
	js.global.clearInterval(timer);
};

var Timer$clearInterval$LTimerHandle$ = Timer.clearInterval$LTimerHandle$;

/**
 * @return {TimerHandle}
 */
Timer.requestAnimationFrame$F$NV$ = function (callback) {
	return Timer._requestAnimationFrame(callback);
};

var Timer$requestAnimationFrame$F$NV$ = Timer.requestAnimationFrame$F$NV$;

/**
 * @param {TimerHandle} timer
 */
Timer.cancelAnimationFrame$LTimerHandle$ = function (timer) {
	Timer._cancelAnimationFrame(timer);
};

var Timer$cancelAnimationFrame$LTimerHandle$ = Timer.cancelAnimationFrame$LTimerHandle$;

/**
 * @param {!boolean} enable
 */
Timer.useNativeRAF$B = function (enable) {
	Timer._requestAnimationFrame = Timer$_getRequestAnimationFrameImpl$B(enable);
	Timer._cancelAnimationFrame = Timer$_getCancelAnimationFrameImpl$B(enable);
};

var Timer$useNativeRAF$B = Timer.useNativeRAF$B;

/**
 * @param {!boolean} useNativeImpl
 */
Timer._getRequestAnimationFrameImpl$B = function (useNativeImpl) {
	/** @type {!number} */
	var lastTime;
	if (useNativeImpl) {
		if (js.global.requestAnimationFrame) {
			return (function (callback) {
				return js.global.requestAnimationFrame(callback);
			});
		} else {
			if (js.global.webkitRequestAnimationFrame) {
				return (function (callback) {
					return js.global.webkitRequestAnimationFrame(callback);
				});
			} else {
				if (js.global.mozRequestAnimationFrame) {
					return (function (callback) {
						return js.global.mozRequestAnimationFrame(callback);
					});
				} else {
					if (js.global.oRequestAnimationFrame) {
						return (function (callback) {
							return js.global.oRequestAnimationFrame(callback);
						});
					} else {
						if (js.global.msRequestAnimationFrame) {
							return (function (callback) {
								return js.global.msRequestAnimationFrame(callback);
							});
						}
					}
				}
			}
		}
	}
	lastTime = 0;
	return (function (callback) {
		/** @type {!number} */
		var now;
		/** @type {!number} */
		var timeToCall;
		/** @type {!number} */
		var value2$0;
		now = Date.now();
		value2$0 = 16 - (now - lastTime);
		timeToCall = (0 >= value2$0 ? 0 : value2$0);
		lastTime = now + timeToCall;
		return js.global.setTimeout((function () {
			callback(now + timeToCall);
		}), timeToCall);
	});
};

var Timer$_getRequestAnimationFrameImpl$B = Timer._getRequestAnimationFrameImpl$B;

/**
 * @param {!boolean} useNativeImpl
 */
Timer._getCancelAnimationFrameImpl$B = function (useNativeImpl) {
	if (useNativeImpl) {
		if (js.global.cancelAnimationFrame) {
			return (function (timer) {
				js.global.cancelAnimationFrame(timer);
			});
		} else {
			if (js.global.webkitCancelAnimationFrame) {
				return (function (timer) {
					js.global.webkitCancelAnimationFrame(timer);
				});
			} else {
				if (js.global.mozCancelAnimationFrame) {
					return (function (timer) {
						js.global.mozCancelAnimationFrame(timer);
					});
				} else {
					if (js.global.oCancelAnimationFrame) {
						return (function (timer) {
							js.global.oCancelAnimationFrame(timer);
						});
					} else {
						if (js.global.msCancelAnimationFrame) {
							return (function (timer) {
								js.global.msCancelAnimationFrame(timer);
							});
						}
					}
				}
			}
		}
	}
	return Timer$clearTimeout$LTimerHandle$;
};

var Timer$_getCancelAnimationFrameImpl$B = Timer._getCancelAnimationFrameImpl$B;

/**
 * class TimerHandle extends Object
 * @constructor
 */
function TimerHandle() {
}

TimerHandle.prototype = new Object;
/**
 * @constructor
 */
function TimerHandle$() {
};

TimerHandle$.prototype = new TimerHandle;

/**
 * class Math2D extends Object
 * @constructor
 */
function Math2D() {
}

Math2D.prototype = new Object;
/**
 * @constructor
 */
function Math2D$() {
};

Math2D$.prototype = new Math2D;

/**
 * @param {!number} x1
 * @param {!number} y1
 * @param {!number} x2
 * @param {!number} y2
 * @return {!number}
 */
Math2D.cross$NNNN = function (x1, y1, x2, y2) {
	return x1 * y2 - x2 * y1;
};

var Math2D$cross$NNNN = Math2D.cross$NNNN;

/**
 * class Stopwatch extends Object
 * @constructor
 */
function Stopwatch() {
}

Stopwatch.prototype = new Object;
/**
 * @constructor
 */
function Stopwatch$() {
	this._lastLapMsec = null;
	this._elapsedMsec = 0;
	this._startedMsec = null;
};

Stopwatch$.prototype = new Stopwatch;

/**
 * @param {Stopwatch} $this
 * @return {!number}
 */
Stopwatch._currentMsec$LStopwatch$ = function ($this) {
	return Date.now();
};

var Stopwatch$_currentMsec$LStopwatch$ = Stopwatch._currentMsec$LStopwatch$;

/**
 * @param {Stopwatch} $this
 */
Stopwatch.start$LStopwatch$ = function ($this) {
	if (! ($this._startedMsec == null)) {
		debugger;
		throw new Error("[jsx/util.jsx:39] assertion failure");
	}
	$this._startedMsec = $this._lastLapMsec = Date.now();
};

var Stopwatch$start$LStopwatch$ = Stopwatch.start$LStopwatch$;

/**
 * @param {Stopwatch} $this
 */
Stopwatch.stop$LStopwatch$ = function ($this) {
	if (! ($this._startedMsec != null)) {
		debugger;
		throw new Error("[jsx/util.jsx:45] assertion failure");
	}
	$this._elapsedMsec += Date.now() - $this._startedMsec;
	$this._startedMsec = null;
	$this._lastLapMsec = null;
};

var Stopwatch$stop$LStopwatch$ = Stopwatch.stop$LStopwatch$;

/**
 * @param {Stopwatch} $this
 * @return {!boolean}
 */
Stopwatch.isStarted$LStopwatch$ = function ($this) {
	return $this._startedMsec != null;
};

var Stopwatch$isStarted$LStopwatch$ = Stopwatch.isStarted$LStopwatch$;

/**
 * @param {Stopwatch} $this
 * @return {!boolean}
 */
Stopwatch.isStopped$LStopwatch$ = function ($this) {
	return $this._startedMsec == null;
};

var Stopwatch$isStopped$LStopwatch$ = Stopwatch.isStopped$LStopwatch$;

/**
 * @param {Stopwatch} $this
 * @return {!number}
 */
Stopwatch.lap$LStopwatch$ = function ($this) {
	/** @type {!number} */
	var currentMsec;
	/** @type {!number} */
	var lapMsec;
	if (! ($this._lastLapMsec != null)) {
		debugger;
		throw new Error("[jsx/util.jsx:65] assertion failure");
	}
	currentMsec = Date.now();
	lapMsec = currentMsec - $this._lastLapMsec;
	$this._lastLapMsec = currentMsec;
	return lapMsec;
};

var Stopwatch$lap$LStopwatch$ = Stopwatch.lap$LStopwatch$;

/**
 * @param {Stopwatch} $this
 * @return {!number}
 */
Stopwatch.getElapsedMsec$LStopwatch$ = function ($this) {
	return $this._elapsedMsec;
};

var Stopwatch$getElapsedMsec$LStopwatch$ = Stopwatch.getElapsedMsec$LStopwatch$;

/**
 * class FpsManager extends Object
 * @constructor
 */
function FpsManager() {
}

FpsManager.prototype = new Object;
/**
 * @constructor
 */
function FpsManager$() {
	/** @type {HTMLElement} */
	var fpsElement$0;
	this._stopwatch = null;
	this._recentlyMsecLog = null;
	this._lastMsec = 0;
	this._fpsElement = null;
	this._enabledHtmlLog = false;
	this._enabledConsoleLog = false;
	fpsElement$0 = dom.document.createElement('span');
	fpsElement$0.style.position = 'absolute';
	fpsElement$0.style.top = '0px';
	fpsElement$0.style.left = '0px';
	fpsElement$0.style.display = 'none';
	fpsElement$0.innerHTML = 'XXXfps';
	dom.document.body.appendChild(fpsElement$0);
	this._fpsElement = fpsElement$0;
	this._stopwatch = {_elapsedMsec: 0, _startedMsec: null, _lastLapMsec: null};
	this._recentlyMsecLog = [  ];
	this._lastMsec = 0;
	this._enabledHtmlLog = false;
	this._enabledConsoleLog = false;
};

FpsManager$.prototype = new FpsManager;

/**
 * @return {HTMLElement}
 */
FpsManager.prototype.createFpsElement$ = function () {
	/** @type {HTMLElement} */
	var fpsElement;
	fpsElement = dom.document.createElement('span');
	fpsElement.style.position = 'absolute';
	fpsElement.style.top = '0px';
	fpsElement.style.left = '0px';
	fpsElement.style.display = 'none';
	fpsElement.innerHTML = 'XXXfps';
	return fpsElement;
};

/**
 * @param {!boolean} b
 */
FpsManager.prototype.setEnabledHtmlLog$B = function (b) {
	this._enabledHtmlLog = b;
	if (b) {
		this._fpsElement.style.display = null;
	} else {
		this._fpsElement.style.display = 'none';
	}
};

/**
 * @param {!boolean} b
 */
FpsManager.prototype.setEnabledConsoleLog$B = function (b) {
	this._enabledConsoleLog = b;
};

/**
 */
FpsManager.prototype.start$ = function () {
	Stopwatch$start$LStopwatch$(this._stopwatch);
};

/**
 * @return {!number}
 */
FpsManager.prototype.lastLap$ = function () {
	return this._lastMsec;
};

/**
 */
FpsManager.prototype.update$ = function () {
	/** @type {!number} */
	var lap;
	/** @type {!number} */
	var length;
	/** @type {!number} */
	var totalMsec;
	/** @type {!number} */
	var i;
	/** @type {!number} */
	var fps;
	if (! (! Stopwatch$isStopped$LStopwatch$(this._stopwatch))) {
		debugger;
		throw new Error("[jsx/util.jsx:142] assertion failure");
	}
	lap = Stopwatch$lap$LStopwatch$(this._stopwatch);
	this._lastMsec = lap;
	if (this._recentlyMsecLog.length < 1) {
		this._recentlyMsecLog.push(lap);
	} else {
		this._recentlyMsecLog.push(lap);
		this._recentlyMsecLog.shift();
	}
	length = this._recentlyMsecLog.length;
	totalMsec = 0;
	for (i = 0; i < length; i++) {
		totalMsec += this._recentlyMsecLog[i];
	}
	fps = length / (totalMsec / 1000);
	if (this._fpsElement != null && this._enabledHtmlLog) {
		this._fpsElement.innerHTML = fps.toFixed(1) + "fps";
	} else {
		if (this._enabledConsoleLog) {
			console.log(fps.toFixed(1) + "fps");
		}
	}
};

/**
 * class js extends Object
 * @constructor
 */
function js() {
}

js.prototype = new Object;
/**
 * @constructor
 */
function js$() {
};

js$.prototype = new js;

$__jsx_lazy_init(Engine, "images", function () {
	return {  };
});
$__jsx_lazy_init(Engine, "imageDatas", function () {
	return {  };
});
$__jsx_lazy_init(Engine, "isLoadedImage", function () {
	return {  };
});
$__jsx_lazy_init(dom, "window", function () {
	return js.global.window;
});
$__jsx_lazy_init(dom, "document", function () {
	return js.global.document;
});
$__jsx_lazy_init(Timer, "_requestAnimationFrame", function () {
	return Timer$_getRequestAnimationFrameImpl$B(true);
});
$__jsx_lazy_init(Timer, "_cancelAnimationFrame", function () {
	return Timer$_getCancelAnimationFrameImpl$B(true);
});
js.global = (function () { return this; })();

var $__jsx_classMap = {
	"jsx/ball.jsx": {
		Util3D: Util3D,
		Util3D$: Util3D$,
		Player: Player,
		Player$: Player$,
		BlueBall: BlueBall,
		BlueBall$: BlueBall$,
		_Main: _Main,
		_Main$: _Main$
	},
	"jsx/vector.jsx": {
		Vector: Vector,
		Vector$NNN: Vector$NNN,
		Vector$NNNN: Vector$NNNN,
		Vector$LVector$: Vector$LVector$
	},
	"jsx/matrix.jsx": {
		Matrix: Matrix,
		Matrix$: Matrix$,
		Matrix$AN: Matrix$AN
	},
	"jsx/quaternion.jsx": {
		Quaternion: Quaternion,
		Quaternion$NLVector$: Quaternion$NLVector$,
		Quaternion$LVector$: Quaternion$LVector$,
		Quaternion$NNNN: Quaternion$NNNN
	},
	"jsx/engine.jsx": {
		Engine: Engine,
		Engine$S: Engine$S,
		Context3D: Context3D,
		Context3D$LCamera$: Context3D$LCamera$,
		Camera: Camera,
		Camera$LVector$LVector$LVector$NNNN: Camera$LVector$LVector$LVector$NNNN,
		Color: Color,
		Color$III: Color$III,
		Renderable: Renderable,
		Renderable$: Renderable$,
		Polygon: Polygon,
		Polygon$ALVector$LColor$: Polygon$ALVector$LColor$,
		PolygonGroup: PolygonGroup,
		PolygonGroup$LList$Polygon$E$LVector$: PolygonGroup$LList$Polygon$E$LVector$,
		PolygonGroup$LList$Polygon$E$LVector$B: PolygonGroup$LList$Polygon$E$LVector$B,
		SmoothTexture: SmoothTexture,
		SmoothTexture$ALVector$S: SmoothTexture$ALVector$S,
		SmoothTexture$ALVector$SIIII: SmoothTexture$ALVector$SIIII,
		Billboard: Billboard,
		Billboard$LVector$NNS: Billboard$LVector$NNS
	},
	"system:lib/js/js/web.jsx": {
		dom: dom,
		dom$: dom$
	},
	"system:lib/js/timer.jsx": {
		Timer: Timer,
		Timer$: Timer$,
		TimerHandle: TimerHandle,
		TimerHandle$: TimerHandle$
	},
	"jsx/util.jsx": {
		Math2D: Math2D,
		Math2D$: Math2D$,
		Stopwatch: Stopwatch,
		Stopwatch$: Stopwatch$,
		FpsManager: FpsManager,
		FpsManager$: FpsManager$
	},
	"system:lib/js/js.jsx": {
		js: js,
		js$: js$
	}
};


/**
 * launches _Main.main(:string[]):void invoked by jsx --run|--executable
 */
JSX.runMain = function (sourceFile, args) {
	var module = JSX.require(sourceFile);

	if (! module._Main) {
		throw new Error("entry point _Main not found in " + sourceFile);
	}
	if (! module._Main.main$AS) {
		throw new Error("entry point _Main.main(:string[]):void not found in " + sourceFile);
	}
	module._Main.main$AS(args);
};

/**
 * launches _Test#test*():void invoked by jsx --test
 */
JSX.runTests = function (sourceFile, tests) {
	var module = JSX.require(sourceFile);
	var testClass = module._Test$;

	if (!testClass) return; // skip if there's no test class

	if(tests.length === 0) {
		var p = testClass.prototype;
		for (var m in p) {
			if (p[m] instanceof Function
				&& /^test.*[$]$/.test(m)) {
				tests.push(m);
			}
		}
	}

	var test = new testClass();

	if (test.beforeClass$AS != null)
		test.beforeClass$AS(tests);

	for (var i = 0; i < tests.length; ++i) {
		(function (m) {
			test.run$SF$V$(m, function() { test[m](); });
		}(tests[i]));
	}

	if (test.afterClass$ != null)
		test.afterClass$();
};
/**
 * call a function on load/DOMContentLoaded
 */
function $__jsx_onload (event) {
	window.removeEventListener("load", $__jsx_onload);
	document.removeEventListener("DOMContentLoaded", $__jsx_onload);
	JSX.runMain("jsx/ball.jsx", [])
}

window.addEventListener("load", $__jsx_onload);
document.addEventListener("DOMContentLoaded", $__jsx_onload);

})();
