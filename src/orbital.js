//
var Orbital = (function() {

	var orbitals = [];

	OrbitalUpgrades.init();

	function create(color, size, x, y, orbit, distance, moveSpeed, radAngle) {
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
				moveSpeed: moveSpeed/2,
				radAngle: radAngle
			};

			t.orbit.moveSpeed /= t.orbit.distance / 100;

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
			t.module && t.module.render && t.module.render();
		}
		orbitals.push(t);
		return t;
	};

	function sun(color, size, x, y) {
		var t = create(color, size, x, y, null, null, null, null);
		t.name = "The Sun";
		t.type = ORBITAL_TYPE.STAR;
		return t;
	}

	function planet(color, size, orbit, distance, moveSpeed, radAngle) {
		var t = create(color, size, 0, 0, orbit, distance, moveSpeed, radAngle);
		if (orbit.type === ORBITAL_TYPE.PLANET) {
			t.name = "Moon";
			t.type = ORBITAL_TYPE.MOON;
		} else {
			t.name = "Planet";
			t.type = ORBITAL_TYPE.PLANET;
			t.orbit.moveSpeed /= t.orbit.distance / 10000;
		}
		return t;
	}

	function miningStation(orbit, distance, radAngle) {
		var t = create(getHSL(212, 100, 97), 2, 0, 0, orbit, distance, 0.01, radAngle);
		t.name = "Mining Station";
		t.type = ORBITAL_TYPE.MINING;
		t.cache = sprMiningStation;
		t.update = extend(t.update, function() {

			// Disable mineral gain if tutorial still active.
			if (!Tutorial.end) {
				return;
			}

			// Gain minerals. Only when online.
			if (t.online) {
				Base.minerals += Base.mineRate * clamp(1-distance/500, 0.1, 1);
			}

		});
		return t;
	}

	function satellite(orbit, distance, radAngle) {
		var t = create(getHSL(160, 100, 50), 2, 0, 0, orbit, distance, 0.01, radAngle);
		t.name = "Satellite";
		t.type = ORBITAL_TYPE.SATELLITE;
		t.cache = sprSatellite;
		t.update = extend(t.update, function() {

			// Disable energy gain if tutorial still active.
			if (!Tutorial.end) {
				return;
			}

			// Gain energy. Only when online.
			if (t.online) {
				Base.energy += Base.energyRate * clamp(1-distance/500, 0.1, 1);
			}

		});
		return t;
	}

	/***************************************************************************
	 * @return {Object} Orbital.
	 */
	function defenseStation(orbit, distance, radAngle) {
		var t = create(getHSL(33, 100, 50), 2, 0, 0, orbit, distance, 0.01, radAngle);
		t.name = "Defense Platform";
		t.type = ORBITAL_TYPE.DEFENSE;
		t.cache = sprDefensePlatform;
		setModuleUpgrade(t, ORBITAL_MODULE_TYPE.LASER, 1);
		return t;
	}

	/***************************************************************************
	 * Sets the upgrade module for the given orbital.
	 * @param {Object} station The station to set the module of.
	 * @param {number} type	ORBITAL_MODULE_TYPE.
	 * @param {number} level THe level of the new module.
	 * @return {void}
	 */
	function setModuleUpgrade(station, type, level) {
		var impl = OrbitalUpgrades.impl(type);
		station.module = impl(station, level);
	}

	/***************************************************************************
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

	/***************************************************************************
	 * @param {number} o Orbital type.
	 * @param {number=} m Module type.
	 * @return {string} The name.
	 */
	function getName(o, m) {
		switch (o) {
			case (ORBITAL_TYPE.SATELLITE): return "Satellite";
			case (ORBITAL_TYPE.MINING): return "Mining Station";
			case (ORBITAL_TYPE.DEFENSE):
				switch (m) {
					case (ORBITAL_MODULE_TYPE.LASER): return "Laser Platform";
					case (ORBITAL_MODULE_TYPE.BEAM): return "Beam Platform";
					case (ORBITAL_MODULE_TYPE.ROCKET): return "Rocket Platform";
					case (ORBITAL_MODULE_TYPE.EMP): return "EMP Platform";
					case (ORBITAL_MODULE_TYPE.LIGHTNING): return "Lightning Platform";
				}
		}
		return "";
	}

	/***************************************************************************
	 * @param {number} o Orbital type.
	 * @param {number=} m Module type.
	 * @return {number} The cost.
	 */
	function getCost(o, m) {
		switch (o) {
			case (ORBITAL_TYPE.SATELLITE): return 30;
			case (ORBITAL_TYPE.MINING): return 50;
			case (ORBITAL_TYPE.DEFENSE):
				switch (m) {
					case (ORBITAL_MODULE_TYPE.LASER): return 100;
					case (ORBITAL_MODULE_TYPE.BEAM): return 150;
					case (ORBITAL_MODULE_TYPE.ROCKET): return 200;
					case (ORBITAL_MODULE_TYPE.EMP): return 250;
					case (ORBITAL_MODULE_TYPE.LIGHTNING): return 300;
				}
		}
		return 0;
	}

	/***************************************************************************
	 * @param {number} x
	 * @param {number} y
	 * @return {Object} Orbital.
	 */
	 function nearest(x, y) {
		var pos = { x: x, y: y };
		var minDistance = 999999;
		var closest = orbitals[0];
		var i = orbitals.length;
		while (i--) {
			var distance = getDistance(orbitals[i], pos);
			if (distance < minDistance) {
				minDistance = distance;
				closest = i;
			}
		}
		return orbitals[closest];
	}

	//**************************************************************************
	// Export.
	return {
		orbitals: orbitals,
		sun: sun,
		planet: planet,
		satellite: satellite,
		miningStation: miningStation,
		defenseStation: defenseStation,
		setModuleUpgrade: setModuleUpgrade,
		getCost: getCost,
		getName: getName,
		nearest: nearest
	}

})();
