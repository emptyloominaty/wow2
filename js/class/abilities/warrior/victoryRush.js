class VictoryRush extends Ability {
    constructor() {
        let name = "Victory Rush"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.4*1.29
        this.heal = 0.1

        this.duration = 20

    }

    getTooltip() {
        return "Strikes the target, causing (40% of Attack power) damage and healing you for 10% of your maximum health. <br>" +
            "Only usable within 20 sec after you kill an enemy that yields experience or honor."
    }

    startCast(caster) {
        if (this.checkStart(caster) && checkBuff(caster,caster,"Victory Rush")) {
            let done = false
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) ) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                    doDamage(caster,caster.castTarget,this)
                    caster.abilities["WhirlwindBuff"].startCast(caster,caster.castTarget,this)
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
                        caster.abilities["WhirlwindBuff"].startCast(caster,caster.targetObj,this)
                        done = true
                    }
                }
            }
            if (done) {
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }

                for (let i = 0; i<caster.buffs.length; i++) {
                    if (caster.buffs[i].name==="Victory Rush") {
                        caster.buffs[i].duration = -1
                    }
                }

                doHeal(caster,caster,this,undefined,undefined,undefined,undefined,undefined,caster.maxHealth*this.heal)
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

    killEnemy(caster,target) {
        if (this.canUse) {
            applyBuff(caster,caster,this)
        }
    }

}
