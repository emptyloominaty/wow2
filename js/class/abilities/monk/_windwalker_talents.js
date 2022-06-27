let _windwalker_talents = function(caster) {
    //1
    caster.abilities["Eye of the Tiger"] = new EyeoftheTiger()
    caster.abilities["Chi Wave"] = new ChiWave(caster.spec)
    caster.abilities["Chi Burst"] = new ChiBurst(caster.spec)

    //2
    caster.abilities["Chi Torpedo"] = new ChiTorpedo()
    caster.abilities["Celerity"] = new Celerity()
    caster.abilities["Tiger's Lust"] = new TigersLust()

    //3
    //caster.abilities[""] = new ()
    //caster.abilities[""] = new ()
    //caster.abilities[""] = new ()

    //4
    caster.abilities["Tiger Tail Sweep"] = new TigerTailSweep()
    //caster.abilities[""] = new ()
    caster.abilities["Ring of Peace"] = new RingofPeace()

    //5
    //caster.abilities[""] = new ()
    caster.abilities["Diffuse Magic"] = new DiffuseMagic()
    caster.abilities["Dampen Harm"] = new DampenHarm()

    //6
    //caster.abilities[""] = new ()
    //caster.abilities[""] = new ()
    //caster.abilities[""] = new ()

    //7
    //caster.abilities[""] = new ()
    //caster.abilities[""] = new ()
    //caster.abilities[""] = new ()


    caster.talents = [["Eye of the Tiger","Chi Wave","Chi Burst"],
        ["Celerity","Chi Torpedo","Tiger's Lust"],
        ["Ascension","Fist of the White Tiger","Energizing Elixir"],
        ["Tiger Tail Sweep","Good Karma","Ring of Peace"],
        ["Inner Strength","Diffuse Magic","Dampen Harm"],
        ["Hit Combo","Rushing Jade Wind","Dance of Chi-Ji"],
        ["Spiritual Focus","Whirling Dragon Punch","Serenity"]
    ]
}

//------------------------------------------------------------------------------------------------ROW1
class EyeoftheTiger extends Ability {
    constructor() {
        super("Eye of the Tiger", 0, 0, 0, 0, false, false, false, "nature", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
        this.duration = 8
        this.spellPower = 0.281736
    }

    getTooltip() {
        return "Tiger Palm also applies Eye of the Tiger, dealing "+spellPowerHotToNumber(this.spellPower)+" Nature damage to the enemy and "+spellPowerHotToNumber(this.spellPower)+" healing to the Monk over 8 sec. Limit 1 target."
    }

    //TODO:ONLY 1 TARGET
    apply(caster,target) {
        if (this.talentSelect) {
            applyHot(caster,caster,this)
            applyDot(caster,target,this)
        }
    }

}
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW2
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW3
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW4
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW5
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW6
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW7
//------------------------------------------------
//------------------------------------------------