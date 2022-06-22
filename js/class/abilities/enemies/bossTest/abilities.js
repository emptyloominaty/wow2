class BossTestAbilities {
    "Aoe Test" = new AoeTest()
    "Big Dmg" = new BigDmg()
    "Big Rng Dmg" = new BigRngDmg()
    "Big Arcane Dmg" = new BigArcaneDmg()
    "Magic Dot" = new MagicDot()
    "" = {startCast:function(xd){return false},run:function(caster){},incCd:function(caster){}}
}