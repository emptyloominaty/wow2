class Riptide extends Ability {
    constructor() {
        let name = "Riptide"
        let cost = 1.6 //% mana
        let gcd = 1.5
        let castTime = 0
        let cd = 6
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 1.7
        this.spellPowerHot = 1.32
        this.duration = 18
    }

    getTooltip() {
        return "Restorative waters wash over a friendly target, healing them for "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100)) * (1 + (player.stats.haste / 100))).toFixed(0)+" and an additional "+((player.stats.primary * this.spellPowerHot) * (1 + (player.stats.vers / 100)) * (1 + (player.stats.haste / 100))).toFixed(0)+" over 18 sec. "
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

    endCast(caster) {
        caster.isCasting = false
        let target = caster.casting.target

        this.setCd()

        let spellPower = this.spellPower * (1+caster.abilities["Unleash Life"].checkBuff(caster))

        if (this.isEnemy(caster,target) || target.isDead || target==="" || Object.keys(target).length === 0) {
            applyHot(caster,caster,this,undefined,undefined,this.spellPowerHot)
            doHeal(caster,caster,this,undefined,spellPower)
        } else {
            applyHot(caster,target,this,undefined,undefined,this.spellPowerHot)
            doHeal(caster,target,this,undefined,spellPower)
        }
        caster.abilities["Tidal Waves"].applyBuff(caster)
        caster.useEnergy(this.cost)
    }
}
