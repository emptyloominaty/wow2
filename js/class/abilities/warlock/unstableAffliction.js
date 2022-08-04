class UnstableAffliction extends Ability {
    constructor() {
        let name = "Unstable Affliction"
        let cost = 0
        let gcd = 1.5
        let castTime = 1.5
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = true
        let canMove = false
        let school = "shadow"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 1.84*1.14
        this.duration = 21
        this.maxStacks = 5
        this.secCost = 1

    }

    getTooltip() {
        return "Afflicts the target with "+spellPowerHotToNumber(this.spellPower)+" Shadow damage over 13 sec. You may afflict a target with up to 5 Unstable Afflictions at once.<br>" +
            "You deal 10% increased damage to targets affected by your Unstable Affliction.<br>" + //TODO:
            "If dispelled, deals [(18.125% of Spell power) * 400 / 100] damage to the dispeller and silences them for 4 sec.<br>" + //TODO:
            "Refunds 1 Soul Shard if the target dies while afflicted." //TODO
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) && this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                done = true
            } else {
                let newTarget = findNearestEnemy(caster)
                if (newTarget!==false) {
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

        }
        return false
    }

    endCast(caster) {
        caster.isCasting = false
        let target = caster.casting.target
        if (Object.keys(target).length !== 0 && this.isEnemy(caster,target)) {
            if (this.checkDistance(caster,target)  && !target.isDead) {

                let stacks = 1
                for (let j = 0; j < target.debuffs.length; j++) {
                    if (target.debuffs[j].name === "Unstable Affliction" && target.debuffs[j].caster === caster) {
                        target.debuffs[j].stacks++
                        stacks = target.debuffs[j].stacks
                        if (stacks > this.maxStacks) {
                            stacks = this.maxStacks
                            target.debuffs[j].stacks = this.maxStacks
                        }
                        target.debuffs[j].spellPower = (this.spellPower * stacks) / this.duration
                    }
                }
                applyDot(caster,target,this,undefined,undefined,this.spellPower)
                caster.useEnergy(this.cost,this.secCost)
                this.setCd()
            }
        }
    }
}
