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
        this.effect = [{name:"healingIncreaseMistweaver",val:0.3}]

        this.healingInc = 0.3
        this.defaultDuration = 6
    }

    getTooltip() {
        return "Wraps the target in healing mists, healing for "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100)) * (1 + (player.stats.haste / 100))).toFixed(0)+" over 6 sec and increasing healing received from your other spells by 30%"
    }


    run(caster) {
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.checkDistance(caster,caster.castTarget)) {
            //chiji
            let stacks = 0
            for (let i = 0; i<caster.buffs.length; i++) {
                if (caster.buffs[i].name === "Invoke Chi-Ji, the Red Crane") {
                    stacks = caster.buffs[i].stacks
                    caster.buffs[i].duration = -1
                }
            }
            let castTime = this.castTime
            let cost = this.cost
            if (stacks>0) {
                castTime = castTime * (1-(stacks*0.33))
                cost = cost * (1-(stacks*0.33))
                if (castTime<0.1) {
                    castTime = 0
                }
            }

            if (caster.isChanneling) {
                if (caster.channeling.name==="Soothing Mist") {
                    caster.casting = {name:this.name, time:0, time2:0,target:caster.channeling.target,cost:cost}
                    this.endCast(caster)
                    this.setGcd(caster,1.5)
                    return true
                } else {
                    this.isChanneling = false
                }
            }

            caster.isCasting = true
            caster.casting = {name:this.name, time:0, time2:castTime/(1 + (caster.stats.haste / 100)),target:caster.castTarget,cost:cost}
            this.setGcd(caster)
            bars.playerCast.setMaxVal(this.gcd / (1 + (caster.stats.haste / 100)))
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endCast(caster) {
        let duration = this.defaultDuration + caster.abilities["Mist Wrap"].getDuration()
        let healingBonus = this.healingInc + caster.abilities["Mist Wrap"].getHealingInc()
        this.duration = duration
        this.spellPower = this.duration * 0.6
        this.effect[0].val = healingBonus

        caster.isCasting = false
        let target = caster.casting.target
        let tftTarget = caster
        if (this.isEnemy(caster,target) || target.isDead || target==="" || Object.keys(target).length === 0) {
            target = caster
            applyHot(caster,caster,this)
            caster.abilities["Gust of Mists"].heal(caster,caster)
        } else {
            tftTarget = target
            applyHot(caster,target,this)
            caster.abilities["Gust of Mists"].heal(caster,target)
        }

        let cost = caster.casting.cost
        //Lifecycles
        if (caster.spec==="mistweaver") {
            cost =  cost * (1-caster.abilities["Lifecycles"].check(caster,this))
        }

        //thunder focus tea
        for (let i = 0; i<caster.buffs.length; i++) {
            if (caster.buffs[i].name==="Thunder Focus Tea") {

                doHeal(caster,tftTarget,this,undefined,2.8,undefined,undefined,"Thunder Focus Tea")

                if (caster.buffs[i].stacks>1) {
                    caster.buffs[i].stacks--
                } else {
                    caster.buffs[i].duration = -1
                    caster.abilities["Thunder Focus Tea"].cd = 0
                }
            }
        }

        //yulon/chiji
        for (let i = 0; i<caster.pets.length; i++) {
            if (caster.pets[i]!==undefined) {
                if (caster.pets[i].name==="Yu'lon" || caster.pets[i].name==="Chi-Ji") {
                    caster.abilities["Enveloping Breath"].cast(caster,target)
                }
            }
        }

        caster.useEnergy(cost)
    }
}
