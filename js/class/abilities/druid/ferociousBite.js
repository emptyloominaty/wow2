class FerociousBite extends Ability {
    constructor() {
        let name = "Ferocious Bite"
        let cost = 25
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

        this.spellPower = 0.9828*1.32

        this.secCost = "all"
        this.needForm = "Cat Form"

    }

    getTooltip() {
        let spellPower = ((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100)))
        return "Finishing move that causes Physical damage per combo point and consumes up to 25 additional Energy to increase damage by up to 100%. " +
            "<br>1 point: "+(spellPower).toFixed(0)+"  damage " +
            "<br>2 points: "+(spellPower*2).toFixed(0)+"  damage " +
            "<br>3 points: "+(spellPower*3).toFixed(0)+"  damage " +
            "<br>4 points: "+(spellPower*4).toFixed(0)+"  damage " +
            "<br>5 points: "+(spellPower*5).toFixed(0)+"  damage "
    }

    run(caster) {
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let target = caster.castTarget
            let done = false
            let spellPower = this.spellPower
            let cost = this.cost
            if (caster.energy>this.cost) {
                let val = caster.energy-this.cost
                if (val>this.cost) {
                    val = this.cost
                }
                cost += val
                spellPower *= 1+(val/this.cost)
            }

            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) ) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                    doDamage(caster,caster.castTarget,this,undefined,spellPower*caster.secondaryResource)
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
                        doDamage(caster,caster.targetObj,this,undefined,spellPower*caster.secondaryResource)
                        done = true
                    }
                }
            }
            if (done) {
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                if (caster.spec==="feral") {
                    if (caster.abilities["Sabertooth"].talentSelect) {
                        for (let i = 0; i < target.debuffs.length; i++) {
                            if (target.debuffs[i].name === "Rip" && target.debuffs[i].caster === caster) {
                                target.debuffs[i].duration += caster.secondaryResource
                                break
                            }
                        }
                    }
                    if (caster.abilities["Soul of the Forest"].talentSelect) {
                        caster.useEnergy(-caster.secondaryResource*5)
                    }
                }

                caster.useEnergy(cost,this.secCost)
                this.setGcd(caster)
                this.setCd()
                return true
            }

        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endCast(caster) {
    }
}
