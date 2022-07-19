class WakeofAshes extends Ability {
    constructor() {
        let name = "Wake of Ashes"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 45
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "holy"
        let range = 12
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.effect = [{name:"moveSpeed",val:0.5}]
        this.duration = 5
        this.spellPower = 3.465
        this.secCost = -3
    }

    getTooltip() {
        return "Lash out at your enemies, dealing (346.5% of Attack power) Radiant damage to all enemies within 12 yd in front of you and reducing their movement speed by 50% for 5 sec.<br" +
            "<br>" +
            "Demon and Undead enemies are also stunned for 5 sec.<br>" + //TODO
            "<br>" +
            "Generates 3 Holy Power."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {


            let dir = caster.direction
            let targets = enemies
            for (let i = 0; i<targets.length ;i++) {
                if (!targets[i].isDead && this.checkDistance(caster, targets[i],undefined,true)) {
                    let dirToTarget = getDirection(caster,targets[i])
                    if (directionHit(dir,dirToTarget,75)) {
                        doDamage(caster, targets[i], this)
                        applyDebuff(caster,targets[i],this)
                    }
                }
            }

            caster.useEnergy(this.cost,this.secCost)
            this.setCd()
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
