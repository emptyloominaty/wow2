class CelestialAlignment extends Ability {
    constructor() {
        let name = "Celestial Alignment"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 180
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "arcane"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.effect = [{name:"increaseStat",stat:"haste",val:10}]
        this.duration = 20
        this.canCastForm = "Moonkin Form"
    }

    getTooltip() {
        return "Celestial bodies align, maintaining both Eclipses and granting 10% haste for 20 sec."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            caster.abilities["Eclipse"].solar = true
            caster.abilities["Eclipse"].lunar = true
            caster.abilities["Eclipse"].next = "none"
            caster.abilities["Eclipse"].solarStacks = 0
            caster.abilities["Eclipse"].lunarStacks = 0
            caster.abilities["Eclipse"].time = this.duration
            caster.abilities["Eclipse"].buffed = 0

            applyBuff(caster, caster, caster.abilities["Eclipse"],undefined,undefined,"Eclipse (Solar)",this.duration)
            applyBuff(caster, caster, caster.abilities["Eclipse"],undefined,undefined,"Eclipse (Lunar)",this.duration)

            applyBuff(caster,caster,this)
            this.setGcd(caster)
            this.setCd()
            caster.useEnergy(this.cost)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }
}
