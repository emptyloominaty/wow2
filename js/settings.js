let settings = {
    showFloatingAbilityName:true,
    showFloatingAbility:true,
    showTargetFloatingHealing:true,
    reduceTargetFlaotingHealingFont:true,
    showTargetFloatingDamage:true,
    mouseSensitivity:2.4,
}

let spellQueueWindow = 0.3 //sec
let pxToMeter = 11

let raidFramesBuffs = {
    "mistweaver": {
        bottomRight:"Renewing Mist",
        bottomRight2:"Life Cocoon",
        centreRight:"Enveloping Mist",
        bottomCentre:"Essence Font",
    },
    "restorationDruid": {
        bottomRight:"Rejuvenation",
        bottomRight2:"Regrowth",
        centreRight:"Lifebloom",
        bottomCentre:"Wild Growth",
    },
    "restorationShaman": {
        bottomRight:"Riptide",
        bottomRight2:"none", //TODO:
        centreRight:"Regrowth", //TODO:
        bottomCentre:"Ancestral Vigor",
    },
    "holyPriest": {
        bottomRight:"Renew",
        bottomRight2:"Prayer of Mending",
        centreRight:"Echo of Light",
        bottomCentre:"Divine Hymn",
    },

    "assassination": {
        bottomRight:"none",
        bottomRight2:"none",
        centreRight:"none",
        bottomCentre:"none",
    },
    "balance": {
        bottomRight:"Riptide",
        bottomRight2:"none",
        centreRight:"Regrowth",
        bottomCentre:"Wild Growth",
    },
    "arcane": {
        bottomRight:"none",
        bottomRight2:"none",
        centreRight:"none",
        bottomCentre:"none",
    },
    "havoc": {
        bottomRight:"none",
        bottomRight2:"none",
        centreRight:"none",
        bottomCentre:"none",
    },
    "windwalker": {
        bottomRight:"none",
        bottomRight2:"none",
        centreRight:"none",
        bottomCentre:"none",
    },
    "brewmaster": {
        bottomRight:"none",
        bottomRight2:"none",
        centreRight:"none",
        bottomCentre:"none",
    },
    "fury": {
        bottomRight:"none",
        bottomRight2:"none",
        centreRight:"none",
        bottomCentre:"none",
    },
}
