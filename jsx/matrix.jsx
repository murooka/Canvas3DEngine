import "./vector.jsx";

class Matrix {

    var m11 : number;
    var m12 : number;
    var m13 : number;
    var m14 : number;
    var m21 : number;
    var m22 : number;
    var m23 : number;
    var m24 : number;
    var m31 : number;
    var m32 : number;
    var m33 : number;
    var m34 : number;
    var m41 : number;
    var m42 : number;
    var m43 : number;
    var m44 : number;
    
    function constructor() {
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
    }

    function constructor(m:number[]) {
        this.m11 = m[0];
        this.m12 = m[1];
        this.m13 = m[2];
        this.m14 = m[3];
        this.m21 = m[4];
        this.m22 = m[5];
        this.m23 = m[6];
        this.m24 = m[7];
        this.m31 = m[8];
        this.m32 = m[9];
        this.m33 = m[10];
        this.m34 = m[11];
        this.m41 = m[12];
        this.m42 = m[13];
        this.m43 = m[14];
        this.m44 = m[15];
    }

    function copy() : Matrix {
        return new Matrix([
            this.m11, this.m12, this.m13, this.m14,
            this.m21, this.m22, this.m23, this.m24,
            this.m31, this.m32, this.m33, this.m34,
            this.m41, this.m42, this.m43, this.m44
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
    //     this.m[row*4 + col] = v;
    // }

    // function getAt(row:int, col:int) : number {
    //     return this.m[row*4 + col];
    // }

    function mul(other:Vector) : Vector {
        var x = this.m11 * other.x + this.m12 * other.y + this.m13 * other.z + this.m14 * other.w;
        var y = this.m21 * other.x + this.m22 * other.y + this.m23 * other.z + this.m24 * other.w;
        var z = this.m31 * other.x + this.m32 * other.y + this.m33 * other.z + this.m34 * other.w;
        var w = this.m41 * other.x + this.m42 * other.y + this.m43 * other.z + this.m44 * other.w;

        return new Vector(x, y, z, w);
    }

    function compose(other:Matrix) : Matrix {
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
    }

    function composeSelf(other:Matrix) : Matrix {
        var m11 = this.m11;
        var m12 = this.m12;
        var m13 = this.m13;
        var m14 = this.m14;
        var m21 = this.m21;
        var m22 = this.m22;
        var m23 = this.m23;
        var m24 = this.m24;
        var m31 = this.m31;
        var m32 = this.m32;
        var m33 = this.m33;
        var m34 = this.m34;
        var m41 = this.m41;
        var m42 = this.m42;
        var m43 = this.m43;
        var m44 = this.m44;

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
    }

    override function toString() : string {
        var fix = (val:number) : string -> {
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
    }

    function invert() : Matrix {
        var i, j, k;
        var mat = [
            this.m11, this.m12, this.m13, this.m14,
            this.m21, this.m22, this.m23, this.m24,
            this.m31, this.m32, this.m33, this.m34,
            this.m41, this.m42, this.m43, this.m44
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

