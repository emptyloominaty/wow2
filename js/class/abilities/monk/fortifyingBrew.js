class FortifyingBrew extends Ability {
    constructor(bm = false) {
        let name = "Fortifying Brew"
        let cost = 0 //% mana
        let gcd = 0
        let castTime = 0
        let cd = 180
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0
        this.effect = [{name:"damageReduction",val:0.2},{name:"increaseHealth",val:0.2,percent:true}]

        this.effect2Value = 0.2 //20% health

        this.duration = 15
        this.noGcd = true

        if (bm) {
            this.cd = 420
            this.maxCd = 420
        }
    }

    getTooltip() {
        return "Turns your skin to stone for 15 sec, increasing your current and maximum health by 20% and reducing all damage you take by 20%."
    }


    run(caster) {
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            applyBuff(caster,caster,this)
            //caster.damageReduction += this.effectValue
            caster.healthIncreased += this.effect2Value
            let a = caster.maxHealth
            caster.maxHealth *= 1+this.effect2Value
            let b = caster.maxHealth
            caster.health += b-a
            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        }
        return false
    }

    runBuff(target,buff) {
    }

    endBuff(target) {
        //target.damageReduction -= this.effectValue
        target.healthIncreased -= this.effect2Value
        target.maxHealth /= 1+this.effect2Value
        if (target.health>target.maxHealth) {
            target.health = target.maxHealth
        }
    }
}
