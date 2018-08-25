var orbitals = [];
var coms = [];
var def = [];

/** @enum {number} */
var ORBITAL_TYPE = {
	STAR: 0,
	PLANET: 1,
	SATELLITE: 2,
	MINING: 3,
	DEFENSE: 4
}

function Orbital(color, size, x, y, orbit, distance, speed, angle) {
	if (angle === UNDEF) angle = 0;
	var t = {};
	t.name = "Some Shithole Planet";
	t.type = ORBITAL_TYPE.STAR;
	t.x = x;
	t.y = y;
	t.color = color;
	t.size = size;
	t.isSun = false;
	t.id = orbitals.length.toString();
	if (orbit) {
		t.orbit = {
			planet: orbit,
			distance: distance,
			speed: speed,
			angle: angle
		};
	}
	t.update = function() {

		// Update orbit.
		if (t.orbit) {
			var e = t.orbit;
			e.angle += e.speed;
			t.x = e.distance * Math.cos(e.angle) + e.planet.x;
			t.y = e.distance * Math.sin(e.angle) + e.planet.y;
		}

	}
	t.render = function() {
		renderTrail(t);
	}
	orbitals.push(t);
	return t;
};

function sun(color, size, x, y) {
	var t = Orbital(color, size, x, y, null, null, null, null);
	t.name = "The Sun";
	t.type = ORBITAL_TYPE.STAR;
	t.isSun = true;
	return t;
}

function planet(color, size, orbit, distance, speed, angle) {
	if (angle === UNDEF) angle = 0;
	var t = Orbital(color, size, 0, 0, orbit, distance + size / 2, speed, angle);
	t.name = "Planet";
	t.type = ORBITAL_TYPE.PLANET;
	t.update = extend(t.update, function() {

	})
	return t;
}

function createStation(what) {
	window[what]()
}

function miningStation(orbit) {
	var angle = splitToMax(miningStation.max, orbit, coms);
	if (angle === UNDEF)
		return;
	var t = Orbital(getHSL(212, 100, 97), 2, 0, 0, orbit, orbit.size * 3, -0.005, null);
	t.name = "Mining Station";
	t.type = ORBITAL_TYPE.MINING;
	t.update = extend(t.update, function() {
		base.minerals += base.mineRate;
	})
	return t;
}

miningStation.max = 4;

function satellite(orbit) {
	var angle = splitToMax(satellite.max, orbit, coms);
	if (angle === UNDEF)
		return;
	var t = Orbital(getHSL(160, 100, 50), 2, 0, 0, orbit, orbit.size * 5, 0.01, angle);
	t.name = "Satellite";
	t.type = ORBITAL_TYPE.SATELLITE;
	t.index = coms.length;
	t.update = extend(t.update, function() {
		base.energy += base.energyRate;
	})
	coms.push(t);
	return t;
}

satellite.max = 3;
satellite.create = function() {

}

function defenseStation(orbit) {
	var angle = splitToMax(defenseStation.max, orbit, def);
	if (angle === UNDEF)
		return;
	var t = Orbital(getHSL(33, 100, 50), 2, 0, 0, orbit, orbit.size * 7, 0.005, angle);
	t.name = "Defense Platform";
	t.type = ORBITAL_TYPE.DEFENSE;
	t.index = def.length;
	t.target = null;
	t.range = 1000;
	t.shootTimer = 0;
	t.shootCost = 1;
	def.push(t);

	t.update = extend(t.update, function() {
		if (t.shootTimer-- <= 0) {
			t.target = EnemyShip.nearest(t, t.range);
			if (t.target && base.energy >= t.shootCost) {
				t.target.hp -= 5;
				t.shootTimer = 5;
				base.energy -= t.shootCost;
			} else {
				t.target = null;
			}
		} else {
			t.target = null;
		}
	})

	t.render = extend(t.render, function() {
		if (t.target) {
			ctx.strokeStyle = "#0F0";
			ctx.lineWidth = 3;
			ctx.moveTo(t.x, t.y/View.tilt);
			ctx.lineTo(t.target.x, t.target.y/View.tilt);
			ctx.stroke();
		}
	})

	return t;
}

defenseStation.max = 2;
