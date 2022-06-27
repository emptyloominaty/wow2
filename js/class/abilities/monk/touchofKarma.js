class TouchofKarma extends Ability {
    constructor() {
        let name = "Touch of Karma"
        let cost = 15
        let gcd = 1
        let castTime = 0
        let cd = 90
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 20 //melee
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.effect = [{name:"absorb",val:0},{name:"TouchofKarma",target:{},val:0,percent:0.7,returnTo:"target",notStacks:true}]
        this.duration = 6
    }

    getTooltip() {
        return "Absorbs all damage taken for 10 sec, up to 50% of your maximum health, and redirects 70% of that amount to the enemy target as Nature damage over 6 sec."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) ) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                    done = true
                    this.effect[1].target = enemies[caster.castTarget.id]
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
                        done = true
                        this.effect[1].target = enemies[caster.targetObj.id]
                    }
                }
            }
            if (done) {
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                this.effect[0].val = caster.maxHealth * 0.5
                this.effect[1].val = caster.maxHealth * 0.5
                applyBuff(caster,caster,this)
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
