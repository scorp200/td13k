var Rocket = (function() {

	var map = {};
	var moveSpeed = 20;

	/***************************************************************************
	 * @return {void}
	 */
	function create(x, y, dir, lifetime, color) {
		if (!map[color]) {
			map[color] = [];
		}
		map[color].push({
			x: x,
			y: y,
			moveDirection: dir,
			lifetime: lifetime - moveSpeed
		});
	}

	/***************************************************************************
	 * @return {void}
	 */
	function update() {
		for (var color in map) {
			var m = map[color];
			var n = m.length;
			while (n--) {
				var inst = m[n];
				var target = EnemyShip.nearest(inst, 500);
				var dist = target ? getDistance(inst, target) : 30;
				if (inst.lifetime-- <= 0 || dist < 30) {
					destroy(color, n);
					Explosion.create(inst.x, inst.y);
					if (target) {
						target.hp -= 10;
					}
				} else {
					if (target) {
						var a = getAngle(inst, target);
						var diff = getAngleDifference(a, inst.moveDirection);
						inst.moveDirection += diff * 0.05;
					}
					inst.x -= moveSpeed * Math.cos(inst.moveDirection);
					inst.y -= moveSpeed * Math.sin(inst.moveDirection);
				}
			}
		}
	}

	/***************************************************************************
	 * @return {void}
	 */
	function render() {
		var spriteOriginX = sprRocket.width / 2;
		var spriteOriginY = sprRocket.height / 2;
		for (var color in map) {
			var m = map[color];
			var n = m.length;
			while (n--) {
				var inst = m[n];
				ctx.save();
				ctx.translate(inst.x, inst.y / View.tilt);
				ctx.rotate(inst.moveDirection);
				ctx.drawImage(sprRocket, spriteOriginX, spriteOriginY);
				ctx.restore();
			}
		}
	}

	/***************************************************************************
	 *
	 */
	function destroy(c, n) {
		map[c].splice(n, 1);
	}

	//**************************************************************************
	// Export.
	return {
		create: create,
		update: update,
		render: render
	}

})();
