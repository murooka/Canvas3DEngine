var radianWithTwoPoint = function (p1, p2) {
    return Math.atan2(p1.dot(p2), p1.cross(p2));
};


/*
 * 同時座標系での３次元ベクトル
 * 変換行列を利用できるようにするため、常に1のw成分を持たせている
 * @param {Number} x x成分
 * @param {Number} y y成分
 * @param {Number} z z成分
 * @returns {Vector}
 */
var Vector = function (x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = 1;
    this.v = [x, y, z, 1];
};
Vector.origin = function () {
    return new Vector(0, 0, 0);
};

/*
 * ベクトルの加減算
 * @param {Vector} other 
 * @returns {Vector}
 */
Vector.prototype.add = function (other) {
    return new Vector(
        this.x+other.x,
        this.y+other.y,
        this.z+other.z
    );
};
Vector.prototype.sub = function (other) {
    return new Vector(
        this.x-other.x,
        this.y-other.y,
        this.z-other.z
    );
};

/*
 * ベクトルの乗除算
 * @param {Number} other
 * @returns {Vector}
 */
Vector.prototype.mul = function (other) {
    return new Vector(
        this.x/other,
        this.y/other,
        this.z/other
    );
};
Vector.prototype.div = function (other) {
    return new Vector(
        this.x/other,
        this.y/other,
        this.z/other
    );
};

/*
 * ３次元ベクトルの内積
 * @param {Vector} other
 * @returns {Number}
 */
Vector.prototype.dot = function (other) {
    return this.x*other.x + this.y*other.y + this.z*other.z;
};
/*
 * ３次元ベクトルの外積
 * @param {Vector} other
 * @returns {Vector} thisとotherの垂直ベクトル
 */
Vector.prototype.cross = function (other) {
    return new Vector(
        this.y*other.z - this.z*other.y,
        this.z*other.x - this.x*other.z,
        this.x*other.y - this.y*other.x
    );
};
/*
 * 単位ベクトル化する関数
 * @return {Vector} 
 */
Vector.prototype.unit = function () {
    return this.div(this.abs());
};
Vector.prototype.sqabs = function () {
    return this.x*this.x + this.y*this.y + this.z*this.z;
};
/*
 * ベクトルの長さ
 * @returns {Number}
 */
Vector.prototype.abs = function () {
    return Math.sqrt(this.sqabs());
};
/*
 * x軸を基準としてベクトルを回転させる
 * @param {Number} 回転角 単位はラジアン
 */
Vector.prototype.rotateX = function (rad) {
    var sin = Math.sin(rad),
        cos = Math.cos(rad);
    return new Vector(
        this.x,
        this.y*cos - this.z*sin,
        this.z*cos + this.y*sin
    );
};
Vector.prototype.rotateY = function (rad) {
    var sin = Math.sin(rad),
        cos = Math.cos(rad);
    return new Vector(
        this.x*cos + this.z*sin,
        this.y,
        this.z*cos - this.x*sin
    );
};
Vector.prototype.rotateZ = function (rad) {
    var sin = Math.sin(rad),
        cos = Math.cos(rad);
    return new Vector(
        this.x*cos - this.y*sin,
        this.y*cos + this.x*sin,
        this.z
    );
};
Vector.prototype.radian = function (axis) {
    if (axis.x===0 && axis.y===1 && axis.z===0) {
        var orig = new Vector(1, 0, 0);
        var orig2D = orig.to2D(axis);
        var this2D = this.to2D(axis);
        return radianWithTwoPoint(orig2D, this2D);
    }
};
Vector.prototype.toString = function () {
    return '(' + this.x.toFixed(2) + ',' + this.y.toFixed(2) + ',' + this.z.toFixed(2) + ',' + this.w.toFixed(2) + ')';
};
