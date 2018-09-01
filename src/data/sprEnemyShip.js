// sprEnemyShip
var sprEnemyShip = (function() {

    var canv = document.createElement("CANVAS");
    var ctx = canv.getContext("2d");
    canv.width = 8;
    canv.height = 8;

    // Body.
    ctx.fillStyle = "#F00";
    ctx.moveTo(0, 4);
    ctx.lineTo(8, 0);
    ctx.lineTo(6, 4);
    ctx.lineTo(8, 8);
    ctx.fill();

    return canv;

})();
