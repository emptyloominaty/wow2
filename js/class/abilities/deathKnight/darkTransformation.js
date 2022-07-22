class DarkTransformation extends Ability {
    constructor() {
        let name = "Dark Transformation"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 60
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.duration = 15
        this.effect = [{name:"increaseDamage",val:2}]
    }

    getTooltip() {
        return "Your ghoul deals (44.73% of Attack power) Shadow damage to 5 nearby enemies and transforms into a powerful undead monstrosity for 15 sec. The ghoul's abilities are empowered and take on new functions while the transformation is active.\n"
    }

    getBuffTooltip(caster, target, buff) {
        return "Damage dealt increased by 200%."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {

            if (caster.pets[caster.abilities["Raise Dead"].petId]!==undefined) {
                if (caster.pets[caster.abilities["Raise Dead"].petId] && caster.pets[caster.abilities["Raise Dead"].petId].name==="Ghoul") {
                    applyBuff(caster,caster.pets[caster.abilities["Raise Dead"].petId],this)
                    caster.pets[caster.abilities["Raise Dead"].petId].energy = caster.pets[caster.abilities["Raise Dead"].petId].maxEnergy
                }
            }


            this.setCd()
            this.setGcd(caster)
            //applyBuff(caster,caster,this)
            caster.useEnergy(this.cost,this.secCost)
            return true
        }
        return false
    }
}
