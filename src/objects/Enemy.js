//
var EnemyShip = (function() {

	var spaceSize = 6000;
	var partitionSize = 100;
	var partitionWidth = spaceSize / partitionSize;
	var partitions = [];
	var instances = [];
	var moveSpd = 5;
	var range = 500;
	var damage = 0.2;

	var size = partitionWidth * partitionWidth;
	while (size--) {
		partitions.push([]);
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 * @param {number} a Direction (for both facing and moving).
	 */
	function create(x, y, a) {
		instances.push({
			x: x,
			y: y,
			z: Math.random() * 20,
			moveDir: a,
			hp: 10,
			target: null,
			shootTime: Math.random() * 10,
			buffs: [],
			partition: null
		});
	}

	/**
	 *
	 */
	function update() {

		var n = instances.length;
		while (n-- > 0) {
			var inst = instances[n];

			var newPartition = getPartition(inst.x, inst.y);
			if (inst.partition !== newPartition) {
				if (inst.partition !== null) {
					var index = inst.partition.indexOf(inst);
					inst.partition[index] = inst.partition[inst.partition.length-1];
					inst.partition.length--;
				}
				inst.partition = newPartition;
				newPartition.push(inst);
			}

			// Apply buffs.
			var opts = [];
			opts[BUFF_TYPE.SPEED] = moveSpd;
			opts[BUFF_TYPE.RANGE] = range;
			var i = inst.buffs.length;
			while (i--) {
				var buff = inst.buffs[i];
				opts[buff.type] *= buff.value;
				if (buff.time-- <= 0) {
					inst.buffs[i] = inst.buffs[inst.buffs.length-1];
					inst.buffs.length--;
				}
			}

			// Accuire and move to target.
			inst.target = nearestTargetableOrbital(inst.x, inst.y);
			if (inst.target) {
				var a = getAngle(inst, inst.target);
				inst.moveDir += getAngleDifference(a, inst.moveDir) * 0.01;
				inst.x -= opts[BUFF_TYPE.SPEED] * Math.cos(inst.moveDir);
				inst.y -= opts[BUFF_TYPE.SPEED] * Math.sin(inst.moveDir);

				// Shootzing!
				if (inst.shootTime-- <= 0) {
					inst.shootTime = 10;
					var distance = getDistance(inst, inst.target);
					if (distance < opts[BUFF_TYPE.RANGE]) {
						var miss = Math.random() > 0.5;
						var dir = getAngle(inst, inst.target);
						var r = miss ? 2000 : distance;
						Laser.create(inst.x, inst.y, dir, r, "#F00");
						if (!miss) {
							inst.target.hp -= damage;
						}
					}
				}
			}

			// Health depleated.
			if (inst.hp <= 0) {
				destroy(n);
			}

		}

		flockCollision()

	}

	/**
	 *
	 */
	function render() {
		var ox = -sprEnemyShip.width / 2;
		var oy = -sprEnemyShip.height / 2;
		var n = instances.length;
		while (n--) {
			var inst = instances[n];
			ctx.save();
			ctx.translate(inst.x, inst.y / View.tilt - inst.z * View.tilt);
			ctx.scale(2, 2 / View.tilt);
			ctx.rotate(inst.moveDir);
			ctx.drawImage(sprEnemyShip, ox, oy);
			ctx.restore();
		}
	}

	/**
	 * @param {number} n The index of the ship to destroy.
	 * @return {void}
	 */
	function destroy(n) {
		Explosion.create(instances[n].x, instances[n].y);
		instances[n] = instances[instances.length-1];
		instances.length--;
	}

	/**
	 *
	 */
	function flockCollision() {
		var n = instances.length;
		while (n--) {
			var inst1 = instances[n];
			var partition = getPartition(inst1.x, inst1.y);
			var i = partition.length;
			while (i--) {
				var inst2 = partition[i];
				if (inst1 !== inst2) {
					var distance = getDistanceRaw(inst1, inst2);
					if (distance < 200) {
						var xm = (inst1.x - inst2.x) / 4;
						var ym = (inst1.y - inst2.y) / 4;
						inst1.x += xm;
						inst1.y += ym;
						inst2.x -= xm;
						inst2.y -= ym;
						break; // No point checking multiple collisions...
					}
				}
			}
		}
	}

	/**
	 * @param {Object} pos Any object with x and y properties.
	 * @param {number} dist
	 * @return {Object}
	 */
	function nearest(pos, dist) {
		var nearest = null;
		var n = instances.length;
		while (n--) {
			var inst = instances[n];
			var newDist = getDistance(pos, inst);	// Change to Raw?
			if (newDist < dist) {
				nearest = inst;
				dist = newDist;
			}
		}
		return nearest;
	}

	/**
	 *
	 */
	function addBuff(inst, type, value, time) {
		inst.buffs.push({
			type: type,
			value: value,
			time: time
		});
	}

	/**
	 *
	 */
	function destroyAll() {
		instances.length = 0;
	}

	/**
	 *
	 */
	function getPartition(x, y) {
		x = ~~((x + spaceSize / 2) / partitionSize);
		y = ~~((y + spaceSize / 2) / partitionSize);
		var index = y * partitionWidth + x;
		return partitions[index];
	}

	// Export.
	return {
		allInstances: instances, // I WANT TO REMOVE THIS!!
		create: create,
		update: update,
		render: render,
		nearest: nearest,
		addBuff: addBuff,
		destroyAll: destroyAll
	}

})();
