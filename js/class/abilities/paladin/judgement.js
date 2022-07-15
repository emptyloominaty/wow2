class Judgment extends Ability {
    constructor() {
        let name = "Judgment"
        let cost = 1.5
        let gcd = 1.5
        let castTime = 0
        let cd = 12
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "holy"
        let range = 30
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.hasteCd = true
        this.spellPower = 1.125*1.5
        this.secCost = -1

    }

    getTooltip() { //TODO:and causing the target to take 30% increased damage from your next Crusader Strike or Holy Shock
        if (player.spec==="holyPaladin") {
            return "Judges the target, dealing "+spellPowerToNumber(this.spellPower)+" Holy damage and causing the target to take 30% increased damage from your next Crusader Strike or Holy Shock. Generates 1 Holy Power."
        } else {
            return "Judges the target, dealing "+spellPowerToNumber(this.spellPower)+" Holy damage and causing them to take 25% increased damage from your next Holy Power ability. Generates 1 Holy Power."
        }
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
                        doDamage(caster, caster.castTarget, this)
                        caster.useEnergy(this.cost,this.secCost)
                        this.setCd()
                        if (caster.spec==="holyPaladin" && caster.abilities["Judgment of Light"].talentSelect) {
                            applyDebuff(caster,caster.castTarget,caster.abilities["Judgment of Light"],undefined,25,true)
                        }

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

}
