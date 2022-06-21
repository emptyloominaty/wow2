class LifeCocoon extends Ability {
    constructor() {
        let name = "Life Cocoon"
        let cost = 2.4
        let gcd = 1.5
        let castTime = 0
        let cd = 120
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        
        this.duration = 12
        this.effect = [{name:"healingIncreaseMistweaver",val:0.5},{name:"absorb",val:0}]
    }

    getTooltip() {
        return "Encases the target in a cocoon of Chi energy for 12 sec, absorbing "+((player.maxHealth*0.6)) * (1 + (player.stats.vers / 100)).toFixed(0)+" damage and increasing all healing over time received by 50%."
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.checkDistance(caster,caster.castTarget)) {
            caster.isChanneling = false

            this.effect[1].val = ((player.maxHealth*0.6)) * (1 + (player.stats.vers / 100))

            let target = caster.castTarget
            if (this.isEnemy(caster,target) || target.isDead || target==="" || Object.keys(target).length === 0) {
                applyBuff(caster,caster,this)
            } else {
                applyBuff(caster,target,this)
            }
            caster.useEnergy(this.cost,this.secCost)
            this.setCd(0)
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }
}
