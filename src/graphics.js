var hoverName = "";

// Graphical settings.
var orbitLineQuality = 2;

// Keep canvas same size as window.
resize();
window.addEventListener("resize", resize, false);
function resize() {
	Canvas.width = window.innerWidth;
	Canvas.height = window.innerHeight;
	ctx.clearRect(0, 0, Canvas.width, Canvas.height);
	if (typeof Orbital !== "undefined") {
		Gui.setup();
	}
};

// Render all orbits.
function renderAllOrbits() {
	ctx.globalAlpha = 1;
	var n = Orbital.orbitals.length;
	while (n--) {
		renderOrbit(Orbital.orbitals[n]);
	}
}

// Cache orbits.
function getOrbitCache(body) {

	//
	var orbit = body.orbit;
	if (!orbit) return false;

	//
	var cache = orbit.planet.orbitCache;
	if (!cache) {
		cache = orbit.planet.orbitCache = [];
	}

	// Create new cache canvas for given level.
	var scaleLevel = Math.floor(View.zoom*4);
	cache = cache[scaleLevel];
	if (!cache) {
		cache = document.createElement("CANVAS");
		var maxDist = 0;
		Orbital.orbitals.forEach(function(o) {
			if (o.orbit && o.orbit.planet === orbit.planet)
				maxDist = Math.max(maxDist, o.orbit.distance + 40);
		});
		cache.width = maxDist / orbitLineQuality;
		cache.height = maxDist / orbitLineQuality;
		orbit.planet.orbitCache[scaleLevel] = cache;
		cache.hasBody = [];
	}

	// Render particular body's orbit line.
	if (!cache.hasBody[body.id]) {
		var drawScale = (0.2 + scaleLevel / 4) * orbitLineQuality;
		var ctxOrbit = cache.getContext("2d");
		ctxOrbit.setLineDash([5 / drawScale, 5 / drawScale]);
		ctxOrbit.beginPath();
		ctxOrbit.lineWidth = 2 / drawScale;
		ctxOrbit.strokeStyle = body.color;
		ctxOrbit.globalAlpha = 1;
		ctxOrbit.arc(0, 0, orbit.distance / orbitLineQuality, 0, TAU/4, false);
		ctxOrbit.stroke();
		ctxOrbit.setLineDash([]);
		cache.hasBody[body.id] = true;

	}

	return cache;

}

// Render orbit
function renderOrbit(body) {

	if (body.orbit) {
		var cache = getOrbitCache(body);
	}

	var scaleLevel = Math.floor(View.zoom*4);
	if (body.orbitCache && body.orbitCache[scaleLevel]) {
		ctx.globalAlpha = 0.3;
		var cache = body.orbitCache[scaleLevel];
		ctx.save();
		ctx.translate(body.x, body.y / View.tilt);
		ctx.scale(orbitLineQuality, orbitLineQuality / View.tilt);
		ctx.drawImage(cache, 0, 0, cache.width, cache.height);
		ctx.scale(-1, 1);
		ctx.drawImage(cache, 0, 0);
		ctx.scale(1, -1);
		ctx.drawImage(cache, 0, 0);
		ctx.scale(-1, 1);
		ctx.drawImage(cache, 0, 0);
		ctx.restore();
	}

	// ONLINE circle.
	ctx.fillStyle = body.online ? "#0F0" : "#F00";
	ctx.beginPath();
	ctx.arc(body.x, body.y / View.tilt - 30, 3, 0, TAU);
	ctx.fill();

}

// Render all trails.
function renderAllTrails() {
	ctx.beginPath();
	ctx.globalAlpha = 0.3;
	ctx.strokeStyle = "#BDF";//body.color;
	ctx.lineWidth = 2 / View.zoom;
	var n = Orbital.orbitals.length;
	while (n--) {
		renderTrail(Orbital.orbitals[n]);
	}
	ctx.stroke();
}

// Render trail
function renderTrail(body) {
	var orbit = body.orbit;
	if (orbit) {
		ctx.save();
		var tilt = 1 / View.tilt;
		ctx.transform(1, 0, 0, tilt, orbit.planet.x, orbit.planet.y * tilt)
		var trail = orbit.radAngle - orbit.moveSpeed * orbit.distance;
		ctx.moveTo(Math.cos(trail)*orbit.distance, Math.sin(trail)*orbit.distance);
		ctx.arc(0, 0, orbit.distance, trail, orbit.radAngle, orbit.moveSpeed < 0);
		ctx.restore();
	}
}

// Render all bodies.
function renderAllBodies() {
	ctx.globalAlpha = 1;
	var n = Orbital.orbitals.length;
	while (n--) {
		renderBody(Orbital.orbitals[n]);
	}
}

// Render body (star, planet, death star).
function renderBody(body) {

	var dx = body.x;
	var dy = body.y / View.tilt;

	if (body.type === ORBITAL_TYPE.SATELLITE) {
		var a = getAngle(body, Orbital.orbitals[0]);
		ctx.save();
		ctx.translate(dx, dy);
		ctx.rotate(a);
		ctx.scale(0.3, 0.3);
		ctx.drawImage(sprSatellite, -sprSatellite.width/2, -sprSatellite.height/2);
		ctx.restore();
		return;
	}

	if (body.type === ORBITAL_TYPE.MINING) {

		if (body.online) {
			ctx.strokeStyle = "#B33";
			ctx.lineWidth = 1 + Math.abs(Math.sin(performance.now()/100));
			ctx.beginPath();
			ctx.moveTo(dx, dy);
			ctx.lineTo(body.orbit.planet.x, body.orbit.planet.y / View.tilt);
			ctx.stroke();
		}

		var a = getAngle(body, body.orbit.planet);
		ctx.save();
		ctx.translate(dx, dy);
		ctx.rotate(a);
		ctx.scale(0.3, 0.3);
		ctx.drawImage(sprMiningStation, -sprSatellite.width/2, -sprSatellite.height/2);
		ctx.restore();
		return;
	}

	if (body.type === ORBITAL_TYPE.DEFENSE) {
		var a = getAngle(body, Orbital.orbitals[0]);
		ctx.save();
		ctx.translate(dx, dy);
		ctx.scale(0.5, 0.5);
		ctx.drawImage(sprDefensePlatform, -sprDefensePlatform.width/2, -sprDefensePlatform.height/2+10);
		ctx.scale(1.2, 0.7);
		ctx.rotate(body.aimDirection);
		ctx.drawImage(sprDefensePlatformLaser, -sprDefensePlatformLaser.width/2, -sprDefensePlatformLaser.height/2);
		ctx.restore();
		return;
	}

	var isSun = body.type === ORBITAL_TYPE.STAR;
	if (!body.cache) {
		var color = isSun ? "#FFF" : body.color;
		var glow = isSun ? 50 : 10;
		var size = body.size + glow;
		var offset = 0;
		var cache = body.cache = document.createElement("CANVAS");
		cache.width = size*2;
		cache.height = size*2;
		var context = body.cache.getContext("2d");

		// Offset trick for IE/Edge, no filter support.
		if (isSun) {
			offset = 1000;
			context.shadowOffsetY = offset;
		}

		// Draw planet body.
		context.beginPath();
		context.fillStyle = color;
		context.shadowColor = body.color;
		context.shadowBlur = glow;
		context.arc(size, size-offset, body.size, 0, TAU, false);
		context.fill();

		if (isSun) {
			context.beginPath();
			context.shadowColor = "#FFF";
			context.shadowBlur = 5;
			context.arc(size, size-offset, body.size-5, 0, TAU, false);
			context.fill();
		}

		// Draw shadow.
		if (!isSun) {
			var repeat = body.size;
			var o = body.size;
			context.beginPath();
			context.arc(size, size, body.size, 0, 2*Math.PI, false);
			context.clip();
			while (repeat && o > 0) {
				context.beginPath();
				context.globalAlpha = 0.05;
				context.fillStyle = "#000";
				context.shadowColor = "#000";
				context.shadowBlur = 10;
				context.save();
				context.transform(1, 0, 0, 1, size-o/2+(body.size-o)/2, size);
				context.arc(0, 0, o*2, -TAU / 4, TAU / 4);
				context.fill();
				context.restore();
				o -= Math.max(body.size/20, 1);
				repeat -= Math.max(body.size/20, 1);
			}
		}
	}

	var a = getAngle(body, Orbital.orbitals[0]);
	ctx.save();
	ctx.translate(dx, dy);
	ctx.rotate(a);
	if (isSun) {
		var scale = 1+Math.sin(performance.now()/30)*0.01;//1 + Math.random() * 0.03;
		ctx.scale(scale, scale);
	}
	ctx.drawImage(body.cache, -body.cache.width/2, -body.cache.height/2);
	ctx.restore();
}

// MOVE THIS
function resetComlines() {
	var n = Orbital.orbitals.length;
	while (n--) {
		Orbital.orbitals[n].online = false;
	}
}

// Comline stuff.
var pairs = [];
var list = [];

/**
 * @param {Object} node
 * @param {boolean=} start Is this the first node in the structure.
 * @return {Array} list
 */
function getComlines(node, start) {
	node.online = true;
	if (start) {
		pairs.length = 0;
		list.length = 0;
	}
	var next = [];
	list.push(node);
	var n = Orbital.orbitals.length;
	while (n--) {
		var inst = Orbital.orbitals[n];
		var inList = list.indexOf(inst) >= 0;
		if (node !== inst && !inList && canOfferConnection(node) && canReceiveConnection(inst)) {
			if (getDistance(node, inst) <= Base.comRange) {
				pairs.push(node, inst);
				next.push(inst);
				list.push(inst);
			}
		}
	}

	next.forEach(function(i) {
		getComlines(i);
	});

	return pairs;
}

function canOfferConnection(t) {
	return t === Base.planet
		|| t.type === ORBITAL_TYPE.SATELLITE;
}

function canReceiveConnection(t) {
	return t.type === ORBITAL_TYPE.SATELLITE
		|| t.type === ORBITAL_TYPE.MINING
		|| t.type === ORBITAL_TYPE.DEFENSE;
}

//
function renderComLines() {

	resetComlines();
	var lines = getComlines(Base.planet, true);

	ctx.globalAlpha = clamp(0.2 / View.zoom, 0.2, 0.4);
	ctx.lineWidth = clamp(1 / View.zoom, 2, 5);
	ctx.strokeStyle = "#0F0";

	ctx.beginPath();
	var up = 75 * (View.tilt - 1);
	for (var n=0; n<lines.length; n+=2) {
		var a = lines[n];
		var b = lines[n+1];
		var y1 = a.y / View.tilt;
		var y2 = b.y / View.tilt;
		ctx.moveTo(a.x, y1);
		ctx.bezierCurveTo(a.x, y1-up, b.x, y2-up, b.x, y2);
	}
	ctx.stroke();

}

function drawDebug() {
	ctx.font = "14px monospace";
	ctx.textBaseline = "top";
	ctx.textAlign = 'left';
	ctx.fillStyle = "#fff";
	ctx.fillText("#js13k tower defense prototype", 20, 200+20);
	ctx.fillText("https://github.com/scorp200/td13k", 20, 200+40);
	ctx.fillText("framerate: " + Fps.fps, 20, 200+60);
	ctx.fillText("mouse (gui): " + Mouse.x + ", " + Mouse.y, 20, 200+80);
	ctx.fillText("mouse (view): " + Mouse.vx + ", " + Mouse.vy, 20, 200+100);
	ctx.fillText("planet name: " + hoverName, 20, 200+120);

	ctx.fillText("view x: " + View.x, 20, 200+160);
	ctx.fillText("view y: " + View.y, 20, 200+180);
	ctx.fillText("view zoom: " + View.zoom, 20, 200+200);
	ctx.fillText("view tilt: " + View.tilt, 20, 200+220);

	ctx.fillText("enemies: " + EnemyShip.allInstances.length, 20, 200+260);
}
