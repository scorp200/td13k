function slowCode(station, level) {

	var cost = 300;
	var attackSpeed = 60 * 2;
	var slowTime = 100;
	var slowRate = 0.05;
	var range = 400;
	var timer = attackSpeed;
	var scale = 0;
	var shootCost = 30;

	function update() {
		if (timer-- <= 0 && Base.energy >= shootCost) {
			var nearest = EnemyShip.nearest(station, range);
			if (nearest) {
				scale = 0;
				timer = attackSpeed;
				Base.energy -= shootCost;
				var n = EnemyShip.allInstances.length;
				while (n--) {
					var inst = EnemyShip.allInstances[n];
					var distance = getDistance(inst, station);
					if (distance < range) {
						EnemyShip.addBuff(inst, BUFF_TYPE.SPEED, slowRate, slowTime);
					}
				}
			}
		}

		if (scale < range) {
			scale += 20;
		}

	}

	function render() {
		if (scale < range) {
			ctx.save();
			ctx.beginPath();
			ctx.strokeStyle = '#c6e2ff';
			ctx.translate(station.x, station.y / View.tilt);
			ctx.scale(1, 1/View.tilt);
			ctx.arc(0, 0, scale, 0, TAU);
			ctx.stroke();
			ctx.restore();
		}
	}

	return {
		type: ORBITAL_MODULE_TYPE.EMP,
		level: level,
		update: update,
		render: render
	}
}
