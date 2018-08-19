var orbitals = [];
var coms = [];
var buffer = 5;
var Orbital = function(color, size, x, y, orbit, distance, speed, angle = 0) {
	if (angle === UNDEF) angle = 0;
	var t = {};
	t.name = "Some Shithole Planet";
	t.x = x;
	t.y = y;
	t.color = color;
	t.size = size;
	t.isSun = false;
	if (orbit)
		t.orbit = {
			planet: orbit,
			distance: distance,
			speed: speed,
			angle: angle
		};
	t.update = function() {

		// Mouse over
		var a = (Mouse.x - Canvas.width / 2) - t.x;
		var b = (Mouse.y - Canvas.height / 2) - t.y;
		var c = Math.sqrt(a * a + b * b);
		if (c < t.size + buffer) {
			hoverName = t.name;
			console.log("mouse over");
		}

		if (t.orbit) {
			var e = t.orbit;
			e.angle += e.speed;
			t.x = e.distance * Math.cos(e.angle) + e.planet.x;
			t.y = e.distance * 0.5 * Math.sin(e.angle) + e.planet.y;
		}
	}
	t.render = function() {
		renderOrbit(t);
		renderTrail(t);
		renderBody(t);
	}
	orbitals.push(t);
	return t;
};

Orbital.sun = function(color, size, x, y) {
	var t = Orbital(color, size, x, y, null, null, null);
	t.isSun = true;
	return t;
}

Orbital.planet = function(color, size, orbit, distance, speed, angle = 0) {
	var t = Orbital(color, size, 0, 0, orbit, distance, speed, angle);
	t.update = extend(t.update, function() {

	})
	return t;
}

Orbital.miningStation = function(orbit) {
	var t = Orbital('#f0f7ff', 2, 0, 0, orbit, 30, 0.005);
	t.update = extend(t.update, function() {
		minerals += 0.01;
	})
	return t;
}

Orbital.satellite = function(orbit) {
	var angle = 0;
	coms.forEach(function(e) {
		if (e.name == 'satellite' && e != t && e.orbit.planet == orbit) {
			angle = e.orbit.angle + cr / 3;
		}
		return;
	});
	var t = Orbital('#00ffab', 2, 0, 0, orbit, orbit.size * 3, 0.005, angle);
	t.name = 'satellite';
	t.index = coms.length;
	coms.push(t);
	t.render = extend(t.render, function() {
		for (var i = t.index; i < coms.length; i++) {
			var e = coms[i];
			if (e != t && getDistance(e, t) <= 300)
				renderComLine(t, e);
		}
	})
	return t;
}
