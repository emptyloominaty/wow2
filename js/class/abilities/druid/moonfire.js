class Moonfire extends Ability {
    constructor(balance = false,guardian = false,feral = false) {
        let name = "Moonfire"
        let cost = 1.2 //% mana
        let gcd = 1.5
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "arcane"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.2
        this.spellPowerDot = 1.392
        this.duration = 16
        this.canCastForm = "Moonkin Form"

        if (balance) {
            this.cost = -2
            this.duration += 6
        } else if (guardian) {
            this.cost = 0
            this.canCastForm = "Bear Form"
        } else if (feral) {
            this.cost = 30
            this.secCost = -1
            this.spellPower = 0.15*1.32
            this.spellPowerDot = 1.2*1.32
            this.canCastForm = "Cat Form"
        }

    }

    getTooltip() {
        return "A quick beam of lunar light burns the enemy for "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+" Arcane damage and then an additional  "+((player.stats.primary * this.spellPowerDot) * (1 + (player.stats.vers / 100)) * (1 + (player.stats.haste / 100))).toFixed(0)+" Arcane damage over 16 sec."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            let target = caster.castTarget
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget)) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                    doDamage(caster,caster.castTarget,this)
                    applyDot(caster,caster.castTarget,this,undefined,undefined,this.spellPowerDot)
                    done = true
                }
            } else {
                let newTarget = findNearestEnemy(caster)
                if (newTarget!==false) {
                    if (caster===player) {
                        document.getElementById("raidFrame"+targetSelect).style.outline = "0px solid #fff"
                    }
                    target = newTarget
                    caster.targetObj = newTarget
                    caster.target = newTarget.name
                    if (this.checkDistance(caster, caster.targetObj) && !caster.targetObj.isDead) {
                        doDamage(caster, caster.targetObj, this)
                        applyDot(caster,caster.targetObj,this,undefined,undefined,this.spellPowerDot)
                        done = true
                    }
                }
            }
            if (done) {
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                if (caster.spec==="balance" && caster.abilities["Twin Moons"].talentSelect) {
                    for (let i = 0; i<enemies.length; i++) {
                        if (!enemies[i].isDead && enemies[i]!==target && this.checkDistance(target, enemies[i],15,true)) {
                            doDamage(caster, enemies[i], this)
                            applyDot(caster,enemies[i],this,undefined,undefined,this.spellPowerDot)
                            break
                        }
                    }
                }
                if (caster.spec==="guardian") {
                    if (getChance(15)) {
                        caster.useEnergy(-4,0)
                        caster.abilities["Mangle"].cd = caster.abilities["Mangle"].maxCd
                    }
                }

                caster.useEnergy(this.cost,this.secCost)
                this.setGcd(caster)
                this.cd = 0
                return true
            }

        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
