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
			Button(Gui, center-24-60, bottom-64, 48, 48, "Build Satellite", sprSatelliteIcon, buildSatellite),
			Button(Gui, center-24, bottom-64, 48, 48, "Build Mining Station", sprMiningStationIcon, buildMiningStation),
			Button(Gui, center+24+12, bottom-64, 48, 48, "Build Defense Platform", sprDefensePlatformIcon, buildDefensePlatform)
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
		ctx.fillStyle = "#FFF";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

		ctx.font = "700 48px monospace";
		ctx.fillText(~~(WaveManager.timer/60), Canvas.width/2, 96);

        ctx.font = "small-caps 700 24px monospace";
		ctx.fillText("next wave in", Canvas.width/2, 48);

		// Minerals.
		ctx.fillText("minerals", Canvas.width/2+300*scale, 64-16);
		ctx.fillText(~~Base.minerals, Canvas.width/2+300*scale, 64+16);

		// Energy.
		ctx.fillText("energy", Canvas.width/2+600*scale, 64-16);
		ctx.fillText(~~Base.energy, Canvas.width/2+600*scale, 64+16);

		// Days.
		ctx.fillText("survived", Canvas.width/2-300*scale, 64-16);
		ctx.fillText(WaveManager.currentWave + " waves", Canvas.width/2-300*scale, 64+16);

		// Base health.
		ctx.fillText("base status", Canvas.width/2-600*scale, 64-16);
		ctx.fillText(~~Base.planet.hp + "%", Canvas.width/2-600*scale, 64+16);

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
		ctx.font = "small-caps 500 8px monospace";
		ctx.fillText("FPS: " + Fps.fps, 10, 20);

	}

}

function buildSatellite() {
	speak("Select an area to build the satellite");
	gameState = GAME_STATE.CREATE;
	build.what = ORBITAL_TYPE.SATELLITE;//'satellite';
}

function buildMiningStation() {
	speak("Select an area to build the mining station");
	gameState = GAME_STATE.CREATE;
	build.what = ORBITAL_TYPE.MINING;//'miningStation';
}

function buildDefensePlatform() {
	speak("Select an area to build the defense platform");
	gameState = GAME_STATE.CREATE;
	build.what = ORBITAL_TYPE.DEFENSE;//'defenseStation';
}

Gui.setup();

function createSelectionDisplay() {

	// Positioning.
	var w = 360;
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
