class FlyingSerpentKick extends Ability {
    constructor() {
        let name = "Flying Serpent Kick"
        let cost = 0 //% mana
        let gcd = 1
        let castTime = 0
        let cd = 25
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 8
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.087892
        this.effect = "move"
        this.effectValue = 0.636*pxToMeter
        this.duration = 2
        this.canCastWhileRooted = false
        this.flying = false
    }

    getTooltip() { //TODO:MOVEMENT SPEED
        return "Soar forward through the air at high speed for 1.5 sec. If used again while active, you will land, dealing "+spellPowerToNumber(this.spellPower)+" damage to all enemies within 8 yards and reducing movement speed by 70% for 4 sec."
    }

    startCast(caster) {
        if (this.flying && this.abilityCd>=this.abilityMaxCd) {
            this.stopFlying(caster)
            this.landDamage(caster)
            this.flying = false
        } else {
            if (this.checkStart(caster)) {
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }

                if (caster.isCasting) {
                    caster.isCasting = false
                }
                this.flying = true
                caster.isRolling = true
                this.setGcd(caster)
                this.setCd()
                applyBuff(caster, caster, this)
                caster.useEnergy(this.cost)
                return true
            } else if (this.canSpellQueue(caster)) {
                spellQueue.add(this, caster.gcd)
            }
        }
        return false
    }
    endBuff(caster) {
        caster.isRolling = false
        this.landDamage(caster)
    }

    stopFlying(caster) {
        for(let i = 0; i<caster.buffs.length; i++) {
            if (caster.buffs[i].name==="Flying Serpent Kick") {
                caster.buffs[i].duration = -1
            }
        }
    }

    landDamage(caster) {
        for (let i = 0; i<enemies.length ;i++) {
            if (!enemies[i].isDead && this.checkDistance(caster, enemies[i]) ) {
                doDamage(caster, enemies[i], this)
            }
        }
    }
}
