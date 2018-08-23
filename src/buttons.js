var Buttons = function(target, x, y, w, h, text) {
	var t = {};
	t.x = target.x + x;
	t.y = target.y + y;
	t.w = w;
	t.h = h;
	t.text = text;
	t.render = function() {
		ctx.fillRect(x - w / 2, y - h / 2, w, h);
	}
	t.click = function() {
		log('this button has been pressed');
	}
	return t;
}
