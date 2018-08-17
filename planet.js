var Planet = function(color, size, x, y) {
	var t = this;
	t.orbit = null;
	t.x = x;
	t.y = y;
	t.color = color;
	t.size = size;
	t.update = function() {
		if (t.orbit) {
			var e = t.orbit;
			e.angle += e.speed;
			t.x = e.distance * Math.cos(e.angle) + e.planet.x;
			t.y = e.distance * 0.5 * Math.sin(e.angle) + e.planet.y;
		}
	};
	t.render = function() {
		renderOrbit(t);
		renderBody(t);
	}
	t.addOrbit = function(planet, distance, speed, angle = 0) {
		if (planet == t || t.orbit) return;
		t.orbit = {
			planet: planet,
			distance: distance,
			speed: speed,
			angle: angle
		};
	}
}
