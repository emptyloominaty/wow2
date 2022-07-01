class PowerInfusion extends Ability {
    constructor() {
        let name = "Power Infusion"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 120
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "holy"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.duration = 20
        this.effect = [{name:"increaseStat",stat:"haste",val:25}]
    }

    getTooltip() {
        return "Infuses the target with power for 20 sec, increasing haste by 25%."
    }

    getBuffTooltip(caster, target, buff) {
        return "Haste increased by 25%."
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.checkDistance(caster,caster.castTarget)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            caster.isCasting = true
            caster.casting = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100)),target:caster.castTarget}
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endCast(caster) {
        caster.isCasting = false
        let target = caster.casting.target
        if (this.isEnemy(caster,target) || target.isDead || target==="" || Object.keys(target).length === 0) {
            applyBuff(caster,caster,this)
        } else {
            applyBuff(caster,target,this)
        }
        this.setCd()
        caster.useEnergy(this.cost)
    }
}
