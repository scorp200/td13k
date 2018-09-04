//
var Explosion = (function() {

	function create(x, y) {
		var count = 50;
		while (count--) {
			var a = Math.random() * TAU;
			var spd = 5 + Math.random() * 5;
			Laser.create(x, y, a, 200, "#FF0", spd);
		}
	}

	// Export.
	return {
		create: create
	}

})();
