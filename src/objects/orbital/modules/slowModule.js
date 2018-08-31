function slowCode(station, level) {
	var cost = 300;
	var energyCost = 1;
	var attackSpeed = 60 * 1;
	var slowTime = 100;
	var slowRate = 0.05;
	var range = 300;
	var timer = attackSpeed;
	return {
		type: 'slow',
		level: level,
		update: function() {
			if (timer-- <= 0) {
				timer = attackSpeed;
				var n = EnemyShip.allInstances.length;
				while (n--) {
					var inst = EnemyShip.allInstances[n];
					var distance = getDistance(inst, station);
					if (distance < range) {
						EnemyShip.addBuff(inst, BUFF_TYPE.SPEED, slowRate, slowTime);
					}
				}
			}

		},
		// graffik person make this better :P
		render: function() {
			if (timer <= 0) {
				ctx.beginPath();
				ctx.fillStyle = '#c6e2ff';
				ctx.arc(station.x, station.y / View.tilt, range, 0, TAU);
				ctx.fill();
			}
		}
	}
}
