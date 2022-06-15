class EnvelopingMist extends Ability {
    constructor() {
        let name = "Enveloping Mist"
        let cost = 5.6 //% mana
        let gcd = 2
        let castTime = 2
        let cd = 0
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = true
        let canMove = false
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 3.6
        this.duration = 6
        this.effect = "healingIncrease"
        this.effectValue = 0.3
    }

    getTooltip() {
        return "Wraps the target in healing mists, healing for "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100)) * (1 + (player.stats.haste / 100))).toFixed(0)+" over 6 sec and increasing healing received from your other spells by 30%"
    }


    run(caster) {
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.checkDistance(caster,caster.castTarget)) {
            if (caster.isChanneling) {
                if (caster.channeling.name==="Soothing Mist") {
                    this.endCast(caster)
                    this.setGcd(caster,1.5)
                    return true
                } else {
                    this.isChanneling = false
                }

            }
            caster.isCasting = true
            caster.casting = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100))}
            this.setGcd(caster)
            bars.playerCast.setMaxVal(this.gcd / (1 + (caster.stats.haste / 100)))
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endCast(caster) {
        if (player.talents.MistWrap) {
            this.duration = 7
            this.spellPower = 4.2
            this.effectValue = 0.4
        } else {
            this.duration = 6
            this.spellPower = 3.6
            this.effectValue = 0.3
        }
        caster.isCasting = false
        let tftTarget = caster
        if (this.isEnemy(caster,caster.castTarget) || caster.castTarget.isDead || caster.castTarget==="" || Object.keys(caster.castTarget).length === 0) {
            applyHot(caster,caster,this)
            caster.abilities["Gust of Mists"].heal(caster,caster)
        } else {
            tftTarget = caster.castTarget
            applyHot(caster,caster.castTarget,this)
            caster.abilities["Gust of Mists"].heal(caster,caster.castTarget)
        }

        //thunder focus tea
        for (let i = 0; i<caster.buffs.length; i++) {
            if (caster.buffs[i].name==="Thunder Focus Tea") {

                doHeal(caster,tftTarget,this,undefined,2.8,undefined,undefined,"Thunder Focus Tea")

                caster.abilities["Thunder Focus Tea"].cd = 0
                caster.buffs[i].duration = -1
            }
        }

        caster.useEnergy(this.cost)
    }
}
