class PowerWordBarrier extends Ability {
    constructor() {
        let name = "Power Word: Barrier"
        let cost = 4
        let gcd = 1.5
        let castTime = 0
        let cd = 180
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "holy"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.duration = 1.49
        this.area = {type:"circle", radius:8, duration:10,data:{type:"applyBuff", timer:0.8/*sec*/,color:"#ffe877",color2:"rgba(255,243,121,0.82)"},cast:false}
        this.castPosition = {x:0,y:0}
        this.effect = [{name:"damageReduction",val:0.25}]
    }

    getTooltip() {
        return "Summons a holy barrier to protect all allies at the target location for 10 sec, reducing all damage taken by 25% and preventing damage from delaying spellcasting."
    }

    getBuffTooltip(caster, target, buff) {
        return "Reduces all damage taken by 25%," +
            " and you resist all pushback while casting spells." //TODO
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

            this.setCd()
            caster.useEnergy(this.cost)
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }
}
