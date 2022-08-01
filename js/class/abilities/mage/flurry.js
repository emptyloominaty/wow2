class Flurry extends Ability {
    constructor() {
        let name = "Flurry"
        let cost = 2
        let gcd = 1.5
        let castTime = 3
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = true
        let canMove = false
        let school = "frost"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.spellPower = 0.3476*3
        this.effect = [{name:"moveSpeed",val:0.7}]
        this.duration = 3
    }

    getTooltip() {
        return "Unleash a flurry of ice, striking the target 3 times for a total of "+spellPowerToNumber(this.spellPower)+" Frost damage. Each hit reduces the target's movement speed by 70% for 1 sec.<br><br>" +
            "While Brain Freeze is active, Flurry applies Winter's Chill, causing your target to take damage from your spells as if it were frozen"

    }

    startCast(caster) {
        if (this.checkStart(caster)) {
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
                let castTime = this.castTime
                if (checkBuff(caster,caster,"Brain Freeze")) {
                    castTime = 0
                }
                caster.isCasting = true
                caster.casting = {name:this.name, time:0, time2:(castTime/(1+(caster.secondaryResource*0.08)))/(1 + (caster.stats.haste / 100)),target:caster.castTarget}
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                this.setGcd(caster)
            }
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endCast(caster) {
        caster.isCasting = false
        let target = caster.casting.target
        if (Object.keys(target).length !== 0 && this.isEnemy(caster,target)) {
            if (this.checkDistance(caster,target)  && !target.isDead) {
                let spellPower = this.spellPower
                if (checkBuff(caster,caster,"Brain Freeze",true)) {
                    spellPower *= 1.5
                    applyDebuff(caster,target,caster.abilities["Winter's Chill"])
                }
                doDamage(caster,target,this,undefined,spellPower)
                applyDebuff(caster,target,this)
                caster.abilities["Icicles"].increaseIcicles(caster,target)
                caster.useEnergy(this.cost,this.secCost)
                this.setCd()
            }
        }
    }
}
