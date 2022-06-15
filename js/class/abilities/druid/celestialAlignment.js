class CelestialAlignment extends Ability {
    constructor() {
        let name = "Celestial Alignment"
        let cost = 0
        let gcd = 1.5
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

        //TODO ECLIPSE
        this.effect = [{name:"increaseStat",stat:"haste",val:10}]
        this.duration = 20

    }

    getTooltip() {
        return "Celestial bodies align, maintaining both Eclipses and granting 10% haste for 20 sec."
    }

    run(caster) {
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
                caster.channeling = {name:"", time:0, time2:0, timer:0, timer2:0}
            }

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

    endChanneling(caster) {
    }

    runBuff() {
    }

    endBuff() {
    }
}
