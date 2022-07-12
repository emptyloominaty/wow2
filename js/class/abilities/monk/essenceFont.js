class EssenceFont extends Ability {
    constructor() {
        let name = "Essence Font"
        let cost = 7.2
        let gcd = 1.5
        let castTime = 3
        let cd = 12
        let charges = 1
        let maxCharges = 1
        let channeling = true
        let casting = false
        let canMove = true
        let school = "nature"
        let range = 30
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.472
        this.hotSpellPower = 0.168
        this.duration = 8
        this.bolts = 18
        this.effect = ""
        this.effectValue = 0
        this.last6bolts = []
    }

    getTooltip() {
        return "Unleashes a rapid twirl of healing bolts at up to 6 allies within 30 yds, every 1.0 sec for 3 sec. Each bolt heals a target for "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+" plus an additional "+((player.stats.primary * this.hotSpellPower) * (1 + (player.stats.vers / 100)) * (1 + (player.stats.haste / 100))).toFixed(0)+" over 8 sec. Gust of Mists will heal affected targets twice"
    }

    run(caster) {
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.abilities["Upwelling"].talentSelect) {
                this.duration = 12
                this.castTime = 3 + (caster.abilities["Upwelling"].upwellingStacks/6)
                caster.abilities["Upwelling"].upwellingStacks = 0
                for (let i = 0; i < caster.buffs.length; i++) {
                    if (caster.buffs[i].name === "Upwelling") {
                        caster.buffs[i].duration = -1
                        caster.buffs[i].stacks = 0
                    }
                }
            } else {
                this.duration = 8
                this.castTime = 3
            }
            caster.canMoveWhileCasting = this.canMove
            caster.isChanneling = true
            caster.channeling = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100)), timer:0, timer2:(1/(1 + (caster.stats.haste / 100)))/6}
            this.setGcd(caster)
            this.setCd()
            caster.useEnergy(this.cost)
            this.last6bolts = []
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endChanneling(caster) {
        caster.canMoveWhileCasting = false
    }

    cast(caster) {
        let j = 0
        let k = 0
        //TODO:let array = createArrayAndShuffle(friendlyTargets.length) ???
        while(j===0) {
            k++
            let no = friendlyTargets.length
            let t = Math.floor(Math.random()*no)
            if (!friendlyTargets[t].isDead && (friendlyTargets[t].health<friendlyTargets[t].maxHealth && this.last6bolts.indexOf(t)===-1 || k>80)) {
                if (this.checkDistance(caster,friendlyTargets[t],undefined,true)) {
                    this.last6bolts.push(t)
                    if (this.last6bolts.length>5) {
                        this.last6bolts.shift()
                    }
                    doHeal(caster,friendlyTargets[t],this)
                    applyHot(caster,friendlyTargets[t],this,undefined,undefined,this.hotSpellPower)
                    j++
                }
            }
        }
    }
}
