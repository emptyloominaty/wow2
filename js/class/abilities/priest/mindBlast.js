class MindBlast extends Ability {
    constructor(disc = false) {
        let name = "Mind Blast"
        let cost = 0.25
        let gcd = 1.5
        let castTime = 1.5
        let cd = 15
        let charges = 1
        let channeling = false
        let casting = true
        let canMove = false
        let school = "shadow"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.9792

        if (disc) {
            this.spellPower = 0.9792*0.76
        }

    }

    getTooltip() {
        if (player.spec==="discipline") {
            return "Blasts the target's mind for "+spellPowerToNumber(this.spellPower)+" Shadow damage <br>" +
                "preventing the next "+spellPowerToNumber(this.spellPower*3)+" damage they deal" //TODO:
        } else {
            return "Blasts the target's mind for "+spellPowerToNumber(this.spellPower)+" Shadow damage."
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
                caster.useEnergy(this.cost,this.secCost)
                this.setCd()
            }
        }
    }

}
