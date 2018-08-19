function extend(f1, f2) {
	return function() {
		f1();
		f2();
	}
}

function getDistance(o1, o2) {
	return Math.sqrt(Math.pow(o1.x - o2.x, 2) + Math.pow(o1.y - o2.y, 2));
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
