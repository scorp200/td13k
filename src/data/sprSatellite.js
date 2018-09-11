// sprSatellite
var sprSatellite = (function() {

    var canv = document.createElement("CANVAS");
    var ctx = canv.getContext("2d");
    canv.width = 20;
    canv.height = 140;

    // Body.
    ctx.fillStyle = "#dddddd";
    ctx.fillRect(8, 50, 4, 40);

    // Panels.
    ctx.fillStyle = "#639bff";
    ctx.fillRect(2, 0, 15, 60);
    ctx.fillRect(2, 80, 15, 60);

    // Body.
    ctx.fillStyle = "#9badb7";
    ctx.fillRect(2, 65, 17, 10);
    ctx.fillRect(0, 66, 2, 8);

    return canv;

})();
