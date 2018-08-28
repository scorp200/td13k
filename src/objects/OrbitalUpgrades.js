var OrbitalUpgrades = (function() {

    var upgrades = {}

    //
    function init() {
        Object.assign(upgrades, {
        	laser: {
        		loc: ORBITAL_TYPE.DEFENSE,
        		name: "Lasers",
        		img: null,
        		func: null
        	},
        	beam: {
        		loc: ORBITAL_TYPE.DEFENSE,
        		name: "Beam",
        		img: null,
        		func: null
        	},
        	rocket: {
        		loc: ORBITAL_TYPE.DEFENSE,
        		name: "Rockets",
        		img: null,
        		func: null
        	}
        });
    }

    /**
     *
     */
    function getUpgradesByLocation(loc) {
        var arr = [];
        for (var name in upgrades) {
            (upgrades[name].loc === loc) && arr.push(name);
        }
        return arr;
    }

    /**
     * @param {Object} m Weapon module.
     * @param {string} type Type of module.
     * @return {Object}
     */
    function getUpgrade(m, type) {
        var u = upgrades[type];
        var level = (m.type === type) ? m.level+1 : 1;
        return {
            img: u.img,
            text: u.name + " (Level " + level + ")",
            func: u.func
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
            arr.push(getUpgrade(t.module, type));
        });

        //
        return arr;

    }

    // Export.
    return {
        init: init,
        byLocation: getUpgradesByLocation,
        get: getUpgrades
    }

})();
