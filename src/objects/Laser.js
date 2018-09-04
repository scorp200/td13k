var Laser = (function() {

    var map = {};
    var moveSpeed = 50;

    /**
     * @param {number} x
     * @param {number} y
     * @param {number} a Angle
     * @param {number} lifetime
     * @param {string} color
	 * @param {number=} spd
     * @return {void}
     */
    function create(x, y, a, lifetime, color, spd) {

        // Create map for this color if it doesn't exist yet.
        (!map[color]) && (map[color] = []);

        // Push new instance to array in map.
        map[color].push({
            x: x,
            y: y,
            radAngle: a,
            lifetime: lifetime - moveSpeed,
			spd: spd || moveSpeed
        });

    }

    /**
     * Update all Laser instances.
     * @return {void}
     */
    function update() {
        for (var color in map) {
            var m = map[color];
            var n = m.length;
            while (n--) {
                var inst = m[n];
                inst.lifetime -= inst.spd;
                if (inst.lifetime <= 0) {
                    destroy(m, n);
                } else {
                    inst.x -= Math.cos(inst.radAngle) * inst.spd;
                    inst.y -= Math.sin(inst.radAngle) * inst.spd;
                }
            }
        }
    }

    /**
     * Render all Laser instances.
     * @return {void}
     */
    function render() {
        ctx.globalAlpha = 1;
        ctx.lineWidth = 1;
        for (var color in map) {
            ctx.strokeStyle = color;
            ctx.beginPath();
            var n = map[color].length;
            while (n--) {
                var inst = map[color][n];
                var toX = inst.x+Math.cos(inst.radAngle)*10;
                var toY = inst.y / View.tilt+Math.sin(inst.radAngle)*10;
                ctx.moveTo(inst.x, inst.y / View.tilt);
                ctx.lineTo(toX, toY);
            }
            ctx.stroke();
        }
    }

    function destroy(arr, n) {
        arr[n] = arr[arr.length-1];
        arr.length -= 1;
    }

	/**
	 *
	 */
	function clear() {
		map = {};
	}

	// Export.
    return {
        create: create,
        update: update,
        render: render,
		clear: clear
    }

})();
