
function extend(f1, f2) {
	return function() {
		f1();
		f2();
	}
}

// Rename "getDistanceSquared"
function getDistanceRaw(o1, o2) {
	var x = o1.x - o2.x;
	var y = o1.y - o2.y;
	return x * x + y * y;
}

function getDistance(o1, o2) {
	return Math.sqrt(getDistanceRaw(o1, o2));
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

function getHSL(h, s, l) {
	return 'hsl(' +
		(h < 0 ? Math.random() * 360 : h) + ',' +
		(s < 0 ? Math.random() * 100 : s) + '%,' +
		(l < 0 ? Math.random() * 100 : l) + '%)';
}

function lerp(value, target, ease, precision) {
	if (Math.abs(value - target) < precision)
		return 0;
	return (target - value) / ease;
}

function clamp(value, min, max) {
	return value > max ? max : value < min ? min : value;
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
		var orb = orbitals[i];
		if ((orb.type > 1 || Base.planet === orb) && orb.online) {
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
	if (Mouse.released) {
		Gui.selection.target = null;
		var nearest = nearestOrbital(Mouse.vx, Mouse.vy);
		if (getDistance(nearest, { x: Mouse.vx, y: Mouse.vy }) < maxDistance) {
			hoverName = nearest.name;
			if (!Mouse.target && !Mouse.drag) {
				speak("selected " + nearest.name);
				if (gameState === GAME_STATE.RUNNING) {
					Gui.selection.target = nearest;
					Gui.selection.openAt(Mouse.x, Mouse.y);
					Gui.selection.addButtons(OrbitalUpgrades.get(nearest));
				} else if (gameState === GAME_STATE.CREATE && (nearest.type == ORBITAL_TYPE.PLANET || nearest.type == ORBITAL_TYPE.STAR)) {
					buildOn = nearest;
					buildMaxDistance = buildOn.size * buildOrbitSize;
				}
				sndClick.play();
			}
		}
	}
}

function selectOrbitSize() {
	var c;
	var radAngle = getAngle({x: Mouse.vx, y: Mouse.vy}, buildOn);
	switch (build) {
		case (ORBITAL_TYPE.SATELLITE): c = Orbital.satellite(buildOn, buildDistance, radAngle); break;
		case (ORBITAL_TYPE.MINING): c = Orbital.miningStation(buildOn, buildDistance, radAngle); break;
		case (ORBITAL_TYPE.DEFENSE): c = Orbital.defenseStation(buildOn, buildDistance, radAngle); break;
	}
	build = null;
	buildOn = null;
	gameState = GAME_STATE.RUNNING;
	//}
}
