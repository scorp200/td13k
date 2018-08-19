function extend(f1, f2) {
	return function() {
		f1();
		f2();
	}
}

function getDistance(o1, o2) {
	var x = o1.x - o2.x;
	var y = (o1.y - o2.y) * View.tilt;
	return Math.sqrt(x*x + y*y);
}

function getAngle(p1, p2) {
	return Math.atan2((p1.y - p2.y)*View.tilt, p1.x - p2.x);
}

function splitToMax(max, orbit, array) {
	var angle = 0;
	array.forEach(function(e) {
		if (e.orbit.planet == orbit)
			angle += cr / max;
	});
	if (angle >= cr)
		return UNDEF;
	return angle;
}
