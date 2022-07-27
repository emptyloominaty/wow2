class LavaLash extends Ability {
    constructor() {
        let name = "Lava Lash"
        let cost = 0.8
        let gcd = 1.5
        let castTime = 0
        let cd = 12
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "fire"
        let range = 5 //melee
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.spellPower = 0.756
        this.hasteCd = true
    }

    getTooltip() {
        return "Charges your off-hand weapon with lava and burns your target, dealing "+spellPowerToNumber(this.spellPower)+" Fire damage.<br>" +
            "<br>" +
            "Damage is increased by 100% if your offhand weapon is imbued with Flametongue Weapon.<br><br>" +
            "Lava Lash will spread Flame Shock from your target to 3 other nearby targets"
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            let target = caster.castTarget
            let spellPower = this.spellPower
            if (checkBuff(caster,caster,"Flametongue Weapon")) {
                spellPower *= 2
            }
            if (caster.abilities["Hot Hand"].talentSelect && checkBuff(caster,caster,"Hot Hand")) {
                spellPower *= 2
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
                if (checkDebuff(caster,target,"Flame Shock")) {
                    let targets = enemies
                    let ttt = 0
                    for (let i = 0; i<targets.length ;i++) {
                        if (!targets[i].isDead && target!==targets[i] && this.checkDistance(target, targets[i],8,true)) {
                            applyDot(caster,targets[i],caster.abilities["Flame Shock"])
                            ttt++
                            if (ttt>=3) {
                                break
                            }
                        }
                    }
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

}
