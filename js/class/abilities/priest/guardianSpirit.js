class GuardianSpirit extends Ability {
    constructor() {
        let name = "Guardian Spirit"
        let cost = 1.8 //% mana
        let gcd = 1.5
        let castTime = 0
        let cd = 0
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "holy"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.duration = 10
        this.effect = [{name:"resurrect"},{name:"healingIncrease2",val:0.6}]
        this.health = 0.4
    }

    getTooltip() {
        return "Calls upon a guardian spirit to watch over the friendly target for 10 sec, increasing healing received by 60%. If the target would die, the Spirit sacrifices itself and restores the target to 40% health.<br>" +
            "<br>" +
            "Castable while stunned. Cannot save the target from massive damage." //TODO:Castable while stunned.
    }

    getBuffTooltip(caster, target, buff) {
        return "Increased healing received by 60% and will prevent 1 killing blow."
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
        caster.useEnergy(this.cost)
    }
}
