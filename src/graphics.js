// Setup Canvas (move to graphics.js)
var hoverName = "";
var AddEventListener = DOCUMENT.addEventListener.bind(DOCUMENT);
var Canvas = DOCUMENT.getElementById("c");
var ctx = Canvas.getContext("2d");

// Keep canvas same size as window.
resize();
window.addEventListener("resize", resize, false);
function resize() {
	Canvas.width = window.innerWidth;
	Canvas.height = window.innerHeight;
	ctx.clearRect(0, 0, Canvas.width, Canvas.height);
};

// Cache drawing
function cache(width, height) {
	var canvas = DOCUMENT.createElement(CANVAS);
	canvas.width = width;
	canvas.height = height;
	return canvas;
}

// Generic circle
function drawCircle(ctx, type, x, y, r, tilt, color, alpha, lineWidth, sColor, blur, start, end, angle, dir) {
	if (alpha === UNDEF) alpha = 1;
	if (start === UNDEF) start = 0;
	if (end === UNDEF) end = cr;
	if (angle === UNDEF) angle = 0;
	if (dir === UNDEF) dir = false;
	if (blur === UNDEF) blur = 0;
	ctx.beginPath();
	ctx.globalAlpha = alpha;
	ctx[type + "Style"] = color; // + alpha;
	ctx.lineWidth = lineWidth / View.zoom;
	ctx.shadowColor = sColor;
	ctx.shadowBlur = blur;
	ctx.ellipse(x, y, r, r * (tilt ? 1/View.tilt : 1), angle, start, end, dir);
	ctx[type]();
}

// Render orbit
var dashStyle = [5, 5];
var dashStyleReset = [];
function renderOrbit(body) {
	var orbit = body.orbit;
	if (orbit) {
		ctx.setLineDash(dashStyle);
		drawCircle(ctx, STROKE,
			orbit.planet.x,
			orbit.planet.y,
			orbit.distance,
			true,
			body.color, 0.3, 1
		);
		ctx.setLineDash(dashStyleReset);
	}
}

// Render trail
function renderTrail(body) {
	var orbit = body.orbit;
	if (orbit) {
		drawCircle(ctx, STROKE,
			orbit.planet.x,
			orbit.planet.y,
			orbit.distance, true,
			body.color, 0.3, 3,
			body.color, 0,
			orbit.angle - orbit.speed * orbit.distance,
			orbit.angle, 0,
			orbit.speed < 0
		);
	}
}

// Render body (star, planet, death star)
function renderBody(body, x, y) {
	if (!body.cache) {
		body.cache = cache(256, 256);
		var context = body.cache.getContext("2d");
		var color = body.isSun ? WHITE : body.color;
		var glow = body.isSun ? 50 : 10;
		if (body.isSun) context.filter = "blur(4px)";

		drawCircle(context, FILL,
			128, 128,
			body.size,
			false,
			color, 1, 0,
			body.color, glow
		);

		if (body.orbit) {
            var repeat = body.size;
            var o = body.size;
            context.beginPath();
            context.arc(128, 128, body.size, 0, 2*Math.PI, false);
            context.clip();
            while (repeat--) {
    			drawCircle(context, FILL,
    				128-o/2+(body.size-o)/2, 128,
    				o--*2,
    				false,
    				BLACK, 0.05, 0,
    				BLACK, 10, -cr / 4, cr / 4
    			);
            }
		}

		context.filter = "none";
	}

	var sun = orbitals[0];
	var angle = getAngle(body, sun);
	ctx.globalAlpha = 1;
	ctx.shadowBlur = 0;
	if (x === UNDEF) x = body.x;
	if (y === UNDEF) y = body.y;
	ctx.translate(x, y);
	ctx.rotate(angle);
	if (body.isSun) {
		var scale = 1 + rand() * 0.03;
		ctx.scale(scale, scale);
	}
	ctx.drawImage(body.cache, -128, -128);
	View.position();
}

function renderComLine(from, to) {
    ctx.setLineDash([1, 1]);
	ctx.beginPath();
	ctx.globalAlpha = 0.2 / View.zoom;
	ctx.moveTo(from.x, from.y);
    var up = 75 * (View.tilt - 1);
    ctx.bezierCurveTo(from.x, from.y-up, to.x, to.y-up, to.x, to.y);
	ctx.lineWidth = 1 / View.zoom * 2;
	ctx.strokeStyle = "#00FF00";
	ctx.stroke();
	ctx.globalAlpha = 1;
    ctx.setLineDash([]);
}

function drawDebug() {
	ctx.font = "14px monospace";
	ctx.textBaseline = "top";
	ctx.textAlign = 'left';
	ctx.fillStyle = "#ffffff";
	ctx.fillText("#js13k tower defense prototype", 20, 20);
	ctx.fillText("https://github.com/scorp200/td13k", 20, 40);
	ctx.fillText("framerate: " + fps, 20, 60);
	ctx.fillText("mouse (gui): " + Mouse.x + ", " + Mouse.y, 20, 80);
	ctx.fillText("mouse (view): " + Mouse.vx + ", " + Mouse.vy, 20, 100);
	ctx.fillText("planet name: " + hoverName, 20, 120);

    ctx.fillText("view x: " + View.x, 20, 160);
    ctx.fillText("view y: " + View.y, 20, 180);
    ctx.fillText("view zoom: " + View.zoom, 20, 200);
    ctx.fillText("view tilt: " + View.tilt, 20, 220);

	ctx.fillText("minerals: " + Math.floor(base.minerals * 100) / 100, 20, 260);
}
