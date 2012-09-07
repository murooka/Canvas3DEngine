import "./vector.jsx";

class Matrix {

    var m : number[];
    
    function constructor() {
        this.m = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
    }

    function constructor(m:number[]) {
        this.m = [
            m[ 0], m[ 1], m[ 2], m[ 3],
            m[ 4], m[ 5], m[ 6], m[ 7],
            m[ 8], m[ 9], m[10], m[11],
            m[12], m[13], m[14], m[15]
        ];
    }

    function copy() : Matrix {
        return new Matrix(this.m);
    }

    static function translating(v:Vector) : Matrix {
        return Matrix.translating(v.x(), v.y(), v.z());
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

    function setAt(row:int, col:int, v:number) : void {
        this.m[row*4 + col] = v;
    }

    function getAt(row:int, col:int) : number {
        return this.m[row*4 + col];
    }

    function mul(other:Vector) : Vector {
        var v = [ 0, 0, 0, 0];
        for (var i=0; i<4; i++) {
            for (var j=0; j<4; j++) {
                v[i] += this.getAt(i, j) * other.v[j];
            }
        }
        return new Vector(v[0], v[1], v[2], v[3]);
    }

    function compose(other:Matrix) : Matrix {
        var mat = new Matrix;
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
    }

    override function toString() : string {
        var str = '';
        for (var i=0; i<4; i++) {
            var array = [] : string[];
            for (var j=0; j<4; j++) {
                var v = this.getAt(i, j).toFixed(1);
                var size = 8 - v.length;
                for (var k=0; k<size; k++) v = ' ' + v;
                array.push(v);
            }
            str += '|' + array.join(',') + '|\n';
        }
        return str;
    }

    function invert() : Matrix {
        var i, j, k;
        var matrix = this.copy();
        var inverse = new Matrix;

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
    }

}

