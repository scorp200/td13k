var Orbital = {};

Orbital.sun = function(color, size, x, y) {
	var t = {};
	t.x = x;
	t.y = y;
	t.color = color;
	t.size = size;
	t.update = function() {
		//fancy sun code
	}
	t.render = function() {
		renderOrbit(t);
		renderBody(t);
	}
	return t;
}

Orbital.planet = function(color, size, orbit, distance, speed, angle = 0) {
	var t = Orbital.sun(color, size, 300, 300);
	t.orbit = {
		planet: orbit,
		distance: distance,
		speed: speed,
		angle: angle
	};
	t.update = function() {
		var e = t.orbit;
		e.angle += e.speed;
		t.x = e.distance * Math.cos(e.angle) + e.planet.x;
		t.y = e.distance * 0.5 * Math.sin(e.angle) + e.planet.y;
	}
	return t;
}
