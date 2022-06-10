class Envenom extends Ability {
    constructor() {
        let name = "Envenom"
        let cost = 35

        let gcd = 1
        let castTime = 0
        let cd = 0
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "nature"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.16*1.51
        this.duration = 8

        this.spellPowerC = [0.16*1.51, 0.32*1.51, 0.48*1.51, 0.64*1.51, 0.8*1.51, 0.96*1.51]

        this.effect = ""
        this.effectValue = 0

        this.secCost = "all"



    }

    getTooltip() {
        let spellPower = ((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100)) * (1 + (player.stats.haste / 100)))
        return "Finishing move that drives your poisoned blades in deep, dealing instant Nature damage and increasing your poison application chance by 30%. Damage and duration increased per combo point. " +
            "<br>1 point: "+(spellPower).toFixed(0)+"  damage " +
            "<br>2 points: "+(spellPower*2).toFixed(0)+"  damage " +
            "<br>3 points: "+(spellPower*3).toFixed(0)+"  damage " +
            "<br>4 points: "+(spellPower*4).toFixed(0)+"  damage " +
            "<br>5 points: "+(spellPower*5).toFixed(0)+"  damage "
    }

    run(caster) {
    }

    startCast(caster) {
        if (caster.gcd<=0 && this.checkCd(caster) && this.checkCost(caster) && caster.secondaryResource>0 && !caster.isCasting) {
            this.duration = 4 + (4*caster.secondaryResource)
            let done = false
            if (caster.target!=="" && this.isEnemy(caster) ) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                    doDamage(caster,caster.castTarget,this,undefined,this.spellPowerC[caster.secondaryResource])
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
                        doDamage(caster,caster.targetObj,this,undefined,this.spellPowerC[caster.secondaryResource])
                        done = true
                    }
                }
            }
            if (done) {
                for (let i = 0; i<caster.buffs.length; i++) {
                    if (caster.buffs[i].name==="Slice And Dice" && caster.buffs[i].caster === caster) {
                        caster.buffs[i].duration += 3*caster.secondaryResource
                    }
                }

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
