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

    //passive
    "Veteran of the Third War" = new VeteranoftheThirdWar(true)
    "Blood Shield" = new BloodShield()
    "Blood Plague" = new BloodPlague()
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