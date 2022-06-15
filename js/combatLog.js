let timelineCombatLog = {
    timer:0,
    timerNext:1,
    prevOffset: 0,

    healThisSec:[],
    damageThisSec:[],
    damageTakenThisSec:[],

    healTimeline:[],
    damageTimeline:[],
    damageTakenTimeline:[],

    healAll:[], //TODO ? ? ?
    damageAll:[], //TODO ? ? ?
    damageTakenAll:[],


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
    takeDamage:function(caster,target,ability,val) {
        if (this.damageTakenThisSec[target.id]===undefined) {
            this.damageTakenThisSec[target.id] = {}
        }
        if (this.damageTakenThisSec[target.id][ability.name]===undefined) {
            this.damageTakenThisSec[target.id][ability.name] = []
        }
        this.damageTakenThisSec[target.id][ability.name].push({val:val})
    },
    run:function(){
        this.timer+=progressInSec
        if (this.timer>=this.timerNext) {
            //----------------------------------------------------------------DAMAGE
            let yOffset = 0
            if (this.prevOffset>75) {
                yOffset= this.prevOffset-75
            }
            for (let i = 0; i<this.damageThisSec.length;i++) {
                if (this.damageThisSec[i]===undefined) {
                    continue
                }

                if (this.damageTimeline[i]===undefined) {
                    this.damageTimeline[i] = {}
                }

                Object.keys(this.damageThisSec[i]).forEach((key)=> {
                    if (this.damageTimeline[i][key]===undefined) {
                        this.damageTimeline[i][key] = []
                    }
                    if (this.damageTimeline[i][key][Math.floor(this.timer)]===undefined) {
                        this.damageTimeline[i][key][Math.floor(this.timer)] = 0
                    }

                    for (let j = 0; j<this.damageThisSec[i][key].length;j++) {
                        this.damageTimeline[i][key][Math.floor(this.timer)] += this.damageThisSec[i][key][j].val
                    }

                    if (i === 0 && settings.showFloatingAbility) {
                        if (floatingTextIdx < 40) {
                            floatingTextIdx++
                        } else {
                            floatingTextIdx = 0
                        }
                        floatingTexts[floatingTextIdx] = (new FloatingText(300, yOffset, this.damageTimeline[i][key][Math.floor(this.timer)], "damage", 1, key, floatingTextIdx))
                        yOffset+=15
                    }

                })
            }
            this.damageThisSec = []

            //----------------------------------------------------------------HEAL
            for (let i = 0; i<this.healThisSec.length;i++) {
                if (this.healThisSec[i]===undefined) {
                    continue
                }
                if (this.healTimeline[i]===undefined) {
                    this.healTimeline[i] = {}
                }
                Object.keys(this.healThisSec[i]).forEach((key) => {
                    if (this.healTimeline[i][key]===undefined) {
                        this.healTimeline[i][key] = []
                    }
                    if (this.healTimeline[i][key][Math.floor(this.timer)]===undefined) {
                        this.healTimeline[i][key][Math.floor(this.timer)] = 0
                    }
                    for (let j = 0; j<this.healThisSec[i][key].length;j++) {
                        if (this.healThisSec[i][key][j].overheal>0) {
                            this.healTimeline[i][key][Math.floor(this.timer)] += this.healThisSec[i][key][j].val-this.healThisSec[i][key][j].overheal
                        } else {
                            this.healTimeline[i][key][Math.floor(this.timer)] += this.healThisSec[i][key][j].val
                        }
                    }

                    if (i === 0 && settings.showFloatingAbility) {
                        if (floatingTextIdx < 40) {
                            floatingTextIdx++
                        } else {
                            floatingTextIdx = 0
                        }
                        floatingTexts[floatingTextIdx] = (new FloatingText(300, yOffset,this.healTimeline[i][key][Math.floor(this.timer)], "heal", 1, key, floatingTextIdx))
                        yOffset+=15
                    }

                })
            }
            this.prevOffset = yOffset
            this.healThisSec = []
            //----------------------------------------------------------------Damage Taken
            for (let i = 0; i<this.damageTakenThisSec.length;i++) {
                if (this.damageTakenThisSec[i]===undefined) {
                    continue
                }

                if (this.damageTakenTimeline[i]===undefined) {
                    this.damageTakenTimeline[i] = {}
                }

                Object.keys(this.damageTakenThisSec[i]).forEach((key)=> {
                    if (this.damageTakenTimeline[i][key]===undefined) {
                        this.damageTakenTimeline[i][key] = []
                    }
                    if (this.damageTakenTimeline[i][key][Math.floor(this.timer)]===undefined) {
                        this.damageTakenTimeline[i][key][Math.floor(this.timer)] = 0
                    }

                    for (let j = 0; j<this.damageTakenThisSec[i][key].length;j++) {
                        this.damageTakenTimeline[i][key][Math.floor(this.timer)] += this.damageTakenThisSec[i][key][j].val
                    }

                })
            }
            this.damageTakenThisSec = []



            this.timerNext++
        }
    },

    start:function(){
        for (let i = 0; i<creatures.length; i++) {
            this.healTimeline.push({})
            this.damageTimeline.push({})
        }
    }
}

timelineCombatLog.start()

let castCombatLog = {
    castsTimeline:[],
    cast:function(caster,ability) {
        if (this.castsTimeline[caster.id]===undefined) {
            this.castsTimeline[caster.id] = []
        }
        this.castsTimeline[caster.id].push({ability:ability.name,time:combatTime})

    },
}