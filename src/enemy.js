/**
 * @constructor
 */
function EnemyShip(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 5;
    this.direction = 0;
    this.target = orbitals[0];
    EnemyShip.allInstances.push(this);
}

EnemyShip.prototype = {

    update: function() {
        var a = getAngle(this, this.target) - this.direction;
        this.direction += (mod((a + cr/2), cr) - cr/2) * 0.01;
        this.x -= this.speed * Math.cos(this.direction);
        this.y -= this.speed * Math.sin(this.direction);

        if (getDistance(this, this.target) < 100) {
            this.destroy();
        }
    },

    render: function() {
        ctx.save();
    	ctx.translate(this.x, this.y/View.tilt-20*View.tilt);
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
