class BattleShout extends Ability {
    constructor() {
        let name = "Battle Shout"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 15
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 100
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.effect = [{name:"increaseStat",stat:"primary",percent:true,val:5}] //TODO:ATTACK POWER?
        this.duration = 3600

    }

    getTooltip() {
        return "Lets loose a rallying cry, granting all party or raid members within 40 yards 15% temporary and maximum health for 10 sec."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            for (let i = 0; i<friendlyTargets.length; i++) {
                if (this.checkDistance(caster,friendlyTargets[i]) && !friendlyTargets[i].isDead) {
                    applyBuff(caster,friendlyTargets[i],this)
                }
            }
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
