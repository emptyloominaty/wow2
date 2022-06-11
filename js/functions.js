let targetSelect = 0

let playerNewTarget = function(id,enemy) {
    document.getElementById("raidFrame"+targetSelect).style.outline = "0px solid #fff"
    targetSelect = id
    if (!enemy) {
        player.targetObj = raidFramesTargets[id]
        document.getElementById("raidFrame"+id).style.outline = "1px solid #fff"
    } else {
        player.targetObj = enemyTargets[id]
    }
    player.target = player.targetObj.name
}

let getChance = function(chance) {
    let rng = (Math.random()*100)
    if (rng < chance) {
        return true
    }
    return false
}

let critChance = function(caster,incCrit = 0) {
    let critChance = (Math.random()*100)
    let crit = caster.stats.crit+incCrit
    if (critChance < crit) {
        return 2
    }
    return 1
}

let doHeal = function(caster,target,ability,yOffset = 0,spellPower = 0,canCrit = true, crit100 = false,name = "",val = 0,incCrit = 0,t = "hot") {
    if (!target.isDead) {
        let crit = critChance(caster,incCrit)
        if (!canCrit) { //0% crit chance
            crit = 1
        }
        if (crit100) { //100% crit chance
            crit = 2
        }
        let heal = 0
        if (spellPower === 0) {
            heal = (caster.stats.primary * ability.spellPower) * (1 + (caster.stats.vers / 100)) * crit
        } else {
            heal = (caster.stats.primary * spellPower) * (1 + (caster.stats.vers / 100)) * crit
        }
        //TODO????
        heal = heal * target.healingIncrease

        if (val!==0) {
            heal = val
        }

        if (caster.spec==="restorationDruid") {
            heal=heal*getRestoDruidMastery(caster,target)
        } else if (caster.spec==="restorationShaman") {
            heal = heal * getRestoShamMastery(caster,target)
        }

        if (caster===player && settings.showTargetFloatingHealing) {
            target.floatingTexts.addText(heal,"heal",crit,t)
        }
        let overhealing = (target.health + heal) - target.maxHealth
        if (inCombat) {
            timelineCombatLog.heal(caster,target,ability,heal,overhealing) //TODO:NAME | if name!==""
        }
        details.doHealing(caster, heal, ability, overhealing,name)
        //leech
        if (caster.stats.leech>0 && ability.name!=="Leech") {
            caster.abilities["Leech"].startCast(caster,heal)
        }
        target.health += heal
        if (target.health > target.maxHealth) {
            target.health = target.maxHealth
        }
    }
}

let doDamage = function (caster,target,ability,yOffset = 0,spellPower = 0,canCrit = true, crit100 = false,t = "") {
    if (!target.isDead) {
        let crit = critChance(caster)
        if (!canCrit) { //0% crit chance
            crit = 1
        }
        if (crit100) { //100% crit chance
            crit = 2
        }
        let damage = 0
        if (spellPower === 0) {
            damage = (caster.stats.primary * ability.spellPower) * (1 + (caster.stats.vers / 100)) * crit
        } else {
            damage = (caster.stats.primary * spellPower) * (1 + (caster.stats.vers / 100)) * crit
        }
        damage = damage * (1-target.damageReduction)

        if (caster.spec==="assassination") {
            if (ability.poison || ability.bleed) {
                damage = damage * (1 + (caster.stats.mastery / 100))
            }
        } else if (caster.spec==="windwalker") {
            if (caster.spellHistory[0]!==ability.name) {
                damage = damage * (1 + (caster.stats.mastery / 100))
            }
        } else if (caster.spec==="arcane") { //TODO?
            damage = damage * ((1 + (caster.stats.mastery / 100))/1.2)
        } else if (caster.spec==="fury") {
            if (checkBuff(caster,caster,"Enrage")) {
                damage = damage * (1 + (caster.stats.mastery / 100))
            }
        }

        if (ability.school==="physical") {
            damage = damage * (1-(target.stats.armor/100))
            for (let i = 0; i<target.debuffs.length; i++) {
                if (target.debuffs[i].name==="Mystic Touch") {
                    damage = damage*1.05
                    break
                }
            }
        } else {
            for (let i = 0; i<target.debuffs.length; i++) {
                if (target.debuffs[i].name==="Chaos Brand") {
                    damage = damage*1.05
                    break
                }
            }
        }

        if (inCombat) {
            timelineCombatLog.damage(caster,target,ability,damage)
        }
        details.doDamage(caster, damage, ability)
        if (caster===player && settings.showTargetFloatingDamage) {
            target.floatingTexts.addText(damage,"damage",crit,ability.name,t)
        }
        //leech
        if (caster.stats.leech>0) {
            caster.abilities["Leech"].startCast(caster,damage)
        }
        target.health -= damage
        if (target.health < 0) {
            target.die()
        }
        if (target.enemy) {
            target.aggroInc(caster.id2, damage * caster.aggroMultiplier)
        }
    }
}

let applyHot = function (caster,target,ability,duration = 0,extDuration = 0,spellPowerHot = 0) {
    if (!target.isDead) {
        for (let i = 0; i<target.buffs.length; i++) {
            if (target.buffs[i].name === ability.name && target.buffs[i].caster === caster) {
                target.buffs[i].duration += ability.duration
                target.buffs[i].extendedDuration += 0
                if (target.buffs[i].duration>ability.duration*1.3) { //30%
                    target.buffs[i].duration = ability.duration*1.3
                }
                return true
            }
        }
        let spellPower = ability.spellPower
        if (spellPowerHot!==0) {
            spellPower = spellPowerHot
        }
        if (duration === 0) {
            target.buffs.push({name:ability.name, type:"hot", effect:ability.effect, effectValue:ability.effectValue, timer:0, duration:ability.duration, maxDuration:ability.duration, extendedDuration:0, spellPower:spellPower/ability.duration, caster:caster,ability:ability })
        } else {
            target.buffs.push({name:ability.name, type:"hot", effect:ability.effect, effectValue:ability.effectValue, timer:0, duration:duration, maxDuration:ability.duration, extendedDuration:extDuration, spellPower:spellPower/ability.duration, caster:caster,ability:ability })
        }
    }
}

let applyBuff = function (caster,target,ability,stacks = 1, stackable = false,name = "",duration = 0) {
    if (!target.isDead) {
        let buffName = ability.name
        if (name!=="") {
            buffName = name
        }

        for (let i = 0; i<target.buffs.length; i++) {
            if (target.buffs[i].name === buffName && target.buffs[i].caster === caster) {
                target.buffs[i].duration = ability.duration
                if (stackable) {
                    if (ability.maxStacks>target.buffs[i].stacks) {
                        target.buffs[i].stacks += stacks
                        if (ability.maxStacks<target.buffs[i].stacks) {
                            target.buffs[i].stacks = ability.maxStacks
                        }
                    }
                }
                return true
            }
        }
        if (duration === 0) {
            duration = ability.duration
        }

        target.buffs.push({name:buffName, type: "buff", effect:ability.effect, effectValue:ability.effectValue, timer:0, duration:duration, maxDuration:ability.duration, extendedDuration:0, spellPower:ability.spellPower/ability.duration, caster:caster,ability:ability, stacks:stacks })
    }
}

let applyDebuff = function (caster,target,ability,type = "debuff",stacks = 1, stackable = false,name = "") {
    if (!target.isDead) {
        let debuffName = ability.name
        if (name!=="") {
            debuffName = name
        }

        for (let i = 0; i<target.debuffs.length; i++) {
            if (target.debuffs[i].name === debuffName && target.debuffs[i].caster === caster) {
                target.debuffs[i].duration = ability.duration
                if (stackable) {
                    if (ability.maxStacks>target.debuffs[i].stacks) {
                        target.debuffs[i].stacks += stacks
                        if (ability.maxStacks<target.debuffs[i].stacks) {
                            target.debuffs[i].stacks = ability.maxStacks
                        }
                    }
                }
                return true
            }
        }
        target.debuffs.push({name:debuffName, type: type, effect:ability.effect, effectValue:ability.effectValue, timer:0, duration:ability.duration, maxDuration:ability.duration, extendedDuration:0, spellPower:ability.spellPower/ability.duration, caster:caster,ability:ability, stacks:stacks })
    }
}

let changeForm = function (caster,ability) {
    if (caster.form!==ability.name) {
        caster.form = ability.name
        caster.formEffects = ability.effects
    } else {
        caster.form = ""
        caster.formEffects = []
    }
}

let getDistance = function(target1,target2) {
    let a = target1.x - target2.x
    let b = target1.y - target2.y
    return (Math.sqrt( a*a + b*b))/22  //22 = px per meter
}

let getDirection = function(target1,target2) {
    return 360-(Math.atan2(target2.y - target1.y, target2.x - target1.x)* (180 / Math.PI)+90)
}

let findNearestEnemy = function(target1,_id  = 0) {
    if (!target1.enemy) {
        let distances = []
        for (let i = 0; i<enemyTargets.length; i++) {
            if (!enemyTargets[i].isDead) {
                distances.push({val:getDistance(target1,enemyTargets[i]),id:i})
            }
        }
        distances = distances.sort((a, b) => a.val > b.val ? 1 : -1)
        if (distances.length>0) {
            if (_id>=distances.length) {
                _id = 0
                target1.tabIdx = 0
            }
            return enemyTargets[distances[_id].id]
        }
    } else {
        let distances = []
        for (let i = 0; i<friendlyTargets.length; i++) {
            if (!friendlyTargets[i].isDead) {
                distances.push({val:getDistance(target1,friendlyTargets[i]),id:i})
            }
        }
        distances = distances.sort((a, b) => a.val > b.val ? 1 : -1)
        if (distances.length>0) {
            return friendlyTargets[distances[0].id]
        }
    }
    return false
}

let getTime = function(time) {
    let minutes = Math.floor(time / 60)
    let seconds = time % 60

    minutes = String(minutes.toFixed(0)).padStart(2, "0")
    seconds = String(seconds.toFixed(0)).padStart(2, "0")

    return minutes+":"+seconds
}

let applyDot = function (caster,target,ability,duration = 0,extDuration = 0,spellPowerDot = 0,duration2 = 0) {
    if (duration2===0) {
        duration2 = ability.duration
    }
    if (!target.isDead) {
        for (let i = 0; i<target.debuffs.length; i++) {
            if (target.debuffs[i].name === ability.name && target.debuffs[i].caster === caster) {
                target.debuffs[i].duration += duration2
                target.debuffs[i].extendedDuration += 0
                if (target.debuffs[i].duration>duration2*1.3) { //30%
                    target.debuffs[i].duration = duration2*1.3
                }
                return true
            }
        }
        let spellPower = ability.spellPower
        if (spellPowerDot!==0) {
            spellPower = spellPowerDot
        }
        if (duration === 0) {
            target.debuffs.push({name:ability.name, type:"dot", effect:ability.effect, effectValue:ability.effectValue, timer:0, duration:duration2, maxDuration:duration2, extendedDuration:0, spellPower:spellPower/duration2, caster:caster,ability:ability })
        } else {
            target.debuffs.push({name:ability.name, type:"dot", effect:ability.effect, effectValue:ability.effectValue, timer:0, duration:duration, maxDuration:duration2, extendedDuration:extDuration, spellPower:spellPower/duration2, caster:caster,ability:ability })
        }
    }
}

let setTargetAi = function(caster,target) {
    if (target) {
        caster.targetObj = target
        caster.castTarget = target
        caster.target = target.name
    }
}

let setTarget = function(caster,target) {
    caster.targetObj = target
    caster.target = target.name
}

let isEnemy = function(caster,target) {
    if (caster.enemy) {
        if (!target.enemy) {
            return true
        }
    } else {
        if (target.enemy) {
            return true
        }
    }
    return false
}

let getNumberString = function(number) {
    if (number>999999) {
        return (number/1000000).toFixed(1)+"M"
    } else if (number>999) {
        return (number/1000).toFixed(1)+"K"
    } else {
        return (number).toFixed(0)
    }
}

let getTime2 = function(number) {
    if (number>3600) {
        return (number/3600).toFixed(0)+"h"
    } else if (number>60) {
        return (number/60).toFixed(0)+"m"
    } else {
        return (number).toFixed(0)+"s"
    }
}

let spellPowerToNumber = function(val) {
    return ((player.stats.primary * val) * (1 + (player.stats.vers / 100))).toFixed(0)
}

let spellPowerHotToNumber = function(val) {
    return ((player.stats.primary * val) * (1 + (player.stats.vers / 100))* (1 + (player.stats.haste / 100))).toFixed(0)
}

let checkBuff = function(caster,target,buffName) {
    for (let i = 0; i<target.buffs.length; i++) {
        if (target.buffs[i].name===buffName && target.buffs[i].caster === caster) {
            return true
        }
    }
}

let checkDebuff = function(caster,target,buffName) {
    for (let i = 0; i<target.debuffs.length; i++) {
        if (target.debuffs[i].name===buffName && target.debuffs[i].caster === caster) {
            return true
        }
    }
}

let getRandomFriendlyTargetNear = function(caster,range,buffName,buffCaster) {
    let array = []
    for (let i = 0; i<friendlyTargets.length; i++) {
        if (!friendlyTargets[i].isDead && getDistance(caster,friendlyTargets[i])<range && !checkBuff(buffCaster,friendlyTargets[i],buffName)) {
            array.push(friendlyTargets[i])
        }
    }
    if (array.length>0) {
        let rng = Math.floor(Math.random()*array.length)
        if (rng<0) {rng=0}
        return array[rng]
    }

    return false
}