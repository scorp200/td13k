/**
 * @constructor
 */
function EnemyShip(x, y) {
    this.x = x;
    this.y = y;
    this.z = Math.floor(Math.random()*20)
    this.direction = 0;
    this.hp = 10;
    this.target = base.planet;
    this.shootTimer = Math.random() * 10;
    EnemyShip.allInstances.push(this);
}

EnemyShip.speed = 5;
EnemyShip.range = 500;

EnemyShip.prototype = {

    update: function() {

        // Accuire and move to target.
        this.target = nearestTargetableOrbital(this.x, this.y);
        var a = getAngle(this, this.target) - this.direction;
        this.direction += (mod((a + cr/2), cr) - cr/2) * 0.01;
        this.x -= EnemyShip.speed * Math.cos(this.direction);
        this.y -= EnemyShip.speed * Math.sin(this.direction);

        // Shootzing!
        if (this.shootTimer-- <= 0) {
            this.shootTimer = 10;
            var distance = getDistance(this, this.target);
            if (distance < EnemyShip.range) {
                var miss = Math.random() > 0.5;
                var direction = getAngle(this, this.target);
                var range = miss ? 2000 : distance;
                Laser.create(this.x, this.y, direction, range, "#F00");
            }
        }

        // Health depleated.
        if (this.hp <= 0) {
            this.destroy();
        }

    },

    destroy : function() {
        EnemyShip.allInstances.splice(EnemyShip.allInstances.indexOf(this), 1);
    }

}

EnemyShip.allInstances = [];

EnemyShip.flockCollision = function() {
    var n = EnemyShip.allInstances.length;
    while (n--) {
        var inst1 = EnemyShip.allInstances[n];
        var i = n;
        while (i-- > 0) {
            var inst2 = EnemyShip.allInstances[i];
            var distance = getDistanceRaw(inst1, inst2);
            if (distance < 200) {
                var xm = (inst1.x - inst2.x) * 0.25;
                var ym = (inst1.y - inst2.y) * 0.25;
                inst1.x += xm;
                inst1.y += ym;
                inst2.x -= xm;
                inst2.y -= ym;
            }
        }
    }
}

EnemyShip.nearest = function(p, minRange) {
    var nearest = null;
    var distance = minRange;
    var n = EnemyShip.allInstances.length;
    while (n--) {
        var inst = EnemyShip.allInstances[n];
        var newDistance = getDistance(p, inst);
        if (newDistance < distance) {
            nearest = inst;
            distance = newDistance;
        }
    }
    return nearest;
}

EnemyShip.updateAll = function() {
    EnemyShip.flockCollision();
    var n = EnemyShip.allInstances.length;
    while (n--) {
        EnemyShip.allInstances[n].update();
    }
}

EnemyShip.renderAll = function() {
    var ox = -sprEnemyShip.width/2;
    var oy = -sprEnemyShip.height/2;
    var n = EnemyShip.allInstances.length;
    while (n--) {
        var inst = EnemyShip.allInstances[n];
        ctx.save();
    	ctx.translate(inst.x, inst.y/View.tilt-inst.z*View.tilt);
        ctx.scale(0.3, 0.3/View.tilt);
    	ctx.rotate(inst.direction);
    	ctx.drawImage(sprEnemyShip, ox, oy);
    	ctx.restore();
    }
}
