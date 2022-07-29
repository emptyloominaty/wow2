class Eviscerate extends Ability {
    constructor() {
        let name = "Eviscerate"
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
        this.spellPower = 0.176*1.21
        this.secCost = "all"
    }

    getTooltip() {
        let spellPower = ((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100)))
        return "Finishing move that disembowels the target, causing damage per combo point. Targets with Find Weakness suffer an additional 50% damage as Shadow. " + //TODO: with Find Weakness suffer an additional 50% damage as Shadow.
            "<br>1 point: "+(spellPower).toFixed(0)+"  damage " +
            "<br>2 points: "+(spellPower*2).toFixed(0)+"  damage " +
            "<br>3 points: "+(spellPower*3).toFixed(0)+"  damage " +
            "<br>4 points: "+(spellPower*4).toFixed(0)+"  damage " +
            "<br>5 points: "+(spellPower*5).toFixed(0)+"  damage "
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            let target = caster.castTarget
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) ) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                    doDamage(caster,caster.castTarget,this,undefined,this.spellPower*caster.secondaryResource)
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
                        doDamage(caster, caster.targetObj, this,undefined,this.spellPower*caster.secondaryResource)
                        done = true
                    }
                }
            }
            if (done) {
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                this.setCd()
                if (checkDebuff(caster,target,"Find Weakness")) {
                    //TODO:SHADOW?
                    doDamage(caster, caster.targetObj, this,undefined,this.spellPower*caster.secondaryResource*0.5)
                }
                caster.useEnergy(this.cost,this.secCost)
                if (caster.abilities["Alacrity"] && caster.abilities["Alacrity"].talentSelect) {
                    caster.abilities["Alacrity"].applyBuff(caster)
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
