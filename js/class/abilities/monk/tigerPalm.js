class TigerPalm extends Ability {
    constructor(ww = false,bm = false) {
        let name = "Tiger Palm"
        let cost = 0 //% mana

        let gcd = 1.5
        let castTime = 0
        let cd = 0
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 5 //melee
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.27027*1.1 //27.027%   +10% mw aura

        this.effect = ""
        this.effectValue = 0

        //Teachings of the Monastery
        this.maxStacks = 3
        this.duration = 20
        this.buffName = "Teachings of the Monastery"

        if (ww) {
            this.spellPower = 0.27027*1.55
            this.cost = 50
            this.secCost = -2 //chi
            this.gcd = 1
            this.hasteGcd = false
            this.chanceReset = 8
        }
        if (bm) {
            this.cost = 25
            this.gcd = 1
            this.hasteGcd = false
        }
    }

    getTooltip() {
        return "Strike with the palm of your hand, dealing "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+" Physical damage"
    }

    run(caster) {
    }

    startCast(caster) {
        if (caster.gcd<=0 && this.checkCost(caster) && !caster.isCasting) {
            let done = false
            if (caster.target!=="" && this.isEnemy(caster,caster.castTarget) ) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                    doDamage(caster,caster.castTarget,this)
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
                    if (this.checkDistance(caster, caster.targetObj) && !caster.targetObj.isDead) {
                        doDamage(caster, caster.targetObj, this)
                        done = true
                    }
                }
            }
            if (done) {
                if (caster.spec === "mistweaver") {
                    applyBuff(caster,caster,this,1,true, this.buffName)
                } else if (caster.spec === "windwalker") {
                    if (getChance(this.chanceReset)) {
                        this.duration = 20
                        applyBuff(caster, caster, this, 1, false, "Blackout Kick")
                    }
                } else if (caster.spec === "brewmaster") {
                    caster.abilities["Celestial Brew"].cd +=1
                    caster.abilities["Purifying Brew"].incCd(caster,1,false)
                    caster.abilities["Fortifying Brew"].cd +=1
                }
                if (caster.isChanneling) {
                    caster.isChanneling = false
                    caster.channeling = {name:"", time:0, time2:0, timer:0, timer2:0}
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
