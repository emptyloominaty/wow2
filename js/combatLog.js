let timelineCombatLog = {
    timer:0,
    timerNext:1,

    healThisSec:[],
    damageThisSec:[],

    healTimeline:[],
    damageTimeline:[],

    healAll:[], //TODO ? ? ?
    damageAll:[], //TODO ? ? ?


    heal:function(caster,target,ability,val,overheal){
        if (this.healThisSec[caster.id]===undefined) {
            this.healThisSec[caster.id] = {}
        }
        if (this.healThisSec[caster.id][ability.name]===undefined) {
            this.healThisSec[caster.id][ability.name] = []
        }

        this.healThisSec[caster.id][ability.name].push({val:val,overheal:overheal})
    },
    damage:function(caster,target,ability,val) {
        if (this.damageThisSec[caster.id]===undefined) {
            this.damageThisSec[caster.id] = {}
        }
        if (this.damageThisSec[caster.id][ability.name]===undefined) {
            this.damageThisSec[caster.id][ability.name] = []
        }
        this.damageThisSec[caster.id][ability.name].push({val:val})
    },

    run:function(){
        this.timer+=progressInSec
        if (this.timer>=this.timerNext) {

            let damageThisSec = this.damageThisSec
            Object.keys(this.damageThisSec).forEach(function(key) {
                console.log(key, damageThisSec[key])
            })
            this.damageThisSec = []

            let healThisSec = this.healThisSec
            Object.keys(this.healThisSec).forEach(function(key) {
                console.log(key, healThisSec[key])

            })
            this.healThisSec = []

            this.timerNext++
        }
    },

    start:function(){
        for (let i = 0; i<creatures.length; i++) {
            this.healAll.push({})
            this.damageAll.push({})
        }
    }
}

timelineCombatLog.start()

let castCombatLog = {
    castsTimeline:[],
    cast:()=>{},
}