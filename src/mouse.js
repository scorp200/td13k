// Create Mouse object.
// IIFE. Sets up events and returns basic object.
var Mouse = (function() {

	// Basic object setup.
	var object = {
		x: 0,
		y: 0,
		vx: 0,
		vy: 0,
		click: false,
		drag: false,
		release: false,
		scrollOut: false,
		scrollIn: false,
		update: function() {
			object.click = false;
			object.release = false;
			object.scrollIn = false;
			object.scrollOut = false;
		}
	};

	// Update mouse position.
	// Can probably remove "rect" stuff if canvas is whole window.
	window.addEventListener("mousemove", function(e) {
		var rect = Canvas.getBoundingClientRect();
		object.x = e.clientX - rect.left;
		object.y = e.clientY - rect.top;
		object.vx = (object.x + View.x - Canvas.width / 2) / View.zoom;
		object.vy = (object.y + View.y - Canvas.height / 2) / View.zoom;
		if(object.down)
			object.drag = true;
	}, false);

	//
	window.addEventListener("mousedown", function(e) {
		object.click = true;
		object.down = true;
	}, false);

	//
	window.addEventListener("mouseup", function(e) {
		object.down = false;
		if(!object.drag)
			object.release = true;
		object.drag = false;
	}, false);

	//
	window.addEventListener("mousewheel", function(e) {
		object.scrollOut = e.deltaY > 0;
		object.scrollIn = e.deltaY < 0;
	}, false);

	// Return our object.
	return object;

})();
