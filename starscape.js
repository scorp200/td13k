// Starscape canvas
var starCanvas = DOCUMENT.createElement(CANVAS);
starCanvas.width = 512;
starCanvas.height = 512;

// Context, has lots of shared settings
var starContext = starCanvas.getContext("2d");
starContext.shadowBlur = 1;
starContext.globalAlpha = 0.5;

// Colors
var starColors = ["55", "66", "77", "88", "AA", "BB", "CC", "DD", "EE", "FF"];

function drawStar(x, y) {
    var color = "#" + starColors[Math.floor(Math.random()*11)] + starColors[Math.floor(Math.random()*11)] + starColors[Math.floor(Math.random()*11)];
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

var offset = 0;
var starPattern = ctx.createPattern(starCanvas, "repeat");
function drawStarscape() {
    offset += 0.1;
    ctx.rect(0, 0, Canvas.width, Canvas.height);
    ctx.fillStyle = starPattern;
    ctx.save();
    ctx.scale(0.5, 0.5);
    ctx.translate(offset/2, 0);
    ctx.fill();
    ctx.translate(offset, 0);
    ctx.scale(2, 2);
    ctx.fill();
    ctx.restore();
}
