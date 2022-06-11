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
        if (this.targetObj.id2===id) {
            val = val * 1.5
        }
        this.aggro[id] += val
    }

    aggroRun() {
        for (let i = 0; i<friendlyTargets.length; i++) {
            if (this.aggro[i]!==undefined) {
                this.aggro[i] = this.aggro[i]/1.001
            }
        }
    }
}

enemies.push(new Enemy("Test1",1500000,100,0,-150,180,"bossTest","boss"))
enemies.push(new Enemy("Test2",650000,100,50,-170,180,"addTest","add"))
enemies.push(new Enemy("Test3",650000,100,-50,-170,180,"addTest","add"))
enemies.push(new Enemy("Test4",650000,100,100,-180,180,"addTest","add"))