class BigRngDmg extends Ability {
    constructor() {
        let name = "Big Rng Dmg"
        let cost = 0 //% mana
        let gcd = 1.5
        let castTime = 0
        let cd = 5
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "arcane"
        let range = 60 //melee
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 5

        this.effect = ""
        this.effectValue = 0
    }

    run(caster) {
    }

    startCast(caster) {
        if (caster.gcd<=0 &&  this.checkCost(caster) && !caster.isCasting && this.checkCd(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
                caster.channeling = {name:"", time:0, time2:0, timer:0, timer2:0}
            }



            let casted = false
            let ii = 0
            while (!casted && ii<50) {
                ii++
                let target = friendlyTargets[Math.floor(friendlyTargets.length*Math.random())]
                if (!target.isDead) {
                    doDamage(caster,target,this)
                    casted = true
                }
            }

            this.cd = 0
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        }
        return false
    }

    endCast(caster) {
    }

    runBuff() {
    }

    endBuff() {
    }
}
