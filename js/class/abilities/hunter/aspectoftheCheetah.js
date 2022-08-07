class AspectoftheCheetah extends Ability {
    constructor() {
        let name = "Aspect of the Cheetah"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 45
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "shadow"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.effect = [{name:"moveSpeed",val:0.9}]
        this.duration = 12
        this.noGcd = true
        this.timer1 = 0
        this.timer2 = 3
    }

    getTooltip() {
        return "Increases your movement speed by 90% for 3 sec, and then by 30% for another 9 sec."
    }

    getBuffTooltip(caster, target, buff) {
        return "Movement speed increased by "+(buff.effect[0].val*100)+"%."
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
            buff.effect[0].val = 0.3
        }
    }
}
