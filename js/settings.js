let settings = {
    showFloatingAbilityName:true,
    showFloatingAbility:true,
    reduceTargetFlaotingHealingFont:true,
    showTargetFloatingText:true,
    mouseSensitivity:2.4,
    staticTargetFloatingText:false,

    uiScaling: 1,

    spellGlow:true,
    spellVisuals:3, //0-off, 1-low, 2-medium, 3-high, 4-ultra
    uiRefreshRate:4,
    detailsRefreshRate:4,
}

let spellQueueWindow = 0.3 //sec
let pxToMeter = 11

let raidFramesBuffs = {
    "mistweaver": {
        bottomRight:"Renewing Mist",
        bottomRight2:"Enveloping Breath", //"Life Cocoon"
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
        centreRight:"Earth Shield",
        bottomCentre:"Ancestral Vigor",
    },
    "holyPriest": {
        bottomRight:"Renew",
        bottomRight2:"Prayer of Mending",
        centreRight:"Echo of Light",
        bottomCentre:"Divine Hymn",
    },
    "discipline": {
        bottomRight:"Atonement",
        bottomRight2:"Power Word: Shield",
        centreRight:"TODO",
        bottomCentre:"Pain Suppression",
    },
    "holyPaladin": {
        bottomRight:"Glimmer of Light",
        bottomRight2:"Beacon of Light",
        centreRight:"Bestow Faith",
        bottomCentre:"Beacon of Faith",
    },
    "assassination": {
        bottomRight:"none",
        bottomRight2:"none",
        centreRight:"none",
        bottomCentre:"none",
    },
    "protectionPaladin": {
        bottomRight:"none",
        bottomRight2:"none",
        centreRight:"none",
        bottomCentre:"none",
    },
    "retribution": {
        bottomRight:"none",
        bottomRight2:"none",
        centreRight:"none",
        bottomCentre:"none",
    },
    "arms": {
        bottomRight:"none",
        bottomRight2:"none",
        centreRight:"none",
        bottomCentre:"none",
    },
    "blood": {
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
    "elemental": {
        bottomRight:"Earth Shield",
        bottomRight2:"none",
        centreRight:"none",
        bottomCentre:"none",
    },
    "vengeance": {
        bottomRight:"none",
        bottomRight2:"none",
        centreRight:"none",
        bottomCentre:"none",
    },
}
