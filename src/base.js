var Base = (function(){

	var planet;
	var hp;
	var mineRate;
	var energyRate;
	var attackRange;
	var comRange;
	var minerals;
	var energy;

	/**
	 * @param {Object} p Planet the base should be on.
	 * @return {void}
	 */
	function create(p) {
		planet = p;
		hp = 100;
		mineRate = 0.05;
		energyRate = 0.05;
		attackRange = 300;
		comRange = 500;
		minerals = 100;
		energy = 10;
	}

	// Export.
    return {
		create: create,
        get planet() { return planet; },
        get hp() { return hp; },
        get mineRate() { return mineRate; },
        get energyRate() { return energyRate; },
        get attackRange() { return attackRange; },
        get comRange() { return comRange; },
        get minerals() { return minerals; },
        get energy() { return energy; },
		set minerals(x) { minerals = x; },
        set energy(x) { energy = x; }
    }

})();
