class HowlingBlast extends Ability {
    constructor() {
        let name = "Howling Blast"
        let cost = -10
        let gcd = 1.5
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "frost"
        let range = 30
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.1437*1.05

        this.secCost = 1

        this.damageLast5Sec = [0,0,0,0,0]
        this.timer1 = 0
        this.timer2 = 1
        this.idx = 0
    }

    getTooltip() {
        return "Blast the target with a frigid wind, dealing [(14.37% of Attack power) * [(Attack power * 0.98)][((Attack power + Offhand attack power) * 2 / 3)] -- 2H, DW / Attack power]<br><br>" +
            "Frost damage to that foe, and reduced damage to all other enemies within 10 yards, infecting all targets with Frost Fever."
    }

    run(caster) {
        if (this.timer1<this.timer2) {
            this.timer1 += progressInSec
        } else {
            this.timer1 = 0
            this.damageLast5Sec.shift()
            this.damageLast5Sec.push(0)
            this.idx++
            if (this.idx===5) {
                this.idx = 0
            }
        }
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
                let spellPower = this.spellPower
                let secCost = this.secCost
                let avalanche = false
                if (checkBuff(caster,caster,"Rime",true)) {
                    spellPower *= 2.5
                    secCost = 0
                    if (caster.abilities["Avalanche"].talentSelect) {
                        avalanche = true
                    }
                }


                doDamage(caster, caster.castTarget, this,undefined,spellPower)
                if (avalanche) {
                    doDamage(caster,caster.castTarget,caster.abilities["Avalanche"])
                }
                applyDot(caster,caster.castTarget,caster.abilities["Frost Fever"])
                caster.abilities["Frost Fever"].caster = caster
                for (let i = 0; i<enemies.length; i++) {
                    if (!enemies[i].isDead && enemies[i]!==caster.castTarget &&this.checkDistance(caster.castTarget,enemies[i],10,true)) {
                        doDamage(caster, enemies[i], this,undefined,spellPower/2)
                        if (avalanche) {
                            doDamage(caster,enemies[i],caster.abilities["Avalanche"])
                        }
                        applyDot(caster,enemies[i],caster.abilities["Frost Fever"])
                    }
                }

                caster.useEnergy(this.cost,secCost)
                this.setCd()
                this.setGcd(caster)
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }

                return true
            }

        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
//----------------------------------------
class FrostFever extends Ability {
    constructor() {
        let name = "Frost Fever"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "frost"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.passive = true
        this.spellPower = 1.712
        this.duration = 24

        this.timer1 = 0
        this.timer2 = 1
        this.caster = {}

    }

    getTooltip() {
        return "A disease that deals "+spellPowerHotToNumber(this.spellPower)+" Frost damage over 24 sec and has a chance to grant the Death Knight 5 Runic Power each time it deals damage."
    }

    runBuff(target, buff, id = 0) {
        if (this.timer1<this.timer2) {
            this.timer1 += progressInSec
        } else {
            this.timer1 = 0
            if (getChance(10)) {
                this.caster.useEnergy(-5,0)
            }
        }
    }

}
