class Thrash extends Ability {
    constructor(guardian = false) {
        let name = "Thrash"
        let cost = -5
        let gcd = 1
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 8
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.092
        this.spellPowerDot = 0.125
        this.duration = 15
        this.needForm = "Bear Form"
        this.canCastForm = "Cat Form"
        if (guardian) {
            this.spellPower *= 4.64
            this.spellPowerDot *= 4.64
            this.cd = 6
            this.maxCd = 6
            this.gcd = 1.5
        } else {
            this.secCost = -1
            this.cost = 40
            this.spellPower *= 1.32
        }
        this.hasteCd = true
        this.maxStacks = 3

        this.timer1 = 0
        this.timer2 = 1
        this.bleed = true
    }

    getTooltip() {
        if (player.spec==="guardian") {
            return "Strikes all nearby enemies, dealing "+spellPowerToNumber(this.spellPower)+" Bleed damage and an additional "+spellPowerHotToNumber(this.spellPowerDot)+" Bleed damage over 15 sec. " +
                "When applied from Bear Form, this effect can stack up to 3 times. <br><br>" +
                "Generates 5 Rage."
        } else {
            return "Strikes all nearby enemies, dealing "+spellPowerToNumber(this.spellPower)+" Bleed damage and an additional "+spellPowerHotToNumber(this.spellPowerDot)+" Bleed damage over 15 sec. " +
                "<br><br>" +
                "Awards 1 combo point."
        }

    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            for (let i = 0; i<enemies.length ;i++) {
                if (!enemies[i].isDead && this.checkDistance(caster, enemies[i],undefined,true) ) {
                    doDamage(caster, enemies[i], this)
                    if (caster.spec==="guardian") {
                        let stacks = 1
                        for (let j = 0; j < enemies[i].debuffs.length; j++) {
                            if (enemies[i].debuffs[j].name === "Thrash" && enemies[i].debuffs[j].caster === caster) {
                                enemies[i].debuffs[j].stacks++
                                stacks = enemies[i].debuffs[j].stacks
                                if (stacks > this.maxStacks) {
                                    stacks = this.maxStacks
                                    enemies[i].debuffs[j].stacks = this.maxStacks
                                }
                                enemies[i].debuffs[j].spellPower = (this.spellPowerDot * stacks) / this.duration
                            }
                        }
                    }
                    applyDot(caster, enemies[i], this,undefined,undefined,this.spellPowerDot)
                }
            }
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            if (caster.spec==="guardian") {
                if (getChance(15)) {
                    caster.useEnergy(-4,0)
                    caster.abilities["Mangle"].cd = caster.abilities["Mangle"].maxCd
                }
                if (caster.abilities["Earthwarden"].talentSelect) {
                    applyBuff(caster,caster,caster.abilities["Earthwarden"],1,true)
                }
                if (caster.abilities["Rend and Tear"].talentSelect) {
                    applyBuff(caster,caster,caster.abilities["Rend and Tear"],1,true)
                }
            }
            this.setCd()
            caster.useEnergy(this.cost,this.secCost)
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    runBuff(target, buff, id) {
        if (buff.caster.spec==="guardian" && buff.caster.abilities["Blood Frenzy"].talentSelect) {
            if (this.timer1<this.timer2) {
                this.timer1 += progressInSec
            } else {
                this.timer1 = 0
                buff.caster.useEnergy(-2,0)
            }
        }
    }

}
