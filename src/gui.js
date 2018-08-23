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
		if (Mouse.click) {
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
	var t = gui(0, 0, 300, 400);
	t.buttons.push(Buttons(t, 0, 0, 50, 50, 'Satellite'));
	t.show = function(planet) {
		if (!Mouse.drag && !pop.display && planet.type == 'planet') {
			t.display = true;
			t.target = planet;
		}
	}
	t.onClick = function() {
		if (clicked(t.x, t.y, t.w, t.h)) {
			t.buttons.forEach(function(e) { if (clicked(e.x, e.y, e.w, e.h)) e.click(); });
		} else {
			t.target = null;
			t.display = false;
		}
	}
	t.render = function() {
		ctx.fillStyle = '#141e28';
		ctx.fillRect(-t.w / 2, -t.h / 2, t.w, t.h);
		ctx.fillStyle = "#ffffff";
		ctx.textAlign = 'center';
		ctx.font = "24px monospace";
		ctx.fillText((base.planet === t.target ? 'Base' : '') + ' ' + t.target.name, 0, -t.h / 2 + 20);
		var image = t.target.cache;
		ctx.drawImage(image, t.x - image.width / 2, t.y - image.height / 2 - t.h / 4);
		t.buttons.forEach(function(e) { e.render(); });
	}
	return t;
}
