//
function rocketCode(station, level) {

    var cost = 200;
    var damage = 2;
    var attackRate = 20;
    var range = 1500;
    var timer = attackRate;
	var shootCost = 0.1;

    return {
        type: ORBITAL_MODULE_TYPE.ROCKET,
        level: level,
        update: function() {
            if (!timer--) {
                timer = attackRate;
                var target = EnemyShip.nearest(station, range);
                if (target && Base.energy >= shootCost) {
                    var life = getDistance(station, target);
                    var dir = getAngle(station, target);
                    Rocket.create(station.x, station.y, dir, life, "#00B");
					Base.energy -= shootCost;
                }
            }
        }
    };
}
