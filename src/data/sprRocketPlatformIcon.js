// sprRocketPlatformIcon
var sprRocketPlatformIcon = (function() {

    var canv = document.createElement("CANVAS");
    var ctx = canv.getContext("2d");
    canv.width = 40;
    canv.height = 40;

    ctx.fillStyle = "#FFF";
	ctx.strokeStyle = "#FFF";
	ctx.lineWidth = 4;

    ctx.fillRect(0, 35-4, 40, 5);
	ctx.fillRect(20-10-4, 40-4, 28, 5);

	ctx.beginPath();
	ctx.moveTo(24-10-4, 35-4);
	ctx.lineTo(24-3-4, 30-8);

	ctx.lineTo(24-3-4, 20-8);
	ctx.lineTo(24-4, 10-8);
	ctx.lineTo(24+3-4, 20-8);

	ctx.lineTo(24+3-4, 30-8);
	ctx.lineTo(24+10-4, 35-4);
	ctx.lineTo(24-5-4, 30-6);
	ctx.lineTo(24+5-4, 30-6);
	ctx.fill();

    return canv;

})();
