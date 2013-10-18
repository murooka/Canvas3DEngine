import "./matrix.jsx";

class Vector {
    
    var x : number;
    var y : number;
    var z : number;
    var w : number;

    function constructor(x:number, y:number, z:number) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = 1;
    }

    function constructor(x:number, y:number, z:number, w:number) {
        this.x = x / w;
        this.y = y / w;
        this.z = z / w;
        this.w = 1;

        if (this.x==NaN) {
            log w;
        }
    }

    function constructor(v:Vector) {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;
        this.w = 1;
    }

    static function origin() : Vector {
        return new Vector(0, 0, 0);
    }

    function add(other:Vector) : Vector {
        return new Vector(
            this.x + other.x,
            this.y + other.y,
            this.z + other.z
        );
    }

    function addSelf(other:Vector) : Vector {
        this.x += other.x;
        this.y += other.y;
        this.z += other.z;
        return this;
    }

    function sub(other:Vector) : Vector {
        return new Vector(
            this.x - other.x,
            this.y - other.y,
            this.z - other.z
        );
    }

    function subSelf(other:Vector) : Vector {
        this.x -= other.x;
        this.y -= other.y;
        this.z -= other.z;
        return this;
    }

    function mul(other:number) : Vector {
        return new Vector(
            this.x * other,
            this.y * other,
            this.z * other
        );
    }

    function mulSelf(other:number) : Vector {
        this.x *= other;
        this.y *= other;
        this.z *= other;
        return this;
    }

    function div(other:number) : Vector {
        return new Vector(
            this.x / other,
            this.y / other,
            this.z / other
        );
    }

    function divSelf(other:number) : Vector {
        this.x /= other;
        this.y /= other;
        this.z /= other;
        return this;
    }

    function dot(other:Vector) : number {
        return this.x*other.x + this.y*other.y + this.z*other.z;
    }

    function cross(other:Vector) : Vector {
        return new Vector(
            this.y*other.z - this.z*other.y,
            this.z*other.x - this.x*other.z,
            this.x*other.y - this.y*other.x
        );
    }

    function crossSelf(other:Vector) : Vector {
        var x = this.y*other.z - this.z*other.y;
        var y = this.z*other.x - this.x*other.z;
        var z = this.x*other.y - this.y*other.x;
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }

    function unit() : Vector {
        var length = this.abs();
        if (length < 1e-9) return new Vector(0, 0, 0);
        return this.div(length);
    }

    function unitSelf() : Vector {
        var length = this.abs();
        if (length < 1e-9) return new Vector(0, 0, 0);
        return this.divSelf(length);
    }

    function sqabs() : number {
        return this.dot(this);
    }

    function abs() : number {
        return Math.sqrt(this.sqabs());
    }

    function rotateX(rad:number) : Vector {
        var sin = Math.sin(rad);
        var cos = Math.cos(rad);
        return new Vector(
            this.x,
            this.y*cos - this.z*sin,
            this.z*cos + this.y*sin
        );
    }

    function rotateXSelf(rad:number) : Vector {
        var sin = Math.sin(rad);
        var cos = Math.cos(rad);
        var y = this.y*cos - this.z*sin;
        var z = this.z*cos + this.y*sin;
        this.y = y;
        this.z = z;
        return this;
    }

    function rotateY(rad:number) : Vector {
        var sin = Math.sin(rad);
        var cos = Math.cos(rad);
        return new Vector(
            this.x*cos + this.z*sin,
            this.y,
            this.z*cos - this.x*sin
        );
    }

    function rotateYSelf(rad:number) : Vector {
        var sin = Math.sin(rad);
        var cos = Math.cos(rad);
        var x = this.x*cos + this.z*sin;
        var z = this.z*cos - this.x*sin;
        this.x = x;
        this.z = z;
        return this;
    }

    function rotateZ(rad:number) : Vector {
        var sin = Math.sin(rad);
        var cos = Math.cos(rad);
        return new Vector(
            this.x*cos - this.y*sin,
            this.y*cos + this.z*sin,
            this.z
        );
    }

    function rotateZSelf(rad:number) : Vector {
        var sin = Math.sin(rad);
        var cos = Math.cos(rad);
        var x = this.x*cos - this.y*sin;
        var y = this.y*cos + this.z*sin;
        this.x = x;
        this.y = y;
        return this;
    }

    function transform(m:Matrix) : Vector {
        var x = m._m11 * this.x + m._m12 * this.y + m._m13 * this.z + m._m14 * this.w;
        var y = m._m21 * this.x + m._m22 * this.y + m._m23 * this.z + m._m24 * this.w;
        var z = m._m31 * this.x + m._m32 * this.y + m._m33 * this.z + m._m34 * this.w;
        var w = m._m41 * this.x + m._m42 * this.y + m._m43 * this.z + m._m44 * this.w;

        return new Vector(x, y, z, w);
    }

    function transformSelf(m:Matrix) : Vector {
        var x = m._m11 * this.x + m._m12 * this.y + m._m13 * this.z + m._m14 * this.w;
        var y = m._m21 * this.x + m._m22 * this.y + m._m23 * this.z + m._m24 * this.w;
        var z = m._m31 * this.x + m._m32 * this.y + m._m33 * this.z + m._m34 * this.w;
        var w = m._m41 * this.x + m._m42 * this.y + m._m43 * this.z + m._m44 * this.w;

        this.x = x / w;
        this.y = y / w;
        this.z = z / w;
        this.w = 1;

        return this;
    }

    override function toString() : string {
        var fix = function (value:number) : string {
            var str = value.toFixed(1);
            var len = str.length;
            for (var i=0; i<8-len; i++) str = ' ' + str;
            return str;
        };

        return '(' +
            fix(this.x) + ',' +
            fix(this.y) + ',' +
            fix(this.z) + ',' +
            fix(this.w) + ')';
    }

}
