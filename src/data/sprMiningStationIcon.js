// sprMiningStationIcon
var sprMiningStationIcon = (function() {

    var canv = document.createElement("CANVAS");
    var ctx = canv.getContext("2d");
    canv.width = 40;
    canv.height = 40;

    ctx.fillStyle = "#FFF";
	ctx.strokeStyle = "#FFF";
	ctx.lineWidth = 2;

    ctx.fillRect(0-4, 0-4, 48, 9);

	ctx.fillRect(20-14-4, 9-4, 4, 4);
	ctx.fillRect(20+18-4, 9-4, 4, 4);
	ctx.fillRect(24-8-4, 9-4, 16, 8);
	ctx.fillRect(24-2-4, 9-4, 4, 24);

	ctx.beginPath();
	ctx.moveTo(16-4, 27-4);
	ctx.lineTo(24-4, 9+24-4);
	ctx.lineTo(32-4, 27-4);
	ctx.stroke();

	ctx.beginPath();
	ctx.arc(24-4, 74-4, 40, 0, TAU);
	ctx.stroke();

    return canv;

})();
