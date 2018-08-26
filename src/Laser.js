var Laser = {

    instances: [],
    speed: 50,

    create: function(x, y, angle, lifetime) {
        Laser.instances.push({
            x: x,
            y: y,
            angle: angle,
            lifetime: lifetime - Laser.speed
        });
    },

    update: function() {
        var n = Laser.instances.length;
        while (n--) {
            var inst = Laser.instances[n];
            inst.lifetime -= Laser.speed;
            if (inst.lifetime <= 0) {
                Laser.destroy(n);
            } else {
                inst.x -= Math.cos(inst.angle) * Laser.speed;
                inst.y -= Math.sin(inst.angle) * Laser.speed;
            }
        }
    },

    render: function() {
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#FF0";
        ctx.beginPath();
        var n = Laser.instances.length;
        while (n--) {
            var inst = Laser.instances[n];
            var toX = inst.x+Math.cos(inst.angle)*10;
            var toY = inst.y / View.tilt+Math.sin(inst.angle)*10;
            ctx.moveTo(inst.x, inst.y / View.tilt);
            ctx.lineTo(toX, toY);
        }
        ctx.stroke();
    },

    destroy: function(n) {
        Laser.instances.splice(n, 1);
    }

}
