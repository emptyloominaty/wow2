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
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.472
        this.hotSpellPower = 0.168
        this.duration = 8
        this.bolts = 18
        this.effect = ""
        this.effectValue = 0
    }

    run(caster) {
    }

    startCast(caster) {
        if (caster.gcd<=0 && this.checkCost(caster) && !caster.isCasting  && this.checkCd(caster) &&  !caster.targetObj.isDead) {
            if (caster.isChanneling) {
                caster.isChanneling = false
                caster.channeling = {name:"", time:0, time2:0, timer:0, timer2:0}
            }
            caster.isChanneling = true
            caster.channeling = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100)), timer:0, timer2:(1/(1 + (caster.stats.haste / 100)))/6}
            this.setGcd(caster)
            this.cd = 0
            caster.useEnergy(this.cost)
        } else if (caster.gcd<spellQueueWindow && caster.gcd>0) {
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
            if (!friendlyTargets[t].isDead && (friendlyTargets[t].health<friendlyTargets[t].maxHealth || k>50)) {
                doHeal(caster,friendlyTargets[t],this)
                applyHot(caster,friendlyTargets[t],this,undefined,undefined,this.hotSpellPower)
                j++
            }
        }
        //TODO:RANGE
    }

    runBuff() {
    }

    endBuff() {
    }
}
