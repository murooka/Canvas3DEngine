describe("Identity matrix", function () {
    var matrix;

    beforeEach(function () {
        matrix = new Matrix();
    });

    describe("value at 2 row and 2 column", function () {

        beforeEach(function () {
            
        });

        it("should be 1", function () {
            expect(matrix.getAt(1,1)).toEqualToNumber(1);
        });

        it("should be able to update for 2", function () {
            matrix.setAt(1,1,2);
            expect(matrix.getAt(1,1)).toEqualToNumber(2);
        });

    });

    describe("when multiplied by Vector(3,4,5)", function () {
        var vector;
        var newmat;

        beforeEach(function () {
            vector = new Vector(3,4,5);
            newmat = matrix.mul(vector);
        });

        it("should become (3,4,5)", function () {
            expect(newmat).toEqualToVector(new Vector(3,4,5));
        });

    });

    describe("when multiplied by Matrix((1,2,3,4),(5,6,7,8),(9,10,11,12),(13,14,15,16))", function () {
        var other;

        beforeEach(function () {
            other = new Matrix([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]);
        });

        it("should become Matrix((1,2,3,4),(5,6,7,8),(9,10,11,12),(13,14,15,16))", function () {
            expect(matrix.compose(other)).toEqualToMatrix(other);
        });

    });

    describe("its inverse matrix", function () {

        beforeEach(function () {
            
        });

        it("should be equal to Identity Matrix", function () {
            expect(matrix.inverse()).toEqualToMatrix(matrix);
        });

    });

});

describe("Matrix((1,2,3,4),(5,6,7,8),(9,10,11,12),(13,14,15,16))", function () {
    var matrix;

    beforeEach(function () {
        matrix = new Matrix([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]);
    });

    describe("when multiplied by Matrix((1,2,3,4),(5,6,7,8),(9,10,11,12),(13,14,15,16))", function () {

        it("should be equals to Matrix((90,100,110,120),(202,228,254,280),(314,356,398,440),(426,484,542,600))", function () {
            expect(matrix.compose(matrix)).toEqualToMatrix(new Matrix([90,100,110,120,202,228,254,280,314,356,398,440,426,484,542,600]));
        });

    });

});
