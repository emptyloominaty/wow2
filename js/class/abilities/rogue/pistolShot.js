class PistolShot extends Ability {
    constructor() {
        let name = "Pistol Shot"
        let cost = 40
        let gcd = 1
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 20
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.spellPower = 0.421621*1.17
        this.secCost = -1
        this.duration = 6
        this.effect = [{name:"moveSpeed",val:0.3}]
    }

    getTooltip() {
        return "Draw a concealed pistol and fire a quick shot at an enemy, dealing "+spellPowerToNumber(this.spellPower)+" Physical damage and reducing movement speed by 30% for 6 sec.<br>" +
            "<br>" +
            "Awards 1 combo point."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            let target = caster.castTarget
            let cost = this.cost
            let spellPower = this.spellPower
            if (checkBuff(caster,caster,"Sinister Strike",true)) {
                spellPower *= 2
                cost /= 2
            }

            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) ) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                    doDamage(caster,caster.castTarget,this,undefined,spellPower)
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
                        doDamage(caster, caster.targetObj, this,undefined,spellPower)
                        done = true
                    }
                }
            }
            if (done) {
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                applyDebuff(caster,target,this)
                this.setCd()
                caster.useEnergy(cost,this.secCost)
                this.setGcd(caster)
                return true
            }
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
