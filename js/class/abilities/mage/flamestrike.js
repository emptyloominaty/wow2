class Flamestrike extends Ability {
    constructor() {
        let name = "Flamestrike"
        let cost = 2.5
        let gcd = 1.5
        let castTime = 4
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = true
        let canMove = false
        let school = "fire"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.54756

        this.area = {type:"circle", radius:8, duration: 0.5,data:{type:"damage", maxTargets:6, spellPower:0.54756,color:"#ff5300",color2:"rgba(255,56,0,0.09)",cast:false}}

        this.castPosition = {x:0,y:0}
    }

    getTooltip() {
        return "Calls down a pillar of fire, burning all enemies within the area for "+spellPowerToNumber(this.spellPower)+" Fire damage and reducing their movement speed by 20% for 8 sec." //TODO:movement speed
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
            let castTime = this.castTime
            if (checkBuff(caster,caster,"Hot Streak",true)) {
                castTime = 0
                caster.abilities["Ignite"].doubleDamage = true
            }
            caster.isCasting = true
            caster.casting = {name:this.name, time:0, time2:castTime/(1 + (caster.stats.haste / 100))}

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
