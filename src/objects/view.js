var View = {
	x: 0,
	y: 0,
    xTarget: 0,
    yTarget: 0,
    anchorX: 0,
    anchorY: 0,
    anchorMouseX: 0,
    anchorMouseY: 0,
	zoom: 1,
	zoomTarget: 1,
    tilt: 2,
    smooth: 5,
    update: function() {
        if (Mouse.scrollIn || Mouse.scrollOut) {
            var shift = Mouse.scrollIn ? 0.1 : -0.1;
            View.zoomTarget = clamp(View.zoomTarget+shift, 0.1, 2);
        }
        View.tilt = Math.min(1 + (View.zoom - 0.1), 2);
        if (Mouse.click/* && !pop.display*/) {
            View.drag = true;
            View.anchorX = View.x;
            View.anchorY = View.y;
            View.anchorMouseX = Mouse.x;
            View.anchorMouseY = Mouse.y;
        }
        if (Mouse.drag && View.drag) {
            View.xTarget = View.anchorX + (View.anchorMouseX - Mouse.x);
            View.yTarget = View.anchorY + (View.anchorMouseY - Mouse.y);
        } else if(Mouse.release) {
            View.drag = false;
        }

        var zoomDelta = View.zoom;
		View.zoom += lerp(View.zoom, View.zoomTarget, View.smooth, 0.001);
        zoomDelta = View.zoom - zoomDelta;
        if (Math.abs(zoomDelta) > 0.001) {
            View.x += Mouse.vx * zoomDelta;
            View.y += Mouse.vy * zoomDelta;
            View.xTarget += Mouse.vx * zoomDelta;
            View.yTarget += Mouse.vy * zoomDelta;
        }

        View.x += lerp(View.x, View.xTarget, View.smooth, 0.001);
		View.y += lerp(View.y, View.yTarget, View.smooth, 0.001);

    },
	clear: function() {
		View.reset();
		ctx.clearRect(0, 0, Canvas.width, Canvas.height);
	},
	reset: function() {
		ctx.setTransform(1, 0, 0, 1, 0, 0);
	},
	position: function() {
		var x = -View.x + Canvas.width / 2;
		var y = -View.y + Canvas.height / 2;
		ctx.setTransform(View.zoom, 0, 0, View.zoom, x, y);
	}
};
