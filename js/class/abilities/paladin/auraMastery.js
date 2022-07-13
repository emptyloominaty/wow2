class AuraMastery extends Ability {
    constructor() {
        let name = "Aura Mastery"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 180
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "holy"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.duration = 8
    }

    getTooltip() {
        return "Empowers your chosen aura for 8 sec.."
    }


    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            caster.abilities["Devotion Aura "].effect[0].val = 0.15
            for (let i = 0; i<friendlyTargets.length; i++) {
               checkBuff(caster,friendlyTargets[i],"Devotion Aura ",true)
            }
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

    endBuff(caster) {
        for (let i = 0; i<friendlyTargets.length; i++) {
            checkBuff(caster,friendlyTargets[i],"Devotion Aura ",true)
        }
        caster.abilities["Devotion Aura "].effect[0].val = 0.03
    }

}
