class Enemy extends Creature {
    type = "boss"

    constructor(name,health,energy,x,y,direction,spec,type) {
        super(name,true,health,energy,x,y,direction,spec)
        this.type = type //boss/add
    }
}

enemyTargets.push(new Enemy("Test1",150000,100,0,-150,180,"bossTest","boss"))