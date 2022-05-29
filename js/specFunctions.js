let getRestoShamMastery = function(caster,target) {
    //console.log((1+(1-(target.health/target.maxHealth))*(caster.stats.mastery/100))+" - - H"+((target.health/target.maxHealth)*100)+"%" )
    return (1+(1-(target.health/target.maxHealth))*(caster.stats.mastery/100))
}