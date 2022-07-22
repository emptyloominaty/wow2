class FrostStrike extends Ability {
    constructor() {
        let name = "Frost Strike"
        let cost = 25
        let gcd = 1.5
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "frost"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.66*1.2*1.05

    }

    getTooltip() {
        return "Chill your weapon with icy power and quickly strike the enemy, dealing "+spellPowerToNumber(this.spellPower)+" Frost damage."
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
                //let target = caster.castTarget
                doDamage(caster, caster.castTarget, this)
                caster.useEnergy(this.cost,this.secCost)
                if (caster.abilities["Obliteration"].talentSelect && checkBuff(caster,caster,"Pillar of Frost")) {
                    applyBuff(caster,caster,caster.abilities["Killing Machine"])
                    if (getChance(30)) {
                        caster.useEnergy(0,-1)
                    }
                }
                this.setCd()
                this.setGcd(caster)
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }

                return true
            }

        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
