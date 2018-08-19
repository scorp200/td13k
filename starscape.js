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
    starContext.arc(this.x, this.y, 0.5, 0, 2 * Math.PI);
    starContext.fill();
}

var offset = 0;
function drawStarscape() {
    offset += 0.1;
    var pat = ctx.createPattern(starCanvas, "repeat");
    ctx.rect(0, 0, Canvas.width, Canvas.height);
    ctx.fillStyle = pat;
    ctx.save();
    ctx.scale(0.5, 0.5);
    ctx.translate(offset/2, 0);
    ctx.fill();
    ctx.translate(offset, 0);
    ctx.scale(2, 2);
    ctx.fill();
    ctx.restore();
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
