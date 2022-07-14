class SpellReflection extends Ability {
    constructor() {
        let name = "Spell Reflection"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 25
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.effect = [{name:"magicDamageReduction",val:0.2},{name:"reflectSpell",removeOnReflect:true}]
        this.duration = 5
    }

    getTooltip() {
        return "Raise your weapon reflecting spells cast on you and reducing magical damage you take by 20%. Lasts 5 sec or until a spell is reflected."
    }

    getBuffTooltip(caster, target, buff) {
        return "Reflects a spell cast on you.<br>" +
            "Magical damage taken reduced by 20%."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            this.setCd()
            applyBuff(caster,caster,this)
            caster.useEnergy(this.cost)
            this.setGcd(caster)
            return true
        }
        return false
    }
}
