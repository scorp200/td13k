//
var Gui = {

	x: 0,
	y: 0,
	elements: [],
	tooltip: "",
	selection: null,

	setup: function() {
		var center = Canvas.width/2;
		var bottom = Canvas.height;
		Gui.selection = createSelectionDisplay();
		Gui.elements = [
			Gui.selection,
			Button(Gui, center-24-60, bottom-64, 48, 48, "Build Satellite", null, buildSatellite),
			Button(Gui, center-24, bottom-64, 48, 48, "Build Mining Station", null, buildMiningStation),
			Button(Gui, center+24+12, bottom-64, 48, 48, "Build Defense Platform", null, buildDefensePlatform)
		];
	},

	update: function() {
		Gui.tooltip = "";
		Gui.elements.forEach(function(e) {
			e.update();
		});
	},

	render: function() {
		Gui.elements.forEach(function(e) {
			e.render();
		});

		// Wave counter.
		ctx.fillStyle = "#FFF";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "small-caps 700 32px monospace";
		ctx.fillText("next wave in", Canvas.width/2, 32);
		ctx.font = "700 64px monospace";
		ctx.fillText(~~(WaveManager.timer/60), Canvas.width/2, 96);

		// Minerals.
		ctx.font = "small-caps 700 32px monospace";
		ctx.fillText("minerals", Canvas.width/2+300, 64-16);
		ctx.fillText(~~Base.minerals, Canvas.width/2+300, 64+16);

		// Energy.
		ctx.font = "small-caps 700 32px monospace";
		ctx.fillText("energy", Canvas.width/2+600, 64-16);
		ctx.fillText(~~Base.energy, Canvas.width/2+600, 64+16);

		// Days.
		ctx.font = "small-caps 700 32px monospace";
		ctx.fillText("survived", Canvas.width/2-300, 64-16);
		ctx.fillText(WaveManager.currentWave + " waves", Canvas.width/2-300, 64+16);

		// Days.
		ctx.font = "small-caps 700 32px monospace";
		ctx.fillText("base status", Canvas.width/2-600, 64-16);
		ctx.fillText(~~Base.hp + "%", Canvas.width/2-600, 64+16);

		// Tooltip.
		ctx.font = "small-caps 700 24px monospace";
		ctx.fillText(Gui.tooltip, Canvas.width/2, Canvas.height-96);

	}

}

function buildSatellite() {
	speak("Select an area to build the satellite");
	gameState = STATE_CREATE;
	build = 'satellite';
}

function buildMiningStation() {
	speak("Select an area to build the mining station");
	gameState = STATE_CREATE;
	build = 'miningStation';
}

function buildDefensePlatform() {
	speak("Select an area to build the defense platform");
	gameState = STATE_CREATE;
	build = 'defenseStation';
}

Gui.setup();

function createSelectionDisplay() {

	var w = 360;
	var h = 120;
	var x = Canvas.width/2 - w/2;
	var y = Canvas.height-128 - h;
	var elements = [];

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
			ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
			ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
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
			ctx.drawImage(image, x+8, y+8, h-16, h-16);

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
