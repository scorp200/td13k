//
var Gui = {

	update: function() {
		gui.updateAll();
	},

	render: function() {
		gui.renderAll();

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

	}

}

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
	t.buttons.push(Buttons(t, 150-25, 200-25, 50, 50, 'Satellite', sprSatellite, function() {
		speak('choose a target');
		t.hide();
		//gameState = STATE_CREATE;
		//Create = Satellite.create;
	}));
	t.show = function(planet) {
		console.log("yo");
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
			t.buttons.forEach(function(e) { if (clicked(e.x, e.y, e.w, e.h)) e.click(); });
		} else t.hide();
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
