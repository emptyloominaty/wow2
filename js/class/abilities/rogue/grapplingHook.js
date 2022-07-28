class GrapplingHook extends Ability {
    constructor() {
        let name = "Grappling Hook"
        let cost = 0
        let gcd = 0.8
        let castTime = 0
        let cd = 45
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.effect = [{name:"moveToPoint",val:7,dist:0.5,target:{}}]
        this.duration = 2.5
        this.caster = {}
        this.canCastWhileRooted = false
        this.castPosition = {x:0,y:0}
    }

    getTooltip() {
        return "Launch a grappling hook and pull yourself to the target location."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            if (caster.isCasting) {
                caster.isCasting = false
            }

            if (caster===player) {
                this.castPosition.x = mousePosition2d.x
                this.castPosition.y = mousePosition2d.y
            } else {
                this.castPosition.x = caster.mousePos.x
                this.castPosition.y = caster.mousePos.y
            }
            caster.isRolling = true
            this.setGcd(caster)
            this.setCd()
            this.caster = caster
            this.effect[0].target = {x:this.castPosition.x+1,y:this.castPosition.y+1}
            applyBuff(caster,caster,this)
            caster.useEnergy(this.cost)
            return true

        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endBuff(caster) {
        caster.isRolling = false
    }
}
