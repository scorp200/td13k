function zapCode(station, level) {

	var cost = 350;
	var shootCost = 0.01;
	var maxTargets = 10;
	var maxRange = 300;
	var damage = 0.1;
	var targets = [];

	/***************************************************************************
	 *
	 */
	function update() {
 		var n = EnemyShip.allInstances.length;
 		targets.length = 0;
 		var last = EnemyShip.nearest(station, maxRange);
 		if (!last)
 			return;
 		while (n-- && Base.energy >= shootCost) {
			Base.energy -= shootCost;
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
 	}

	/***************************************************************************
	 *
	 */
	function render() {
		if (targets[0]) {
			ctx.beginPath();
			ctx.strokeStyle = "#0FF";
			ctx.lineWidth = 1;
			var n = targets.length;
			var last = targets[n - 1];
			ctx.moveTo(last.x, last.y / View.tilt);
			var lx = last.x;
			var ly = last.y;
			while (n--) {
				var inst = targets[n];
				var nx = inst.x;
				var ny = inst.y;
				var hx = lx+(nx-lx) / 2;
				var hy = ly+(ny-ly) / 2;
				ctx.lineTo(mix(hx), mix(hy) / View.tilt);
				ctx.lineTo(mix(nx), mix(ny) / View.tilt);
				lx = nx;
				ly = ny;
			}
			ctx.lineTo(station.x, station.y / View.tilt)
			ctx.stroke();
		}
	}

	/***************************************************************************
	 *
	 */
	function mix(x) {
		return x + Math.sin(x + performance.now() / 100) * 20;
	}

	//**************************************************************************
	// Export.
	return {
		type: ORBITAL_MODULE_TYPE.LIGHTNING,
		level: level,
		update: update,
		render: render
	}

}
