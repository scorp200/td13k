var Laser = {

    map: {},
    instances: [],
    speed: 50,

    create: function(x, y, angle, lifetime, color, onDestroy) {
        if (!Laser.map[color]) {
            Laser.map[color] = [];
        }
        Laser.map[color].push({
            x: x,
            y: y,
            angle: angle,
            lifetime: lifetime - Laser.speed,
            onDestroy: onDestroy
        });
    },

    update: function() {
        for (var color in Laser.map) {
            var n = Laser.map[color].length;
            while (n--) {
                var inst = Laser.map[color][n];
                inst.lifetime -= Laser.speed;
                if (inst.lifetime <= 0) {
                    if(inst.onDestroy !== UNDEF)
                        inst.onDestroy();
                    Laser.destroy(color, n);
                } else {
                    inst.x -= Math.cos(inst.angle) * Laser.speed;
                    inst.y -= Math.sin(inst.angle) * Laser.speed;
                }
            }
        }
    },

    render: function() {
        ctx.lineWidth = 1;
        for (var color in Laser.map) {
            ctx.strokeStyle = color;
            ctx.beginPath();
            var n = Laser.map[color].length;
            while (n--) {
                var inst = Laser.map[color][n];
                var toX = inst.x+Math.cos(inst.angle)*10;
                var toY = inst.y / View.tilt+Math.sin(inst.angle)*10;
                ctx.moveTo(inst.x, inst.y / View.tilt);
                ctx.lineTo(toX, toY);
            }
            ctx.stroke();
        }
    },

    destroy: function(c, n) {
        Laser.map[c].splice(n, 1);
    }

}
