var gui = [];
var createPop = function() {
	var t = {};
	gui.push(t);
	t.display = false;
	t.w = 300;
	t.h = 600;
	t.target = null;
	t.show = function(planet) {
		log('test', planet.name);
		t.display = true;
		t.target = planet;
	}
	t.update = function() {
		// Mouse over
		var a = (Mouse.x - Canvas.width / 2);
		var b = (Mouse.y - Canvas.height / 2);
		if (a > -t.w / 2 && a < t.w / 2 && b > -t.h / 2 && b < t.h / 2) {
			if (Mouse.click) {
				log("DON'T LEAVE BLOCKS BLANK!");
			}
		} else if (Mouse.click) {
			t.target = null;
			t.display = false;
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
		ctx.fillText(t.target.name, 0, -t.h * 0.45);
		renderBody(t.target, 0, -t.h * 0.3);
	}
	return t;
}
