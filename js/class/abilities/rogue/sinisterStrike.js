class SinisterStrike extends Ability {
    constructor() {
        let name = "Sinister Strike"
        let cost = 45
        let gcd = 1
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 5 //melee
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.spellPower = 0.543348*1.17
        this.secCost = -1
        this.duration = 15
    }

    getTooltip() {
        return "Viciously strike an enemy, causing "+spellPowerToNumber(this.spellPower)+" Physical damage.<br><br>" +
            "Has a 35% chance to hit an additional time, making your next Pistol Shot half cost and double damage<br>" +
            "<br>" +
            "Awards 1 combo point each time it strikes."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            let target = caster.castTarget
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) ) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                    doDamage(caster,caster.castTarget,this)
                    done = true
                }
            } else {
                let newTarget = findNearestEnemy(caster)
                if (newTarget!==false) {
                    if (caster===player) {
                        document.getElementById("raidFrame"+targetSelect).style.outline = "0px solid #fff"
                    }
                    caster.targetObj = newTarget
                    caster.target = newTarget.name
                    target = caster.targetObj
                    if (this.checkDistance(caster, caster.targetObj) && !caster.targetObj.isDead) {
                        doDamage(caster, caster.targetObj, this)
                        done = true
                    }
                }
            }
            if (done) {
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                let chance = 35
                if (caster.abilities["Weaponmaster"].talentSelect) {
                    chance += 10
                }
                if (checkBuff(caster,caster,"Skull and Crossbones")) {
                    chance += 30
                }



                if (getChance(chance)) {
                    doDamage(caster, target, this,undefined,this.spellPower*0.35)
                    caster.useEnergy(0,-1)
                    applyBuff(caster,caster,this)
                }
                this.setCd()
                caster.useEnergy(this.cost,this.secCost)
                this.setGcd(caster)
                return true
            }
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
