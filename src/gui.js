//
var Gui = {

	x: 0,
	y: 0,
	elements: [],
	tooltip: "",

	setup: function() {
		var center = Canvas.width/2;
		var bottom = Canvas.height;
		Gui.elements = [
			Button(Gui, center-24-60, bottom-64, 48, 48, "Build Satellite", null, buildSatellite),
			Button(Gui, center-24, bottom-64, 48, 48, "Build Mining Station", null, buildMiningStation),
			Button(Gui, center+24+12, bottom-64, 48, 48, "Build Defense Platform", null, buildDefensePlatform)
		];
	},

	update: function() {
		Gui.tooltip = "";
		gui.updateAll();
		Gui.elements.forEach(function(e) {
			e.update();
		});
	},

	render: function() {
		gui.renderAll();
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
		ctx.fillText(~~base.minerals, Canvas.width/2+300, 64+16);

		// Energy.
		ctx.font = "small-caps 700 32px monospace";
		ctx.fillText("energy", Canvas.width/2+600, 64-16);
		ctx.fillText(~~base.energy, Canvas.width/2+600, 64+16);

		// Days.
		ctx.font = "small-caps 700 32px monospace";
		ctx.fillText("survived", Canvas.width/2-300, 64-16);
		ctx.fillText(WaveManager.currentWave + " waves", Canvas.width/2-300, 64+16);

		// Tooltip.
		ctx.font = "small-caps 700 24px monospace";
		ctx.fillText(Gui.tooltip, Canvas.width/2, Canvas.height-96);

	}

}

function buildSatellite() {
	speak("Select an area to build the satellite");
}

function buildMiningStation() {
	speak("Select an area to build the mining station");
}

function buildDefensePlatform() {
	speak("Select an area to build the defense platform");
}

Gui.setup();

// Change to guiElement? So Gui can cover a broader aspect.
var guis = [];

function gui(x, y, width, height, cache) {
	var t = {};
	guis.push(t);
	t.x = x;
	t.y = y;
	t.w = width;
	t.h = height;
	t.cache = cache;
	t.display = false;
	t.buttons = [];
	t.update = function() {
		if (t.display && Mouse.click) {
			t.onClick();
		}
	}
	t.onClick = function() {}
	t.render = function() {}
	t.show = function(param) {}
	return t;
}

function createPop() {
	var t = gui(Canvas.width/2-150, Canvas.height/2-200, 300, 400, null);
	t.buttons.push(Button(t, 150-25, 200-25, 50, 50, 'Satellite', sprSatellite, function() {
		speak('choose a target');
		t.hide();
		//gameState = STATE_CREATE;
		//Create = Satellite.create;
	}));
	t.show = function(planet) {
		Mouse.target = t;
		t.display = true;
		t.target = planet;
	}
	t.hide = function() {
		t.target = null;
		t.display = false;
		Mouse.target = null;
	}
	t.onClick = function() {
		if (Mouse.target == t && clicked(t.x, t.y, t.w, t.h)) {
			t.buttons.forEach(function(e) { e.update(); });
		} else {
			t.hide();
		}
	}
	t.render = function() {

		// Background.
		ctx.fillStyle = '#141e28';
		ctx.fillRect(t.x, t.y, t.w, t.h);

		// Name.
		ctx.fillStyle = "#fff";
		ctx.textAlign = 'center';
		ctx.font = "24px monospace";
		var text = (base.planet === t.target ? 'Base' : '') + ' ' + t.target.name;
		ctx.fillText(text, t.x+t.w/2, t.y + 20);

		// Image.
		var image = t.target.cache;
		ctx.drawImage(image, t.x+t.w/2 - image.width / 2, t.y+100-image.height/2);

		// Buttons.
		t.buttons.forEach(function(e) { e.render(); });

	}
	return t;
}

gui.updateAll = function() {
	var n = guis.length;
	while (n--) {
		guis[n].update();
	}
}

gui.renderAll = function() {
	var n = guis.length;
	while (n--) {
		(guis[n].display) && guis[n].render();
	}
}
