class Havoc_Abilities {
    "Chaos Strike" = new ChaosStrike()
    "Demon's Bite" = new DemonsBite()
    "Fel Rush" = new FelRush()
    "Blade Dance" = new BladeDance()
    "Consume Magic" = new ConsumeMagic()
    "Disrupt" = new Disrupt()
    "Imprison" = new Imprison()
    "Blur" = new Blur()
    "Immolation Aura" = new ImmolationAura()
    "Chaos Nova" = new ChaosNova()
    "Darkness" = new Darkness()
    "Eye Beam" = new EyeBeam()
    "Metamorphosis" = new Metamorphosis()
    "Vengeful Retreat" = new VengefulRetreat()
    "Throw Glaive" = new ThrowGlaive()

    "Death Sweep" = new DeathSweep()
    "Annihilation" = new Annihilation()

    //TODO:Shattered Souls   Killing an enemy sometimes creates a Soul Fragment that is consumed when you approach it, healing you for 20% of maximum health. If the Soul Fragment came from a Demon, you will deal 20% increased damage for 15 sec.

    //passive
    "Chaos Brand" = new ChaosBrand()
    "Demonic Presence" = new DemonicPresence()
    "Eye Beam " = new EyeBeamBuff()
    "MetaJump" = new MetaJump()
    "MetaStun" = new MetaStun()
    "VengefulRetreatDebuff" = new VengefulRetreatDebuff()
    "Demonic Wards" = new DemonicWards()
    "" = {startCast:function(xd){return false},run:function(caster){},incCd:function(caster){}}
}

//--------------------------
class DemonicPresence extends Ability {
    constructor() {
        super("Demonic Presence", 0, 0, 0, 0, false, false, false, "chaos", 40, 1)
        this.passive = true
        this.mastery = true
    }

    getTooltip() {
        return "Increases your Chaos damage by "+player.stats.mastery.toFixed(1)+"% and your movement speed by "+(player.stats.mastery/2.8).toFixed(1)+"%"
    }
}
//--------------------------
class DemonicWards extends Ability {
    constructor(vengeance = false) {
        super("Demonic Wards", 0, 0, 0, 0, false, false, false, "chaos", 5, 1)
        this.passive = true
        this.hiddenBuff = true
        this.permanentBuff = true
        this.duration = 10
        this.effect = [{name:"magicDamageReduction",val:0.1}]
        if (vengeance) {
            this.effect = [{name:"damageReduction",val:0.2}]
        }
    }

    getTooltip() {
        if (player.spec==="havoc") {
            return "Your tattoos reduce magic damage taken by 10%."
        } else {
            return "Your tattoos reduce all damage taken by 20%."
        }

    }
}