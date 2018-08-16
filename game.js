// Cache stuff.
var addEventListener = document.addEventListener,
	Canvas = document.getElementById("c"),
	ctx = Canvas.getContext("2d"),
	log = console.log,
	cr = 2 * Math.PI,
	w = 1200,
	h = 800,
	planets = [];
Canvas.width = w;
Canvas.height = h;
ctx.fillStyle = '#4d4d4d';
ctx.fillRect(0, 0, 1200, 1200);
ctx.clearRect(0, 0, 1200, 800);
// Disables right click context menu.
addEventListener("contextmenu", function(e) {
	e.preventDefault();
});
planets.push(new Planet('#ffe200', 40, w / 2, h / 2));
planets.push(new Planet('#77c3c3', 10, 0, 0));
planets.push(new Planet('#666666', 5, 0, 0));
planets[0].addOrbit(planets[1], 200, 0.005);
planets[1].addOrbit(planets[2], 50, -0.01);
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
(function update() {
	requestAnimationFrame(update);
	ctx.clearRect(0, 0, w, h)
	planets.forEach(function(e) { e.update(); })
})();
