class HolyWordSerenity extends Ability {
    constructor() {
        let name = "Holy Word: Serenity"
        let cost = 2.5 //% mana
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

        this.spellPower = 7*1.16
        this.effect = ""
        this.effectValue = 0
    }

    getTooltip() {
        return "Perform a miracle, healing an ally for "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+" Cooldown reduced by 6 sec when you cast Heal or Flash Heal."
    }

    run(caster) {
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.checkDistance(caster,caster.castTarget)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
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
        if (this.isEnemy(caster,caster.castTarget) || caster.castTarget.isDead || caster.castTarget==="" || Object.keys(caster.castTarget).length === 0) {
            //heal self
            doHeal(caster,caster,this,0)
            caster.abilities["Echo of Light"].startCast(caster,caster,this)
        } else {
            //heal target
            doHeal(caster,caster.castTarget,this,0)
            caster.abilities["Echo of Light"].startCast(caster,caster.castTarget,this)
        }
        this.setCd()
        caster.useEnergy(this.cost)
    }
}
