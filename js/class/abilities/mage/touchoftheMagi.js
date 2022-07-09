class TouchoftheMagi extends Ability {
    constructor() {
        let name = "Touch of the Magi"
        let cost = 5
        let gcd = 1.5
        let castTime = 1.5
        let cd = 45
        let charges = 1
        let channeling = false
        let casting = true
        let canMove = false
        let school = "arcane"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.secCost = -4
        this.damageDealt = 0
        this.duration = 8
        this.caster = {}

    }

    getTooltip() {
        return "Applies Touch of the Magi to your current target, accumulating 25% of the damage you deal to the target for 8 sec," +
            " and then exploding for that amount of Arcane damage to the target and reduced damage to all nearby enemies. Generates 4 Arcane Charges."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            this.caster = caster
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
                applyDebuff(caster,target,this)
                caster.useEnergy(this.cost,this.secCost)
                this.setCd()
            }
        }
    }

    endBuff(target) {
        let caster = this.caster
        let val = this.damageDealt * 0.25

        doDamage(caster,target,this,undefined,undefined,false,undefined,undefined,undefined,val)

        let targets = enemies
        for (let i = 0; i<targets.length ;i++) {
            if (!targets[i].isDead && target!==targets[i] && this.checkDistance(target, targets[i],undefined,true)) {
                doDamage(caster, targets[i], this,undefined,undefined,undefined,undefined,undefined,undefined,val/1.5) // 1.5??????
            }
        }
        this.damageDealt = 0
    }

}
