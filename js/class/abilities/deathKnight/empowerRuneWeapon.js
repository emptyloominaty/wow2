class EmpowerRuneWeapon extends Ability {
    constructor() {
        let name = "Empower Rune Weapon"
        let cost = -5
        let gcd = 0
        let castTime = 0
        let cd = 105
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.effect = [{name:"increaseStat",stat:"haste",val:15}]
        this.duration = 20
        this.noGcd = true
        this.timer1 = 0
        this.timer2 = 5
        this.secCost = -1
    }

    getTooltip() {
        return "Empower your rune weapon, gaining 15% Haste and generating 1 Rune and 5 Runic Power instantly and every 5 sec for 20 sec."
    }

    getBuffTooltip(caster, target, buff) {
        return "Haste increased by 15%.<br>" +
            "Generating 1 Rune and 5 Runic Power every 5 sec."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            this.setCd()
            this.setGcd(caster)
            applyBuff(caster,caster,this)
            caster.useEnergy(this.cost,this.secCost)
            return true
        }
        return false
    }

    runBuff(caster, buff, id = 0) {
        if (this.timer1<this.timer2) {
            this.timer1 += progressInSec
        } else {
            this.timer1 = 0
            caster.useEnergy(-5,-1)
        }
    }
}
