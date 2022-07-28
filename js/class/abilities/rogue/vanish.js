class Vanish extends Ability {
    constructor() {
        let name = "Vanish"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 120
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.duration = 10
        this.permanentBuff = true
        this.effect = [{name:"stealth"}]
        this.dontBreakStealth = true
    }

    getTooltip() {
        return  "Allows you to vanish from sight, entering stealth while in combat. For the first 3 sec after vanishing, damage and harmful effects received will not break stealth. Also breaks movement impairing effects."
    }

    getBuffTooltip(caster, target, buff) {
        return "Stealthed."
    }

    startCast(caster) {
            if (this.checkStart(caster)) {
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                applyBuff(caster, caster, this,undefined,undefined,undefined,undefined,undefined,undefined,"stealth")
                if (caster.abilities["Nightstalker"] && caster.abilities["Nightstalker"].talentSelect) {
                    applyBuff(caster,caster,caster.abilities["Nightstalker"])
                }

                caster.useEnergy(this.cost, this.secCost)
                this.setGcd(caster)
                this.setCd()
                return true
            } else if (this.canSpellQueue(caster)) {
                spellQueue.add(this, caster.gcd)
            }
        return false
    }

    endBuff(caster) {
        if (caster.abilities["Subterfuge"] && caster.abilities["Subterfuge"].talentSelect) {
            applyBuff(caster,caster,caster.abilities["Subterfuge"])
        }
        if (caster.abilities["Master Assassin"] && caster.abilities["Master Assassin"].talentSelect) {
            applyBuff(caster,caster,caster.abilities["Master Assassin"])
        }
    }
}
