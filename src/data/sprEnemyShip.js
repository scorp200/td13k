// sprEnemyShip
var sprEnemyShip = (function() {

    var canv = document.createElement("CANVAS");
    var ctx = canv.getContext("2d");
    canv.width = 64;
    canv.height = 64;

    // Body.
    ctx.fillStyle = "#ff0000";
    ctx.moveTo(0, 32);
    ctx.lineTo(64, 0);
    ctx.lineTo(48, 32);
    ctx.lineTo(64, 64);
    ctx.fill();

    return canv;

})();
