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

function getDistanceRaw(o1, o2) {
	var x = o1.x - o2.x;
	var y = o1.y - o2.y;
	return x * x + y * y;
}

function getDistance(o1, o2) {
	var x = o1.x - o2.x;
	var y = o1.y - o2.y;
	return Math.sqrt(x * x + y * y);
}

function getAngle(p1, p2) {
	return Math.atan2(p1.y - p2.y, p1.x - p2.x);
}

function getAngleDifference(a1, a2) {
	return mod((a1 - a2) + PI, TAU) - PI;
}

function mod(a, n) {
	return a - Math.floor(a / n) * n;
}

function splitToMax(max, orbit, array) {
	var angle = 0;
	array.forEach(function(e) {
		if (e.orbit.planet == orbit)
			angle += TAU / max;
	});
	if (angle >= TAU)
		return undefined;
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

// IS THIS STILL USED?!
function clicked(x, y, w, h) {
	var a = Mouse.x;
	var b = Mouse.y;
	return (a > x && a < x+w && b > y && b < y+h);
}

function nearestOrbital(x, y) {
	var pos = { x: x, y: y };
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

function nearestTargetableOrbital(x, y) {
	var pos = { x: x, y: y };
	var minDistance = 999999;
	var closest = orbitals[0];
	var i = orbitals.length;
	while (i--) {
		if (orbitals[i].type > 1) {
			var distance = getDistance(orbitals[i], pos);
			if (distance < minDistance) {
				minDistance = distance;
				closest = i;
			}
		}
	}
	return orbitals[closest];
}

function clickNearest() {
	if (Mouse.release) {
		Gui.selection.target = null;
		var nearest = nearestOrbital(Mouse.vx, Mouse.vy);
		if (getDistance(nearest, { x: Mouse.vx, y: Mouse.vy }) < maxDistance) {
			hoverName = nearest.name;
			if (!Mouse.target && !Mouse.drag) {
				speak("selected " + nearest.name);
				Gui.selection.target = nearest;
				Gui.selection.openAt(Mouse.x, Mouse.y);
				Gui.selection.addButtons(getUpgrades(nearest));
				sndClick.play();
			}
		}
	}
}
