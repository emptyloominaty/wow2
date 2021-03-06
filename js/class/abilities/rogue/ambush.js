class Ambush extends Ability {
    constructor() {
        let name = "Ambush"
        let cost = 50
        let gcd = 1
        let castTime = 0
        let cd = 0
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 5 //melee
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.95472*1.51
        this.secCost = -2
        this.requiresStealth = true
        this.canUseWithoutStealth = false

    }

    getTooltip() {
        return "Attack with both weapons, dealing a total of  "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+" Physical damage."
    }

    startCast(caster) {
        this.cost = 50
        let a = false
        let id = 0
        for (let i = 0; i<caster.buffs.length;i++) {
            if (caster.buffs[i].name==="Blindside" || caster.buffs[i].name==="Subterfuge") {
                a = true
                id = i
                if (caster.buffs[i].name==="Blindside") {
                    this.cost = 0
                }
                break
            }
        }
        if (this.checkStart(caster) && (caster.isStealthed || a)) {
            let done = false
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) ) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                    doDamage(caster,caster.castTarget,this)
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
                        doDamage(caster, caster.targetObj, this)
                        done = true
                    }
                }
            }
            if (done) {
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                if (a) {
                    caster.buffs[id].duration = -1
                    this.canUseWithoutStealth = false
                }
                caster.useEnergy(this.cost,this.secCost)
                this.setGcd(caster)
                return true
            }
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
