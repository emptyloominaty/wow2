class PowerWordRadiance extends Ability {
    constructor() {
        let name = "Power Word: Radiance"
        let cost = 6.5
        let gcd = 1.5
        let castTime = 2
        let cd = 20
        let charges = 2
        let channeling = false
        let casting = true
        let canMove = false
        let school = "holy"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 1.05
        this.cleaveRange = 30
        this.targetsHeal = 4
    }

    getTooltip() {
        return "A burst of light heals the target and 4 injured allies within 30 yards for "+spellPowerToNumber(this.spellPower)+", and applies Atonement for 60% of its normal duration."
    }


    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            caster.isCasting = true
            caster.casting = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100)),target:caster.castTarget}
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endCast(caster) {
        caster.isCasting = false
        let target = caster.casting.target

        //  if (caster.abilities["Spirit Shell"].talentSelect && checkBuff(caster,caster,"Spirit Shell")) {
        //             let buff = false
        //             for (let i = 0; i<target.buffs.length; i++) {
        //                 if (target.buffs[i].name==="Spirit Shell " && target.buffs[i].caster === caster) {
        //                     target.buffs[i].effect[0].val += heal * 0.8
        //                     buff = true
        //                 }
        //             }
        //             if (!buff) {
        //                 caster.abilities["Spirit Shell "].applyAbsorb(caster,target,heal)
        //             }
        //         } else {
        //             doHeal(caster,target,this,undefined,undefined,undefined,undefined,undefined,heal)
        //         }

        let spiritShell = false
        let val = 0
        if (caster.abilities["Spirit Shell"].talentSelect && checkBuff(caster,caster,"Spirit Shell")) {
            spiritShell = true
            val = ((caster.stats.primary * this.spellPower) * (1 + (caster.stats.vers / 100))) * 0.8
        }

        if (this.isEnemy(caster,target) || target.isDead || Object.keys(target).length === 0 || !this.checkDistance(caster, target)) {
            //heal self
            if (!spiritShell) {
                doHeal(caster, caster, this)
            }
            applyBuff(caster,caster,caster.abilities["Atonement"],undefined,undefined,undefined,9)
            target = caster
        } else {
            //heal target
            if (!spiritShell) {
                doHeal(caster, target, this)
            }
            applyBuff(caster,target,caster.abilities["Atonement"],undefined,undefined,undefined,9)
        }

        if (spiritShell) {
            let buff = false
            for (let i = 0; i<target.buffs.length; i++) {
                if (target.buffs[i].name==="Spirit Shell " && target.buffs[i].caster === caster) {
                    target.buffs[i].effect[0].val += val
                    buff = true
                }
            }
            if (!buff) {
                caster.abilities["Spirit Shell "].applyAbsorb(caster,target,val)
            }
        }


        let tth = 0
        let targets = sortFriendlyTargetsByHealth(true)
        for (let i = 0; i<targets.length ;i++) {
            if (!targets[i].isDead && this.checkDistance(target, targets[i]) && !checkBuff(caster,targets[i],"Atonement")) { //TODO: buff fix
                if (spiritShell) {
                    console.log(val)
                    let buff = false
                    for (let i = 0; i<targets[i].buffs.length; i++) {
                        if (targets[i].buffs[i].name==="Spirit Shell " && targets[i].buffs[i].caster === caster) {
                            targets[i].buffs[i].effect[0].val += val
                            buff = true
                        }
                    }
                    if (!buff) {
                        caster.abilities["Spirit Shell "].applyAbsorb(caster,targets[i],val)
                    }
                } else {
                    doHeal(caster, targets[i], this)
                }
                applyBuff(caster,targets[i],caster.abilities["Atonement"],undefined,undefined,undefined,9)
                tth++
            }
            if (tth>=this.targetsHeal) {
                break
            }
        }

        this.setCd()
        caster.useEnergy(this.cost)
    }
}
