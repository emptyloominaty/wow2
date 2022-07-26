class Shred extends Ability {
    constructor() {
        let name = "Shred"
        let cost = 40
        let gcd = 1
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.46*1.32
        this.needForm = "Cat Form"
        this.secCost = -1

    }

    getTooltip() { //TODO:While stealthed, Shred deals 60% increased damage, has double the chance to critically strike, and generates 1 additional combo point
        return "Shred the target, causing "+spellPowerToNumber(this.spellPower)+" Physical damage. Deals 20% increased damage against bleeding targets <br><br>" +
            "Awards 1 combo point."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            let target = caster.castTarget
            let spellPower = this.spellPower
            if (caster.spec==="feral" && checkBuff(caster,caster,"Berserk")) {
                spellPower *= 1.6
            }
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) ) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
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
                    target = caster.targetObj
                    if (this.checkDistance(caster, caster.targetObj) && !caster.targetObj.isDead) {
                        done = true
                    }
                }
            }
            if (done) {

                for (let i = 0; i<target.buffs; i++) {
                    if (target.buffs[i].ability.bleed) {
                        spellPower *= 1.2
                        break
                    }
                }
                doDamage(caster, target, this,undefined,spellPower)

                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                this.setCd()
                if (caster.spec==="feral" && checkBuff(caster,caster,"Omen of Clarity",true)) {
                    caster.useEnergy(0,this.secCost)
                } else {
                    caster.useEnergy(this.cost,this.secCost)
                }
                this.setGcd(caster)
                return true
            }
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
