class LeapofFaith extends Ability {
    constructor() {
        let name = "Leap of Faith"
        let cost = 2.6 //% mana
        let gcd = 0
        let castTime = 0
        let cd = 90
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "holy"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.duration = 2
        this.effect = [{name:"moveToTarget",val:7,target:0}]
    }

    getTooltip() {
        return "Pulls the spirit of a party or raid member, instantly moving them directly in front of you."
    }

    getBuffTooltip(caster, target, buff) {
        return "Being pulled toward the Priest."
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.checkDistance(caster,caster.castTarget)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            caster.isCasting = true
            caster.casting = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100)),target:caster.castTarget}
            this.effect[0].target = caster
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endCast(caster) {
        caster.isCasting = false
        let target = caster.casting.target.id
        this.setCd()
        if (!this.isEnemy(caster,target) && !target.isDead && target!=="" && Object.keys(target).length !== 0) {
            applyBuff(caster,target,this)
        }
        caster.useEnergy(this.cost)
    }
}
