class PrayerofMending extends Ability {
    constructor() {
        let name = "Prayer of Mending"
        let cost = 2
        let gcd = 1.5
        let castTime = 1.5
        let cd = 12
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = true
        let canMove = false
        let school = "holy"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.6*1.16
        this.jumps = 5
        this.stacks = 5
        this.maxStacks = 5
        this.duration = 30
        this.effect = [{name:"prayerofMending",val:5, healthA:0, healthB:0,lastTime:30}]
    }

    getTooltip() {
        return "Places a ward on an ally that heals them for "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))* (1 + (player.stats.haste / 100))).toFixed(0)+" the next time they take damage, and then jumps to another ally within 20 yds. Jumps up to 5 times and lasts 30 sec after each jump."
    }

    run(caster) {
    }

    startCast(caster) {
        if (!caster.isCasting && caster.gcd<=0 && this.checkCost(caster) && this.checkCd(caster) && this.checkDistance(caster,caster.castTarget)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
                caster.channeling = {name:"", time:0, time2:0, timer:0, timer2:0}
            }
            caster.isCasting = true
            caster.casting = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100))}
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endCast(caster) {
        caster.isCasting = false
        if (caster.target==="" || this.isEnemy(caster) || caster.castTarget.isDead || caster.castTarget==="" || Object.keys(caster.castTarget).length === 0) {
            //heal self
            applyBuff(caster,caster,this,this.stacks,true)
        } else {
            //heal target
            applyBuff(caster,caster.castTarget,this,this.stacks,true)
        }
        this.setCd()
        caster.useEnergy(this.cost)
    }
}
