// Starscape canvas
var starCanvas = DOCUMENT.createElement(CANVAS);
starCanvas.width = 512;
starCanvas.height = 512;

// Context, has lots of shared settings
var starContext = starCanvas.getContext("2d");
starContext.shadowBlur = 1;
starContext.globalAlpha = 0.5;

// Draw stars
function drawStar(x, y) {
    var color = getHSL(-1, 100, 90);
    starContext.fillStyle = color;
    starContext.shadowColor = color;
    starContext.beginPath();
    starContext.arc(x, y, 0.5, 0, 2 * Math.PI);
    starContext.fill();
}

// Create stars
var numberOfStars = 300;
while (numberOfStars--) {
    drawStar(Math.random() * 512, Math.random() * 512);
}

var starPattern = ctx.createPattern(starCanvas, "repeat");
function drawStarscape() {
    ctx.beginPath();
    var offset = performance.now() / 2000;
    ctx.rect(0, 0, Canvas.width, Canvas.height);
    ctx.fillStyle = starPattern;
    ctx.save();
    ctx.translate(Canvas.width/2, Canvas.height/2);
    ctx.scale(0.5, 0.5);
    ctx.translate(-View.x/25+offset/2, -View.y/25);
    ctx.save();
    ctx.rotate(offset/200);
    ctx.fill();
    ctx.restore();
    ctx.scale(2, 2);
    ctx.translate(-View.x/25+offset, -View.y/25);
    ctx.rotate(offset/200);
    ctx.fill();
    ctx.restore();
}
