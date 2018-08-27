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
	if (angle === undefined) angle = 0;
	var t = {};
	t.name = "Some Shithole Planet";
	t.type = ORBITAL_TYPE.STAR;
	t.x = x;
	t.y = y;
	t.color = color;
	t.size = size;
	t.isSun = false;
	t.id = orbitals.length.toString();
	t.hp = 100;
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
	if (angle === undefined) angle = 0;
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
	if (angle === undefined)
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
	if (angle === undefined)
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
	if (angle === undefined)
		return;
	var t = Orbital(getHSL(33, 100, 50), 2, 0, 0, orbit, orbit.size * 7, 0.005, angle);
	t.name = "Defense Platform";
	t.type = ORBITAL_TYPE.DEFENSE;
	t.index = def.length;
	def.push(t);
	t.module = defenseStation.modules.beam(t);
	t.update = extend(t.update, t.module.update);
	t.render = extend(t.render, t.module.render);
	return t;
}

defenseStation.max = 2;

defenseStation.modules = {
	beam: function(station) {
		var t = {};
		t.cost = 100;
		t.damage = 0.5;
		t.length = 1000;
		t.station = station;
		t.target = null;
		t.angle = null;
		t.angleTarget = null;
		t.buffer = 0.01;
		t.update = function() {
			t.target = EnemyShip.furthest(t.station, t.length);
			if (!t.target)
				return;
			t.angleTarget = Math.atan2(t.target.y - t.station.y, t.target.x - t.station.x);
			if (t.angle == null)
				t.angle = t.angleTarget;
			t.angle += lerp(t.angle, t.angleTarget, 100, 0.001);
			var n = EnemyShip.allInstances.length;
			while (n--) {
				var inst = EnemyShip.allInstances[n];
				var angle = Math.atan2(inst.y - t.station.y, inst.x - t.station.x);
				var distance = getDistance(inst, t.station);
				if (distance < t.length && Math.abs(angle - t.angle) < t.buffer)
					inst.hp -= t.damage;
			}
		}
		t.render = function() {
			if (!t.target)
				return;
			ctx.beginPath();
			ctx.strokeStyle = "#FF0";
			ctx.lineWidth = 5;
			ctx.moveTo(t.station.x, t.station.y / View.tilt);
			var x = t.length * Math.cos(t.angle) + t.station.x;
			var y = t.length * Math.sin(t.angle) + t.station.y;
			ctx.lineTo(x, y / View.tilt);
			ctx.stroke();
		}
		return t;
	},
	laser: function(station) {
		var t = {}
		t.range = 1000;
		t.shootTimer = 0;
		t.shootCost = 0.1;
		t.station = station;
		t.update = function() {
			if (t.shootTimer-- <= 0) {
				var target = EnemyShip.nearest(t, t.range);
				if (target && base.energy >= t.shootCost) {
					t.shootTimer = 2;
					base.energy -= t.shootCost;
					var miss = (Math.random() > 0.5) ? true : false;
					var lifetime = miss ? 2000 : getDistance(t.station, target);
					Laser.create(t.station.x, t.station.y, getAngle(t.station.x, target), lifetime, "#FF0");
					if (!miss) {
						target.hp -= 2;
					}
				}
			}
		}
		return t;
	}
}
