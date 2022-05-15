class Raider extends Creature {
    constructor(name,enemy,health,energy,x,y,direction,spec) {
        super(name,enemy,health,energy,x,y,direction,spec)
    }
}

let raiders = [new Raider("test",false,1000,100,50,50,0,"")]