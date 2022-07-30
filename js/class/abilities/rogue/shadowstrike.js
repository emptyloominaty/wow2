class Shadowstrike extends Ability {
    constructor() {
        let name = "Shadowstrike"
        let cost = 40
        let gcd = 1
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 5 //melee
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.spellPower = 0.8735*1.21
        this.secCost = -2
    }

    getTooltip() {
        return "Strike the target, dealing "+spellPowerToNumber(this.spellPower)+" Physical damage.<br>" +
            "<br>" +
            "While Stealthed, you strike through the shadows and appear behind your target up to 25 yds away, dealing 25% additional damage.<br>" +
            "<br>" +
            "Awards 2 combo point."
    }

    startCast(caster) {
        let spellPower = this.spellPower
        if (caster.isStealthed) {
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster, caster.castTarget)) {
                if (this.checkDistance(caster, caster.castTarget, 25) && !caster.castTarget.isDead) {
                    let direction = caster.castTarget.direction
                    caster.x = caster.castTarget.x
                    caster.y = caster.castTarget.y
                    caster.direction = caster.castTarget.direction
                    let speed = -(3 * pxToMeter)
                    let angleInRadian = (direction - 180) / 180 * Math.PI
                    let vx = Math.sin(angleInRadian) * speed
                    let vy = Math.cos(angleInRadian) * speed
                    caster.x += vx
                    caster.y += vy
                    spellPower *= 1.25
                }
            }
        }

        if (this.checkStart(caster)) {
            let done = false
            let target = caster.castTarget
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) ) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                    applyDebuff(caster,caster.castTarget,caster.abilities["Find Weakness"])
                    doDamage(caster,caster.castTarget,this,undefined,spellPower)
                    if (caster.abilities["Weaponmaster"].talentSelect && getChance(15)) {
                        doDamage(caster,caster.castTarget,this,undefined,spellPower)
                    }
                    done = true
                }
            }
            if (done) {
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                this.setCd()
                caster.useEnergy(this.cost,this.secCost)
                this.setGcd(caster)
                return true
            }
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
