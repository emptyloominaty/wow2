class SymbolofHope extends Ability {
    constructor() {
        let name = "Symbol of Hope"
        let cost = 0
        let gcd = 1.5
        let castTime = 4
        let cd = 180
        let charges = 1
        let channeling = true
        let casting = false
        let canMove = false
        let school = "holy"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
    }

    getTooltip() {
        return "Heals all party or raid members within 40 yards for "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+" over 8 sec. Each heal increases all targets' healing taken by 4% for 15 sec, stacking."
    }

    getBuffTooltip(caster, target, buff) {
        return "Raid members are rapidly recovering a major defensive ability, and regaining 3.75% missing mana every 1 sec."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            caster.isChanneling = true
            caster.channeling = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100)), timer:0, timer2:(1/(1 + (caster.stats.haste / 100)))-0.1}
            this.setGcd(caster)
            this.cd = 0
            caster.useEnergy(this.cost)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endChanneling(caster) {
    }

    cast(caster) {
        for (let i = 0; i<friendlyTargets.length ;i++) {
            if (!friendlyTargets[i].isDead && this.checkDistance(caster, friendlyTargets[i])) {
                if (friendlyTargets[i].resourceName==="Mana") {
                    friendlyTargets[i].energy += (1-(friendlyTargets[i].energy/friendlyTargets[i].maxEnergy))*3.75
                }

               //if (friendlyTargets[i].spec==="") TODO

            }
        }
    }
}

/*
TODO: Warrior
 Fury -  Enraged Regeneration
 Arms -  Die by the Sword
 Protection -  Shield Wall
  Paladin
  Retribution -  Shield of Vengeance
  Holy -  Divine Protection
  Protection -  Ardent Defender
 Hunter
 All specs -  Exhilaration
 Rogue
 All specs -  Crimson Vial
 Priest
 All specs -  Desperate Prayer
 Death Knight
 All specs -  Icebound Fortitude
 Shaman
 All specs -  Astral Shift
 Mage
 All specs -  Mirror Image
 Warlock
 All specs -  Unending Resolve
 Monk
 All specs -  Fortifying Brew
 Druid
 All specs -  Barkskin
 Demon Hunter
 Vengeance -  Fiery Brand
 Havoc -  Blur
*/