//
var Gui = (function() {

	var pos = Vector2D(0, 0);
	var elements = [];
	var tooltip = "";
	var selection;
	var subtitles = [];

	/***************************************************************************
	 * @return {void}
	 */
	function setup() {
		var center = Canvas.width/2;
		var bottom = Canvas.height;
		selection = createSelectionDisplay();
		elements = [
			selection,
			Button(pos, center-24-180, bottom-64, 48, 48, "Satellite (" + Orbital.getCost(ORBITAL_TYPE.SATELLITE, undefined) + " minerals)", sprSatelliteIcon, buildOrbital.bind(null, ORBITAL_TYPE.SATELLITE, undefined)),
			Button(pos, center-24-120, bottom-64, 48, 48, "Mining Station (" + Orbital.getCost(ORBITAL_TYPE.MINING, undefined) + " minerals)", sprMiningStationIcon, buildOrbital.bind(null, ORBITAL_TYPE.MINING, undefined)),
			Button(pos, center-24-60, bottom-64, 48, 48, "Laser Platform (" + Orbital.getCost(ORBITAL_TYPE.DEFENSE, ORBITAL_MODULE_TYPE.LASER) + " minerals)", sprDefensePlatformIcon, buildOrbital.bind(null, ORBITAL_TYPE.DEFENSE, ORBITAL_MODULE_TYPE.LASER)),
			Button(pos, center-24, bottom-64, 48, 48, "Beam Platform (" + Orbital.getCost(ORBITAL_TYPE.DEFENSE, ORBITAL_MODULE_TYPE.BEAM) + " minerals)", sprBeamPlatformIcon, buildOrbital.bind(null, ORBITAL_TYPE.DEFENSE, ORBITAL_MODULE_TYPE.BEAM)),
			Button(pos, center+24+12, bottom-64, 48, 48, "Rocket Platform (" + Orbital.getCost(ORBITAL_TYPE.DEFENSE, ORBITAL_MODULE_TYPE.ROCKET) + " minerals)", sprRocketPlatformIcon, buildOrbital.bind(null, ORBITAL_TYPE.DEFENSE, ORBITAL_MODULE_TYPE.ROCKET)),
			Button(pos, center+24+72, bottom-64, 48, 48, "EMP Platform (" + Orbital.getCost(ORBITAL_TYPE.DEFENSE, ORBITAL_MODULE_TYPE.EMP) + " minerals)", sprEmpPlatformIcon, buildOrbital.bind(null, ORBITAL_TYPE.DEFENSE, ORBITAL_MODULE_TYPE.EMP)),
			Button(pos, center+24+132, bottom-64, 48, 48, "Lighting Platform (" + Orbital.getCost(ORBITAL_TYPE.DEFENSE, ORBITAL_MODULE_TYPE.LIGHTNING) + " minerals)", sprLightningPlatformIcon, buildOrbital.bind(null, ORBITAL_TYPE.DEFENSE, ORBITAL_MODULE_TYPE.LIGHTNING))
		];
	}

	/***************************************************************************
	 * @return {void}
	 */
	function update() {
		tooltip = "";
		elements.forEach(function(e) {
			e.update();
		});

		var n = subtitles.length;
		while (n--) {
			var sub = subtitles[n];
			if (!sub.time--) {
				subtitles.splice(n, 1);
			}
		}

	}

	/***************************************************************************
	 * @return {void}
	 */
	function render() {

		// Render attached elements.
		elements.forEach(function(e) {
			e.render();
		});

		//
		var cx = Canvas.width / 2;
		var scale = clamp(Canvas.width / 1920, 0.5, 1);

		// Wave counter.
		ctx.globalAlpha = 1;
		ctx.fillStyle = "#FFF";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";

		ctx.font = "700 48px monospace";
		ctx.fillText(~~(WaveManager.timer/60), Canvas.width/2, 96);

		ctx.font = "small-caps 700 24px monospace";
		ctx.fillText("next wave in", cx, 48);

		// Minerals.
		ctx.fillText("minerals", cx+300*scale, 48);
		ctx.fillText(~~Base.minerals, cx+300*scale, 80);

		// Energy.
		ctx.fillText("energy", cx+600*scale, 48);
		ctx.fillText(~~Base.energy, cx+600*scale, 80);

		// Days.
		ctx.fillText("survived", cx-300*scale, 48);
		ctx.fillText(WaveManager.currentWave + " waves", cx-300*scale, 80);

		// Base health.
		ctx.fillText("base status", cx-600*scale, 48);
		ctx.fillText(~~Base.planet.hp + "%", cx-600*scale, 80);

		// Tooltip.
		ctx.font = "small-caps 700 16px monospace";
		ctx.fillText(tooltip, cx, Canvas.height-96);

		// Subtitles.
		ctx.textAlign = "left";
		ctx.textBaseline = "bottom";
		var dy = 20;
		subtitles.forEach(function(sub) {
			ctx.fillText('"' + sub.text + '"', 20, Canvas.height-dy);
			dy += 20;
		});

		// Tutorial
		Tutorial.render();

		// FPS.
		ctx.textAlign = "left";
		ctx.textBaseline = "bottom";
		ctx.font = "small-caps 500 12px monospace";
		ctx.fillText("FPS: " + Fps.fps, 10, 26);

		// Pause status.
		var offset = gameState === GAME_STATE.PAUSED ? 0 : 80;
		ctx.drawImage(sprPauseIcon, offset, 0, 80, 80, Canvas.width-90, 30, 60, 60);

	}

	/***************************************************************************
	 * @param {string} text
	 * @param {number} time
	 * @return {void}
	 */
	function addSubtitles(text, time) {
		subtitles.push({
			text: text,
			time: time
		});
	}

	/***************************************************************************
	 * @param {string} text
	 * @return {void}
	 */
	function setTooltip(text) {
		tooltip = text;
	}

	/***************************************************************************
	 * @param {Object} t Orbital.
	 * @param {Object=} v Vector2D.
	 * @return {void}
	 */
	function setSelectionTarget(t, v) {
		selection.target = t;
		if (typeof v !== "undefined") {
			selection.openAt(v.x, v.y);
		}
	}

	/***************************************************************************
	 * @param {number} type ORBITAL_TYPE.
	 * @param {number=} modType ORBITAL_MODULE_TYPE.
	 * @param {boolean=} check Check if affordable, or select.
	 * @return {boolean}
	 */
	function buildOrbital(type, modType, check) {
		var cost = Orbital.getCost(type, modType);
		if (check) {
			return Base.minerals >= cost;
		} else {
			var name = Orbital.getName(type, modType);
			speak("Select an area to build the " + name);
			Build.createBlueprint(type, modType, cost);
			return false;
		}
	}

	function createSelectionDisplay() {

		// Positioning.
		var w = 426;
		var h = 120;
		var x = Canvas.width/2 - w/2;
		var y = Canvas.height-128 - h;
		var elements = [];

		// Styling.
		var backgroundColor = "rgba(0,0,0,0.5)";
		var borderColor = "#FFF";
		var borderWidth = 2;

		var object = {

			x: x,
			y: y,
			target: null,

			update: function() {
				if (object.target === null) return;
				elements.forEach(function(e) {
					e.update();
				});
			},

			render: function() {
				if (object.target === null) return;

				// Background.
				ctx.fillStyle = backgroundColor;
				ctx.strokeStyle = borderColor;
				ctx.lineWidth = borderWidth;
				ctx.fillRect(x, y, w, h);
				ctx.strokeRect(x, y, w, h);

				// Name.
				ctx.fillStyle = "#fff";
				ctx.textAlign = "left";
				ctx.textBaseline = "top";
				ctx.font = "16px monospace";
				var text = (Base.planet === object.target ? 'Base' : '') + '' + object.target.name;
				ctx.fillText(text, x+h, y+16);

				// Image.
				var image = object.target.cache;
				var scale = Math.max(image.width, image.height) / (h-16);
				var imgx = x+8+(h-16)/2-image.width/scale/2;
				var imgy = y+8+(h-16)/2-image.height/scale/2;
				ctx.drawImage(image, imgx, imgy, image.width/scale, image.height/scale);

				// Buttons.
				elements.forEach(function(e) {
					e.render();
				});

			},

			// Open the panel at a particular location.
			// Currently assigns to 2 different coords, FIX.
			openAt: function(nx, ny) {
				object.x = x = nx;
				object.y = y = ny;
			},

			// Adds buttons from upgrade objects.
			addButtons: function(arr) {
				elements.length = 0;
				var xOffset = h + 8;
				arr.forEach(function(upgrade) {
					var text = upgrade.text;
					var img = upgrade.img;
					var func = upgrade.func;
					var speech = upgrade.speech;
					elements.push(Button(object, xOffset, h-60, 48, 48, text, img, func, speech));
					xOffset += 60;
				});
			}

		}

		return object;
	}

	//**************************************************************************
	// Export.
	return {
		setup: setup,
		update: update,
		render: render,
		addSubtitles: addSubtitles,
		setSelectionTarget: setSelectionTarget,
		setTooltip: setTooltip
	}

})();
