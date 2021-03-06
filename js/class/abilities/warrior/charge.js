class Charge extends Ability {
    constructor() {
        let name = "Charge"
        let cost = -20
        let gcd = 0.5
        let castTime = 0
        let cd = 20
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 25
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.1147
        this.effect = [{name:"moveToTarget",val:7,target:0}]
        this.duration = 2.5
        this.minRange = 8
        this.caster = {}
        this.canCastWhileRooted = false
    }

    getTooltip() {
        return "Charge to an enemy, dealing "+spellPowerToNumber(this.spellPower)+" Physical damage, rooting it for 1 sec <br> Min Range:8"
    }
    startCast(caster) {
        if (this.checkStart(caster) && !caster.isRolling) {
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) && !caster.castTarget.isDead && this.checkDistance(caster,caster.castTarget) && !this.checkDistance(caster,caster.castTarget,this.minRange)) {
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
                this.effect[0].target = caster.castTarget.id
                applyBuff(caster,caster,this)

                if (caster.spec==="fury" && caster.abilities["Furious Charge"].talentSelect) {
                    applyBuff(caster,caster,caster.abilities["Furious Charge"])
                }

                caster.useEnergy(this.cost)
                return true
            }
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    runBuff(target,buff) {
    }

    endBuff(caster) {
        doDamage(this.caster, creatures[this.effect[0].target], this)
        caster.isRolling = false
    }
}
