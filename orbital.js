var orbitals = [];
var Orbital = function(color, size, x, y, orbit, distance, speed, angle) {
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
		if (c < t.size) {
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

function extend(f1, f2) {
	return function() {
		f1();
		f2();
	}
}

Orbital.sun = function(color, size, x, y) {
	var t = Orbital(color, size, x, y, null, null, null);
	t.isSun = true;
	//t.update = function() {
		//fancy sun code
	//}
	return t;
}

Orbital.planet = function(color, size, orbit, distance, speed, angle = 0) {
	var t = Orbital(color, size, 0, 0, orbit, distance, speed, angle);
	t.update = extend(t.update, function() {

	})
	return t;
}
