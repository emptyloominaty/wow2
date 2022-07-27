class Rip extends Ability {
    constructor() {
        let name = "Rip"
        let cost = 20
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

        this.spellPower = 0.5*1.32 //0.28
        this.duration = 8
        this.bleed = true

        this.secCost = "all"
        this.needForm = "Cat Form"
    }

    getTooltip() {
        let spellPower = ((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100)) * (1 + (player.stats.haste / 100)))
        return "Finishing move that causes Bleed damage over time. Lasts longer per combo point. " +
            "<br>1 point: "+(spellPower*2).toFixed(0)+" over 8 sec " +
            "<br>2 points: "+(spellPower*3).toFixed(0)+" over 12 sec " +
            "<br>3 points: "+(spellPower*4).toFixed(0)+" over 16 sec " +
            "<br>4 points: "+(spellPower*5).toFixed(0)+" over 20 sec " +
            "<br>5 points: "+(spellPower*6).toFixed(0)+" over 24 sec "
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            this.duration = 4 + (4*caster.secondaryResource)
            let done = false
            let target = caster.castTarget
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) ) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                    applyDot(caster,caster.castTarget,this,undefined,undefined,this.spellPower*(1+caster.secondaryResource))
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
                        applyDot(caster,caster.targetObj,this,undefined,undefined,this.spellPower*(1+caster.secondaryResource))
                        done = true
                    }
                }
            }
            if (done) {
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                if (caster.spec==="feral" && caster.abilities["Soul of the Forest"].talentSelect) {
                    caster.useEnergy(-caster.secondaryResource*5)
                }
                caster.useEnergy(this.cost,this.secCost)
                this.setGcd(caster)
                this.setCd()
                return true
            }

        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
