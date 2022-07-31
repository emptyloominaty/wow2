class FireBlast extends Ability {
    constructor() {
        let name = "Fire Blast"
        let cost = 1
        let gcd = 0
        let castTime = 1.5
        let cd = 12
        let charges = 2
        let maxCharges = 2
        let channeling = false
        let casting = true
        let canMove = false
        let school = "fire"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 1.002
        this.noGcd = true
        this.hasteCd = true

    }

    getTooltip() { //TODO: Castable while casting other spells
        return "Blasts the enemy for "+spellPowerToNumber(this.spellPower)+" Fire damage. Castable while casting other spells. Always deals a critical strike"
    }

    startCast(caster) {
        if (this.checkStart(caster) && !caster.isCasting2) {
            let done = false
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) && this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
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
                caster.isCasting2 = true
                caster.casting2 = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100)),target:caster.castTarget}
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                this.setGcd(caster)
                return true
            }

        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endCast(caster) {
        caster.isCasting2 = false
        let target = caster.casting2.target
        if (Object.keys(target).length !== 0 && this.isEnemy(caster,target)) {
            if (this.checkDistance(caster,target)  && !target.isDead) {
                doDamage(caster,target,this,undefined,undefined,undefined,true)
                caster.useEnergy(this.cost,this.secCost)
                this.setCd()
            }
        }
    }
}
