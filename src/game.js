// Cache stuff.
//var pop = createPop();
var base = null;
var STATE_LOADING = 0;
var STATE_RUNNING = 1;
var STATE_CREATE = 2;
var STATE_PAUSED = 3;
var gameState = STATE_LOADING;
var maxDistance = 64;

// Disables right click context menu.
window.addEventListener("contextmenu", function(e) {
	e.preventDefault();
}, false);

// Pause the game.
document.addEventListener("keypress", function(e)  {
  	if (e.key === " ") {
		if (gameState === STATE_PAUSED) {
			gameState = STATE_RUNNING;
		} else {
			gameState = STATE_PAUSED;
		}
	}
});

// Setup planets (procgen this?)
var s = sun(getHSL(60, 100, 50), 50, 0, 0);
var s1 = planet(getHSL(180, 39, 62), 10, s, 650, 0.003, rand() * cr);
base = Base(s1);
var s1a = planet(getHSL(-1, 60, 70), 5, s1, 100, -0.002, rand() * cr);
var s2 = planet(getHSL(-1, 60, 70), 20, s, 1123, 0.0015, rand() * cr);
var s2a = planet(getHSL(-1, 60, 70), 5, s2, s2.size * 8, 0.01, rand() * cr);
var s2b = planet(getHSL(-1, 60, 70), 10, s2, s2.size * 9, 0.005, null);
var s3 = planet(getHSL(-1, 60, 70), 30, s, 2532, -0.001, rand() * cr);
var ms = miningStation(s1);
var ms2 = miningStation(s2);
var st = satellite(s1);
var st1 = satellite(s);
var st2 = satellite(s);
var st3 = satellite(s);
var st4 = satellite(s2);
var st5 = satellite(s2);
var st6 = satellite(s2);
var ds = defenseStation(s1);
var ds1 = defenseStation(s1);
var ds2 = defenseStation(s1);
var ds3 = defenseStation(s2);

// Update game.
var lastTick = performance.now();
var tickLength = 1000 / 60; // Logic steps per second
var last = 0;
(function frame(timestamp) {

	requestAnimationFrame(frame);
	var nextTick = lastTick + tickLength;
	Fps.update(1 / ((timestamp - last) / 1000));
	last = timestamp;

	if (timestamp > nextTick) {
		var timeSinceTick = timestamp - lastTick;
		var numTicks = Math.floor(timeSinceTick / tickLength);
		update(Math.min(numTicks, 60));
		render();
		lastTick = timestamp;
	}
})(lastTick);

function update(repeat) {

	if (gameState === STATE_LOADING) {
		LoadingScreen.update();
	} else {
		hoverName = "";
		View.update();
		Gui.update();
		if (gameState === STATE_RUNNING) {
			orbitals.forEach(function(e) { e.update(); });
			WaveManager.update();
			EnemyShip.updateAll();
			Laser.update();
			Rocket.update();
			clickNearest();
		}

	}// else if (gameState === STATE_CREATE) {
		//Create();
	//}

	Mouse.update();
	--repeat && update(repeat);

}

function render() {

	// Draw background
	View.clear();
	drawBackground();
	drawStarscape();

	if (gameState === STATE_LOADING) {
		View.reset();
		LoadingScreen.render();
	} else {
		View.position();
		orbitals.forEach(function(e) { e.render(); });
		ctx.globalAlpha = 1;
		renderAllOrbits();
		renderAllBodies();
		EnemyShip.renderAll();
		renderComLines();
		Laser.render();
		Rocket.render();

		// Draw line to closer planet.
		var nearest = nearestOrbital(Mouse.vx, Mouse.vy);
		if (getDistance(nearest, { x: Mouse.vx, y: Mouse.vy }) < maxDistance) {
			ctx.beginPath();
			ctx.moveTo(nearest.x, nearest.y / View.tilt);
			ctx.lineTo(Mouse.vx, Mouse.vy / View.tilt);
			ctx.strokeStyle = "#ffffff";
			ctx.stroke();
		}

		var centerX = Canvas.width / 2;
		var centerY = Canvas.height / 2;
		ctx.setTransform(1, 0, 0, 1, centerX, centerY);
		View.reset();
		Gui.render();
		drawDebug();

	}
}
