class Bm_abilities {
    "Tiger Palm" =  new Ability("Tiger Palm",25,1,0,0,false,false,false,"physical",5,1,
        [{type:"damage",val:0.27027}],{},false,false,false)

    "Blackout Kick" =  new Ability("Blackout Kick",0,1,0,3,false,false,false,"physical",5,1,
        [{type:"damage",val:0.847*1.11}],{},false,true,false)

    "Provoke" =  new Ability("Provoke",0,1,0,8,false,false,false,"physical",30,1,
        [{type:"tauntAndBuff",val:0.5,duration:8}],{effect:[{name:"moveSpeed",val:0.5}]},true,false,false)

    "" = {startCast:function(xd){return false},run:function(caster){},incCd:function(caster){}}
}