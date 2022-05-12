class Vivify extends HealAbility {
    constructor() {
        let name = "Vivify"
        let cost = 3.8 //% mana
        let gcd = 1.5
        let castTime = 1.5
        let cd = 0
        let channeling = false
        let casting = true
        let canMove = false
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range)

        this.spellPower = 1.41 //141%
        this.spellPowerSec = 1.04 //104% renewing
    }

    startCast(caster) {
        if (caster.energy>this.cost && !caster.isCasting && caster.gcd<=0) {
            caster.isCasting = true
            caster.casting = {name:this.name, time:0, time2:this.castTime}
            caster.gcd = this.gcd
        }
    }

    endCast(caster) {
        caster.isCasting = false
        if (caster.target==="") {
            //heal self
            doHeal(caster,caster,this)
            //TODO:mastery
        } else {
            //heal target
            doHeal(caster,caster.targetObj,this)
            //TODO:mastery
            //TODO:RANGE
        }
        //TODO:renewing mist
        caster.energy -= this.cost
    }
}
