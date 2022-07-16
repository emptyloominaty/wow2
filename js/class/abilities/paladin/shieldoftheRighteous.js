class ShieldoftheRighteous extends Ability {
    constructor() {
        let name = "Shield of the Righteous"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd =1
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "holy"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.425
        this.secCost = 3
        this.noGcd = true
        this.duration = 4.5
        this.effect = [{name:"increaseStat",stat:"armor",val:15}]
        this.shiningLight = 0
    }

    getTooltip() {
        return "Slams enemies in front of you with your shield, causing "+spellPowerToNumber(this.spellPower)+" Holy damage, and increasing your Armor by (170 * Strength / 100) for 4.5 sec."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {

            let dir = caster.direction
            let targets = enemies
            for (let i = 0; i<targets.length ;i++) {
                if (!targets[i].isDead && this.checkDistance(caster, targets[i],6,true)) {
                    let dirToTarget = getDirection(caster,targets[i])
                    if (directionHit(dir,dirToTarget,75)) {
                        doDamage(caster, targets[i], this)
                    }
                }
            }
            this.shiningLight++
            if (this.shiningLight>4) {
                this.shiningLight = 0
                applyBuff(caster,caster,caster.abilities["Shining Light"])
            }
            applyBuff(caster,caster,this)
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
