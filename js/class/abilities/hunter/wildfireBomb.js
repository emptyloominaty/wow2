class WildfireBomb extends Ability {
    constructor() {
        let name = "Wildfire Bomb"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 18
        let charges = 1
        let channeling = false
        let casting = true
        let canMove = false
        let school = "fire"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.hasteCd = true
        this.spellPower = 0.495
        this.spellPowerDot = 0.99
        this.duration = 6
    }

    getTooltip() {
        return "Hurl a bomb at the target, exploding for  "+spellPowerToNumber(this.spellPower)+" Fire damage in a cone and coating enemies in wildfire, scorching them for  "+spellPowerHotToNumber(this.spellPowerDot)+" Fire damage over 6 sec."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) && this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                done = true
            } else {
                let newTarget = findNearestEnemy(caster)
                if (newTarget!==false) {
                    if (caster === player) {
                        document.getElementById("raidFrame" + targetSelect).style.outline = "0px solid #fff"
                    }
                    caster.targetObj = newTarget
                    caster.castTarget = newTarget
                    caster.target = newTarget.name
                    if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                        done = true
                    }
                }
            }
            if (done) {
                let target = caster.castTarget
                doDamage(caster, target, this)
                applyDot(caster, target, this,undefined,this.spellPowerDot)
                for (let i = 0; i<enemies.length ;i++) {
                    if (!enemies[i].isDead && enemies[i]!==target && this.checkDistance(target, enemies[i],8,true) ) {
                        doDamage(caster, enemies[i], this)
                        applyDot(caster, enemies[i], this,undefined,this.spellPowerDot)
                    }
                }

                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                caster.useEnergy(this.cost,this.secCost)
                this.setCd()
                this.setGcd(caster)
                return true
            }

        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }


}
