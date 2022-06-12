let damageFunctions = {
    "Wrath":(caster,target,damage,ability)=> {
        if (caster.spec==="balance") {
            if (caster.abilities["Eclipse"].next==="lunar" && caster.abilities["Eclipse"].time>0) {
                return damage * (1 + (caster.stats.mastery / 100))
            }
        }
        return damage
    },
    "Sunfire":(caster,target,damage,ability)=> {
        if (caster.spec==="balance") {
            caster.abilities["Shooting Stars"].proc(caster,target)
            if (caster.abilities["Eclipse"].next==="lunar" && caster.abilities["Eclipse"].time>0) {
                return damage * (1 + (caster.stats.mastery / 100))
            }
        }
        return damage
    },
    "Moonfire":(caster,target,damage,ability)=> {
        if (caster.spec==="balance") {
            caster.abilities["Shooting Stars"].proc(caster,target)
            if (caster.abilities["Eclipse"].next==="solar" && caster.abilities["Eclipse"].time>0) {
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
            if (caster.abilities["Eclipse"].next==="solar" && caster.abilities["Eclipse"].time>0) {
                return damage * (1 + (caster.stats.mastery / 100))
            }
        }
        return damage
    },
    "Shooting Stars":(caster,target,damage,ability)=> {
        if (caster.spec==="balance") {
            if (caster.abilities["Eclipse"].next==="solar" && caster.abilities["Eclipse"].time>0) {
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