class Shadowstep extends Ability {
    constructor() {
        let name = "Shadowstep"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 30
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 25
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.duration = 2
        this.effect = [{name:"moveSpeed",val:0.7}]
        this.dontBreakStealth = true
    }

    getTooltip() {
        return "Step through the shadows to appear behind your target and gain 70% increased movement speed for 2 sec."
    }

    getBuffTooltip(caster, target, buff) {
        return "Movement speed increased by 70%."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) ) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                    let direction = caster.castTarget.direction
                    caster.x = caster.castTarget.x
                    caster.y = caster.castTarget.y
                    caster.direction = caster.castTarget.direction
                    let speed = -(3*pxToMeter)
                    let angleInRadian = (direction-180) / 180 * Math.PI
                    let vx = Math.sin(angleInRadian) * speed
                    let vy = Math.cos(angleInRadian) * speed
                    caster.x += vx
                    caster.y += vy
                    done = true
                }
            }

            if (done) {
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                applyBuff(caster,caster,this)

                caster.useEnergy(this.cost,this.secCost)
                this.setGcd(caster)
                this.setCd()
                return true
            }
        } else if (caster===player && caster.gcd<spellQueueWindow && caster.gcd>0) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }
}
