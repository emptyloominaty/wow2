class AvengersShield extends Ability {
    constructor() {
        let name = "Avenger's Shield"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 15
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "holy"
        let range = 30
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.52416
        this.jumptargets = 2
        this.jumpRange = 15
        this.secCost = -1
    }

    getTooltip() {
        return "Hurls your shield at an enemy target, dealing "+spellPowerToNumber(this.spellPower)+" Holy damage, interrupting and silencing the non-Player target for 3 sec and then jumping to 2 additional nearby enemies.<br>" +
            "<br>" +
            "Generates 1 Holy Power."
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.checkDistance(caster,caster.castTarget)) {

            let done = false
            let target = caster.castTarget
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
                    target = newTarget
                    if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                        done = true
                    }
                }
            }

            if (done) {
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }

                if (this.isEnemy(caster,target) || !target.isDead || target!=="" || Object.keys(target).length !== 0) {
                    doDamage(caster, target, this)
                    target.interrupt()

                    //jump
                    let ttt = 0
                    let lastTarget = target
                    let targets = enemies
                    for (let i = 0; i<targets.length ;i++) {
                        if (!targets[i].isDead && this.checkDistance(lastTarget, targets[i],this.jumpRange,true)) {
                            lastTarget = targets[i]
                            doDamage(caster, targets[i], this)
                            //targets[i].interrupt()
                            ttt++
                            if (ttt>=this.jumptargets) {
                                break
                            }
                        }
                    }
                    this.setCd()
                    caster.useEnergy(this.cost,this.secCost)
                    this.setGcd(caster)
                    return true
                }
            }
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
