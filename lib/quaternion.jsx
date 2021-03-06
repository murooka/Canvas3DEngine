import "./vector.jsx"; 
import "./matrix.jsx";

/**
 * $B2sE>$N$?$a$N;M85?t$r07$&%/%i%9(B
 */
class Quaternion {

    var t : number;
    var x : number;
    var y : number;
    var z : number;

    function constructor(t:number, v:Vector) {
        this.t = t;
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;
    }

    function constructor(v:Vector) {
        this.t = 0;
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;
    }

    function constructor(t:number, x:number, y:number, z:number) {
        this.t = t;
        this.x = x;
        this.y = y;
        this.z = z;
    }

    function copy() : Quaternion {
        return new Quaternion(this.t, this.x, this.y, this.z);
    }

    function mul(other:Quaternion) : Quaternion {
        return this.copy().mulSelf(other);
    }

    function mulSelf(other:Quaternion) : Quaternion {
        var a = this;
        var b = other;

        var t = a.t*b.t - (a.x*b.x + a.y*b.y + a.z*b.z);
        var x = a.t*b.x + b.t*a.x + (a.y*b.z - a.z*b.y);
        var y = a.t*b.y + b.t*a.y + (a.z*b.x - a.x*b.z);
        var z = a.t*b.z + b.t*a.z + (a.x*b.y - a.y*b.x);

        this.t = t;
        this.x = x;
        this.y = y;
        this.z = z;

        return this;
    }

    function toMatrix() : Matrix {
        var x2 = 2 * this.x * this.x;
        var y2 = 2 * this.y * this.y;
        var z2 = 2 * this.z * this.z;
        var xy = 2 * this.x * this.y;
        var zx = 2 * this.x * this.z;
        var yz = 2 * this.y * this.z;
        var xt = 2 * this.x * this.t;
        var yt = 2 * this.y * this.t;
        var zt = 2 * this.z * this.t;

        return new Matrix([
            1-y2-z2,   xy+zt,   zx-yt,     0,
              xy-zt, 1-x2-z2,   yz+xt,     0,
              zx+yt,   yz-xt, 1-x2-y2,     0,
                  0,       0,       0,     1
        ]);
    }

    override function toString() : string {
        var x = this.x.toFixed(3)  as string;
        var y = this.y.toFixed(3)  as string;
        var z = this.z.toFixed(3)  as string;
        var t = this.t.toFixed(3)  as string;
        return t + ' : (' + x + ', ' + y + ', ' + z + ', ' + ')';
    }

    static function rotating(rad:number, x:number, y:number, z:number) : Quaternion {
        var cos = Math.cos(rad/2);
        var sin = Math.sin(rad/2);

        return new Quaternion(cos, x*sin, y*sin, z*sin);
    }

    static function rotating(rad:number, v:Vector) : Quaternion {
        return Quaternion.rotating(rad, v.x, v.y, v.z);
    }

    static function rotate(src:Vector, axis:Vector, rad:number) : Vector {
        var cos = Math.cos(rad/2);
        var sin = Math.sin(rad/2);

        var p = new Quaternion(src);
        var q = new Quaternion(cos, axis.x*sin, axis.y*sin, axis.z*sin);
        var r = new Quaternion(cos,-axis.x*sin,-axis.y*sin,-axis.z*sin);

        var s = r.mulSelf(p).mulSelf(q);

        return new Vector(s.x, s.y, s.z);
    }

}
