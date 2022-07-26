class Berserk extends Ability {
    constructor(feral = false) {
        let name = "Berserk"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 180
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.needForm = "Bear Form"
        this.canCastForm = "Cat Form"
        this.duration = 15
        this.noGcd = true

        if (feral) {
            this.duration = 20
        }
    }

    getTooltip() {
        if (player.spec==="guardian") {
            return "Go berserk for 15 sec, reducing the cooldowns of Mangle, Thrash, Growl, and Frenzied Regeneration by 50% and the cost of Ironfur by 50%."
        } else {
            return "Go berserk for 20 sec, causing Rake and Shred to deal damage as though you were stealthed, and giving finishing moves a 20% chance per combo point spent to refund 1 combo point."
        }

    }

    getBuffTooltip(caster, target, buff) {
        if (caster.spec==="guardian") {
            return "Cooldowns of Mangle, Thrash, Growl, and Frenzied Regeneration are reduced by 50%. Ironfur cost reduced by 50%."
        } else {
            return "Rake and Shred deal damage as though you were stealthed.<br>" +
                "<br>" +
                "Finishing moves have a 20% chance per combo point spent to refund 1 combo point."
        }
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            caster.abilities["Mangle"].maxCd /= 2
            caster.abilities["Thrash"].maxCd /= 2
            caster.abilities["Growl"].maxCd /= 2
            caster.abilities["Frenzied Regeneration"].maxCd /= 2
            caster.abilities["Ironfur"].cost /= 2

            applyBuff(caster,caster,this)
            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        }
        return false
    }

    endBuff(caster) {
        caster.abilities["Mangle"].maxCd *= 2
        caster.abilities["Thrash"].maxCd *= 2
        caster.abilities["Growl"].maxCd *= 2
        caster.abilities["Frenzied Regeneration"].maxCd *= 2
        caster.abilities["Ironfur"].cost *= 2
    }


}
