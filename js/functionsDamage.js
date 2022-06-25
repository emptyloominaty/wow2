let damageFunctions = {
    "Flame Shock":(caster,target,damage,ability)=> {
        let chance = false
        if (caster.spec==="restorationShaman") {
            chance = getChance(15)
        } else if (caster.spec==="elemental") {
            chance = getChance(10)
            if (checkBuff(caster,caster,"Fire Elemental")) {
                damage = damage *1.25
            }
        }
        if (chance) {
            caster.abilities["Lava Burst"].incCd(caster,12,false)
            applyBuff(caster,caster,caster.abilities["Lava Surge"])
        }
        return damage
    },

    "Wrath":(caster,target,damage,ability)=> {
        if (caster.spec==="balance") {
            if (caster.abilities["Eclipse"].solar && caster.abilities["Eclipse"].time>0) {
                return damage * (1 + (caster.stats.mastery / 100))
            }
        }
        return damage
    },
    "Sunfire":(caster,target,damage,ability)=> {
        if (caster.spec==="balance") {
            caster.abilities["Shooting Stars"].proc(caster,target)
            if (caster.abilities["Eclipse"].solar && caster.abilities["Eclipse"].time>0) {
                return damage * (1 + (caster.stats.mastery / 100))
            }
        }
        return damage
    },
    "Moonfire":(caster,target,damage,ability)=> {
        if (caster.spec==="balance") {
            caster.abilities["Shooting Stars"].proc(caster,target)
            if (caster.abilities["Eclipse"].lunar && caster.abilities["Eclipse"].time>0) {
                return damage * (1 + (caster.stats.mastery / 100))
            }
        }
        return damage
    },
    "Starfall":(caster,target,damage,ability)=> {
        if (caster.spec==="balance") {
            if (caster.abilities["Eclipse"].time>0) {
                return damage * (1 + (caster.stats.mastery / 100))
            }
        }
        return damage
    },
    "Starfire":(caster,target,damage,ability)=> {
        if (caster.spec==="balance") {
            if (caster.abilities["Eclipse"].lunar && caster.abilities["Eclipse"].time>0) {
                return damage * (1 + (caster.stats.mastery / 100))
            }
        }
        return damage
    },
    "Shooting Stars":(caster,target,damage,ability)=> {
        if (caster.spec==="balance") {
            if (caster.abilities["Eclipse"].time>0) {
                return damage * (1 + (caster.stats.mastery / 100))
            }
        }
        return damage
    },
    "Starsurge":(caster,target,damage,ability)=> {
        if (caster.spec==="balance") {
            if (caster.abilities["Eclipse"].time>0) {
                return damage * (1 + (caster.stats.mastery / 100))
            }
        }
        return damage
    },


}