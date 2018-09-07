var orbitals = [];
//var coms = [];
//var def = [];

OrbitalUpgrades.init();

function Orbital(color, size, x, y, orbit, distance, moveSpeed, radAngle) {
	if (radAngle === undefined) radAngle = 0;
	var t = {};
	t.name = "";
	t.type = ORBITAL_TYPE.STAR;
	t.x = x;
	t.y = y;
	t.color = color;
	t.size = size;
	t.id = orbitals.length.toString();
	t.hp = 100;
	t.module = null;
	t.upgrades = [];
	t.online = false;
	t.aimDirection = 0;
	if (orbit) {

		// Clear orbit cache to force refresh.
		orbit.orbitCache = null;

		// Assign orbit parameters.
		t.orbit = {
			planet: orbit,
			distance: distance,
			moveSpeed: moveSpeed,
			radAngle: radAngle
		};

	}
	t.update = function() {

		// Destroy.
		if (t.hp <= 0) {
			var index = orbitals.indexOf(t);
			orbitals[index] = orbitals[orbitals.length - 1];
			orbitals.length -= 1;
			if (t.orbit) {
				t.orbit.planet.orbitCache = null;
			}
		}

		// Update orbit.
		if (t.orbit) {
			var e = t.orbit;
			e.radAngle += e.moveSpeed;
			t.x = e.distance * Math.cos(e.radAngle) + e.planet.x;
			t.y = e.distance * Math.sin(e.radAngle) + e.planet.y;
		}

		// Update module is present and online.
		if (t.online) {
			t.module && t.module.update();
		}

	}
	t.render = function() {
		//renderTrail(t);
		t.module && t.module.render && t.module.render();
	}
	orbitals.push(t);
	return t;
};

Orbital.sun = function(color, size, x, y) {
	var t = Orbital(color, size, x, y, null, null, null, null);
	t.name = "The Sun";
	t.type = ORBITAL_TYPE.STAR;
	return t;
}

Orbital.planet = function(color, size, orbit, distance, moveSpeed, radAngle) {
	distance = Math.floor((distance + size / 2)/50)*50;
	var t = Orbital(color, size, 0, 0, orbit, distance, moveSpeed, radAngle);
	t.name = "Planet";
	if (orbit.type === ORBITAL_TYPE.PLANET) {
		t.name = "Moon";
		t.type = ORBITAL_TYPE.MOON;
	} else {
		t.type = ORBITAL_TYPE.PLANET;
	}
	//t.update = extend(t.update, function() {})
	return t;
}

Orbital.miningStation = function(orbit, distance, radAngle) {
	distance = Math.floor((distance || orbit.size * 3)/50)*50;
	var t = Orbital(getHSL(212, 100, 97), 2, 0, 0, orbit, distance, -0.005, null);
	t.name = "Mining Station";
	t.type = ORBITAL_TYPE.MINING;
	t.update = extend(t.update, function() {
		if (t.online) {
			Base.minerals += Base.mineRate;
		}
	});
	return t;
}

Orbital.satellite = function(orbit, distance, radAngle) {
	distance = Math.floor((distance || orbit.size * 5)/50)*50;
	var t = Orbital(getHSL(160, 100, 50), 2, 0, 0, orbit, distance, 0.01, radAngle);
	t.name = "Satellite";
	t.type = ORBITAL_TYPE.SATELLITE;
	t.cache = sprSatellite;
	t.update = extend(t.update, function() {
		if (t.online) {
			Base.energy += Base.energyRate;
		}
	});
	return t;
}

Orbital.defenseStation = function(orbit, distance, radAngle) {
	distance = Math.floor((distance || orbit.size * 7)/50)*50;
	var t = Orbital(getHSL(33, 100, 50), 2, 0, 0, orbit, distance, 0.005, radAngle);
	t.name = "Defense Platform";
	t.type = ORBITAL_TYPE.DEFENSE;
	t.cache = sprDefensePlatform;
	setModuleUpgrade(t, "laser", 1);
	return t;
}

/**
 * Sets the upgrade module for the given orbital.
 * @param {Object} station The station to set the module of.
 * @param {string} type	The type of the new module.
 * @param {number} level THe level of the new module.
 * @return {void}
 */
function setModuleUpgrade(station, type, level) {
	var impl = OrbitalUpgrades.impl(type);
	station.module = impl(station, level);
}

/**
 * Gets a list of orbitals of the given type.
 * @param {number} type The type of orbitals to find.
 * @return {Array} An array of orbitals. Could be empty.
 */
function getOrbitalsByType(type) {
	var arr = [];
	var len = orbitals.length;
	while (len--) {
		var orb = orbitals[len];
		if (type === orb.type) {
			arr.push(orb);
		}
	}
	return arr;
}
