// Cache stuff.
var addEventListener = document.addEventListener;
var Canvas = document.getElementById("c");

// Disables right click context menu.
addEventListener("contextmenu", function(e) {}
	e.preventDefault();
);

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
