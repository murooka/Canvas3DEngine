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
	this.lastLapMsec = null;
	this.elapsedMsec = 0;
	this.startedMsec = null;
};

Stopwatch$.prototype = new Stopwatch;

/**
 * @return {!number}
 */
Stopwatch.prototype.currentMsec$ = function () {
	return new Date().getTime();
};

/**
 */
Stopwatch.prototype.start$ = function () {
	if (this.startedMsec != null) {
		throw "Stopwatch#start : invalid operation, timer is already running.";
	}
	this.startedMsec = this.lastLapMsec = this.currentMsec$();
};

/**
 */
Stopwatch.prototype.stop$ = function () {
	if (this.startedMsec == null) {
		throw "Stopwatch#stop : invalid operation, timer is not started.";
	}
	this.elapsedMsec += this.currentMsec$() - (function (v) {
		if (! (v != null)) {
			debugger;
			throw new Error("[jsx/engine.jsx:54] null access");
		}
		return v;
	}(this.startedMsec));
	this.startedMsec = null;
	this.lastLapMsec = null;
};

/**
 * @return {!boolean}
 */
Stopwatch.prototype.isStarted$ = function () {
	return this.startedMsec != null;
};

/**
 * @return {!boolean}
 */
Stopwatch.prototype.isStopped$ = function () {
	return this.startedMsec == null;
};

/**
 * @return {!number}
 */
Stopwatch.prototype.lap$ = function () {
	/** @type {!number} */
	var currentMsec;
	/** @type {!number} */
	var lapMsec;
	if (this.lastLapMsec == null) {
		throw "Stopwatch#lap : invalid operation, timer is not started.";
	}
	currentMsec = this.currentMsec$();
	lapMsec = currentMsec - (function (v) {
		if (! (v != null)) {
			debugger;
			throw new Error("[jsx/engine.jsx:76] null access");
		}
		return v;
	}(this.lastLapMsec));
	this.lastLapMsec = currentMsec;
	return lapMsec;
};

/**
 * @return {!number}
 */
Stopwatch.prototype.getElapsedMsec$ = function () {
	return this.elapsedMsec;
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
	this.fpsElement = null;
	this.stopwatch = new Stopwatch$();
	this.recentlyMsecLog = [  ];
	this.enabledHtmlLog = false;
	this.enabledConsoleLog = true;
};

FpsManager$.prototype = new FpsManager;

/**
 * @constructor
 * @param {!string} spanId
 */
function FpsManager$S(spanId) {
	this.fpsElement = dom$id$S(spanId);
	this.stopwatch = new Stopwatch$();
	this.recentlyMsecLog = [  ];
	this.enabledHtmlLog = true;
	this.enabledConsoleLog = false;
};

FpsManager$S.prototype = new FpsManager;

/**
 */
FpsManager.prototype.start$ = function () {
	this.stopwatch.start$();
};

/**
 */
FpsManager.prototype.update$ = function () {
	/** @type {!number} */
	var length;
	/** @type {!number} */
	var totalMsec;
	/** @type {!number} */
	var i;
	/** @type {!number} */
	var fps;
	if (this.stopwatch.isStopped$()) {
		throw "FpsManager#update : invalid operation, FpsManager is not started.";
	}
	if (this.recentlyMsecLog.length < 1) {
		this.recentlyMsecLog.push(this.stopwatch.lap$());
	} else {
		this.recentlyMsecLog.push(this.stopwatch.lap$());
		this.recentlyMsecLog.shift();
	}
	length = this.recentlyMsecLog.length;
	totalMsec = 0;
	for (i = 0; i < length; i++) {
		totalMsec += (function (v) {
			if (! (v != null)) {
				debugger;
				throw new Error("[jsx/engine.jsx:141] null access");
			}
			return v;
		}(this.recentlyMsecLog[i]));
	}
	fps = length / (totalMsec / 1000);
	if (this.fpsElement != null && this.enabledHtmlLog) {
		this.fpsElement.innerHTML = fps.toFixed(1) + "fps";
	} else {
		if (this.enabledConsoleLog) {
			console.log(fps.toFixed(1) + "fps");
		}
	}
};

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
	this.transformationMatrix = null;
	this.objects = null;
	this.canvas = (function (o) { return o instanceof HTMLCanvasElement ? o : null; })(dom$id$S(canvasId));
	this.ctx = (function (o) { return o instanceof CanvasRenderingContext2D ? o : null; })(this.canvas.getContext('2d'));
	this.width = this.canvas.width;
	this.height = this.canvas.height;
	this.setScreenMatrix$NN(this.width, this.height);
	this.objects = [  ];
	viewPosition = new Vector$NNN(0, 0, - 100);
	targetPosition = new Vector$NNN(0, 0, 0);
	upperVector = new Vector$NNN(0, 1, 0);
	fovyX = Math.PI / 3;
	nearZ = 0;
	farZ = 500;
	aspectRatio = this.height / this.width;
	this.camera = new Camera$LVector$LVector$LVector$NNNN(viewPosition, targetPosition, upperVector, fovyX, nearZ, farZ, aspectRatio);
	this.updateMatrix$();
};

Engine$S.prototype = new Engine;

/**
 * @param {Array.<undefined|!string>} srcs
 */
Engine.loadImages$AS = function (srcs) {
	/** @type {HTMLCanvasElement} */
	var canvas;
	/** @type {CanvasRenderingContext2D} */
	var ctx;
	var setOnload;
	/** @type {!number} */
	var i;
	/** @type {undefined|!string} */
	var src;
	/** @type {HTMLImageElement} */
	var image;
	canvas = (function (o) { return o instanceof HTMLCanvasElement ? o : null; })(dom$id$S('tmp_canvas'));
	ctx = (function (o) { return o instanceof CanvasRenderingContext2D ? o : null; })(canvas.getContext('2d'));
	setOnload = (function (src) {
		Engine.images[src].onload = (function (e) {
			/** @type {HTMLImageElement} */
			var image;
			image = Engine.images[src];
			Engine.isLoadedImage[src] = true;
			ctx.drawImage(image, 0, 0);
			Engine.imageDatas[src] = ctx.getImageData(0, 0, image.width, image.height);
		});
	});
	for (i = 0; i < srcs.length; i++) {
		src = srcs[i];
		image = (function (o) { return o instanceof HTMLImageElement ? o : null; })(dom$createElement$S('img'));
		image.src = (function (v) {
			if (! (v != null)) {
				debugger;
				throw new Error("[jsx/engine.jsx:238] null access");
			}
			return v;
		}(src));
		Engine.isLoadedImage[src] = false;
		Engine.images[src] = image;
		setOnload((function (v) {
			if (! (v != null)) {
				debugger;
				throw new Error("[jsx/engine.jsx:241] null access");
			}
			return v;
		}(src)));
	}
};

var Engine$loadImages$AS = Engine.loadImages$AS;

/**
 * @param {AbstractModel} o
 */
Engine.prototype.addModel$LAbstractModel$ = function (o) {
	this.objects.push(o);
};

/**
 */
Engine.prototype.update$ = function () {
	var $this = this;
	/** @type {Camera} */
	var camera;
	/** @type {Array.<undefined|AbstractModel>} */
	var objects;
	/** @type {!number} */
	var i;
	/** @type {!number} */
	var count;
	this.ctx.fillStyle = 'rgb(255, 255, 255)';
	this.ctx.fillRect(0, 0, this.width, this.height);
	camera = this.camera;
	objects = [  ];
	for (i = 0; i < this.objects.length; i++) {
		this.objects[i].applyViewMatrix$LMatrix$(camera.viewMatrix);
		if (! this.objects[i].isHidden$LCamera$(camera)) {
			objects.push(this.objects[i]);
		}
	}
	objects = objects.sort((function (a, b) {
		if (a.depth === b.depth) {
			return a.vCenter.z - b.vCenter.z;
		}
		return b.depth - a.depth;
	}));
	count = 0;
	for (i = 0; i < objects.length; i++) {
		if (objects[i].draw$LEngine$(this)) {
			count++;
		}
	}
	console.log('draw ' + (count + "") + ' models');
};

/**
 * @param {!number} width
 * @param {!number} height
 */
Engine.prototype.setScreenMatrix$NN = function (width, height) {
	this.screenMatrix = Matrix$translating$NNN(width / 2, height / 2, 0).composeSelf$LMatrix$(Matrix$scaling$NNN(width / 2, height / 2, 1));
};

/**
 */
Engine.prototype.updateMatrix$ = function () {
	this.camera.updateMatrix$();
	this.transformationMatrix = this.screenMatrix.compose$LMatrix$(this.camera.matrix);
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
	vector = this.rotatingMatrix.mul$LVector$(v);
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
	lookingVec = Matrix$rotatingY$N(rad).mul$LVector$(lookingVec);
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
		zaxis = view.sub$LVector$(target).unitSelf$();
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
		return new Matrix$AN([ sx, 0, 0, 0, 0, sy, 0, 0, 0, 0, sz, mz, 0, 0, 1, 1 ]);
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
 * @return {!string}
 */
Color.prototype.toHexString$ = function () {
	var $this = this;
	var to2digitHex;
	to2digitHex = (function (value) {
		/** @type {!string} */
		var str;
		str = Math.floor(value).toString(16);
		if (str.length === 1) {
			str = '0' + str;
		}
		return str;
	});
	return to2digitHex(this.r) + to2digitHex(this.g) + to2digitHex(this.b);
};

/**
 * @return {Color}
 */
Color.prototype.negative$ = function () {
	return new Color$III(this.g, this.b, this.r);
};

/**
 * class AbstractModel extends Object
 * @constructor
 */
function AbstractModel() {
}

AbstractModel.prototype = new Object;
/**
 * @constructor
 */
function AbstractModel$() {
	this.center = null;
	this.vCenter = null;
	this.depth = 5;
};

AbstractModel$.prototype = new AbstractModel;

/**
 * @param {Array.<undefined|Vector>} vertices
 * @param {Engine} engine
 * @return {!boolean}
 */
AbstractModel.isHiddenXY$ALVector$LEngine$ = function (vertices, engine) {
	/** @type {!number} */
	var i;
	/** @type {Vector} */
	var v;
	for (i = 0; i < vertices.length; i++) {
		v = vertices[i];
		if (0 < v.x && v.x < engine.width && 0 < v.y && v.y < engine.height) {
			return false;
		}
	}
	return true;
};

var AbstractModel$isHiddenXY$ALVector$LEngine$ = AbstractModel.isHiddenXY$ALVector$LEngine$;

/**
 * class Polygon extends AbstractModel
 * @constructor
 */
function Polygon() {
}

Polygon.prototype = new AbstractModel;
/**
 * @constructor
 * @param {Array.<undefined|Vector>} vertices
 * @param {Color} color
 */
function Polygon$ALVector$LColor$(vertices, color) {
	AbstractModel$.call(this);
	this.vVertices = null;
	this.vertices = vertices;
	this.color = color;
	this.enabledLighting = true;
};

Polygon$ALVector$LColor$.prototype = new Polygon;

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
		vVertex = viewMatrix.mul$LVector$(this.vertices[i]);
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
	if (camera.nearZ < - this.vCenter.z && - this.vCenter.z < camera.farZ) {
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
 * @param {Vector} center
 * @param {!number} rad
 */
Polygon.prototype.rotateX$LVector$N = function (center, rad) {
	/** @type {!number} */
	var i;
	for (i = 0; i < this.vertices.length; i++) {
		this.vertices[i].subSelf$LVector$(center).rotateXSelf$N(rad).addSelf$LVector$(center);
	}
	this.updateCenter$();
};

/**
 * @param {Vector} center
 * @param {!number} rad
 */
Polygon.prototype.rotateY$LVector$N = function (center, rad) {
	/** @type {!number} */
	var i;
	for (i = 0; i < this.vertices.length; i++) {
		this.vertices[i].subSelf$LVector$(center).rotateYSelf$N(rad).addSelf$LVector$(center);
	}
	this.updateCenter$();
};

/**
 * @param {Vector} center
 * @param {!number} rad
 */
Polygon.prototype.rotateZ$LVector$N = function (center, rad) {
	/** @type {!number} */
	var i;
	for (i = 0; i < this.vertices.length; i++) {
		this.vertices[i].subSelf$LVector$(center).rotateZSelf$N(rad).addSelf$LVector$(center);
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
	var ctx;
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
	ctx = engine.ctx;
	len = this.vertices.length;
	verts = this.vVertices;
	color = this.color;
	if (this.enabledLighting) {
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
			v1 = verts[1].sub$LVector$(center);
			v2 = verts[2].sub$LVector$(center);
			norm = v1.cross$LVector$(v2).unit$();
			lightPower = norm.dot$LVector$(center.unit$());
			diffusePower = 0.7;
			diffuseCoefficient = 0.8;
			ambientPower = 0.5;
			r = Math.min(255, (diffusePower * diffuseCoefficient * lightPower + ambientPower) * $this.color.r);
			g = Math.min(255, (diffusePower * diffuseCoefficient * lightPower + ambientPower) * $this.color.g);
			b = Math.min(255, (diffusePower * diffuseCoefficient * lightPower + ambientPower) * $this.color.b);
			return new Color$III(r, g, b);
		})();
	}
	for (i = 0; i < len; i++) {
		verts[i] = engine.camera.projectionMatrix.mul$LVector$(verts[i]);
	}
	for (i = 0; i < len; i++) {
		verts[i] = engine.screenMatrix.mul$LVector$(verts[i]);
	}
	isHiddenXY = AbstractModel$isHiddenXY$ALVector$LEngine$(verts, engine);
	if (isHiddenXY) {
		return false;
	}
	for (i = 0; i < verts.length; i++) {
		i1 = (i + 1) % verts.length;
		i2 = (i + 2) % verts.length;
		if (Math2D$cross$NNNN(verts[i1].x - verts[i].x, verts[i1].y - verts[i].y, verts[i2].x - verts[i].x, verts[i2].y - verts[i].y) > 0) {
			return false;
		}
	}
	colorStr = '#' + color.toHexString$();
	ctx.strokeStyle = colorStr;
	for (i = 0; i < len; i++) {
		ctx.beginPath();
		ctx.moveTo(verts[i].x, verts[i].y);
		ctx.lineTo(verts[(i + 1) % len].x, verts[(i + 1) % len].y);
		ctx.stroke();
	}
	ctx.fillStyle = colorStr;
	ctx.beginPath();
	for (i = 0; i < len; i++) {
		x = verts[i].x;
		y = verts[i].y;
		ctx.lineTo(x, y);
	}
	ctx.closePath();
	ctx.fill();
	return true;
};

/**
 * class Model extends AbstractModel
 * @constructor
 */
function Model() {
}

Model.prototype = new AbstractModel;
/**
 * @constructor
 * @param {Array.<undefined|Polygon>} polygons
 * @param {Vector} center
 */
function Model$ALPolygon$LVector$(polygons, center) {
	AbstractModel$.call(this);
	this.polygons = polygons;
	this.center = center;
	this.enabledZSort = false;
};

Model$ALPolygon$LVector$.prototype = new Model;

/**
 * @param {Matrix} viewMatrix
 */
Model.prototype.applyViewMatrix$LMatrix$ = function (viewMatrix) {
	/** @type {!number} */
	var i;
	this.vCenter = viewMatrix.mul$LVector$(this.center);
	for (i = 0; i < this.polygons.length; i++) {
		this.polygons[i].applyViewMatrix$LMatrix$(viewMatrix);
	}
};

/**
 * @param {Camera} camera
 * @return {!boolean}
 */
Model.prototype.isHidden$LCamera$ = function (camera) {
	/** @type {!number} */
	var i;
	/** @type {Polygon} */
	var polygon;
	for (i = 0; i < this.polygons.length; i++) {
		polygon = this.polygons[i];
		if (camera.nearZ < - polygon.vCenter.z && - polygon.vCenter.z < camera.farZ) {
			return false;
		}
	}
	return true;
};

/**
 * @param {Vector} v
 */
Model.prototype.move$LVector$ = function (v) {
	/** @type {!number} */
	var i;
	for (i = 0; i < this.polygons.length; i++) {
		this.polygons[i].move$LVector$(v);
	}
	this.center = this.center.add$LVector$(v);
};

/**
 * @param {!number} rad
 */
Model.prototype.rotateX$N = function (rad) {
	/** @type {!number} */
	var i;
	for (i = 0; i < this.polygons.length; i++) {
		this.polygons[i].rotateX$LVector$N(this.center, rad);
	}
};

/**
 * @param {!number} rad
 */
Model.prototype.rotateY$N = function (rad) {
	/** @type {!number} */
	var i;
	for (i = 0; i < this.polygons.length; i++) {
		this.polygons[i].rotateY$LVector$N(this.center, rad);
	}
};

/**
 * @param {!number} rad
 */
Model.prototype.rotateZ$N = function (rad) {
	/** @type {!number} */
	var i;
	for (i = 0; i < this.polygons.length; i++) {
		this.polygons[i].rotateZ$LVector$N(this.center, rad);
	}
};

/**
 * @param {Engine} engine
 * @return {!boolean}
 */
Model.prototype.draw$LEngine$ = function (engine) {
	var $this = this;
	/** @type {Array.<undefined|Polygon>} */
	var polygons;
	/** @type {!number} */
	var i;
	/** @type {Polygon} */
	var polygon;
	polygons = this.polygons;
	if (this.enabledZSort) {
		polygons = polygons.sort((function (a, b) {
			return a.vCenter.z - b.vCenter.z;
		}));
	}
	for (i = 0; i < this.polygons.length; i++) {
		polygon = this.polygons[i];
		if (polygon.isHidden$LCamera$(engine.camera)) {
			continue;
		}
		polygon.draw$LEngine$(engine);
	}
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
	var $math_abs_t;
	Polygon$ALVector$LColor$.call(this, vertices, new Color$III(0, 0, 0));
	this.src = src;
	this.image = Engine.images[src];
	this.vertices = vertices;
	this.width = (($math_abs_t = vertices[1].sub$LVector$(vertices[0]).abs$()) >= 0 ? $math_abs_t : -$math_abs_t);
	this.height = (($math_abs_t = vertices[2].sub$LVector$(vertices[1]).abs$()) >= 0 ? $math_abs_t : -$math_abs_t);
	this.updateCenter$();
};

SmoothTexture$ALVector$S.prototype = new SmoothTexture;

/**
 * @param {Matrix} viewMatrix
 */
SmoothTexture.prototype.applyViewMatrix$LMatrix$ = function (viewMatrix) {
	this.vCenter = viewMatrix.mul$LVector$(this.center);
};

/**
 * @param {Camera} camera
 * @return {!boolean}
 */
SmoothTexture.prototype.isHidden$LCamera$ = function (camera) {
	if (camera.nearZ < - this.vCenter.z && - this.vCenter.z < camera.farZ) {
		return false;
	}
	return true;
};

/**
 * @param {!number} rad
 * @param {Vector} center
 */
SmoothTexture.prototype.rotateX$NLVector$ = function (rad, center) {
	/** @type {!number} */
	var i;
	for (i = 0; i < this.vertices.length; i++) {
		this.vertices[i].subSelf$LVector$(center).rotateXSelf$N(rad).addSelf$LVector$(center);
	}
	this.updateCenter$();
};

/**
 * @param {!number} rad
 * @param {Vector} center
 */
SmoothTexture.prototype.rotateY$NLVector$ = function (rad, center) {
	/** @type {!number} */
	var i;
	for (i = 0; i < this.vertices.length; i++) {
		this.vertices[i].subSelf$LVector$(center).rotateYSelf$N(rad).addSelf$LVector$(center);
	}
	this.updateCenter$();
};

/**
 * @param {!number} rad
 * @param {Vector} center
 */
SmoothTexture.prototype.rotateZ$NLVector$ = function (rad, center) {
	/** @type {!number} */
	var i;
	for (i = 0; i < this.vertices.length; i++) {
		this.vertices[i].subSelf$LVector$(center).rotateZSelf$N(rad).addSelf$LVector$(center);
	}
	this.updateCenter$();
};

/**
 * @param {Engine} engine
 * @return {!boolean}
 */
SmoothTexture.prototype.draw$LEngine$ = function (engine) {
	var $this = this;
	/** @type {CanvasRenderingContext2D} */
	var ctx;
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
	var divideAndDrawImage;
	if (! Engine.isLoadedImage[this.src]) {
		return false;
	}
	ctx = engine.ctx;
	wltImage = this.vertices[3];
	wlbImage = this.vertices[0];
	wrbImage = this.vertices[1];
	wrtImage = this.vertices[2];
	matrix = engine.screenMatrix.compose$LMatrix$(engine.camera.projectionMatrix.compose$LMatrix$(engine.camera.viewMatrix));
	sltImage = matrix.mul$LVector$(wltImage);
	slbImage = matrix.mul$LVector$(wlbImage);
	srbImage = matrix.mul$LVector$(wrbImage);
	srtImage = matrix.mul$LVector$(wrtImage);
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
		var maxX;
		/** @type {!number} */
		var minX;
		/** @type {!number} */
		var maxY;
		/** @type {!number} */
		var minY;
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
		if (depth <= 2 || depth <= 4 && splittingHorizontal && splittingVertical) {
			wct = wlt.add$LVector$(wrt).divSelf$N(2);
			wcb = wlb.add$LVector$(wrb).divSelf$N(2);
			wlc = wlt.add$LVector$(wlb).divSelf$N(2);
			wrc = wrt.add$LVector$(wrb).divSelf$N(2);
			wcc = wlt.add$LVector$(wrb).divSelf$N(2);
			sct = matrix.mul$LVector$(wct);
			scb = matrix.mul$LVector$(wcb);
			slc = matrix.mul$LVector$(wlc);
			src = matrix.mul$LVector$(wrc);
			scc = matrix.mul$LVector$(wcc);
			divideAndDrawImage(image, wlt, wlc, wcc, wct, slt, slc, scc, sct, depth + 1, sx, sy, sw / 2, sh / 2);
			divideAndDrawImage(image, wlc, wlb, wcb, wcc, slc, slb, scb, scc, depth + 1, sx, sy + sh / 2, sw / 2, sh / 2);
			divideAndDrawImage(image, wct, wcc, wrc, wrt, sct, scc, src, srt, depth + 1, sx + sw / 2, sy, sw / 2, sh / 2);
			divideAndDrawImage(image, wcc, wcb, wrb, wrc, scc, scb, srb, src, depth + 1, sx + sw / 2, sy + sh / 2, sw / 2, sh / 2);
		} else {
			if (depth <= 6 && splittingVertical) {
				wct = wlt.add$LVector$(wrt).divSelf$N(2);
				wcb = wlb.add$LVector$(wrb).divSelf$N(2);
				sct = matrix.mul$LVector$(wct);
				scb = matrix.mul$LVector$(wcb);
				divideAndDrawImage(image, wlt, wlb, wcb, wct, slt, slb, scb, sct, depth + 1, sx, sy, sw / 2, sh);
				divideAndDrawImage(image, wct, wcb, wrb, wrt, sct, scb, srb, srt, depth + 1, sx + sw / 2, sy, sw / 2, sh);
			} else {
				if (depth <= 6 && splittingHorizontal) {
					wlc = wlt.add$LVector$(wlb).divSelf$N(2);
					wrc = wrt.add$LVector$(wrb).divSelf$N(2);
					slc = matrix.mul$LVector$(wlc);
					src = matrix.mul$LVector$(wrc);
					divideAndDrawImage(image, wlt, wlc, wrc, wrt, slt, slc, src, srt, depth + 1, sx, sy, sw, sh / 2);
					divideAndDrawImage(image, wlc, wlb, wrb, wrc, slc, slb, srb, src, depth + 1, sx, sy + sh / 2, sw, sh / 2);
				} else {
					maxX = Math.max(slt.x, slb.x, srb.x, srt.x);
					minX = Math.min(slt.x, slb.x, srb.x, srt.x);
					maxY = Math.max(slt.y, slb.y, srb.y, srt.y);
					minY = Math.min(slt.y, slb.y, srb.y, srt.y);
					scaleX = (maxX - minX) / sw;
					scaleY = (maxY - minY) / sh;
					skewingX = (srt.y - slt.y) / (srt.x - slt.x);
					skewingY = (slb.x - slt.x) / (slb.y - slt.y);
					ctx.transform(1, 0, 0, 1, slt.x, slt.y);
					ctx.transform(1, skewingX, skewingY, 1, 0, 0);
					ctx.transform(scaleX, 0, 0, scaleY, 0, 0);
					ctx.drawImage(image, Math.floor(sx), Math.floor(sy), Math.ceil(sw), Math.ceil(sh), 0, 0, Math.ceil(sw), Math.ceil(sh));
					ctx.setTransform(1, 0, 0, 1, 0, 0);
				}
			}
		}
	});
	divideAndDrawImage(this.image, wltImage, wlbImage, wrbImage, wrtImage, sltImage, slbImage, srbImage, srtImage, 1, 0, 0, this.image.width, this.image.height);
	return true;
};

/**
 * class Billboard extends AbstractModel
 * @constructor
 */
function Billboard() {
}

Billboard.prototype = new AbstractModel;
/**
 * @constructor
 * @param {Vector} center
 * @param {!number} width
 * @param {!number} height
 * @param {!string} src
 */
function Billboard$LVector$NNS(center, width, height, src) {
	AbstractModel$.call(this);
	this.width = width;
	this.height = height;
	this.src = src;
	this.image = Engine.images[src];
	this.center = center;
};

Billboard$LVector$NNS.prototype = new Billboard;

/**
 * @param {Matrix} viewMatrix
 */
Billboard.prototype.applyViewMatrix$LMatrix$ = function (viewMatrix) {
	this.vCenter = viewMatrix.mul$LVector$(this.center);
};

/**
 * @param {Camera} camera
 * @return {!boolean}
 */
Billboard.prototype.isHidden$LCamera$ = function (camera) {
	if (camera.nearZ < - this.vCenter.z && - this.vCenter.z < camera.farZ) {
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
	var ctx;
	/** @type {Matrix} */
	var projectionAndScreenMatrix;
	/** @type {Vector} */
	var vLeftBottom;
	/** @type {Vector} */
	var vpCenter;
	/** @type {Vector} */
	var vpLeftBottom;
	/** @type {!number} */
	var vpHalfWidth;
	/** @type {!number} */
	var vpHalfHeight;
	/** @type {!number} */
	var scaleX;
	/** @type {!number} */
	var scaleY;
	if (! Engine.isLoadedImage[this.src]) {
		return false;
	}
	ctx = engine.ctx;
	projectionAndScreenMatrix = engine.screenMatrix.compose$LMatrix$(engine.camera.projectionMatrix);
	vLeftBottom = this.vCenter.sub$LVector$(new Vector$NNN(this.width / 2, this.height / 2, 0));
	vpCenter = projectionAndScreenMatrix.mul$LVector$(this.vCenter);
	vpLeftBottom = projectionAndScreenMatrix.mul$LVector$(vLeftBottom);
	vpHalfWidth = vpLeftBottom.x - vpCenter.x;
	vpHalfHeight = vpLeftBottom.y - vpCenter.y;
	scaleX = vpHalfWidth / this.image.width * 2;
	scaleY = vpHalfHeight / this.image.height * 2;
	ctx.setTransform(scaleX, 0, 0, scaleY, 0, 0);
	ctx.drawImage(this.image, (vpCenter.x - vpHalfWidth) / scaleX, (vpCenter.y - vpHalfHeight) / scaleY);
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	return true;
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
	/** @type {Engine} */
	var engine;
	/** @type {Model} */
	var model;
	/** @type {!number} */
	var i;
	/** @type {!number} */
	var x;
	/** @type {!number} */
	var z;
	/** @type {Billboard} */
	var billboard;
	/** @type {SmoothTexture} */
	var texture;
	/** @type {!boolean} */
	var dragging;
	/** @type {!number} */
	var old_x;
	/** @type {!number} */
	var old_y;
	engine = new Engine$S('canvas');
	Engine$loadImages$AS([ './image/tree.png', './image/so-nya.png' ]);
	model = (function () {
		/** @type {Array.<undefined|Polygon>} */
		var polygons;
		/** @type {!number} */
		var i;
		/** @type {!number} */
		var j;
		/** @type {Polygon} */
		var polygon;
		polygons = [  ];
		for (i = - 10; i < 10; i++) {
			for (j = - 10; j < 10; j++) {
				polygon = new Polygon$ALVector$LColor$([ new Vector$NNN(i * 50, - 20, j * 50), new Vector$NNN((i + 1) * 50, - 20, j * 50), new Vector$NNN((i + 1) * 50, - 20, (j + 1) * 50), new Vector$NNN(i * 50, - 20, (j + 1) * 50) ], new Color$III(128, 255, 128));
				polygon.depth = 8;
				polygons.push(polygon);
			}
		}
		return new Model$ALPolygon$LVector$(polygons, new Vector$NNN(0, 0, 0));
	})();
	model.depth = 8;
	engine.addModel$LAbstractModel$(model);
	for (i = 0; i < 1; i++) {
		x = Math.floor((Math.random() - 0.5) * 20) * 25;
		z = Math.floor((Math.random() - 0.5) * 20) * 25;
		billboard = new Billboard$LVector$NNS(new Vector$NNN(x, - 3, z), 50, 35, './image/tree.png');
		engine.addModel$LAbstractModel$(billboard);
	}
	texture = new SmoothTexture$ALVector$S([ new Vector$NNN(- 30, - 20, 0), new Vector$NNN(30, - 20, 0), new Vector$NNN(30, 20, 0), new Vector$NNN(- 30, 20, 0) ], './image/so-nya.png');
	engine.addModel$LAbstractModel$(texture);
	engine.update$();
	dragging = false;
	old_x = 0;
	old_y = 0;
	engine.canvas.onmousedown = (function (e) {
		/** @type {MouseEvent} */
		var me;
		me = (function (o) { return o instanceof MouseEvent ? o : null; })(e);
		dragging = true;
		old_x = me.clientX - engine.canvas.offsetLeft;
		old_y = me.clientY - engine.canvas.offsetTop;
	});
	engine.canvas.onmouseup = (function (e) {
		dragging = false;
	});
	engine.canvas.onmousemove = (function (e) {
		/** @type {MouseEvent} */
		var me;
		/** @type {!number} */
		var mouse_x;
		/** @type {!number} */
		var mouse_y;
		me = (function (o) { return o instanceof MouseEvent ? o : null; })(e);
		if (dragging) {
			mouse_x = me.clientX - engine.canvas.offsetLeft;
			mouse_y = me.clientY - engine.canvas.offsetTop;
			model.rotateY$N(- (mouse_x - old_x) / 100);
			engine.update$();
			old_x = mouse_x;
			old_y = mouse_y;
		}
	});
	dom.window.document.onkeypress = (function (e) {
		/** @type {KeyboardEvent} */
		var ke;
		ke = (function (o) { return o instanceof KeyboardEvent ? o : null; })(e);
		switch (ke.keyCode) {
		case 119:
			engine.camera.move$LVector$(new Vector$NNN(0, 0, 10));
			engine.updateMatrix$();
			break;
		case 115:
			engine.camera.move$LVector$(new Vector$NNN(0, 0, - 10));
			engine.updateMatrix$();
			break;
		case 97:
			engine.camera.rotateY$N(- Math.PI / 32);
			engine.updateMatrix$();
			break;
		case 100:
			engine.camera.rotateY$N(Math.PI / 32);
			engine.updateMatrix$();
			break;
		case 106:
			break;
		case 107:
			break;
		}
		engine.update$();
	});
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
	this.m11 = 1;
	this.m12 = 0;
	this.m13 = 0;
	this.m14 = 0;
	this.m21 = 0;
	this.m22 = 1;
	this.m23 = 0;
	this.m24 = 0;
	this.m31 = 0;
	this.m32 = 0;
	this.m33 = 1;
	this.m34 = 0;
	this.m41 = 0;
	this.m42 = 0;
	this.m43 = 0;
	this.m44 = 1;
};

Matrix$.prototype = new Matrix;

/**
 * @constructor
 * @param {Array.<undefined|!number>} m
 */
function Matrix$AN(m) {
	this.m11 = (function (v) {
		if (! (v != null)) {
			debugger;
			throw new Error("[jsx/matrix.jsx:42] null access");
		}
		return v;
	}(m[0]));
	this.m12 = (function (v) {
		if (! (v != null)) {
			debugger;
			throw new Error("[jsx/matrix.jsx:43] null access");
		}
		return v;
	}(m[1]));
	this.m13 = (function (v) {
		if (! (v != null)) {
			debugger;
			throw new Error("[jsx/matrix.jsx:44] null access");
		}
		return v;
	}(m[2]));
	this.m14 = (function (v) {
		if (! (v != null)) {
			debugger;
			throw new Error("[jsx/matrix.jsx:45] null access");
		}
		return v;
	}(m[3]));
	this.m21 = (function (v) {
		if (! (v != null)) {
			debugger;
			throw new Error("[jsx/matrix.jsx:46] null access");
		}
		return v;
	}(m[4]));
	this.m22 = (function (v) {
		if (! (v != null)) {
			debugger;
			throw new Error("[jsx/matrix.jsx:47] null access");
		}
		return v;
	}(m[5]));
	this.m23 = (function (v) {
		if (! (v != null)) {
			debugger;
			throw new Error("[jsx/matrix.jsx:48] null access");
		}
		return v;
	}(m[6]));
	this.m24 = (function (v) {
		if (! (v != null)) {
			debugger;
			throw new Error("[jsx/matrix.jsx:49] null access");
		}
		return v;
	}(m[7]));
	this.m31 = (function (v) {
		if (! (v != null)) {
			debugger;
			throw new Error("[jsx/matrix.jsx:50] null access");
		}
		return v;
	}(m[8]));
	this.m32 = (function (v) {
		if (! (v != null)) {
			debugger;
			throw new Error("[jsx/matrix.jsx:51] null access");
		}
		return v;
	}(m[9]));
	this.m33 = (function (v) {
		if (! (v != null)) {
			debugger;
			throw new Error("[jsx/matrix.jsx:52] null access");
		}
		return v;
	}(m[10]));
	this.m34 = (function (v) {
		if (! (v != null)) {
			debugger;
			throw new Error("[jsx/matrix.jsx:53] null access");
		}
		return v;
	}(m[11]));
	this.m41 = (function (v) {
		if (! (v != null)) {
			debugger;
			throw new Error("[jsx/matrix.jsx:54] null access");
		}
		return v;
	}(m[12]));
	this.m42 = (function (v) {
		if (! (v != null)) {
			debugger;
			throw new Error("[jsx/matrix.jsx:55] null access");
		}
		return v;
	}(m[13]));
	this.m43 = (function (v) {
		if (! (v != null)) {
			debugger;
			throw new Error("[jsx/matrix.jsx:56] null access");
		}
		return v;
	}(m[14]));
	this.m44 = (function (v) {
		if (! (v != null)) {
			debugger;
			throw new Error("[jsx/matrix.jsx:57] null access");
		}
		return v;
	}(m[15]));
};

Matrix$AN.prototype = new Matrix;

/**
 * @return {Matrix}
 */
Matrix.prototype.copy$ = function () {
	return new Matrix$AN([ this.m11, this.m12, this.m13, this.m14, this.m21, this.m22, this.m23, this.m24, this.m31, this.m32, this.m33, this.m34, this.m41, this.m42, this.m43, this.m44 ]);
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
	x = this.m11 * other.x + this.m12 * other.y + this.m13 * other.z + this.m14 * other.w;
	y = this.m21 * other.x + this.m22 * other.y + this.m23 * other.z + this.m24 * other.w;
	z = this.m31 * other.x + this.m32 * other.y + this.m33 * other.z + this.m34 * other.w;
	w = this.m41 * other.x + this.m42 * other.y + this.m43 * other.z + this.m44 * other.w;
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
	m11 = this.m11 * other.m11 + this.m12 * other.m21 + this.m13 * other.m31 + this.m14 * other.m41;
	m12 = this.m11 * other.m12 + this.m12 * other.m22 + this.m13 * other.m32 + this.m14 * other.m42;
	m13 = this.m11 * other.m13 + this.m12 * other.m23 + this.m13 * other.m33 + this.m14 * other.m43;
	m14 = this.m11 * other.m14 + this.m12 * other.m24 + this.m13 * other.m34 + this.m14 * other.m44;
	m21 = this.m21 * other.m11 + this.m22 * other.m21 + this.m23 * other.m31 + this.m24 * other.m41;
	m22 = this.m21 * other.m12 + this.m22 * other.m22 + this.m23 * other.m32 + this.m24 * other.m42;
	m23 = this.m21 * other.m13 + this.m22 * other.m23 + this.m23 * other.m33 + this.m24 * other.m43;
	m24 = this.m21 * other.m14 + this.m22 * other.m24 + this.m23 * other.m34 + this.m24 * other.m44;
	m31 = this.m31 * other.m11 + this.m32 * other.m21 + this.m33 * other.m31 + this.m34 * other.m41;
	m32 = this.m31 * other.m12 + this.m32 * other.m22 + this.m33 * other.m32 + this.m34 * other.m42;
	m33 = this.m31 * other.m13 + this.m32 * other.m23 + this.m33 * other.m33 + this.m34 * other.m43;
	m34 = this.m31 * other.m14 + this.m32 * other.m24 + this.m33 * other.m34 + this.m34 * other.m44;
	m41 = this.m41 * other.m11 + this.m42 * other.m21 + this.m43 * other.m31 + this.m44 * other.m41;
	m42 = this.m41 * other.m12 + this.m42 * other.m22 + this.m43 * other.m32 + this.m44 * other.m42;
	m43 = this.m41 * other.m13 + this.m42 * other.m23 + this.m43 * other.m33 + this.m44 * other.m43;
	m44 = this.m41 * other.m14 + this.m42 * other.m24 + this.m43 * other.m34 + this.m44 * other.m44;
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
	m11 = this.m11;
	m12 = this.m12;
	m13 = this.m13;
	m14 = this.m14;
	m21 = this.m21;
	m22 = this.m22;
	m23 = this.m23;
	m24 = this.m24;
	m31 = this.m31;
	m32 = this.m32;
	m33 = this.m33;
	m34 = this.m34;
	m41 = this.m41;
	m42 = this.m42;
	m43 = this.m43;
	m44 = this.m44;
	this.m11 = m11 * other.m11 + m12 * other.m21 + m13 * other.m31 + m14 * other.m41;
	this.m12 = m11 * other.m12 + m12 * other.m22 + m13 * other.m32 + m14 * other.m42;
	this.m13 = m11 * other.m13 + m12 * other.m23 + m13 * other.m33 + m14 * other.m43;
	this.m14 = m11 * other.m14 + m12 * other.m24 + m13 * other.m34 + m14 * other.m44;
	this.m21 = m21 * other.m11 + m22 * other.m21 + m23 * other.m31 + m24 * other.m41;
	this.m22 = m21 * other.m12 + m22 * other.m22 + m23 * other.m32 + m24 * other.m42;
	this.m23 = m21 * other.m13 + m22 * other.m23 + m23 * other.m33 + m24 * other.m43;
	this.m24 = m21 * other.m14 + m22 * other.m24 + m23 * other.m34 + m24 * other.m44;
	this.m31 = m31 * other.m11 + m32 * other.m21 + m33 * other.m31 + m34 * other.m41;
	this.m32 = m31 * other.m12 + m32 * other.m22 + m33 * other.m32 + m34 * other.m42;
	this.m33 = m31 * other.m13 + m32 * other.m23 + m33 * other.m33 + m34 * other.m43;
	this.m34 = m31 * other.m14 + m32 * other.m24 + m33 * other.m34 + m34 * other.m44;
	this.m41 = m41 * other.m11 + m42 * other.m21 + m43 * other.m31 + m44 * other.m41;
	this.m42 = m41 * other.m12 + m42 * other.m22 + m43 * other.m32 + m44 * other.m42;
	this.m43 = m41 * other.m13 + m42 * other.m23 + m43 * other.m33 + m44 * other.m43;
	this.m44 = m41 * other.m14 + m42 * other.m24 + m43 * other.m34 + m44 * other.m44;
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
	str += '|' + fix(this.m11) + ',' + fix(this.m12) + ',' + fix(this.m13) + ',' + fix(this.m14) + '|\n';
	str += '|' + fix(this.m21) + ',' + fix(this.m22) + ',' + fix(this.m23) + ',' + fix(this.m24) + '|\n';
	str += '|' + fix(this.m31) + ',' + fix(this.m32) + ',' + fix(this.m33) + ',' + fix(this.m34) + '|\n';
	str += '|' + fix(this.m41) + ',' + fix(this.m42) + ',' + fix(this.m43) + ',' + fix(this.m44) + '|\n';
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
	mat = [ this.m11, this.m12, this.m13, this.m14, this.m21, this.m22, this.m23, this.m24, this.m31, this.m32, this.m33, this.m34, this.m41, this.m42, this.m43, this.m44 ];
	inv = [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ];
	for (i = 0; i < 4 - 1; i++) {
		e = mat[i * 4 + i];
		for (j = 0; j < 4; j++) {
			mat[i * 4 + j] = (function (v) {
				if (! (v != null)) {
					debugger;
					throw new Error("[jsx/matrix.jsx:240] null access");
				}
				return v;
			}(mat[i * 4 + j])) / (function (v) {
				if (! (v != null)) {
					debugger;
					throw new Error("[jsx/matrix.jsx:240] null access");
				}
				return v;
			}(e));
			inv[i * 4 + j] = (function (v) {
				if (! (v != null)) {
					debugger;
					throw new Error("[jsx/matrix.jsx:241] null access");
				}
				return v;
			}(inv[i * 4 + j])) / (function (v) {
				if (! (v != null)) {
					debugger;
					throw new Error("[jsx/matrix.jsx:241] null access");
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
						throw new Error("[jsx/matrix.jsx:246] null access");
					}
					return v;
				}(mat[i * 4 + k])) * (function (v) {
					if (! (v != null)) {
						debugger;
						throw new Error("[jsx/matrix.jsx:246] null access");
					}
					return v;
				}(s));
				inv[j * 4 + k] -= (function (v) {
					if (! (v != null)) {
						debugger;
						throw new Error("[jsx/matrix.jsx:247] null access");
					}
					return v;
				}(inv[i * 4 + k])) * (function (v) {
					if (! (v != null)) {
						debugger;
						throw new Error("[jsx/matrix.jsx:247] null access");
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
						throw new Error("[jsx/matrix.jsx:257] null access");
					}
					return v;
				}(mat[i * 4 + k])) * (function (v) {
					if (! (v != null)) {
						debugger;
						throw new Error("[jsx/matrix.jsx:257] null access");
					}
					return v;
				}(t));
				inv[j * 4 + k] -= (function (v) {
					if (! (v != null)) {
						debugger;
						throw new Error("[jsx/matrix.jsx:258] null access");
					}
					return v;
				}(inv[i * 4 + k])) * (function (v) {
					if (! (v != null)) {
						debugger;
						throw new Error("[jsx/matrix.jsx:258] null access");
					}
					return v;
				}(t));
			}
		}
	}
	return new Matrix$AN(inv);
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
			throw new Error("[/usr/local/jsx/lib/js/js/web.jsx:30] detected invalid cast, value is not an instance of the designated type or null");
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
			throw new Error("[/usr/local/jsx/lib/js/timer.jsx:27] detected invalid cast, value is not a function or null");
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
			throw new Error("[/usr/local/jsx/lib/js/timer.jsx:31] detected invalid cast, value is not a function or null");
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
			throw new Error("[/usr/local/jsx/lib/js/timer.jsx:35] detected invalid cast, value is not a function or null");
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
			throw new Error("[/usr/local/jsx/lib/js/timer.jsx:39] detected invalid cast, value is not a function or null");
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
						throw new Error("[/usr/local/jsx/lib/js/timer.jsx:65] detected invalid cast, value is not a function or null");
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
							throw new Error("[/usr/local/jsx/lib/js/timer.jsx:71] detected invalid cast, value is not a function or null");
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
								throw new Error("[/usr/local/jsx/lib/js/timer.jsx:77] detected invalid cast, value is not a function or null");
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
									throw new Error("[/usr/local/jsx/lib/js/timer.jsx:83] detected invalid cast, value is not a function or null");
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
										throw new Error("[/usr/local/jsx/lib/js/timer.jsx:89] detected invalid cast, value is not a function or null");
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
						throw new Error("[/usr/local/jsx/lib/js/timer.jsx:112] detected invalid cast, value is not a function or null");
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
							throw new Error("[/usr/local/jsx/lib/js/timer.jsx:118] detected invalid cast, value is not a function or null");
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
								throw new Error("[/usr/local/jsx/lib/js/timer.jsx:124] detected invalid cast, value is not a function or null");
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
									throw new Error("[/usr/local/jsx/lib/js/timer.jsx:130] detected invalid cast, value is not a function or null");
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
										throw new Error("[/usr/local/jsx/lib/js/timer.jsx:136] detected invalid cast, value is not a function or null");
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
			throw new Error("[/usr/local/jsx/lib/js/js/web.jsx:16] detected invalid cast, value is not an instance of the designated type or null");
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
	"jsx/engine.jsx": {
		Math2D: Math2D,
		Math2D$: Math2D$,
		Stopwatch: Stopwatch,
		Stopwatch$: Stopwatch$,
		FpsManager: FpsManager,
		FpsManager$: FpsManager$,
		FpsManager$S: FpsManager$S,
		Engine: Engine,
		Engine$S: Engine$S,
		Camera: Camera,
		Camera$LVector$LVector$LVector$NNNN: Camera$LVector$LVector$LVector$NNNN,
		Color: Color,
		Color$III: Color$III,
		AbstractModel: AbstractModel,
		AbstractModel$: AbstractModel$,
		Polygon: Polygon,
		Polygon$ALVector$LColor$: Polygon$ALVector$LColor$,
		Model: Model,
		Model$ALPolygon$LVector$: Model$ALPolygon$LVector$,
		SmoothTexture: SmoothTexture,
		SmoothTexture$ALVector$S: SmoothTexture$ALVector$S,
		Billboard: Billboard,
		Billboard$LVector$NNS: Billboard$LVector$NNS,
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
	JSX.runMain("jsx/engine.jsx", [])
}

window.addEventListener("load", $__jsx_onload);
document.addEventListener("DOMContentLoaded", $__jsx_onload);

})();

//@ sourceMappingURL=jsx/engine.jsx.js.mapping
