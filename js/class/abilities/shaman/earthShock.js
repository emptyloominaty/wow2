class EarthShock extends Ability {
    constructor() {
        let name = "Earth Shock"
        let cost = 60
        let gcd = 1.5
        let castTime = 0
        let cd = 0
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 2.73

        //ele
        this.spellPower *= 1.05
    }

    getTooltip() {
        return  "Instantly shocks the target with concussive force, causing "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+" Nature damage."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false

            let spellPower = this.spellPower
            if (caster.abilities["Master of the Elements"].talentSelect && checkBuff(caster,caster,"Master of the Elements")) {
                spellPower *= 1.2
                for (let i = 0; i<caster.buffs.length; i++) {
                    if (caster.buffs[i].name==="Master of the Elements") {
                        caster.buffs[i].duration = -1
                    }
                }
            }

            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) && this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                done = true
                doDamage(caster,caster.castTarget,this,undefined,spellPower)
            } else {
                let newTarget = findNearestEnemy(caster)
                if (newTarget!==false) {
                    if (caster === player) {
                        document.getElementById("raidFrame" + targetSelect).style.outline = "0px solid #fff"
                    }
                    caster.targetObj = newTarget
                    caster.target = newTarget.name
                    if (this.checkDistance(caster,caster.targetObj)  && !caster.targetObj.isDead) {
                        done = true
                        doDamage(caster,caster.targetObj,this,undefined,spellPower)
                    }
                }
            }
            if (done) {
                if (!caster.abilities["Aftershock"].refund()) {
                    caster.useEnergy(this.cost)
                }
                if (caster.abilities["Surge of Power"].talentSelect) {
                    applyBuff(caster,caster,caster.abilities["Surge of Power"])
                }

                this.setCd()
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
