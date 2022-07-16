class Consecration extends Ability {
    constructor(holy = false,prot = false) {
        let name = "Consecration"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 9
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.spellPower = 0.0375

        this.area = {type:"circle", radius:8, duration: 12,data:{type:"dot", maxTargets:"all", spellPower:this.spellPower, timer:1/*sec*/,color:"#ffe699",color2:"rgba(255,249,170,0.11)"},cast:false}
        this.areaId = undefined

        if (holy) {
            this.hasteCd = true
            this.spellPower *= 2.1
        } else if (prot) {
            this.cd /= 2
            this.maxCd /= 2
        }
    }

    getTooltip() {
        return "Consecrates the land beneath you, causing "+spellPowerToNumber(this.spellPower*12)+" Holy damage over 12 sec to enemies who enter the area. Limit 1."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }

            if (this.areaId!==undefined) {
                if (areas[this.areaId] && areas[this.areaId].ability.name==="Consecration" && areas[this.areaId].caster === caster) {
                    areas[this.areaId] = undefined
                }
            }

            this.areaId = addArea(areas.length,caster,this,this.area.type,this.area.duration,this.area.data,caster.x,caster.y,true,this.area.radius)

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
