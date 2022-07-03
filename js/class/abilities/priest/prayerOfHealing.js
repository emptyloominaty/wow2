class PrayerofHealing extends Ability {
    constructor() {
        let name = "Prayer of Healing"
        let cost = 5 //% mana
        let gcd = 1.5
        let castTime = 2
        let cd = 0
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = true
        let canMove = false
        let school = "holy"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.875*1.16
        this.cleaveRange = 30
        this.targetsHeal = 4
    }

    getTooltip() {
        return  "A powerful prayer that heals the target and the 4 nearest allies within 40 yards for "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+""
    }

    run(caster) {
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            let castTime = this.castTime
            if (checkBuff(caster,caster,"Prayer Circle")) {
                castTime /= 1.25
            }

            caster.isCasting = true
            caster.casting = {name:this.name, time:0, time2:castTime/(1 + (caster.stats.haste / 100)),target:caster.castTarget}
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endCast(caster) {
        caster.isCasting = false
        let target = caster.casting.target
        if (this.isEnemy(caster,target) || target.isDead || Object.keys(target).length === 0 || !this.checkDistance(caster, target)) {
            //heal self
            doHeal(caster,caster,this)
            target = caster
            caster.abilities["Echo of Light"].startCast(caster,caster,this)
        } else {
            //heal target
            doHeal(caster,target,this)
            caster.abilities["Echo of Light"].startCast(caster,target,this)
        }
        //cleave 4 targets
        //healing
        let tth = 0
        for (let i = 0; i<friendlyTargets.length ;i++) {
            if (!friendlyTargets[i].isDead && friendlyTargets[i].health<friendlyTargets[i].maxHealth && this.checkDistance(target, friendlyTargets[i])) {
                doHeal(caster, friendlyTargets[i], this)
                caster.abilities["Echo of Light"].startCast(caster,friendlyTargets[i],this)
                tth++
            }
            if (tth>=this.targetsHeal) {
                break
            }
        }
        let cost = this.cost
        caster.abilities["Surge of Light"].chance(caster)
        caster.abilities["Holy Word: Sanctify"].reduceCd(caster.abilities["Holy Words"].sanctify)
        if (checkBuff(caster,caster,"Prayer Circle")) {
            cost /= 1.25
        }

        this.setCd()
        caster.useEnergy(cost)
    }
}
