class Raider extends Creature {
    constructor(name,enemy,health,energy,x,y,direction,spec) {
        super(name,enemy,health,energy,x,y,direction,spec)
    }
}

let raiders = [
    new Raider("raider1",false,50500,100,50,50,0,"restodruid"),
    new Raider("raider2",false,50500,100,200,80,0,"assassination"),
    new Raider("raider3",false,50500,100,150,10,0,"restosham"),
    new Raider("raider4",false,50500,100,250,200,0,"restodruid"),
    new Raider("raider5",false,50500,100,200,200,0,"assassination"),
    new Raider("raider6",false,50500,100,150,200,0,"restosham"),
    new Raider("raider7",false,50500,100,320,200,0,"windwalker"),
    new Raider("raider8",false,50500,100,300,150,0,"assassination"),
    new Raider("raider9",false,50500,100,300,10,0,"windwalker"),
]