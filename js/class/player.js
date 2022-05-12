class Player extends Creature {
    constructor(name,enemy,health,energy,x,y,direction,spec) {
        super(name,enemy,health,energy,x,y,direction,spec)
    }
}

let player = new Player("player",false,1000,100,0,0,0,"mistweaver")