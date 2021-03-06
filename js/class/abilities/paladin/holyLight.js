class HolyLight extends Ability {
    constructor() {
        let name = "Holy Light"
        let cost = 3
        let gcd = 1.5
        let castTime = 2.5
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = true
        let canMove = false
        let school = "holy"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 2.6
    }

    getTooltip() {
        return  "Expends a large amount of mana to quickly heal a friendly target for "+spellPowerToNumber(this.spellPower)+"."
    }


    startCast(caster) {
        if (this.checkStart(caster) && this.checkDistance(caster,caster.castTarget)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            let castTime = this.castTime

            caster.isCasting = true
            caster.casting = {name:this.name, time:0, time2:castTime/(1 + (caster.stats.haste / 100)),target:caster.castTarget}
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
            //heal self
            doHeal(caster,caster,this)
            target = caster
        } else {
            //heal target
            doHeal(caster,target,this)
        }
        if (checkBuff(caster,caster,"Infusion of Light",true)) {
            caster.useEnergy(0,-1)
        }
        caster.useEnergy(this.cost)
    }
}
