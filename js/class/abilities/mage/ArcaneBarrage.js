class ArcaneBarrage extends Ability {
    constructor() {
        let name = "Arcane Barrage"
        let cost = -2 //% mana

        let gcd = 1.5
        let castTime = 0
        let cd = 3
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = true
        let canMove = false
        let school = "arcane"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.728
        this.secCost = "all" //TODO



        this.effect = ""
        this.effectValue = 0



    }

    getTooltip() {
        return "Launches bolts of arcane energy at the enemy target, causing "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+" Arcane damage. For each Arcane Charge, deals 30% additional damage"
    }

    run(caster) {
    }

    startCast(caster) {
        let cost = this.cost * (1 + (caster.secondaryResource))
        if (caster.gcd<=0 && this.checkCd(caster) && this.checkCost(caster,cost) && !caster.isCasting) {
            let done = false
            if (caster.target!=="" && this.isEnemy(caster) && this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
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
                caster.casting = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100))}
                if (caster.isChanneling) {
                    caster.isChanneling = false
                    caster.channeling = {name:"", time:0, time2:0, timer:0, timer2:0}
                }
                this.setGcd(caster)
            }
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endCast(caster) {
        if (caster.target!=="" && this.isEnemy(caster)) {
            if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                let spellPower = this.spellPower * (1 + (caster.secondaryResource*0.3))
                doDamage(caster,caster.targetObj,this,undefined,spellPower)
                //TODO ADDITIONAL TARGETS  (1 per charge 40%)
                let cost = this.cost * caster.secondaryResource
                caster.useEnergy(cost,this.secCost)
                this.cd = 0
            }
        }
    }

    runBuff() {
    }

    endBuff() {
    }
}
