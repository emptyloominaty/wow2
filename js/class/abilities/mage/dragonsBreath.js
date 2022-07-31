class DragonsBreath extends Ability {
    constructor() {
        let name = "Dragon's Breath"
        let cost = 4
        let gcd = 1.5
        let castTime = 0
        let cd = 18
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "fire"
        let range = 10
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.5825
        this.duration = 4
        this.effect = [{name:"stun"}]

    }

    getTooltip() {
        return "Enemies in a cone in front of you take "+spellPowerToNumber(this.spellPower)+" Fire damage and are disoriented for 4 sec. Damage will cancel the effect."
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
                        applyDebuff(caster, targets[i], this)
                    }
                }
            }
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            caster.useEnergy(this.cost,this.secCost)
            this.setGcd(caster)
            this.setCd()
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
