// Cache stuff.
var log = console.log.bind(console);
var rand = Math.random;
var cr = 2 * Math.PI;
var w = Canvas.width;
var h = Canvas.height;
var minerals = 0;
var pop = createPop();
// Disables right click context menu.
AddEventListener("contextmenu", function(e) {
	e.preventDefault();
});

// Setup planets (procgen this?)
var s = Orbital.sun('#ffe200', 38, 0, 0);
var s1 = Orbital.planet('#77c3c3', 10, s, 200, 0.005);
var s1a = Orbital.planet('#666666', 5, s1, 50, -0.01);
var s2 = Orbital.planet('#f64749', 20, s, 500, 0.0025);
var s2a = Orbital.planet('#ff0055', 5, s2, 80, 0.05);
var s2b = Orbital.planet('#77ff55', 10, s2, 150, 0.005);
var s2b1 = Orbital.planet('#666666', 5, s2b, 50, -0.01);
var ms = Orbital.miningStation(s1);
var st = Orbital.satellite(s1);
var st1 = Orbital.satellite(s);
var st2 = Orbital.satellite(s);
var st3 = Orbital.satellite(s);
var st4 = Orbital.satellite(s2);
var st5 = Orbital.satellite(s2);
var st6 = Orbital.satellite(s2);
var ds = Orbital.defenseStation(s1);
var ds1 = Orbital.defenseStation(s1);
var ds2 = Orbital.defenseStation(s1);

// Create Mouse object.
// IIFE. Sets up events and returns basic object.
var Mouse = (function() {

	// Basic object setup.
	var object = {
		x: 0,
		y: 0,
		click: false,
		scrollOut: false,
		scrollIn: false
	};

	// Update mouse position.
	// Can probably remove "rect" stuff if canvas is whole window.
	AddEventListener("mousemove", function(e) {
		var rect = Canvas.getBoundingClientRect();
		object.x = e.clientX - rect.left;
		object.y = e.clientY - rect.top;
	});

	//
	AddEventListener("mousedown", function(e) {
		object.click = true;
	});

	//
	AddEventListener("mousewheel", function(e) {
		object.scrollOut = e.deltaY > 0;
		object.scrollIn = e.deltaY < 0;
	});

	// Return our object.
	return object;

})();

// Update game.
var lastTick = performance.now();
var tickLength = 1000 / 60; // Logic steps per second
var last = 0;
var fps = 0;
var allFps = [];
(function frame(timestamp) {

	requestAnimationFrame(frame);
	var nextTick = lastTick + tickLength;
	allFps.push(1 / ((timestamp - last) / 1000));
	last = timestamp;
	if (allFps.length > 60) {
		var sum = 0;
		var min = 1000;
		var max = 0;
		allFps.shift();
		allFps.forEach(function(value) {
			sum += value;
			min = Math.min(min, value);
			max = Math.max(max, value);
		});
		fps = Math.floor(sum / 60) + ", " + ~~min + " - " + ~~max;
	}

	if (timestamp > nextTick) {
		let timeSinceTick = timestamp - lastTick;
		var numTicks = Math.floor(timeSinceTick / tickLength);
		update(Math.min(numTicks, 60));
		lastTick = timestamp;
	}

	render();

})(lastTick);

function update(repeat) {
	hoverName = "";
	View.update();
	orbitals.forEach(function(e) { e.update(); });
	gui.forEach(function(e) { e.update(); });
	Mouse.click = false;
	Mouse.scrollIn = false;
	Mouse.scrollOut = false;
	--repeat && update(repeat);
}

function render() {
	View.clear();
	drawStarscape();
	View.position();
	orbitals.forEach(function(e) { e.render(); });
	gui.forEach(function(e) { e.render(); });
	View.reset();
	drawDebug();
}
