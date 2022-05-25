class TigerPalm extends Ability {
    constructor() {
        let name = "Tiger Palm"
        let cost = 0 //% mana
        let gcd = 1.5
        let castTime = 0
        let cd = 0
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 5 //melee
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.27027*1.1 //27.027%   +10% mw aura

        this.effect = ""
        this.effectValue = 0

        //Teachings of the Monastery
        this.maxStacks = 3
        this.duration = 20
        this.buffName = "Teachings of the Monastery"
    }

    run() {
    }

    startCast(caster) {
        if (caster.energy>this.cost && !caster.isCasting && caster.gcd<=0 && !caster.targetObj.isDead) {
            let done = false
            if (caster.target!=="" && caster.castTarget.enemy) {
                //TODO:RANGE
                doDamage(caster,caster.targetObj,this)
                done = true
            } else {
                //TODO:FIND NEAREST ENEMY TARGET
                //done = true
            }
            if (done) {
                if (caster.spec === "mistweaver") {
                    applyBuff(caster,caster,this,1,true, this.buffName)
                }
                if (caster.isChanneling) {
                    this.isChanneling = false
                    this.channeling = {name:"", time:0, time2:0, timer:0, timer2:0}
                }
                caster.gcd = this.gcd / (1 + (caster.stats.haste / 100))
                bars.playerCast.setMaxVal(this.gcd / (1 + (caster.stats.haste / 100)))
            }

        } else if (caster.gcd<spellQueueWindow && caster.gcd>0) {
            spellQueue.add(this,caster.gcd)
        }
    }

    endCast(caster) {
    }

    runBuff() {
    }

    endBuff() {
    }
}
