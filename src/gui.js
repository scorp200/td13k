//
var Gui = {

	x: 0,
	y: 0,
	elements: [],
	tooltip: "",
	selection: null,
	subtitles: [],

	setup: function() {
		var center = Canvas.width/2;
		var bottom = Canvas.height;
		Gui.selection = createSelectionDisplay();
		Gui.elements = [
			Gui.selection,
			Button(Gui, center-24-180, bottom-64, 48, 48, "Satellite", sprSatelliteIcon, buildSatellite),
			Button(Gui, center-24-120, bottom-64, 48, 48, "Mining Station", sprMiningStationIcon, buildMiningStation),
			Button(Gui, center-24-60, bottom-64, 48, 48, "Laser Platform", sprDefensePlatformIcon, buildLaserPlatform),
			Button(Gui, center-24, bottom-64, 48, 48, "Beam Platform", sprBeamPlatformIcon, buildBeamPlatform),
			Button(Gui, center+24+12, bottom-64, 48, 48, "Missle Platform", sprRocketPlatformIcon, buildRocketPlatform),
			Button(Gui, center+24+72, bottom-64, 48, 48, "EMP Platform", sprEmpPlatformIcon, buildEmpPlatform),
			Button(Gui, center+24+132, bottom-64, 48, 48, "Lighting Platform", sprLightningPlatformIcon, buildLightningPlatform)
		];
	},

	update: function() {
		Gui.tooltip = "";
		Gui.elements.forEach(function(e) {
			e.update();
		});

		var n = Gui.subtitles.length;
		while (n--) {
			var sub = Gui.subtitles[n];
			if (!sub.time--) {
				Gui.subtitles.splice(n, 1);
			}
		}

	},

	render: function() {

		// Render attached elements.
		Gui.elements.forEach(function(e) {
			e.render();
		});

		//
		var scale = clamp(Canvas.width / 1920, 0.5, 1);

		// Wave counter.
		ctx.globalAlpha = 1;
		ctx.fillStyle = "#FFF";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

		ctx.font = "700 48px monospace";
		ctx.fillText(~~(WaveManager.timer/60), Canvas.width/2, 96);

        ctx.font = "small-caps 700 24px monospace";
		ctx.fillText("next wave in", Canvas.width/2, 48);

		// Minerals.
		ctx.fillText("minerals", Canvas.width/2+300*scale, 48);
		ctx.fillText(~~Base.minerals, Canvas.width/2+300*scale, 80);

		// Energy.
		ctx.fillText("energy", Canvas.width/2+600*scale, 48);
		ctx.fillText(~~Base.energy, Canvas.width/2+600*scale, 80);

		// Days.
		ctx.fillText("survived", Canvas.width/2-300*scale, 48);
		ctx.fillText(WaveManager.currentWave + " waves", Canvas.width/2-300*scale, 80);

		// Base health.
		ctx.fillText("base status", Canvas.width/2-600*scale, 48);
		ctx.fillText(~~Base.planet.hp + "%", Canvas.width/2-600*scale, 80);

		// Tooltip.
		ctx.font = "small-caps 700 16px monospace";
		ctx.fillText(Gui.tooltip, Canvas.width/2, Canvas.height-96);

		// Subtitles.
		ctx.textAlign = "left";
        ctx.textBaseline = "bottom";
		var dy = 20;
		Gui.subtitles.forEach(function(sub) {
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

}

function buildSatellite(check) {
	var cost = getCost(ORBITAL_TYPE.SATELLITE, "zap");
	if (check) {
		return Base.minerals >= cost;
	} else {
		speak("Select an area to build the satellite");
		build.pending = true;
		build.what = ORBITAL_TYPE.SATELLITE;
		build.cost = cost;
	}
}

function buildMiningStation(check) {
	var cost = getCost(ORBITAL_TYPE.MINING);
	if (check) {
		return Base.minerals >= cost;
	} else {
		speak("Select an area to build the mining station");
		build.pending = true;
		build.what = ORBITAL_TYPE.MINING;
		build.cost = cost;
	}
}

function buildLaserPlatform(check) {
	var cost = getCost(ORBITAL_TYPE.DEFENSE, "laser");
	if (check) {
		return Base.minerals >= cost;
	} else {
		speak("Select an area to build the defense platform");
		build.pending = true;
		build.what = ORBITAL_TYPE.DEFENSE;
		build.module = "laser";
		build.cost = cost;
	}
}

function buildBeamPlatform(check) {
	var cost = getCost(ORBITAL_TYPE.DEFENSE, "beam");
	if (check) {
		return Base.minerals >= cost;
	} else {
		speak("Select an area to build the defense platform");
		build.pending = true;
		build.what = ORBITAL_TYPE.DEFENSE;
		build.module = "beam";
		build.cost = cost;
	}
}

function buildRocketPlatform(check) {
	var cost = getCost(ORBITAL_TYPE.DEFENSE, "rocket");
	if (check) {
		return Base.minerals >= cost;
	} else {
		speak("Select an area to build the defense platform");
		build.pending = true;
		build.what = ORBITAL_TYPE.DEFENSE;
		build.module = "rocket";
		build.cost = cost;
	}
}

function buildEmpPlatform(check) {
	var cost = getCost(ORBITAL_TYPE.DEFENSE, "slow");
	if (check) {
		return Base.minerals >= cost;
	} else {
		speak("Select an area to build the defense platform");
		build.pending = true;
		build.what = ORBITAL_TYPE.DEFENSE;
		build.module = "slow";
		build.cost = cost;
	}
}

function buildLightningPlatform(check) {
	var cost = getCost(ORBITAL_TYPE.DEFENSE, "zap");
	if (check) {
		return Base.minerals >= cost;
	} else {
		speak("Select an area to build the defense platform");
		build.pending = true;
		build.what = ORBITAL_TYPE.DEFENSE;
		build.module = "zap";
		build.cost = cost;
	}
}

Gui.setup();

function createSelectionDisplay() {

	// Positioning.
	var w = 426;
	var h = 120;
	var x = Canvas.width/2 - w/2;
	var y = Canvas.height-128 - h;
	var elements = [];

	// Styling.
	var backgroundColor = "rgba(0, 0, 0, 0.5)";
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
