var Laser = (function() {

    var map = {};
    var speed = 50;

    /**
     * @param {number} x
     * @param {number} y
     * @param {number} angle
     * @param {number} lifetime
     * @param {string} color
     * @return {void}
     */
    function create(x, y, angle, lifetime, color) {

        // Create map for this color if it doesn't exist yet.
        (!map[color]) && (map[color] = []);

        // Push new instance to array in map.
        map[color].push({
            x: x,
            y: y,
            angle: angle,
            lifetime: lifetime - speed
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
                inst.lifetime -= speed;
                if (inst.lifetime <= 0) {
                    destroy(m, n);
                } else {
                    inst.x -= Math.cos(inst.angle) * speed;
                    inst.y -= Math.sin(inst.angle) * speed;
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
                var toX = inst.x+Math.cos(inst.angle)*10;
                var toY = inst.y / View.tilt+Math.sin(inst.angle)*10;
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

    return {
        create: create,
        update: update,
        render: render
    }

})();
