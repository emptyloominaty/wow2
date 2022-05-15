creatures = []

class Creature {
    id = 0
    name = ""
    health = 0
    maxHealth = 0
    energy = 0 //mana
    maxEnergy = 0
    energyRegen = 0.8 // 1sec

    stats = {primary:100, haste:20, crit:10, vers:0, mastery:34, leech:0, avoidance:0, dodge:0, armor:100, speed:0, stamina:100}

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
    casting = {name:"", time:0, time2:0}
    isDead = false
    gcd = 0

    buffs = []
    debuffs = []

    target = ""
    targetObj = {}


    constructor(name,enemy,health,energy,x,y,direction,spec) {
        this.id = creatures.length
        creatures.push(this)
        this.enemy = enemy
        this.name = name
        this.health = health
        this.maxHealth = health
        this.energy = energy
        this.maxEnergy = energy
        this.direction = direction
        this.x = x
        this.y = y

        this.abilities = {}
        if (spec==="mistweaver") {
            this.abilities = new Mw_abilities()
        }
    }

    run() {
        this.energy += this.energyRegen/fps
        if (this.energy>this.maxEnergy) {
            this.energy = this.maxEnergy
        }

        if (this.gcd>0) {
            this.gcd -= progress/1000
        }

        //abilities cds
        Object.keys(this.abilities).forEach((key)=> {
            this.abilities[key].run()
        })

        //casting ability
        if (this.isCasting) {
            if (this.casting.time<this.casting.time2) {
                this.casting.time += progress/1000
            } else {
                this.abilities[this.casting.name].endCast(this)
                this.casting = {name:"", time:0, time2:0}
                this.isCasting = false
            }
        }

        //buffs / debuffs
        for (let i = 0; i<this.buffs.length; i++) {
            if (this.buffs[i].type==="hot") {
                if (this.buffs[i].timer<1) {
                    this.buffs[i].timer+= (progress/1000)*(1 + (this.buffs[i].caster.stats.haste / 100))
                } else {
                    doHeal(this.buffs[i].caster,this,this.buffs[i])
                    this.buffs[i].timer = 0
                }
            } else if (this.buffs[i].type==="buff") {

            }


            this.buffs[i].duration-=progress/1000
            if (this.buffs[i].duration<0) {
                this.buffs.splice(i,1)
                i--
            }
        }
        //
    }

    useEnergy(val) {
        let reduceEnergyCost = 1
        for (let i = 0; i<this.buffs.length; i++) {
            if (this.buffs[i].effect === "reduceEnergyCost") {
                reduceEnergyCost = this.buffs[i].effectValue
            }
        }
        this.energy -= val * reduceEnergyCost
    }

    move(val,strafe = 0) { //val -0.5 - 1
        let speed = val * this.moveSpeed
        let angleInRadian = 0
        if (strafe===0) {
            angleInRadian = (this.direction-180) / 180 * Math.PI
        } else if (strafe===1) {
            angleInRadian = (this.direction-90) / 180 * Math.PI
        } else if (strafe===2) {
            angleInRadian = (this.direction-270) / 180 * Math.PI
        }

        let vx = Math.sin(angleInRadian) * speed
        let vy = Math.cos(angleInRadian) * speed

        if (this.isCasting) {
            this.isCasting = false
            this.gcd = 0
            this.casting = {name:"", time:0, timeleft:0}
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