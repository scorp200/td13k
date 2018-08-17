// Setup Canvas (move to graphics.js)
var doc = document;
var Canvas = doc.getElementById("c");
var ctx = Canvas.getContext("2d");
var View = { x: 0, y: 0, zoom: 1 };

// Keep canvas same size as window.
function resize() {
    Canvas.width = window.innerWidth;
    Canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, Canvas.width, Canvas.height);
};
resize();
addEventListener("resize", resize);

// Cache drawing
function cache(width, height) {
    var canvas = document.createElement("CANVAS");
    canvas.width = width;
    canvas.height = height;
    return canvas;
}

// Generic circle
function drawCircle(ctx, type, x, y, r, tilt, color, alpha, lineWidth, sColor, blur, start, end, angle, dir) {
    if (alpha === UNDEF) alpha = "ff";
    if (start === UNDEF) start = 0;
    if (end === UNDEF) end = cr;
    if (angle === UNDEF) angle = 0;
    if (dir === UNDEF) dir = false;
    if (blur === UNDEF) blur = 0;
    ctx.beginPath();
    ctx[type+"Style"] = color + alpha;
    ctx.lineWidth = lineWidth;
    ctx.shadowColor = sColor;
    ctx.shadowBlur = blur;
    ctx.ellipse(x, y, r, r*(tilt?0.5:1), angle, start, end, dir);
    ctx[type]();
}

// Render orbit
function renderOrbit(body) {
    var orbit = body.orbit;
    if (orbit) {
        ctx.setLineDash([5,5]);
        drawCircle(ctx, STROKE,
            orbit.planet.x,
            orbit.planet.y,
            orbit.distance,
            true,
            body.color, "33", 1
        );
        ctx.setLineDash([]);
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
            body.color, "33", 3,
            body.color, 5,
            orbit.angle-orbit.speed*orbit.distance,
            orbit.angle, 0,
            orbit.speed<0
        );
    }
}

// Render body (star, planet, death star)
function renderBody(body) {
    if (!body.cache) {
        body.cache = cache(256, 256);
        var context = body.cache.getContext("2d");
        var color = body.isSun ? WHITE : body.color;
        var glow = body.isSun ? 50 : body.size/10;
        if (body.isSun) context.filter = "blur(4px)";
        drawCircle(context, FILL,
            128, 128,
            body.size,
            false,
            color, "ff", 0,
            body.color, glow,
        );

        if (body.orbit) {
            context.filter = "blur(3px)";
            drawCircle(context, FILL,
                128, 128,
                body.size,
                false,
                BLACK, "88", 0,
                body.color, 2,
                -cr/4, cr/4
            );
        }

        context.filter = "none";
    }

    var sun = orbitals[0];
    var angle = Math.atan2((body.y - sun.y)*2, body.x - sun.x);
    ctx.translate(body.x, body.y);
    ctx.rotate(angle);
    if (body.isSun) {
        var scale = 1+rand()*0.03;
        ctx.scale(scale, scale);
    }
    ctx.drawImage(body.cache, -128, -128);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
}
