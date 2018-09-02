var build = (function() {
	var t = {};
	var t.what = null;
	var t.on = { x: 0 };
	var t.multiplier = 20;
	var t.distance = null;
	var t.maxDistance = null;

	t.init = function() {
		t.what = null;
		t.on = { x: 0 };
		t.distance = null;
		t.maxDistance = null;
	}

	t.update = function() {
		console.log(t.on == build.t.on);
		if (!t.on) {
			t.on = clickNearest();
			if (t.on)
				t.maxDistance = t.on.size * t.multiplier;
		} else if (Mouse.released) {
			selectOrbitSize();
		} else {
			t.distance = getDistance(t.on, { x: Mouse.vx, y: Mouse.vy });
			t.distance = t.distance > t.maxDistance ? t.maxDistance : t.distance;
		}
	}

	t.render = function() {
		if (t.on) {
			ctx.strokeStyle = "#0F0";
			ctx.beginPath();
			ctx.arc(t.on.x, t.on.y, t.distance, 0, TAU);
			ctx.lineWidth = 3;
			ctx.stroke();
		}
	}

	t.selectOrbitSize = function() {
		var c;
		var radAngle = getAngle({ x: Mouse.vx, y: Mouse.vy }, t.on);
		switch (t.what) {
			case (ORBITAL_TYPE.SATELLITE):
				c = Orbital.satellite(t.on, t.distance, radAngle);
				break;
			case (ORBITAL_TYPE.MINING):
				c = Orbital.miningStation(t.on, t.distance, radAngle);
				break;
			case (ORBITAL_TYPE.DEFENSE):
				c = Orbital.defenseStation(t.on, t.distance, radAngle);
				break;
		}
		t.what = null;
		t.on = null;
		gameState = GAME_STATE.RUNNING;
	}

	return t;
})();
