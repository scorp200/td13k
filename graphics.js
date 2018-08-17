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

// Render orbit
function renderOrbit(body) {
    var orbit = body.orbit;
    if (orbit) {
        ctx.beginPath();
        ctx.strokeStyle = body.color + "33";
        ctx.setLineDash([5,5])
        ctx.shadowBlur = 2;
        ctx.shadowColor = body.color;
        ctx.lineWidth = 2;
        ctx.ellipse(orbit.planet.x, orbit.planet.y, orbit.distance, orbit.distance/2, 0, 0, cr);
        ctx.stroke();
        ctx.setLineDash([]);
    }
}

// Render trail
function renderTrail(body) {
    var orbit = body.orbit;
    if (orbit) {
        ctx.beginPath();
        ctx.shadowBlur = 10;
        ctx.shadowColor = body.color;
        ctx.lineWidth = 4;
        ctx.strokeStyle = body.color + "55";
        ctx.ellipse(orbit.planet.x, orbit.planet.y, orbit.distance, orbit.distance/2, 0, orbit.angle-orbit.speed*200, orbit.angle, orbit.speed<0);
        ctx.stroke();
    }
}

// Render body (star, planet, death star)
function renderBody(body) {
    ctx.beginPath();
    ctx.shadowBlur = body.size;
    ctx.shadowColor = body.color;
    ctx.fillStyle = body.color;
    ctx.arc(body.x, body.y, body.size, 0, cr);
    ctx.fill();

    if (body.orbit) {
        ctx.beginPath();
        ctx.shadowBlur = body.size;
        ctx.shadowColor = "black";
        ctx.fillStyle = "#000000AA";
        ctx.arc(body.x, body.y, body.size, body.orbit.angle-cr/4, body.orbit.angle+cr/2-cr/4);
        ctx.fill();
    }
}
