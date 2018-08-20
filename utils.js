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

// Generate a random color.
// min and max should define a range between 0 and 14.
var starColors = "00 11 22 33 44 55 66 77 88 AA BB CC DD EE FF".split(" ");
function getRandomColor(min, max) {
	max++;
	var r = starColors[min+~~(Math.random()*(max-min))];
	var g = starColors[min+~~(Math.random()*(max-min))];
	var b = starColors[min+~~(Math.random()*(max-min))];
	console.log("#" + r + g + b);
	return color = "#" + r + g + b;

}
