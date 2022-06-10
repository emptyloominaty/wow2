class Ww_abilities {
    "Tiger Palm" =  new Ability("Tiger Palm",50,1,0,0,false,false,false,"physical",5,1,
        [{type:"damage",val:(0.27027)*1.55},{type:"chanceBuffSelf",chance:8,buffName:"Blackout Kick"}],{},false,false,false,-2)

    "Blackout Kick" =  new Ability("Blackout Kick",0,1,0,0,false,false,false,"physical",5,1,
        [{type:"damage",val:(0.565*2)*1.70},{type:"blackoutKick"}],{},false,true,false,1)

    "Rising Sun Kick" =  new Ability("Rising Sun Kick",0,1,0,10,false,false,false,"physical",5,1,
        [{type:"damage",val:((0.959 * 2)*1.7)*1.67},{type:"risingMist",extendRM:4,spellPower:0.28,maxExtendRisingMist:1}],{},false,true,false,2)

    "Provoke" =  new Ability("Provoke",0,1,0,8,false,false,false,"physical",30,1,
        [{type:"tauntAndBuff",val:0.5,duration:8}],{effect:[{name:"moveSpeed",val:0.5}]},true,false,false)


    "" = {startCast:function(xd){return false},run:function(caster){},incCd:function(caster){}}
}