class Mw_abilities {
    "Vivify" =  new Ability("Vivify",3.8,1.5,1.5,0,false,true,false,"nature",40,1,
        [{type:"heal",val:1.41},{type:"cleaveHeal",val:1.04,condition:"Renewing Mist"},{type:"gustOfMistMainTarget",val:0}],{})

    "Renewing Mist" =  new Ability("Renewing Mist",1.8,1.5,0,9,false,false,false,"nature",40,2,
        [{type:"applyHot",val:2.25,duration:20},{type:"gustOfMistMainTarget",val:0}],{jumpRange:20})

    "Gust of Mists" = new Ability("Gust of Mists",0,0,0,0,false,false,false,"nature",40,1,
        [],{})

    "Soothing Mist" = new Ability("Soothing Mist",0.4,1,1,0,true,false,false,"nature",40,1,
        [],{duration:8,spellPower:0.55})

    "Enveloping Mist" =  new Ability("Enveloping Mist",5.6,1.5,2,0,false,true,false,"nature",40,1,
        [{type:"applyHot",val:3.6,duration:6},{type:"gustOfMistMainTarget",val:0}],{effect:[{name:"healingIncrease", val:0.3}]})

    "Mana Tea" =  new Ability("Mana Tea",0,0,0,90,false,false,false,"physical",5,1,
        [{type:"applyBuffSelf",val:0,duration:10}],{effect:[{name:"reduceEnergyCost", val:0.5}]},true)

    "Roll" =  new Ability("Roll",0,0.8,0,20,false,false,false,"physical",5,2,
        [{type:"roll",val:6.7,duration:0.8}],{effect:[{name:"move", val:6.7}]})

    "Revival" =  new Ability("Revival",4.374,1.5,0,180,false,false,false,"nature",40,1,
        [{type:"aoeHeal",val:2.83},{type:"gustOfMistAoe",val:0}],{}) //TODO:DISPEL

    "Essence Font" =  new Ability("Essence Font",7.2,1.5,3,12,true,false,true,"nature",30,1,
        [{type:"essenceFont",val:0.472,duration:8}],{bolts:18, hotSpellPower:0.168, last6bolts:[]})

    "Fortifying Brew" =  new Ability("Fortifying Brew",0,0,0,180,false,false,false,"physical",5,1,
        [{type:"applyBuffSelf",val:0.2,duration:15},{type:"increaseHealthSelf",val:0.2,duration:15}],{effect:[{name:"damageReduction",val:0.2},{name:"healthIncreased", val:0.2}]},true)

    "Tiger's Lust" =  new Ability("Tiger's Lust",0,1.5,0,30,false,false,false,"physical",40,1,
        [{type:"applyBuff",val:0.2,duration:6}],{effect:[{name:"moveSpeed",val:0.7}]})

    "Provoke" =  new Ability("Provoke",0,1.5,0,8,false,false,false,"physical",30,1,
        [{type:"tauntAndBuff",val:0.5,duration:8}],{effect:[{name:"moveSpeed",val:0.5}]})

    "Tiger Palm" =  new Ability("Tiger Palm",0,1.5,0,0,false,false,false,"physical",5,1,
        [{type:"damage",val:0.297297},{type:"applyBuffSelf",stacks:1,maxStacks:3,name:"Teachings of the Monastery"}],{duration:20})

    "Blackout Kick" =  new Ability("Blackout Kick",0,1.5,0,3,false,false,false,"physical",5,1,
        [{type:"damage",val:0.847},{type:"blackoutKick"}],{resetChance:0.15},false,true)

    "Rising Sun Kick" =  new Ability("Rising Sun Kick",1.5,1.5,0,12,false,false,false,"physical",5,1,
        [{type:"damage",val:(1.438/1.12)*1.7},{type:"risingMist",extendRM:4,spellPower:0.28,maxExtendRisingMist:1}],{},false,true)

    "" = {startCast:function(xd){return false},run:function(caster){},incCd:function(caster){}}
}