class RapidFire extends Ability {
    constructor() {
        let name = "Rapid Fire"
        let cost = -1
        let gcd = 1.5
        let castTime = 2
        let cd = 20
        let charges = 1
        let channeling = true
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.38
        this.trickShots = false
    }

    getTooltip() {
        return "Shoot a stream of 7 shots at your target over 2 sec, dealing a total of "+spellPowerToNumber(this.spellPower*7)+" Physical damage.<br>" +
            "Each shot generates 1 Focus<br>" +
            "<br>" +
            "Usable while moving."
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.checkDistance(caster,caster.castTarget) && this.isEnemy(caster,caster.castTarget)) {
            caster.isChanneling = true
            let timer = 0.284
            if (caster.abilities["Double Tap"].talentSelect && checkBuff(caster,caster,"Double Tap",true)) {
                timer /= 2
            }

            caster.channeling = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100)), timer:0, timer2:timer/(1 + (caster.stats.haste / 100)),target:caster.castTarget}
            caster.canMoveWhileCasting = true
            this.trickShots = false
            if (checkBuff(caster,caster,"Trick Shots",true)) {
                this.trickShots = true
            }
            this.setGcd(caster)
            this.setCd()
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

                if (this.trickShots) {
                    for (let i = 0; i<enemies.length ;i++) {
                        if (!enemies[i].isDead && enemies[i]!==target && this.checkDistance(target, enemies[i],10,true) ) {
                            doDamage(caster, enemies[i], this, undefined, this.spellPower*0.55)
                        }
                    }
                }


                caster.useEnergy(this.cost)
            } else {
                caster.isChanneling = false
            }
        }
    }

    endChanneling(caster) {
        caster.canMoveWhileCasting = false
    }
}
