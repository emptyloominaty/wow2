class HealingSurge extends Ability {
    constructor() {
        let name = "Healing Surge"
        let cost = 4.8 //% mana
        let gcd = 1.5
        let castTime = 1.5
        let cd = 0
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = true
        let canMove = false
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 2.48
        this.effect = ""
        this.effectValue = 0
    }

    getTooltip() {
        return "A quick surge of healing energy that restores "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+" of a friendly target's health."
    }

    run(caster) {
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.checkDistance(caster,caster.castTarget)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            caster.isCasting = true
            caster.casting = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100)),target:caster.castTarget}
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endCast(caster) { //TODO:tidal waves,undulation,unleash life
        caster.isCasting = false
        let target = caster.casting.target

        if (this.isEnemy(caster,target) || target.isDead || target==="" || Object.keys(target).length === 0) {
            //heal self
            doHeal(caster,caster,this,0)
        } else {
            //heal target
            doHeal(caster,target,this,0)
        }
        this.setCd()
        caster.useEnergy(this.cost)
    }
}
