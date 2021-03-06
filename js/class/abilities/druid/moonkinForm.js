class MoonkinForm extends Ability {
    constructor(resto = false) {
        let name = "Moonkin Form"
        let cost = 0
        let gcd = 1
        let castTime = 0
        let cd = 0
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0
        this.effects = [{name:"increaseDamage",val:0.1},{name:"increaseArmor",val:1.25}]

        if (resto) {
            this.canUse = false
        }
    }

    getTooltip() {
        return "Shapeshift into Moonkin Form, increasing the damage of your spells by 10% and your armor by 125%, and granting protection from Polymorph effects."
    }


    run(caster) {
    }

    startCast(caster) {
        if (this.checkStart(caster,undefined,undefined,false)) {
            this.cd = 0
            changeForm(caster,this)
            caster.useEnergy(this.cost)
            this.setGcd(caster)
            return true
        }
        return false
    }

    runBuff(target,buff) {
    }

    endBuff(target) {
    }
}
