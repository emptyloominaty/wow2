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

        this.spellPower = 0.34
        this.effect = ""
    }

    run() {
    }

    heal(caster,target = {}) {
        caster.isCasting = false
        this.spellPower = caster.stats.mastery/100
        if (Object.keys(target).length === 0) {
            if (caster.target==="" || caster.castTarget.enemy) {
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
