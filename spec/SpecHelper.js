beforeEach(function() {
  this.addMatchers({
    toBePlaying: function(expectedSong) {
      var player = this.actual;
      return player.currentlyPlayingSong === expectedSong && 
             player.isPlaying;
    }
  });
});

beforeEach(function () {
    this.addMatchers({
        toEqualWithNumber: function (other) {
            var value = this.actual;
            return Math.abs(value-other) < 1e-9;
        },
        toEqualWithMatrix: function (other) {
            var matrix = this.actual;
            for (var i=0; i<4; i++) {
                for (var j=0; j<4; j++) {
                    var diff = Math.abs(matrix.getAt(i, j)-other.getAt(i, j));
                    if (diff >= 1e-9) {
                        return false;
                    }
                }
            }
            return true;
        },
    });
});
