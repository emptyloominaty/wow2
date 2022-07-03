class Heal extends Ability {
    constructor() {
        let name = "Heal"
        let cost = 2.4 //% mana
        let gcd = 1.5
        let castTime = 2.5
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = true
        let canMove = false
        let school = "holy"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 2.95*1.16
        this.effect = ""
        this.effectValue = 0
    }

    getTooltip() {
        return "An efficient spell that heals an ally for "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+""
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
            doHeal(caster,caster,this,)
            caster.abilities["Echo of Light"].startCast(caster,caster,this)
            target = caster
        } else {
            //heal target
            doHeal(caster,target,this,)
            caster.abilities["Echo of Light"].startCast(caster,target,this)
        }

        if (caster.spec==="holyPriest") {
            if (caster.abilities["Binding Heals"].talentSelect) {
                doHeal(caster,caster,this,undefined,this.spellPower*0.2)
            }
            caster.abilities["Trail of Light"].heal(caster,target,this)
            caster.abilities["Surge of Light"].chance(caster)
            caster.abilities["Holy Word: Serenity"].reduceCd( caster.abilities["Holy Words"].serenity)
        }
        caster.useEnergy(this.cost)
    }
}