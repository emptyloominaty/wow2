class Intervene extends Ability {
    constructor() {
        let name = "Intervene"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 30
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 25
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.1147
        this.effect = [{name:"moveToTarget",val:7,target:{}}] //TODO:intercepting all melee and ranged attacks against them for 6 sec while they remain within 10 yds.
        this.duration = 2
        this.caster = {}
        this.canCastWhileRooted = false
    }

    getTooltip() {
        return "Run at high speed toward an ally, intercepting all melee and ranged attacks against them for 6 sec while they remain within 10 yds."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (Object.keys(caster.castTarget).length !== 0 && !this.isEnemy(caster,caster.castTarget) && !caster.castTarget.isDead && this.checkDistance(caster,caster.castTarget)) {
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                if (caster.isCasting) {
                    caster.isCasting = false
                }
                caster.isRolling = true
                this.setGcd(caster)
                this.setCd()
                this.caster = caster
                this.effect[0].target = caster.castTarget
                applyBuff(caster,caster,this)
                caster.useEnergy(this.cost)
                return true
            }
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endBuff(target) {
        target.isRolling = false
    }
}
