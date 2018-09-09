var build = (function() {

	var pending = false;
	var what = null;
	var module = 0;
	var on = null;
	var multiplier = 20;
	var distance = null;
	var maxDistance = null;
	var cost = 0;
	var spacing = 100;
	var proximity = 70;
	var valid = false;

	function init() {
		what = null;
		on = null;
		distance = null;
		maxDistance = null;
	}

	function update() {
		if (!on) {
			on = clickNearest(true);
			if (on) {
				maxDistance = on.size * multiplier;
			}
		} else if (Mouse.released) {
			if (valid) {
				selectOrbitSize();
			}
			Mouse.update();
		} else {
			var x = Mouse.vx;
			var y = Mouse.vy;
			var vec = Vector2D(x, y);
			var near = nearestOrbital(x, y);
			distance = getDistance(on, vec);
			distance = distance > maxDistance ? maxDistance : distance;
			distance = Math.round(distance/spacing) * spacing;
			valid = getDistance(near, vec) >= proximity;
		}
	}

	function render() {
		if (on) {
			ctx.globalAlpha = 0.5;
			ctx.strokeStyle = valid ? "#0F0" : "#F00";
			ctx.beginPath();
			ctx.arc(on.x, on.y, distance, 0, TAU);
			ctx.lineWidth = 3;
			ctx.stroke();
		}
	}

	function selectOrbitSize() {
		var c;
		var vec = Vector2D(Mouse.vx, Mouse.vy);
		var radAngle = getAngle(vec, on);
		switch (what) {
			case (ORBITAL_TYPE.SATELLITE):
				c = Orbital.satellite(on, distance, radAngle);
				break;
			case (ORBITAL_TYPE.MINING):
				c = Orbital.miningStation(on, distance, radAngle);
				break;
			case (ORBITAL_TYPE.DEFENSE):
				c = Orbital.defenseStation(on, distance, radAngle);
				setModuleUpgrade(c, module, 1);
				break;
		}
		c.update();
		what = null;
		on = null;
		pending = false;
		Base.minerals -= cost;
		cost = 0;
		Tutorial.complete(TUTORIAL_EVENT.BUILD);
	}

	function setTarget() {

	}

	return {
		get pending() { return pending; },
		set pending(val) { pending = val; },
		set what(val) { what = val; },
		set module(val) { module = val; },
		set cost(val) { cost = val; },
		update: update,
		render: render,
		init: init,
	}
})();
