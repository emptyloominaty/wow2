class CracklingJadeLightning extends Ability {
    constructor(ww = false) {
        let name = "Crackling Jade Lightning"
        let cost = 0 //% mana every sec
        let gcd = 1
        let castTime = 1
        let cd = 0
        let charges = 1
        let maxCharges = 1
        let channeling = true
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.896
        this.duration = 4

        if (ww) {
            this.cost = 20
            this.spellPower = 0.224
            this.gcd = 1
            this.hasteGcd = false
        }

    }

    getTooltip() {
        return "Channel Jade lightning, causing "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+" Nature damage over 4 sec to the target and sometimes knocking back melee attackers."
    }

    run(caster) {
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.checkDistance(caster,caster.castTarget) && this.isEnemy(caster,caster.castTarget)) {
            caster.isChanneling = true
            caster.channeling = {name:this.name, time:0, time2:this.duration/(1 + (caster.stats.haste / 100)), timer:1/(1 + (caster.stats.haste / 100)), timer2:1/(1 + (caster.stats.haste / 100)),target:caster.castTarget}

            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    cast(caster) {
        let target = caster.channeling.target
        if (Object.keys(target).length !== 0 && this.isEnemy(caster,target)) {
            if (this.checkDistance(caster,target)  && !target.isDead) {
                doDamage(caster, target, this)
                let masteryRng = Math.floor(Math.random() * 7)
                if (masteryRng === 0) {
                    caster.abilities["Gust of Mists"].heal(caster)
                }

                caster.useEnergy(this.cost)
            }
        }
    }
}
