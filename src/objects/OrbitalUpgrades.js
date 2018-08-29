var OrbitalUpgrades = (function() {

    var upgrades = {}

    //
    function init() {
        Object.assign(upgrades, {
        	"laser": {
        		loc: ORBITAL_TYPE.DEFENSE,
        		name: "Lasers",
        		img: null,
        		func: null,
                impl: laserCode
        	},
        	"beam": {
        		loc: ORBITAL_TYPE.DEFENSE,
        		name: "Beam",
        		img: null,
        		func: null,
                impl: beamCode
        	},
        	"rocket": {
        		loc: ORBITAL_TYPE.DEFENSE,
        		name: "Rockets",
        		img: null,
        		func: null,
                impl: rocketCode
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
     * @param {Object} t Orbital.
     * @param {string} type Type of module.
     * @return {Object}
     */
    function getUpgrade(t, type) {
        var m = t.module;
        var u = upgrades[type];
        var level = (m.type === type) ? m.level+1 : 1;
        return {
            img: u.img,
            text: u.name + " (Level " + level + ")",
            func: setModuleUpgrade.bind(null, t, type, level),
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
     * @param {string} type Upgrade name. Should change to a constant.
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
        implementation: getImplementation
    }

})();
