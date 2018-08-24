//
var Gui = {

	update: function() {
		gui.updateAll();
	},

	render: function() {
		gui.renderAll();
		ctx.fillStyle = "#FFF";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "small-caps 700 32px monospace";
		ctx.fillText("next wave in", Canvas.width/2, 32);
		ctx.font = "700 64px monospace";
		ctx.fillText(~~(WaveManager.timer/60), Canvas.width/2, 96);
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
	t.onClick = function() {
		//must override
	}
	t.render = function() {
		//must override
	}
	t.show = function(param) {
		//must override
	}
	return t;
}

function createPop() {
	var t = gui(-Canvas.width / 4, 0, 300, 400, null);
	t.buttons.push(Buttons(t, 0, 0, 50, 50, 'Satellite', sprSatellite, function() {
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
			t.buttons.forEach(function(e) { if (clicked(e.x, e.y, e.w, e.h)) e.click(); });
		} else t.hide();
	}
	t.render = function() {
		ctx.fillStyle = '#141e28';
		ctx.fillRect(t.x - t.w / 2, t.y - t.h / 2, t.w, t.h);
		ctx.fillStyle = "#ffffff";
		ctx.textAlign = 'center';
		ctx.font = "24px monospace";
		ctx.fillText((base.planet === t.target ? 'Base' : '') + ' ' + t.target.name, t.x, t.y - t.h / 2 + 20);
		var image = t.target.cache;
		ctx.drawImage(image, t.x - image.width / 2, t.y - image.height / 2 - t.h / 4);
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
