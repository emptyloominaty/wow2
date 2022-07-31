class Fire_Abilities {
    "Time Warp" = new TimeWarp()
    "Counterspell" = new Counterspell()
    "Evocation" = new Evocation()
    "Remove Curse" = new RemoveCurse()
    "Slow" = new Slow()
    "Frost Nova" = new FrostNova()
    "Ice Block" = new IceBlock()
    "Polymorph" = new Polymorph()
    "Blink" = new Blink()
    "Mirror Image" = new MirrorImage()
    "Spellsteal" = new Spellsteal()
    "Fireball" = new Fireball()
    "Fire Blast" = new FireBlast()
    "Scorch" = new Scorch()
    "Pyroblast" = new Pyroblast()
    "Phoenix Flames" = new PhoenixFlames()
    "Combustion" = new Combustion()
    "Greater Invisibility" = new GreaterInvisibility() //TODO: Invisiblity 5min cd Turns you invisible over 3 sec, reducing threat each second. While invisible, you are untargetable by enemies. Lasts 20 sec. Taking any action cancels the effect.
    "Dragon's Breath" = new DragonsBreath()
    "Flamestrike" = new Flamestrike()
    "Blazing Barrier" = new BlazingBarrier()

    //passive
    "Critical Mass" = new CriticalMass()
    "Ignite" = new Ignite()
    "Hot Streak" = new HotStreak()
    "Heating Up" = new HeatingUp()
    "Cauterize" = new Cauterize()
    "" = {startCast:function(xd){return false},run:function(caster){},incCd:function(caster){}}
}

//----------------------------------------
class CriticalMass extends Ability {
    constructor() {
        super("Critical Mass", 0, 0, 0, 0, false, false, false, "fire", 5, 1)
        this.passive = true
        this.effect = [{name:"increaseStat",stat:"crit",val:10,percent:true},{name:"increaseStat",stat:"crit",val:15}]
        this.duration = 10
        this.permanentBuff = true
        this.hiddenBuff = true
    }

    getTooltip() {
        return "Your spells have a 15% increased chance to deal a critical strike.<br>" +
            "You gain 10% more of the Critical Strike stat from all sources"
    }
}
//----------------------------------------
class Ignite extends Ability {
    constructor() {
        super("Ignite", 0, 0, 0, 0, false, false, false, "fire", 5, 1)
        this.passive = true
        this.mastery = true
        this.duration = 9
        this.doubleDamage = false
    }

    getTooltip() {
        return "Your target burns for an additional "+player.stats.mastery.toFixed(1)+"% over 9 sec of the total direct damage caused by your Fireball, Fire Blast, Scorch, Pyroblast, Meteor, Phoenix Flames, Cinderstorm" +
            "and Flamestrike. If this effect is reapplied, any remaining damage will be added to the new Ignite.<br>" +
            "<br>" +
            "Phoenix Flames causes your Ignites to spread to 8 nearby enemies." //TODO:
    }

    applyIgnite(caster,target,damage) {
        let val = (damage / caster.stats.primary) * (caster.stats.mastery / 100)
        if (this.doubleDamage) {
            val *= 2
            this.doubleDamage = false
        }

        let a = false
        for (let i = 0; i<target.debuffs.length; i++) {
            if (target.debuffs[i].name==="Ignite" && target.debuffs[i].caster === caster) {
                let spellPower = target.debuffs[i].spellPower
                let duration = target.debuffs[i].duration

                spellPower = ((spellPower * duration)/9) + (val/9)

                target.debuffs[i].spellPower = spellPower
                target.debuffs[i].duration = 9
                a = true
                break
            }
        }
        if (!a) {
            applyDot(caster,target,this,undefined,undefined,val)
        }
    }
}
//----------------------------------------
class HotStreak extends Ability {
    constructor() {
        super("Hot Streak", 0, 0, 0, 0, false, false, false, "fire", 5, 1)
        this.passive = true
        this.duration = 15
    }

    getTooltip() {
        return  "Getting two direct-damage critical strikes in a row with Fire spells will make your next Pyroblast or Flamestrike spell instant cast, and cause double the normal Ignite damage."
    }
    getBuffTooltip(caster, target, buff) {
        return "Your next Pyroblast or Flamestrike spell is instant cast, and causes double the normal Ignite damage."
    }
}
//----------------------------------------
class HeatingUp extends Ability {
    constructor() {
        super("Heating Up", 0, 0, 0, 0, false, false, false, "fire", 5, 1)
        this.passive = true
        this.duration = 10
        this.hiddenSB = true
    }

    getTooltip() {
        return "Scored a spell critical. A second spell critical in a row will make your next Pyroblast or Flamestrike spell instant cast, and cause double the normal Ignite damage."
    }
    getBuffTooltip(caster, target, buff) {
        return "Scored a spell critical. A second spell critical in a row will make your next Pyroblast or Flamestrike spell instant cast, and cause double the normal Ignite damage."
    }
}
//----------------------------------------
class Cauterize extends Ability {
    constructor() {
        super("Cauterize", 0, 0, 0, 300, false, false, false, "fire", 5, 1)
        this.passive = true
        this.duration = 6
        this.effect = [{name:"moveSpeed",val:1.5}]
    }

    getTooltip() {
        return "Fatal damage instead brings you to 35% health and then burns you for 28% of your maximum health over 6 sec.<br>" +
            "<br>" +
            "While burning, movement slowing effects are suppressed and your movement speed is increased by 150%.<br>" +
            "<br>" +
            "This effect cannot occur more than once every 5 min."
    }

    getBuffTooltip(caster, target, buff) {
        return "150% increased movement speed and unaffected by movement speed slowing effects."
    }

    runBuff(caster, buff, id) {
        caster.health -= (4.66*progressInSec)/100
    }
}




