// sprPauseIcon
var sprPauseIcon = (function() {

    var canv = document.createElement("CANVAS");
    var ctx = canv.getContext("2d");
    canv.width = 160;
    canv.height = 80;

    ctx.fillStyle = "#FFF";

	// Paused.
    ctx.fillRect(10, 10, 20, 60);
	ctx.fillRect(50, 10, 20, 60);

	// Play.
	ctx.moveTo(80+10, 10);
	ctx.lineTo(80+70, 40);
	ctx.lineTo(80+10, 70);
	ctx.fill();

    return canv;

})();
