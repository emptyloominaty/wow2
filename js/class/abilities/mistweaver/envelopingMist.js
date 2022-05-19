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

    run() {
    }

    startCast(caster) {
        if (caster.energy>this.cost && !caster.isCasting && caster.gcd<=0) {
            if (caster.isChanneling) {
                if (caster.channeling.name==="Soothing Mist") {
                    this.endCast(caster)
                    console.log("H")
                    caster.gcd = this.gcd / (1 + (caster.stats.haste / 100))
                    bars.playerCast.setMaxVal(this.gcd / (1 + (caster.stats.haste / 100)))
                    return
                } else {
                    console.log("HELO?")
                    this.isChanneling = false
                    this.channeling = {name:"", time:0, time2:0, timer:0, timer2:0}
                }

            }
            caster.isCasting = true
            caster.casting = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100))}
            caster.gcd = this.gcd / (1 + (caster.stats.haste / 100))
            bars.playerCast.setMaxVal(this.gcd / (1 + (caster.stats.haste / 100)))
        }
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
        if (caster.target==="") {
            applyHot(caster,caster,this)
            caster.abilities["Gust of Mists"].heal(caster)
        } else {
            applyHot(caster,caster.targetObj,this)
            caster.abilities["Gust of Mists"].heal(caster)
            //TODO:RANGE
        }
        caster.useEnergy(this.cost)
    }

    runBuff(target,buff,id) {
    }

    endBuff(target) {
    }
}
