class Regrowth extends Ability {
    constructor(restoration = false) {
        let name = "Regrowth"
        let cost = 4.25 //% mana
        let gcd = 1.5
        let castTime = 1.5
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = true
        let canMove = false
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 1.73
        this.spellPowerHot = 0.432
        this.duration = 12
        this.crit = 0

        if (restoration) {
            this.spellPower = 1.73*1.10
            this.spellPowerHot = 0.864*.10
            this.crit = 40
        }
        this.naturesSwiftness = false
    }

    getTooltip() {
        return "Heals a friendly target for "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+" and another "+((player.stats.primary * this.spellPowerHot) * (1 + (player.stats.vers / 100))).toFixed(0)+" over 12 sec. Initial heal has a 40% increased chance for a critical effect if the target is already affected by Regrowth."
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.checkDistance(caster,caster.castTarget)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            this.naturesSwiftness = false
            let castTime = this.castTime
            for (let i = 0; i<caster.buffs.length; i++) {
                if (caster.buffs[i].name==="Nature's Swiftness") {
                    castTime = 0
                    this.naturesSwiftness = true
                    caster.buffs[i].duration = -1
                }
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
        let spellPower = this.spellPower
        let cost = this.cost
        let crit = 0
        if (caster.spec==="restorationDruid" && caster.abilities["Abundance"].talentSelect) {
            let val = caster.abilities["Abundance"].getCost(caster)
            crit += val
            cost = cost * (1-(val/100))
            if (cost<0) {
                cost = 0
            }
        }
        if (this.naturesSwiftness) {
            cost = 0
            spellPower *= 2
        }
        if (this.isEnemy(caster,target) || target.isDead || target==="" || Object.keys(target).length === 0) {
            for (let i = 0; i<caster.buffs.length; i++) {
                if (caster.buffs[i].name==="Regrowth" && caster.buffs[i].caster === caster) {
                    crit += this.crit
                }
            }
            //heal self
            doHeal(caster,caster,this,undefined,spellPower,undefined,undefined,undefined,undefined,crit)
            applyHot(caster,caster,this,undefined,undefined,this.spellPowerHot)
        } else {
            for (let i = 0; i<target.buffs.length; i++) {
                if (target.buffs[i].name==="Regrowth" && target.buffs[i].caster === caster) {
                    crit += this.crit
                }
            }
            //heal target
            doHeal(caster,target,this,undefined,spellPower,undefined,undefined,undefined,undefined,crit)
            applyHot(caster,target,this,undefined,undefined,this.spellPowerHot)
        }

        for (let i = 0; i<caster.buffs.length; i++) {
            if (caster.buffs[i].name==="Clearcasting") {
                cost = 0
                caster.buffs[i].duration = -1
            }
        }

        caster.useEnergy(cost)
    }

}
