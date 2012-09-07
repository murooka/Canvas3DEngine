/*
 * 3次元ベクトルのための変換行列
 * コンストラクタでは単位行列(何も変換を行わない行列)を生成する
 */
var Matrix = function () {
    if (arguments.length===0) {
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
    } else {
        var array = arguments[0];
        this.m11 = array[0];
        this.m12 = array[1];
        this.m13 = array[2];
        this.m14 = array[3];
        this.m21 = array[4];
        this.m22 = array[5];
        this.m23 = array[6];
        this.m24 = array[7];
        this.m31 = array[8];
        this.m32 = array[9];
        this.m33 = array[10];
        this.m34 = array[11];
        this.m41 = array[12];
        this.m42 = array[13];
        this.m43 = array[14];
        this.m44 = array[15];
    }
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

    return new Matrix([
        1, 0, 0, x,
        0, 1, 0, y,
        0, 0, 1, z,
        0, 0, 0, 1
    ]);
};

Matrix.rotatingX = function (rad) {
    var sin = Math.sin(rad);
    var cos = Math.cos(rad);
    return new Matrix([
        1,   0,   0, 0,
        0, cos,-sin, 0,
        0, sin, cos, 0,
        0,   0,   0, 1
    ]);
};

Matrix.rotatingY = function (rad) {
    var sin = Math.sin(rad);
    var cos = Math.cos(rad);
    return new Matrix([
         cos, 0, sin, 0,
           0, 1,   0, 0,
        -sin, 0, cos, 0,
           0, 0,   0, 1
    ]);
};

Matrix.rotatingZ = function (rad) {
    var sin = Math.sin(rad);
    var cos = Math.cos(rad);
    return new Matrix([
        cos,-sin, 0, 0,
        sin, cos, 0, 0,
          0,   0, 1, 0,
          0,   0, 0, 1
    ]);
};

Matrix.scaling = function (x, y, z) {
    return new Matrix([
        x, 0, 0, 0,
        0, y, 0, 0,
        0, 0, z, 0,
        0, 0, 0, 1
    ]);
};

Matrix.prototype.copy = function () {
    return new Matrix([
        this.m11, this.m12, this.m13, this.m14,
        this.m21, this.m22, this.m23, this.m24,
        this.m31, this.m32, this.m33, this.m34,
        this.m41, this.m42, this.m43, this.m44,
    ]);
};

Matrix.prototype.set = function (array) {
    this.m11 = array[0];
    this.m12 = array[1];
    this.m13 = array[2];
    this.m14 = array[3];
    this.m21 = array[4];
    this.m22 = array[5];
    this.m23 = array[6];
    this.m24 = array[7];
    this.m31 = array[8];
    this.m32 = array[9];
    this.m33 = array[10];
    this.m34 = array[11];
    this.m41 = array[12];
    this.m42 = array[13];
    this.m43 = array[14];
    this.m44 = array[15];
    return this;
};

Matrix.prototype.setAt = function (row, col, v) {
    if      (row===0 && col===0) this.m11 = v;
    else if (row===0 && col===1) this.m12 = v;
    else if (row===0 && col===2) this.m13 = v;
    else if (row===0 && col===3) this.m14 = v;
    else if (row===1 && col===0) this.m21 = v;
    else if (row===1 && col===1) this.m22 = v;
    else if (row===1 && col===2) this.m23 = v;
    else if (row===1 && col===3) this.m24 = v;
    else if (row===2 && col===0) this.m31 = v;
    else if (row===2 && col===1) this.m32 = v;
    else if (row===2 && col===2) this.m33 = v;
    else if (row===2 && col===3) this.m34 = v;
    else if (row===3 && col===0) this.m41 = v;
    else if (row===3 && col===1) this.m42 = v;
    else if (row===3 && col===2) this.m43 = v;
    else if (row===3 && col===3) this.m44 = v;
};

Matrix.prototype.getAt = function (row, col) {
    if      (row===0 && col===0) return this.m11;
    else if (row===0 && col===1) return this.m12;
    else if (row===0 && col===2) return this.m13;
    else if (row===0 && col===3) return this.m14;
    else if (row===1 && col===0) return this.m21;
    else if (row===1 && col===1) return this.m22;
    else if (row===1 && col===2) return this.m23;
    else if (row===1 && col===3) return this.m24;
    else if (row===2 && col===0) return this.m31;
    else if (row===2 && col===1) return this.m32;
    else if (row===2 && col===2) return this.m33;
    else if (row===2 && col===3) return this.m34;
    else if (row===3 && col===0) return this.m41;
    else if (row===3 && col===1) return this.m42;
    else if (row===3 && col===2) return this.m43;
    else if (row===3 && col===3) return this.m44;
};

Matrix.prototype.mul = function (other) {
    var x = this.m11 * other.x + this.m12 * other.y + this.m13 * other.z + this.m14 * other.w;
    var y = this.m21 * other.x + this.m22 * other.y + this.m23 * other.z + this.m24 * other.w;
    var z = this.m31 * other.x + this.m32 * other.y + this.m33 * other.z + this.m34 * other.w;
    var w = this.m41 * other.x + this.m42 * other.y + this.m43 * other.z + this.m44 * other.w;

    return new Vector(x, y, z, w);
};

Matrix.prototype.compose = function (other) {
    var m11 = this.m11 * other.m11 + this.m12 * other.m21 + this.m13 * other.m31 + this.m14 * other.m41;
    var m12 = this.m11 * other.m12 + this.m12 * other.m22 + this.m13 * other.m32 + this.m14 * other.m42;
    var m13 = this.m11 * other.m13 + this.m12 * other.m23 + this.m13 * other.m33 + this.m14 * other.m43;
    var m14 = this.m11 * other.m14 + this.m12 * other.m24 + this.m13 * other.m34 + this.m14 * other.m44;

    var m21 = this.m21 * other.m11 + this.m22 * other.m21 + this.m23 * other.m31 + this.m24 * other.m41;
    var m22 = this.m21 * other.m12 + this.m22 * other.m22 + this.m23 * other.m32 + this.m24 * other.m42;
    var m23 = this.m21 * other.m13 + this.m22 * other.m23 + this.m23 * other.m33 + this.m24 * other.m43;
    var m24 = this.m21 * other.m14 + this.m22 * other.m24 + this.m23 * other.m34 + this.m24 * other.m44;

    var m31 = this.m31 * other.m11 + this.m32 * other.m21 + this.m33 * other.m31 + this.m34 * other.m41;
    var m32 = this.m31 * other.m12 + this.m32 * other.m22 + this.m33 * other.m32 + this.m34 * other.m42;
    var m33 = this.m31 * other.m13 + this.m32 * other.m23 + this.m33 * other.m33 + this.m34 * other.m43;
    var m34 = this.m31 * other.m14 + this.m32 * other.m24 + this.m33 * other.m34 + this.m34 * other.m44;

    var m41 = this.m41 * other.m11 + this.m42 * other.m21 + this.m43 * other.m31 + this.m44 * other.m41;
    var m42 = this.m41 * other.m12 + this.m42 * other.m22 + this.m43 * other.m32 + this.m44 * other.m42;
    var m43 = this.m41 * other.m13 + this.m42 * other.m23 + this.m43 * other.m33 + this.m44 * other.m43;
    var m44 = this.m41 * other.m14 + this.m42 * other.m24 + this.m43 * other.m34 + this.m44 * other.m44;

    return new Matrix([
        m11, m12, m13, m14,
        m21, m22, m23, m24,
        m31, m32, m33, m34,
        m41, m42, m43, m44
    ]);
};
Matrix.prototype.toString = function () {
    var fix = function (val) {
        var str = val.toFixed(1);
        var len = str.length;
        for (var i=0; i<8-len; i++) str = ' ' + str;
        return str;
    };
    var str = '';
    str += '|' + fix(this.m11) + ',' + fix(this.m12) + ',' + fix(this.m13) + ',' + fix(this.m14) + '|\n';
    str += '|' + fix(this.m21) + ',' + fix(this.m22) + ',' + fix(this.m23) + ',' + fix(this.m24) + '|\n';
    str += '|' + fix(this.m31) + ',' + fix(this.m32) + ',' + fix(this.m33) + ',' + fix(this.m34) + '|\n';
    str += '|' + fix(this.m41) + ',' + fix(this.m42) + ',' + fix(this.m43) + ',' + fix(this.m44) + '|\n';
    return str;
};

// ガウスの消去法
Matrix.prototype.invert = function () {
    var i, j, k;

    var mat = [
        this.m11, this.m12, this.m13, this.m14,
        this.m21, this.m22, this.m23, this.m24,
        this.m31, this.m32, this.m33, this.m34,
        this.m41, this.m42, this.m43, this.m44,
    ];
    var inv = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

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

    return new Matrix(inv);
};

