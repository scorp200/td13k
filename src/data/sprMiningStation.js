// sprMiningStation
var sprMiningStation = (function() {

	var canv = document.createElement("CANVAS");
	var ctx = canv.getContext("2d");
	canv.width = 20;
	canv.height = 140;

	// Body.
	ctx.fillStyle = "#ddd";
	ctx.fillRect(8, 50, 4, 40);

	// Panels.
	ctx.fillStyle = "#b33";
	ctx.fillRect(2, 30, 15, 30);
	ctx.fillRect(2, 80, 15, 30);

	// Body.
	ctx.fillStyle = "#9badb7";
	ctx.fillRect(2, 65, 17, 10);
	ctx.fillRect(0, 66, 2, 8);

	return canv;

})();
