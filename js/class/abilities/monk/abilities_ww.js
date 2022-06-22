class Ww_abilities {
    "Tiger Palm" =  new TigerPalm(true)
    "Blackout Kick" =  new BlackoutKick(true)
    "Rising Sun Kick" =  new RisingSunKick(true)
    "Provoke" =  new Provoke()
    "Spinning Crane Kick" = new SpinningCraneKick(true)
    "Roll" = new Roll()
    "Spear Hand Strike" = new SpearHandStrike()
    "Touch of Death" = new TouchofDeath(true)
    "Leg Sweep" = new LegSweep()
    "Resuscitate" = new Resuscitate()

    //passive
    "Mystic Touch" = new MysticTouch()
    "" = {startCast:function(xd){return false},run:function(caster){},incCd:function(caster){}}
}