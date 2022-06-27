class BlackoutKick extends Ability {
    constructor(ww = false,bm = false) {
        let name = "Blackout Kick"
        let cost = 0 //% mana
        let gcd = 1.5
        let castTime = 0
        let cd = 3
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 5 //melee
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.847

        this.effect = ""
        this.effectValue = 0

        this.hasteCd = true

        if (ww) {
            this.secCost = 1 //chi
            this.spellPower = (0.565 *2)*0.93
            this.cd = 0
            this.gcd = 1
            this.hasteGcd = false
        }
        if (bm) {
            this.gcd = 1
            this.hasteGcd = false
        }
    }

    getTooltip() {
        return "Kick with a blast of Chi energy, dealing "+spellPowerToNumber(this.spellPower)+" Physical damage"
    }

    run(caster) {
    }

    risingSunKickReset(caster,target) {
        if (caster.spec === "mistweaver") {
            for (let i = 0; i < caster.buffs.length; i++) {
                if (caster.buffs[i].name === "Teachings of the Monastery" && caster.buffs[i].caster === caster) {
                    for (let j = 0; j < caster.buffs[i].stacks; j++) {
                        doDamage(caster, target, this)
                    }
                    let stacks = caster.buffs[i].stacks

                    //Spirit of the Crane
                    caster.abilities["Spirit of the Crane"].restoreMana(caster,stacks)

                    //chiji
                    for (let i = 0; i<caster.pets.length; i++) {
                        if (caster.pets[i]!==undefined) {
                            if (caster.pets[i].name==="Chi-Ji") {
                                for (let k = 0; k<stacks+1; k++) {
                                    caster.abilities["Gust of Mists (Chi-Ji)"].heal(caster)
                                }
                            }
                        }
                    }

                    //Rising Sun Kick Reset
                    let resetChance = (Math.random()) * 100
                    if (resetChance < 15 + (stacks * 15)) {
                        caster.abilities["Rising Sun Kick"].cd = caster.abilities["Rising Sun Kick"].maxCd
                    }
                    caster.buffs.splice(i, 1)
                    break
                }
            }
        } else if (caster.spec === "windwalker") {
            for (let i = 0; i<caster.buffs.length; i++) {
                if (caster.buffs[i].name==="Blackout Kick") {
                    caster.secondaryResource++
                    caster.buffs.splice(i, 1)
                }
            }
            caster.abilities["Rising Sun Kick"].cd += 1
            caster.abilities["Fists of Fury"].cd += 1
        } else if (caster.spec==="brewmaster") {
            caster.abilities["Shuffle"].incBuff(caster,this)
            caster.abilities["Elusive Brawler"].hit(caster)
        }
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) ) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                    doDamage(caster, caster.castTarget, this)
                    this.risingSunKickReset(caster,caster.castTarget)
                    done = true
                }
            } else {
                let newTarget = findNearestEnemy(caster)
                if (newTarget!==false) {
                    if (caster===player) {
                        document.getElementById("raidFrame"+targetSelect).style.outline = "0px solid #fff"
                    }
                    caster.targetObj = newTarget
                    caster.target = newTarget.name
                    if (this.checkDistance(caster,caster.targetObj) && !caster.targetObj.isDead) {
                        doDamage(caster, caster.targetObj, this)
                        this.risingSunKickReset(caster,caster.targetObj)
                        done = true
                    }
                }
            }
            if (done) {
                this.cd = 0
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                caster.useEnergy(this.cost,this.secCost)
                this.setGcd(caster)
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
