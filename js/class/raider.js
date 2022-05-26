class Raider extends Creature {
    constructor(name,health,energy,x,y,direction,spec) {
        super(name,false,health,energy,x,y,direction,spec)
    }
}

let raiders = [
    new Raider("raider1",50500,100,50,50,0,"restorationDruid"),
    new Raider("raider2",50500,100,200,80,0,"restorationShaman"),
    new Raider("raider3",50500,100,150,10,0,"arcane"),
    new Raider("raider4",50500,100,250,200,0,"balance"),
    new Raider("raider5",50500,100,200,200,0,"assassination"),
    new Raider("raider6",50500,100,150,200,0,"havoc"),
    new Raider("raider7",50500,100,320,200,0,"windwalker"),
    new Raider("raider8",50500,100,300,150,0,"assassination"),
    new Raider("raider9",50500,100,300,10,0,"windwalker"),
]