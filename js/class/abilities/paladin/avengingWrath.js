class AvengingWrath extends Ability {
    constructor(holy=false) {
        let name = "Avenging Wrath"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 120
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "holy"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.effect = [{name:"increaseStat",stat:"primary",val:20,percent:true},{name:"increaseStat",stat:"crit",val:20}]
        this.duration = 20
        if (holy) {
            this.effect[0].val = 30
            this.effect[1].val = 30
        }
        this.noGcd = true
    }

    getTooltip() {
        return "Call upon the Light to become an avatar of retribution, increasing your damage, healing, and critical strike chance by 20% for 20 sec."
    }


    getBuffTooltip(caster, target, buff) {
        return "Damage, healing, and critical strike chance increased by 20%."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.spec==="holyPaladin" && caster.abilities["Sanctified Wrath"].talentSelect) {
                caster.abilities["Holy Shock"].cd *= 0.6
                caster.abilities["Holy Shock"].maxCd *= 0.6
            }
            applyBuff(caster,caster,this)
            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(0)
            return true
        }
        return false
    }

    endBuff(caster) {
        if (caster.spec==="holyPaladin" && caster.abilities["Sanctified Wrath"].talentSelect) {
            caster.abilities["Holy Shock"].cd /= 0.6
            caster.abilities["Holy Shock"].maxCd /= 0.6
        }
    }
}
