class CrashLightning extends Ability {
    constructor() {
        let name = "Crash Lightning"
        let cost = 1
        let gcd = 1.5
        let castTime = 0
        let cd = 9
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "nature"
        let range = 8
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.spellPower = 0.192
        this.spellPower2 = 0.24
        this.hasteCd = true

    }

    getTooltip() {
        return "Electrocutes all enemies in front of you, dealing "+spellPowerToNumber(this.spellPower)+" Nature damage." +
            " Hitting 2 or more targets enhances your weapons for 10 sec, causing Stormstrike and Lava Lash to also deal "+spellPowerToNumber(this.spellPower2)+" Nature damage to all targets in front of you.  <br>" + //TODO:
            "<br>" +
            "Each target hit by Crash Lightning increases the damage of your next Stormstrike by 5%."
    }

    getBuffTooltip(caster, target, buff) {
        return "Stormstrike and Lava Lash deal an additional (24% of Attack power) damage to all targets in front of you." //TODO:
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let dir = caster.direction
            for (let i = 0; i<enemies.length ;i++) {
                if (!enemies[i].isDead && this.checkDistance(caster, enemies[i],undefined,true) ) {
                    let dirToTarget = getDirection(caster,enemies[i])
                    if (directionHit(dir,dirToTarget,75)) {
                        doDamage(caster, enemies[i], this)
                    }
                }
            }
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            this.setCd()
            caster.useEnergy(this.cost,this.secCost)
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
