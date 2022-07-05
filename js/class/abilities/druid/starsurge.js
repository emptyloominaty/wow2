class Starsurge extends Ability {
    constructor(balance = false) {
        let name = "Starsurge"
        let cost = 30

        let gcd = 1.5
        let castTime = 0
        let cd = 0
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "arcane"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 2.07 * 1.37
        this.canCastForm = "Moonkin Form"

        if (balance) {
            this.spellPower = 2.07
            this.cost = -6
            this.spellPower = 0.6
            this.canUse = false
        }


    }

    getTooltip() {
        return "Launch a surge of stellar energies at the target, dealing"+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+"  Astral damage, and empowering the damage bonus of any active Eclipse for its duration."
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
                caster.casting = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100)),target:caster.castTarget}
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

    endCast(caster) {
        caster.isCasting = false
        let target = caster.casting.target
        if (Object.keys(target).length !== 0 && this.isEnemy(caster,target)) {
            if (this.checkDistance(caster,target)  && !target.isDead) {
                if (caster.spec==="balance") {
                    caster.abilities["Eclipse"].incBuff()
                }
                addSpellVisualEffects(caster.x,caster.y,getDirection(caster,target),"projectile",
                    {size:10,speed:30,target:target,color:"#ace7ff",onEnd:{},onRun:{name:"fire",color1:"rgba(158,253,255,0.7)",color2:"rgba(255,188,243,0.7)",life:0.4}})
                doDamage(caster,target,this)
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
