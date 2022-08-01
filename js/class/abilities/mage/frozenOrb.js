class FrozenOrb extends Ability {
    constructor() {
        super("Frozen Orb", 1, 1.5, 0, 60, false, false, false, "frost", 40, 1)
        this.spellPower = 2.86352
        this.area = {type:"circle", radius:8, duration:2.5,data:{type:"damage", maxTargets:"all", spellPower:this.spellPower,moving:true,speed:10,color:"#6ef2ff",color2:"rgba(164,240,255,0.09)"}}
    }

    getTooltip() {
        return "Launches an orb of swirling ice up to 40 yards forward which deals up to "+spellPowerToNumber(this.spellPower)+" Frost damage to all enemies it passes through." +
            " Grants 1 charge of Fingers of Frost when it first damages an enemy." +
            "\n" +
            "Enemies damaged by the Frozen Orb are slowed by 30% for 3 sec." //TODO:
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            caster.isCasting = true
            caster.casting = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100))}

            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue()) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endCast(caster) {
        caster.isCasting = false
        this.area.data.direction = caster.direction
        addArea(areas.length,caster,this,this.area.type,this.area.duration,this.area.data,caster.x,caster.y,false,this.area.radius)

        this.spellPower = 2.86352*(1+((caster.stats.mastery*1.875)/100))
        this.area.data.spellPower = this.spellPower
        let target = getPointTarget(caster,40,caster.direction)
        applyBuff(caster,caster,caster.abilities["Fingers of Frost"])
        caster.abilities["Fingers of Frost"].getBuff(caster,this)
        addSpellVisualEffects(caster.x,caster.y,getDirection(caster,target),"projectile",
            {size:10,speed:10,target:target,color:"#a1e4ff",onEnd:{},onRun:{name:"fire",color1:"rgba(235,246,255,0.7)",color2:"rgba(150,226,255,0.7)",life:0.4}})

        this.setCd()
        caster.useEnergy(this.cost,this.secCost)
    }
}