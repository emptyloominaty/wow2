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
    "Havoc" = new Havoc()
    "Command Demon" = new CommandDemon()
    "Summon Imp" = new SummonImp()
    "Summon Felhunter" = new SummonFelhunter()
    "Shadowfury" = new Shadowfury()


    //TODO:Demonic Embrace,passive, Stamina increased by 10%.
    //TODO:Fel Domination, 3min cd, nogcd, Your next Imp, Voidwalker, Incubus, Succubus, Felhunter, or Felguard Summon spell is free and has its casting time reduced by 6 sec.
    //15 sec, bufftooltip: Imp, Voidwalker, Succubus, Felhunter, or Felguard casting time reduced by 6 sec.

    //TODO:BANISH, 1.5sec Cast, 30yd, 1.5 cost, Banishes an enemy Demon, Aberration, or Elemental, preventing any action for 30 sec. Limit 1. Casting Banish again on the target will cancel the effect.
    //TODO:Demonic Gateway, 2sec Cast, 10-40yard, 20 cost, 10 cd, Creates a demonic gateway between two locations. Activating the gateway transports the user to the other gateway. Each player can use a Demonic Gateway only once per 1.5 min.

    //TODO:Curses: A warlock can only have one Curse active per target.
    //TODO:Curse of Weakness, Increases the time between an enemy's attacks by 20% for 2 min.
    //TODO:Curse of Tongues, Forces the target to speak in Demonic, increasing the casting time of all spells by 30% for 1 min.
    //TODO:Curse of Exhaustion, Reduces the target's movement speed by 50% for 12 sec.
    //TODO:Soul Leech All single-target damage done by you and your minions grants you and your pet shadowy shields that absorb 8% of the damage dealt for 15 sec, up to 10% of maximum health.

    //TODO:Succubus, Summons a Succubus under your command to seduce enemy Humanoids, preventing them from attacking.
    //Lash of Pain, melee, 60(30)e, 1 gcd, Lashes the target, dealing (30% of Spell power) Shadow damage.
    //Whiplash, 10yd, ,1gcd, Whips the enemy, reducing movement speed by 50% and increasing damage taken by the demon by 1% for 15 sec, stacking 10 times.

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