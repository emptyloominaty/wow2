class TigerPalm extends Ability {
    constructor(ww = false) {
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
            this.spellPower = 0.27027
            this.cost = 50
            this.secCost = -2 //chi
            this.gcd = 1
            this.hasteGcd = false
            //TODO: Tiger Palm has an 8% chance to make your next Blackout Kick cost no Chi.
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
            if (caster.target!=="" && this.isEnemy(caster) ) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                    doDamage(caster,caster.targetObj,this)
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
