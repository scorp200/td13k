// sprSatelliteIcon
var sprSatelliteIcon = (function() {

    var canv = document.createElement("CANVAS");
    var ctx = canv.getContext("2d");
    canv.width = 40;
    canv.height = 40;

    ctx.fillStyle = "#FFF";
	ctx.strokeStyle = "#FFF";
	ctx.lineWidth = 2;

	ctx.translate(20, 20);
	ctx.rotate(PI/4);
    ctx.fillRect(-9, -4, 8, 8);
	ctx.fillRect(-7, -8, 4, 16);
	ctx.fillRect(-12, 12-4, 14, 24);
	ctx.fillRect(-12, -12-20, 14, 24);

	ctx.beginPath();
	ctx.arc(30, 0, 20, 0, TAU);
	ctx.stroke();

    return canv;

})();
