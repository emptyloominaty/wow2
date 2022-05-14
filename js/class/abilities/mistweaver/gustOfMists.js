class GustOfMists extends HealAbility {
    constructor() {
        let name = "Gust of Mists"
        let cost = 0 //% mana
        let gcd = 0
        let castTime = 0
        let cd = 0
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.34
        this.effect = ""
    }

    run() {
    }

    heal(caster) {
        caster.isCasting = false
        this.spellPower = caster.stats.mastery/100
        if (caster.target==="") {
            //heal self
            doHeal(caster,caster,this,15)
        } else {
            //heal target
            doHeal(caster,caster.targetObj,this,15)
        }
    }
}
