class DevouringPlague extends Ability {
    constructor() {
        let name = "Devouring Plague"
        let cost = 50
        let gcd = 1.5
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "shadow"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.49036
        this.spellPowerDot = 0.82
        this.duration = 6
        this.timer1 = 0
        this.timer2 = 1

    }

    getTooltip() {
        return "Afflicts the target with a disease that instantly causes "+spellPowerToNumber(this.spellPower)+" Shadow damage plus an additional "+spellPowerHotToNumber(this.spellPowerDot)+" Shadow damage over 6 sec. Heals you for 50% of damage dealt.<br>" +
            "<br>" +
            "If this effect is reapplied, any remaining damage will be added to the new Devouring Plague"
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
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
                    if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                        done = true
                    }
                }
            }
            if (done && Object.keys(caster.castTarget).length !== 0) {
                if (this.isEnemy(caster,caster.castTarget)) {
                    if (this.checkDistance(caster,caster.castTarget) && !caster.castTarget.isDead) {
                        doDamage(caster,caster.castTarget,this)

                        let dmg = 0
                        for (let i = 0; i<caster.castTarget.debuffs.length; i++) {
                            if (caster.castTarget.debuffs[i].name===this.name && caster.castTarget.debuffs[i].caster === caster) {
                                dmg = caster.castTarget.debuffs[i].duration*this.spellPowerDot/this.duration
                            }
                        }
                        doDamage(caster,caster.castTarget,this,undefined,dmg) //TODO:FIX DOT
                        applyDot(caster,caster.castTarget,this,undefined,undefined,this.spellPowerDot)
                        caster.useEnergy(this.cost,this.secCost)
                        this.setCd()
                    }
                }
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                this.setGcd(caster)
                return true
            }

        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }


    runBuff(target, buff, id = 0) {
        if (this.timer1<this.timer2) {
            this.timer1 += progressInSec
        } else {
            this.timer1 = 0
            doHeal(buff.caster,buff.caster,this,undefined,this.spellPowerDot/this.duration*0.5)
        }
    }

}
