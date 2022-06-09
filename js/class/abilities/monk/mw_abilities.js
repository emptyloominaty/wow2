class Mw_abilities {
    "Vivify" =  new Ability("Vivify",3.8,1.5,1.5,0,false,true,false,"nature",40,1,[{type:"heal",val:1.41},{type:"cleaveHeal",val:1.04,condition:"Renewing Mist"},{type:"gustOfMistMainTarget",val:0}],{})
    "Renewing Mist" =  new Ability("Renewing Mist",1.8,1.5,0,9,false,false,true,"nature",40,2,[{type:"applyHot",val:2.25,duration:20},{type:"gustOfMistMainTarget",val:0}],{jumpRange:20})
    "Gust of Mists" = new Ability("Gust of Mists",0,0,0,0,false,false,false,"nature",120,1,[],{})

    "Soothing Mist" = new Ability("Soothing Mist",0.4,1,1,0,true,false,false,"nature",40,1,[],{duration:8,spellPower:0.55})

    //TODO: healing inc
    "Enveloping Mist" =  new Ability("Enveloping Mist",5.6,1.5,2,0,false,true,false,"nature",40,1,[{type:"applyHot",val:3.6,duration:6},{type:"gustOfMistMainTarget",val:0}],{healingIncrease:0.3})


    "Mana Tea" = new ManaTea()
    "Roll" = new Roll()
    "Revival" = new Revival()
    "Essence Font" = new EssenceFont()
    "Tiger Palm" = new TigerPalm()
    "Blackout Kick" = new BlackoutKick()
    "Rising Sun Kick" = new RisingSunKick()
    "Fortifying Brew" = new FortifyingBrew()
    "Tiger's Lust" = new TigersLust()
    "Provoke" = new Provoke()
    "" = {startCast:function(xd){return false},run:function(caster){},incCd:function(caster){}}
}