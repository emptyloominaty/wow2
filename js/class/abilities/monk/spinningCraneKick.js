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
        if (this.checkStart(caster)) {
            this.cd = 0
            if (caster.isChanneling) {
                caster.isChanneling = false
                caster.channeling = {name:"", time:0, time2:0, timer:0, timer2:0}
            }
            caster.canMoveWhileCasting = this.canMove
            caster.isChanneling = true
            caster.channeling = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100)), timer:0, timer2:(0.8/(1 + (caster.stats.haste / 100)))/2}
            caster.useEnergy(this.cost,this.secCost)
            if (caster.spec==="brewmaster") {
                caster.abilities["Shuffle"].incBuff(caster,this)
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
            if (!enemies[i].isDead && this.checkDistance(caster, enemies[i]) ) {
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
