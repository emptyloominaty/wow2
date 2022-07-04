class BossTestAbilities {
    "Aoe Dmg" = new AoeTest()
    "Big Dmg" = new BigDmg()
    "Big Rng Dmg" = new BigRngDmg()
    "Big Arcane Dmg" = new BigArcaneDmg()
    "Magic Dot" = new MagicDot()
    "Magic Buff" = new MagicBuff()
    "Enrage Buff" = new EnrageBuff()
    "" = {startCast:function(xd){return false},run:function(caster){},incCd:function(caster){}}
}