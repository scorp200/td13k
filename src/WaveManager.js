//
var WaveManager = (function() {

    // Vars.
    var currentWave = 0;
    var cooldown = 60;
    var timer = 0;
    var spawnCount = 30;

    // Speech flavor.
    var speechFlavor = [
        "enemies, approaching",
        "we are under attack",
        "enemy, in-bound",
        "hostiles detected"
    ];

    /***************************************************************************
	 * Inits/resets manager.
	 * @return {void}
	 */
    function init() {
		currentWave = 0;
        timer = cooldown * 60;
    }

	/***************************************************************************
	 * Counts down the timer and spawns waves.
	 * @return {void}
	 */
    function update() {

		// Disable countdown if tutorial is still running.
		if (!Tutorial.end) {
			return;
		}

        if (!timer--) {
    		spawn();
            currentWave++;
			cooldown = Math.max(cooldown-2, 2);
			spawnCount += 30;
			timer = cooldown * 60;

            var i = ~~(Math.random()*speechFlavor.length);
            speak(speechFlavor[i]);
        }
    }

	/***************************************************************************
	 * Spawn ships.
	 * @return {void}
	 */
    function spawn() {
		var dis = starSystem.size;
        var n = spawnCount;
        while (n--) {
            var a = Math.random() * TAU;
            var x = Math.cos(a) * dis;
            var y = Math.sin(a) * dis;
            var ship = EnemyShip.create(x, y, a);
        }
    }

	//**************************************************************************
	// Export.
	return {
		init: init,
		update: update,
		get timer() { return timer; },
		get currentWave() { return currentWave; }
	}

})();
