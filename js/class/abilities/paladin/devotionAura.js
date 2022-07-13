class DevotionAura extends Ability {
    constructor() {
        let name = "Devotion Aura"
        let cost = 0
        let gcd = 0.25
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "holy"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.duration = 10
        this.permanentBuff = true
        this.hiddenBuff = true
        this.timer1 = 0
        this.timer2 = 0.8
    }

    getTooltip() {
        return "Party and raid members within 40 yards are bolstered by their devotion, reducing damage taken by 3%."
    }

    getBuffTooltip(caster, target, buff) {
        return "Damage taken reduced by "+this.effect[0].val*100+"%."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            checkBuff(caster,caster,"Retribution Aura",true)
            applyBuff(caster,caster,this)
            caster.useEnergy(this.cost,this.secCost)
            this.setCd()
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    runBuff(caster, buff, id = 0) {
        if (this.timer1<this.timer2) {
            this.timer1+=progressInSec
        } else {
            this.timer1 = 0
            for (let i = 0; i<friendlyTargets.length; i++) {
                if (!friendlyTargets[i].isDead && this.checkDistance(caster,friendlyTargets[i],undefined,true)) {
                    applyBuff(caster,friendlyTargets[i],caster.abilities["Devotion Aura "])
                }
            }
        }
    }

}

class DevotionAuraBuff extends Ability {
    constructor() {
        let name = "Devotion Aura "
        let cost = 0
        let gcd = 0.25
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "holy"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.duration = 1.49
        this.effect = [{name:"damageReduction",val:0.03}]
        this.hiddenSB = true
    }

    getTooltip() {
        return "Party and raid members within 40 yards are bolstered by their devotion, reducing damage taken by 3%."
    }

    getBuffTooltip(caster, target, buff) {
        return "Damage taken reduced by "+this.effect[0].val*100+"%."
    }


}
