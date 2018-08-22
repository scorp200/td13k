// Starscape canvas
var starCanvas = document.createElement("CANVAS");
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

// Draw starscape background.
var starPattern = ctx.createPattern(starCanvas, "repeat");
function drawStarscape() {
    var offset = performance.now() / 2000;
    ctx.beginPath();
    ctx.rect(0, 0, Canvas.width, Canvas.height);
    ctx.fillStyle = starPattern;
    ctx.translate(Canvas.width*0.5, Canvas.height*0.5);
    ctx.scale(0.5, 0.5);
    ctx.translate(-View.x/25, -View.y/25);
    ctx.rotate(offset/200);
    ctx.fill();
    ctx.rotate(-offset/200);
    ctx.scale(2, 2);
    ctx.translate(-View.x/50, -View.y/50);
    ctx.fill();
}

// Draw gradient background (star glow effect).
// Renders a gradient to a canvas, and draws that scaled up later.
var cBackground = document.createElement(CANVAS);
var ctxBackground = cBackground.getContext("2d", { alpha: false });
cBackground.width = 512;
cBackground.height = 512;
ctxBackground.beginPath();
var grd = ctxBackground.createRadialGradient(256, 256, 0, 256, 256, 256);
grd.addColorStop(0, "#141e28");
grd.addColorStop(1, "#000000");
ctxBackground.fillStyle = grd;
ctxBackground.fillRect(0, 0, 512, 512);
function drawBackground() {
	ctx.drawImage(
        cBackground,
        Math.floor(Canvas.width*0.5-View.x-256*8),
        Math.floor(Canvas.height*0.5-View.y-256*8),
        512*8,
        512*8
    );
}
