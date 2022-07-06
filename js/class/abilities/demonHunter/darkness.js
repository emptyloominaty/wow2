class Darkness extends Ability {
    constructor() {
        let name = "Darkness"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 180
        let charges = 1
        let channeling = true
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 8
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.duration = 1.01
        this.area = {type:"circle", radius:8, duration:8,data:{type:"applyBuff",timer:0.5,color:"#361441",color2:"rgba(52,24,78,0.85)"},cast:false}
    }

    getTooltip() {
        return "Summons darkness around you in an 8 yd radius, granting friendly targets a 20% chance to avoid all damage from an attack. Lasts 8 sec."
    }

    getBuffTooltip(caster, target, buff) {
        return "Attacks against you have a 20% chance to inflict no damage."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            this.cd = 0
            if (caster.isChanneling) {
                caster.isChanneling = false
            }

            addArea(areas.length,caster,this,this.area.type,this.area.duration,this.area.data,caster.x,caster.y,true,this.area.radius)
            caster.useEnergy(this.cost,this.secCost)
            this.setCd()
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
