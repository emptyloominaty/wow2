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
            this.cost = -4
            this.jumptargets += 2
            this.spellPower *= 1.05
        } else if (resto) {
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

                let castTime = this.castTime
                let gcd = this.gcd
                if (caster.spec==="elemental" && caster.abilities["Storm Elemental"].talentSelect && checkBuff(caster,caster,"Storm Elemental")) {
                    let val = caster.abilities["Storm Elemental"].getVal(caster)
                    castTime = castTime * val
                    gcd = gcd*val
                    caster.abilities["Storm Elemental"].incStacks(caster)
                }

                if (caster.spec==="elemental" && checkBuff(caster,caster,"Stormkeeper")) {
                    castTime = 0
                }

                caster.isCasting = true
                caster.casting = {name:this.name, time:0, time2:castTime/(1 + (caster.stats.haste / 100)),target:caster.castTarget}
                this.setGcd(caster,gcd)
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

        let spellPower = this.spellPower
        if (caster.spec==="elemental" && caster.abilities["Master of the Elements"].talentSelect && checkBuff(caster,caster,"Master of the Elements")) {
            spellPower *= 1.2
            for (let i = 0; i<caster.buffs.length; i++) {
                if (caster.buffs[i].name==="Master of the Elements") {
                    caster.buffs[i].duration = -1
                }
            }
        }
        if (caster.spec==="elemental" && caster.abilities["Stormkeeper"].talentSelect) {
            for (let i = 0; i<caster.buffs.length; i++) {
                if (caster.buffs[i].name==="Stormkeeper") {
                    spellPower *= 2.5
                    if (caster.buffs[i].stacks>1) {
                        caster.buffs[i].stacks--
                    } else {
                        caster.buffs[i].duration = -1
                    }
                }
            }
        }

        if (this.isEnemy(caster,target) || !target.isDead || target!=="" || Object.keys(target).length !== 0) {
            doDamage(caster, target, this,undefined,spellPower)

            //jump
            let ttt = 0
            let lastTarget = target
            let targets = enemies
            for (let i = 0; i<targets.length ;i++) {
                if (!targets[i].isDead && this.checkDistance(lastTarget, targets[i],this.jumpRange,true)) {
                    lastTarget = targets[i]
                    doDamage(caster, targets[i], this,undefined,spellPower)
                    if (caster.spec==="elemental") {
                        caster.useEnergy(this.cost)
                    }
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
