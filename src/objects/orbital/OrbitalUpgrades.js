var OrbitalUpgrades = (function() {

    var upgrades = [];

    /**
	 * @return {void}
	 */
    function init() {

		upgrades[ORBITAL_MODULE_TYPE.LASER] = {
    		loc: ORBITAL_TYPE.DEFENSE,
    		name: "Lasers",
    		img: null,
            impl: laserCode
    	}

		upgrades[ORBITAL_MODULE_TYPE.BEAM] = {
    		loc: ORBITAL_TYPE.DEFENSE,
    		name: "Beam",
    		img: null,
            impl: beamCode
    	}

		upgrades[ORBITAL_MODULE_TYPE.ROCKET] = {
    		loc: ORBITAL_TYPE.DEFENSE,
    		name: "Rockets",
    		img: null,
            impl: rocketCode
    	}

		upgrades[ORBITAL_MODULE_TYPE.EMP] = {
    		loc: ORBITAL_TYPE.DEFENSE,
    		name: "EMP",
    		img: null,
            impl: slowCode
    	}

		upgrades[ORBITAL_MODULE_TYPE.LIGHTNING] = {
    		loc: ORBITAL_TYPE.DEFENSE,
    		name: "Lightning",
    		img: null,
            impl: zapCode
    	}

    }

    /**
     * @param {number} loc ORBITAL_TYPE.
	 * @return {Array}
     */
    function getUpgradesByLocation(loc) {
        var arr = [];
        for (var n=0; n<upgrades.length; n++) {
            if (upgrades[n].loc === loc) {
				arr.push(upgrades[n]);
			}
        }
        return arr;
    }

    /**
     * @param {Object} t Orbital.
     * @param {number} type ORBITAL_MODULE_TYPE.
     * @return {Object}
     */
    function getUpgrade(t, type) {
        var m = t.module;
        var u = upgrades[type];
        var level = (m.type === type) ? m.level+1 : 1;
        return {
            img: u.img,
            text: u.name + " (Level " + level + ")",
            func: Orbital.setModuleUpgrade.bind(null, t, type, level),
            speech: "Upgrading level " + m.level + " " + m.type
                    + ", to level " + level + " " + type
        }
    }

    /**
     * @param {Object} t Orbital.
     * @return {Array}
     */
    function getUpgrades(t) {

        // Orbital doesn't have a module.
        if (!t.module) return [];

        //
        var arr = [];
        var list = getUpgradesByLocation(t.type);
        list.forEach(function(type) {
            arr.push(getUpgrade(t, type));
        });

        //
        return arr;

    }

    /**
     * @param {number} type ORBITAL_MODULE_TYPE. Should change to a constant.
     * @return {Function}
     */
    function getImplementation(type) {
        return upgrades[type].impl;
    }

    // Export.
    return {
        init: init,
        byLocation: getUpgradesByLocation,
        get: getUpgrades,
        impl: getImplementation
    }

})();
