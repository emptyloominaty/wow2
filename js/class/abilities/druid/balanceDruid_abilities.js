class balanceDruid_abilities {
    "Regrowth" = new Regrowth()
    "Wrath" = new Wrath(true)
    "Moonfire" = new Moonfire(true)
    "Sunfire" = new Sunfire(true)
    "" = {startCast:function(xd){return false},run:function(caster){},incCd:function(caster){}}
}