class SliceAndDice extends Ability {
    constructor() {
        let name = "Slice And Dice"
        let cost = 25

        let gcd = 1
        let castTime = 0
        let cd = 0
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "nature"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0

        this.duration = 12


        this.effect = "incAttackSpeed"
        this.effectValue = 0.5

        this.secCost = "all"

    }

    getTooltip() {
        return "Finishing move that consumes combo points to increase attack speed by 50%. Lasts longer per combo point. <br>   1 point  : 12 seconds " +
            "<br>2 points: 18 seconds" +
            "<br>3 points: 24 seconds" +
            "<br>4 points: 30 seconds" +
            "<br>5 points: 36 seconds"
    }

    run(caster) {
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            this.duration = 12 + (6*caster.secondaryResource)
            this.setCd()
            applyBuff(caster,caster,this)
            if (caster.abilities["Elaborate Planning"].talentSelect) {
                applyBuff(caster,caster,caster.abilities["Elaborate Planning"])
            }
            this.setGcd(caster)
            if (caster.abilities["Alacrity"].talentSelect) {
                caster.abilities["Alacrity"].applyBuff(caster)
            }
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

    endCast(caster) {
    }
}
