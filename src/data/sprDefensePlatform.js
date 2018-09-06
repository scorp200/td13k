// sprDefensePlatform
var sprDefensePlatform = (function() {

    var canv = document.createElement("CANVAS");
    var ctx = canv.getContext("2d");
    canv.width = 100;
    canv.height = 100;

	ctx.translate(50, 50);

	//
	ctx.fillStyle = "#444";
	ctx.moveTo(-20, 0);
	ctx.lineTo(0, 50);
	ctx.lineTo(20, 0);
	ctx.fill();

    // Body.
	ctx.fillStyle = "#a33";
	ctx.beginPath();
	ctx.scale(1, 0.5);
    ctx.arc(0, 0, 40, 0, TAU);
	ctx.fill();

	ctx.fillStyle = "#222";
	ctx.beginPath();
    ctx.arc(0, -5, 35, 0, TAU);
	ctx.fill();

    return canv;

})();
