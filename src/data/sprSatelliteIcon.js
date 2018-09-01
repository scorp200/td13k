// sprSatellite
var sprSatelliteIcon = (function() {

    var canv = document.createElement("CANVAS");
    var ctx = canv.getContext("2d");
    canv.width = 48;
    canv.height = 48;

    ctx.fillStyle = "#FFF";

	ctx.rect(4, 4, 40, 40);
	ctx.clip();

	ctx.translate(24, 24);
	ctx.rotate(PI/4);
    ctx.fillRect(-4, -4, 8, 8);
	ctx.fillRect(-2, -8, 4, 16);
	ctx.fillRect(-5, 12-4, 10, 24);
	ctx.fillRect(-5, -12-20, 10, 24);

    return canv;

})();
