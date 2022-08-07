class AimedShot extends Ability {
    constructor() {
        let name = "Aimed Shot"
        let cost = 35
        let gcd = 1.5
        let castTime = 2.5
        let cd = 12
        let charges = 2
        let channeling = false
        let casting = true
        let canMove = false
        let school = "physical"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.hasteCd = true
        this.spellPower = 2.73
    }

    getTooltip() {
        return "A powerful aimed shot that deals "+spellPowerToNumber(this.spellPower)+" Physical damage."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) && this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                done = true
            } else {
                let newTarget = findNearestEnemy(caster)
                if (newTarget!==false) {
                    if (caster === player) {
                        document.getElementById("raidFrame" + targetSelect).style.outline = "0px solid #fff"
                    }
                    caster.targetObj = newTarget
                    caster.castTarget = newTarget
                    caster.target = newTarget.name
                    if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                        done = true
                    }
                }
            }
            if (done) {

                caster.isCasting = true
                caster.casting = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100)),target:caster.castTarget}
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                this.setGcd(caster)
                return true
            }

        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endCast(caster) {
        caster.isCasting = false
        let target = caster.casting.target
        if (Object.keys(target).length !== 0 && this.isEnemy(caster,target)) {
            if (this.checkDistance(caster,target)  && !target.isDead) {
                let spellPower = this.spellPower
                if (caster.abilities["Careful Aim"].talentSelect && target.health/target.maxHealth>0.7) {
                    spellPower *= 1.5
                }
                doDamage(caster, target, this,undefined, spellPower)
                if (caster.abilities["Double Tap"].talentSelect && checkBuff(caster,caster,"Double Tap",true)) {
                    doDamage(caster, target, this,undefined, spellPower)
                }
                caster.useEnergy(this.cost,this.secCost)
                this.setCd()
                applyBuff(caster,caster,caster.abilities["Precise Shots"],Math.ceil(Math.random()*2),true)

                if (checkBuff(caster,caster,"Trick Shots",true)) {
                    for (let i = 0; i<enemies.length ;i++) {
                        if (!enemies[i].isDead && enemies[i]!==target && this.checkDistance(target, enemies[i],10,true) ) {
                            doDamage(caster, enemies[i], this, undefined, this.spellPower*0.55)
                        }
                    }
                }

            }
        }
    }

}
