class Vendetta extends Ability {
    constructor() {
        let name = "Vendetta"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 120
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 30
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.effect = []
        this.duration = 20

    }

    getTooltip() {
        return " Marks an enemy for death for 20 sec, increasing the damage your abilities and auto attacks deal to the target by 30%, and making the target visible to you even through concealments such as stealth and invisibility." +
            "Generates 60 Energy over 3 sec."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) ) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                    applyDebuff(caster,caster.castTarget,this)
                    done = true
                }
            }
            if (done) {
                applyBuff(caster,caster,caster.abilities["VendettaEnergy"])
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                this.setCd()
                caster.useEnergy(this.cost,this.secCost)
                this.setGcd(caster)
                return true
            }
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}


class VendettaEnergy extends Ability {
    constructor() {
        let name = "Vendetta"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 30
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.hiddenSB = true

        this.effect = [{name:"restoreMana",val:100}] //60/3*5
        this.duration = 3
    }

}