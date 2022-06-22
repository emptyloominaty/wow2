class Transcendence extends Ability {
    constructor(wwbm = false) {
        let name = "Transcendence"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 10
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.effect = [{name:"TranscendenceMonk",x:0,y:0}]
        this.duration = 900
        if (wwbm) {
            this.gcd = 1
            this.hasteGcd = false
        }
    }

    getTooltip() {
        return "Split your body and spirit, leaving your spirit behind for 15 min. Use Transcendence: Transfer to swap locations with your spirit."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            this.effect[0].x = caster.x+0.1
            this.effect[0].y = caster.y+0.1
            applyBuff(caster,caster,this)

            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }
}

class TranscendenceTransfer extends Ability {
    constructor(wwbm = false) {
        let name = "Transcendence: Transfer"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 45
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        if (wwbm) {
            this.gcd = 1
            this.hasteGcd = false
        }
    }

    getTooltip() {
        return "Your body and spirit swap locations."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false

            for (let i = 0; i<caster.buffs.length; i++) {
                if (caster.buffs[i].name==="Transcendence") {
                    caster.buffs[i].duration = -1
                    done = true
                    caster.x = caster.buffs[i].effect[0].x
                    caster.y = caster.buffs[i].effect[0].y
                }
            }
            if (done) {
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                this.setCd()
                this.setGcd(caster)
                caster.useEnergy(this.cost)
                return true
            }
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}

