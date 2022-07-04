class Swiftmend extends Ability {
    constructor() {
        let name = "Swiftmend"
        let cost = 1.6
        let gcd = 1.5
        let castTime = 0
        let cd = 15
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.spellPower = 3.45*1.1
    }

    getTooltip() {
        return " Consumes a Regrowth, Wild Growth, or Rejuvenation effect to instantly heal an ally for "+spellPowerToNumber(this.spellPower)+"."
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.checkDistance(caster,caster.castTarget)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }

            let checkHot = function(caster,target) {
                let regrowth = false
                let wildGrowth = false
                let rejuvenation = false
                for (let i = 0; i<target.buffs.length; i++) {
                    if (target.buffs[i].name === "Regrowth" && target.buffs[i].caster === caster ) {
                        regrowth = i
                    } else if (target.buffs[i].name === "Wild Growth" && target.buffs[i].caster === caster ) {
                        wildGrowth = i
                    } else if (target.buffs[i].name === "Rejuvenation" && target.buffs[i].caster === caster ) {
                        rejuvenation = i
                    }
                }
                return [regrowth,wildGrowth,rejuvenation]
            }

            let done = false
            let target = caster.castTarget
            if (this.isEnemy(caster,target) || target.isDead || target==="" || Object.keys(target).length === 0) {
                let hots = checkHot(caster,caster)
                for (let i = 0; i<hots.length ; i++) {
                    if (hots[i]!==false) {
                        caster.buffs[hots[i]].duration = -1
                        doHeal(caster,caster,this)
                        done = true
                        break
                    }
                }
            } else {
                let hots = checkHot(caster,target)
                for (let i = 0; i<hots.length ; i++) {
                    if (hots[i]!==false) {
                        target.buffs[hots[i]].duration = -1
                        doHeal(caster,target,this)
                        done = true
                        break
                    }
                }
            }
            if (done) {
                this.setCd()
                caster.useEnergy(this.cost)
                this.setGcd(caster)
                return true
            }
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
