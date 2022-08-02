class VoidBolt extends Ability {
    constructor() {
        let name = "Void Bolt"
        let cost = -12
        let gcd = 1.5
        let castTime = 0
        let cd = 4.5
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "shadow"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.spellPower = 0.816
        this.canUse = false
    }

    getTooltip() {
        return "Sends a bolt of pure void energy at the enemy, causing "+spellPowerToNumber(this.spellPower)+" Shadow damage " +
            "and extending the duration of Shadow Word: Pain and Vampiric Touch on all nearby targets by 3 sec<br>" +
            "<br>" +
            "Generates 12 Insanity."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            let target = caster.castTarget
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) && this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                done = true
            } else {
                let newTarget = findNearestEnemy(caster)
                if (newTarget!==false) {
                    if (caster === player) {
                        document.getElementById("raidFrame" + targetSelect).style.outline = "0px solid #fff"
                    }
                    caster.targetObj = newTarget
                    caster.castTarget = newTarget
                    caster.target = newTarget.name
                    target = newTarget
                    if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                        done = true
                    }
                }
            }
            if (done) {
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                for (let i = 0; i<enemies.length ;i++) {
                    if (!enemies[i].isDead && this.checkDistance(target, enemies[i],15,true) ) {
                        for (let j = 0; j<enemies[i].debuffs.length; j++) {
                            if ((enemies[i].debuffs[j].name==="Shadow Word: Pain" || enemies[i].debuffs[j].name==="Vampiric Touch") && enemies[i].debuffs[j].caster === caster ) {
                                enemies[i].debuffs[j].duration += 3
                            }
                        }
                    }
                }
                doDamage(caster,target,this)
                if (caster.abilities["Hungering Void"].talentSelect) {
                    if (checkDebuff(caster,target,"Hungering Void")) {
                        for (let i = 0; i<caster.buffs.length; i++) {
                            if (caster.buffs[i].name==="Voidform") {
                                caster.buffs[i].duration ++
                            }
                        }
                    }

                    applyDebuff(caster,target,caster.abilities["Hungering Void"])
                }
                this.setGcd(caster)
                caster.useEnergy(this.cost,this.secCost)
                this.setCd()
            }
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
