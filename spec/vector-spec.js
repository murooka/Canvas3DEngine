describe("1/3", function () {
    var value;

    beforeEach(function () {
        value = 1 / 3;
    });

    it("should equal to 0.1/0.3", function () {
        expect(value).toEqualToNumber(0.1/0.3);
    });

});

describe("Vector(0,0,0)", function () {
    var vector;

    beforeEach(function () {
        vector = new Vector(0, 0, 0);
    });

    it("should equal to Vector(0,0,0)", function () {
        expect(vector).toEqualToVector(new Vector(0, 0, 0));
    });

    it("should equal to origin vector", function () {
        expect(vector).toEqualToVector(Vector.origin());
    });
});

describe("Vector(1,2,3)", function () {
    var vector;

    beforeEach(function () {
        vector = new Vector(1, 2, 3);
    });

    it("should become (3,6,9) when added (2,4,6)", function () {
        expect(vector.add(new Vector(2,4,6))).toEqualToVector(new Vector(3,6,9));
    });

    it("should become (3,-1,0) when subtracted (-2,3,3)", function () {
        expect(vector.sub(new Vector(-2,3,3))).toEqualToVector(new Vector(3, -1, 0));
    });

    it("should become (2.5,5,7.5) when multiplied 2.5", function () {
        expect(vector.mul(2.5)).toEqualToVector(new Vector(2.5, 5, 7.5));
    });

    it("should become (0.5,1,1.5) when divided by 2", function () {
        expect(vector.div(2)).toEqualToVector(new Vector(0.5,1,1.5));
    });

    it("should become 10 when calculating dot product with (3,2,1)", function () {
        expect(vector.dot(new Vector(3,2,1))).toEqualToNumber(10);
    });

    it(" its length should become sqrt(14)", function () {
        expect(vector.abs()).toEqualToNumber(Math.sqrt(14));
    });

});

describe("Vector(1,0,0)", function () {
    var vector;

    beforeEach(function () {
        vector = new Vector(1, 0, 0);
    });

    it("should become (0,0,1) when calclating cross product with (0,1,0)", function () {
        var other = new Vector(0,1,0);
        expect(vector.cross(other)).toEqualToVector(new Vector(0,0,1));
    });

    it("should become (0,-1,0) when calclating cross product with (0,0,1)", function () {
        var other = new Vector(0,0,1);
        expect(vector.cross(other)).toEqualToVector(new Vector(0,-1,0));
    });

    it("should not change when rotated 0.1 by axis X", function () {
        expect(vector.rotateX(0.1)).toEqualToVector(vector);
    });

    it("should become (0,0,-1) when rotated PI/2 by axis Y", function () {
        expect(vector.rotateY(Math.PI/2)).toEqualToVector(new Vector(0,0,-1));
    });

    it("should become (0,1,0) when rotated PI/2 by axis Z", function () {
        expect(vector.rotateZ(Math.PI/2)).toEqualToVector(new Vector(0,1,0));
    });

});

describe("Unit vector of Vector(3,4,5)", function () {
    var vector;

    beforeEach(function () {
        vector = new Vector(3,4,5);
    });

    it("should be (3,4,5)/sqrt(3^2+4^2+5^2)", function () {
        var len = Math.sqrt(
            Math.pow(vector.x, 2) + 
            Math.pow(vector.y, 2) + 
            Math.pow(vector.z, 2)
        );
        expect(vector.unit()).toEqualToVector(vector.div(len));
    });

});
