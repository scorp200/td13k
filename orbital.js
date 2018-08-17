var Orbital = function(color, size, x, y, orbit, distance, speed, angle = 0) {
	var t = {};
	t.x = x;
	t.y = y;
	t.color = color;
	t.size = size;
	if (orbit)
		t.orbit = {
			planet: orbit,
			distance: distance,
			speed: speed,
			angle: angle
		};
	t.update = function() {
		if (t.orbit) {
			var e = t.orbit;
			e.angle += e.speed;
			t.x = e.distance * Math.cos(e.angle) + e.planet.x;
			t.y = e.distance * 0.5 * Math.sin(e.angle) + e.planet.y;
		}
	}
	t.render = function() {
		renderOrbit(t);
		renderBody(t);
	}
	return t;
};

Orbital.sun = function(color, size, x, y) {
	var t = Orbital(color, size, x, y, null, null, null);
	t.update = function() {
		//fancy sun code
	}
	return t;
}

Orbital.planet = function(color, size, orbit, distance, speed, angle = 0) {
	var t = Orbital(color, size, 0, 0, orbit, distance, speed, angle);
	return t;
}
