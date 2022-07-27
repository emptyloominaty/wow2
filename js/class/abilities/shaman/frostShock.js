class FrostShock extends Ability {
    constructor(ele = false, resto = false, enh = false) {
        let name = "Frost Shock"
        let cost = 0.2

        let gcd = 1.5
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "frost"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.63
        this.effect = [{name:"moveSpeed",val:0.5}]
        this.duration = 6

        if (ele) {
            this.spellPower *= 1.05
            this.cost = 0
        }
        if (resto) {
            this.spellPower *= 1.15
        }
        if (enh) {
            this.spellPower *= 1.03
            this.cd = 6
            this.maxCd = 6
        }

    }

    getTooltip() {
        return "Chills the target with frost, causing  "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+" Frost damage and reducing the target's movement speed by 50% for 6 sec."
    }

    run(caster) {
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false

            let spellPower = this.spellPower
            if (caster.spec==="elemental" && caster.abilities["Master of the Elements"].talentSelect) {
                for (let i = 0; i<caster.buffs.length; i++) {
                    if (caster.buffs[i].name==="Master of the Elements") {
                        spellPower *= 1.2
                        caster.buffs[i].duration = -1
                    }
                }
            }

            if (caster.spec==="elemental" && caster.abilities["Icefury"].talentSelect) {
                for (let i = 0; i<caster.buffs.length; i++) {
                    if (caster.buffs[i].name==="Icefury") {
                        caster.useEnergy(-8)
                        spellPower *= 2.25
                        if (caster.buffs[i].stacks>1) {
                            caster.buffs[i].stacks -= 1
                        } else {
                            caster.buffs[i].duration = -1
                        }
                    }
                }
            }


            let target = caster.castTarget
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
                    target = caster.targetObj
                    caster.targetObj = newTarget
                    caster.target = newTarget.name
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
                if (caster.spec==="elemental") {
                    caster.abilities["Surge of Power"].enhance(caster,target,this)
                }
                caster.useEnergy(this.cost,this.secCost)
                this.setGcd(caster)
                this.setCd()
                return true
            }

        } else if (caster===player && caster.gcd<spellQueueWindow && caster.gcd>0) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endCast(caster) {
    }
}
