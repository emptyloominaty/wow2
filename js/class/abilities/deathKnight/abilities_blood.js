class Blood_Abilities {
    "Heart Strike" = new HeartStrike()
    "Death Strike" = new DeathStrike()
    "Blood Boil" = new BloodBoil()
    "Mind Freeze" = new MindFreeze()
    "Dark Command" = new DarkCommand()
    "Asphyxiate" = new Asphyxiate()
    "Rune Tap" = new RuneTap()
    "Icebound Fortitude" = new IceboundFortitude()
    "Lichborne" = new Lichborne()
    "Raise Ally" = new RaiseAlly()
    "Vampiric Blood" = new VampiricBlood()
    "Death's Caress" = new DeathsCaress()
    "Death and Decay" = new DeathandDecay(true)
    "Marrowrend" = new Marrowrend()
    "Dancing Rune Weapon" = new DancingRuneWeapon()
    "Anti-Magic Shell" = new AntiMagicShell()
    "Death's Advance" = new DeathsAdvance()
    "Anti-Magic Zone" = new AntiMagicZone()
    "Death Coil" = new DeathCoil()
    "Death Grip" = new DeathGrip()
    "Gorefiend's Grasp" = new GorefiendsGrasp()

    //passive
    "Veteran of the Third War" = new VeteranoftheThirdWar(true)
    "Blood Shield" = new BloodShield()
    "Blood Plague" = new BloodPlague()
    "Bone Shield" = new BoneShield()
    "Ossuary" = new Ossuary()
    "Crimson Scourge" = new CrimsonScourge()
    "" = {startCast:function(xd){return false},run:function(caster){},incCd:function(caster){}}
}


//------------------------------------
class BloodShield extends Ability {
    constructor() {
        super("Blood Shield", 0, 0, 0, 0, false, false, false, "physical", 40, 1)
        this.passive = true
        this.mastery = true
        this.effect = [{name:"absorb",val:0}]
        this.duration = 10
    }

    getTooltip() {
        return "Each time you heal yourself with Death Strike, you gain "+(player.stats.mastery).toFixed(1)+"% of the amount healed as a Physical damage absorption shield.<br>" +
            "<br>" +
            "Also increases your attack power by "+(player.stats.mastery/2).toFixed(1)+"%."
    }

    getBuffTooltip(caster, target, buff) {
        return "Absorbs "+buff.effect[0].val.toFixed(0)+" damage."
    }

    applyAbsorb(caster,val) {
        this.effect[0].val = val * (caster.stats.mastery/100)
        applyBuff(caster,caster,this,undefined,undefined,undefined,undefined,undefined,undefined,undefined,true)
    }
}
//------------------------------------
class VeteranoftheThirdWar extends Ability {
    constructor(blood = true) {
        super("Veteran of the Third War", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.duration = 10
        this.permanentBuff = true
        this.hiddenBuff = true
        this.effect = [{name:"increaseStat",stat:"stamina",val:10,percent:true}]

        if (blood) {
            this.effect = [{name:"increaseStat",stat:"stamina",val: 40,percent:true},{name:"damageReduction",val:0.1}]
        }
    }

    getTooltip() {
        if (player.spec==="blood") {
            return  "Stamina increased by 40%.<br>" +
                "Damage taken reduced by 10%."
        } else {
            return  "Stamina increased by 10%."
        }

    }
}
//------------------------------------
class BoneShield extends Ability {
    constructor() {
        super("Bone Shield", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.duration = 30
        this.effect = [{name:"boneShield"}]
        this.maxStacks = 10
    }

    getTooltip() {
       return "Surrounds you with a barrier of whirling bones, increasing Armor by 16% and your Haste by 10% <br><br>" +
           "Each melee attack against you consumes a charge. Lasts 30 sec or until all charges are consumed."
    }

    getBuffTooltip(caster, target, buff) {
        return "Armor increased by 16%.<br>" +
            "Haste increased by 10%."
    }
}
//------------------------------------
class Ossuary extends Ability {
    constructor() {
        super("Ossuary", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
    }

    getTooltip() {
        return "While you have at least 5 Bone Shield charges, the cost of Death Strike is reduced by 5 Runic Power.<br>" +
            "<br>" +
            "Additionally, your maximum Runic Power is increased by 10."
    }

}
//------------------------------------
class CrimsonScourge extends Ability {
    constructor() {
        super("Crimson Scourge", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.duration = 15
    }

    getTooltip() { //25%
        return "Your auto attacks on targets infected with your Blood Plague have a chance to make your next Death and Decay cost no runes and reset its cooldown."
    }

}
