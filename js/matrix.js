/*
 * 3次元ベクトルのための変換行列
 * コンストラクタでは単位行列(何も変換を行わない行列)を生成する
 */
var Matrix = function () {
    this.m = new Array(16);
    for (var i=0; i<16; i++) this.m[i] = 0;
    this.m[0]  = 1;
    this.m[5]  = 1;
    this.m[10] = 1;
    this.m[15] = 1;
};

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
    for (var i=0; i<16; i++) this.m[i] = ary[i];
    return this;
};

Matrix.prototype.setAt = function (row, col, v) {
    this.m[row*4 + col] = v;
};

Matrix.prototype.getAt = function (row, col) {
    return this.m[row*4 + col];
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
    for (var i=0; i<4; i++) {
        var array = [];
        for (var j=0; j<4; j++) {
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
    var inverse = new Matrix();

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

