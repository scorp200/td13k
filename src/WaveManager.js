//
var WaveManager = {

    // Timing.
    currentWave: 0,
    cooldown: 5,
    timer: 0,

    // Wave spawning.
    spawnCount: 100,

    //
    init: function() {
        WaveManager.timer = WaveManager.cooldown * 60;
    },

    //
    update: function() {
        if (!WaveManager.timer--) {
    		WaveManager.spawn();
            WaveManager.init();
        }
    },

    //
    spawn: function() {
        var n = WaveManager.spawnCount;
        while (n--) {
            var angle = Math.random() * cr;
            var x = Math.cos(angle) * 3000;
            var y = Math.sin(angle) * 3000;
            var ship = new EnemyShip(x, y);
            ship.direction = angle;
        }
    }

}
