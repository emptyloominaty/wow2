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
        let secCost = this.secCost
        let spellPower = this.spellPower
        if (caster.abilities["Divine Purpose"].talentSelect && checkBuff(caster,caster,"Divine Purpose")) {
            secCost = 0
            spellPower *= 1.2
        }

        if (this.checkStart(caster,undefined,secCost)) {

            let dir = caster.direction
            let targets = enemies
            for (let i = 0; i<targets.length ;i++) {
                if (!targets[i].isDead && this.checkDistance(caster, targets[i],6,true)) {
                    let dirToTarget = getDirection(caster,targets[i])
                    if (directionHit(dir,dirToTarget,75)) {
                        doDamage(caster, targets[i], this,undefined,spellPower)
                    }
                }
            }
            this.shiningLight++
            if (this.shiningLight>4) {
                this.shiningLight = 0
                applyBuff(caster,caster,caster.abilities["Shining Light"])
            }
            if (caster.abilities["Redoubt"].talentSelect) {
                applyBuff(caster,caster,caster.abilities["Redoubt"],1,true)
            }
            if (caster.abilities["Divine Purpose"].talentSelect) {
                checkBuff(caster,caster,"Divine Purpose",true)
                if (getChance(15)) {
                    applyBuff(caster,caster,caster.abilities["Divine Purpose"])
                }
            }

            applyBuff(caster,caster,this)
            caster.useEnergy(this.cost,secCost)
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
