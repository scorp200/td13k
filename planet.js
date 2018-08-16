var Planet = function(color, size, x, y) {
	var t = this;
	t.orbits = [];
	t.x = x;
	t.y = y;
	t.color = color;
	t.size = size;
	t.update = function() {
		t.orbits.forEach(function(e) {
			e.angle += e.speed;
			e.planet.x = e.distance * Math.cos(e.angle) + t.x;
			e.planet.y = e.distance * Math.sin(e.angle) + t.y;
		});

	};
	t.render = function() {
		renderOrb(t);
	}
	t.addOrbit = function(planet, distance, speed, angle = 0) {
		if (planet == t || (t.orbits.indexOf(planet) > -1)) return;
		t.orbits.push({ planet: planet, distance: distance, speed: speed, angle: angle });
	}
}
