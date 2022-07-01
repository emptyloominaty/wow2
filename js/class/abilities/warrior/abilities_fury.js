class Fury_Abilities {
    "Execute" = new Execute()
    "Rampage" = new Rampage()
    "Raging Blow" = new RagingBlow()
    "Bloodthirst" = new Bloodthirst()
    "Whirlwind" = new Whirlwind()
    "Charge" = new Charge()
    "Pummel" = new Pummel()
    "Taunt" = new Taunt()
    "Recklessness" = new Recklessness()
    "Rallying Cry" = new RallyingCry()
    "Heroic Throw" = new HeroicThrow()
    "Enraged Regeneration" = new EnragedRegeneration()
    "Hamstring" = new Hamstring()
    "Challenging Shout" = new ChallengingShout()
    "Ignore Pain" = new IgnorePain()
    "Battle Shout" = new BattleShout()
    "Shattering Throw" = new ShatteringThrow()
    "Spell Reflection" = new SpellReflection()
    "Intervene" = new Intervene()
    "Piercing Howl" = new PiercingHowl()
    "Victory Rush" = new VictoryRush()


    //TODO: Intimidating Shout - Causes the targeted enemy to cower in fear, and up to 5 additional enemies within 8 yards to flee. Targets are disoriented for 8 sec. (1.5min cd) (1.5gcd)
    //TODO: Berserker Rage - Go berserk, removing and granting immunity to Fear, Sap, and Incapacitate effects for 6 sec. (1min cd) (0gcd)

    //Pasive
    "WhirlwindBuff" = new WhirlwindBuff()
    "Enrage" = new Enrage()
    "Unshackled Fury" = new UnshackledFury()

    "" = {startCast:function(xd){return false},run:function(caster){},incCd:function(caster){}}
}

class UnshackledFury extends Ability {
    constructor() {
        super("Unshackled Fury", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.mastery = true
    }

    getTooltip() {
        return "Increases damage done while Enraged by "+player.stats.mastery+"%."
    }
}

class Enrage extends Ability {
    constructor() {
        let name = "Enrage"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 0
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 5 //melee
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.duration = 4
        this.effect = [{name:"moveSpeed",val:0.1},{name:"increaseStat",stat:"haste",val:15}]
        this.passive = true
    }
    startCast(caster){
        applyBuff(caster, caster, this)
    }
    endCast() {
    }
}

class WhirlwindBuff extends Ability {
    constructor() {
        let name = "WhirlwindBuff"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 0
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 5 //melee
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.passive = true
        this.hiddenSB = true
    }

    startCast(caster,target,ability) {
        for (let i = 0; i<caster.buffs.length; i++) {
            if (caster.buffs[i].name==="Whirlwind") {
                let tt = 0
                for (let i = 0; i<enemies.length; i++) {
                    if (!enemies[i].isDead && enemies[i]!==target) {
                        doDamage(caster,enemies[i],ability,undefined,ability.spellPower*0.45)
                        tt++
                        if (tt>4) {
                            break
                        }
                    }
                }

                if (caster.buffs[i].stacks>0) {
                    caster.buffs[i].stacks--
                } else {
                    caster.buffs.slice(i,1)
                }
                return true
            }
        }
    }
    endCast() {
    }
}