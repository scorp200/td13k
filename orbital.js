var orbitals = [];
var coms = [];
var def = [];
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
		var a = Mouse.vx - t.x;
		var b = Mouse.vy - t.y;
		var c = Math.sqrt(a*a + b*b);
		if (c < t.size + buffer) {
			hoverName = t.name;
			if (Mouse.click && !pop.display) {
				Mouse.click = false;
				log('clicked ' + t.name);
				pop.show(t);
			}
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
		renderBody(t, t.x, t.y);
	}
	orbitals.push(t);
	return t;
};

Orbital.sun = function(color, size, x, y) {
	var t = Orbital(color, size, x, y, null, null, null);
	t.name = 'sun';
	t.isSun = true;
	return t;
}

Orbital.planet = function(color, size, orbit, distance, speed, angle = 0) {
	var t = Orbital(color, size, 0, 0, orbit, distance, speed, angle);
	t.name = 'planet';
	t.update = extend(t.update, function() {

	})
	return t;
}

Orbital.miningStation = function(orbit) {
	var angle = splitToMax(4, orbit, coms);
	if (angle === UNDEF)
		return;
	var t = Orbital('#f0f7ff', 2, 0, 0, orbit, orbit.size * 2, -0.005);
	t.update = extend(t.update, function() {
		minerals += 0.01;
	})
	return t;
}

Orbital.satellite = function(orbit) {
	var angle = splitToMax(3, orbit, coms);
	if (angle === UNDEF)
		return;
	var t = Orbital('#00ffab', 2, 0, 0, orbit, orbit.size * 3, 0.01, angle);
	t.name = 'satellite';
	t.index = coms.length;
	coms.push(t);
	t.render = extend(t.render, function() {
		for (var i = t.index; i < coms.length; i++) {
			var e = coms[i];
			if (e != t && getDistance(e, t) <= 400) {
				renderComLine(t, e);
			}
		}
	})
	return t;
}

Orbital.defenseStation = function(orbit) {
	var angle = splitToMax(2, orbit, def);
	if (angle === UNDEF)
		return;
	var t = Orbital('#ff8d00', 2, 0, 0, orbit, orbit.size * 4, 0.005, angle);
	t.name = 'defense';
	t.index = def.length;
	def.push(t);
	t.render = extend(t.render, function() {
		//code to kill dem enemies
	})
	return t;
}
