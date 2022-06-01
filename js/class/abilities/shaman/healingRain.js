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

        this.area = {type:"circle", radius:10, duration: 10,data:{type:"hot", maxTargets:6, spellPower:0.265, timer:2/*sec*/,color:"#82fffd",color2:"rgba(133,255,251,0.1)"}}

        this.effect = ""
        this.effectValue = 0

        this.castPosition = {x:0,y:0}
    }

    getTooltip() {
        return "Blanket the target area in healing rains, restoring "+(((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100)) * (1 + (player.stats.haste / 100)))*5).toFixed(0)+" health to up to 6 allies over 10 sec."
    }

    run(caster) {
    }

    startCast(caster) {
        if (this.checkCost(caster) && !caster.isCasting && caster.gcd<=0) {
            if (caster.isChanneling) {
                caster.isChanneling = false
                caster.channeling = {name:"", time:0, time2:0, timer:0, timer2:0}
            }
            this.castPosition.x = mousePosition2d.x
            this.castPosition.y = mousePosition2d.y

            caster.isCasting = true
            caster.casting = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100))}
            this.setGcd(caster)
        } else if (caster===player && caster.gcd<spellQueueWindow && caster.gcd>0) {
            spellQueue.add(this,caster.gcd)
        }
    }

    endCast(caster) {
        caster.isCasting = false
        //TODO:
        areas.push(new Area(areas.length,caster,this,this.area.type,this.area.duration,this.area.data,this.castPosition.x,this.castPosition.y,true,this.area.radius))
        this.cd = 0
        caster.useEnergy(this.cost)
    }
}
