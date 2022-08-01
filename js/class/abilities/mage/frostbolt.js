class Frostbolt extends Ability {
    constructor() {
        let name = "Frostbolt"
        let cost = 2
        let gcd = 1.5
        let castTime = 2
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = true
        let canMove = false
        let school = "frost"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.spellPower = 0.55188*1.15
        this.effect = [{name:"moveSpeed",val:0.5}]
        this.duration = 8
    }

    getTooltip() {
        return "Launches a bolt of frost at the enemy, causing "+spellPowerToNumber(this.spellPower)+" Frost damage and slowing movement speed by 50% for 8 sec."
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
                caster.casting = {name:this.name, time:0, time2:(this.castTime/(1+(caster.secondaryResource*0.08)))/(1 + (caster.stats.haste / 100)),target:caster.castTarget}
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                this.setGcd(caster)
            }
            return true
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
                doDamage(caster,target,this)
                applyDebuff(caster,target,this)
                if (getChance(30)) {
                    applyDebuff(caster,target,caster.abilities["Winter's Chill"])
                    applyBuff(caster,caster,caster.abilities["Brain Freeze"])
                }
                caster.abilities["Icicles"].increaseIcicles(caster,target)
                caster.abilities["Fingers of Frost"].getBuff(caster,this)
                caster.useEnergy(this.cost,this.secCost)
                this.setCd()
            }
        }
    }
}
