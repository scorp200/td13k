var log = console.log.bind(console);
var rand = Math.random;
var rond = Math.round;
var cr = 2 * Math.PI;

function extend(f1, f2) {
	return function() {
		f1();
		f2();
	}
}

function getDistance(o1, o2) {
	var x = o1.x - o2.x;
	var y = o1.y - o2.y;
	return Math.sqrt(x * x + y * y);
}

function getAngle(p1, p2) {
	return Math.atan2(p1.y - p2.y, p1.x - p2.x);
}

function mod(a, n) {
    return a - Math.floor(a/n) * n;
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

function getHSL(h, s, l) {
	return 'hsl(' +
		(h < 0 ? rand() * 360 : h) + ',' +
		(s < 0 ? rand() * 100 : s) + '%,' +
		(l < 0 ? rand() * 100 : l) + '%)';
}

function lerp(value, target, ease, precision) {
	if (Math.abs(value - target) < precision)
		return 0;
	return (target - value) / ease;
}

function clamp(value, min, max) {
	return value > max ? max : value < min ? min : value;
}

function clicked(x, y, w, h) {
	var a = (Mouse.x - Canvas.width / 2);
	var b = (Mouse.y - Canvas.height / 2);
	return (a > x - w / 2 && a < x + w / 2 && b > y - h / 2 && b < y + h / 2);
}

function nearestOrbital(x, y) {
	var pos = {x: x, y: y};
	var minDistance = 999999;
	var closest = orbitals[0];
	var i = orbitals.length;
	while (i--) {
		var distance = getDistance(orbitals[i], pos);
		if (distance < minDistance) {
			minDistance = distance;
			closest = i;
		}
	}
	return orbitals[closest];
}
