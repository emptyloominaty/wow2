class BigArcaneDmg extends Ability {
    constructor() {
        let name = "Big Arcane Dmg"
        let cost = 0 //% mana
        let gcd = 1
        let castTime = 5
        let cd = 30
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = true
        let canMove = true
        let school = "arcane"
        let range = 5 //melee
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 14.5
    }

    run(caster) {
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            if (caster.target!=="" && this.isEnemy(caster) && this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                done = true
            } else {
                let newTarget = findNearestEnemy(caster)
                if (newTarget!==false) {
                    if (caster === player) {
                        document.getElementById("raidFrame" + targetSelect).style.outline = "0px solid #fff"
                    }
                    caster.targetObj = newTarget
                    caster.castTarget = newTarget
                    caster.target = newTarget.name
                    if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                        done = true
                    }
                }
            }
            if (done) {
                caster.isCasting = true
                let castTime = this.castTime
                this.setGcd(caster)
                caster.casting = {name:this.name, time:0, time2:castTime/(1 + (caster.stats.haste / 100))}
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                return true
            }

        }
        return false
    }

    endCast(caster) {
        if (caster.target!=="" && this.isEnemy(caster,caster.castTarget)) {
            if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                doDamage(caster,caster.castTarget,this)
                caster.useEnergy(this.cost,this.secCost)
                this.setCd()
            }
        }
    }

}
