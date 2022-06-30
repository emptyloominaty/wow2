class Mutilate extends Ability {
    constructor() {
        let name = "Mutilate"
        let cost = 50
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

        this.spellPower = 0.525*1.51

        this.effect = ""
        this.effectValue = 0

        this.secCost = -2

    }

    getTooltip() {
        return "Attack with both weapons, dealing a total of  "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+" Physical damage."
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
                    if (this.checkDistance(caster, caster.targetObj) && !caster.targetObj.isDead) {
                        doDamage(caster, caster.targetObj, this)
                        target = caster.targetObj
                        done = true
                    }
                }
            }
            if (done) {
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }

                if (caster.abilities["Blindside"].talentSelect) {
                    if (target.health/target.maxHealth<0.35 && getChance(40)) {
                        applyBuff(caster,caster,caster.abilities["Blindside"])
                        caster.abilities["Ambush"].canUseWithoutStealth = true
                    } else if (getChance(20)) {
                        applyBuff(caster,caster,caster.abilities["Blindside"])
                        caster.abilities["Ambush"].canUseWithoutStealth = true
                    }
                }

                if (caster.abilities["Venom Rush"].talentSelect && checkDebuff(caster,target,"Deadly Poison")) {
                    caster.useEnergy(-8,0)
                }

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
