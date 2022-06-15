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

        if (target.spec==="brewmaster") {
            if (ability.name!=="Leech" && ability.name!=="Celestial Fortune") {
                target.abilities["Celestial Fortune"].heal(target,heal)
            }
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
        if (caster.stats.leech>0 && ability.name!=="Leech" && ability.name!=="Celestial Fortune") {
            caster.abilities["Leech"].startCast(caster,heal)
        }
        target.health += heal
        if (target.health > target.maxHealth) {
            target.health = target.maxHealth
        }
    }
}

let doDamage = function (caster,target,ability,yOffset = 0,spellPower = 0,canCrit = true, crit100 = false,t = "",incCrit = 0,val = 0) {
    if (!target.isDead) {
        let crit = critChance(caster,incCrit)
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

        if (val!==0) {
            damage =  val
        }
        damage = damage * (caster.damageIncrease)

        if (target.spec==="brewmaster") {
            target.abilities["Gift of the Ox"].spawnSphere(target,damage)
        }

        damage = damage * (1-target.damageReduction)
        damage = damage * (1-((target.stats.vers/100)/2))


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

        if (damageFunctions[ability.name]) {
            damage = damageFunctions[ability.name](caster,target,damage,ability)
        }

        if (ability.school==="physical") {

            //dodge
            if (ability.range<8) {
                let dodgeChance = getChance(target.stats.dodge)
                if (target.spec==="brewmaster" && ability.name!=="Stagger") {
                    if (!dodgeChance) {
                        target.abilities["Elusive Brawler"].hit(target)
                    } else {
                        target.abilities["Elusive Brawler"].resetStacks(target)
                    }
                }
                if (dodgeChance) {
                    damage = 0
                }
            }

            //armor
            damage = damage * (1-(target.stats.armor/100))

            //mystic touch
            for (let i = 0; i<target.debuffs.length; i++) {
                if (target.debuffs[i].name==="Mystic Touch") {
                    damage = damage*1.05
                    break
                }
            }
        } else {
            //chaos brand
            for (let i = 0; i<target.debuffs.length; i++) {
                if (target.debuffs[i].name==="Chaos Brand") {
                    damage = damage*1.05
                    break
                }
            }
        }

        if (damage<0) {
            damage = 0
        }

        if (target.spec==="brewmaster" && ability.name!=="Stagger") {
            damage = target.abilities["Stagger"].reduceDamage(caster,target,ability,damage)
        }

        if (ability.name!=="Stagger") {
            if (inCombat) {
                timelineCombatLog.damage(caster, target, ability, damage)
            }
            details.doDamage(caster, damage, ability)
            if (caster === player && settings.showTargetFloatingDamage) {
                target.floatingTexts.addText(damage, "damage", crit, ability.name, t)
            }

            //leech
            if (caster.stats.leech>0) {
                caster.abilities["Leech"].startCast(caster,damage)
            }
        }

        //combatlog
        details.doDamageTaken(caster, target, damage, ability)
        timelineCombatLog.takeDamage(caster, target, ability, damage)

        //absorb
        if (target.absorb>0) {
            let absorbed = damage

            damage = damage - target.absorb
            if (damage<0) {damage = 0}

            for (let b = 0; b<target.absorbsBuffId.length; b++) {
                if (target.buffs[target.absorbsBuffId[b]] && target.buffs[target.absorbsBuffId[b]].effect[0] && target.buffs[target.absorbsBuffId[b]].effect[0].name==="absorb") {
                    if (inCombat) {
                        timelineCombatLog.heal(target,target,target.buffs[target.absorbsBuffId[b]].ability,absorbed,0)
                    }
                    details.doHealing(target, absorbed, target.buffs[target.absorbsBuffId[b]].ability, 0,target.buffs[target.absorbsBuffId[b]].name)
                    if (target.buffs[target.absorbsBuffId[b]].effect[0].val>absorbed) {
                        target.buffs[target.absorbsBuffId[b]].effect[0].val -= absorbed
                        break
                    } else {
                        absorbed -= target.buffs[target.absorbsBuffId[b]].effect[0].val
                        target.buffs[target.absorbsBuffId[b]].effect[0].val = 0
                    }
                }
            }



        }

        //damage
        target.health -= damage

        if (target.health < 0) {
            target.die()
        }
        if (target.enemy) {
            target.aggroInc(caster.id2, damage * caster.aggroMultiplier)
        }
    }
}

let applyHot = function(caster,target,ability,duration = 0,extDuration = 0,spellPowerHot = 0,maxDuration = ability.duration) {
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
            target.buffs.push({name:ability.name, type:"hot", effect:ability.effect, effectValue:ability.effectValue, timer:0, duration:ability.duration, maxDuration:maxDuration, extendedDuration:0, spellPower:spellPower/ability.duration, caster:caster,ability:ability })
        } else {
            target.buffs.push({name:ability.name, type:"hot", effect:ability.effect, effectValue:ability.effectValue, timer:0, duration:duration, maxDuration:maxDuration, extendedDuration:extDuration, spellPower:spellPower/ability.duration, caster:caster,ability:ability })
        }
    }
}

let applyBuff = function (caster,target,ability,stacks = 1, stackable = false,name = "",duration = 0,extend = false) {
    if (!target.isDead) {
        let buffName = ability.name
        if (name!=="") {
            buffName = name
        }

        if (duration === 0) {
            duration = ability.duration
        }

        for (let i = 0; i<target.buffs.length; i++) {
            if (target.buffs[i].name === buffName && target.buffs[i].caster === caster) {
                if (extend) {
                    duration = duration + target.buffs[i].duration
                }
                target.buffs[i].duration = duration
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
    return (Math.sqrt( a*a + b*b))/pxToMeter
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
        return Math.round((number/1000000)*10)/10+"M"
        //return (number/1000000).toFixed(1)+"M"
    } else if (number>999) {
        return Math.round((number/1000)*10)/10+"K"
        //return (number/1000).toFixed(1)+"K"
    } else {
        return Math.round(number)
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







//https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
const pSBC=(p,c0,c1,l)=>{
    let r,g,b,P,f,t,h,i=parseInt,m=Math.round,a=typeof(c1)=="string";
    if(typeof(p)!="number"||p<-1||p>1||typeof(c0)!="string"||(c0[0]!='r'&&c0[0]!='#')||(c1&&!a))return null;
    if(!this.pSBCr)this.pSBCr=(d)=>{
        let n=d.length,x={};
        if(n>9){
            [r,g,b,a]=d=d.split(","),n=d.length;
            if(n<3||n>4)return null;
            x.r=i(r[3]=="a"?r.slice(5):r.slice(4)),x.g=i(g),x.b=i(b),x.a=a?parseFloat(a):-1
        }else{
            if(n==8||n==6||n<4)return null;
            if(n<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(n>4?d[4]+d[4]:"");
            d=i(d.slice(1),16);
            if(n==9||n==5)x.r=d>>24&255,x.g=d>>16&255,x.b=d>>8&255,x.a=m((d&255)/0.255)/1000;
            else x.r=d>>16,x.g=d>>8&255,x.b=d&255,x.a=-1
        }return x};
    h=c0.length>9,h=a?c1.length>9?true:c1=="c"?!h:false:h,f=this.pSBCr(c0),P=p<0,t=c1&&c1!="c"?this.pSBCr(c1):P?{r:0,g:0,b:0,a:-1}:{r:255,g:255,b:255,a:-1},p=P?p*-1:p,P=1-p;
    if(!f||!t)return null;
    if(l)r=m(P*f.r+p*t.r),g=m(P*f.g+p*t.g),b=m(P*f.b+p*t.b);
    else r=m((P*f.r**2+p*t.r**2)**0.5),g=m((P*f.g**2+p*t.g**2)**0.5),b=m((P*f.b**2+p*t.b**2)**0.5);
    a=f.a,t=t.a,f=a>=0||t>=0,a=f?a<0?t:t<0?a:a*P+t*p:0;
    if(h)return"rgb"+(f?"a(":"(")+r+","+g+","+b+(f?","+m(a*1000)/1000:"")+")";
    else return"#"+(4294967296+r*16777216+g*65536+b*256+(f?m(a*255):0)).toString(16).slice(1,f?undefined:-2)
}