creatures = 0

class Creature {
    id = 0
    name = ""
    health = 0
    maxHealth = 0
    energy = 0 //mana
    maxEnergy = 0

    moveSpeed = 1
    x = 0
    y = 0
    direction = 0
    enemy = false

    //-------
    isStunned = false
    isRooted = false
    isMoving = false
    isCasting = false
    isDead = false

    target = ""
    targetObj = {}


    constructor(name,enemy,health,energy,x,y,direction,speed = 1) {
        this.id = creatures
        creatures ++
        this.enemy = enemy
        this.name = name
        this.health = health
        this.maxHealth = health
        this.energy = energy
        this.maxEnergy = energy
        this.moveSpeed = speed
        this.x = x
        this.y = y
    }

    move(val) { //val -0.5 - 1
        let speed = val * this.moveSpeed
        let angleInRadian = (this.direction-180) / 180 * Math.PI
        let vx = Math.sin(angleInRadian) * speed
        let vy = Math.cos(angleInRadian) * speed

        if (this.isCasting) {
            //TODO:STOP CASTING
        }
        if (!this.isStunned && !this.isRooted) {
            this.x += vx
            this.y += vy
        }

/*TODO:
        //----------------------------------------------X
        if (this.x+vx > mapWidth) {
            this.x = (this.x+vx - mapWidth)
        } else if (this.x+vx < 0) {
            this.x = (mapWidth + this.x+vx)
        } else {
            this.x +=  vx
        }
        //----------------------------------------------Y
        if (this.y+vy > mapHeight) {
            this.y = (this.y+vy - mapHeight)
        } else if (this.y+vy < 0) {
            this.y = (mapHeight + this.y+vy)
        } else {
            this.y +=  vy
        }
*/
    }

    rotate(dir) { //0-360
        if (!this.isStunned && !this.isRooted) {
            this.direction = dir
            this.direction = this.direction % 360
            if (this.direction < 0) {
                this.direction += 360
            }
        }
    }

}