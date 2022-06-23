class ChainLightning extends Ability {
    constructor(ele = false,resto = false) {
        let name = "Chain Lightning"
        let cost = 0.2
        let gcd = 1.5
        let castTime = 2
        let cd = 0
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = true
        let canMove = false
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.635
        this.jumptargets = 2
        this.jumpRange = 15
        if (ele) {
            this.cost = -4 //TODO:*target hit
            this.jumptargets +=2
        }
        if (resto) {
            this.spellPower *= 1.61
            this.spellPower *= 1.15

        }
    }

    getTooltip() {
        return "Hurls a lightning bolt at the enemy, dealing "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+" Nature damage and then jumping to additional nearby enemies. Affects 3 total targets."
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.checkDistance(caster,caster.castTarget)) {

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
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                caster.isCasting = true
                caster.casting = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100)),target:caster.castTarget}
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

        if (this.isEnemy(caster,target) || !target.isDead || target!=="" || Object.keys(target).length !== 0) {
            doDamage(caster, target, this)

            //jump
            let ttt = 0
            let lastTarget = target
            let targets = enemies
            for (let i = 0; i<targets.length ;i++) {
                if (!targets[i].isDead && this.checkDistance(lastTarget, targets[i],this.jumpRange)) {
                    lastTarget = targets[i]
                    doDamage(caster, targets[i], this)
                    ttt++
                    if (ttt>=this.jumptargets) {
                        break
                    }
                }
            }

            this.setCd()
            caster.useEnergy(this.cost)

        }
    }
}
