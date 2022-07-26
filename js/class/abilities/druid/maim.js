class Maim extends Ability {
    constructor() {
        let name = "Maim"
        let cost = 30
        let gcd = 1
        let castTime = 0
        let cd = 20
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.092
        this.duration = 1
        this.secCost = "all"
        this.effect = [{name:"stun"}]
        this.needForm = "Cat Form"
    }

    getTooltip() {
        return "Finishing move that causes "+spellPowerToNumber(this.spellPower)+" Physical damage and stuns the target. Damage and duration increased per combo point: " +
            "<br> 1 point: 1 second" +
            "<br> 2 points: 2 seconds" +
            "<br> 3 points: 3 seconds" +
            "<br> 4 points: 4 seconds" +
            "<br> 5 points: 5 seconds"
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            this.duration = caster.secondaryResource
            let done = false
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) ) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                    doDamage(caster,caster.castTarget,this,undefined,this.spellPower*caster.secondaryResource)
                    applyDebuff(caster,caster.castTarget,this)
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
                        doDamage(caster,caster.targetObj,this,undefined,this.spellPower*caster.secondaryResource)
                        applyDebuff(caster,caster.targetObj,this)
                        done = true
                    }
                }
            }
            if (done) {
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                if (caster.spec==="feral" && caster.abilities["Soul of the Forest"].talentSelect) {
                    caster.useEnergy(-caster.secondaryResource*5)
                }
                caster.useEnergy(this.cost,this.secCost)
                this.setGcd(caster)
                this.setCd()
                return true
            }

        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }
}
