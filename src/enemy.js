/**
 * @constructor
 */
function EnemyShip(x, y) {
    this.x = x;
    this.y = y;
    this.z = Math.floor(Math.random()*20)
    this.speed = 5;
    this.direction = 0;
    this.hp = 10;
    this.target = base.planet;
    EnemyShip.allInstances.push(this);
}

EnemyShip.prototype = {

    update: function() {
        var a = getAngle(this, this.target) - this.direction;
        this.direction += (mod((a + cr/2), cr) - cr/2) * 0.01;
        this.x -= this.speed * Math.cos(this.direction);
        this.y -= this.speed * Math.sin(this.direction);

        //if (getDistance(this, this.target) < 100) {
            //this.destroy();
        //}

        // Health depleated.
        if (this.hp <= 0) {
            this.destroy();
        }

    },

    render: function() {
        ctx.save();
    	ctx.translate(this.x, this.y/View.tilt-this.z*View.tilt);
        ctx.scale(0.2, 0.2/View.tilt);
    	ctx.rotate(this.direction);
    	ctx.drawImage(sprEnemyShip, -sprEnemyShip.width/2, -sprEnemyShip.height/2);
    	ctx.restore();
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
    var n = EnemyShip.allInstances.length;
    while (n--) {
        EnemyShip.allInstances[n].render();
    }
}
