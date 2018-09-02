// sprMiningStationIcon
var sprMiningStationIcon = (function() {

    var canv = document.createElement("CANVAS");
    var ctx = canv.getContext("2d");
    canv.width = 48;
    canv.height = 48;

    ctx.fillStyle = "#FFF";
	ctx.strokeStyle = "#FFF";
	ctx.lineWidth = 2;

	ctx.rect(4, 4, 40, 40);
	ctx.clip();

    ctx.fillRect(0, 0, 48, 9);

	ctx.fillRect(20-14, 9, 4, 4);
	ctx.fillRect(20+18, 9, 4, 4);
	ctx.fillRect(24-8, 9, 16, 8);
	ctx.fillRect(24-2, 9, 4, 24);

	ctx.beginPath();
	ctx.moveTo(16, 27);
	ctx.lineTo(24, 9+24);
	ctx.lineTo(32, 27);
	ctx.stroke();

	ctx.beginPath();
	ctx.arc(24, 74, 40, 0, TAU);
	ctx.stroke();

    return canv;

})();
