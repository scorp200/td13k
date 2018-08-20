var Base = function(planet){
    var t = {};
    t.planet = planet;
    t.mineRate = 0.01;
    t.attackRange = 300;
    t.shieldHP = 0;
    t.shieldRegen = 0;
    t.comRange = 400;
    t.minerals = 0;
    return t;
}
