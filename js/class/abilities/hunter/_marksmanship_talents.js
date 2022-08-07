let _marksmanship_talents = function(caster) {
    //1
    caster.abilities["Master Marksman"] = new MasterMarksman()
    caster.abilities["Serpent Sting"] = new SerpentSting()
    caster.abilities["A Murder of Crows"] = new AMurderofCrows()

    //2
    caster.abilities["Careful Aim"] = new CarefulAim()
    caster.abilities["Barrage"] = new Barrage()
    caster.abilities["Explosive Shot"] = new ExplosiveShot()

    //3
    caster.abilities["Trailblazer"] = new Trailblazer()
    caster.abilities["Natural Mending"] = new NaturalMending()
    caster.abilities["Camouflage"] = new Camouflage()

    //4
    caster.abilities["Steady Focus"] = new SteadyFocus()
    caster.abilities["Streamline"] = new Streamline()
    caster.abilities["Chimaera Shot"] = new ChimaeraShot()

    //5
    caster.abilities["Born To Be Wild"] = new BornToBeWild()
    caster.abilities["Posthaste"] = new Posthaste()
    caster.abilities["Binding Shackles"] = new BindingShackles()

    //6
    caster.abilities["Lethal Shots"] = new LethalShots()
    caster.abilities["Dead Eye"] = new DeadEye()
    caster.abilities["Double Tap"] = new DoubleTap()

    //7
    caster.abilities["Calling the Shots"] = new CallingtheShots()
    caster.abilities["Lock and Load"] = new LockandLoad()
    caster.abilities["Volley"] = new Volley()

    caster.talents = [["Master Marksman","Serpent Sting","A Murder of Crows"],
        ["Careful Aim","Barrage","Explosive Shot"],
        ["Trailblazer","Natural Mending","Camouflage"],
        ["Steady Focus","Streamline","Chimaera Shot"],
        ["Born To Be Wild","Posthaste","Binding Shackles"],
        ["Lethal Shots","Dead Eye","Double Tap"],
        ["Calling the Shots","Lock and Load","Volley"]
    ]
}

//------------------------------------------------------------------------------------------------ROW1
class MasterMarksman extends Ability {
    constructor() {
        super("Master Marksman", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
        this.bleed = true
        this.duration = 6
    }

    getTooltip() {
        return "Your ranged special attack critical strikes cause the target to bleed for an additional 15% of the damage dealt over 6 sec."
    }
}
//------------------------------------------------
class SerpentSting extends Ability {
    constructor() {
        super("Serpent Sting", 10, 1.5, 0, 0, false, false, false, "nature", 40, 1)
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Fire a shot that poisons your target, causing them to take (16.5% of Attack power) Nature damage instantly and an additional (99% of Attack power) Nature damage over 18 sec."
    }
}
//------------------------------------------------
class AMurderofCrows extends Ability {
    constructor() {
        super("A Murder of Crows", 30, 1.5, 0, 60, false, false, false, "physical", 40, 1)
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Summons a flock of crows to attack your target, dealing [(23% of Attack power) * 16] Physical damage over 15 sec. If the target dies while under attack, A Murder of Crows' cooldown is reset."
    }
}
//------------------------------------------------------------------------------------------------ROW2
class CarefulAim extends Ability {
    constructor() {
        super("Careful Aim", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
    }

    getTooltip() {
        return "Aimed Shot deals 50% bonus damage to targets who are above 70% health."
    }
}
//------------------------------------------------
class Barrage extends Ability {
    constructor() {
        super("Barrage", 60, 1.5, 3, 20, true, false, false, "physical", 40, 1)
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Rapidly fires a spray of shots for 3 sec, dealing an average of [(14.196% of Attack power)% * 11] Physical damage to all nearby enemies in front of you. Usable while moving."
    }
}
//------------------------------------------------
class ExplosiveShot extends Ability {
    constructor() {
        super("Explosive Shot", 20, 1.5, 0, 30, false, false, false, "fire", 40, 1)
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Fires an explosive shot at your target. After 3 sec, the shot will explode, dealing (188.5% of Attack power) Fire damage to all enemies within 8 yards. Deals reduced damage beyond 5 targets."
    }
}
//------------------------------------------------------------------------------------------------ROW3
class Trailblazer extends Ability {
    constructor() {
        super("Trailblazer", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Your movement speed is increased by 30% anytime you have not attacked for 3 seconds."
    }
}
//------------------------------------------------
class NaturalMending extends Ability {
    constructor() {
        super("Natural Mending", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {//TODO: bm = 30
        return "//NOT IMPLEMENTED//Every 20 Focus you spend reduces the remaining cooldown on Exhilaration by 1 sec."
    }
}
//------------------------------------------------
class Camouflage extends Ability {
    constructor() {
        super("Camouflage", 0, 0, 0, 60, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
        this.noGcd = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//You and your pet blend into the surroundings and gain stealth for 1 min. While camouflaged, you will heal for 2% of maximum health every 1 secs."
    }
    getBuffTooltip(caster, target, buff) {
        return "Stealthed."
    }
}
//------------------------------------------------------------------------------------------------ROW4
class SteadyFocus extends Ability {
    constructor() {
        super("Steady Focus", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Using Steady Shot twice in a row increases your Haste by 7% for 15 sec. ."
    }
}
//------------------------------------------------
class Streamline extends Ability {
    constructor() {
        super("Streamline", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Rapid Fire's damage is increased by 15%, and Rapid Fire also causes your next Aimed Shot to cast 30% faster."
    }
}
//------------------------------------------------
class ChimaeraShot extends Ability {
    constructor() {
        super("Chimaera Shot", 20, 1.5, 0, 0, false, false, false, "nature", 40, 1)
        this.talent = true
    }

    getTooltip() {//TODO: Replaces Arcane Sho
        return "//NOT IMPLEMENTED//A two-headed shot that hits your primary target for (65% of Attack power)% Nature damage and another nearby target for [(65% of Attack power)% * (0.5)] Frost damage."
    }
}
//------------------------------------------------------------------------------------------------ROW5
class BornToBeWild extends Ability {
    constructor() {
        super("Born To Be Wild", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Reduces the cooldowns of Aspect of the Cheetah and Aspect of the Turtle by 20%."
        //TODO: Survival: Reduces the cooldowns of Aspect of the Eagle, Aspect of the Cheetah, and Aspect of the Turtle by 20%.
    }
}
//------------------------------------------------
class Posthaste extends Ability {
    constructor() {
        super("Posthaste", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Disengage also frees you from all movement impairing effects and increases your movement speed by 50% for 4 sec."
    }
}
//------------------------------------------------
class BindingShackles extends Ability {
    constructor() {
        super("Binding Shackles", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Targets rooted by Binding Shot deal 20% less damage to you for 8 sec after the root effect ends."
    }
}
//------------------------------------------------------------------------------------------------ROW6
class LethalShots extends Ability {
    constructor() {
        super("Lethal Shots", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Arcane Shot and Multi-Shot have a 30% chance to reduce the cooldown of Rapid Fire by 5.0 sec."
    }
}
//------------------------------------------------
class DeadEye extends Ability {
    constructor() {
        super("Dead Eye", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Kill Shot has 2 charges, and causes Aimed Shot to recharge 60% faster for 3 sec."
    }
}
//------------------------------------------------
class DoubleTap extends Ability {
    constructor() {
        super("Double Tap", 0, 1.5, 0, 60, false, false, false, "physical", 5, 1)
        this.talent = true
        this.talentSelect = true
        this.duration = 15
    }

    getTooltip() {
        return "Your next Aimed Shot will fire a second time instantly at 100% power without consuming Focus, or your next Rapid Fire will shoot 100% additional shots during its channel."
    }

    getBuffTooltip(caster, target, buff) {
        return "Your next Aimed Shot will fire a second time instantly at 100% power and consume no Focus, or your next Rapid Fire will shoot 100% additional shots during its channel."
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.talentSelect) {
            applyBuff(caster,caster,this)
            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        }
        return false
    }
}
//------------------------------------------------------------------------------------------------ROW7
class CallingtheShots extends Ability {
    constructor() {
        super("Calling the Shots", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Casting Arcane Shot or Multi-Shot reduces the cooldown of Trueshot by 2.5 sec.\n"
    }
}
//------------------------------------------------
class LockandLoad extends Ability {
    constructor() {
        super("Lock and Load", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Your ranged auto attacks have a 8% chance to trigger Lock and Load, causing your next Aimed Shot to cost no Focus and be instant."
    }
}
//------------------------------------------------
class Volley extends Ability {
    constructor() {
        super("Volley", 0, 1.5, 0, 45, false, false, false, "physical", 5, 1)
        this.talent = true
        this.talentSelect = true
        this.spellPower = 0.0245*2
        this.area = {type:"circle", radius:8, duration: 6,data:{type:"dot", maxTargets:"all", spellPower:this.spellPower, timer:1/*sec*/,color:"#6d767a",color2:"rgba(133,132,126,0.16)"},cast:false}
        this.castPosition = {x:0,y:0}
    }

    getTooltip() {//TODO:
        return "Rain a volley of arrows down over 6 sec, dealing up to "+spellPowerToNumber(this.spellPower*6)+" Physical damage to any enemy in the area, and gain the effects of Trick Shots for as long as Volley is active."
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.talentSelect) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }

            if (caster===player) {
                this.castPosition.x = mousePosition2d.x
                this.castPosition.y = mousePosition2d.y
            } else {
                this.castPosition.x = caster.mousePos.x
                this.castPosition.y = caster.mousePos.y
            }

            addArea(areas.length,caster,this,this.area.type,this.area.duration,this.area.data,this.castPosition.x,this.castPosition.y,true,this.area.radius)
            caster.useEnergy(this.cost)
            this.setCd()
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }
}
