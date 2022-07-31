class Pyroblast extends Ability {
    constructor() {
        let name = "Pyroblast"
        let cost = 2
        let gcd = 1.5
        let castTime = 4.5
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = true
        let canMove = false
        let school = "fire"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.spellPower = 1.5171
        this.spellPowerDot = 0.186
        this.duration = 6
    }

    getTooltip() {
        return "Hurls an immense fiery boulder that causes "+spellPowerToNumber(this.spellPower)+" Fire damage and an additional "+spellPowerHotToNumber(this.spellPowerDot)+" Fire damage over 6 sec."
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
                let castTime = this.castTime
                if (checkBuff(caster,caster,"Hot Streak",true)) {
                    castTime = 0
                    caster.abilities["Ignite"].doubleDamage = true
                }
                caster.isCasting = true
                caster.casting = {name:this.name, time:0, time2:(castTime/(1+(caster.secondaryResource*0.08)))/(1 + (caster.stats.haste / 100)),target:caster.castTarget}
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
                applyDot(caster,target,this,undefined,undefined,this.spellPowerDot)
                caster.useEnergy(this.cost,this.secCost)
                this.setCd()
            }
        }
    }
}
