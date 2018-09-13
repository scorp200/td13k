// sprOnlineIndicator
var sprOnlineIndicator = (function() {

    var canv = document.createElement("CANVAS");
    var ctx = canv.getContext("2d");
    canv.width = 128;
    canv.height = 64;

	ctx.lineWidth = 2;
	ctx.fillStyle = "rgba(255,0,0,0.2)";
    ctx.strokeStyle = "#F00";
    ctx.arc(32, 32, 30, 0, TAU);
    ctx.stroke();
	ctx.fill();

	ctx.beginPath();
	ctx.fillStyle = "rgba(0,255,0,0.2)";
	ctx.strokeStyle = "#0F0";
    ctx.arc(96, 32, 30, 0, TAU);
    ctx.stroke();
	ctx.fill();

    return canv;

})();
