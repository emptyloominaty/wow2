class Player extends Creature {
    constructor(name,enemy,health,x,y,direction) {
        super(name,enemy,health,x,y,direction)
    }
}

let player = new Player("player",false,100,0,0,0)