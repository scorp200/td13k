var OrbitalUpgrades = (function() {

    var upgrades = {}

    //
    function init() {
        Object.assign(upgrades, {
        	laser: {
        		loc: ORBITAL_TYPE.DEFENSE,
        		name: "Lasers",
        		img: null,
        		func: null,
                impl: laserCode
        	},
        	beam: {
        		loc: ORBITAL_TYPE.DEFENSE,
        		name: "Beam",
        		img: null,
        		func: null,
                impl: beamCode
        	},
        	rocket: {
        		loc: ORBITAL_TYPE.DEFENSE,
        		name: "Rockets",
        		img: null,
        		func: null,
                impl: rocketCode
        	}
        });
    }

    /**
     *
     */
    function getUpgradesByLocation(loc) {
        var arr = [];
        for (var name in upgrades) {
            (upgrades[name].loc === loc) && arr.push(name);
        }
        return arr;
    }

    /**
     * @param {Object} m Weapon module.
     * @param {string} type Type of module.
     * @return {Object}
     */
    function getUpgrade(t, type) {
        var m = t.module;
        var u = upgrades[type];
        var level = (m.type === type) ? m.level+1 : 1;
        return {
            img: u.img,
            text: u.name + " (Level " + level + ")",
            func: setModuleUpgrade.bind(null, t, type, level)
        }
    }

    /**
     * @param {Object} t Orbital.
     * @return {Array}
     */
    function getUpgrades(t) {

        // Orbital doesn't have a module.
        if (!t.module) return [];

        //
        var arr = [];
        var list = getUpgradesByLocation(t.type);
        list.forEach(function(type) {
            arr.push(getUpgrade(t, type));
        });

        //
        return arr;

    }

    /**
     * @param {string} type Upgrade name. Should change to a constant.
     */
    function getImplementation(type) {
        return upgrades[type].impl;
    }

    //
	function rocketCode(station, level) {
        console.log("rocket", station, level);
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
					if (target && base.energy >= energyCost) {
						base.energy -= energyCost;
						var life = getDistance(station, target);
						var dir = getAngle(station, target);
						Rocket.create(station.x, station.y, dir, life, "#00B" /*createExplosion.bind(target.x, target.y, 1000)*/);
					}
				}
			},
			render: NOOP
		};
	}

	// Beam weapon module.
	function beamCode(station, level) {
        console.log("beam", station, level);
		var cost = 100;
		var damage = 10.5;
		var length = 1000;
		var target = null;
		var angle = null;
		var angleTarget = null;
		var buffer = 0.1;
		return {
			type: "beam",
			level: level,
			update: function() {
				target = EnemyShip.furthest(station, length);
				if (!target) return;
				angleTarget = getAngle(station, target);
				if (angle == null) angle = angleTarget;
				angle += Math.sign(getAngleDifference(angleTarget, angle)) * 0.01;
				var n = EnemyShip.allInstances.length;
				while (n--) {
					var inst = EnemyShip.allInstances[n];
					var instAngle = getAngle(station, inst);
					var distance = getDistance(inst, station);
					var difference = getAngleDifference(angle, instAngle)
					if (distance < length && Math.abs(difference) < buffer) {
						inst.hp -= damage;
					}
				}
			},
			render: function() {
				if (!target) return;
				ctx.beginPath();
				//ctx.strokeStyle = "#FF0";
				ctx.lineWidth = 6 + Math.sin(performance.now() / 5) * 3;

				var grd = ctx.createRadialGradient(station.x, station.y / View.tilt, 100, station.x, station.y / View.tilt, 1000);
				grd.addColorStop(0, "#FF0");
				grd.addColorStop(1, "rgba(0, 0, 0, 0)");
				ctx.strokeStyle = grd;

				ctx.moveTo(station.x, station.y / View.tilt);
				var x = station.x - length * Math.cos(angle);
				var y = station.y - length * Math.sin(angle);
				ctx.lineTo(x, y / View.tilt);
				ctx.stroke();
			}
		}
	}

	// Laser weapon module.
	function laserCode(station, level) {
        console.log("laser", station, level);
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
					if (target && base.energy >= shootCost) {
						base.energy -= shootCost;
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

    // Export.
    return {
        init: init,
        byLocation: getUpgradesByLocation,
        get: getUpgrades,
        implementation: getImplementation
    }

})();
