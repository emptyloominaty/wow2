class Guardian_Abilities {
    "Regrowth" = new Regrowth(false)
    "Moonfire" = new Moonfire(false,true)
    "Barkskin" = new Barkskin()
    "Revive" = new Revive(false)
    "Rebirth" = new Rebirth(false)
    "Cat Form" = new CatForm()
    "Bear Form" = new BearForm(true)
    "Growl" = new Growl()
    "Dash" = new Dash()
    "Stampeding Roar" = new StampedingRoar()
    "Entangling Roots" = new EntanglingRoots(false)
    "Soothe" = new Soothe(false)
    "Remove Corruption" = new RemoveCorruption()
    "Skull Bash" = new SkullBash()
    "Maul" = new Maul(true)
    "Mangle" = new Mangle(true)
    "Swipe" = new Swipe()
    "Thrash" = new Thrash()


    //passive
    "" = {startCast:function(xd){return false},run:function(caster){},incCd:function(caster){}}
}