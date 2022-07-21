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
        if (caster.spec==="elemental") {
            return caster.abilities["Elemental Fury"].critChance()
        }
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

        heal = heal * target.healingIncrease

        if (val!==0) {
            heal = val
        }

        if (caster.spec==="restorationDruid") {
            heal = heal * getRestoDruidMastery(caster,target)
            for (let i = 0; i<target.buffs.length; i++) {
                if (target.buffs[i].name === "Ironbark" && target.buffs[i].caster === caster) {
                    heal = heal * 1.2
                }
            }
            if (ability.name==="Lifebloom") {
                if (getChance(4)) {
                    applyBuff(caster,caster,caster.abilities["Clearcasting"])
                }
            }
            if (caster.abilities["Incarnation: Tree of Life"].talentSelect && checkBuff(caster,caster,"Incarnation: Tree of Life")) {
                heal *= 1.15
            }
            if (caster.abilities["Flourish"].talentSelect && t===true && checkBuff(caster,caster,"Flourish")) {
                heal *= 2
            }
        } else if (caster.spec==="restorationShaman") {
            heal = heal * getRestoShamMastery(caster,target)
            caster.abilities["Cloudburst Totem"].addHealing(heal,ability)
            if (crit>1 && t!==true) {
                caster.abilities["Resurgence"].refundMana(caster,ability)
            }
            if (ability.name!=="Ascendance" && ability.name!=="Leech") {
                caster.abilities["Ascendance"].heal(caster,heal)
            }
        } else if (caster.spec==="mistweaver") {
            if (ability.name!=="Enveloping Mist" || ability.name!=="Enveloping Breath") {
                for (let i = 0; i<target.buffs.length; i++) {
                    if ((target.buffs[i].name === "Enveloping Mist" || target.buffs[i].name === "Enveloping Breath" ) && target.buffs[i].caster === caster) {
                        heal = heal * (1+target.buffs[i].effect[0].val)
                    }
                }
            }
        } else if (caster.spec==="holyPriest") {
            if (caster.abilities["Renewed Faith"].talentSelect) {
                heal *= 1.1
            }
        } else if (caster.spec==="discipline") {
            if (checkBuff(caster,target,"Atonement")) {
                heal *= (1+(caster.stats.mastery/100))
            }
            if (caster.abilities["Twist of Fate"].talentSelect) {
                if (target.health/target.maxHealth<0.35) {
                    applyBuff(caster,caster,caster.abilities["Twist of Fate"])
                }
            }
        } else if (caster.spec==="holyPaladin") {
            heal *= caster.abilities["Lightbringer"].increaseHealing(caster,target)

            if (caster.abilities["Beacon of Light"].currentTarget && ability.name!=="Leech" && ability.name!=="Beacon of Light" && ability.name!=="Lay on Hands" && ability.name!=="Light of the Martyr") {
                if (caster.abilities["Beacon of Light"].currentTarget===target) {
                    if (ability.name==="Flash of Light" || ability.name==="Holy Light") {
                        caster.useEnergy(0,-1)
                    }
                } else {
                    doHeal(caster,caster.abilities["Beacon of Light"].currentTarget,caster.abilities["Beacon of Light"],undefined,undefined,false,undefined,undefined,heal*0.5)
                }
            }
            if (ability.name==="Holy Shock" && crit>1) {
                applyBuff(caster,caster,caster.abilities["Infusion of Light"])
            }

        }

        if (target.spec==="brewmaster") {
            if (ability.name!=="Leech" && ability.name!=="Celestial Fortune") {
                target.abilities["Celestial Fortune"].heal(target,heal)
            }
        }

        if (caster===player && settings.showTargetFloatingText) {
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

let doDamage = function (caster,target,ability,yOffset = 0,spellPower = 0,canCrit = true, crit100 = false,t = "",incCrit = 0,val = 0,name = "") {
    if (!target.isDead) {

        if (name==="") {
            name = ability.name
        }

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
        } else if (target.spec==="vengeance") {
            target.abilities["Soul Fragment"].damageLast5Sec[target.abilities["Soul Fragment"].idx] += damage
            if (checkDebuff(target,caster,"Fiery Brand")) {
                damage *= 0.6
            }
            if (target.abilities["Void Reaver"].talentSelect && checkDebuff(target,caster,"Void Reaver")) {
                damage *= 0.94
            }
        } else if (target.spec==="blood") {
            if (ability.range<6) {
                for (let i = 0; i<target.buffs.length; i++) {
                    if (target.buffs[i].name==="Bone Shield") {
                        if(target.abilities["Blood Tap"].talentSelect) {
                            target.abilities["Blood Tap"].incCd(target,2,false)
                        }

                        if (target.buffs[i].stacks>1) {
                            target.buffs[i].stacks --
                        } else {
                            target.buffs[i].duration = -1
                        }
                        break
                    }
                }
            }
            if (target.abilities["Will of the Necropolis"].talentSelect && target.health/target.maxHealth<0.3) {
                damage *= 0.7
            }
        }

        damage = damage * (1-target.damageReduction)
        damage = damage * (1-((target.stats.vers/100)/2))
        if (ability.aoe) {
            damage = damage * (1-(target.stats.avoidance/100))
        }

        if (damageFunctions[ability.name]) {
            damage = damageFunctions[ability.name](caster,target,damage,ability)
        }

        if (!caster.enemy) {
            if (caster.spec === "assassination") {
                if (ability.poison || ability.bleed) { //TODO:MASTERY PASSIVE ?
                    damage = damage * (1 + (caster.stats.mastery / 100))
                }
                if (ability.bleed) {
                    caster.abilities["Venomous Wounds"].gainEnergy(caster)
                }
                if (ability.secCost < 0 && crit > 1) {
                    caster.abilities["Seal Fate"].gainCombo(caster)
                }
                if (checkDebuff(caster, target, "Vendetta")) {
                    damage *= 1.3
                }
                if (caster.abilities["Deeper Stratagem"].talentSelect && (ability.name === "Rupture" || ability.name === "Envenom" || ability.name === "CrimsonTempest")) {
                    damage *= 1.05
                }
                if (caster.abilities["Exsanguinate"].talentSelect && checkDebuff(caster, target, "Venom Rush") && (ability.name === "Garrote" || ability.name === "Rupture" || ability.name === "InternalBleeding" || ability.name === "CrimsonTempest")) {
                    damage = damage * 2
                }
            } else if (caster.spec === "windwalker" && ability.name !== "Auto Attack" && !t) {
                if (caster.spellHistory[0] !== ability.name) {
                    damage = damage * (1 + (caster.stats.mastery / 100))
                }
                if (checkBuff(caster, caster, "Invoke Xuen, the White Tiger")) {
                    caster.abilities["Invoke Xuen, the White Tiger"].storeDamage(caster, damage)
                }
            } else if (caster.spec === "arcane") {
                if (ability.name !== "Arcane Blast" && ability.name !== "Arcane Barrage")
                    damage = damage * (1 + (((caster.stats.mastery / 100) * caster.secondaryResource)) / 1.2)
                if (checkDebuff(caster, target, "Touch of the Magi")) {
                    caster.abilities["Touch of the Magi"].damageDealt += damage
                    if (caster.abilities["Arcane Echo"].talentSelect && ability.name !== "Arcane Echo") {
                        caster.abilities["Arcane Echo"].doDamage(caster, target)
                    }
                }
                if (caster.abilities["Enlightened"].talentSelect) {
                    if (caster.energy / caster.maxEnergy > 0.7) {
                        damage *= 1.08
                    }
                }
            } else if (caster.spec === "fury") {
                if (checkBuff(caster, caster, "Enrage")) {
                    damage = damage * (1 + (caster.stats.mastery / 100))
                }
                if (caster.abilities["Sudden Death"].talentSelect) {
                    if (getChance(5 * (1 + (caster.stats.haste / 100)))) {
                        applyBuff(caster, caster, caster.abilities["Sudden Death"])
                        caster.abilities["Execute"].cd = caster.abilities["Execute"].maxCd
                    }
                }
            } else if (caster.spec === "elemental") {
                caster.abilities["Elemental Overload"].mastery_(caster, target, ability, name)
                if (caster.abilities["Ancestral Guidance"].talentSelect && checkBuff(caster, caster, "Ancestral Guidance")) {
                    caster.abilities["Ancestral Guidance"].collectHeal(damage)
                }
                if (caster.abilities["Echoing Shock"].talentSelect && checkBuff(caster, caster, "Echoing Shock")) {
                    if (ability.name !== "Flame Shock" && ability.name !== "Elemental Overload" || ability.name !== "Earthquake") {
                        caster.abilities["Echoing Shock"].abilityCast = ability.name
                        caster.abilities["Echoing Shock"].target = target
                        caster.abilities["Echoing Shock"].removeBuff(caster)
                    }
                }
            } else if (caster.spec === "havoc") {
                if (ability.school === "chaos") {
                    damage = damage * (1 + (caster.stats.mastery / 100))
                }
            } else if (caster.spec === "vengeance") {
                if (caster.abilities["Spirit Bomb"].talentSelect && checkDebuff(caster, target, "Frailty")) {
                    doHeal(caster, target, caster.abilities["Spirit Bomb"], undefined, undefined, undefined, undefined, undefined, damage * 0.1)
                }
            } else if (caster.spec === "discipline") {
                if (checkDebuff(caster, target, "Schism")) {
                    damage = damage * 1.25
                }
                for (let i = 0; i < friendlyTargets.length; i++) {
                    for (let j = 0; j < friendlyTargets[i].buffs.length; j++) {
                        if (friendlyTargets[i].buffs[j].name === "Atonement" && friendlyTargets[i].buffs[j].caster === caster) {
                            caster.abilities["Atonement"].heal(caster, friendlyTargets[i], damage)
                        }
                    }
                }
            } else if (caster.spec === "holyPaladin") {
                if (caster.abilities["Avenging Crusader"].talentSelect && checkBuff(caster,caster,"Avenging Crusader")) {
                    if (ability.name==="Judgment" || ability.name === "Crusader Strike") {
                        let heal = damage * 2.5
                        let targets = sortFriendlyTargetsByHealth(true)
                        let ttt = 0
                        for (let i = 0; i<targets.length; i++) {
                            if (!targets[i].isDead && getDistance(caster,targets[i])<10) {
                                doHeal(caster,targets[i],caster.abilities["Avenging Crusader"],undefined,undefined,undefined,undefined,undefined,heal)
                                ttt++
                                if (ttt>=3) {
                                    break
                                }
                            }
                        }
                    }
                }
            } else if (caster.spec==="retribution") {
                if (ability.school === "holy") {
                    damage = damage * (1 + (caster.stats.mastery / 100))
                }
                if (caster.abilities["Final Reckoning"].talentSelect && caster.abilities["Final Reckoning"].cd<caster.abilities["Final Reckoning"].maxCd && ability.name!=="Final Reckoning") {
                    if (getChance(11.1*(1+(caster.stats.haste/100)))) {
                        doDamage(caster,target,caster.abilities["Final Reckoning"],undefined,caster.abilities["Final Reckoning"].spellPower2)
                    }
                }
            } else if (caster.spec==="arms") {
                if (checkDebuff(caster, target, "Colossus Smash")) { //TODO: DEBUFFS O
                    damage *= 1.3
                }
                if (checkDebuff(caster, target, "Warbreaker")) {
                    damage *= 1.3
                }
                if (checkDebuff(caster,target,"Deep Wounds")) {
                    damage = damage * (1 + (caster.stats.mastery / 100))
                }
                if (checkDebuff(caster,target,"Rend")) {
                    if (crit>1) {
                        damage *= 1.1
                    }
                }
                if (caster.abilities["Sudden Death"].talentSelect) {
                    if (getChance(5 * (1 + (caster.stats.haste / 100)))) {
                        applyBuff(caster, caster, caster.abilities["Sudden Death"])
                    }
                }
            } else if (caster.spec==="protectionWarrior") {
                if (caster.abilities["Booming Voice"].talentSelect && checkDebuff(caster,target,"Demoralizing Shout")) {
                    damage *= 1.2
                }
            } else if (caster.spec==="frostDk") {
                if (ability.school==="frost") {
                    damage = damage * (1 + (caster.stats.mastery / 100))
                }
            }
        }

        //darkness
        if (!target.enemy) {
            for (let i = 0; i<target.buffs.length; i++) {
                if (target.buffs[i].name==="Darkness") {
                    if (getChance(20)) {
                        damage = 0
                    }
                }
            }
        } else {
            for (let i = 0; i<target.debuffs.length; i++) {
                if (target.debuffs[i].name==="Judgment of Light" && caster.health<caster.maxHealth) {
                    doHeal(target.debuffs[i].caster,caster,target.debuffs[i].caster.abilities["Judgment of Light"])
                    target.debuffs[i].effect[0].val--
                    if (target.debuffs[i].effect[0].val<=0) {
                        target.debuffs[i].duration = -1
                    }
                }
            }
        }

        if (ability.school==="physical") {
            if (caster.battleShout) {
                damage = damage * 1.05
            }

            if (target.stats.block>0) {
                let block = target.stats.block
                let blockVal = 0.7
                if (block>100) {
                    blockVal = 1-((block/100)*0.3)
                }
                if (getChance(block)) {
                    damage = damage * blockVal
                    if (target.spec==="protectionPaladin" && target.abilities["Holy Shield"].talentSelect) {
                        doDamage(target,caster,target.abilities["Holy Shield"])
                    }

                }
            }


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
                    if (target.spec==="protectionPaladin" && getChance(15)) {
                        target.abilities["Avenger's Shield"].cd = target.abilities["Avenger's Shield"].maxCd
                    }
                }
            }

            //armor
            if (!ability.ignoreArmor) {
                damage = damage * (1-(target.stats.armor/100))
            }

            damage = damage * (1-target.physicalDamageReduction)
            damage = damage * (target.physicalDamageTaken)

            //mystic touch
            if (caster.class === "Monk" && caster!==target) {
                let mt = true
                for (let i = 0; i<target.debuffs.length; i++) {
                    if (target.debuffs[i].name==="Mystic Touch") {
                        mt = false
                        break
                    }
                }
                if (mt) {
                    applyDebuff(caster,target,caster.abilities["Mystic Touch"])
                }
            }
        } else {
            damage = damage * (1-target.magicDamageReduction)
            damage = damage * (target.magicDamageTaken)
            //chaos brand
            if (caster.class === "Demon Hunter"  && caster!==target) {
                let cb = true
                for (let i = 0; i<target.debuffs.length; i++) {
                    if (target.debuffs[i].name==="Chaos Brand") {
                        cb = false
                        break
                    }
                }
                if (cb) {
                    applyDebuff(caster,target,caster.abilities["Chaos Brand"])
                }
            }
        }

        if (damage<0) {
            damage = 0
        }

        if (target.spec==="brewmaster" && ability.name!=="Stagger") {
            damage = target.abilities["Stagger"].reduceDamage(caster,target,ability,damage)
        } else if (target.spec==="holyPriest") {
            if (target.abilities["Angel's Mercy"].talentSelect) {
                target.abilities["Angel's Mercy"].takeDamage(target,damage)
            }
        } else if (target.class === "Death Knight") {
            target.abilities["Death Strike"].damageLast5Sec[target.abilities["Death Strike"].idx] += damage
        }

        //PET
        if (caster.spec==="pet") {
            caster = caster.caster
            if (caster.spec==="discipline") {
                for (let i = 0; i<friendlyTargets.length; i++) {
                    for (let j = 0; j<friendlyTargets[i].buffs.length; j++) {
                        if (friendlyTargets[i].buffs[j].name==="Atonement" && friendlyTargets[i].buffs[j].caster === caster) {
                            caster.abilities["Atonement"].heal(caster,friendlyTargets[i],damage)
                        }
                    }
                }
            }
        }


        if (ability.name!=="Stagger" && ability.name!=="Shadow Mend") {
            if (inCombat) {
                timelineCombatLog.damage(caster, target, ability, damage)
            }
            details.doDamage(caster, damage, ability)
            if (caster === player && settings.showTargetFloatingText) {
                target.floatingTexts.addText(damage, "damage", crit, name, t)
            }

            //leech
            if (caster.stats.leech>0) {
                caster.abilities["Leech"].startCast(caster,damage)
            }
        }

        if (target.isIncapacitated) {
            target.isStunned = false
            target.isIncapacitated = false
            for (let i = 0; i<target.debuffs.length; i++) {
                for (let j = 0; j < target.debuffs[i].effect.length; j++) {
                    if (target.debuffs[i].effect[j].name === "incapacitate") {
                        target.debuffs[i].duration = -1
                    }
                }
            }
        }
        if (target.isRooted && damage>1000) { //TODO? damage?
            target.isRooted = false
            for (let i = 0; i<target.debuffs.length; i++) {
                for (let j = 0; j < target.debuffs[i].effect.length; j++) {
                    if (target.debuffs[i].effect[j].name === "root") {
                        target.debuffs[i].duration = -1
                    }
                }
            }
        }

        //combatlog
        details.doDamageTaken(caster, target, damage, ability)
        timelineCombatLog.takeDamage(caster, target, ability, damage)

        //absorb
        if (target.absorb>0) {
            let absorbed = damage

            damage = damage - target.absorb
            if (damage<0) {
                damage = 0
            } else {
                absorbed -= damage
            }

            for (let b = 0; b<target.absorbsBuffId.length; b++) {
                if (target.buffs[target.absorbsBuffId[b]] && target.buffs[target.absorbsBuffId[b]].effect[0] && target.buffs[target.absorbsBuffId[b]].effect[0].name==="absorb") {
                    if (inCombat) {
                        timelineCombatLog.heal(target.buffs[target.absorbsBuffId[b]].caster,target,target.buffs[target.absorbsBuffId[b]].ability,absorbed,0)
                    }
                    details.doHealing(target.buffs[target.absorbsBuffId[b]].caster, absorbed, target.buffs[target.absorbsBuffId[b]].ability, 0,target.buffs[target.absorbsBuffId[b]].name)
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

        //magic absorb
        if (ability.school!=="physical" && target.magicabsorb>0) {
            let absorbed = damage

            damage = damage - target.magicabsorb
            if (damage<0) {
                damage = 0
            } else {
                absorbed -= damage
            }

            for (let b = 0; b<target.magicabsorbsBuffId.length; b++) {
                if (target.buffs[target.magicabsorbsBuffId[b]] && target.buffs[target.magicabsorbsBuffId[b]].effect[0] && target.buffs[target.magicabsorbsBuffId[b]].effect[0].name==="magicabsorb") {
                    if (inCombat) {
                        timelineCombatLog.heal(target.buffs[target.magicabsorbsBuffId[b]].caster,target,target.buffs[target.magicabsorbsBuffId[b]].ability,absorbed,0)
                    }
                    details.doHealing(target.buffs[target.magicabsorbsBuffId[b]].caster, absorbed, target.buffs[target.magicabsorbsBuffId[b]].ability, 0,target.buffs[target.magicabsorbsBuffId[b]].name)
                    if (target.buffs[target.magicabsorbsBuffId[b]].effect[0].val>absorbed) {
                        target.buffs[target.magicabsorbsBuffId[b]].effect[0].val -= absorbed
                        break
                    } else {
                        absorbed -= target.buffs[target.magicabsorbsBuffId[b]].effect[0].val
                        target.buffs[target.magicabsorbsBuffId[b]].effect[0].val = 0
                    }
                }
            }
        }


        caster.inCombat = true
        target.inCombat = true

        //damage
        target.health -= damage

        if (target.health < 0) {
            target.die()
        }
        if (target.enemy) {

            target.aggroInc(caster.id2, damage * caster.aggroMultiplier * ability.threat)
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
            target.buffs.push({name:ability.name,school:ability.school, type:"hot", effect:JSON.parse(JSON.stringify(ability.effect)), effectValue:ability.effectValue, timer:0, duration:ability.duration, maxDuration:maxDuration, extendedDuration:0, spellPower:spellPower/ability.duration, caster:caster,ability:ability })
        } else {
            target.buffs.push({name:ability.name,school:ability.school, type:"hot", effect:JSON.parse(JSON.stringify(ability.effect)), effectValue:ability.effectValue, timer:0, duration:duration, maxDuration:maxDuration, extendedDuration:extDuration, spellPower:spellPower/ability.duration, caster:caster,ability:ability })
        }
    }
}

let applyBuff = function (caster,target,ability,stacks = 1, stackable = false,name = "",duration = 0,extend = false,dontRefresh = false,type="buff",reapply = false) {
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
                if (!dontRefresh) {
                    target.buffs[i].duration = duration
                }
                if (stackable) {
                    target.buffs[i].stacks += stacks
                    if (ability.maxStacks<target.buffs[i].stacks) {
                        target.buffs[i].stacks = ability.maxStacks
                    }
                    if (target.buffs[i].stacks<1) {
                        target.buffs[i].stacks = 1
                    }
                }
                if (reapply) {
                    target.buffs.splice(i, 1)
                } else {
                    return true
                }
            }
        }


        target.buffs.push({name:buffName, type: type, effect:JSON.parse(JSON.stringify(ability.effect)), effectValue:ability.effectValue, timer:0, duration:duration, maxDuration:ability.duration, extendedDuration:0, spellPower:ability.spellPower/ability.duration, caster:caster,ability:ability, stacks:stacks })
    }
}

let applyDebuff = function (caster,target,ability,type = "debuff",stacks = 1, stackable = false,name = "",duration = 0) {
    if (!target.isDead) {
        let debuffName = ability.name
        if (name!=="") {
            debuffName = name
        }

        if (target.immuneToMagic) {
            return false
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

        if (duration===0) {
            duration = ability.duration
        }

        target.debuffs.push({name:debuffName, type: type, effect:JSON.parse(JSON.stringify(ability.effect)), effectValue:ability.effectValue, timer:0, duration:duration, maxDuration:ability.duration, extendedDuration:0, spellPower:ability.spellPower/ability.duration, caster:caster,ability:ability, stacks:stacks })
    }
}

let changeForm = function (caster,ability) {
    if (caster.form!==ability.name) {
        caster.form = ability.name
        caster.formEffects = ability.effects
        return true
    } else {
        caster.form = ""
        caster.formEffects = []
        return false
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
            if (!enemyTargets[i].isDead && !enemyTargets[i].isStealthed) {
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
            if (!friendlyTargets[i].isDead && !friendlyTargets[i].isStealthed) {
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

    if (target.immuneToMagic) {
        return false
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

        if (target.isReflectingSpell) {
            for (let i = 0; i<target.buffs.length; i++) {
                for (let j = 0; j<target.buffs[i].effect.length; j++) {
                    if (target.buffs[i].effect[j].name==="reflectSpell") {
                        if (target.buffs[i].effect[j].removeOnReflect) {
                            target.buffs[i].duration = -1
                        }
                        target = caster
                        break
                    }
                }
            }
        }

        if (duration === 0) {
            target.debuffs.push({name:ability.name, type:"dot", effect:JSON.parse(JSON.stringify(ability.effect)), effectValue:ability.effectValue, timer:0, duration:duration2, maxDuration:duration2, extendedDuration:0, spellPower:spellPower/duration2, caster:caster,ability:ability })
        } else {
            target.debuffs.push({name:ability.name, type:"dot", effect:JSON.parse(JSON.stringify(ability.effect)), effectValue:ability.effectValue, timer:0, duration:duration, maxDuration:duration2, extendedDuration:extDuration, spellPower:spellPower/duration2, caster:caster,ability:ability })
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

let spellPowerToNumber = function(val,caster = player) {
    return ((caster.stats.primary * val) * (1 + (caster.stats.vers / 100))).toFixed(0)
}

let spellPowerHotToNumber = function(val,caster = player) {
    return ((caster.stats.primary * val) * (1 + (caster.stats.vers / 100))* (1 + (caster.stats.haste / 100))).toFixed(0)
}

let checkBuff = function(caster,target,buffName,remove = false) {
    for (let i = 0; i<target.buffs.length; i++) {
        if (target.buffs[i].name===buffName && target.buffs[i].caster === caster) {
            if (remove) {
                target.buffs[i].duration = -1
            }
            return true
        }
    }
}

let checkBuffStacks = function(caster,target,buffName) {
    let remove = true
    for (let i = 0; i<target.buffs.length; i++) {
        if (target.buffs[i].name===buffName && target.buffs[i].caster === caster) {
            if (remove) {
                if (target.buffs[i].stacks>1) {
                    target.buffs[i].stacks --
                } else {
                    target.buffs[i].duration = -1
                }

            }
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

let getPointTarget = function(caster,distance,direction) {
    let x = caster.x
    let y = caster.y

    let angleInRadian = (direction-180) / 180 * Math.PI

    x += Math.sin(angleInRadian) * distance*pxToMeter
    y += Math.cos(angleInRadian) * distance*pxToMeter

    return {x:x, y:y}
}

let createArrayAndShuffle = function(length) {
     let shuffle =  function(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a
    }

    let array = []
    for (let i = 0; i<length; i++) {
        array.push(i)
    }
    array = shuffle(array)
    return array
}


let dispel = function (caster,target,dispelType1 = false,dispelType2 = false,dispelType3 = false) {
    let d = 0
    for (let i = 0; i<target.debuffs.length; i++) {
        if (target.debuffs[i].ability.dispellable!==false && (target.debuffs[i].ability.dispellable===dispelType1 || target.debuffs[i].ability.dispellable===dispelType2 || target.debuffs[i].ability.dispellable===dispelType3 )) {
            target.debuffs[i].duration = -1
            d++
        }
    }
    if (d>0) {
        return true
    }
    return false
}

let dispelEnemy = function (caster,target,buffs = 0) {
    let d = 0
    for (let i = 0; i<target.buffs.length; i++) {
        if (target.buffs[i].ability.dispellable!==false && (target.buffs[i].ability.dispellable==="magic")) {
            target.buffs[i].duration = -1
            d++
            if (buffs===1) {
                break
            }
        }
    }
    if (d>0) {
        return true
    }
    return false
}

let dispelEnemyEnrage = function (caster,target,buffs = 0) {
    let d = 0
    for (let i = 0; i<target.buffs.length; i++) {
        if (target.buffs[i].ability.dispellable!==false && (target.buffs[i].ability.dispellable==="enrage")) {
            target.buffs[i].duration = -1
            d++
            if (buffs===1) {
                break
            }
        }
    }
    if (d>0) {
        return true
    }
    return false
}



let sortFriendlyTargetsByHealth = function(array = false) {
    let t = []
    for (let i = 0; i < friendlyTargets.length; i++) {
        if (!friendlyTargets[i].isDead) {
            t.push(friendlyTargets[i])
        }
    }
    if (t.length>0) {
        t = t.sort((a, b) => a.health/a.maxHealth > b.health/b.maxHealth ? 1 : -1) //most injured targets
        if (array) {
            return t
        } else {
            return t[0]
        }
    } else {
        return false
    }
}

let spawnPet = function (caster,type,name,x,y,ability) {
    if (caster.pets.length===0) {
        caster.pets.push(new Pet(caster.pets.length,caster,type,ability.petDuration,ability.petData,x,y))
        return caster.pets.length-1
    } else {
        let undefinedV = false
        let statue = false
        for (let i = 0; i<caster.pets.length; i++) {
            if (caster.pets[i]!==undefined) {
                if (caster.pets[i].name===name) {
                    statue = i
                    break
                }
            }
        }

        for (let i = 0; i<caster.pets.length; i++) {
            if (caster.pets[i]===undefined) {
                undefinedV = i
                break
            }
        }

        if (statue!==false){
            caster.pets[statue] = new Pet(statue,caster,type,ability.petDuration,ability.petData,x,y)
            return statue
        } else if (undefinedV!==false) {
            caster.pets[undefinedV] = new Pet(undefinedV,caster,type,ability.petDuration,ability.petData,x,y)
            return undefinedV
        } else {
            caster.pets.push(new Pet(caster.pets.length,caster,type,ability.petDuration,ability.petData,x,y))
            return caster.pets.length-1
        }
    }
}

let resurrect = function(caster,target,health) {
    target.isDead = false
    target.health = target.maxHealth*health
}

let limitBuff = function(caster,buffName) {
    for (let i = 0; i<friendlyTargets.length; i++) {
        for (let j = 0; j<friendlyTargets[i].buffs.length; j++) {
            if (friendlyTargets[i].buffs[j].name === buffName && friendlyTargets[i].buffs[j].caster === caster) {
                friendlyTargets[i].buffs[j].duration = -1
            }
        }
    }
}

let replaceAction = function(caster,ability1,ability2) {
    setTimeout(()=>{
        if (caster===player) {
            if (actions[ability1]) {
                let bar = actions[ability1].bar
                let slot = actions[ability1].slot
                actions[ability2] = new Action(ability2, bar, slot)
            }
            caster.abilities[ability2].canUse = true
        }
    } ,120)
}

let direction360 = function(dir) {
    if (dir>=360) {
        dir-=360
    }
    if (dir<0) {
        dir+=360
    }
    return dir
}

let directionHit = function(casterDir,dirToTarget,angle) {
    casterDir = direction360(casterDir)
    dirToTarget = direction360(dirToTarget)

    let dir1 = casterDir+angle
    let dir1_2 = casterDir+angle

    let dir2 = casterDir-angle
    let dir2_2 = casterDir-angle

    if (dir1>=360) {
        dir1_2 = dir1_2-360
        dir2_2 = dir2_2-360
    } else if (dir2<0) {
        dir1_2 = dir1_2+360
        dir2_2 = dir2_2+360
    }
    return (dir1 > dirToTarget && dir2 < dirToTarget) || (dir1_2 > dirToTarget && dir2_2 < dirToTarget)
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