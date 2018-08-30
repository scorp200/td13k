var orbitals = [];
var coms = [];
var def = [];
var build = null;
var buildOn = null;
var buildOrbitSize = 10;
/** @enum {number} */
var ORBITAL_TYPE = {
	STAR: 0,
	PLANET: 1,
	SATELLITE: 2,
	MINING: 3,
	DEFENSE: 4,
	MOON: 5
}

OrbitalUpgrades.init();

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
	t.module = null;
	t.upgrades = [];
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

		//
		t.module && t.module.update();

	}
	t.render = function() {
		renderTrail(t);
		t.module && t.module.render();
	}
	orbitals.push(t);
	return t;
};

Orbital.sun = function(color, size, x, y) {
	var t = Orbital(color, size, x, y, null, null, null, null);
	t.name = "The Sun";
	t.type = ORBITAL_TYPE.STAR;
	t.isSun = true;
	return t;
}

Orbital.planet = function(color, size, orbit, distance, speed, angle) {
	if (angle === undefined) angle = 0;
	var t = Orbital(color, size, 0, 0, orbit, distance + size / 2, speed, angle);
	t.name = "Planet";
	if (orbit.type === ORBITAL_TYPE.PLANET)
		t.type = ORBITAL_TYPE.MOON;
	else
		t.type = ORBITAL_TYPE.PLANET;
	t.update = extend(t.update, function() {

	})
	return t;
}

Orbital.miningStation = function(orbit) {
	var angle = splitToMax(4, orbit, coms);
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

Orbital.satellite = function(orbit) {
	var angle = splitToMax(3, orbit, coms);
	if (angle === undefined)
		return;
	var t = Orbital(getHSL(160, 100, 50), 2, 0, 0, orbit, orbit.size * 5, 0.01, angle);
	t.name = "Satellite";
	t.type = ORBITAL_TYPE.SATELLITE;
	//t.index = coms.length;
	t.cache = sprSatellite;
	t.update = extend(t.update, function() {
		base.energy += base.energyRate;
	})
	coms.push(t);
	return t;
}

Orbital.defenseStation = function(orbit) {
	var angle = splitToMax(2, orbit, def);
	if (angle === undefined)
		return;
	var t = Orbital(getHSL(33, 100, 50), 2, 0, 0, orbit, orbit.size * 7, 0.005, angle);
	t.name = "Defense Platform";
	t.type = ORBITAL_TYPE.DEFENSE;
	//t.index = def.length;
	def.push(t);
	setModuleUpgrade(t, "beam", 1);
	return t;
}

function setModuleUpgrade(station, type, level) {
	var impl = OrbitalUpgrades.implementation(type);
	station.module = impl(station, level);
}
