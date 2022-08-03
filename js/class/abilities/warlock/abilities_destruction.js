class Destruction_Abilities {
    "Incinerate" = new Incinerate()
    "Chaos Bolt" = new ChaosBolt()
    "Immolate" = new Immolate()
    "Conflagrate" = new Conflagrate()
    "Unending Resolve" = new UnendingResolve()
    "Life Tap" = new LifeTap()
    "Soulstone" = new Soulstone()
    "Rain of Fire" = new RainofFire()
    "Summon Infernal" = new SummonInfernal()

    //TODO:BANISH, 1.5sec Cast, 30yd, 1.5 cost, Banishes an enemy Demon, Aberration, or Elemental, preventing any action for 30 sec. Limit 1. Casting Banish again on the target will cancel the effect.

    //passive
    "Chaotic Energies" = new ChaoticEnergies()
    "" = {startCast:function(xd){return false},run:function(caster){},incCd:function(caster){}}
}

//-----------------------------
class ChaoticEnergies extends Ability {
    constructor() {
        super("Chaotic Energies", 0, 0, 0, 0, false, false, false, "chaos", 5, 1)
        this.passive = true
        this.mastery = true
    }

    getTooltip() {
        return "Your spells deal "+player.stats.mastery.toFixed(1)+"%. increased damage, plus a random amount of up to "+player.stats.mastery.toFixed(1)+"%. additional increased damage.<br>" +
            "<br>" +
            "You take "+(player.stats.mastery/4.7).toFixed(1)+"% reduced damage, plus a random amount of up to "+(player.stats.mastery/4.7).toFixed(1)+"% additional reduced damage."
    }
}
//-----------------------------
//-----------------------------
//-----------------------------
//-----------------------------
class Healthstone extends Ability {
    constructor() {
        super("Healthstone", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.canUse = false
    }

    getTooltip() {
        return "Use: Instantly restores 25% health"
    }

    startCast(caster) {
        doHeal(caster,caster,this,undefined,undefined,undefined,undefined,undefined,caster.maxHealth*0.25)
        this.canUse = false
    }

    onStart(caster) {
        if (caster.class==="Warlock") {
            for (let i = 0; i<friendlyTargets.length; i++) {
                friendlyTargets[i].abilities["Healthstone"].canUse = true
            }
        }
    }
}