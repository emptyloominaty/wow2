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

let critChance = function(caster) {
    let critChance = (Math.random()*100)
    if (critChance < caster.stats.crit) {
        return 2
    }
    return 1
}

let doHeal = function(caster,target,ability,yOffset = 0,spellPower = 0) {
    if (!target.isDead) {
        let crit = critChance(caster)
        let heal = 0
        if (spellPower === 0) {
            heal = (caster.stats.primary * ability.spellPower) * (1 + (caster.stats.vers / 100)) * crit
        } else {
            heal = (caster.stats.primary * spellPower) * (1 + (caster.stats.vers / 100)) * crit
        }
        //TODO????
        heal = heal * target.healingIncrease

        if (caster === player && settings.showFloatingAbility) {
            if (floatingTextIdx < 1000) {
                floatingTextIdx++
            } else {
                floatingTextIdx = 0
            }
            floatingTexts[floatingTextIdx] = (new FloatingText(300, 350 + yOffset, heal, "heal", crit, ability.name, floatingTextIdx))
        }

        let overhealing = (target.health + heal) - target.maxHealth
        details.doHealing(caster, heal, ability, overhealing)
        target.health += heal
        if (target.health > target.maxHealth) {
            target.health = target.maxHealth
        }
    }
}

let doDamage = function (caster,target,ability,yOffset = 0,spellPower = 0,canCrit = true) {
    if (!target.isDead) {
        let crit = critChance(caster)
        if (!canCrit) {
            crit = 1
        }
        let damage = 0
        if (spellPower === 0) {
            damage = (caster.stats.primary * ability.spellPower) * (1 + (caster.stats.vers / 100)) * crit
        } else {
            damage = (caster.stats.primary * spellPower) * (1 + (caster.stats.vers / 100)) * crit
        }

        if (caster === player && settings.showFloatingAbility) {
            if (floatingTextIdx < 1000) {
                floatingTextIdx++
            } else {
                floatingTextIdx = 0
            }
            floatingTexts[floatingTextIdx] = (new FloatingText(300, 350 + yOffset, damage, "damage", crit, ability.name, floatingTextIdx))
        }


        details.doDamage(caster, damage, ability)
        target.health -= damage
        if (target.health < 0) {
            target.health = 0
            target.isDead = true
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

let applyBuff = function (caster,target,ability,stacks = 1, stackable = false,name = "") {
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
        target.buffs.push({name:buffName, type:"buff", effect:ability.effect, effectValue:ability.effectValue, timer:0, duration:ability.duration, maxDuration:ability.duration, extendedDuration:0, spellPower:ability.spellPower/ability.duration, caster:caster,ability:ability, stacks:stacks })
    }
}

let getDistance = function(target1,target2) { //TODO IN ABILITIES
    let a = target1.x - target2.x
    let b = target1.y - target2.y
    return (Math.sqrt( a*a + b*b))/22  //22 = px per meter
}

let getDirection = function(target1,target2) {
    return 360-(Math.atan2(target2.y - target1.y, target2.x - target1.x)* (180 / Math.PI)+90)
}

let findNearestEnemy = function(target1) {
    if (!target1.enemy) {
        let distances = []
        for (let i = 0; i<enemyTargets.length; i++) {
            if (!enemyTargets[0].isDead) {
                distances.push({val:getDistance(target1,enemyTargets[i]),id:i})
            }
        }
        distances = distances.sort((a, b) => a.val > b.val ? 1 : -1)
        if (distances.length>0) {
            return enemyTargets[distances[0].id]
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

let  getTime = function(time) {
    let minutes = Math.floor(time / 60)
    let seconds = time % 60

    minutes = String(minutes.toFixed(0)).padStart(2, "0")
    seconds = String(seconds.toFixed(0)).padStart(2, "0")

    return minutes+":"+seconds
}

let details = { //TODO
    doHealing: function(caster,val,ability,overhealing) {
        if (overhealing>0) {
            caster.healingDone+=val-overhealing
        } else {
            caster.healingDone+=val
        }
    },
    doDamage: function(caster,val,ability) {
        caster.damageDone+=val
    },
    takeDamage: function() {

    }
}