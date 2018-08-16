var Planet = function(color, size, x, y) {
	var t = this;
	t.orbits = [];
	t.x = x;
	t.y = y;
	t.update = function() {
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.arc(t.x, t.y, size, 0, cr);
		ctx.closePath();
		ctx.fill();
		t.orbits.forEach(function(e) {
			e.angle += e.speed;
			e.planet.x = e.distance * Math.cos(e.angle) + t.x;
			e.planet.y = e.distance * Math.sin(e.angle) + t.y;
		});

	};
	t.addOrbit = function(planet, distance, speed, angle = 0) {
		if (planet == t || (t.orbits.indexOf(planet) > -1)) return;
		t.orbits.push({ planet: planet, distance: distance, speed: speed, angle: angle });
	}
}
