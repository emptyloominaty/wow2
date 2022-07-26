class Swipe extends Ability {
    constructor(feral = false) {
        let name = "Swipe"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 8
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.36
        this.needForm = "Bear Form"
        this.canCastForm = "Cat Form"

        if (feral) {
            this.gcd = 1
            this.secCost = -1
            this.cost = 35
        }
    }

    getTooltip() {
        if (player.spec==="guardian") {
            return "Swipe all nearby enemies, inflicting "+spellPowerToNumber(this.spellPower)+" Physical damage."
        } else {
            return "Swipe all nearby enemies, inflicting "+spellPowerToNumber(this.spellPower)+" Physical damage. Deals 20% increased damage against bleeding targets. Awards 1 combo point."
        }
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.spec==="guardian") {
                if (getChance(15)) {
                    caster.useEnergy(-4,0)
                    caster.abilities["Mangle"].cd = caster.abilities["Mangle"].maxCd
                }
            }
            let spellPower = this.spellPower
            for (let i = 0; i<enemies.length ;i++) {
                if (!enemies[i].isDead && this.checkDistance(caster, enemies[i],undefined,true) ) {
                    if (caster.spec!=="guardian") {
                        let target = enemies[i]
                        for (let i = 0; i<target.buffs; i++) {
                            if (target.buffs[i].ability.bleed) {
                                spellPower *= 1.2
                                break
                            }
                        }
                    }
                    doDamage(caster, enemies[i], this,undefined,spellPower)
                }
            }
            if (caster.isChanneling) {
                caster.isChanneling = false
            }

            this.setCd()
            if (caster.spec==="feral" && checkBuff(caster,caster,"Omen of Clarity",true)) {
                caster.useEnergy(0,this.secCost)
            } else {
                caster.useEnergy(this.cost,this.secCost)
            }
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
