// Starscape canvas
var starCanvas = DOCUMENT.createElement(CANVAS);
starCanvas.width = Canvas.width;
starCanvas.height = Canvas.height;

// Context, has lots of shared settings
var starContext = starCanvas.getContext("2d");
starContext.fillStyle = WHITE;
starContext.shadowColor = WHITE;
starContext.shadowBlur = 1;
starContext.globalAlpha = 0.5;

function Star(x, y) {
    this.x = x;
    this.y = y;
    stars.push(this);
}

Star.prototype.draw = function() {
    starContext.beginPath();
    starContext.ellipse(this.x, this.y, 0.5, 0.5, 0, 0, 2 * Math.PI);
    starContext.fill();
}

// Create stars
var numberOfStars = 1000;
var stars = [];
while (numberOfStars--) {
    var x = Math.random() * Canvas.width;
    var y = Math.random() * Canvas.height;
    var star = new Star(x, y);
    star.draw();
}
