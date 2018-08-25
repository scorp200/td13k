var Buttons = function(parent, x, y, w, h, text, cache, onClick) {
	var t = {
		x: parent.x + x,
		y: parent.y + y,
		w: w,
		h: h,
		text: text,
		click: onClick,
		render: function() {
			ctx.fillRect(t.x, t.y, w, h);
			if (cache) {
				ctx.drawImage(cache, t.x, t.y, t.w, t.h);
			}
		}
	}
	return t;
}
