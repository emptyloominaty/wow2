class Stealth extends Ability {
    constructor() {
        let name = "Stealth"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 2
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
        this.stealthed = false
    }

    getTooltip() {
        return  "Conceals you in the shadows until cancelled, allowing you to stalk enemies without being seen."
    }

    getBuffTooltip(caster, target, buff) {
        return "Stealthed."
    }

    startCast(caster) {
        if (this.stealthed && this.abilityCd>=this.abilityMaxCd && this.checkGcd(caster)) {
            for (let i = 0; i<caster.buffs.length; i++) {
                if (caster.buffs[i].type==="stealth") {
                    caster.buffs[i].duration = -1
                }
            }
            this.stealthed = false
            return true
        } else {
            if (this.checkStart(caster) && !caster.inCombat) {
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                applyBuff(caster, caster, this,undefined,undefined,undefined,undefined,undefined,undefined,"stealth")
                if (caster.abilities["Nightstalker"].talentSelect) {
                    applyBuff(caster,caster,caster.abilities["Nightstalker"])
                }
                this.stealthed = true
                caster.useEnergy(this.cost, this.secCost)
                this.setGcd(caster)
                this.setCd()
                return true
            } else if (caster === player && caster.gcd < spellQueueWindow && caster.gcd > 0) {
                spellQueue.add(this, caster.gcd)
            }
        }
        return false
    }
    endBuff(caster) {
        if (caster.abilities["Subterfuge"].talentSelect) {
            applyBuff(caster,caster,caster.abilities["Subterfuge"])
        }
        if (caster.abilities["Master Assassin"].talentSelect) {
            applyBuff(caster,caster,caster.abilities["Master Assassin"])
        }
    }
}
