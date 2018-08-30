function zapCode(station, level) {
	var cost = 350;
	var energyCost = 1;
	var maxTargets = 10;
	var maxRange = 300;
	var damage = 0.1;
	var targets = [];
	return {
		type: 'zap',
		level: level,
		update: function() {
			var n = EnemyShip.allInstances.length;
			targets.length = 0;
			var last = EnemyShip.nearest(station, maxRange);
			if (!last)
				return;
			while (n--) {
				var inst = EnemyShip.allInstances[n];
				var distance = getDistance(last, inst);
				if (distance <= maxRange) {
					last = inst;
					targets.push(inst);
					inst.hp -= damage;
				}
				if (targets.length > maxTargets)
					break;
			}
		},
		// graffik person make this better :P
		render: function() {
			if (targets[0]) {
				ctx.beginPath();
				ctx.strokeStyle = '#c6e2ff';
				ctx.lineWidth = 4;
				var n = targets.length;
				var last = targets[n - 1];
				ctx.moveTo(last.x, last.y / View.tilt);
				while (n--) {
					var inst = targets[n];
					ctx.lineTo(inst.x, inst.y / View.tilt);
				}
				ctx.lineTo(station.x, station.y / View.tilt)
				ctx.stroke();
			}
		}
	}
}
