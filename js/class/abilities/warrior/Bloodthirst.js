class Bloodthirst extends Ability {
    constructor() {
        let name = "Bloodthirst"
        let cost = -8

        let gcd = 1.5
        let castTime = 0
        let cd = 4.5
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 5 //melee
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = ((0.65)*1.29)*1.3

        this.heal = 0.03

        this.hasteCd = true

    }

    getTooltip() {
        return "Assault the target in a bloodthirsty craze, dealing "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+" Physical damage and restoring 3% of your health."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) ) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                    doDamage(caster,caster.castTarget,this)
                    caster.abilities["WhirlwindBuff"].startCast(caster,caster.castTarget,this)
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
                        caster.abilities["WhirlwindBuff"].startCast(caster,caster.targetObj,this)
                        done = true
                    }
                }
            }
            if (done) {
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                let heal = this.heal

                if (checkBuff(caster,caster,"Enraged Regeneration")) {
                    heal += 0.2
                }

                if (checkBuff(caster,caster,"Furious Charge")) {
                    heal *= 3.5
                }

                doHeal(caster,caster,this,undefined,undefined,undefined,undefined,undefined,caster.maxHealth*heal)
                this.setCd()
                caster.useEnergy(this.cost,this.secCost)
                this.setGcd(caster)

                if (caster.abilities["Fresh Meat"].talentSelect) { //TODO: CBA   first time you strike a target, and it has a 15% increased chance to trigger Enrage.
                    caster.abilities["Enrage"].startCast(caster)
                } else {
                    if (getChance(30)) {
                        caster.abilities["Enrage"].startCast(caster)
                    }
                }

                return true
            }
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
