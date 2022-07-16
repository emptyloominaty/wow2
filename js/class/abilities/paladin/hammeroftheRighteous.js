class HammeroftheRighteous extends Ability {
    constructor() {
        let name = "Hammer of the Righteous"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 6
        let charges = 2
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.27
        this.spellPowerAoe = 0.087048
        this.hasteCd = true
        this.secCost = -1

    }

    getTooltip() {
        return "Hammers the current target for "+spellPowerToNumber(this.spellPower)+" Physical damage." +
            "<br>" +
            "While you are standing in your Consecration, Hammer of the Righteous also causes a wave of light that hits all other targets within 8 yds for "+spellPowerToNumber(this.spellPowerAoe)+" Holy damage<br>" +
            "<br>" +
            "Generates 1 Holy Power."
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
                    }
                }

                let consecration = caster.abilities["Consecration"]
                if (consecration.areaId!==undefined) {
                    if (areas[consecration.areaId] && areas[consecration.areaId].ability.name === "Consecration" && areas[consecration.areaId].caster === caster) {
                        if (getDistance(caster,areas[consecration.areaId])<8) {
                            for (let i = 0; i<enemies.length; i++) {
                                if (!enemies[i].isDead && this.checkDistance(caster,enemies[i],8,true)) {
                                    doDamage(caster,enemies[i],this,undefined,this.spellPowerAoe)
                                }
                            }
                        }
                    }
                }

                if (getChance(15)) {
                    caster.abilities["Avenger's Shield"].cd = caster.abilities["Avenger's Shield"].maxCd
                    if (caster.abilities["Crusader's Judgment"].talentSelect) {
                        caster.abilities["Judgment"].cd = caster.abilities["Judgment"].maxCd
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
