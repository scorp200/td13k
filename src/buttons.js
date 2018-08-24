var Buttons = function(target, x, y, w, h, text, cache, onClick) {
	var t = {};
	t.x = target.x - x;
	t.y = target.y - y;
	t.w = w;
	t.h = h;
	t.text = text;
	t.render = function() {
		ctx.fillRect(t.x - w / 2, t.y - h / 2, w, h);
		if (cache)
			ctx.drawImage(cache, t.x - cache.width / 2, t.y - cache.height / 2);
	}
	t.click = onClick;
	return t;
}
