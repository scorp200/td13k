// sprEnemyShip
var sprEnemyShip = (function() {

    var canv = document.createElement("CANVAS");
    var ctx = canv.getContext("2d");
    canv.width = 32;
    canv.height = 32;

    // Body.
    ctx.fillStyle = "#ff0000";
    ctx.moveTo(0, 16);
    ctx.lineTo(32, 0);
    ctx.lineTo(24, 16);
    ctx.lineTo(32, 32);
    ctx.fill();

    return canv;

})();
