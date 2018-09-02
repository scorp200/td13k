// sprDefensePlatformIcon
var sprDefensePlatformIcon = (function() {

    var canv = document.createElement("CANVAS");
    var ctx = canv.getContext("2d");
    canv.width = 48;
    canv.height = 48;

    ctx.fillStyle = "#FFF";
	ctx.strokeStyle = "#FFF";
	ctx.lineWidth = 2;

	ctx.rect(4, 4, 40, 40);
	ctx.clip();

    ctx.fillRect(0, 35, 48, 5);
	ctx.fillRect(20-10, 40, 28, 5);

	ctx.beginPath();
	ctx.moveTo(24-10, 35);
	ctx.lineTo(24-5, 30);
	ctx.lineTo(24+5, 30);
	ctx.lineTo(24+10, 35);
	ctx.fill();

	ctx.beginPath();
	ctx.moveTo(24-3, 30);
	ctx.lineTo(24-6, 25);
	ctx.moveTo(24+3, 30);
	ctx.lineTo(24, 25);

	ctx.moveTo(24-15, 10);
	ctx.lineTo(24-18, 5);

	ctx.moveTo(24+5-9, 20-3);
	ctx.lineTo(24+5-12, 15-3);

	ctx.stroke();

    return canv;

})();
