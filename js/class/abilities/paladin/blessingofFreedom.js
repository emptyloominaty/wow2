class BlessingofFreedom extends Ability {
    constructor() {
        let name = "Blessing of Freedom"
        let cost = 1.4
        let gcd = 1.5
        let castTime = 0
        let cd = 25
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "holy"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.duration = 8
    }

    getTooltip() { //TODO :REMOVE SNARES
        return "Blesses a party or raid member, granting immunity to movement impairing effects for 8 sec.<br>"//TODO:granting immunity to movement impairing effects
    }

    getBuffTooltip(caster, target, buff) {
        return "Immune to movement impairing effects."
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.checkDistance(caster,caster.castTarget)) {
            let removeRoots = (caster,target)=> {
                if (target.isRooted) {
                    target.isRooted = false
                    for (let i = 0; i<target.debuffs.length; i++) {
                        for (let j = 0; j < target.debuffs[i].effect.length; j++) {
                            if (target.debuffs[i].effect[j].name === "root") {
                                target.debuffs[i].duration = -1
                            }
                        }
                    }
                }
            }

            this.setCd()
            this.setGcd(caster)
            let target = caster.castTarget
            if (target==="" || Object.keys(target).length === 0 || this.isEnemy(caster,target) || target.isDead) {
                applyBuff(caster,caster,this)
                removeRoots(caster,caster)
            } else {
                applyBuff(caster,target,this)
                removeRoots(caster,target)
            }
            caster.useEnergy(this.cost)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }
}
