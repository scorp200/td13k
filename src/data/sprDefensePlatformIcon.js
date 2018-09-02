// sprDefensePlatformIcon
var sprDefensePlatformIcon = (function() {

    var canv = document.createElement("CANVAS");
    var ctx = canv.getContext("2d");
    canv.width = 40;
    canv.height = 40;

    ctx.fillStyle = "#FFF";
	ctx.strokeStyle = "#FFF";
	ctx.lineWidth = 2;

    ctx.fillRect(0, 35-4, 40, 5);
	ctx.fillRect(20-10-4, 40-4, 28, 5);

	ctx.beginPath();
	ctx.moveTo(24-10-4, 35-4);
	ctx.lineTo(24-5-4, 30-4);
	ctx.lineTo(24+5-4, 30-4);
	ctx.lineTo(24+10-4, 35-4);
	ctx.fill();

	ctx.beginPath();
	ctx.moveTo(24-3-4, 30-4);
	ctx.lineTo(24-6-4, 25-4);
	ctx.moveTo(24+3-4, 30-4);
	ctx.lineTo(24-4, 25-4);

	ctx.moveTo(24-15-4, 10-4);
	ctx.lineTo(24-18-4, 5-4);

	ctx.moveTo(24+5-9-4, 20-3-4);
	ctx.lineTo(24+5-12-4, 15-3-4);

	ctx.stroke();

    return canv;

})();
