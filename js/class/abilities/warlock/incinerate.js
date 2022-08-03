class Incinerate extends Ability {
    constructor() {
        let name = "Incinerate"
        let cost = 1.5
        let gcd = 1.5
        let castTime = 2
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = true
        let canMove = false
        let school = "fire"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.7692*1.1
        this.secCost = -0.2

    }

    getTooltip() {
        return "Draws fire toward the enemy, dealing "+spellPowerToNumber(this.spellPower)+" Fire damage.<br>" +
            "<br>" +
            "Generates 2 Soul Shard Fragments and an additional 1 on critical strikes.>"
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
                let castTime = this.castTime
                if (checkBuffStacks(caster,caster,"Conflagrate")) {
                    castTime /= 1.3
                }
                caster.isCasting = true
                caster.casting = {name:this.name, time:0, time2:castTime/(1 + (caster.stats.haste / 100)),target:caster.castTarget}
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                this.setGcd(caster)
                return true
            }

        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endCast(caster) {
        caster.isCasting = false
        let target = caster.casting.target
        if (Object.keys(target).length !== 0 && this.isEnemy(caster,target)) {
            if (this.checkDistance(caster,target)  && !target.isDead) {
                let cr = doDamage(caster, target, this)
                let cost = this.cost
                if (cr>1) {
                    cost += 0.1
                }
                caster.useEnergy(cost,this.secCost)
                this.setCd()
            }
        }
    }

}
