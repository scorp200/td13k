//
function rocketCode(station, level) {
    var cost = 200;
    var energyCost = 0.5;
    var damage = 2;
    var attackRate = 20;
    var range = 1500;
    var timer = attackRate;
    return {
        type: "rocket",
        level: level,
        update: function() {
            if (timer-- <= 0) {
                timer = attackRate;
                var target = EnemyShip.nearest(station, range);
                if (target && Base.energy >= energyCost) {
                    Base.energy -= energyCost;
                    var life = getDistance(station, target);
                    var dir = getAngle(station, target);
                    Rocket.create(station.x, station.y, dir, life, "#00B" /*createExplosion.bind(target.x, target.y, 1000)*/);
                }
            }
        }
    };
}
