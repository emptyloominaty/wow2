class Starfall extends Ability {
    constructor() {
        let name = "Starfall"
        let cost = 50
        let gcd = 1.5
        let castTime = 0
        let cd = 0
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "arcane"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.221625 // every sec
        this.effect = [{name:"starfall",duration:8,spellPower:0.221625,timer:0}]
        this.duration = 8

        this.incDuration = 4 //moonfire,sunfire
    }

    getTooltip() {
        return "Calls down waves of falling stars upon enemies within 40 yds, dealing"+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+" Astral damage over 8 sec. Extends the duration of active Moonfires and Sunfires by 4 sec."
    }

    run(caster) {
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }

            for (let i = 0; i<enemies.length ;i++) {
                for (let j = 0; j<enemies[i].debuffs.length ;j++) {
                    if ((enemies[i].debuffs[j].name==="Moonfire" || enemies[i].debuffs[j].name==="Sunfire") && enemies[i].debuffs[j].caster === caster) {
                        enemies[i].debuffs[j].duration += this.incDuration
                    }
                }
            }

            applyBuff(caster,caster,this)
            this.setGcd(caster)
            this.setCd()
            caster.useEnergy(this.cost)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endChanneling(caster) {
    }

    runBuff() {
    }

    endBuff() {
    }
}
