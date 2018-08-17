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
    if (body.orbit) {
        ctx.beginPath();
        ctx.strokeStyle = body.color + "55";
        ctx.ellipse(body.orbit.planet.x, body.orbit.planet.y, body.orbit.distance, body.orbit.distance/2, 0, 0, 360);
        ctx.closePath();
        ctx.stroke();
    }
}

// Render body (star, planet, death star)
function renderBody(orb) {
    ctx.beginPath();
    ctx.fillStyle = orb.color;
    ctx.arc(orb.x, orb.y, orb.size, 0, cr);
    ctx.closePath();
    ctx.fill();
}
