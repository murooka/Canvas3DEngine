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

    it("should become (1,2,3) when added (1,2,3)", function () {
    });
});
