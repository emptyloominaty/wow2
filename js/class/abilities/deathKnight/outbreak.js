class Outbreak extends Ability {
    constructor() {
        let name = "Outbreak"
        let cost = -10
        let gcd = 1.5
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "shadow"
        let range = 30
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.1
        this.secCost = 1
    }

    getTooltip() {
        return "Deals "+spellPowerToNumber(this.spellPower)+" Shadow damage to the target and infects all nearby enemies with Virulent Plague."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) && this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                for (let i = 0; i < enemies.length; i++) {
                    if (!enemies[i].isDead && this.checkDistance(caster.castTarget, enemies[i], 8, true)) {
                        caster.abilities["Virulent Plague"].caster = caster
                        doDamage(caster, enemies[i], this)
                        applyDot(caster, enemies[i], caster.abilities["Virulent Plague"])
                    }
                }
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                this.setCd()
                caster.useEnergy(this.cost, this.secCost)
                this.setGcd(caster)
                return true
            }
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}

//----------------------------------------
class VirulentPlague extends Ability {
    constructor() {
        let name = "Virulent Plague"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "shadow"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.passive = true
        this.spellPower = 1.125
        this.spellPower2 = 0.24
        this.duration = 27

        this.timer1 = 0
        this.timer2 = 1
        this.caster = {}

    }

    getTooltip() {
        return "A disease that deals "+spellPowerHotToNumber(this.spellPower)+" Shadow damage over 27 sec. It erupts when the infected target dies, dealing "+spellPowerToNumber(this.spellPower2)+" Shadow damage to nearby enemies."
    }

   endBuff(target) {
       let caster = this.caster
       for (let i = 0; i<enemies.length ;i++) {
           if (!enemies[i].isDead && this.checkDistance(caster, enemies[i],undefined,true) ) {
               doDamage(caster, enemies[i], this,undefined,this.spellPower2)
           }
       }
   }


}
