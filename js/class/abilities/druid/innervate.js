class Innervate extends Ability {
    constructor() {
        let name = "Innervate"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 180
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.effect = [{name:"reduceEnergyCost",val:1}]
        this.duration = 10
    }

    getTooltip() {
        if (player.spec==="restorationDruid") {
            return "Infuse a friendly healer with energy, allowing them to cast spells without spending mana for 10 sec.<br>" +
                "If cast on somebody else, you gain the effect at 50% effectiveness"
        } else {
            return "Infuse a friendly healer with energy, allowing them to cast spells without spending mana for 10 sec."
        }
    }

    getBuffTooltip(caster, target, buff) {
        return "Mana costs reduced 100%."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let target = caster.castTarget
            if (this.isEnemy(caster,target) || target.isDead || target==="" || Object.keys(target).length === 0) {
                applyBuff(caster,caster,this)
            } else {
                applyBuff(caster,target,this)
                if (caster.spec==="restorationDruid") {
                    applyBuff(caster,caster,caster.abilities["InnervateSelf"])
                }
            }

            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        }
        return false
    }
}

class InnervateSelf extends Ability {
    constructor() {
        let name = "Innervate"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 180
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.effect = [{name:"reduceEnergyCost",val:0.5}]
        this.duration = 10
        this.hiddenSB = true
    }
    getBuffTooltip(caster, target, buff) {
        return "Mana costs reduced 50%."
    }
}