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
    var offset = performance.now() / 2000;
    ctx.beginPath();
    ctx.rect(0, 0, Canvas.width, Canvas.height);
    ctx.fillStyle = starPattern;
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
}

/*
function drawBackground() {
	ctx.beginPath();
	var x = Canvas.width / 2 - View.x;
	var y = Canvas.height / 2 - View.y;
	var grd = ctx.createRadialGradient(x, y, 0, x, y, 4000);
	grd.addColorStop(0, "#141e28");
	grd.addColorStop(1, "#000000");
	ctx.fillStyle = grd;
	ctx.fillRect(0, 0, Canvas.width, Canvas.height);
}*/

//*
var cBackground = document.createElement(CANVAS);
var ctxBackground = cBackground.getContext("2d", { alpha: false });
cBackground.width = 256;
cBackground.height = 256;
ctxBackground.beginPath();
var x = 128;
var y = 128;
var grd = ctxBackground.createRadialGradient(x, y, 0, x, y, 128);
grd.addColorStop(0, "#141e28");
grd.addColorStop(1, "#000000");
ctxBackground.fillStyle = grd;
ctxBackground.fillRect(0, 0, 256, 256);
function drawBackground() {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, Canvas.width, Canvas.height);
    var x = Canvas.width/2-View.x;
	var y = Canvas.height/2-View.y;
    ctx.translate(x, y);
    ctx.scale(16, 16);
    ctx.translate(-128, -128);
	ctx.drawImage(cBackground, 0, 0);
    ctx.restore();
}//*/
