class EssenceFont extends Ability {
    constructor() {
        let name = "Essence Font"
        let cost = 7.2 //% mana every sec
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
        if (caster.gcd<=0 && this.checkCost(caster) && !caster.isCasting  && this.checkCd(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
                caster.channeling = {name:"", time:0, time2:0, timer:0, timer2:0}
            }
            caster.isChanneling = true
            caster.channeling = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100)), timer:0, timer2:(1/(1 + (caster.stats.haste / 100)))/6}
            this.setGcd(caster)
            this.cd = 0
            caster.useEnergy(this.cost)
            this.last6bolts = []
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
    }

    cast(caster) {
        let j = 0
        let k = 0
        while(j===0) {
            k++
            let no = friendlyTargets.length
            let t = Math.floor(Math.random()*no)
            if (!friendlyTargets[t].isDead && (friendlyTargets[t].health<friendlyTargets[t].maxHealth && this.last6bolts.indexOf(t)===-1 || k>120)) {
                if (this.checkDistance(caster,friendlyTargets[t])) {
                    this.last6bolts.push(t)
                    if (this.last6bolts.length>5) {
                        this.last6bolts = []
                    }
                    doHeal(caster,friendlyTargets[t],this)
                    applyHot(caster,friendlyTargets[t],this,undefined,undefined,this.hotSpellPower)
                    j++
                }
            }
        }
    }

    runBuff() {
    }

    endBuff() {
    }
}
