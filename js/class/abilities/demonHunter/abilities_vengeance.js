class Vengeance_Abilities {
    "Disrupt" = new Disrupt()
    "Imprison" = new Imprison()
    "Consume Magic" = new ConsumeMagic()
    "Throw Glaive" = new ThrowGlaive()
    "Metamorphosis" = new Metamorphosis()
    "Torment" = new Torment()

    //passive
    "MetaJump" = new MetaJump()
    "MetaStun" = new MetaStun()
    "Chaos Brand" = new ChaosBrand()
    "Demonic Wards" = new DemonicWards()
    "" = {startCast:function(xd){return false},run:function(caster){},incCd:function(caster){}}
}