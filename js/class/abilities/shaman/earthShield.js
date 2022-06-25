class EarthShield extends Ability {
    constructor(ele=false) {
        let name = "Earth Shield"
        let cost = 2
        let gcd = 1.5
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.438
        this.effect = [{name:"healingIncrease2",val:0.2},{name:"healWhenDamage", healthA:0, healthB:0,lastTime:600}]
        this.maxStacks = 9
        this.duration = 600
        if(ele) {
            this.talent = true
            this.cost = 0
        }
    }

    getTooltip() {
        return "Protects the target with an earthen shield, increasing your healing on them by 20% and healing them for "+spellPowerToNumber(this.spellPower)+" when they take damage. This heal can only occur once every few seconds. Maximum 9 charges."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {

            if (this.isEnemy(caster,caster.castTarget) || (this.checkDistance(caster,caster.castTarget))>this.range || caster.castTarget.isDead || caster.castTarget==="" || Object.keys(caster.castTarget).length === 0) {
                applyBuff(caster,caster,this,9,true)
            } else {
                applyBuff(caster,caster.castTarget,this,9,true)
            }
            this.setCd()
            caster.useEnergy(this.cost)
            this.setGcd(caster)
            return true
        }
        return false
    }
}