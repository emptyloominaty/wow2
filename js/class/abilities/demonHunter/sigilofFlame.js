class SigilofFlame extends Ability {
    constructor() {
        let name = "Sigil of Flame"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 30
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "fire"
        let range = 30
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.115
        this.spellPowerDot = 0.2838
        this.duration = 6

        this.area = {type:"circle", radius:8, duration: 2,data:{type:"sigilofFlame", maxTargets:"all", spellPowerDot:this.spellPowerDot, timer:2/*sec*/,color:"#82fffd",color2:"rgba(141,246,4,0.53)"},cast:false}
        this.castPosition = {x:0,y:0}
    }

    getTooltip() {
        return "Place a Sigil of Flame at the target location that activates after 2 sec. Deals "+spellPowerToNumber(this.spellPower)+" Fire damage" +
            " and an additional "+spellPowerHotToNumber(this.spellPowerDot)+" Fire damage over 6 sec to all enemies affected by the sigil."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }

            if (caster===player) {
                this.castPosition.x = mousePosition2d.x
                this.castPosition.y = mousePosition2d.y
            } else {
                this.castPosition.x = caster.mousePos.x
                this.castPosition.y = caster.mousePos.y
            }

            addArea(areas.length,caster,this,this.area.type,this.area.duration,this.area.data,this.castPosition.x,this.castPosition.y,true,this.area.radius)

            caster.useEnergy(this.cost,this.secCost)
            this.setGcd(caster)
            this.setCd()
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
