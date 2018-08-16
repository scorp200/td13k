// Cache stuff.
var addEventListener = document.addEventListener;
var Canvas = document.getElementById("c");
var ctx = Canvas.getContext("2d");
var log = console.log;
var cr = 2 * Math.PI;
var w = 1200,
	h = 800;
Canvas.width = w;
Canvas.height = h;
ctx.fillStyle = '#4d4d4d';
ctx.fillRect(0, 0, 1200, 1200);
ctx.clearRect(0, 0, 1200, 800);
// Disables right click context menu.
addEventListener("contextmenu", function(e) {
	e.preventDefault();
});
var p = new Planet('#ffe200', 40, w / 2, h / 2);
var p2 = new Planet('#77c3c3', 10, 0, 0);
var p3 = new Planet('#666666', 5, 0, 0);
p.addOrbit(p2, 200, 0.005);
p2.addOrbit(p3, 50, -0.01);
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
update();

function update() {
	requestAnimationFrame(update);
	ctx.clearRect(0, 0, w, h)
	p.update();
	p2.update();
	p3.update();
}
