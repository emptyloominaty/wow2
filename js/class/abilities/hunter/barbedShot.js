class BarbedShot extends Ability {
    constructor() {
        let name = "Barbed Shot"
        let cost = -20
        let gcd = 1.5
        let castTime = 0
        let cd = 12
        let charges = 2
        let channeling = false
        let casting = true
        let canMove = false
        let school = "physical"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.hasteCd = true
        this.spellPower = 0.163125
        this.bleed = true
    }

    getTooltip() {
        return "Fire a shot that tears through your enemy, causing them to bleed for "+spellPowerToNumber(this.spellPower*8)+" damage over 8 sec.<br>" +
            "<br>" +
            "Sends your pet into a frenzy, increasing attack speed by 30% for 8 sec, stacking up to 3 times.<br>" + //TODO:
            "<br>" +
            "Generates 20 Focus over 8 sec." //TODO: over 8 sec
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
                applyDot(caster,target,this)
                caster.useEnergy(this.cost,this.secCost)
                this.setCd()
            }
        }
    }

}
