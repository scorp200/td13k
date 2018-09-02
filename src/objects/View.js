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

	function init() {
		x = 0;
		y = 0;
		xTarget = 0;
	    yTarget = 0;
		zoom = 1;
		zoomTarget = 1;
	    tilt = 2;
	}

    function update() {
        if (Mouse.scrollDir !== 0) {
            var shift = Mouse.scrollDir * 0.1;
            zoomTarget = clamp(zoomTarget-shift, 0.1, 2);
        }
        tilt = Math.min(1 + (zoom - 0.1), 2);

		// Set anchors for panning.
        if (Mouse.click) {
            anchorX = x;
            anchorY = y;
            anchorMouseX = Mouse.x;
            anchorMouseY = Mouse.y;
        }

		// Pan when mouse down and threshold reached.
        if (anchorMouseX !== 0 && Mouse.down && (drag || Math.abs(anchorMouseX - Mouse.x) > dragThreshold)) {
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
