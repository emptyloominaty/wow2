class AlterTime extends Ability {
    constructor() {
        let name = "Alter Time"
        let cost = 1
        let gcd = 0
        let castTime = 0
        let cd = 60
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "arcane"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.duration = 10
        this.health = 0
        this.used = false
        this.location = {x:0,y:0}
    }

    getTooltip() {
        return "Alters the fabric of time, returning you to your current location and health when cast a second time, or after 10 seconds.  Effect negated by long distance or death."
    }

    getBuffTooltip(caster, target, buff) {
        return "Altering Time. Returning to past location and health when duration expires."

    }

    startCast(caster) {
        if (this.used && this.abilityCd>=this.abilityMaxCd && this.checkGcd(caster)) {
            for (let i = 0; i<caster.buffs.length; i++) {
                if (caster.buffs[i].name==="Alter Time") {
                    caster.buffs[i].duration = -1
                }
            }
            this.used = false
            return true
        } else {
            if (this.checkStart(caster)) {
                this.health = caster.health
                this.location.x = caster.x
                this.location.y = caster.y
                this.used = true
                applyBuff(caster,caster,this)
                this.setCd()
                this.setGcd(caster)
                caster.useEnergy(this.cost)
                return true
            }
        }
        return false
    }

    endBuff(caster) {
        caster.health = this.health
        caster.x = this.location.x
        caster.y = this.location.y
        this.used = false
    }

}
