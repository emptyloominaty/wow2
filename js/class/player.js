class Player extends Creature {
    constructor(name,health,energy,x,y,direction,spec) {
        super(name,false,health,energy,x,y,direction,spec)
        this.playerCharacter = true
    }
}
//"mistweaver" , "restorationShaman" , "restorationDruid" , "assassination" , "holyPriest" ,
let player = new Player("player",50500,100,0,0,0,"holyPriest" )