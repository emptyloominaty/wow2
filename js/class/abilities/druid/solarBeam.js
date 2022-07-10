class SolarBeam extends Ability {
    constructor() {
        let name = "Solar Beam"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 60
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.233

        this.area = {type:"circle", radius:5, duration: 8,data:{type:"solarBeam", maxTargets:"all", spellPower:0, timer:1/*sec*/,color:"#6aff60",color2:"rgba(255,226,80,0.74)"},cast:false}

        this.effect = [{name:"interrupt"}]
        this.castPosition = {x:0,y:0}
        this.canCastForm = "Moonkin Form"
    }

    getTooltip() {
        return "Summons a beam of solar light over an enemy target's location, interrupting the target and silencing all enemies within the beam.  Lasts 8 sec."
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

            caster.isCasting = true
            caster.casting = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100))}
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endCast(caster) {
        caster.isCasting = false
        addArea(areas.length,caster,this,this.area.type,this.area.duration,this.area.data,this.castPosition.x,this.castPosition.y,true,this.area.radius)
        this.setCd()
        caster.useEnergy(this.cost)
    }
}
