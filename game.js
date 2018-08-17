// Cache stuff.
var addEventListener = doc.addEventListener;
var log = console.log;
var cr = 2 * Math.PI;
var w = Canvas.width;
var h = Canvas.height;

// Disables right click context menu.
addEventListener("contextmenu", function(e) {
	e.preventDefault();
});

// Setup planets (procgen this?)
var planets = [];
planets.push(new Planet('#ffe200', 40, w / 2, h / 2));

planets.push(new Planet('#77c3c3', 10, 0, 0));
planets.push(new Planet('#666666', 5, 0, 0));
planets[1].addOrbit(planets[0], 200, 0.005);
planets[2].addOrbit(planets[1], 50, -0.01);

planets.push(new Planet('#f64749', 20, 0, 0));
planets[3].addOrbit(planets[0], 500, 0.0025);
planets.push(new Planet('#77ff55', 10, 0, 0));
planets.push(new Planet('#666666', 5, 0, 0));
planets[4].addOrbit(planets[3], 150, 0.005);
planets[5].addOrbit(planets[4], 50, -0.01);

// Create Mouse object.
// IIFE. Sets up events and returns basic object.
var Mouse = (function() {

	// Basic object setup.
	var object = { x: 0, y: 0 };

	// Update mouse position.
	// Can probably remove "rect" stuff if canvas is whole window.
	addEventListener("mousemove", function(e) {
		var rect = Canvas.getBoundingClientRect();
		object.x = e.clientX - rect.left;
		object.y = e.clientY - rect.top;
	});

	//
	addEventListener("mousedown", function(e) {
		// ADD AN "ONCLICK" FUNCTION HERE.
		e.preventDefault();
	});

	// Return our object.
	return object;

})();

// Update game.
var lastTick = performance.now();
var tickLength = 1000 / 60; // Logic steps per second
var last = 0;
(function frame(timestamp) {

	requestAnimationFrame(frame);
	var nextTick = lastTick + tickLength;
	var numTicks = 0;

	if (timestamp > nextTick) {
		let timeSinceTick = timestamp - lastTick;
		var numTicks = Math.floor(timeSinceTick / tickLength);
		update(Math.min(numTicks, 60));
		lastTick = timestamp;
	}

	render();

})();

function update(repeat) {
	planets.forEach(function(e) { e.update(); })
	--repeat && update(repeat);
}

function render() {
	ctx.clearRect(0, 0, w, h);
	planets.forEach(function(e) { e.render(); })
}
