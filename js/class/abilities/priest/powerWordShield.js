class PowerWordShield extends Ability {
    constructor(shadow = false) {
        let name = "Power Word: Shield"
        let cost = 3.1 //% mana
        let gcd = 1.5
        let castTime = 0
        let cd = 0
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "holy"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 1.65*1.16
        this.duration = 7.5
        this.effect = [{name:"absorb",val:0}]
        if (shadow) {
            this.cost = -6
        }
    }

    getTooltip() {
        return "Shields an ally for 15 sec, absorbing "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+" damage.  You cannot shield the target again for 7.5 sec."
    }

    getBuffTooltip(caster, target, buff) {
        return "Absorbs "+buff.effect[0].val.toFixed(0)+" damage."
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.checkDistance(caster,caster.castTarget)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            caster.isCasting = true
            caster.casting = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100)),target:caster.castTarget}
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endCast(caster) {
        caster.isCasting = false
        let rapture = (caster.spec==="discipline" && checkBuff(caster,caster,"Rapture"))
        if (rapture) {
            this.effect[0].val = ((caster.stats.primary * this.spellPower) * (1 + (caster.stats.vers / 100)))*3
        } else {
            this.effect[0].val = ((caster.stats.primary * this.spellPower) * (1 + (caster.stats.vers / 100)))
        }

        let target = caster.casting.target
        if (this.isEnemy(caster,target) || target.isDead || target==="" || Object.keys(target).length === 0) {
            if (!checkDebuff(caster,caster,"Weakened Soul") || rapture) {
                applyBuff(caster,caster,this,undefined,undefined,undefined,undefined,undefined,undefined,undefined,true)
                applyDebuff(caster,caster,caster.abilities["Weakened Soul"])
                this.setGcd(caster)
                caster.useEnergy(this.cost)
                if (caster.abilities["Body and Soul"].talentSelect) {
                    applyBuff(caster,caster,caster.abilities["Body and Soul"])
                }
                if (caster.spec==="discipline") {
                    applyBuff(caster,caster,caster.abilities["Atonement"])
                }
            }
        } else {
            if (!checkDebuff(caster,target,"Weakened Soul") || rapture) {
                applyBuff(caster, target, this,undefined,undefined,undefined,undefined,undefined,undefined,undefined,true)
                applyDebuff(caster,target,caster.abilities["Weakened Soul"])
                this.setGcd(caster)
                caster.useEnergy(this.cost)
                if (caster.abilities["Body and Soul"].talentSelect) {
                    applyBuff(caster,target,caster.abilities["Body and Soul"])
                }
                if (caster.spec==="discipline") {
                    applyBuff(caster,target,caster.abilities["Atonement"])
                }
            }
        }
    }
}


//--------------------------

class WeakenedSoul extends Ability {
    constructor() {
        super("Weakened Soul", 0, 0, 0, 0, false, false, false, "holy", 5, 1)
        this.passive = true
        this.duration = 7.5
        this.hiddenSB = true
    }

    getTooltip() {
        return "Cannot be affected by $auracaster's Power Word: Shield."
    }

}