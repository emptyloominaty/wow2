class Player extends Creature {
    constructor(name,health,energy,x,y,direction,spec,stats) {
        super(name,false,health,energy,x,y,direction,spec,stats)
        this.playerCharacter = true
    }

    moving = [false,false,false,false]
    getMoveSpeedPlayer() {
        let a = 0
        for (let i = 0; i<this.moving.length;i++) {
            if (this.moving[i]) {
                a++
            }
        }
        return a
    }
}
let playerStats = {primary:2000, haste:25, crit:15, vers:0, mastery:34, leech:1, avoidance:0, dodge:0, armor:10, block:0, speed:0, stamina:3100}

let player = new Player("player",50500,100,0,0,0,"destruction",playerStats)