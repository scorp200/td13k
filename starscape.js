// Starscape
var starCanvas = DOCUMENT.createElement(CANVAS);
starCanvas.width = Canvas.width;
starCanvas.height = Canvas.height;
var starContext = starCanvas.getContext("2d");
var numberOfStars = 1000;
var stars = [];
while (numberOfStars--) {
    var x = Math.random() * Canvas.width;
    var y = Math.random() * Canvas.height;
    new Star(x, y);
}

function Star(x, y) {
    this.x = x;
    this.y = y;
    stars.push(this);
}

Star.prototype.draw = function() {
    starContext.beginPath();
    starContext.fillStyle = WHITE;
    starContext.shadowColor = WHITE;
    starContext.shadowBlur = 1;
    starContext.ellipse(this.x, this.y, 0.5, 0.5, 0, 0, 2 * Math.PI);
    starContext.fill();
}

function renderStars() {
    starContext.globalAlpha = 0.5;
    stars.forEach(function(star) {
        star.draw();
    });
}

renderStars();
