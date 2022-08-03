class Conflagrate extends Ability {
    constructor() {
        let name = "Conflagrate"
        let cost = 1
        let gcd = 1.5
        let castTime = 0
        let cd = 12.96
        let charges = 2
        let channeling = false
        let casting = false
        let canMove = false
        let school = "fire"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.spellPower = 1.1*1.1
        this.hasteCd = true
        this.secCost = -0.5
        this.duration = 10
    }

    getTooltip() {
        return "Triggers an explosion on the target, dealing "+spellPowerToNumber(this.spellPower)+" Fire damage.<br>" +
            "Reduces the cast time of your next Incinerate or Chaos Bolt by 30% for 10 sec<br>" +
            "<br>" +
            "Generates 5 Soul Shard Fragments."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            let target = caster.castTarget
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
                    target = newTarget
                    if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                        done = true
                    }
                }
            }
            if (done) {
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                doDamage(caster,target,this)
                applyBuff(caster,caster,this)
                this.setGcd(caster)
                caster.useEnergy(this.cost,this.secCost)
                this.setCd()
            }
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
