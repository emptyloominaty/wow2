class BlackoutKick extends Ability {
    constructor(ww = false) {
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
            this.spellPower = 0.565 *2
            this.cd = 0
            this.gcd = 1
            this.hasteGcd = false
            //TODO:Reduces the cooldown of Rising Sun Kick and Fists of Fury by 1.0 sec when used.
        }
    }

    getTooltip() {
        return "Kick with a blast of Chi energy, dealing "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+" Physical damage"
    }

    run(caster) {

    }


    risingSunKickReset(caster,_y) {
        if (caster.spec === "mistweaver") {
            for (let i = 0; i < caster.buffs.length; i++) {
                if (caster.buffs[i].name === "Teachings of the Monastery" && caster.buffs[i].caster === caster) {
                    for (let j = 0; j < caster.buffs[i].stacks; j++) {
                        _y += 15
                        doDamage(caster, caster.targetObj, this, _y)
                    }
                    //Rising Sun Kick Reset
                    let stacks = caster.buffs[i].stacks
                    let resetChance = (Math.random()) * 100
                    if (resetChance < 15 + (stacks * 15)) {
                        caster.abilities["Rising Sun Kick"].cd = caster.abilities["Rising Sun Kick"].maxCd
                    }

                    caster.buffs.splice(i, 1)
                    break
                }
            }
        }
    }

    startCast(caster) {
        if (caster.gcd<=0 && this.checkCost(caster) && !caster.isCasting &&  this.checkCd(caster)) {
            let done = false
            let _y = 0
            if (caster.target!=="" && this.isEnemy(caster) ) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.targetObj.isDead) {
                    doDamage(caster, caster.targetObj, this)
                    if (caster.spec === "mistweaver") {
                        this.risingSunKickReset(caster,_y)
                    }

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
                        if (caster.spec === "mistweaver") {
                            this.risingSunKickReset(caster, _y)
                        }
                        done = true
                    }
                }
            }
            if (done) {
                this.cd = 0
                if (caster.isChanneling) {
                    caster.isChanneling = false
                    caster.channeling = {name:"", time:0, time2:0, timer:0, timer2:0}
                }
                caster.useEnergy(this.cost,this.secCost)
                this.setGcd(caster)
            }

        } else if (caster===player && caster.gcd<spellQueueWindow && caster.gcd>0) {
            spellQueue.add(this,caster.gcd)
        }
    }

    endCast(caster) {
    }

    runBuff() {
    }

    endBuff() {
    }
}
