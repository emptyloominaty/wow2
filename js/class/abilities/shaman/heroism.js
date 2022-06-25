class Heroism extends Ability {
    constructor(ele=false) {
        let name = "Heroism"
        let cost = 4.3
        let gcd = 1.5
        let castTime = 0
        let cd = 300
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 999
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.effect = [{name:"increaseStat",stat:"haste",val:30}]
        this.duration = 40
        if (ele) {
            this.cost = 0
        }
    }

    getTooltip() {
        return "Increases haste by 30% for all party and raid members for 40 sec. Allies receiving this effect will become Exhausted and unable to benefit from Heroism or Time Warp again for 10 min."
    }
    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            for (let i = 0; i<friendlyTargets.length; i++) {
                if (this.checkDistance(caster,friendlyTargets[i])) {
                    if (!checkDebuff(caster,friendlyTargets[i],"Exhaustion")) {
                        applyBuff(caster,friendlyTargets[i],this)
                        applyDebuff(caster,friendlyTargets[i],caster.abilities["Exhaustion"])
                    }
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


class Exhaustion extends Ability {
    constructor() {
        super("Exhaustion", 0, 0, 0, 0, false, false, false, "nature", 5, 1)
        this.passive = true
        this.hiddenSB = true
        this.duration = 600
    }

    getBuffTooltip(caster,target,buff) {
        return "Cannot benefit from Heroism or other similar effects."
    }
}