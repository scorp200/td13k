/**
 * @param {Object} parent
 * @param {number} x
 * @param {number} y
 * @param {number} w
 * @param {number} h
 * @param {HTMLCanvasElement} img
 * @param {Function} onClick
 * @param {string=} speech
 * @return {Object}
 */
var Button = function(parent, x, y, w, h, text, img, onClick, speech) {

	var fillStyle = "rgba(0,0,0,0.5)";
	var strokeStyle = "#FFF";
	var borderWidth = 2;

	return {

		// Update the button.
		// Handles tooltip and clicking.
		update: function() {
			if (Mouse.overRegion(parent.x+x, parent.y+y, w, h)) {
				Gui.setTooltip(text);
				if (Mouse.click) {
					if (onClick && onClick(true)) {
						onClick();
						if (speech) {
							speak(speech);
						}
					}
				}
			}
		},

		// Render the button.
		render: function() {
			ctx.globalAlpha = onClick && !onClick(true) ? 0.2 : 1;
			ctx.fillStyle = fillStyle;
			ctx.strokeStyle = strokeStyle;
			ctx.lineWidth = borderWidth;
			ctx.fillRect(parent.x+x, parent.y+y, w, h);
			ctx.strokeRect(parent.x+x, parent.y+y, w, h);
			if (img) {
				ctx.drawImage(img, parent.x+x+4, parent.y+y+4);
			}
		}

	}

}
