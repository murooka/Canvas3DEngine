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
	this._v = [ x, y, z, 1 ];
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
	this._v = [ x / w, y / w, z / w, 1 ];
};

Vector$NNNN.prototype = new Vector;

/**
 * @constructor
 * @param {Vector} v
 */
function Vector$LVector$(v) {
	/** @type {Array.<undefined|!number>} */
	var _v$0;
	this._v = [ (_v$0 = v._v)[0], _v$0[1], _v$0[2], 1 ];
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
 * @return {!number}
 */
Vector.prototype.x$ = function () {
	return this._v[0];
};

/**
 * @return {!number}
 */
Vector.prototype.y$ = function () {
	return this._v[1];
};

/**
 * @return {!number}
 */
Vector.prototype.z$ = function () {
	return this._v[2];
};

/**
 * @return {!number}
 */
Vector.prototype.w$ = function () {
	return this._v[3];
};

/**
 * @param {Vector} other
 * @return {Vector}
 */
Vector.prototype.add$LVector$ = function (other) {
	/** @type {Array.<undefined|!number>} */
	var _v$0;
	/** @type {Array.<undefined|!number>} */
	var _v$1;
	return new Vector$NNN((_v$0 = this._v)[0] + (_v$1 = other._v)[0], _v$0[1] + _v$1[1], _v$0[2] + _v$1[2]);
};

/**
 * @param {Vector} other
 * @return {Vector}
 */
Vector.prototype.sub$LVector$ = function (other) {
	/** @type {Array.<undefined|!number>} */
	var _v$0;
	/** @type {Array.<undefined|!number>} */
	var _v$1;
	return new Vector$NNN((_v$0 = this._v)[0] - (_v$1 = other._v)[0], _v$0[1] - _v$1[1], _v$0[2] - _v$1[2]);
};

/**
 * @param {!number} other
 * @return {Vector}
 */
Vector.prototype.mul$N = function (other) {
	/** @type {Array.<undefined|!number>} */
	var _v$0;
	return new Vector$NNN((_v$0 = this._v)[0] * other, _v$0[0] * other, _v$0[0] * other);
};

/**
 * @param {!number} other
 * @return {Vector}
 */
Vector.prototype.div$N = function (other) {
	/** @type {Array.<undefined|!number>} */
	var _v$0;
	return new Vector$NNN((_v$0 = this._v)[0] / other, _v$0[0] / other, _v$0[0] / other);
};

/**
 * @param {Vector} other
 * @return {!number}
 */
Vector.prototype.dot$LVector$ = function (other) {
	/** @type {Array.<undefined|!number>} */
	var _v$0;
	/** @type {Array.<undefined|!number>} */
	var _v$1;
	return (_v$0 = this._v)[0] * (_v$1 = other._v)[0] + _v$0[1] * _v$1[1] + _v$0[2] * _v$1[2];
};

/**
 * @param {Vector} other
 * @return {Vector}
 */
Vector.prototype.cross$LVector$ = function (other) {
	/** @type {Array.<undefined|!number>} */
	var _v$0;
	/** @type {Array.<undefined|!number>} */
	var _v$1;
	return new Vector$NNN((_v$0 = this._v)[1] * (_v$1 = other._v)[2] - _v$0[2] * _v$1[1], _v$0[2] * _v$1[0] - _v$0[0] * _v$1[2], _v$0[0] * _v$1[1] - _v$0[1] * _v$1[0]);
};

/**
 * @return {Vector}
 */
Vector.prototype.unit$ = function () {
	/** @type {!number} */
	var other$0;
	/** @type {Array.<undefined|!number>} */
	var _v$0;
	/** @type {Array.<undefined|!number>} */
	var _v$1;
	other$0 = Math.sqrt((_v$0 = this._v)[0] * _v$0[0] + _v$0[1] * _v$0[1] + _v$0[2] * _v$0[2]);
	return new Vector$NNN((_v$1 = this._v)[0] / other$0, _v$1[0] / other$0, _v$1[0] / other$0);
};

/**
 * @return {!number}
 */
Vector.prototype.sqabs$ = function () {
	/** @type {Array.<undefined|!number>} */
	var _v$0;
	return (_v$0 = this._v)[0] * _v$0[0] + _v$0[1] * _v$0[1] + _v$0[2] * _v$0[2];
};

/**
 * @return {!number}
 */
Vector.prototype.abs$ = function () {
	/** @type {Array.<undefined|!number>} */
	var _v$0;
	return Math.sqrt((_v$0 = this._v)[0] * _v$0[0] + _v$0[1] * _v$0[1] + _v$0[2] * _v$0[2]);
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
	/** @type {Array.<undefined|!number>} */
	var _v$0;
	sin = Math.sin(rad);
	cos = Math.cos(rad);
	return new Vector$NNN((_v$0 = this._v)[0], _v$0[1] * cos - _v$0[2] * sin, _v$0[2] * cos + _v$0[1] * sin);
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
	/** @type {Array.<undefined|!number>} */
	var _v$0;
	sin = Math.sin(rad);
	cos = Math.cos(rad);
	return new Vector$NNN((_v$0 = this._v)[0] * cos + _v$0[2] * sin, _v$0[1], _v$0[2] * cos - _v$0[0] * sin);
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
	/** @type {Array.<undefined|!number>} */
	var _v$0;
	sin = Math.sin(rad);
	cos = Math.cos(rad);
	return new Vector$NNN((_v$0 = this._v)[0] * cos - _v$0[1] * sin, _v$0[1] * cos + _v$0[2] * sin, _v$0[2]);
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
	return '(' + fix(this._v[0]) + ',' + fix(this._v[1]) + ',' + fix(this._v[2]) + ',' + fix(this._v[3]) + ')';
};

var $__jsx_classMap = {
	"jsx/vector.jsx": {
		Vector: Vector,
		Vector$NNN: Vector$NNN,
		Vector$NNNN: Vector$NNNN,
		Vector$LVector$: Vector$LVector$
	}
};


})();
