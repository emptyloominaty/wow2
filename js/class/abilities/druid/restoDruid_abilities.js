class restoDruid_abilities {
    "Regrowth" = new Regrowth(true)
    "Rejuvenation" = new Rejuvenation()
    "Wild Growth" = new WildGrowth()
    "Wrath" = new Wrath()
    "Moonfire" = new Moonfire()
    "Sunfire" = new Sunfire()
    "" = {startCast:function(xd){return false},run:function(caster){},incCd:function(caster){}}
}