// sprRocket
var sprRocket = (function() {

    var canv = document.createElement("CANVAS");
    var ctx = canv.getContext("2d");
    canv.width = 16;
    canv.height = 8;

    // Body.
    ctx.fillStyle = "#0F0";
    ctx.moveTo(0, 4);
    ctx.lineTo(16, 0);
    ctx.lineTo(16, 8);
    ctx.fill();

    return canv;

})();
