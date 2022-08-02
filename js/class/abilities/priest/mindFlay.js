class MindFlay extends Ability {
    constructor() {
        let name = "Mind Flay"
        let cost = -3
        let gcd = 1
        let castTime = 4.5
        let cd = 0
        let charges = 1
        let channeling = true
        let casting = false
        let canMove = false
        let school = "shadow"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 1.284/6
        this.duration = 4.5
        this.effect = [{name:"moveSpeed",val:0.5}]
    }

    getTooltip() {
        return "Assaults the target's mind with Shadow energy, causing "+spellPowerToNumber(this.spellPower*6)+" Shadow damage over 4.5 sec and slowing their movement speed by 50%.<br><br>" +
            "Generates 18 Insanity over the duration."
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.checkDistance(caster,caster.castTarget) && this.isEnemy(caster,caster.castTarget)) {
            caster.isChanneling = true
            caster.channeling = {name:this.name, time:0, time2:this.duration/(1 + (caster.stats.haste / 100)), timer:0.8/(1 + (caster.stats.haste / 100)), timer2:0.8/(1 + (caster.stats.haste / 100)),target:caster.castTarget}

            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    cast(caster) {
        let target = caster.channeling.target
        if (Object.keys(target).length !== 0 && this.isEnemy(caster,target)) {
            if (this.checkDistance(caster,target)  && !target.isDead) {
                doDamage(caster, target, this)
                applyDebuff(caster,target,this,undefined,undefined,undefined,undefined,0.8)
                caster.useEnergy(this.cost)
            } else {
                caster.isChanneling = false
            }
        }
    }
}
