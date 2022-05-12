
let critChance = function(caster) {
    let critChance = (Math.random()*100)
    if (critChance < caster.stats.crit) {
        return 2
    }
    return 1
}

let doHeal = function(caster,target,ability) {
    let crit = critChance(caster)
    let heal = (caster.stats.primary * ability.spellPower) * (1+(caster.stats.vers/100)) * crit
    //console.log(heal)
    target.health += heal
    if (target.health>target.maxHealth) {
        target.health = target.maxHealth
    }
}