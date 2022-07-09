class ClearcastingMage extends Ability {
    constructor() {
        let name = "Clearcasting "
        let cost = 15 //% mana

        let gcd = 1.5
        let castTime = 2.5
        let cd = 0
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = true
        let canMove = false
        let school = "arcane"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0
        this.secCost = 0
        this.manaSpent = 0
        this.duration = 15
        this.maxStacks = 3

        this.passive = true

    }

    getTooltip() {
        return "For each 0.5 mana you spend, you have a 1% chance to gain Clearcasting, making your next Arcane Missiles or Arcane Explosion free and channel 20% faster."
    }

    getBuffTooltip(caster, target, buff) {
        return "Your next Arcane Missiles costs no mana and deals 5% additional damage."
    }

    spendMana(caster,val) {
        this.manaSpent += val
        if(getChance(this.manaSpent/0.5)) {
            this.manaSpent = 0
            for (let i = 0; i<caster.buffs.length; i++) {
                if (caster.buffs[i].name==="Clearcasting ") {
                    caster.buffs[i].stacks++
                    if (caster.buffs[i].stacks>this.maxStacks) {
                        caster.buffs[i].stacks = this.maxStacks
                    }
                    caster.buffs[i].duration = this.duration
                    return true
                }
            }
            applyBuff(caster,caster,this)
            return true
        }
    }

    startCast(caster) {
        return true
    }

}
