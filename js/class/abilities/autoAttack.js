class AutoAttack extends Ability {
    constructor() {
        let name = "Auto Attack"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 2.6
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.spellPower = 0.23
        this.hasteCd = true

    }

    startCast(caster) {
        if (this.checkCd(caster,true)) {
            this.spellPower = caster.autoattackDamage
            let done = false
            if (Object.keys(caster.targetObj).length !== 0 && this.isEnemy(caster,caster.targetObj) && !caster.targetObj.isDead ) {
                if (this.checkDistance(caster,caster.targetObj,undefined,true)) {
                    if (caster.spec==="assassination") {
                        checkAndApplyRoguePoison(caster,caster.targetObj)
                    }
                    doDamage(caster, caster.targetObj, this)
                    done = true
                }
            }
            if (done) {
                this.setCd()
                this.maxCd = (caster.autoattackSpeed/caster.attackSpeed) / (1 + (caster.stats.haste / 100))
                if (caster.class==="Warrior") {
                    caster.useEnergy(-3,0)
                    if (caster.spec==="fury" && caster.abilities["War Machine"].talentSelect) {
                        caster.useEnergy(-0.6,0)
                    }
                } else if (caster.spec==="havoc") {
                    if (caster.abilities["Demon Blades"].talentSelect) {
                        caster.abilities["Demon Blades"].doDamage(caster,caster.targetObj)
                    }
                } else if (caster.spec==="blood") {
                    if (checkDebuff(caster,caster.targetObj,"Blood Plague")) {
                        if (getChance(25)) {
                            applyBuff(caster,caster,caster.abilities["Crimson Scourge"])
                            caster.abilities["Death and Decay"].cd = caster.abilities["Death and Decay"].maxCd
                        }
                    }
                } else if (caster.spec==="retribution") {
                    if (getChance(8)) {
                        caster.abilities["Blade of Justice"].cd = caster.abilities["Blade of Justice"].maxCd
                    }
                }
            }

        }
    }

    endCast(caster) {
    }
}
