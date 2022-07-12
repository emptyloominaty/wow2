class Raider extends Creature {
    constructor(name,health,energy,x,y,direction,spec,stats) {
        super(name,false,health,energy,x,y,direction,spec,stats)
    }
}

let raidersStats = {
    "stat1":{primary:2000, haste:25, crit:15, vers:0, mastery:34, leech:1, avoidance:0, dodge:0, armor:10, speed:0, stamina:3100},
}

let raiders = [
    new Raider("raider1",50000,100,50,50,0,"restorationDruid",raidersStats["stat1"]),
    new Raider("raider2",50000,100,200,80,0,"restorationShaman",raidersStats["stat1"]),
    new Raider("raider3",50000,100,150,10,0,"arcane",raidersStats["stat1"]),
    new Raider("raider4",50000,100,250,200,0,"balance",raidersStats["stat1"]),
    new Raider("raider5",50000,100,200,200,0,"assassination",raidersStats["stat1"]),
    new Raider("raider6",50000,100,150,200,0,"havoc",raidersStats["stat1"]),
    new Raider("raider7",50000,100,320,200,0,"windwalker",raidersStats["stat1"]),
    new Raider("raider8",50000,100,300,150,0,"assassination",raidersStats["stat1"]),
    new Raider("raider9",50000,100,-150,200,0,"havoc",raidersStats["stat1"]),
    new Raider("raider10",50000,100,-320,200,0,"windwalker",raidersStats["stat1"]),
    new Raider("raider11",50000,100,-300,150,0,"assassination",raidersStats["stat1"]),
    new Raider("raider12",50000,100,-150,200,0,"havoc",raidersStats["stat1"]),
    new Raider("raider13",50000,100,-320,200,0,"windwalker",raidersStats["stat1"]),
    new Raider("raider14",50000,100,-300,150,0,"fury",raidersStats["stat1"]),
    new Raider("raider15",75000,100,0,-40,0,"brewmaster",raidersStats["stat1"]),
    new Raider("raider16",50000,100,300,30,0,"holyPriest",raidersStats["stat1"]),
    new Raider("raider17",50000,100,100,30,0,"mistweaver",raidersStats["stat1"]),
    new Raider("raider18",50000,100,100,30,0,"elemental",raidersStats["stat1"]),
    new Raider("raider18",50000,100,120,66,0,"discipline",raidersStats["stat1"]),
]