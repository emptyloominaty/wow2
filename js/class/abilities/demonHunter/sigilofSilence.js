class SigilofSilence extends Ability {
    constructor() {
        let name = "Sigil of Silence"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 120
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "fire"
        let range = 30
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)


        this.effect = [{name:"interrupt"}]
        this.duration = 6

        this.area = {type:"circle", radius:8, duration: 2,data:{type:"applyDebuffEnd", maxTargets:"all", spellPower:0, timer:2/*sec*/,color:"#82fffd",color2:"rgba(0,214,246,0.53)"},cast:false}
        this.castPosition = {x:0,y:0}
    }

    getTooltip() {
        return "Place a Sigil of Silence at the target location that activates after 2 sec. Silences all enemies affected by the sigil for 6 sec."
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
