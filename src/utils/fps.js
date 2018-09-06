//
var Fps = (function() {

    var fps = 0;
    var allFps = [];

    //
    return {

        /**
         * @param {number} tFrame Time bewtween last and current frame.
         * @return {void} Directly sets private "fps" variable.
         */
        update: function(tFrame) {
            allFps.push(tFrame);
            if (allFps.length > 60) {
                var sum = 0;
                var min = 1000;
                var max = 0;
                allFps.shift();
                allFps.forEach(function(value) {
                    sum += value;
                    min = Math.min(min, value);
                    max = Math.max(max, value);
                });
                fps =  ~~(sum / 60) + ", " + ~~min + " - " + ~~max;
            }
        },

        get fps() {
            return fps;
        }

    }

})();
