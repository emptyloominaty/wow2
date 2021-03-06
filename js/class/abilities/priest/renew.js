class Renew extends Ability {
    constructor() {
        let name = "Renew"
        let cost = 1.8 //% mana
        let gcd = 1.5
        let castTime = 0
        let cd = 0
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "holy"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 1.6*1.16
        this.duration = 15
        this.effect = []
    }

    getTooltip() {
        return "Fill the target with faith in the light, healing for "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))* (1 + (player.stats.haste / 100))).toFixed(0)+" over 15 sec."
    }

    run(caster) {
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.checkDistance(caster,caster.castTarget)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            caster.isCasting = true
            caster.casting = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100)),target:caster.castTarget}
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
        if (this.isEnemy(caster,target) || target.isDead || target==="" || Object.keys(target).length === 0) {
            //heal self
            applyHot(caster,caster,this)
            caster.abilities["Echo of Light"].startCast(caster,caster,this)
        } else {
            //heal target
            applyHot(caster,target,this)
            caster.abilities["Echo of Light"].startCast(caster,target,this)
        }
        if (caster.spec==="holyPriest") {
            caster.abilities["Surge of Light"].chance(caster)
            caster.abilities["Holy Word: Sanctify"].reduceCd(caster.abilities["Holy Words"].sanctify2)
        }
        caster.useEnergy(this.cost)
    }
}
