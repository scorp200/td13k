var Rocket = {

    map: {},
    instances: [],
    speed: 50,

    create: function(x, y, dir, lifetime, color, onDestroy) {
        if (!Rocket.map[color]) {
            Rocket.map[color] = [];
        }
        Rocket.map[color].push({
            x: x,
            y: y,
            moveDirection: dir,
            lifetime: lifetime - Rocket.speed,
            onDestroy: onDestroy
        });
    },

    update: function() {
        for (var color in Rocket.map) {
            var n = Rocket.map[color].length;
            while (n--) {
                var inst = Rocket.map[color][n];
                inst.lifetime -= Rocket.speed;
                if (inst.lifetime <= 0) {
                    (inst.onDestroy) && inst.onDestroy();
                    Rocket.destroy(color, n);
                } else {
                    inst.x -= Math.cos(inst.moveDirection) * Rocket.speed;
                    inst.y -= Math.sin(inst.moveDirection) * Rocket.speed;
                }
            }
        }
    },

    render: function() {
        ctx.lineWidth = 1;
        for (var color in Rocket.map) {
            ctx.strokeStyle = color;
            ctx.beginPath();
            var n = Rocket.map[color].length;
            while (n--) {
                var inst = Rocket.map[color][n];
                var toX = inst.x+Math.cos(inst.moveDirection)*10;
                var toY = inst.y / View.tilt+Math.sin(inst.moveDirection)*10;
                ctx.moveTo(inst.x, inst.y / View.tilt);
                ctx.lineTo(toX, toY);
            }
            ctx.stroke();
        }
    },

    destroy: function(c, n) {
        Rocket.map[c].splice(n, 1);
    }

}
