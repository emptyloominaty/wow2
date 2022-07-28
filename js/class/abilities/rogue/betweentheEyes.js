class BetweentheEyes extends Ability {
    constructor() {
        let name = "Between the Eyes"
        let cost = 25
        let gcd = 1
        let castTime = 0
        let cd = 45
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 20
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.spellPower = 0.217199*1.17
        this.secCost = "all"
    }

    getTooltip() {
        let spellPower = ((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100)))
        return "Finishing move that deals damage with your pistol, increasing your critical strike chance against the target by 20%." +
            "Critical strikes with this ability deal four times normal damage " +
            "<br>1 point: "+(spellPower).toFixed(0)+"  damage, 3 sec " +
            "<br>2 points: "+(spellPower*2).toFixed(0)+"  damage, 6 sec " +
            "<br>3 points: "+(spellPower*3).toFixed(0)+"  damage, 9 sec " +
            "<br>4 points: "+(spellPower*4).toFixed(0)+"  damage, 12 sec " +
            "<br>5 points: "+(spellPower*5).toFixed(0)+"  damage, 15 sec "
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            this.duration = (3*caster.secondaryResource)
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
                applyDebuff(caster,target,this)
                this.setCd()

                let sec = caster.secondaryResource
                caster.useEnergy(this.cost,this.secCost)
                if (getChance(20*sec)) {
                    caster.useEnergy(0,-1)
                }
                caster.abilities["Restless Blades"].reduceCd2(caster,sec)
                this.setGcd(caster)
                return true
            }
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
