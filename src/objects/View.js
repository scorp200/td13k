var View = (function() {

	var x = 0;
	var y = 0;
	var xTarget = 0;
	var yTarget = 0;
	var anchorX = 0;
	var anchorY = 0;
	var anchorMouseX = 0;
	var anchorMouseY = 0;
	var zoom = 1;
	var zoomTarget = 1;
	var tilt = 2;
	var smooth = 5;
	var drag = false;
	var dragThreshold = 5;

	var keysDown = {};
	window.addEventListener("keydown", function (event) {
		keysDown[event.key.toUpperCase()] = true;
	}, false);
	window.addEventListener("keyup", function (event) {
		keysDown[event.key.toUpperCase()] = false;
	}, false);

	function init() {
		x = Base.planet.x;
		y = Base.planet.y / 2;
		xTarget = Base.planet.x;
		yTarget = Base.planet.y / 2;
		zoom = 1;
		zoomTarget = 1;
		tilt = 2;
	}

	/**
	 * Update View.
	 * @return {void}
	 */
	function update() {
		if (Mouse.scrollDir !== 0) {
			var shift = Mouse.scrollDir * 0.1;
			zoomTarget = clamp(zoomTarget-shift, 0.1, 2);
		}
		tilt = Math.min(1 + (zoom - 0.1), 2);

		// Pan with keyboard.
		var spd = 50;
		if (keysDown["ARROWUP"] || keysDown["W"]) yTarget -= spd;
		if (keysDown["ARROWDOWN"] || keysDown["S"]) yTarget += spd;
		if (keysDown["ARROWLEFT"] || keysDown["A"]) xTarget -= spd;
		if (keysDown["ARROWRIGHT"] || keysDown["D"]) xTarget += spd;

		// Set anchors for panning.
		if (Mouse.click) {
			anchorX = x;
			anchorY = y;
			anchorMouseX = Mouse.x;
			anchorMouseY = Mouse.y;
		}

		// Pan when mouse down and threshold passed.
		var xt = Math.abs(anchorMouseX - Mouse.x) > dragThreshold;
		var yt = Math.abs(anchorMouseY - Mouse.y) > dragThreshold;
		if (anchorMouseX !== 0 && Mouse.down && (drag || xt || yt)) {
			drag = true;
			xTarget = anchorX + (anchorMouseX - Mouse.x);
			yTarget = anchorY + (anchorMouseY - Mouse.y);
			Tutorial.complete(TUTORIAL_EVENT.MOUSE);
		} else {
			if (drag) {
				anchorMouseX = 0;
			}
			drag = false;
		}

		var zoomDelta = zoom;
		zoom += lerp(zoom, zoomTarget, smooth, 0.001);
		zoomDelta = zoom - zoomDelta;
		if (Math.abs(zoomDelta) > 0.001) {
			x += Mouse.vx * zoomDelta;
			y += Mouse.vy * zoomDelta;
			xTarget += Mouse.vx * zoomDelta;
			yTarget += Mouse.vy * zoomDelta;
			Tutorial.complete(TUTORIAL_EVENT.ZOOM);
		}

		x += lerp(x, xTarget, smooth, 0.001);
		y += lerp(y, yTarget, smooth, 0.001);

	}

	function clear() {
		reset();
		ctx.clearRect(0, 0, Canvas.width, Canvas.height);
	}

	function reset() {
		ctx.setTransform(1, 0, 0, 1, 0, 0);
	}

	function position() {
		var px = -x + Canvas.width / 2;
		var py = -y + Canvas.height / 2;
		ctx.setTransform(zoom, 0, 0, zoom, px, py);
	}

	// Export.
	return {
		get x() { return x; },
		get y() { return y; },
		get zoom() { return zoom; },
		get tilt() { return tilt; },
		get drag() { return drag; },
		init: init,
		clear: clear,
		reset: reset,
		position: position,
		update: update
	}

})();
