class DeathandDecay extends Ability {
    constructor(blood = false) {
        let name = "Death and Decay"
        let cost = -10
        let gcd = 1.5
        let castTime = 0
        let cd = 30
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "shadow"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.036036*1.1
        this.secCost = 1
        this.area = {type:"circle", radius:8, duration: 10,data:{type:"dot", maxTargets:"all", spellPower:this.spellPower, timer:1/*sec*/,color:"#770007",color2:"rgba(97,0,25,0.08)"},cast:false}
        this.castPosition = {x:0,y:0}
        this.areaId = false

        if (blood) {
            this.cd = 15
            this.maxCd = 15
        }

    }

    getTooltip() { //TODO:heart strike
        if (player.spec==="blood") {
            return  "Corrupts the targeted ground, causing "+spellPowerToNumber(this.spellPower*10)+" Shadow damage over 10 sec to targets within the area. Heart Strike will hit up to 3 additional targets."
        } else { //TODO:Unholy
            return  "Corrupts the targeted ground, causing "+spellPowerToNumber(this.spellPower*10)+" Shadow damage over 10 sec to targets within the area. Scourge Strike will hit up to 4 enemies near the target."
        }

    }

    startCast(caster) {
        let secCost = this.secCost
        if (checkBuff(caster,caster,"Crimson Scourge")) {
            secCost = 0
        }

        if (this.checkStart(caster,undefined,secCost)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }

            if (caster.spec==="blood" && caster.abilities["Rapid Decomposition"].talentSelect) {
                this.spellPower = 0.036036*1.1*1.15
            }

            if (caster===player) {
                this.castPosition.x = mousePosition2d.x
                this.castPosition.y = mousePosition2d.y
            } else {
                this.castPosition.x = caster.mousePos.x
                this.castPosition.y = caster.mousePos.y
            }

            this.areaId = addArea(areas.length,caster,this,this.area.type,this.area.duration,this.area.data,this.castPosition.x,this.castPosition.y,true,this.area.radius)

            checkBuff(caster,caster,"Crimson Scourge",true)

            this.setCd()
            caster.useEnergy(this.cost,secCost)
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }
}
