class SymbolsofDeath extends Ability {
    constructor() {
        let name = "Symbols of Death"
        let cost = -40
        let gcd = 0
        let castTime = 0
        let cd = 30
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "shadow"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.noGcd = true
        this.duration = 10
        this.effect = [{name:"increaseDamage",val:0.15}]
    }

    getTooltip() {
        return "Invoke ancient symbols of power, generating 40 Energy and increasing your damage done by 15% for 10 sec." +
            "Your next combo point generator will critically strike" //TODO:
    }

    getBuffTooltip(caster, target, buff) {
        return "Damage done increased by 15%."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            applyBuff(caster,caster,this)
            caster.useEnergy(this.cost,this.secCost)
            this.setGcd(caster)
            this.setCd()
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }


}
