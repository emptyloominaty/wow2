class ProtectionWarrior_Abilities {
    "Execute" = new Execute(false)
    "Charge" = new Charge()
    "Pummel" = new Pummel()
    "Taunt" = new Taunt()
    "Rallying Cry" = new RallyingCry()
    "Heroic Throw" = new HeroicThrow()
    "Challenging Shout" = new ChallengingShout()
    "Ignore Pain" = new IgnorePain()
    "Battle Shout" = new BattleShout()
    "Shattering Throw" = new ShatteringThrow()
    "Spell Reflection" = new SpellReflection()
    "Intervene" = new Intervene()
    "Piercing Howl" = new PiercingHowl()
    "Victory Rush" = new VictoryRush()
    "Heroic Leap" = new HeroicLeap()
    "Shield Slam" = new ShieldSlam()
    "Devastate" = new Devastate()
    "Thunder Clap" = new ThunderClap()
    "Revenge" = new Revenge()
    "Shield Wall" = new ShieldWall()
    "Last Stand" = new LastStand()
    "Demoralizing Shout" = new DemoralizingShout()
    "Shield Block" = new ShieldBlock()
    "Shockwave" = new Shockwave()
    "Avatar " = new AvatarProtection()

    //passive
    "Critical Block" = new CriticalBlock()
    "Vanguard" = new Vanguard()
    "" = {startCast:function(xd){return false},run:function(caster){},incCd:function(caster){}}
}

//--------------------------
class CriticalBlock extends Ability {
    constructor() {
        super("Critical Block", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.mastery = true
        this.permanentBuff = true
        this.duration = 10
        this.effect = [{name:"criticalBlock"}]
        this.hiddenBuff = true
    }

    getTooltip() {
        return "Increases your chance to block by "+(player.stats.mastery*2).toFixed(0)+"%<br>" +
            "<br>" +
            "Also increases your attack power by "+player.stats.mastery.toFixed(0)+"%."
    }

}
//--------------------------
class Vanguard extends Ability {
    constructor() {
        super("Vanguard", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.permanentBuff = true
        this.duration = 10
        this.effect = [{name:"increaseStat",stat:"stamina",val:25,percent:true},{name:"increaseStat",stat:"armor",val:20},{name:"damageReduction",val:0.15}]
        this.hiddenBuff = true
    }

    getTooltip() {
        return "Hardened by battle, all damage taken is reduced by 15%, your Stamina is increased by 25% and your Armor is increased by 20%"
    }

}