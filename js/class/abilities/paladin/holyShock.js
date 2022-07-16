class HolyShock extends Ability {
    constructor() {
        let name = "Holy Shock"
        let cost = 3.2
        let gcd = 1.5
        let castTime = 0
        let cd = 7.5
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "holy"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.hasteCd = true
        this.spellPower = 0.68
        this.spellPowerHeal = 1.55
        this.secCost = -1
    }

    getTooltip() {
        return   "Triggers a burst of Light on the target, dealing "+spellPowerToNumber(this.spellPower)+" Holy damage to an enemy, or "+spellPowerToNumber(this.spellPowerHeal)+" healing to an ally.<br> Has an additional 30% critical effect chance<br>" +
            "<br>" +
            "Generates 1 Holy Power."
    }


    startCast(caster) {
        if (this.checkStart(caster) && this.checkDistance(caster,caster.castTarget)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            let target = caster.castTarget
            if (target==="" || Object.keys(target).length === 0 || target.isDead ) {
                //heal self
                doHeal(caster,caster,this,undefined,this.spellPowerHeal,undefined,undefined,undefined,undefined,30)
                target = caster
            } else {
                //heal target
                if (this.isEnemy(caster,target)) {
                    doDamage(caster,target,this,undefined,undefined,undefined,undefined,undefined,30)
                } else {
                    doHeal(caster,target,this,undefined,this.spellPowerHeal,undefined,undefined,undefined,undefined,30)
                }
            }

            if (caster.abilities["Glimmer of Light"].talentSelect) {
                if (target.enemy) {
                    applyDebuff(caster,target,caster.abilities["Glimmer of Light"])
                } else {
                    applyBuff(caster,target,caster.abilities["Glimmer of Light"])
                }

                for (let i = 0; i<friendlyTargets.length; i++) {
                    if (!friendlyTargets[i].isDead && checkBuff(caster,friendlyTargets[i],"Glimmer of Light")) {
                        doHeal(caster,friendlyTargets[i],caster.abilities["Glimmer of Light"],undefined,caster.abilities["Glimmer of Light"].spellPowerHeal)
                    }
                }
                for (let i = 0; i<enemies.length; i++) {
                    if (!enemies[i].isDead && checkDebuff(caster,enemies[i],"Glimmer of Light")) {
                        doDamage(caster,enemies[i],caster.abilities["Glimmer of Light"])
                    }
                }
            }

            caster.useEnergy(this.cost,this.secCost)
            this.setCd()
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
