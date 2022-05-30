class Enemy extends Creature {
    type = "boss"
    aggro = []

    constructor(name,health,energy,x,y,direction,spec,type) {
        super(name,true,health,energy,x,y,direction,spec)
        this.type = type //boss/add
    }

    aggroInc(id,val) {
        if (this.aggro[id]===undefined) {
            this.aggro[id] = 0
        }
        this.aggro[id] += val
    }
}

enemies.push(new Enemy("Test1",950000,100,0,-150,180,"bossTest","boss"))