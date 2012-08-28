beforeEach(function() {
  this.addMatchers({
    toBePlaying: function(expectedSong) {
      var player = this.actual;
      return player.currentlyPlayingSong === expectedSong && 
             player.isPlaying;
    }
  });
});

var eq = function (number1, number2) {
    return Math.abs(number1-number2) < 1e-9;
};

beforeEach(function () {
    this.addMatchers({
        toEqualToNumber: function (other) {
            return eq(this.actual, other);
        },
        toEqualToVector: function (other) {
            var vector = this.actual;
            return eq(vector.x, other.x) &&
                   eq(vector.y, other.y) &&
                   eq(vector.z, other.z);
        },
        toEqualToMatrix: function (other) {
            var matrix = this.actual;
            for (var i=0; i<4; i++) {
                for (var j=0; j<4; j++) {
                    if (eq(matrix.getAt(i, j), other.getAt(i, j))) {
                        // nothing to do
                    } else {
                        return false;
                    }
                }
            }
            return true;
        },
    });
});
