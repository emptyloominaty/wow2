class Whirlwind extends Ability {
    constructor() {
        let name = "Whirlwind"
        let cost = -3

        let gcd = 1.5
        let castTime = 0
        let cd = 0
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 8
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = (0.083+0.089+(2*0.083)+0.089)
        //TODO Causes your next 2 single-target melee attacks to strike up to 4 additional targets for 45% damage

        this.hasteCd = true

        this.duration = 20
        this.stacks = 2
        this.maxStacks = 2
        this.targets = 4
        this.cleaveDamage = 0.45



        this.effect = ""
        this.effectValue = 0

    }

    getTooltip() {
        return "Unleashes a whirlwind of steel, striking all nearby enemies for "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+" Physical damage. Causes your next 2 single-target melee attacks to strike up to 4 additional targets for 45% damage."
    }

    run(caster) {
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let enemiesHit = 0
            for (let i = 0; i<enemies.length ;i++) {
                if (!enemies[i].isDead && this.checkDistance(caster, enemies[i]) ) {
                    doDamage(caster, enemies[i], this)
                    enemiesHit++
                }
            }
            if (caster.isChanneling) {
                caster.isChanneling = false
                caster.channeling = {name:"", time:0, time2:0, timer:0, timer2:0}
            }
            this.setCd()

            let cost = -3 - (enemiesHit)

            if (cost<-8) {
                cost = -8
            }

            caster.useEnergy(cost,this.secCost)
            this.setGcd(caster)
            applyBuff(caster,caster,this,this.stacks,true)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endCast(caster) {
    }

    runBuff() {
    }

    endBuff() {
    }
}
