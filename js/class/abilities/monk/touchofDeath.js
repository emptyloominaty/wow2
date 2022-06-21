class TouchofDeath extends Ability {
    constructor(ww = false,bm = false) {
        let name = "Touch of Death"
        let cost = 0 //% mana

        let gcd = 1.5
        let castTime = 0
        let cd = 180
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 5 //melee
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.duration = 10
        this.effect = [{name:"increaseDamage",val:0.15}]

        if (ww) {
            this.gcd = 1
            this.hasteGcd = false
        }
        if (bm) {
            this.gcd = 1
            this.hasteGcd = false
        }
    }

    getTooltip() {
        return "You exploit the enemy target's weakest point, instantly killing them if they have less health than you. Deals damage equal to 35% of your maximum health against players and stronger creatures under 15% health"
    }

    run(caster) {
    }

    checkHealth(caster,target) {
        if (target.health/target.maxHealth<0.15) {
            return caster.maxHealth * 0.35
        } else if (target.health<caster.maxHealth) {
            return caster.maxHealth
        }
        return 0
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let damageDone = 0
            let done = false
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) ) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                    damageDone = this.checkHealth(caster,caster.castTarget)
                    doDamage(caster,caster.castTarget,this,undefined,undefined,undefined,undefined,undefined,undefined,damageDone)
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
                        damageDone = this.checkHealth(caster,caster.targetObj)
                        doDamage(caster,caster.targetObj,this,undefined,undefined,undefined,undefined,undefined,undefined,damageDone)
                        done = true
                    }
                }
            }
            if (done) {
                if (caster.spec === "mistweaver") {
                    applyBuff(caster,caster,this)
                } else if (caster.spec === "windwalker") {
                   caster.useEnergy(0,-3)
                } else if (caster.spec === "brewmaster") {
                    for (let i = 0; i<caster.debuffs.length; i++) {
                        if (caster.debuffs[i].type==="stagger") {
                            caster.debuffs[i].effect[0].val = caster.debuffs[i].effect[0].val - (damageDone*2)
                            break
                        }
                    }
                }
                if (caster.isChanneling) {
                    caster.isChanneling = false
                    caster.channeling = {name:"", time:0, time2:0, timer:0, timer2:0}
                }
                this.setCd()
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

}
