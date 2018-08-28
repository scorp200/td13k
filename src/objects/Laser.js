var Laser = (function() {

    var map = {};
    var instances = [];
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
        if (!map[color]) {
            map[color] = [];
        }
        map[color].push({
            x: x,
            y: y,
            angle: angle,
            lifetime: lifetime - speed
        });
    }

    function update() {
        for (var color in map) {
            var n = map[color].length;
            while (n--) {
                var inst = map[color][n];
                inst.lifetime -= speed;
                if (inst.lifetime <= 0) {
                    destroy(color, n);
                } else {
                    inst.x -= Math.cos(inst.angle) * speed;
                    inst.y -= Math.sin(inst.angle) * speed;
                }
            }
        }
    }

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

    function destroy(c, n) {
        map[c].splice(n, 1);
    }

    return {
        create: create,
        update: update,
        render: render
    }

})();
