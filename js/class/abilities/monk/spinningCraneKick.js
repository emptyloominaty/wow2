class SpinningCraneKick extends Ability {
    constructor(ww = false,bm = false) {
        let name = "Spinning Crane Kick"
        let cost = 1 //% mana
        let gcd = 1.5
        let castTime = 1.5
        let cd = 0
        let charges = 1
        let maxCharges = 1
        let channeling = true
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 8
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.4

        this.effect = ""
        this.effectValue = 0

        this.hasteCd = true

        if (ww) {
            this.secCost = 2 //chi
            this.cost = 0
            //this.spellPower = (0.565 *2)*0.93  //148? idk   // [4 * (10% of Attack power) * [(Attack power * 0.98)][((Attack power + Offhand attack power) * 2 / 3)
            this.cd = 0
            this.gcd = 1
            this.hasteGcd = false
        }
        if (bm) {
            this.cost = 40 //energy
            this.gcd = 1
            this.hasteGcd = false
        }

    }

    getTooltip() {
        return "Spin while kicking in the air, dealing "+spellPowerToNumber(this.spellPower)+" Physical damage over 1.5 sec to all enemies within 8 yds."
    }

    run(caster) {
    }

    startCast(caster) {
        let secCost = this.secCost
        if (caster.spec==="windwalker") {
            if (caster.abilities["Dance of Chi-Ji"].talentSelect && checkBuff(caster,caster,"Dance of Chi-Ji")) {
                secCost = 0
            }
        }
        if (this.checkStart(caster,undefined,secCost)) {
            this.cd = 0
            if (caster.isChanneling) {
                caster.isChanneling = false
                caster.channeling = {name:"", time:0, time2:0, timer:0, timer2:0}
            }
            caster.canMoveWhileCasting = this.canMove
            caster.isChanneling = true
            caster.channeling = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100)), timer:0, timer2:(0.8/(1 + (caster.stats.haste / 100)))/2}

            let secCost = this.secCost
            if (caster.spec==="windwalker") {
                this.spellPower = 0.4
                if (caster.abilities["Inner Strength"].talentSelect) {
                    caster.abilities["Inner Strength"].applyBuff(caster,this.secCost)
                }
                if (caster.abilities["Dance of Chi-Ji"].talentSelect) {
                    for (let i = 0; i<caster.buffs.length; i++) {
                        if (caster.buffs[i].name==="Dance of Chi-Ji") {
                            secCost = 0
                            this.spellPower = 1.2
                            caster.buffs[i].duration = -1
                        }
                    }
                    caster.abilities["Dance of Chi-Ji"].applyBuff(caster)
                }
                if (caster.abilities["Serenity"].talentSelect && checkBuff(caster,caster,"Serenity")) {
                    secCost = 0
                    this.cd = this.maxCd/2
                }
                if (caster.abilities["Spiritual Focus"].talentSelect) {
                    caster.abilities["Spiritual Focus"].reduceCd(caster,secCost)
                }
            }



            caster.useEnergy(this.cost,secCost)
            if (caster.spec==="brewmaster") {
                caster.abilities["Shuffle"].incBuff(caster,this)
            }
            //chiji
            for (let i = 0; i<caster.pets.length; i++) {
                if (caster.pets[i]!==undefined) {
                    if (caster.pets[i].name==="Chi-Ji") {
                        caster.abilities["Gust of Mists (Chi-Ji)"].heal(caster)
                    }
                }
            }
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    cast(caster) {
        for (let i = 0; i<enemies.length ;i++) {
            if (!enemies[i].isDead && this.checkDistance(caster, enemies[i],undefined,true) ) {
                doDamage(caster, enemies[i], this)
            }
        }
    }

    endChanneling(caster) {
        caster.canMoveWhileCasting = false
    }

    endCast(caster) {
    }
}
