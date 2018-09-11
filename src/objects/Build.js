var Build = (function() {

	var pending = false;
	var what;
	var on;
	var distance;
	var maxDistance;
	var module = 0;
	var multiplier = 20;
	var cost = 0;
	var spacing = 100;
	var proximity = 70;
	var valid = false;

	/***************************************************************************
	 * @return {void}
	 */
	function init() {
		what = null;
		on = null;
		distance = null;
		maxDistance = null;
		pending = false;
		valid = false;
	}

	/***************************************************************************
	 * @return {void}
	 */
	function update() {
		if (!on) {
			on = clickNearest(true);
			if (on) {
				maxDistance = on.size * multiplier;
			}
		} else if (Mouse.released) {
			Mouse.update();
			if (valid) {
				selectOrbitSize();
			}
		} else {
			var x = Mouse.vx;
			var y = Mouse.vy;
			var vec = Vector2D(x, y);
			var near = Orbital.nearest(x, y);
			distance = getDistance(on, vec);
			distance = distance > maxDistance ? maxDistance : distance;
			distance = Math.round(distance/spacing) * spacing;
			valid = getDistance(near, vec) >= proximity;
		}
	}

	/***************************************************************************
	 * @return {void}
	 */
	function render() {
		if (on) {
			ctx.lineWidth = 3;
			ctx.globalAlpha = 0.5;
			ctx.strokeStyle = valid ? "#0F0" : "#F00";
			ctx.beginPath();
			ctx.arc(on.x, on.y, distance, 0, TAU);
			ctx.stroke();
		}
	}

	/***************************************************************************
	 * With the target orbital already selected, this function positions the new
	 * orbital in orbit.
	 * @return {void}
	 */
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
				Orbital.setModuleUpgrade(c, module, 1);
				break;
		}
		c.update();
		Base.minerals -= cost;
		cost = 0;
		init()

		Tutorial.complete(TUTORIAL_EVENT.BUILD);

	}

	/***************************************************************************
	 * Setup building of a new orbital.
	 * @param {number} type ORBITAL_TYPE.
	 * @param {number} modType ORBITAL_MODULE_TYPE.
	 * @param {number} c How many minerals will this construction cost.
	 */
	function createBlueprint(type, modType, c) {
		pending = true;
		what = type;
		module = modType;
		cost = c;
	}

	// Export.
	return {
		get pending() { return pending; },
		createBlueprint: createBlueprint,
		update: update,
		render: render,
		init: init,
	}

})();
