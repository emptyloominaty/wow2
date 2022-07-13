class LightoftheMartyr extends Ability {
    constructor() {
        let name = "Light of the Martyr"
        let cost = 1.4
        let gcd = 1.5
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "holy"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 2.10
    }

    getTooltip() {
        return "Sacrifice a portion of your own health to instantly heal an ally for "+spellPowerToNumber(this.spellPower)+". You take damage equal to 50% of the healing done.<br>" +
            "<br>" +
            "Does not cause your Beacon of Light to be healed. Cannot be cast on yourself."
    }


    startCast(caster) {
        if (this.checkStart(caster) && Object.keys(caster.castTarget).length !== 0 && this.checkDistance(caster,caster.castTarget) && !this.isEnemy(caster,caster.castTarget) && !caster.castTarget.isDead) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            if (caster===caster.castTarget) {
                return false
            }

            if (caster.health>((caster.stats.primary * (this.spellPower/2)) * (1 + (caster.stats.vers / 100)))) {
                doHeal(caster,caster.castTarget,this)

                caster.health -= ((caster.stats.primary * (this.spellPower/2)) * (1 + (caster.stats.vers / 100))) //TODO: of the healing done
            } else {
                return false
            }
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            this.setCd()
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
