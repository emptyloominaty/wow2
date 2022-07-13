class ShadowWordPain extends Ability {
    constructor() {
        let name = "Shadow Word: Pain"
        let cost = 0.3 //% mana
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

        this.spellPower = 0.1292*2.12
        this.spellPowerDot = 0.57528
        this.duration = 12

    }

    getTooltip() {
        return "A word of darkness that causes "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+" Shadow damage instantly, and an additional "+((player.stats.primary * this.spellPowerDot) * (1 + (player.stats.vers / 100)) * (1 + (player.stats.haste / 100))).toFixed(0)+" Shadow damage over 12 sec."
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

}
