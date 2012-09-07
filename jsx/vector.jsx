
class Vector {
    
    var v : number[];

    function constructor(x:number, y:number, z:number) {
        this.v = [x, y, z, 1];
    }

    function constructor(x:number, y:number, z:number, w:number) {
        this.v = [x/w, y/w, z/w, 1];
    }

    function constructor(v:Vector) {
        this.v = [v.x(), v.y(), v.z(), 1];
    }

    static function origin() : Vector {
        return new Vector(0, 0, 0);
    }

    function x() : number { return this.v[0]; }
    function y() : number { return this.v[1]; }
    function z() : number { return this.v[2]; }
    function w() : number { return this.v[3]; }

    function add(other:Vector) : Vector {
        return new Vector(
            this.x() + other.x(),
            this.y() + other.y(),
            this.z() + other.z()
        );
    }

    function sub(other:Vector) : Vector {
        return new Vector(
            this.x() - other.x(),
            this.y() - other.y(),
            this.z() - other.z()
        );
    }

    function mul(other:number) : Vector {
        return new Vector(
            this.x() * other,
            this.x() * other,
            this.x() * other
        );
    }

    function div(other:number) : Vector {
        return new Vector(
            this.x() / other,
            this.x() / other,
            this.x() / other
        );
    }

    function dot(other:Vector) : number {
        return this.x()*other.x() + this.y()*other.y() + this.z()*other.z();
    }

    function cross(other:Vector) : Vector {
        return new Vector(
            this.y()*other.z() - this.z()*other.y(),
            this.z()*other.x() - this.x()*other.z(),
            this.x()*other.y() - this.y()*other.x()
        );
    }

    function unit() : Vector {
        return this.div(this.abs());
    }

    function sqabs() : number {
        return this.x()*this.x() + this.y()*this.y() + this.z()*this.z();
    }

    function abs() : number {
        return Math.sqrt(this.sqabs());
    }

    function rotateX(rad:number) : Vector {
        var sin = Math.sin(rad);
        var cos = Math.cos(rad);
        return new Vector(
            this.x(),
            this.y()*cos - this.z()*sin,
            this.z()*cos + this.y()*sin
        );
    }

    function rotateY(rad:number) : Vector {
        var sin = Math.sin(rad);
        var cos = Math.cos(rad);
        return new Vector(
            this.x()*cos + this.z()*sin,
            this.y(),
            this.z()*cos - this.x()*sin
        );
    }

    function rotateZ(rad:number) : Vector {
        var sin = Math.sin(rad);
        var cos = Math.cos(rad);
        return new Vector(
            this.x()*cos - this.y()*sin,
            this.y()*cos + this.z()*sin,
            this.z()
        );
    }

    override function toString() : string {
        var fix = function (value:number) : string {
            var str = value.toFixed(1);
            var len = str.length;
            for (var i=0; i<8-len; i++) str = ' ' + str;
            return str;
        };

        return '(' +
            fix(this.v[0]) + ',' +
            fix(this.v[1]) + ',' +
            fix(this.v[2]) + ',' +
            fix(this.v[3]) + ')';
    }

}
