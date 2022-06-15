class KegSmash extends Ability {
    constructor() {
        let name = "Keg Smash"
        let cost = 40

        let gcd = 1
        let castTime = 0
        let cd = 8
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 15
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.hasteCd = true

        this.spellPower = 0.85995
        this.cleaveRange = 8
        this.effect = [{name:"moveSpeed",val:0.2}]
        this.duration = 15
    }

    getTooltip() {
        return "Smash a keg of brew on the target, dealing "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+" Physical damage to all enemies within 8 yds and reducing their movement speed by 20% for 15 sec. Grants Shuffle for 5 sec and reduces the remaining cooldown on your Brews by 3 sec."
    }

    run(caster) {
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) ) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                    done = true
                }
            } else {
                let newTarget = findNearestEnemy(caster)
                if (newTarget!==false) {
                    if (caster===player) {
                        document.getElementById("raidFrame"+targetSelect).style.outline = "0px solid #fff"
                    }
                    caster.castTarget = newTarget
                    caster.targetObj = newTarget
                    caster.target = newTarget.name
                    if (this.checkDistance(caster, caster.targetObj) && !caster.targetObj.isDead) {
                        done = true
                    }
                }
            }

            if (done) {
                for (let i = 0; i<enemies.length ;i++) {
                    if (!enemies[i].isDead && this.checkDistance(caster.castTarget, enemies[i],this.cleaveRange)) {
                        doDamage(caster, enemies[i], this,undefined,this.spellPowerCleave)
                    }
                }
                caster.useEnergy(this.cost,this.secCost)
                this.setGcd(caster)
                this.setCd()
                caster.abilities["Celestial Brew"].cd +=3
                caster.abilities["Purifying Brew"].incCd(caster,3,false)
                caster.abilities["Fortifying Brew"].cd +=3
                caster.abilities["Shuffle"].incBuff(caster,this)

                if (caster.isChanneling) {
                    caster.isChanneling = false
                    caster.channeling = {name:"", time:0, time2:0, timer:0, timer2:0}
                }
                return true
            }
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
