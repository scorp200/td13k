// sprDefensePlatformLaser
var sprDefensePlatformLaser = (function() {

    var canv = document.createElement("CANVAS");
    var ctx = canv.getContext("2d");
    canv.width = 100;
    canv.height = 100;

	ctx.translate(50, 50);

	ctx.fillStyle = "#444";
	ctx.beginPath();
    ctx.arc(0, 0, 15, 0, TAU);
	ctx.fill();

	ctx.lineWidth = 5;
	ctx.strokeStyle = "#666";
	ctx.beginPath();
	ctx.moveTo(0, -6);
	ctx.lineTo(-30, -6);
	ctx.moveTo(0, 6);
	ctx.lineTo(-30, 6);
	ctx.stroke();

    return canv;

})();
