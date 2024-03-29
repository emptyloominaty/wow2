class Raider extends Creature {
    constructor(name,health,energy,x,y,direction,spec,stats) {
        super(name,false,health,energy,x,y,direction,spec,stats)
    }
}

let raidersStats = {
    "stat1":{primary:2000, haste:25, crit:15, vers:0, mastery:34, leech:1, avoidance:0, dodge:0, armor:10, block:0, speed:0, stamina:3100},
}

let raiders = [
    new Raider("raider1",50000,100,50,50,0,"holyPaladin",raidersStats["stat1"]),
    new Raider("raider2",50000,100,200,80,0,"restorationShaman",raidersStats["stat1"]),
    new Raider("raider3",50000,100,150,10,0,"arcane",raidersStats["stat1"]),
    new Raider("raider4",50000,100,250,200,0,"balance",raidersStats["stat1"]),
    new Raider("raider5",50000,100,200,200,0,"assassination",raidersStats["stat1"]),
    new Raider("raider6",50000,100,150,200,0,"havoc",raidersStats["stat1"]),
    new Raider("raider7",50000,100,320,200,0,"windwalker",raidersStats["stat1"]),
    //new Raider("raider8",50000,100,300,150,0,"feral",raidersStats["stat1"]),
    new Raider("raider8",50000,100,300,150,0,"destruction",raidersStats["stat1"]),
    new Raider("raider9",50000,100,-150,200,0,"enhancement",raidersStats["stat1"]),
    new Raider("raider10",50000,100,-320,200,0,"arms",raidersStats["stat1"]),
    new Raider("raider11",50000,100,-300,150,0,"retribution",raidersStats["stat1"]),
    new Raider("raider12",50000,100,-150,200,0,"frostDk",raidersStats["stat1"]),
    new Raider("raider13",50000,100,-320,200,0,"unholy",raidersStats["stat1"]),
    new Raider("raider14",50000,100,-300,150,0,"fury",raidersStats["stat1"]),
    new Raider("raider15",75000,100,0,-40,0,"brewmaster",raidersStats["stat1"]),
    new Raider("raider16",50000,100,300,30,0,"holyPriest",raidersStats["stat1"]),
    new Raider("raider17",50000,100,100,30,0,"mistweaver",raidersStats["stat1"]),
    new Raider("raider18",50000,100,100,30,0,"elemental",raidersStats["stat1"]),
    new Raider("raider19",50000,100,120,66,0,"discipline",raidersStats["stat1"]),
    new Raider("raider20",50000,100,80,66,0,"outlaw",raidersStats["stat1"]),
    new Raider("raider21",50000,100,20,20,0,"subtlety",raidersStats["stat1"]),
    new Raider("raider22",50000,100,100,0,0,"fire",raidersStats["stat1"]),
    new Raider("raider23",50000,100,130,130,0,"frostMage",raidersStats["stat1"]),
    new Raider("raider24",50000,100,50,130,0,"shadow",raidersStats["stat1"]),
    new Raider("raider25",50000,100,130,-100,0,"affliction",raidersStats["stat1"]),
    new Raider("raider26",50000,100,50,-100,0,"restorationDruid",raidersStats["stat1"]),
    new Raider("raider27",50000,100,70,-150,0,"marksmanship",raidersStats["stat1"]),
]