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
			selectOrbitSize();
			Mouse.update();
		} else {
			distance = getDistance(on, { x: Mouse.vx, y: Mouse.vy });
			distance = distance > maxDistance ? maxDistance : distance;
			distance = Math.round(distance/spacing) * spacing;
		}
	}

	function render() {
		if (on) {
			ctx.globalAlpha = 0.5;
			ctx.strokeStyle = "#0F0";
			ctx.beginPath();
			ctx.arc(on.x, on.y, distance, 0, TAU);
			ctx.lineWidth = 3;
			ctx.stroke();
		}
	}

	function selectOrbitSize() {
		var c;
		var radAngle = getAngle({ x: Mouse.vx, y: Mouse.vy }, on);
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
