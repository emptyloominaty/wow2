class Rake extends Ability {
    constructor() {
        let name = "Rake"
        let cost = 35
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

        this.spellPower = 0.18225*1.32
        this.spellPowerDot = 0.77805*1.32
        this.duration = 15
        this.effect = [{name:"moveSpeed",val:0.2}]

        this.secCost = -1
        this.bleed = true
        this.needForm = "Cat Form"
    }

    getTooltip() {
        return "Rake the target for (18.225% of Attack power) Bleed damage and an additional (77.805% of Attack power) Bleed damage over 15 sec.<br>" +
            "Reduces the target's movement speed by 20% for 12 sec.<br>" +
            "While stealthed, Rake will also stun the target for 4 sec, and deal 60% increased damage<br>" + //TODO:
            "Awards 1 combo point."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) ) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                    doDamage(caster,caster.castTarget,this)
                    applyDot(caster,caster.castTarget,this,undefined,undefined,this.spellPowerDot)
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
                        doDamage(caster,caster.targetObj,this)
                        applyDot(caster,caster.targetObj,this,undefined,undefined,this.spellPowerDot)
                        done = true
                    }
                }
            }
            if (done) {
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                caster.useEnergy(this.cost,this.secCost)
                this.setGcd(caster)
                this.setCd()
                return true
            }

        } else if (this.canSpellQueue()) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
