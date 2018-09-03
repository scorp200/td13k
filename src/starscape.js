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
    ctx.translate(Canvas.width*0.5, Canvas.height*0.5+View.tilt*500);
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
var gbQuality = 128;
var cBackground = document.createElement("CANVAS");
var ctxBackground = cBackground.getContext("2d", { alpha: false });
cBackground.width = gbQuality;
cBackground.height = gbQuality;
ctxBackground.beginPath();
var grd = ctxBackground.createRadialGradient(gbQuality/2, gbQuality/2, 0, gbQuality/2, gbQuality/2, gbQuality/2);
grd.addColorStop(0, "#234");
grd.addColorStop(0.1, "#123");
grd.addColorStop(1, "#000");
ctxBackground.fillStyle = grd;
ctxBackground.fillRect(0, 0, gbQuality, gbQuality);
function drawBackground() {
	ctx.drawImage(
        cBackground,
        Math.floor(Canvas.width*0.5-View.x-512*4),
        Math.floor(Canvas.height*0.5-View.y-512*4),
        512*8,
        512*8
    );
}
