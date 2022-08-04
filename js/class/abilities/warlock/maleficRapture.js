class MaleficRapture extends Ability {
    constructor() {
        let name = "Malefic Rapture"
        let cost = 0
        let gcd = 1.5
        let castTime = 1.5
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = true
        let canMove = false
        let school = "shadow"
        let range = 100
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.275*1.14
        this.secCost = 1

    }

    getTooltip() {
        return "Your damaging periodic effects erupt on all targets, "+spellPowerToNumber(this.spellPower)+" Shadow damage per effect."
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
                let dots = 0
                for (let i = 0; i<target.debuffs.length; i++) {
                    if (target.debuffs[i].caster === caster) {
                        if (target.debuffs[i].name==="Corruption" || target.debuffs[i].name==="Unstable Affliction" || target.debuffs[i].name==="Agony" || target.debuffs[i].name==="Vile Taint" || target.debuffs[i].name==="Siphon Life" || target.debuffs[i].name==="Phantom Singularity") {
                            dots ++
                        }
                    }
                }

                doDamage(caster, target, this,undefined,this.spellPower*dots)
                caster.useEnergy(this.cost,this.secCost)
                this.setCd()
            }
        }
    }

}
