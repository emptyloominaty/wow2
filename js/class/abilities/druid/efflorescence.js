class Efflorescence extends Ability {
    constructor() {
        let name = "Efflorescence"
        let cost = 3.4
        let gcd = 1.5
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.233

        this.area = {type:"circle", radius:10, duration: 30,data:{type:"hot", maxTargets:3, spellPower:0.233, timer:2/*sec*/,color:"#6aff60",color2:"rgba(38,255,56,0.05)"},cast:false}
        this.areaId = undefined

        this.effect = []

        this.castPosition = {x:0,y:0}
    }

    getTooltip() {
        return "Grows a healing blossom at the target location, restoring "+spellPowerHotToNumber(this.spellPower)+" health to three injured allies within 10 yards every 2 sec for 30 sec. Limit 1."
    }

    run(caster) {
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

        if (this.areaId!==undefined) {
            if (areas[this.areaId]) {
                areas[this.areaId] = undefined
            }
        }

        this.areaId = addArea(areas.length,caster,this,this.area.type,this.area.duration,this.area.data,this.castPosition.x,this.castPosition.y,true,this.area.radius)

        this.setCd()
        caster.useEnergy(this.cost)
    }
}
