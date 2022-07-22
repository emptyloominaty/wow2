class FesteringStrike extends Ability {
    constructor() {
        let name = "Festering Strike"
        let cost = -20
        let gcd = 1.5
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 1.16*1.2
        this.secCost = 2
        this.maxStacks = 10
    }

    getTooltip() {
        return "Strikes for "+spellPowerToNumber(this.spellPower)+" Physical damage and infects the target with 2-3 Festering Wounds."
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
                doDamage(caster, caster.castTarget, this)
                let stacks = 2
                if (Math.random()>0.5) {
                    stacks = 3
                }
                applyDebuff(caster,caster.castTarget,caster.abilities["Festering Wound"],undefined,stacks,true)

                caster.useEnergy(this.cost,this.secCost)
                this.setCd()
                this.setGcd(caster)
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }

                return true
            }

        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}

//----------------------------------------
class FesteringWound extends Ability {
    constructor() {
        let name = "Festering Wound"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "shadow"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.passive = true
        this.spellPower = 0.23
        this.duration = 30
    }

    getTooltip() {
        return "A pustulent lesion that will burst on death or when damaged by Scourge Strike, dealing "+spellPowerToNumber(this.spellPower)+" Shadow damage and generating 3 Runic Power."
    }

    burst(caster,target) {
        doDamage(caster,target,this)
        caster.useEnergy(-3,0)
    }
}
