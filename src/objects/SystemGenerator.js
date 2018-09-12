var SystemGenerator = (function() {

	// Parameters.
	var minPlanets = 2;
	var maxPlanets = 5;
	var minDistance = 500;
	var maxDistance = 1000;
	var minSize = 20;
	var maxSize = 50;

	// Setup.
	var planetRange = maxPlanets - minPlanets;
	var distanceRange = maxDistance - minDistance;
	var sizeRange = maxSize - minSize;

	/***************************************************************************
	 * @return {Object} An object containing generated system's metrics.
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

			var col = getHSL(-1, 39, 62);
			var size = minSize + ~~(Math.random() * sizeRange);
			var spd = 0.003;
			var rot = Math.random() * TAU;
			var planet = Orbital.planet(col, size, star, dist, spd, rot);
			planets.push(planet);

			dist += ~~((minDistance + ~~(Math.random() * distanceRange))/100) * 100;

			// Generate moons.
			var numberOfMoons = 0 + ~~(Math.random() * 3);
			var mdist = 200;
			for (var m=0; m<numberOfMoons; m++) {
				var mcol = getHSL(-1, 39, 62);
				var msize =  ~~(size*0.1 +Math.random() * size*0.3);
				var mspd = 0.01;
				var mrot = Math.random() * TAU;
				var moon = Orbital.planet(mcol, msize, planet, mdist, mspd, mrot);
				mdist += 100;
			}

		}

		// Place base.
		Base.create(planets[0]);
		Orbital.miningStation(planets[0], 100, TAU * 0.33);
		Orbital.miningStation(planets[0], 100, TAU * 0.66);
		Orbital.miningStation(planets[0], 100, TAU * 0.99);

		//
		return {
			size: dist
		}

	}

	// Export.
	return {
		generate: generate
	}

})();
