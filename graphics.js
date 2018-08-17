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
function drawCircle(x, y, rx, ry, color) {
    ctx.beginPath();
    ctx.setLineDash([5,5])
    ctx.strokeStyle = color + "33";
    ctx.lineWidth = 2;
    ctx.shadowColor = color;
    ctx.shadowBlur = 2;
    ctx.ellipse(x, y, rx, ry, 0, 0, cr);
    ctx.stroke();
    ctx.setLineDash([]);
}

// Render orbit
function renderOrbit(body) {
    var orbit = body.orbit;
    if (orbit) {
        drawCircle(
            orbit.planet.x,
            orbit.planet.y,
            orbit.distance,
            orbit.distance/2,
            body.color
        );
        //ctx.beginPath();
        //ctx.setLineDash([5,5])
        //ctx.strokeStyle = body.color + "33";
        //ctx.lineWidth = 2;
        //ctx.shadowColor = body.color;
        //ctx.shadowBlur = 2;
        //ctx.ellipse(orbit.planet.x, orbit.planet.y, orbit.distance, orbit.distance/2, 0, 0, cr);
        //ctx.stroke();
        //ctx.setLineDash([]);
    }
}

// Render trail
function renderTrail(body) {
    var orbit = body.orbit;
    if (orbit) {
        ctx.beginPath();
        ctx.strokeStyle = body.color + "55";
        ctx.lineWidth = 4;
        ctx.shadowColor = body.color;
        ctx.shadowBlur = 10;
        ctx.ellipse(orbit.planet.x, orbit.planet.y, orbit.distance, orbit.distance/2, 0, orbit.angle-orbit.speed*orbit.distance, orbit.angle, orbit.speed<0);
        ctx.stroke();
    }
}

// Render body (star, planet, death star)
function renderBody(body) {
    if (!body.cache) {
        body.cache = cache(128, 128);
        var context = body.cache.getContext("2d");

        context.beginPath();
        context.shadowBlur = body.size;
        context.shadowColor = body.color;
        context.fillStyle = body.color;
        if (body.isSun===true) context.filter = "blur(4px)";
        context.arc(64, 64, body.size, 0, cr);
        context.fill();

        if (body.orbit) {
            var sun = orbitals[0];
            var angle = Math.atan2((body.y - sun.y)*2, body.x - sun.x);
            context.beginPath();
            context.filter = "blur(4px)";
            context.shadowBlur = body.size;
            context.shadowColor = "black";
            context.fillStyle = "#000000AA";
            context.arc(64, 64, body.size, -cr/4, cr/4);
            context.fill();
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
    ctx.drawImage(body.cache, -64, -64);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
}
