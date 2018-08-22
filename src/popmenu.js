var gui = [];
var createPop = function() {
	var t = {};
	gui.push(t);
	t.display = false;
	t.w = 300;
	t.h = 400;
	t.target = null;
	t.show = function(planet) {
		if (!Mouse.drag && !pop.display && planet.type == 'planet') {
			t.display = true;
			t.target = planet;
		}
	}
	t.update = function() {
		if (!t.display)
			return;
		// Mouse over
		var a = (Mouse.x - Canvas.width / 2);
		var b = (Mouse.y - Canvas.height / 2);
		if (Mouse.click) {
			if (a > -t.w / 2 && a < t.w / 2 && b > -t.h / 2 && b < t.h / 2) {
				log('logged menu');
			} else {
				t.target = null;
				t.display = false;
			}
		}
	}
	t.render = function() {
		if (!t.display)
			return;
		ctx.fillStyle = '#141e28';
		ctx.fillRect(-t.w / 2, -t.h / 2, t.w, t.h);
		ctx.fillStyle = "#ffffff";
		ctx.textAlign = 'center';
		ctx.font = "24px monospace";
		ctx.fillText((base.planet === t.target ? 'Base' : '') + ' ' + t.target.name, 0, -t.h / 2 + 20);
		var image = t.target.cache;
		ctx.drawImage(image, -image.width/2, -image.height/2);
	}
	return t;
}
