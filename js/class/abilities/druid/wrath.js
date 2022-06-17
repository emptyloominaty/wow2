class Wrath extends Ability {
    constructor(balance = false) {
        let name = "Wrath"
        let cost = 1 //% mana

        let gcd = 1.5
        let castTime = 1.5
        let cd = 0
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = true
        let canMove = false
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.5775

        this.effect = ""
        this.effectValue = 0

        if (balance) {
            this.cost = -6
            this.spellPower = 0.6
        }


    }

    getTooltip() {
        return "Hurl a ball of energy at the target, dealing "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+"  Nature damage."
    }

    run(caster) {
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
                let castTime = this.castTime
                this.setGcd(caster)
                if (caster.spec==="balance") {
                    castTime = castTime*caster.abilities["Eclipse"].getCastTime(caster,this)
                    caster.gcd = castTime / (1 + (caster.stats.haste / 100))
                }
                caster.casting = {name:this.name, time:0, time2:castTime/(1 + (caster.stats.haste / 100)),target:caster.castTarget}
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
        caster.isCasting = false
        let target = caster.casting.target
        if (Object.keys(target).length !== 0 && this.isEnemy(caster,target)) {
            if (this.checkDistance(caster,target)  && !target.isDead) {
                let spellPower = this.spellPower
                if (caster.spec==="balance") {
                    caster.abilities["Eclipse"].startCast(caster,this)
                    spellPower = spellPower*caster.abilities["Eclipse"].getDamage(caster,this)
                }
                addSpellVisualEffects(caster.x,caster.y,getDirection(caster,target),"projectile",
                    {size:4,speed:20,target:target,color:"#fffc00",onEnd:{},onRun:{name:"fire",color1:"rgba(255,243,107,0.7)",color2:"rgba(255,255,0,0.7)",life:0.4}})
                doDamage(caster,target,this,undefined,spellPower)
                caster.useEnergy(this.cost,this.secCost)
                this.cd = 0
            }
        }
    }

    runBuff() {
    }

    endBuff() {
    }
}
