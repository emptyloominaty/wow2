class GustOfMists extends Ability {
    constructor() {
        let name = "Gust of Mists"
        let cost = 0 //% mana
        let gcd = 0
        let castTime = 0
        let cd = 0
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.passive = true
        this.spellPower = 0.34
    }

    run(caster) {
    }

    heal(caster,target = {}) {
        this.spellPower = caster.stats.mastery/100
        if (Object.keys(target).length === 0) {
            if (Object.keys(caster.castTarget).length === 0 || caster.castTarget.enemy) {
                Object.keys(caster.buffs).forEach((key)=> {
                    if (caster.buffs[key].name === "Essence Font") {
                        doHeal(caster,caster,this,15)
                    }
                })
                //heal self
                doHeal(caster,caster,this,15)
            } else {
                Object.keys(caster.castTarget.buffs).forEach((key)=> {
                    if (caster.castTarget.buffs[key].name === "Essence Font") {
                        doHeal(caster,caster.castTarget,this,30)
                    }
                })
                //heal target
                doHeal(caster,caster.castTarget,this,15)
            }
        } else {
            Object.keys(target.buffs).forEach((key)=> {
                if (target.buffs[key].name === "Essence Font") {
                    doHeal(caster,target,this,30)
                }
            })
            doHeal(caster,target,this,15)
        }

    }
}


//---------------------------------------------------------------------------------------------------------------------
class GustOfMistsChiJi extends Ability {
    constructor() {
        let name = "Gust of Mists (Chi-Ji)"
        let cost = 0 //% mana
        let gcd = 0
        let castTime = 0
        let cd = 0
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.passive = true

        this.spellPower = 0.34
        this.effect = ""
        this.targets = 2
    }

    run(caster) {
    }

    heal(caster) {
        this.spellPower = caster.stats.mastery/100
        caster.abilities["Invoke Chi-Ji, the Red Crane"].applyBuff(caster)

        let tt = 0
        let array = createArrayAndShuffle(friendlyTargets.length)
        for (let i = 0; i<friendlyTargets.length; i++) {
            if (!friendlyTargets[array[i]].isDead && friendlyTargets[array[i]].health<friendlyTargets[array[i]].maxHealth && this.checkDistance(caster, friendlyTargets[array[i]])) {
                Object.keys(friendlyTargets[array[i]].buffs).forEach((key)=> {
                    if (friendlyTargets[array[i]].buffs[key].name === "Essence Font") {
                        doHeal(caster,friendlyTargets[array[i]],this)
                    }
                })
                doHeal(caster, friendlyTargets[array[i]], this)
                tt++
                if (tt >= this.targets) {
                    break
                }
            }
        }
    }
}

