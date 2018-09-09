var SystemGenerator = (function() {

	// Parameters.
	var minPlanets = 2;
	var maxPlanets = 9;
	var minDistance = 500;
	var maxDistance = 1000;

	// Setup.
	var planetRange = maxPlanets - minPlanets;
	var distanceRange = maxDistance - minDistance;

	/**
	 *
	 */
	function generate() {

		// Lists.
		var planets = [];

		// Generate star.
		var starColor = getHSL(60, 100, 50);
		var star = Orbital.sun(starColor, 100, 0, 0);

		// Generate Planets.
		var numberOfPlanets = minPlanets + ~~(Math.random() * planetRange);
		var dist = 1000;
		for (var n=0; n<numberOfPlanets; n++) {

			var col = getHSL(180, 39, 62);
			var size = 20;
			var spd = 0.003;
			var rot = Math.random() * TAU;
			var planet = Orbital.planet(col, size, star, dist, spd, rot);
			planets.push(planet);

			dist += minDistance + ~~(Math.random() * distanceRange);

		}

		// Place base.
		Base.create(planets[0]);
		Orbital.miningStation(planets[0], 100, TAU * 0.33);
		Orbital.miningStation(planets[0], 100, TAU * 0.66);
		Orbital.miningStation(planets[0], 100, TAU * 0.99);

	}

	// Export.
	return {
		generate: generate
	}

})();
