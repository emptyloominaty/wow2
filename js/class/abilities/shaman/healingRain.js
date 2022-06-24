class HealingRain extends Ability {
    constructor() {
        let name = "Healing Rain"
        let cost = 4.32 //% mana
        let gcd = 1.5
        let castTime = 2
        let cd = 10
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = true
        let canMove = false
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.265

        this.area = {type:"circle", radius:10, duration: 10,data:{type:"hot", maxTargets:6, spellPower:0.265, timer:2/*sec*/,color:"#82fffd",color2:"rgba(133,255,251,0.05)",
            visualEffect:{name:"rain",data:{size:10*pxToMeter,speed:40,duration:10,target:{},color:"rgba(56,191,187,0.52)",onEnd:{name:"",size:1},onRun:{name:"",size:5}}}},cast:false}

        this.effect = []
        this.duration = 2.1

        this.castPosition = {x:0,y:0}
    }

    getTooltip() {
        return "Blanket the target area in healing rains, restoring "+(((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100)) * (1 + (player.stats.haste / 100)))*5).toFixed(0)+" health to up to 6 allies over 10 sec."
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

            let castTime = this.castTime
            if (caster.abilities["Flash Flood"].checkBuff(caster)) {
                castTime = castTime * (1-caster.abilities["Flash Flood"].reduceCastTime)
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
