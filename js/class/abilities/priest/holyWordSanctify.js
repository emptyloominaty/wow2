class HolyWordSanctify extends Ability {
    constructor() {
        let name = "Holy Word: Sanctify"
        let cost = 3.5 //% mana
        let gcd = 1.5
        let castTime = 0
        let cd = 60
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "holy"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 2.45

        this.area = {type:"circle", radius:10, duration: 0.5,data:{type:"heal", maxTargets:6, spellPower:2.45,color:"#f8ff81",color2:"rgba(255,255,97,0.05)",cast:true,castName:"Echo of Light",}}

        this.castPosition = {x:0,y:0}
    }

    getTooltip() {
        return "Heals the target and 4 injured allies within 30 yards of the target for "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+""
    }

    run(caster) {
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
                caster.channeling = {name:"", time:0, time2:0, timer:0, timer2:0}
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
