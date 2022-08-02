class VoidEruption extends Ability {
    constructor() {
        let name = "Void Eruption"
        let cost = 0
        let gcd = 1.5
        let castTime = 1.5
        let cd = 90
        let charges = 1
        let channeling = false
        let casting = true
        let canMove = false
        let school = "shadow"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.spellPower = 0.646*2

    }

    getTooltip() {
        return "Releases an explosive blast of pure void energy, activating Voidform and causing "+spellPowerToNumber(this.spellPower)+" Shadow damage to all enemies within 10 yds of your target.<br>" +
            "During Voidform, this ability is replaced by Void Bolt."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }

            caster.isCasting = true
            caster.casting = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100)),target:caster.castTarget}
            this.setCd()
            caster.useEnergy(this.cost,this.secCost)
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }


    endCast(caster) {
        caster.isCasting = false
        checkBuff(caster,caster,"Shadowform",true)
        applyBuff(caster,caster,caster.abilities["Voidform"])
        caster.abilities["Mind Blast"].charges++
        caster.abilities["Mind Blast"].maxCharges++
        caster.abilities["Void Bolt"].canUse = true
        replaceAction(caster, "Void Eruption","Void Bolt")

        for (let i = 0; i<enemies.length ;i++) {
            if (!enemies[i].isDead && this.checkDistance(caster.castTarget, enemies[i],10,true) ) {
                doDamage(caster, enemies[i], this)
            }
        }
        caster.useEnergy(this.cost,this.secCost)
        this.setCd()
    }

}

class Voidform extends Ability {
    constructor() {
        let name = "Voidform"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 90
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "holy"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.passive = true
        this.duration = 15
        this.effect = [{name:"increaseDamage",val:0.2}]

    }

    getTooltip() {
        return "Activated by casting Void Eruption. Twists your Shadowform with the powers of the Void, increasing spell damage you deal by 20%"
    }

    getBuffTooltip(caster, target, buff) {
        return "Mind Blast has an additional charge.<br>" +
            "Spell damage dealt increased by 20%."
    }

    endBuff(caster) {
        caster.abilities["Mind Blast"].charges--
        caster.abilities["Mind Blast"].maxCharges--
        applyBuff(caster,caster,caster.abilities["Shadowform"])
        caster.abilities["Void Bolt"].canUse = false
        replaceAction(caster,"Void Bolt","Void Eruption")
    }

}
