class HeartStrike extends Ability {
    constructor() {
        let name = "Heart Strike"
        let cost = -15
        let gcd = 1.5
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.3592*1.2*1.06
        this.secCost = 1

        this.duration = 8
        this.effect = [{name:"moveSpeed",val:0.2}]

    }

    getTooltip() {
        return "Instantly strike the target and 1 other nearby enemy, causing "+spellPowerToNumber(this.spellPower)+" Physical damage, and reducing enemies' movement speed by 20% for 8 sec."
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
                let target = caster.castTarget
                doDamage(caster, caster.castTarget, this)
                applyDebuff(caster, caster.castTarget, this)
                for (let i = 0; i<enemies.length; i++) {
                    if (!enemies[i].isDead && enemies[i]!==target && this.checkDistance(caster,enemies[i],5,true)) {
                        doDamage(caster,enemies[i],this)
                        applyDebuff(caster,enemies[i],this)
                        break
                    }
                }

                caster.useEnergy(this.cost,this.secCost)
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
