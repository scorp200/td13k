// Beam weapon module.
function beamCode(station, level) {

	var cost = 100;
	var shootCost = 0.1;
	var damage = 0.5;
	var length = 1000;
	var target = null;
	var shootDir = null;
	var angleTarget = null;
	var buffer = 0.1;

	return {
		type: ORBITAL_MODULE_TYPE.BEAM,
		level: level,
		update: function() {
			if (Base.energy >= shootCost) {
				target = EnemyShip.nearest(station, length);
				if (target) {
					Base.energy -= shootCost;
					angleTarget = getAngle(station, target);
					if (shootDir == null) shootDir = angleTarget;
					var diff = getAngleDifference(angleTarget, shootDir);
					shootDir += Math.sign(diff) * 0.01;
					var n = EnemyShip.allInstances.length;
					while (n--) {
						var inst = EnemyShip.allInstances[n];
						var instAngle = getAngle(station, inst);
						var distance = getDistance(inst, station);
						var difference = getAngleDifference(shootDir, instAngle)
						if (distance < length && Math.abs(difference) < buffer) {
							inst.hp -= damage;
						}
					}
				}
			} else {
				target = null;
			}
		},
		render: function() {
			if (target) {
				ctx.beginPath();
				ctx.lineWidth = 6 + Math.sin(performance.now() / 5) * 3;

				var grd = ctx.createRadialGradient(station.x, station.y / View.tilt, 100, station.x, station.y / View.tilt, 1000);
				grd.addColorStop(0, "#FF0");
				grd.addColorStop(1, "rgba(0,0,0,0)");
				ctx.strokeStyle = grd;

				ctx.moveTo(station.x, station.y / View.tilt);
				var x = station.x - length * Math.cos(shootDir);
				var y = station.y - length * Math.sin(shootDir);
				ctx.lineTo(x, y / View.tilt);
				ctx.stroke();
			}
		}
	}
}
