var Button = function(parent, x, y, w, h, text, img, onClick) {

	var x = parent.x + x;
	var y = parent.y + y;
	var w = w;
	var h = h;
	var text = text;

	return {

		update: function() {
			if (Mouse.overRegion(x, y, w, h)) {
				Gui.tooltip = text;
				if (Mouse.click) {
					onClick();
				}
			}
		},

		render: function() {
			ctx.fillStyle = "#FFF";
			ctx.fillRect(x, y, w, h);
			if (img) {
				ctx.drawImage(img, x, y, w, h);
			}
		}

	}

}
