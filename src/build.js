var build = (function() {
	var t = {};
	var what = null;
	var on = null;
	var multiplier = 20;
	var distance = null;
	var maxDistance = null;

	function init() {
		what = null;
		on = null;
		distance = null;
		maxDistance = null;
	}

	function update() {
		console.log(on == build.on);
		if (!on) {
			clickNearest();
		} else if (Mouse.released) {
			selectOrbitSize();
		} else {
			distance = getDistance(on, { x: Mouse.vx, y: Mouse.vy });
			distance = distance > maxDistance ? maxDistance : distance;
		}
	}

	function render() {
		if (on) {
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
				break;
		}
		what = null;
		on = null;
		gameState = GAME_STATE.RUNNING;
	}

	return {
		get what() { return what },
		set what(val) { what = val },
		get on() { return on },
		set on(val) { on = val },
		get distance() { return distance },
		set distance(val) { distance = val },
		get maxDistance() { return maxDistance },
		set maxDistance(val) { maxDistance = val },
		get multiplier() { return multiplier },
		update: update,
		render: render,
		init: init,
	}
})();
