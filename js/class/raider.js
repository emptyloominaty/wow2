class Raider extends Creature {
    constructor(name,health,energy,x,y,direction,spec) {
        super(name,false,health,energy,x,y,direction,spec)
    }
}

let raiders = [
    new Raider("raider1",50000,100,50,50,0,"restorationDruid"),
    new Raider("raider2",50000,100,200,80,0,"restorationShaman"),
    new Raider("raider3",50000,100,150,10,0,"arcane"),
    new Raider("raider4",50000,100,250,200,0,"balance"),
    new Raider("raider5",50000,100,200,200,0,"assassination"),
    new Raider("raider6",50000,100,150,200,0,"havoc"),
    new Raider("raider7",50000,100,320,200,0,"windwalker"),
    new Raider("raider8",50000,100,300,150,0,"assassination"),
    new Raider("raider9",50000,100,-150,200,0,"havoc"),
    new Raider("raider10",50000,100,-320,200,0,"windwalker"),
    new Raider("raider11",50000,100,-300,150,0,"assassination"),
    new Raider("raider12",50000,100,-150,200,0,"havoc"),
    new Raider("raider13",50000,100,-320,200,0,"windwalker"),
    new Raider("raider14",50000,100,-300,150,0,"fury"),
    new Raider("raider15",75000,100,0,-40,0,"brewmaster"),
    new Raider("raider16",50000,100,300,30,0,"holyPriest"),
    new Raider("raider17",50000,100,100,30,0,"mistweaver"),
]