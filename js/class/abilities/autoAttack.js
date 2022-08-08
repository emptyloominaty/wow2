class AutoAttack extends Ability {
    constructor() {
        let name = "Auto Attack"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 2.6
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.spellPower = 0.23
        this.hasteCd = true

    }

    startCast(caster) {
        if (this.checkCd(caster,true)) {
            this.spellPower = caster.autoattackDamage
            let done = false
            if (Object.keys(caster.targetObj).length !== 0 && this.isEnemy(caster,caster.targetObj) && !caster.targetObj.isDead ) {
                if (this.checkDistance(caster,caster.targetObj,undefined,true)) {
                    if (caster.spec==="assassination") {
                        checkAndApplyRoguePoison(caster,caster.targetObj)
                    }
                    doDamage(caster, caster.targetObj, this)
                    done = true
                }
            }
            if (done) {
                for (let i = 0; i<caster.buffs.length; i++) {
                    if (caster.buffs[i].name==="Windfury Totem") {
                        if (getChance(20)) {
                            doDamage(caster, caster.targetObj, this)
                        }
                        break
                    }
                }
                this.setCd()
                this.maxCd = (caster.autoattackSpeed/caster.attackSpeed) / (1 + (caster.stats.haste / 100))
                if (caster.class==="Warrior") {
                    let rage = -6
                    if (caster.spec==="fury") {
                        caster.useEnergy(-6,0)
                    } else if (caster.spec==="arms") {
                        rage = -25
                        caster.useEnergy(-25,0)
                    } else if (caster.spec==="protectionWarrior") {
                        rage = -2
                        caster.useEnergy(-2,0)
                        if (caster.abilities["Devastator"].talentSelect) {
                            doDamage(caster,caster.targetObj,caster.abilities["Devastator"])
                            if (getChance(20)) {
                                caster.abilities["Shield Slam"].cd = caster.abilities["Shield Slam"].maxCd
                            }
                        }
                    }

                    if (caster.abilities["War Machine"].talentSelect) {
                        caster.useEnergy(rage*0.2,0)
                    }
                } else if (caster.spec==="havoc") {
                    if (caster.abilities["Demon Blades"].talentSelect) {
                        caster.abilities["Demon Blades"].doDamage(caster,caster.targetObj)
                    }
                } else if (caster.spec==="blood") {
                    if (checkDebuff(caster,caster.targetObj,"Blood Plague")) {
                        if (getChance(25)) {
                            applyBuff(caster,caster,caster.abilities["Crimson Scourge"])
                            caster.abilities["Death and Decay"].cd = caster.abilities["Death and Decay"].maxCd
                        }
                    }
                } else if (caster.spec==="retribution") {
                    let chance = 8
                    if (caster.abilities["Blade of Wrath"].talentSelect) {
                        chance *= 2
                    }
                    if (getChance(chance)) {
                        caster.abilities["Blade of Justice"].cd = caster.abilities["Blade of Justice"].maxCd
                    }
                    if (caster.abilities["Zeal"].talentSelect && checkBuffStacks(caster,caster,"Zeal")) {
                        this.cd = this.maxCd*0.3
                        doDamage(caster,caster.castTarget,caster.abilities["Zeal"])
                    }
                } else if (caster.spec==="frostDk") {
                    if (caster.abilities["Runic Attenuation"].talentSelect) {
                        if (getChance(43)) {
                            caster.useEnergy(-5,0)
                        }
                    }
                    if (caster.abilities["Permafrost"].talentSelect) {
                        caster.abilities["Permafrost"].effect[0].val = ((caster.stats.primary * this.spellPower) * (1 + (caster.stats.vers / 100)))
                        applyBuff(caster,caster,caster.abilities["Permafrost"],undefined,undefined,undefined,undefined,undefined,undefined,undefined,true)
                    }
                } else if (caster.spec==="unholy") {
                    if (getChance(8)) {
                        applyBuff(caster,caster,caster.abilities["Sudden Doom"])
                    }
                } else if (caster.class==="Druid" && caster.form==="Bear Form") {
                    caster.useEnergy(-4,0)
                } else if (caster.spec==="feral") {
                    if (getChance(10)) {
                        applyBuff(caster,caster,caster.abilities["Omen of Clarity"])
                    }
                } else if (caster.spec==="enhancement") {
                    if (caster.abilities["Hot Hand"].talentSelect) {
                        if (getChance(5)) {
                            caster.abilities["Lava Lash"].incCd(caster,9,false)
                            applyBuff(caster,caster,caster.abilities["Hot Hand"])
                        }
                    }
                } else if (caster.spec==="subtlety") {
                    if (getChance(25)) { //Shadow Techniques
                        caster.useEnergy(-8,-1)
                    }
                } else if (caster.spec==="beastMastery") {
                    if (getChance(20)) { //Wild Call
                        caster.abilities["Barbed Shot"].incCd(caster,12,false)
                    }
                }
            }
        }
    }

}
