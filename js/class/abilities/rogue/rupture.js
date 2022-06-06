class Rupture extends Ability {
    constructor() {
        let name = "Rupture"
        let cost = 25

        let gcd = 1
        let castTime = 0
        let cd = 0
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.2505
        this.duration = 8

        this.spellPowerC = [0.501, 0.752, 1.002, 1.253, 1.504, 1.754]

        this.effect = ""
        this.effectValue = 0
        this.bleed = true

        this.secCost = "all"



    }

    getTooltip() {
        let spellPower = ((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100)) * (1 + (player.stats.haste / 100)))
        return "Finishing move that tears open the target, dealing Bleed damage over time. Lasts longer per combo point. " +
            "<br>1 point: "+(spellPower*2).toFixed(0)+" over 8 sec " +
            "<br>2 points: "+(spellPower*3).toFixed(0)+" over 12 sec " +
            "<br>3 points: "+(spellPower*4).toFixed(0)+" over 16 sec " +
            "<br>4 points: "+(spellPower*5).toFixed(0)+" over 20 sec " +
            "<br>5 points: "+(spellPower*6).toFixed(0)+" over 24 sec "
    }

    run(caster) {
    }

    startCast(caster) {
        if (caster.gcd<=0 && this.checkCd(caster) && this.checkCost(caster) && caster.secondaryResource>0 && !caster.isCasting) {
            this.duration = 4 + (4*caster.secondaryResource)
            let done = false
            if (caster.target!=="" && this.isEnemy(caster) ) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                    applyDot(caster,caster.castTarget,this,undefined,undefined,this.spellPowerC[caster.secondaryResource])
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
                        applyDot(caster,caster.targetObj,this,undefined,undefined,this.spellPowerC[caster.secondaryResource])
                        done = true
                    }
                }
            }
            if (done) {
                if (caster.isChanneling) {
                    caster.isChanneling = false
                    caster.channeling = {name:"", time:0, time2:0, timer:0, timer2:0}
                }
                caster.useEnergy(this.cost,this.secCost)
                this.setGcd(caster)
                this.cd = 0
                return true
            }

        } else if (caster===player && caster.gcd<spellQueueWindow && caster.gcd>0) {
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
