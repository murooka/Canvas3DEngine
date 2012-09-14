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
	ver = div;
	hor = div * 2;
	sin = Math.sin;
	cos = Math.cos;
	pi = Math.PI;
	context.beginGroup$LVector$(new Vector$NNN(0, 0, 0));
	for (i = 0; i < hor; i++) {
		i1 = 0;
		i2 = 1;
		j1 = i + 1;
		j2 = i;
		context.renderPolygonGroup$ALVector$LColor$([ new Vector$NNN(cos(2 * pi * j1 / hor) * sin(pi * i1 / ver) * size, cos(pi * i1 / ver) * size, sin(2 * pi * j1 / hor) * sin(pi * i1 / ver) * size), new Vector$NNN(cos(2 * pi * j1 / hor) * sin(pi * i2 / ver) * size, cos(pi * i2 / ver) * size, sin(2 * pi * j1 / hor) * sin(pi * i2 / ver) * size), new Vector$NNN(cos(2 * pi * j2 / hor) * sin(pi * i2 / ver) * size, cos(pi * i2 / ver) * size, sin(2 * pi * j2 / hor) * sin(pi * i2 / ver) * size) ], new Color$III(128, 128, 255));
	}
	for (i = 1; i < ver - 1; i++) {
		for (j = 0; j < hor; j++) {
			i1 = i;
			i2 = i + 1;
			j1 = j + 1;
			j2 = j;
			context.renderPolygonGroup$ALVector$LColor$([ new Vector$NNN(cos(2 * pi * j1 / hor) * sin(pi * i1 / ver) * size, cos(pi * i1 / ver) * size, sin(2 * pi * j1 / hor) * sin(pi * i1 / ver) * size), new Vector$NNN(cos(2 * pi * j1 / hor) * sin(pi * i2 / ver) * size, cos(pi * i2 / ver) * size, sin(2 * pi * j1 / hor) * sin(pi * i2 / ver) * size), new Vector$NNN(cos(2 * pi * j2 / hor) * sin(pi * i2 / ver) * size, cos(pi * i2 / ver) * size, sin(2 * pi * j2 / hor) * sin(pi * i2 / ver) * size), new Vector$NNN(cos(2 * pi * j2 / hor) * sin(pi * i1 / ver) * size, cos(pi * i1 / ver) * size, sin(2 * pi * j2 / hor) * sin(pi * i1 / ver) * size) ], new Color$III(128, 128, 255));
		}
	}
	for (i = 0; i < hor; i++) {
		i1 = ver - 1;
		i2 = ver;
		j1 = i + 1;
		j2 = i;
		context.renderPolygonGroup$ALVector$LColor$([ new Vector$NNN(cos(2 * pi * j2 / hor) * sin(pi * i1 / ver) * size, cos(pi * i1 / ver) * size, sin(2 * pi * j2 / hor) * sin(pi * i1 / ver) * size), new Vector$NNN(cos(2 * pi * j1 / hor) * sin(pi * i1 / ver) * size, cos(pi * i1 / ver) * size, sin(2 * pi * j1 / hor) * sin(pi * i1 / ver) * size), new Vector$NNN(cos(2 * pi * j2 / hor) * sin(pi * i2 / ver) * size, cos(pi * i2 / ver) * size, sin(2 * pi * j2 / hor) * sin(pi * i2 / ver) * size) ], new Color$III(128, 128, 255));
	}
	context.endGroup$();
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
	context.renderPolygon$ALVector$LColor$([ new Vector$NNN(x - size / 2, y, z - size / 2), new Vector$NNN(x - size / 2, y, z + size / 2), new Vector$NNN(x + size / 2, y, z + size / 2), new Vector$NNN(x + size / 2, y, z - size / 2) ], color);
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
	context.renderPolygonGroup$ALVector$LColor$([ new Vector$NNN(x - size / 2, y, z - size / 2), new Vector$NNN(x - size / 2, y, z + size / 2), new Vector$NNN(x + size / 2, y, z + size / 2), new Vector$NNN(x + size / 2, y, z - size / 2) ], color);
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
	row = height / size;
	col = width / size;
	context.beginGroup$LVector$B(new Vector$NNN(0, 0, 0), true);
	for (i = 0; i < row; i++) {
		for (j = 0; j < col; j++) {
			color = ((i + j) % 2 === 0 ? color1 : color2);
			Util3D$tileOnGroup$LContext3D$IIIILColor$(context, cx - width / 2 + (j + 0.5) * size, y, cz - height / 2 + (i + 0.5) * size, size, color);
		}
	}
	context.endGroup$();
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
	this.r = 12;
	this.x = 0;
	this.y = 10;
	this.z = 0;
	this.vx = 0;
	this.vy = 0;
	this.vz = 0;
	this.ax = 0;
	this.ay = - 120;
	this.az = 0;
	this.rot = Quaternion$rotating$NNNN(0, 1, 0, 0);
	this.radius = 8;
	this.isBraking = false;
};

Player$.prototype = new Player;

/**
 */
Player.prototype.moveForward$ = function () {
	this.move$NN(50, 0);
};

/**
 * @param {!number} dz
 * @param {!number} dx
 */
Player.prototype.move$NN = function (dz, dx) {
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
	x = this.vx;
	z = this.vz;
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
	this.az = cos * dz - sin * dx;
	this.ax = sin * dz + cos * dx;
};

/**
 */
Player.prototype.brake$ = function () {
	this.isBraking = true;
};

/**
 */
Player.prototype.unbrake$ = function () {
	this.isBraking = false;
};

/**
 * @param {!number} elapsedMsec
 */
Player.prototype.update$N = function (elapsedMsec) {
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
	var v;
	/** @type {Vector} */
	var c;
	/** @type {Quaternion} */
	var q;
	sec = elapsedMsec / 1000;
	if (sec > 0.1) {
		sec = 0.1;
	}
	this.vx += this.ax * sec;
	this.vy += this.ay * sec;
	this.vz += this.az * sec;
	this.vx = Math.min(100, Math.max(- 100, this.vx));
	this.vy = Math.min(3000, Math.max(- 3000, this.vy));
	this.vz = Math.min(100, Math.max(- 100, this.vz));
	dx = this.vx * sec;
	dy = this.vy * sec;
	dz = this.vz * sec;
	this.x += dx;
	this.y += dy;
	this.z += dz;
	velocityDecl = (this.isBraking ? 0.05 : 0.001);
	this.vx -= (dx >= 0 ? dx : - dx) * this.vx * velocityDecl;
	this.vz -= (dz >= 0 ? dz : - dz) * this.vz * velocityDecl;
	if (this.isBraking) {
		decl = Math.pow(Math.E, - sec);
		this.az *= decl;
		this.ax *= decl;
	}
	v = new Vector$NNN(dx, 0, dz);
	c = v.cross$LVector$(new Vector$NNN(0, 1, 0)).unitSelf$();
	q = Quaternion$rotating$NLVector$(v.abs$() / this.r, c);
	this.rot.mulSelf$LQuaternion$(q);
};

/**
 * @param {Vector} normal
 */
Player.prototype.bounce$LVector$ = function (normal) {
	/** @type {!number} */
	var vdot;
	vdot = this.vx * normal.x + this.vy * normal.y + this.vz * normal.z;
	this.vx -= 1.5 * vdot * normal.x;
	this.vy -= 1.5 * vdot * normal.y;
	this.vz -= 1.5 * vdot * normal.z;
};

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
	/** @type {Color} */
	var backgroundColor;
	this.player = null;
	this.trees = null;
	this.treeRadius = 0;
	this.items = null;
	this.itemRadius = 0;
	this.totalElapsedMsec = 0;
	Engine$loadImages$AS([ './image/tree.png', './image/so-nya.png', './image/redbull_free.png', './image/sky1.jpg' ]);
	this.isStarted = false;
	this.engine = new Engine$S('canvas');
	this.engine.setSkyImage$S('./image/sky1.jpg');
	if (this.engine.isMobile$()) {
		this.engine.camera.farZ = 200;
		this.engine.camera.fovyX = Math.PI / 4;
		this.engine.camera.updateMatrix$();
	}
	this.player = new Player$();
	this._initTrees$();
	this._initItems$();
	this.engine.onUpdate = (function (elapsedMsec) {
		if (! $this.isStarted) {
			return;
		}
		$this._checkCollisionWithFloor$N(elapsedMsec);
		$this._checkCollisionWithTrees$();
		$this._checkCollisionWithItems$();
		$this._updateViewpoint$();
	});
	backgroundColor = new Color$III(90, 135, 150);
	this.engine.onRender = (function (context, elapsedMsec) {
		$this.totalElapsedMsec += elapsedMsec;
		context.setBackgroundColor$LColor$(backgroundColor);
		$this._renderPlayer$LContext3D$(context);
		$this._renderTrees$LContext3D$(context);
		$this._renderItems$LContext3D$(context);
		$this._renderField$LContext3D$(context);
	});
	if (this.engine.isMobile$()) {
		this._setMobileOperation$();
	} else {
		this._setPCOperation$();
	}
};

BlueBall$.prototype = new BlueBall;

/**
 */
BlueBall.prototype._initTrees$ = function () {
	this.trees = new List$Vector$E$ALVector$([ new Vector$NNN(- 271, - 3, 450), new Vector$NNN(- 200, - 3, 720), new Vector$NNN(139, - 3, 351), new Vector$NNN(171, - 3, 254), new Vector$NNN(214, - 3, 192), new Vector$NNN(- 253, - 3, 555), new Vector$NNN(29, - 3, 385), new Vector$NNN(- 72, - 3, 530), new Vector$NNN(96, - 3, 678), new Vector$NNN(- 49, - 3, 222) ]);
	this.treeRadius = 24;
};

/**
 */
BlueBall.prototype._initItems$ = function () {
	this.items = new List$Vector$E$ALVector$([ new Vector$NNN(149, - 10, 724), new Vector$NNN(107, - 10, 483), new Vector$NNN(279, - 10, 551), new Vector$NNN(- 295, - 10, 261), new Vector$NNN(- 16, - 10, 225), new Vector$NNN(95, - 10, 165), new Vector$NNN(264, - 10, 161), new Vector$NNN(- 50, - 10, 325), new Vector$NNN(- 169, - 10, 254), new Vector$NNN(271, - 10, 401) ]);
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
	player = this.player;
	player.update$N(elapsedMsec);
	x = player.x;
	y = player.y;
	z = player.z;
	if (- 30 <= x && x <= 30 && - 30 <= z && z <= 150 || - 300 <= x && x <= 300 && 150 <= z && z <= 750 || - 30 <= x && x <= 30 && 750 <= z && z <= 810 || - 30 <= x && x <= 570 && 810 <= z && z <= 870 || 510 <= x && x <= 1110 && 150 <= z && z <= 210 || 1050 <= x && x <= 1110 && 750 <= z && z <= 1350) {
		if (- player.radius * 2 < y && y < 0) {
			player.bounce$LVector$(new Vector$NNN(0, 1, 0));
			player.y = 0;
		}
	}
	if (510 <= x && x <= 570 && 510 <= z && z <= 810) {
		height = Math.floor((810 - z) / 30);
		height *= 5;
		if (height - player.radius * 2 < y && y < height) {
			player.bounce$LVector$(new Vector$NNN(0, 30, 5).unitSelf$());
			player.y = height;
		}
	}
	if (510 <= x && x <= 570 && 210 <= z && z < 510) {
		height = Math.floor((z - 210) / 30);
		height *= 5;
		if (height - player.radius * 2 < y && y < height) {
			player.bounce$LVector$(new Vector$NNN(0, 30, - 5).unitSelf$());
			player.y = height;
		}
	}
	if (1110 <= x && x <= 1270 && 150 <= z && z <= 810) {
		height = (x - 1110) / 160 * 80;
		if (height - player.radius * 2 < y && y < height) {
			player.bounce$LVector$(new Vector$NNN(- 1, 2, 0).unitSelf$());
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
		dx = player.x - tree.x;
		dy = player.y - tree.y;
		dz = player.z - tree.z;
		dr = $this.treeRadius + player.radius;
		if (dx * dx + dy * dy + dz * dz < dr * dr) {
			normalVec = new Vector$NNN(dx, dy, dz).unitSelf$();
			a = Math.sqrt(player.vx * player.vx + player.vy * player.vy + player.vz * player.vz);
			player.ax += 2 * a * normalVec.x;
			player.vy += 2 * a * normalVec.y;
			player.az += 2 * a * normalVec.z;
			player.x += normalVec.x * $this.treeRadius / 4;
			player.z += normalVec.z * $this.treeRadius / 4;
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
	for (n = items.head; n; n = n.next$()) {
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
	player = this.player;
	dz = - player.vz;
	dx = - player.vx;
	len = Math.sqrt(dz * dz + dx * dx);
	if (len < 1e-9) {
		dz = - 1;
		dx = 0;
	} else {
		dz /= len;
		dx /= len;
	}
	y = player.y;
	if (y < 0) {
		y = - y / 2;
	}
	yOffset = 10;
	xzVelocity = Math.sqrt(player.vx * player.vx + player.vz * player.vz);
	if (xzVelocity < 50) {
		yOffset -= (50 - xzVelocity) * 0.6;
	}
	view = new Vector$NNN(player.x + dx * 50, y * 1.2 + yOffset, player.z + dz * 50);
	target = new Vector$NNN(player.x, player.y, player.z);
	this.engine.camera.target = target;
	this.engine.camera.view = view;
	this.engine.camera.updateMatrix$();
};

/**
 * @param {Context3D} context
 */
BlueBall.prototype._renderPlayer$LContext3D$ = function (context) {
	context.translate$NNN(this.player.x, this.player.y - 12, this.player.z);
	context.rotate$LQuaternion$(this.player.rot);
	Util3D$sphere$LContext3D$NI(context, this.player.radius, 6);
	context.resetMatrix$();
};

/**
 * @param {Context3D} context
 */
BlueBall.prototype._renderTrees$LContext3D$ = function (context) {
	var $this = this;
	this.trees.forEach$F$LVector$V$((function (tree) {
		/** @type {!number} */
		var x;
		/** @type {!number} */
		var y;
		/** @type {!number} */
		var z;
		x = tree.x;
		y = tree.y;
		z = tree.z;
		context.pushMatrix$();
		context.translate$NNN(x, y, z);
		context.renderBillboard$LVector$IIS(new Vector$NNN(0, 0, 0), 50, 34, './image/tree.png');
		context.popMatrix$();
	}));
};

/**
 * @param {Context3D} context
 */
BlueBall.prototype._renderItems$LContext3D$ = function (context) {
	var $this = this;
	/** @type {!number} */
	var rad;
	/** @type {Quaternion} */
	var axis;
	rad = Math.PI * this.totalElapsedMsec / 1000;
	axis = Quaternion$rotating$NNNN(rad, 0, 1, 0);
	this.items.forEach$F$LVector$V$((function (item) {
		/** @type {!number} */
		var x;
		/** @type {!number} */
		var y;
		/** @type {!number} */
		var z;
		x = item.x;
		y = item.y;
		z = item.z;
		context.pushMatrix$();
		context.translate$NNN(x, y, z);
		context.rotate$LQuaternion$(axis);
		context.renderTexture$ALVector$SIIII([ new Vector$NNN(- 15, - 10, 0), new Vector$NNN(15, - 10, 0), new Vector$NNN(15, 10, 0), new Vector$NNN(- 15, 10, 0) ], './image/redbull_free.png', 2, 2, 1, 1);
		context.popMatrix$();
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
	gray = new Color$III(192, 192, 192);
	lightGreen = new Color$III(160, 255, 160);
	green = new Color$III(96, 255, 96);
	size = 30;
	context.setDepth$I(5);
	Util3D$tileRectXZ$LContext3D$IIIIIILColor$LColor$(context, 0, 60, 60, 180, - 20, size, gray, gray);
	Util3D$tileRectXZ$LContext3D$IIIIIILColor$LColor$(context, 0, 450, 600, 600, - 20, size, lightGreen, green);
	Util3D$tileRectXZ$LContext3D$IIIIIILColor$LColor$(context, 0, 780, 60, 60, - 20, size, green, lightGreen);
	Util3D$tileRectXZ$LContext3D$IIIIIILColor$LColor$(context, 270, 840, 600, 60, - 20, size, green, lightGreen);
	context.pushMatrix$();
	context.beginGroup$LVector$B(new Vector$NNN(0, 0, 0), true);
	context.translate$NNN(510, 0, 510);
	for (i = 0; i < 10; i++) {
		for (j = 0; j < 2; j++) {
			color = ((i + j) % 2 === 0 ? lightGreen : green);
			Util3D$tileOnGroup$LContext3D$IIIILColor$(context, j * size + size / 2, - 20 + (9 - i) * 5, i * size + size / 2, size, color);
		}
	}
	for (i = 0; i < 10; i++) {
		for (j = 0; j < 2; j++) {
			color = ((i + j) % 2 === 0 ? lightGreen : green);
			Util3D$tileOnGroup$LContext3D$IIIILColor$(context, j * size + size / 2, - 20 + (9 - i) * 5, - i * size - size / 2, size, color);
		}
	}
	context.endGroup$();
	context.popMatrix$();
	Util3D$tileRectXZ$LContext3D$IIIIIILColor$LColor$(context, 810, 180, 600, 60, - 20, size, green, lightGreen);
	context.pushMatrix$();
	context.beginGroup$LVector$B(new Vector$NNN(0, 0, 0), true);
	context.translate$NNN(1110, 0, 150);
	for (i = 0; i < 4; i++) {
		for (j = 0; j < 22; j++) {
			color = ((i + j) % 2 === 0 ? lightGreen : green);
			context.renderPolygonGroup$ALVector$LColor$([ new Vector$NNN(i * 40, - 20 + i * 20, j * size), new Vector$NNN(i * 40, - 20 + i * 20, (j + 1) * size), new Vector$NNN((i + 1) * 40, - 20 + (i + 1) * 20, (j + 1) * size), new Vector$NNN((i + 1) * 40, - 20 + (i + 1) * 20, j * size) ], color);
		}
	}
	context.endGroup$();
	context.popMatrix$();
	Util3D$tileRectXZ$LContext3D$IIIIIILColor$LColor$(context, 1080, 1050, 60, 600, - 20, size, green, lightGreen);
	Util3D$tileRectXZ$LContext3D$IIIIIILColor$LColor$(context, 1080, 1380, 60, 60, - 20, size / 2, new Color$III(0xff, 0xd7, 0x00), new Color$III(0xff, 0xff, 255));
	context.setDepth$I(3);
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
		de = (function (o) { return o instanceof DeviceMotionEvent ? o : null; })(e);
		az = (function (v) {
			if (! (v != null)) {
				debugger;
				throw new Error("[jsx/ball.jsx:561] null access");
			}
			return v;
		}(de.accelerationIncludingGravity.y)) * 30;
		ax = (function (v) {
			if (! (v != null)) {
				debugger;
				throw new Error("[jsx/ball.jsx:562] null access");
			}
			return v;
		}(de.accelerationIncludingGravity.x)) * 30 / 2;
		az = Math.min(az, 120);
		if (az < - 60) {
			$this.player.brake$();
			$this.player.move$NN(0, ax / 4);
		} else {
			if (az < 0) {
				$this.player.unbrake$();
				$this.player.move$NN(0, ax / 2);
			} else {
				$this.player.unbrake$();
				$this.player.move$NN(az, ax);
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
		if (! $this.isStarted) {
			$this.isStarted = true;
			$this.player.vz = 100;
			return;
		}
		ke = (function (o) { return o instanceof KeyboardEvent ? o : null; })(e);
		accel = 100;
		switch (ke.keyCode) {
		case 119:
			$this.player.unbrake$();
			$this.player.move$NN(accel, 0);
			break;
		case 115:
			$this.player.brake$();
			break;
		case 97:
			$this.player.unbrake$();
			$this.player.move$NN(0, - accel / 2);
			break;
		case 100:
			$this.player.unbrake$();
			$this.player.move$NN(0, accel / 2);
			break;
		case 104:
			$this.player.unbrake$();
			$this.player.move$NN(0, - accel / 2);
			break;
		case 106:
			$this.player.brake$();
			break;
		case 107:
			$this.player.unbrake$();
			$this.player.move$NN(accel, 0);
			break;
		case 108:
			$this.player.unbrake$();
			$this.player.move$NN(0, accel / 2);
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
	game.run$();
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
	this.x = x / w;
	this.y = y / w;
	this.z = z / w;
	this.w = 1;
	if (this.x === NaN) {
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
	return new Vector$NNN(this.y * other.z - this.z * other.y, this.z * other.x - this.x * other.z, this.x * other.y - this.y * other.x);
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
	x = this.y * other.z - this.z * other.y;
	y = this.z * other.x - this.x * other.z;
	z = this.x * other.y - this.y * other.x;
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
	length = this.abs$();
	if (length < 1e-9) {
		return new Vector$NNN(0, 0, 0);
	}
	return this.div$N(length);
};

/**
 * @return {Vector}
 */
Vector.prototype.unitSelf$ = function () {
	/** @type {!number} */
	var length;
	length = this.abs$();
	if (length < 1e-9) {
		return new Vector$NNN(0, 0, 0);
	}
	return this.divSelf$N(length);
};

/**
 * @return {!number}
 */
Vector.prototype.sqabs$ = function () {
	return this.dot$LVector$(this);
};

/**
 * @return {!number}
 */
Vector.prototype.abs$ = function () {
	return Math.sqrt(this.sqabs$());
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
	sin = Math.sin(rad);
	cos = Math.cos(rad);
	return new Vector$NNN(this.x, this.y * cos - this.z * sin, this.z * cos + this.y * sin);
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
	sin = Math.sin(rad);
	cos = Math.cos(rad);
	y = this.y * cos - this.z * sin;
	z = this.z * cos + this.y * sin;
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
	sin = Math.sin(rad);
	cos = Math.cos(rad);
	return new Vector$NNN(this.x * cos + this.z * sin, this.y, this.z * cos - this.x * sin);
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
	sin = Math.sin(rad);
	cos = Math.cos(rad);
	x = this.x * cos + this.z * sin;
	z = this.z * cos - this.x * sin;
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
	sin = Math.sin(rad);
	cos = Math.cos(rad);
	return new Vector$NNN(this.x * cos - this.y * sin, this.y * cos + this.z * sin, this.z);
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
	sin = Math.sin(rad);
	cos = Math.cos(rad);
	x = this.x * cos - this.y * sin;
	y = this.y * cos + this.z * sin;
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
	x = m._m11 * this.x + m._m12 * this.y + m._m13 * this.z + m._m14 * this.w;
	y = m._m21 * this.x + m._m22 * this.y + m._m23 * this.z + m._m24 * this.w;
	z = m._m31 * this.x + m._m32 * this.y + m._m33 * this.z + m._m34 * this.w;
	w = m._m41 * this.x + m._m42 * this.y + m._m43 * this.z + m._m44 * this.w;
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
	x = m._m11 * this.x + m._m12 * this.y + m._m13 * this.z + m._m14 * this.w;
	y = m._m21 * this.x + m._m22 * this.y + m._m23 * this.z + m._m24 * this.w;
	z = m._m31 * this.x + m._m32 * this.y + m._m33 * this.z + m._m34 * this.w;
	w = m._m41 * this.x + m._m42 * this.y + m._m43 * this.z + m._m44 * this.w;
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
	this._m11 = (function (v) {
		if (! (v != null)) {
			debugger;
			throw new Error("[jsx/matrix.jsx:46] null access");
		}
		return v;
	}(m[0]));
	this._m12 = (function (v) {
		if (! (v != null)) {
			debugger;
			throw new Error("[jsx/matrix.jsx:47] null access");
		}
		return v;
	}(m[1]));
	this._m13 = (function (v) {
		if (! (v != null)) {
			debugger;
			throw new Error("[jsx/matrix.jsx:48] null access");
		}
		return v;
	}(m[2]));
	this._m14 = (function (v) {
		if (! (v != null)) {
			debugger;
			throw new Error("[jsx/matrix.jsx:49] null access");
		}
		return v;
	}(m[3]));
	this._m21 = (function (v) {
		if (! (v != null)) {
			debugger;
			throw new Error("[jsx/matrix.jsx:50] null access");
		}
		return v;
	}(m[4]));
	this._m22 = (function (v) {
		if (! (v != null)) {
			debugger;
			throw new Error("[jsx/matrix.jsx:51] null access");
		}
		return v;
	}(m[5]));
	this._m23 = (function (v) {
		if (! (v != null)) {
			debugger;
			throw new Error("[jsx/matrix.jsx:52] null access");
		}
		return v;
	}(m[6]));
	this._m24 = (function (v) {
		if (! (v != null)) {
			debugger;
			throw new Error("[jsx/matrix.jsx:53] null access");
		}
		return v;
	}(m[7]));
	this._m31 = (function (v) {
		if (! (v != null)) {
			debugger;
			throw new Error("[jsx/matrix.jsx:54] null access");
		}
		return v;
	}(m[8]));
	this._m32 = (function (v) {
		if (! (v != null)) {
			debugger;
			throw new Error("[jsx/matrix.jsx:55] null access");
		}
		return v;
	}(m[9]));
	this._m33 = (function (v) {
		if (! (v != null)) {
			debugger;
			throw new Error("[jsx/matrix.jsx:56] null access");
		}
		return v;
	}(m[10]));
	this._m34 = (function (v) {
		if (! (v != null)) {
			debugger;
			throw new Error("[jsx/matrix.jsx:57] null access");
		}
		return v;
	}(m[11]));
	this._m41 = (function (v) {
		if (! (v != null)) {
			debugger;
			throw new Error("[jsx/matrix.jsx:58] null access");
		}
		return v;
	}(m[12]));
	this._m42 = (function (v) {
		if (! (v != null)) {
			debugger;
			throw new Error("[jsx/matrix.jsx:59] null access");
		}
		return v;
	}(m[13]));
	this._m43 = (function (v) {
		if (! (v != null)) {
			debugger;
			throw new Error("[jsx/matrix.jsx:60] null access");
		}
		return v;
	}(m[14]));
	this._m44 = (function (v) {
		if (! (v != null)) {
			debugger;
			throw new Error("[jsx/matrix.jsx:61] null access");
		}
		return v;
	}(m[15]));
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
	return Matrix$translating$NNN(v.x, v.y, v.z);
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
	x = this._m11 * other.x + this._m12 * other.y + this._m13 * other.z + this._m14 * other.w;
	y = this._m21 * other.x + this._m22 * other.y + this._m23 * other.z + this._m24 * other.w;
	z = this._m31 * other.x + this._m32 * other.y + this._m33 * other.z + this._m34 * other.w;
	w = this._m41 * other.x + this._m42 * other.y + this._m43 * other.z + this._m44 * other.w;
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
	m11 = this._m11 * other._m11 + this._m12 * other._m21 + this._m13 * other._m31 + this._m14 * other._m41;
	m12 = this._m11 * other._m12 + this._m12 * other._m22 + this._m13 * other._m32 + this._m14 * other._m42;
	m13 = this._m11 * other._m13 + this._m12 * other._m23 + this._m13 * other._m33 + this._m14 * other._m43;
	m14 = this._m11 * other._m14 + this._m12 * other._m24 + this._m13 * other._m34 + this._m14 * other._m44;
	m21 = this._m21 * other._m11 + this._m22 * other._m21 + this._m23 * other._m31 + this._m24 * other._m41;
	m22 = this._m21 * other._m12 + this._m22 * other._m22 + this._m23 * other._m32 + this._m24 * other._m42;
	m23 = this._m21 * other._m13 + this._m22 * other._m23 + this._m23 * other._m33 + this._m24 * other._m43;
	m24 = this._m21 * other._m14 + this._m22 * other._m24 + this._m23 * other._m34 + this._m24 * other._m44;
	m31 = this._m31 * other._m11 + this._m32 * other._m21 + this._m33 * other._m31 + this._m34 * other._m41;
	m32 = this._m31 * other._m12 + this._m32 * other._m22 + this._m33 * other._m32 + this._m34 * other._m42;
	m33 = this._m31 * other._m13 + this._m32 * other._m23 + this._m33 * other._m33 + this._m34 * other._m43;
	m34 = this._m31 * other._m14 + this._m32 * other._m24 + this._m33 * other._m34 + this._m34 * other._m44;
	m41 = this._m41 * other._m11 + this._m42 * other._m21 + this._m43 * other._m31 + this._m44 * other._m41;
	m42 = this._m41 * other._m12 + this._m42 * other._m22 + this._m43 * other._m32 + this._m44 * other._m42;
	m43 = this._m41 * other._m13 + this._m42 * other._m23 + this._m43 * other._m33 + this._m44 * other._m43;
	m44 = this._m41 * other._m14 + this._m42 * other._m24 + this._m43 * other._m34 + this._m44 * other._m44;
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
	this._m11 = m11 * other._m11 + m12 * other._m21 + m13 * other._m31 + m14 * other._m41;
	this._m12 = m11 * other._m12 + m12 * other._m22 + m13 * other._m32 + m14 * other._m42;
	this._m13 = m11 * other._m13 + m12 * other._m23 + m13 * other._m33 + m14 * other._m43;
	this._m14 = m11 * other._m14 + m12 * other._m24 + m13 * other._m34 + m14 * other._m44;
	this._m21 = m21 * other._m11 + m22 * other._m21 + m23 * other._m31 + m24 * other._m41;
	this._m22 = m21 * other._m12 + m22 * other._m22 + m23 * other._m32 + m24 * other._m42;
	this._m23 = m21 * other._m13 + m22 * other._m23 + m23 * other._m33 + m24 * other._m43;
	this._m24 = m21 * other._m14 + m22 * other._m24 + m23 * other._m34 + m24 * other._m44;
	this._m31 = m31 * other._m11 + m32 * other._m21 + m33 * other._m31 + m34 * other._m41;
	this._m32 = m31 * other._m12 + m32 * other._m22 + m33 * other._m32 + m34 * other._m42;
	this._m33 = m31 * other._m13 + m32 * other._m23 + m33 * other._m33 + m34 * other._m43;
	this._m34 = m31 * other._m14 + m32 * other._m24 + m33 * other._m34 + m34 * other._m44;
	this._m41 = m41 * other._m11 + m42 * other._m21 + m43 * other._m31 + m44 * other._m41;
	this._m42 = m41 * other._m12 + m42 * other._m22 + m43 * other._m32 + m44 * other._m42;
	this._m43 = m41 * other._m13 + m42 * other._m23 + m43 * other._m33 + m44 * other._m43;
	this._m44 = m41 * other._m14 + m42 * other._m24 + m43 * other._m34 + m44 * other._m44;
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
	for (i = 0; i < 4 - 1; i++) {
		e = mat[i * 4 + i];
		for (j = 0; j < 4; j++) {
			mat[i * 4 + j] = (function (v) {
				if (! (v != null)) {
					debugger;
					throw new Error("[jsx/matrix.jsx:247] null access");
				}
				return v;
			}(mat[i * 4 + j])) / (function (v) {
				if (! (v != null)) {
					debugger;
					throw new Error("[jsx/matrix.jsx:247] null access");
				}
				return v;
			}(e));
			inv[i * 4 + j] = (function (v) {
				if (! (v != null)) {
					debugger;
					throw new Error("[jsx/matrix.jsx:248] null access");
				}
				return v;
			}(inv[i * 4 + j])) / (function (v) {
				if (! (v != null)) {
					debugger;
					throw new Error("[jsx/matrix.jsx:248] null access");
				}
				return v;
			}(e));
		}
		for (j = i + 1; j < 4; j++) {
			s = mat[j * 4 + i];
			for (k = 0; k < 4; k++) {
				mat[j * 4 + k] -= (function (v) {
					if (! (v != null)) {
						debugger;
						throw new Error("[jsx/matrix.jsx:253] null access");
					}
					return v;
				}(mat[i * 4 + k])) * (function (v) {
					if (! (v != null)) {
						debugger;
						throw new Error("[jsx/matrix.jsx:253] null access");
					}
					return v;
				}(s));
				inv[j * 4 + k] -= (function (v) {
					if (! (v != null)) {
						debugger;
						throw new Error("[jsx/matrix.jsx:254] null access");
					}
					return v;
				}(inv[i * 4 + k])) * (function (v) {
					if (! (v != null)) {
						debugger;
						throw new Error("[jsx/matrix.jsx:254] null access");
					}
					return v;
				}(s));
			}
		}
	}
	for (i = 3; i > 0; i--) {
		for (j = i - 1; j >= 0; j--) {
			t = mat[j * 4 + i];
			for (k = 0; k < 4; k++) {
				mat[j * 4 + k] -= (function (v) {
					if (! (v != null)) {
						debugger;
						throw new Error("[jsx/matrix.jsx:264] null access");
					}
					return v;
				}(mat[i * 4 + k])) * (function (v) {
					if (! (v != null)) {
						debugger;
						throw new Error("[jsx/matrix.jsx:264] null access");
					}
					return v;
				}(t));
				inv[j * 4 + k] -= (function (v) {
					if (! (v != null)) {
						debugger;
						throw new Error("[jsx/matrix.jsx:265] null access");
					}
					return v;
				}(inv[i * 4 + k])) * (function (v) {
					if (! (v != null)) {
						debugger;
						throw new Error("[jsx/matrix.jsx:265] null access");
					}
					return v;
				}(t));
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
	return this.copy$().mulSelf$LQuaternion$(other);
};

/**
 * @param {Quaternion} other
 * @return {Quaternion}
 */
Quaternion.prototype.mulSelf$LQuaternion$ = function (other) {
	/** @type {Quaternion} */
	var a;
	/** @type {Quaternion} */
	var b;
	/** @type {!number} */
	var t;
	/** @type {!number} */
	var x;
	/** @type {!number} */
	var y;
	/** @type {!number} */
	var z;
	a = this;
	b = other;
	t = a.t * b.t - (a.x * b.x + a.y * b.y + a.z * b.z);
	x = a.t * b.x + b.t * a.x + (a.y * b.z - a.z * b.y);
	y = a.t * b.y + b.t * a.y + (a.z * b.x - a.x * b.z);
	z = a.t * b.z + b.t * a.z + (a.x * b.y - a.y * b.x);
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
	x2 = 2 * this.x * this.x;
	y2 = 2 * this.y * this.y;
	z2 = 2 * this.z * this.z;
	xy = 2 * this.x * this.y;
	zx = 2 * this.x * this.z;
	yz = 2 * this.y * this.z;
	xt = 2 * this.x * this.t;
	yt = 2 * this.y * this.t;
	zt = 2 * this.z * this.t;
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
	return Quaternion$rotating$NNNN(rad, v.x, v.y, v.z);
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
	/** @type {Quaternion} */
	var p;
	/** @type {Quaternion} */
	var q;
	/** @type {Quaternion} */
	var r;
	/** @type {Quaternion} */
	var s;
	cos = Math.cos(rad / 2);
	sin = Math.sin(rad / 2);
	p = new Quaternion$LVector$(src);
	q = new Quaternion$NNNN(cos, axis.x * sin, axis.y * sin, axis.z * sin);
	r = new Quaternion$NNNN(cos, - axis.x * sin, - axis.y * sin, - axis.z * sin);
	s = r.mulSelf$LQuaternion$(p).mulSelf$LQuaternion$(q);
	return new Vector$NNN(s.x, s.y, s.z);
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
	/** @type {HTMLCanvasElement} */
	var canvas;
	/** @type {Vector} */
	var viewPosition;
	/** @type {Vector} */
	var targetPosition;
	/** @type {Vector} */
	var upperVector;
	/** @type {!number} */
	var fovyX;
	/** @type {!number} */
	var nearZ;
	/** @type {!number} */
	var farZ;
	/** @type {!number} */
	var aspectRatio;
	this.camera = null;
	this.screenMatrix = null;
	this.onUpdate = null;
	this.onRender = null;
	this._skyImageSrc = null;
	this._skyImage = null;
	this._isMobile = /iPhone/.test(dom.window.navigator.userAgent);
	canvas = (function (o) { return o instanceof HTMLCanvasElement ? o : null; })(dom$id$S(canvasId));
	this.context = (function (o) { return o instanceof CanvasRenderingContext2D ? o : null; })(canvas.getContext('2d'));
	this._width = canvas.width;
	this._height = canvas.height;
	this.setScreenMatrix$NN(this._width, this._height);
	this._skyImageSrc = null;
	this._skyImage = null;
	viewPosition = new Vector$NNN(0, 0, - 90);
	targetPosition = new Vector$NNN(0, 0, 0);
	upperVector = new Vector$NNN(0, 1, 0);
	fovyX = Math.PI / 3;
	nearZ = 0;
	farZ = 500;
	aspectRatio = this._height / this._width;
	this.camera = new Camera$LVector$LVector$LVector$NNNN(viewPosition, targetPosition, upperVector, fovyX, nearZ, farZ, aspectRatio);
	this.updateMatrix$();
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
	canvas = (function (o) { return o instanceof HTMLCanvasElement ? o : null; })(dom$id$S('tmp_canvas'));
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
		image = (function (o) { return o instanceof HTMLImageElement ? o : null; })(dom$createElement$S('img'));
		image.src = (function (v) {
			if (! (v != null)) {
				debugger;
				throw new Error("[jsx/engine.jsx:106] null access");
			}
			return v;
		}(src));
		Engine.isLoadedImage[src] = false;
		Engine.images[src] = image;
		setOnload((function (v) {
			if (! (v != null)) {
				debugger;
				throw new Error("[jsx/engine.jsx:109] null access");
			}
			return v;
		}(src)));
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
	fpsManager = new FpsManager$S('fps');
	fpsManager.start$();
	update = (function () {
		/** @type {!number} */
		var lap;
		/** @type {Context3D} */
		var context;
		fpsManager.update$();
		lap = fpsManager.lastLap$();
		$this.onUpdate(lap);
		context = new Context3D$LCamera$($this.camera);
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
		Timer$setTimeout$F$V$N(update, 0);
	});
	Timer$setTimeout$F$V$N((function () {
		dom.window.scrollTo(0, 1);
	}), 500);
	Timer$setTimeout$F$V$N(update, 0);
};

/**
 */
Engine.prototype.renderSkyImage$ = function () {
	/** @type {Vector} */
	var lookingVec;
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
	lookingVec = this.camera.target.sub$LVector$(this.camera.view);
	x = lookingVec.x;
	y = - lookingVec.y;
	z = lookingVec.z;
	horRad = Math.atan2(x, z);
	verRad = Math.atan2(y, Math.sqrt(x * x + z * z));
	imgWidth = this._skyImage.width;
	imgHeight = this._skyImage.height;
	iCenterX = (horRad / Math.PI / 2 + 0.5) * imgWidth;
	iCenterY = (verRad / Math.PI + 0.5) * imgHeight;
	iWidth = this.camera.fovyX / Math.PI / 2 * imgWidth;
	iHeight = iWidth * this.camera.aspectRatio;
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
	overflowingRight = sx + sw >= imgWidth;
	overflowingBelow = sy + sh >= imgHeight;
	if (overflowingRight && overflowingBelow) {
		perHor = (imgWidth - sx) / sw;
		perVer = (imgHeight - sy) / sh;
		this.context.drawImage(this._skyImage, ~ ~ sx, ~ ~ sy, ~ ~ (imgWidth - sx), ~ ~ (imgHeight - sy), 0, 0, ~ ~ (this._width * perHor), ~ ~ (this._height * perVer));
		if (~ ~ (sx + sw - imgWidth) !== 0) {
			this.context.drawImage(this._skyImage, 0, ~ ~ sy, ~ ~ (sx + sw - imgWidth), ~ ~ (imgHeight - sy), ~ ~ (this._width * perHor), 0, ~ ~ (this._width * (1 - perHor)), ~ ~ (this._height * perVer));
		}
	} else {
		if (overflowingRight) {
			per = (imgWidth - sx) / sw;
			if (~ ~ (imgWidth - sx) !== 0 && ~ ~ (this._width * per) !== 0) {
				this.context.drawImage(this._skyImage, ~ ~ sx, ~ ~ sy, ~ ~ (imgWidth - sx), ~ ~ sh, 0, 0, ~ ~ (this._width * per), this._height);
			}
			if (~ ~ (sx + sw - imgWidth) !== 0 && ~ ~ (this._width * (1 - per)) !== 0) {
				this.context.drawImage(this._skyImage, 0, ~ ~ sy, ~ ~ (sx + sw - imgWidth), ~ ~ sh, ~ ~ (this._width * per), 0, ~ ~ (this._width * (1 - per)), this._height);
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
Engine.prototype.setScreenMatrix$NN = function (width, height) {
	this.screenMatrix = Matrix$translating$NNN(width / 2, height / 2, 0).composeSelf$LMatrix$(Matrix$scaling$NNN(width / 2, - height / 2, 1));
};

/**
 */
Engine.prototype.updateMatrix$ = function () {
	this.camera.updateMatrix$();
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
 * @param {!number} depth
 */
Context3D.prototype.setDepth$I = function (depth) {
	if (! (1 <= depth && depth <= 5)) {
		debugger;
		throw new Error("[jsx/engine.jsx:263] assertion failure");
	}
	this._depth = depth;
};

/**
 * @return {!number}
 */
Context3D.prototype.getDepth$ = function () {
	return this._depth;
};

/**
 * @param {Color} color
 */
Context3D.prototype.setBackgroundColor$LColor$ = function (color) {
	this.backgroundColor = color;
};

/**
 */
Context3D.prototype.pushMatrix$ = function () {
	this._matrixStack.prepend$LMatrix$(this._worldMatrix.copy$());
};

/**
 */
Context3D.prototype.popMatrix$ = function () {
	this._worldMatrix = this._matrixStack.removeFirst$();
};

/**
 */
Context3D.prototype.resetMatrix$ = function () {
	this._worldMatrix = new Matrix$();
};

/**
 * @param {!number} x
 * @param {!number} y
 * @param {!number} z
 */
Context3D.prototype.translate$NNN = function (x, y, z) {
	this._worldMatrix.composeSelf$LMatrix$(Matrix$translating$NNN(x, y, z));
};

/**
 * @param {!number} x
 * @param {!number} y
 * @param {!number} z
 */
Context3D.prototype.scale$NNN = function (x, y, z) {
	this._worldMatrix.composeSelf$LMatrix$(Matrix$scaling$NNN(x, y, z));
};

/**
 * @param {Quaternion} q
 */
Context3D.prototype.rotate$LQuaternion$ = function (q) {
	this._worldMatrix.composeSelf$LMatrix$(q.toMatrix$());
};

/**
 * @param {Vector} center
 */
Context3D.prototype.beginGroup$LVector$ = function (center) {
	this.beginGroup$LVector$B(center, false);
};

/**
 * @param {Vector} center
 * @param {!boolean} ignoringZHidden
 */
Context3D.prototype.beginGroup$LVector$B = function (center, ignoringZHidden) {
	this._polygonList = new List$Polygon$E$();
	this._groupCenter = center;
	this._ignoringZHidden = ignoringZHidden;
};

/**
 * @param {Array.<undefined|Vector>} vertices
 * @param {Color} color
 */
Context3D.prototype.renderPolygonGroup$ALVector$LColor$ = function (vertices, color) {
	/** @type {Polygon} */
	var polygon;
	polygon = new Polygon$ALVector$LColor$(vertices, color);
	polygon.applyWorldMatrix$LMatrix$(this._worldMatrix);
	polygon.applyViewMatrix$LMatrix$(this.camera.viewMatrix);
	if (polygon.isHidden$LCamera$(this.camera)) {
		return;
	}
	this._polygonList.prepend$LPolygon$(polygon);
};

/**
 */
Context3D.prototype.endGroup$ = function () {
	if (this._polygonList.length !== 0) {
		this.renderModel$LRenderable$(new PolygonGroup$LList$Polygon$E$LVector$B(this._polygonList, this._groupCenter, this._ignoringZHidden));
	}
};

/**
 * @param {Array.<undefined|Vector>} vertices
 * @param {Color} color
 */
Context3D.prototype.renderPolygon$ALVector$LColor$ = function (vertices, color) {
	this.renderModel$LRenderable$(new Polygon$ALVector$LColor$(vertices, color));
};

/**
 * @param {Vector} center
 * @param {!number} width
 * @param {!number} height
 * @param {!string} src
 */
Context3D.prototype.renderBillboard$LVector$IIS = function (center, width, height, src) {
	this.renderModel$LRenderable$(new Billboard$LVector$NNS(center, width, height, src));
};

/**
 * @param {Array.<undefined|Vector>} vertices
 * @param {!string} src
 * @param {!number} maxHorDiv
 * @param {!number} maxVerDiv
 * @param {!number} maxDiv
 * @param {!number} minDiv
 */
Context3D.prototype.renderTexture$ALVector$SIIII = function (vertices, src, maxHorDiv, maxVerDiv, maxDiv, minDiv) {
	this.renderModel$LRenderable$(new SmoothTexture$ALVector$SIIII(vertices, src, maxHorDiv, maxVerDiv, maxDiv, minDiv));
};

/**
 * @param {Array.<undefined|Vector>} vertices
 * @param {!string} src
 */
Context3D.prototype.renderTexture$ALVector$S = function (vertices, src) {
	this.renderModel$LRenderable$(new SmoothTexture$ALVector$S(vertices, src));
};

/**
 * @param {Renderable} model
 */
Context3D.prototype.renderModel$LRenderable$ = function (model) {
	model.applyWorldMatrix$LMatrix$(this._worldMatrix);
	model.applyViewMatrix$LMatrix$(this.camera.viewMatrix);
	if (model.isHidden$LCamera$(this.camera)) {
		return;
	}
	switch (this._depth) {
	case 1:
		this.insertModelByZValue$LList$Renderable$E$LRenderable$(this.modelList1, model);
		break;
	case 2:
		this.insertModelByZValue$LList$Renderable$E$LRenderable$(this.modelList2, model);
		break;
	case 3:
		this.insertModelByZValue$LList$Renderable$E$LRenderable$(this.modelList3, model);
		break;
	case 4:
		this.insertModelByZValue$LList$Renderable$E$LRenderable$(this.modelList4, model);
		break;
	case 5:
		this.insertModelByZValue$LList$Renderable$E$LRenderable$(this.modelList5, model);
		break;
	}
};

/**
 * @param {List$Renderable$E} list
 * @param {Renderable} model
 */
Context3D.prototype.insertModelByZValue$LList$Renderable$E$LRenderable$ = function (list, model) {
	/** @type {!boolean} */
	var inserted;
	/** @type {Node$Renderable$E} */
	var n;
	inserted = false;
	for (n = list.head; n != null; n = n.next$()) {
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
	this.updateMatrix$();
};

Camera$LVector$LVector$LVector$NNNN.prototype = new Camera;

/**
 * @param {Vector} v
 */
Camera.prototype.move$LVector$ = function (v) {
	/** @type {Vector} */
	var vector;
	vector = v.transform$LMatrix$(this.rotatingMatrix);
	this.view.addSelf$LVector$(vector);
	this.target.addSelf$LVector$(vector);
};

/**
 * @param {!number} rad
 */
Camera.prototype.rotateY$N = function (rad) {
	/** @type {Vector} */
	var lookingVec;
	lookingVec = this.target.sub$LVector$(this.view);
	lookingVec.transformSelf$LMatrix$(Matrix$rotatingY$N(rad));
	this.target = lookingVec.addSelf$LVector$(this.view);
	this.rotatingMatrix = Matrix$rotatingY$N(rad).composeSelf$LMatrix$(this.rotatingMatrix);
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
	view = this.view;
	target = this.target;
	upper = this.upper;
	fovyX = this.fovyX;
	nearZ = this.nearZ;
	farZ = this.farZ;
	aspectRatio = this.aspectRatio;
	viewMatrix = (function () {
		/** @type {Vector} */
		var zaxis;
		/** @type {Vector} */
		var xaxis;
		/** @type {Vector} */
		var yaxis;
		zaxis = target.sub$LVector$(view).unitSelf$();
		xaxis = upper.cross$LVector$(zaxis).unitSelf$();
		yaxis = zaxis.cross$LVector$(xaxis).unitSelf$();
		return new Matrix$AN([ xaxis.x, xaxis.y, xaxis.z, - xaxis.dot$LVector$(view), yaxis.x, yaxis.y, yaxis.z, - yaxis.dot$LVector$(view), zaxis.x, zaxis.y, zaxis.z, - zaxis.dot$LVector$(view), 0, 0, 0, 1 ]);
	})();
	projectionMatrix = (function () {
		/** @type {!number} */
		var sx;
		/** @type {!number} */
		var sy;
		/** @type {!number} */
		var sz;
		/** @type {!number} */
		var mz;
		sx = 1 / Math.tan(fovyX / 2);
		sy = sx / aspectRatio;
		sz = farZ / (farZ - nearZ);
		mz = - sz * nearZ;
		return new Matrix$AN([ sx, 0, 0, 0, 0, sy, 0, 0, 0, 0, sz, mz, 0, 0, 1, 0 ]);
	})();
	this.viewMatrix = viewMatrix;
	this.projectionMatrix = projectionMatrix;
	this.matrix = projectionMatrix.compose$LMatrix$(viewMatrix);
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
	margin = 0;
	for (i = 0; i < vertices.length; i++) {
		v = vertices[i];
		if (- margin < v.x && v.x < engine._width + margin && - margin < v.y && v.y < engine._height + margin) {
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
	Renderable$.call(this);
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
	for (i = 0; i < this.vertices.length; i++) {
		this.vertices[i].transformSelf$LMatrix$(worldMatrix);
	}
	this.updateCenter$();
};

/**
 * @param {Matrix} viewMatrix
 */
Polygon.prototype.applyViewMatrix$LMatrix$ = function (viewMatrix) {
	/** @type {Array.<undefined|Vector>} */
	var vVertices;
	/** @type {Vector} */
	var vSumPos;
	/** @type {!number} */
	var i;
	/** @type {Vector} */
	var vVertex;
	vVertices = [  ];
	vSumPos = new Vector$NNN(0, 0, 0);
	for (i = 0; i < this.vertices.length; i++) {
		vVertex = this.vertices[i].transform$LMatrix$(viewMatrix);
		vVertices.push(vVertex);
		vSumPos.addSelf$LVector$(vVertex);
	}
	this.vCenter = vSumPos.div$N(this.vertices.length);
	this.vVertices = vVertices;
};

/**
 * @param {Camera} camera
 * @return {!boolean}
 */
Polygon.prototype.isHidden$LCamera$ = function (camera) {
	if (camera.nearZ < this.vCenter.z && this.vCenter.z < camera.farZ) {
		return false;
	}
	return true;
};

/**
 * @param {Vector} v
 */
Polygon.prototype.move$LVector$ = function (v) {
	/** @type {!number} */
	var i;
	for (i = 0; i < this.vertices.length; i++) {
		this.vertices[i].addSelf$LVector$(v);
	}
	this.updateCenter$();
};

/**
 */
Polygon.prototype.updateCenter$ = function () {
	/** @type {Vector} */
	var sumVector;
	/** @type {!number} */
	var i;
	sumVector = new Vector$NNN(0, 0, 0);
	for (i = 0; i < this.vertices.length; i++) {
		sumVector.addSelf$LVector$(this.vertices[i]);
	}
	this.center = sumVector.div$N(this.vertices.length);
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
	context = engine.context;
	len = this.vertices.length;
	verts = this.vVertices;
	color = this._color;
	if (this._enabledLighting) {
		color = (function () {
			/** @type {Vector} */
			var center;
			/** @type {Vector} */
			var v1;
			/** @type {Vector} */
			var v2;
			/** @type {Vector} */
			var norm;
			/** @type {!number} */
			var lightPower;
			/** @type {!number} */
			var diffusePower;
			/** @type {!number} */
			var diffuseCoefficient;
			/** @type {!number} */
			var ambientPower;
			/** @type {!number} */
			var r;
			/** @type {!number} */
			var g;
			/** @type {!number} */
			var b;
			center = $this.vCenter;
			v1 = verts[0].sub$LVector$(center);
			v2 = verts[1].sub$LVector$(center);
			norm = v2.crossSelf$LVector$(v1).unitSelf$();
			lightPower = norm.dot$LVector$(center.unit$());
			diffusePower = 0.7;
			diffuseCoefficient = 0.8;
			ambientPower = 0.5;
			r = Math.min(255, (diffusePower * diffuseCoefficient * lightPower + ambientPower) * color.r);
			g = Math.min(255, (diffusePower * diffuseCoefficient * lightPower + ambientPower) * color.g);
			b = Math.min(255, (diffusePower * diffuseCoefficient * lightPower + ambientPower) * color.b);
			return new Color$III(r, g, b);
		})();
	}
	for (i = 0; i < len; i++) {
		verts[i].transformSelf$LMatrix$(engine.camera.projectionMatrix);
	}
	for (i = 0; i < len; i++) {
		verts[i].transformSelf$LMatrix$(engine.screenMatrix);
	}
	isHiddenXY = Renderable$isHiddenXY$ALVector$LEngine$(verts, engine);
	if (isHiddenXY) {
		return false;
	}
	for (i = 0; i < verts.length; i++) {
		i1 = (i + 1) % verts.length;
		i2 = (i + 2) % verts.length;
		if (Math2D$cross$NNNN(verts[i1].x - verts[i].x, verts[i1].y - verts[i].y, verts[i2].x - verts[i].x, verts[i2].y - verts[i].y) < 0) {
			return false;
		}
	}
	colorStr = '#' + color.toHexString$();
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
	PolygonGroup$LList$Polygon$E$LVector$B.call(this, polygons, center, false);
};

PolygonGroup$LList$Polygon$E$LVector$.prototype = new PolygonGroup;

/**
 * @constructor
 * @param {List$Polygon$E} polygons
 * @param {Vector} center
 * @param {!boolean} ignoringZHidden
 */
function PolygonGroup$LList$Polygon$E$LVector$B(polygons, center, ignoringZHidden) {
	Renderable$.call(this);
	this.polygons = polygons;
	this.center = center;
	this._ignoringZHidden = ignoringZHidden;
};

PolygonGroup$LList$Polygon$E$LVector$B.prototype = new PolygonGroup;

/**
 * @param {Matrix} worldMatrix
 */
PolygonGroup.prototype.applyWorldMatrix$LMatrix$ = function (worldMatrix) {
	this.center.transformSelf$LMatrix$(worldMatrix);
};

/**
 * @param {Matrix} viewMatrix
 */
PolygonGroup.prototype.applyViewMatrix$LMatrix$ = function (viewMatrix) {
	this.vCenter = this.center.transform$LMatrix$(viewMatrix);
};

/**
 * @param {Camera} camera
 * @return {!boolean}
 */
PolygonGroup.prototype.isHidden$LCamera$ = function (camera) {
	if (this._ignoringZHidden) {
		return false;
	}
	if (camera.nearZ < this.vCenter.z && this.vCenter.z < camera.farZ) {
		return false;
	}
	return true;
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
	var $math_abs_t;
	Polygon$ALVector$LColor$.call(this, vertices, new Color$III(0, 0, 0));
	this._src = src;
	this._image = Engine.images[src];
	this.vertices = vertices;
	this._width = (($math_abs_t = vertices[1].sub$LVector$(vertices[0]).abs$()) >= 0 ? $math_abs_t : -$math_abs_t);
	this._height = (($math_abs_t = vertices[2].sub$LVector$(vertices[1]).abs$()) >= 0 ? $math_abs_t : -$math_abs_t);
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
	for (i = 0; i < this.vertices.length; i++) {
		this.vertices[i].transformSelf$LMatrix$(worldMatrix);
	}
	this.center.transformSelf$LMatrix$(worldMatrix);
};

/**
 * @param {Matrix} viewMatrix
 */
SmoothTexture.prototype.applyViewMatrix$LMatrix$ = function (viewMatrix) {
	/** @type {Array.<undefined|Vector>} */
	var vVertices;
	/** @type {!number} */
	var i;
	vVertices = [  ];
	for (i = 0; i < this.vertices.length; i++) {
		vVertices.push(this.vertices[i].transform$LMatrix$(viewMatrix));
	}
	this.vVertices = vVertices;
	this.vCenter = this.center.transform$LMatrix$(viewMatrix);
};

/**
 * @param {Camera} camera
 * @return {!boolean}
 */
SmoothTexture.prototype.isHidden$LCamera$ = function (camera) {
	if (camera.nearZ < this.vCenter.z && this.vCenter.z < camera.farZ) {
		return false;
	}
	return true;
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
	/** @type {Matrix} */
	var matrix;
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
	if (! Engine.isLoadedImage[this._src]) {
		return false;
	}
	context = engine.context;
	wltImage = this.vertices[3];
	wlbImage = this.vertices[0];
	wrbImage = this.vertices[1];
	wrtImage = this.vertices[2];
	matrix = engine.screenMatrix.compose$LMatrix$(engine.camera.projectionMatrix.compose$LMatrix$(engine.camera.viewMatrix));
	sltImage = wltImage.transform$LMatrix$(matrix);
	slbImage = wlbImage.transform$LMatrix$(matrix);
	srbImage = wrbImage.transform$LMatrix$(matrix);
	srtImage = wrtImage.transform$LMatrix$(matrix);
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
			wct = wlt.add$LVector$(wrt).divSelf$N(2);
			wcb = wlb.add$LVector$(wrb).divSelf$N(2);
			wlc = wlt.add$LVector$(wlb).divSelf$N(2);
			wrc = wrt.add$LVector$(wrb).divSelf$N(2);
			wcc = wlt.add$LVector$(wrb).divSelf$N(2);
			sct = wct.transform$LMatrix$(matrix);
			scb = wcb.transform$LMatrix$(matrix);
			slc = wlc.transform$LMatrix$(matrix);
			src = wrc.transform$LMatrix$(matrix);
			scc = wcc.transform$LMatrix$(matrix);
			divideAndDrawImage(image, wlt, wlc, wcc, wct, slt, slc, scc, sct, depth + 1, sx, sy, sw / 2, sh / 2);
			divideAndDrawImage(image, wlc, wlb, wcb, wcc, slc, slb, scb, scc, depth + 1, sx, sy + sh / 2, sw / 2, sh / 2);
			divideAndDrawImage(image, wct, wcc, wrc, wrt, sct, scc, src, srt, depth + 1, sx + sw / 2, sy, sw / 2, sh / 2);
			divideAndDrawImage(image, wcc, wcb, wrb, wrc, scc, scb, srb, src, depth + 1, sx + sw / 2, sy + sh / 2, sw / 2, sh / 2);
		} else {
			if (depth <= $this._maxVerticalDiv && splittingVertical) {
				wct = wlt.add$LVector$(wrt).divSelf$N(2);
				wcb = wlb.add$LVector$(wrb).divSelf$N(2);
				sct = wct.transform$LMatrix$(matrix);
				scb = wcb.transform$LMatrix$(matrix);
				divideAndDrawImage(image, wlt, wlb, wcb, wct, slt, slb, scb, sct, depth + 1, sx, sy, sw / 2, sh);
				divideAndDrawImage(image, wct, wcb, wrb, wrt, sct, scb, srb, srt, depth + 1, sx + sw / 2, sy, sw / 2, sh);
			} else {
				if (depth <= $this._maxHorizontalDiv && splittingHorizontal) {
					wlc = wlt.add$LVector$(wlb).divSelf$N(2);
					wrc = wrt.add$LVector$(wrb).divSelf$N(2);
					slc = wlc.transform$LMatrix$(matrix);
					src = wrc.transform$LMatrix$(matrix);
					divideAndDrawImage(image, wlt, wlc, wrc, wrt, slt, slc, src, srt, depth + 1, sx, sy, sw, sh / 2);
					divideAndDrawImage(image, wlc, wlb, wrb, wrc, slc, slb, srb, src, depth + 1, sx, sy + sh / 2, sw, sh / 2);
				} else {
					scaleX = (srt.x - slt.x) / sw;
					scaleY = (slb.y - slt.y) / sh;
					skewingX = (srt.y - slt.y) / (srt.x - slt.x);
					skewingY = (slb.x - slt.x) / (slb.y - slt.y);
					context.transform(1, 0, 0, 1, slt.x, slt.y);
					context.transform(1, skewingX, skewingY, 1, 0, 0);
					context.transform(scaleX, 0, 0, scaleY, 0, 0);
					context.drawImage(image, ~ ~ sx, ~ ~ sy, ~ ~ sw, ~ ~ sh, 0, 0, Math.ceil(sw), Math.ceil(sh));
					context.setTransform(1, 0, 0, 1, 0, 0);
				}
			}
		}
	});
	divideAndDrawImage(this._image, wltImage, wlbImage, wrbImage, wrtImage, sltImage, slbImage, srbImage, srtImage, 1, 0, 0, this._image.width, this._image.height);
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
	Renderable$.call(this);
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
	this.center.transformSelf$LMatrix$(worldMatrix);
};

/**
 * @param {Matrix} viewMatrix
 */
Billboard.prototype.applyViewMatrix$LMatrix$ = function (viewMatrix) {
	this.vCenter = this.center.transform$LMatrix$(viewMatrix);
};

/**
 * @param {Camera} camera
 * @return {!boolean}
 */
Billboard.prototype.isHidden$LCamera$ = function (camera) {
	if (camera.nearZ < this.vCenter.z && this.vCenter.z < camera.farZ) {
		return false;
	}
	return true;
};

/**
 * @param {Engine} engine
 * @return {!boolean}
 */
Billboard.prototype.draw$LEngine$ = function (engine) {
	/** @type {CanvasRenderingContext2D} */
	var context;
	/** @type {Matrix} */
	var projectionAndScreenMatrix;
	/** @type {Vector} */
	var vLeftBottom;
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
	if (! Engine.isLoadedImage[this._src]) {
		return false;
	}
	context = engine.context;
	projectionAndScreenMatrix = engine.screenMatrix.compose$LMatrix$(engine.camera.projectionMatrix);
	vLeftBottom = this.vCenter.sub$LVector$(new Vector$NNN(this._width / 2, this._height / 2, 0));
	sCenter = this.vCenter.transform$LMatrix$(projectionAndScreenMatrix);
	sLeftBottom = vLeftBottom.transform$LMatrix$(projectionAndScreenMatrix);
	sHalfWidth = sLeftBottom.x - sCenter.x;
	sHalfHeight = sLeftBottom.y - sCenter.y;
	isHiddenXY = Renderable$isHiddenXY$ALVector$LEngine$([ sCenter ], engine);
	if (isHiddenXY) {
		return false;
	}
	scaleX = sHalfWidth / this._image.width * 2;
	scaleY = sHalfHeight / this._image.height * 2;
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
	node = new Node$Vector$E$LVector$(value);
	if (this.length === 0) {
		this.head = node;
		this.tail = node;
	} else {
		node._next = this.head;
		this.head._prev = node;
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
	node = new Node$Vector$E$LVector$(value);
	if (this.length === 0) {
		this.head = node;
		this.tail = node;
	} else {
		node._prev = this.tail;
		this.tail._next = node;
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
	node = this.head;
	this.head = node._next;
	if (node._next != null) {
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
	node = this.tail;
	this.tail = node._prev;
	if (node._prev != null) {
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
	newNode = new Node$Vector$E$LVector$(value);
	if (node.next$() == null) {
		newNode._prev = node;
		node._next = newNode;
		this.tail = newNode;
	} else {
		newNode._next = node._next;
		newNode._prev = node;
		node._next._prev = newNode;
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
	newNode = new Node$Vector$E$LVector$(value);
	if (node.prev$() == null) {
		newNode._next = node;
		node._prev = newNode;
		this.head = newNode;
	} else {
		newNode._next = node;
		newNode._prev = node._prev;
		node._prev._next = newNode;
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
	for (n = this.head; n; n = n.next$()) {
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
	for (n = this.head; n != null; n = n.next$()) {
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
 * @return {Node$Vector$E}
 */
Node$Vector$E.prototype.prev$ = function () {
	return this._prev;
};

/**
 * @return {Node$Vector$E}
 */
Node$Vector$E.prototype.next$ = function () {
	return this._next;
};

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
	node = new Node$Matrix$E$LMatrix$(value);
	if (this.length === 0) {
		this.head = node;
		this.tail = node;
	} else {
		node._next = this.head;
		this.head._prev = node;
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
	node = new Node$Matrix$E$LMatrix$(value);
	if (this.length === 0) {
		this.head = node;
		this.tail = node;
	} else {
		node._prev = this.tail;
		this.tail._next = node;
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
	node = this.head;
	this.head = node._next;
	if (node._next != null) {
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
	node = this.tail;
	this.tail = node._prev;
	if (node._prev != null) {
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
	newNode = new Node$Matrix$E$LMatrix$(value);
	if (node.next$() == null) {
		newNode._prev = node;
		node._next = newNode;
		this.tail = newNode;
	} else {
		newNode._next = node._next;
		newNode._prev = node;
		node._next._prev = newNode;
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
	newNode = new Node$Matrix$E$LMatrix$(value);
	if (node.prev$() == null) {
		newNode._next = node;
		node._prev = newNode;
		this.head = newNode;
	} else {
		newNode._next = node;
		newNode._prev = node._prev;
		node._prev._next = newNode;
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
	for (n = this.head; n; n = n.next$()) {
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
	for (n = this.head; n != null; n = n.next$()) {
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
 * @return {Node$Matrix$E}
 */
Node$Matrix$E.prototype.prev$ = function () {
	return this._prev;
};

/**
 * @return {Node$Matrix$E}
 */
Node$Matrix$E.prototype.next$ = function () {
	return this._next;
};

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
	node = new Node$Renderable$E$LRenderable$(value);
	if (this.length === 0) {
		this.head = node;
		this.tail = node;
	} else {
		node._next = this.head;
		this.head._prev = node;
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
	node = new Node$Renderable$E$LRenderable$(value);
	if (this.length === 0) {
		this.head = node;
		this.tail = node;
	} else {
		node._prev = this.tail;
		this.tail._next = node;
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
	node = this.head;
	this.head = node._next;
	if (node._next != null) {
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
	node = this.tail;
	this.tail = node._prev;
	if (node._prev != null) {
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
	newNode = new Node$Renderable$E$LRenderable$(value);
	if (node.next$() == null) {
		newNode._prev = node;
		node._next = newNode;
		this.tail = newNode;
	} else {
		newNode._next = node._next;
		newNode._prev = node;
		node._next._prev = newNode;
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
	newNode = new Node$Renderable$E$LRenderable$(value);
	if (node.prev$() == null) {
		newNode._next = node;
		node._prev = newNode;
		this.head = newNode;
	} else {
		newNode._next = node;
		newNode._prev = node._prev;
		node._prev._next = newNode;
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
	for (n = this.head; n; n = n.next$()) {
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
	for (n = this.head; n != null; n = n.next$()) {
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
 * @return {Node$Renderable$E}
 */
Node$Renderable$E.prototype.prev$ = function () {
	return this._prev;
};

/**
 * @return {Node$Renderable$E}
 */
Node$Renderable$E.prototype.next$ = function () {
	return this._next;
};

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
	node = new Node$Polygon$E$LPolygon$(value);
	if (this.length === 0) {
		this.head = node;
		this.tail = node;
	} else {
		node._next = this.head;
		this.head._prev = node;
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
	node = new Node$Polygon$E$LPolygon$(value);
	if (this.length === 0) {
		this.head = node;
		this.tail = node;
	} else {
		node._prev = this.tail;
		this.tail._next = node;
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
	node = this.head;
	this.head = node._next;
	if (node._next != null) {
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
	node = this.tail;
	this.tail = node._prev;
	if (node._prev != null) {
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
	newNode = new Node$Polygon$E$LPolygon$(value);
	if (node.next$() == null) {
		newNode._prev = node;
		node._next = newNode;
		this.tail = newNode;
	} else {
		newNode._next = node._next;
		newNode._prev = node;
		node._next._prev = newNode;
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
	newNode = new Node$Polygon$E$LPolygon$(value);
	if (node.prev$() == null) {
		newNode._next = node;
		node._prev = newNode;
		this.head = newNode;
	} else {
		newNode._next = node;
		newNode._prev = node._prev;
		node._prev._next = newNode;
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
	for (n = this.head; n; n = n.next$()) {
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
	for (n = this.head; n != null; n = n.next$()) {
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
 * @return {Node$Polygon$E}
 */
Node$Polygon$E.prototype.prev$ = function () {
	return this._prev;
};

/**
 * @return {Node$Polygon$E}
 */
Node$Polygon$E.prototype.next$ = function () {
	return this._next;
};

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
	return (function (v) {
		if (! (v == null || v instanceof HTMLElement)) {
			debugger;
			throw new Error("[/Users/charlie/.jsx/lib/js/js/web.jsx:30] detected invalid cast, value is not an instance of the designated type or null");
		}
		return v;
	}(dom.document.createElement(tag)));
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
	return (function (v) {
		if (! (v == null || typeof v === "function")) {
			debugger;
			throw new Error("[/Users/charlie/.jsx/lib/js/timer.jsx:27] detected invalid cast, value is not a function or null");
		}
		return v;
	}(js.global.setTimeout))(callback, intervalMS);
};

var Timer$setTimeout$F$V$N = Timer.setTimeout$F$V$N;

/**
 * @param {TimerHandle} timer
 */
Timer.clearTimeout$LTimerHandle$ = function (timer) {
	(function (v) {
		if (! (v == null || typeof v === "function")) {
			debugger;
			throw new Error("[/Users/charlie/.jsx/lib/js/timer.jsx:31] detected invalid cast, value is not a function or null");
		}
		return v;
	}(js.global.clearTimeout))(timer);
};

var Timer$clearTimeout$LTimerHandle$ = Timer.clearTimeout$LTimerHandle$;

/**
 * @param {!number} intervalMS
 * @return {TimerHandle}
 */
Timer.setInterval$F$V$N = function (callback, intervalMS) {
	return (function (v) {
		if (! (v == null || typeof v === "function")) {
			debugger;
			throw new Error("[/Users/charlie/.jsx/lib/js/timer.jsx:35] detected invalid cast, value is not a function or null");
		}
		return v;
	}(js.global.setInterval))(callback, intervalMS);
};

var Timer$setInterval$F$V$N = Timer.setInterval$F$V$N;

/**
 * @param {TimerHandle} timer
 */
Timer.clearInterval$LTimerHandle$ = function (timer) {
	(function (v) {
		if (! (v == null || typeof v === "function")) {
			debugger;
			throw new Error("[/Users/charlie/.jsx/lib/js/timer.jsx:39] detected invalid cast, value is not a function or null");
		}
		return v;
	}(js.global.clearInterval))(timer);
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
				return (function (v) {
					if (! (v == null || typeof v === "function")) {
						debugger;
						throw new Error("[/Users/charlie/.jsx/lib/js/timer.jsx:65] detected invalid cast, value is not a function or null");
					}
					return v;
				}(js.global.requestAnimationFrame))(callback);
			});
		} else {
			if (js.global.webkitRequestAnimationFrame) {
				return (function (callback) {
					return (function (v) {
						if (! (v == null || typeof v === "function")) {
							debugger;
							throw new Error("[/Users/charlie/.jsx/lib/js/timer.jsx:71] detected invalid cast, value is not a function or null");
						}
						return v;
					}(js.global.webkitRequestAnimationFrame))(callback);
				});
			} else {
				if (js.global.mozRequestAnimationFrame) {
					return (function (callback) {
						return (function (v) {
							if (! (v == null || typeof v === "function")) {
								debugger;
								throw new Error("[/Users/charlie/.jsx/lib/js/timer.jsx:77] detected invalid cast, value is not a function or null");
							}
							return v;
						}(js.global.mozRequestAnimationFrame))(callback);
					});
				} else {
					if (js.global.oRequestAnimationFrame) {
						return (function (callback) {
							return (function (v) {
								if (! (v == null || typeof v === "function")) {
									debugger;
									throw new Error("[/Users/charlie/.jsx/lib/js/timer.jsx:83] detected invalid cast, value is not a function or null");
								}
								return v;
							}(js.global.oRequestAnimationFrame))(callback);
						});
					} else {
						if (js.global.msRequestAnimationFrame) {
							return (function (callback) {
								return (function (v) {
									if (! (v == null || typeof v === "function")) {
										debugger;
										throw new Error("[/Users/charlie/.jsx/lib/js/timer.jsx:89] detected invalid cast, value is not a function or null");
									}
									return v;
								}(js.global.msRequestAnimationFrame))(callback);
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
		now = Date.now();
		timeToCall = Math.max(0, 16 - (now - lastTime));
		lastTime = now + timeToCall;
		return Timer$setTimeout$F$V$N((function () {
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
				(function (v) {
					if (! (v == null || typeof v === "function")) {
						debugger;
						throw new Error("[/Users/charlie/.jsx/lib/js/timer.jsx:112] detected invalid cast, value is not a function or null");
					}
					return v;
				}(js.global.cancelAnimationFrame))(timer);
			});
		} else {
			if (js.global.webkitCancelAnimationFrame) {
				return (function (timer) {
					(function (v) {
						if (! (v == null || typeof v === "function")) {
							debugger;
							throw new Error("[/Users/charlie/.jsx/lib/js/timer.jsx:118] detected invalid cast, value is not a function or null");
						}
						return v;
					}(js.global.webkitCancelAnimationFrame))(timer);
				});
			} else {
				if (js.global.mozCancelAnimationFrame) {
					return (function (timer) {
						(function (v) {
							if (! (v == null || typeof v === "function")) {
								debugger;
								throw new Error("[/Users/charlie/.jsx/lib/js/timer.jsx:124] detected invalid cast, value is not a function or null");
							}
							return v;
						}(js.global.mozCancelAnimationFrame))(timer);
					});
				} else {
					if (js.global.oCancelAnimationFrame) {
						return (function (timer) {
							(function (v) {
								if (! (v == null || typeof v === "function")) {
									debugger;
									throw new Error("[/Users/charlie/.jsx/lib/js/timer.jsx:130] detected invalid cast, value is not a function or null");
								}
								return v;
							}(js.global.oCancelAnimationFrame))(timer);
						});
					} else {
						if (js.global.msCancelAnimationFrame) {
							return (function (timer) {
								(function (v) {
									if (! (v == null || typeof v === "function")) {
										debugger;
										throw new Error("[/Users/charlie/.jsx/lib/js/timer.jsx:136] detected invalid cast, value is not a function or null");
									}
									return v;
								}(js.global.msCancelAnimationFrame))(timer);
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
 * @return {!number}
 */
Stopwatch.prototype._currentMsec$ = function () {
	return Date.now();
};

/**
 */
Stopwatch.prototype.start$ = function () {
	if (! (this._startedMsec == null)) {
		debugger;
		throw new Error("[jsx/util.jsx:39] assertion failure");
	}
	this._startedMsec = this._lastLapMsec = this._currentMsec$();
};

/**
 */
Stopwatch.prototype.stop$ = function () {
	if (! (this._startedMsec != null)) {
		debugger;
		throw new Error("[jsx/util.jsx:45] assertion failure");
	}
	this._elapsedMsec += this._currentMsec$() - (function (v) {
		if (! (v != null)) {
			debugger;
			throw new Error("[jsx/util.jsx:47] null access");
		}
		return v;
	}(this._startedMsec));
	this._startedMsec = null;
	this._lastLapMsec = null;
};

/**
 * @return {!boolean}
 */
Stopwatch.prototype.isStarted$ = function () {
	return this._startedMsec != null;
};

/**
 * @return {!boolean}
 */
Stopwatch.prototype.isStopped$ = function () {
	return this._startedMsec == null;
};

/**
 * @return {!number}
 */
Stopwatch.prototype.lap$ = function () {
	/** @type {!number} */
	var currentMsec;
	/** @type {!number} */
	var lapMsec;
	if (! (this._lastLapMsec != null)) {
		debugger;
		throw new Error("[jsx/util.jsx:65] assertion failure");
	}
	currentMsec = this._currentMsec$();
	lapMsec = currentMsec - (function (v) {
		if (! (v != null)) {
			debugger;
			throw new Error("[jsx/util.jsx:68] null access");
		}
		return v;
	}(this._lastLapMsec));
	this._lastLapMsec = currentMsec;
	return lapMsec;
};

/**
 * @return {!number}
 */
Stopwatch.prototype.getElapsedMsec$ = function () {
	return this._elapsedMsec;
};

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
	this._fpsElement = null;
	this._stopwatch = new Stopwatch$();
	this._recentlyMsecLog = [  ];
	this._lastMsec = 0;
	this._enabledHtmlLog = false;
	this._enabledConsoleLog = true;
};

FpsManager$.prototype = new FpsManager;

/**
 * @constructor
 * @param {!string} spanId
 */
function FpsManager$S(spanId) {
	this._fpsElement = dom$id$S(spanId);
	this._stopwatch = new Stopwatch$();
	this._recentlyMsecLog = [  ];
	this._lastMsec = 0;
	this._enabledHtmlLog = true;
	this._enabledConsoleLog = false;
};

FpsManager$S.prototype = new FpsManager;

/**
 */
FpsManager.prototype.start$ = function () {
	this._stopwatch.start$();
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
	if (! (! this._stopwatch.isStopped$())) {
		debugger;
		throw new Error("[jsx/util.jsx:126] assertion failure");
	}
	lap = this._stopwatch.lap$();
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
		totalMsec += (function (v) {
			if (! (v != null)) {
				debugger;
				throw new Error("[jsx/util.jsx:141] null access");
			}
			return v;
		}(this._recentlyMsecLog[i]));
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
	return (function (v) {
		if (! (v == null || v instanceof HTMLDocument)) {
			debugger;
			throw new Error("[/Users/charlie/.jsx/lib/js/js/web.jsx:16] detected invalid cast, value is not an instance of the designated type or null");
		}
		return v;
	}(js.global.document));
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
		FpsManager$: FpsManager$,
		FpsManager$S: FpsManager$S
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

//@ sourceMappingURL=jsx/ball.jsx.js.mapping
