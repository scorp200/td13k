// sprEmpPlatformIcon
var sprEmpPlatformIcon = (function() {

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
	ctx.rect(20-1, 20, 2, 10);
	ctx.arc(20, 20, 5, 0, TAU);
	ctx.fill();

	ctx.beginPath();
	ctx.arc(20, 20, 18, 0, TAU);
	ctx.stroke();

    return canv;

})();
