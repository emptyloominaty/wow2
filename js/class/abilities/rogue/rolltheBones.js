class RolltheBones extends Ability {
    constructor() {
        let name = "Roll the Bones"
        let cost = 25
        let gcd = 1
        let castTime = 0
        let cd = 45
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.duration = 30
    }

    getTooltip() {
        return "Roll the dice of fate, providing a random combat enhancement for 30 sec."
    }

    getBuffTooltip(caster, target, buff) {
        return "Gained a random combat enhancement."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            this.setCd()

            let rngCount = Math.random()
            let c = 1
            if (rngCount>0.999) {
                c = 4
            } else if (rngCount>0.99) {
                c = 3
            } else if (rngCount>0.95) {
                c = 2
            }
            for (let i = 0; i<c; i++) {
                let rng = Math.ceil(Math.random()*6)
                if (rng===1) {
                    applyBuff(caster,caster,caster.abilities["Grand Melee"])
                } else if (rng===2) {
                    applyBuff(caster,caster,caster.abilities["Broadside"])
                } else if (rng===3) {
                    applyBuff(caster,caster,caster.abilities["Ruthless Precision"])
                } else if (rng===4) {
                    applyBuff(caster,caster,caster.abilities["Buried Treasure"])
                    caster.energyRegen += 4
                } else if (rng===5) {
                    applyBuff(caster,caster,caster.abilities["Skull and Crossbones"])
                }  else if (rng===6) {
                    applyBuff(caster,caster,caster.abilities["True Bearing"])
                }
            }

            this.setGcd(caster)
            caster.useEnergy(this.cost,this.secCost)
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
//-----------------------
class GrandMelee extends Ability {
    constructor() {
        super("Grand Melee", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.duration = 30
        this.hiddenSB = true
        this.effect = [{name:"increaseStat",stat:"leech",val:15}]
    }

    getTooltip() {
        return "Finishing moves grant 2 sec of Slice and Dice per combo point spent.<br>" +
            "<br>" +
            "Increases your Leech by 15% for the duration of Roll the Bones."
    }

    getBuffTooltip(caster, target, buff) {
        return "Gaining 2 sec of Slice and Dice per combo point spent.<br>" +
            "Leech increased by 15%."
    }
}
//-----------------------
class Broadside extends Ability {
    constructor() {
        super("Broadside", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.duration = 30
        this.hiddenSB = true
        this.effect = [{name:"increaseDamage",val:0.2}] //TODO:combo-point generating abilities
    }

    getTooltip() {
        return "Your combo-point generating abilities generate 1 additional combo point and deal 20% increased damage for the duration of Roll the Bones."
    }

    getBuffTooltip(caster, target, buff) {
        return "Your combo-point generating abilities generate 1 additional combo point and deal 20% increased damage."
    }
}
//-----------------------
class RuthlessPrecision extends Ability {
    constructor() {
        super("Ruthless Precision", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.duration = 30
        this.hiddenSB = true
        this.effect = [{name:"increaseStat",stat:"crit",val:20}] //TODO:Increases the critical ctrike chance of Between the Eyes by 60%
    }

    getTooltip() {
        return "Increases the critical ctrike chance of Between the Eyes by 60% and the critical strike chance of all other abilities by 20% for the duration of Roll the Bones."
    }

    getBuffTooltip(caster, target, buff) {
        return "Critical strike chance of Between the Eyes increased by 60%.<br>" +
            "Critical strike chance of all other abilities increased by 20%."
    }
}
//-----------------------
class BuriedTreasure extends Ability {
    constructor() {
        super("Buried Treasure", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.duration = 30
        this.hiddenSB = true
    }

    getTooltip() {
        return "Your base Energy regeneration is increased by 4 per sec for the duration of Roll the Bones."
    }

    getBuffTooltip(caster, target, buff) {
        return "Increases Energy regeneration by 4 per sec."
    }

    endBuff(caster) {
       caster.energyRegen -= 4
    }
}
//-----------------------
class SkullandCrossbones extends Ability {
    constructor() {
        super("Skull and Crossbones", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.duration = 30
        this.hiddenSB = true
    }

    getTooltip() {
        return "Causes Sinister Strike to have an additional 30% chance of striking an additional time for the duration of Roll the Bones."
    }

    getBuffTooltip(caster, target, buff) {
        return "Sinister Strike has an additional 30% chance of striking an additional time."
    }
}
//-----------------------
class TrueBearing extends Ability {
    constructor() {
        super("True Bearing", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.duration = 30
        this.hiddenSB = true
    }

    getTooltip() { //TODO:
        return "Finishing moves reduce the remaining cooldown of many of your abilities by an additional 1 sec per combo point."
    }

    getBuffTooltip(caster, target, buff) {
        return "//NOT IMPLEMENTED//Finishing moves reduce the remaining cooldown of many of your abilities by an additional 1 sec per combo point."
    }
}