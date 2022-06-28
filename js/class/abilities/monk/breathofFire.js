class BreathofFire extends Ability {
    constructor() {
        let name = "Breath of Fire"
        let cost = 0
        let gcd = 1
        let castTime = 0
        let cd = 15
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "fire"
        let range = 12
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.spellPower = 0.384
        this.spellPowerSec = 0.2664
        this.effect = [{name:"reduceDamage",val:0.05}]
        this.duration = 12

    }

    getTooltip() {
        return "Breathe fire on targets in front of you, causing  "+spellPowerToNumber(this.spellPower)+" Fire damage. Deals reduced damage to secondary targets.<br>" +
            "Targets affected by Keg Smash will also burn, taking "+spellPowerToNumber(this.spellPowerSec)+" Fire damage and dealing 5% reduced damage to you for 12 sec."
    }

    startCast(caster,pet = false) {
        if (this.checkStart(caster)) {
            let dir = caster.direction
            let targets = enemies
            for (let i = 0; i<targets.length ;i++) {
                if (!targets[i].isDead && this.checkDistance(caster, targets[i],undefined,true)) {
                    let dirToTarget = getDirection(caster,targets[i])
                    if (directionHit(dir,dirToTarget,60)) {
                        doDamage(caster,enemies[i],this)
                        if (checkDebuff(caster,targets[i],"Keg Smash")) {
                            applyDot(caster, targets[i], this,undefined,this.spellPowerSec)
                            applyDebuff(caster,enemies[i],this)
                        }
                    }
                }
            }

            this.setCd()
            this.setGcd(caster)

            caster.useEnergy(this.cost,this.secCost)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
