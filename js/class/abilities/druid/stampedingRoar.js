class StampedingRoar extends Ability {
    constructor() {
        let name = "Stampeding Roar"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 60
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 15
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.effect = [{name:"moveSpeed",val:0.6}]
        this.duration = 8
        this.canCastForm = "all"
    }

    getTooltip() {
        return "Shift into Bear Form and let loose a wild roar, increasing the movement speed of all friendly players within 15 yards by 60% for 8 sec."
    }

    getBuffTooltip(caster, target, buff) {
        return "Movement speed increased by 60%."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.form!=="Bear Form") {
                if (caster.form!=="Cat Form") {
                    console.log(caster.form)
                    caster.abilities["Bear Form"].startCast(caster)
                }
            }
            for (let i = 0; i<friendlyTargets.length; i++) {
                if (!friendlyTargets[i].isDead && this.checkDistance(caster,friendlyTargets[i],undefined,true)) {
                    applyBuff(caster,friendlyTargets[i],this)
                }
            }
            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        }
        return false
    }
}
