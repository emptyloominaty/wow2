class Smite extends Ability {
    constructor(disc = false) {
        let name = "Smite"
        let cost = 0.2 //% mana

        let gcd = 1.5
        let castTime = 1.5
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = true
        let canMove = true
        let school = "holy"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = (0.47*1.5)*1.44
        this.resetChance = 20

        if (disc) {
            this.spellPower = (0.47*1.5)*0.7
        }

    }

    getTooltip() {
        return "Smites an enemy for "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+" Holy damage and has a 20% chance to reset the cooldown of Holy Fire."
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
            if (done) {
                caster.isCasting = true
                caster.casting = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100)),target:caster.castTarget}
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

    endCast(caster) {
        caster.isCasting = false
        let target = caster.casting.target
        if (Object.keys(target).length !== 0 && this.isEnemy(caster,target)) {
            if (this.checkDistance(caster,target)  && !target.isDead) {
                doDamage(caster, target, this)

                if (caster.spec==="holyPriest") {
                    if (getChance(this.resetChance)) {
                        caster.abilities["Holy Fire"].cd = caster.abilities["Holy Fire"].maxCd
                    }
                    caster.abilities["Surge of Light"].chance(caster)
                    caster.abilities["Holy Word: Chastise"].reduceCd(caster.abilities["Holy Words"].chastise)
                }
                caster.useEnergy(this.cost,this.secCost)
                this.setCd()
            }
        }
    }

}
