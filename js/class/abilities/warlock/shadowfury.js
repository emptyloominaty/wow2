class Shadowfury extends Ability {
    constructor() {
        let name = "Shadowfury"
        let cost = 1
        let gcd = 1.5
        let castTime = 1.5
        let cd = 60
        let charges = 1
        let channeling = false
        let casting = true
        let canMove = false
        let school = "shadow"
        let range = 35
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.effect = [{name:"stun"}]
        this.duration = 3


        this.area = {type:"circle", radius:8, duration: 0.4,data:{type:"applyDebuff", maxTargets:"all", spellPower:this.spellPower, timer:1/*sec*/,color:"#9848ff",color2:"rgba(88,55,139,0.14)"},cast:false}
        this.castPosition = {x:0,y:0}

    }

    getTooltip() {
        return "Stuns all enemies within 8 yds for 3 sec."
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
            caster.casting = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100)),target:caster.castTarget}
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
