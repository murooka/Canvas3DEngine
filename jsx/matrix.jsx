import "./vector.jsx";

/*
 * 3次元ベクトルのための変換行列
 * 高速化するため、行列の要素は配列でなくプロパティで持つ
 */
class Matrix {

    var _m11 : number;
    var _m12 : number;
    var _m13 : number;
    var _m14 : number;
    var _m21 : number;
    var _m22 : number;
    var _m23 : number;
    var _m24 : number;
    var _m31 : number;
    var _m32 : number;
    var _m33 : number;
    var _m34 : number;
    var _m41 : number;
    var _m42 : number;
    var _m43 : number;
    var _m44 : number;
    
    function constructor() {
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
    }

    function constructor(m:number[]) {
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
    }

    function copy() : Matrix {
        return new Matrix([
            this._m11, this._m12, this._m13, this._m14,
            this._m21, this._m22, this._m23, this._m24,
            this._m31, this._m32, this._m33, this._m34,
            this._m41, this._m42, this._m43, this._m44
        ]);
    }

    static function translating(v:Vector) : Matrix {
        return Matrix.translating(v.x, v.y, v.z);
    }

    static function translating(x:number, y:number, z:number) : Matrix {
        return new Matrix([
            1, 0, 0, x,
            0, 1, 0, y,
            0, 0, 1, z,
            0, 0, 0, 1
        ]);
    }

    static function rotatingX(rad:number) : Matrix {
        var sin = Math.sin(rad);
        var cos = Math.cos(rad);
        return new Matrix([
               1,   0,   0,   0,
               0, cos,-sin,   0,
               0, sin, cos,   0,
               0,   0,   0,   1
        ]);
    }

    static function rotatingY(rad:number) : Matrix {
        var sin = Math.sin(rad);
        var cos = Math.cos(rad);
        return new Matrix([
             cos,   0, sin,   0,
               0,   1,   0,   0,
            -sin,   0, cos,   0,
               0,   0,   0,   1
        ]);
    }

    static function rotatingZ(rad:number) : Matrix {
        var sin = Math.sin(rad);
        var cos = Math.cos(rad);
        return new Matrix([
             cos,-sin,   0,   0,
             sin, cos,   0,   0,
               0,   0,   1,   0,
               0,   0,   0,   1
        ]);
    }

    static function scaling(x:number, y:number, z:number) : Matrix {
        return new Matrix([
            x, 0, 0, 0,
            0, y, 0, 0,
            0, 0, z, 0,
            0, 0, 0, 1
        ]);
    }

    // function setAt(row:int, col:int, v:number) : void {
    //     this._m[row*4 + col] = v;
    // }

    // function getAt(row:int, col:int) : number {
    //     return this._m[row*4 + col];
    // }

    function mul(other:Vector) : Vector {
        var x = this._m11 * other.x + this._m12 * other.y + this._m13 * other.z + this._m14 * other.w;
        var y = this._m21 * other.x + this._m22 * other.y + this._m23 * other.z + this._m24 * other.w;
        var z = this._m31 * other.x + this._m32 * other.y + this._m33 * other.z + this._m34 * other.w;
        var w = this._m41 * other.x + this._m42 * other.y + this._m43 * other.z + this._m44 * other.w;

        return new Vector(x, y, z, w);
    }

    function compose(other:Matrix) : Matrix {
        var m11 = this._m11 * other._m11 + this._m12 * other._m21 + this._m13 * other._m31 + this._m14 * other._m41;
        var m12 = this._m11 * other._m12 + this._m12 * other._m22 + this._m13 * other._m32 + this._m14 * other._m42;
        var m13 = this._m11 * other._m13 + this._m12 * other._m23 + this._m13 * other._m33 + this._m14 * other._m43;
        var m14 = this._m11 * other._m14 + this._m12 * other._m24 + this._m13 * other._m34 + this._m14 * other._m44;

        var m21 = this._m21 * other._m11 + this._m22 * other._m21 + this._m23 * other._m31 + this._m24 * other._m41;
        var m22 = this._m21 * other._m12 + this._m22 * other._m22 + this._m23 * other._m32 + this._m24 * other._m42;
        var m23 = this._m21 * other._m13 + this._m22 * other._m23 + this._m23 * other._m33 + this._m24 * other._m43;
        var m24 = this._m21 * other._m14 + this._m22 * other._m24 + this._m23 * other._m34 + this._m24 * other._m44;

        var m31 = this._m31 * other._m11 + this._m32 * other._m21 + this._m33 * other._m31 + this._m34 * other._m41;
        var m32 = this._m31 * other._m12 + this._m32 * other._m22 + this._m33 * other._m32 + this._m34 * other._m42;
        var m33 = this._m31 * other._m13 + this._m32 * other._m23 + this._m33 * other._m33 + this._m34 * other._m43;
        var m34 = this._m31 * other._m14 + this._m32 * other._m24 + this._m33 * other._m34 + this._m34 * other._m44;

        var m41 = this._m41 * other._m11 + this._m42 * other._m21 + this._m43 * other._m31 + this._m44 * other._m41;
        var m42 = this._m41 * other._m12 + this._m42 * other._m22 + this._m43 * other._m32 + this._m44 * other._m42;
        var m43 = this._m41 * other._m13 + this._m42 * other._m23 + this._m43 * other._m33 + this._m44 * other._m43;
        var m44 = this._m41 * other._m14 + this._m42 * other._m24 + this._m43 * other._m34 + this._m44 * other._m44;

        return new Matrix([
            m11, m12, m13, m14,
            m21, m22, m23, m24,
            m31, m32, m33, m34,
            m41, m42, m43, m44
        ]);
    }

    function composeSelf(other:Matrix) : Matrix {
        var m11 = this._m11;
        var m12 = this._m12;
        var m13 = this._m13;
        var m14 = this._m14;
        var m21 = this._m21;
        var m22 = this._m22;
        var m23 = this._m23;
        var m24 = this._m24;
        var m31 = this._m31;
        var m32 = this._m32;
        var m33 = this._m33;
        var m34 = this._m34;
        var m41 = this._m41;
        var m42 = this._m42;
        var m43 = this._m43;
        var m44 = this._m44;

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
    }

    override function toString() : string {
        var fix = (val:number) : string -> {
            var str = val.toFixed(1);
            var len = str.length;
            for (var i=0; i<8-len; i++) str = ' ' + str;
            return str;
        };
        var str = '';
        str += '|' + fix(this._m11) + ',' + fix(this._m12) + ',' + fix(this._m13) + ',' + fix(this._m14) + '|\n';
        str += '|' + fix(this._m21) + ',' + fix(this._m22) + ',' + fix(this._m23) + ',' + fix(this._m24) + '|\n';
        str += '|' + fix(this._m31) + ',' + fix(this._m32) + ',' + fix(this._m33) + ',' + fix(this._m34) + '|\n';
        str += '|' + fix(this._m41) + ',' + fix(this._m42) + ',' + fix(this._m43) + ',' + fix(this._m44) + '|\n';
        return str;
    }

    /**
     * TODO: ループアンローリングする
     */
    function invert() : Matrix {
        var i, j, k;
        var mat = [
            this._m11, this._m12, this._m13, this._m14,
            this._m21, this._m22, this._m23, this._m24,
            this._m31, this._m32, this._m33, this._m34,
            this._m41, this._m42, this._m43, this._m44
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
    }

}

