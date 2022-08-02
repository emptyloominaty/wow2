class Blizzard extends Ability {
    constructor() {
        let name = "Blizzard"
        let cost = 2.5
        let gcd = 1.5
        let castTime = 1
        let cd = 8
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "frost"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.11264*1.15

        this.area = {type:"circle", radius:8, duration: 8,data:{type:"dot", maxTargets:"all", spellPower:this.spellPower, timer:1/*sec*/,color:"#82fffd",color2:"rgba(173,233,255,0.25)"},cast:false}
        this.castPosition = {x:0,y:0}

    }

    getTooltip() {
        return  "Ice shards pelt the target area, dealing "+spellPowerToNumber(this.spellPower*8)+" Frost damage over 8 sec and reducing movement speed by 50% for 3 sec.<br>" + //TODO MOVEMENT SPEED
            "Each time Blizzard deals damage, the cooldown of Frozen Orb is reduced by 0.25 sec"
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
            if (caster.abilities["Freezing Rain"].talentSelect && checkBuff(caster,caster,"Freezing Rain")) {
                castTime = 0
            }

            caster.isCasting = true
            caster.casting = {name:this.name, time:0, time2:(castTime/(1+(caster.secondaryResource*0.08)))/(1 + (caster.stats.haste / 100)),target:caster.castTarget}
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
        caster.useEnergy(this.cost,this.secCost)
        this.setCd()
    }
}
