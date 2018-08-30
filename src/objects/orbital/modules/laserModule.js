// Laser weapon module.
function laserCode(station, level) {
    var range = 1000;
    var shootTimer = 0;
    var shootCost = 0.1;
    return {
        type: "laser",
        level: level,
        update: function() {
            if (shootTimer-- <= 0) {
                shootTimer = 2 - Math.min(level / 10, 2);
                var target = EnemyShip.nearest(station, range);
                if (target && Base.energy >= shootCost) {
                    Base.energy -= shootCost;
                    var miss = Math.random() > 0.5;
                    var life = miss ? 2000 : getDistance(station, target);
                    var dir = getAngle(station, target);
                    Laser.create(station.x, station.y, dir, life, "#FF0");
                    if (!miss) {
                        target.hp -= 2;
                    }
                }
            }
        },
        render: NOOP
    }
}
