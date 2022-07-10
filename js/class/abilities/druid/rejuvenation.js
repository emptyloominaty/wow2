class Rejuvenation extends Ability {
    constructor(resto = true) {
        let name = "Rejuvenation"
        let cost = 2.2 //% mana
        let gcd = 1.5
        let castTime = 0
        let cd = 0
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 1.45*1.10
        this.duration = 15

        if (!resto) {
            this.cost = 0
        }
    }

    getTooltip() {
        return "Heals the target for "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100)) * (1 + (player.stats.haste / 100))).toFixed(0)+" over 15 sec."
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

        let cost = this.cost
        let spellPower = this.spellPower
        if (caster.spec==="restorationDruid" && caster.abilities["Soul of the Forest"].talentSelect && checkBuff(caster,caster,"Soul of the Forest",true)) {
            spellPower *= 3
        }

        if (checkBuff(caster,caster,"Incarnation: Tree of Life")) {
            spellPower *= 1.5
            cost /= 1.3
        }

        if (this.isEnemy(caster,target) || target.isDead || target==="" || Object.keys(target).length === 0) {
            if (caster.spec==="restorationDruid" && caster.abilities["Germination"].talentSelect && checkBuff(caster,target,"Rejuvenation")) {
                applyHot(caster,caster,caster.abilities["Germination"],undefined,undefined,spellPower)
            }
            applyHot(caster,caster,this,undefined,undefined,spellPower)
            target = caster
        } else {
            if (caster.spec==="restorationDruid" && caster.abilities["Germination"].talentSelect && checkBuff(caster,target,"Rejuvenation")) {
                applyHot(caster,target,caster.abilities["Germination"],undefined,undefined,spellPower)
            }
            applyHot(caster,target,this,undefined,undefined,spellPower)
        }
        if(caster.spec==="restorationDruid") {
            caster.abilities["Cultivation"].applyHot(caster,target)
        }
        caster.useEnergy(cost)
    }
}
