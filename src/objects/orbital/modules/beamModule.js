// Beam weapon module.
function beamCode(station, level) {
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
