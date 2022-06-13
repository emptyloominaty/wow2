class Enemy extends Creature {
    type = "boss"
    aggro = []

    constructor(name,health,energy,x,y,direction,spec,type,stats) {
        super(name,true,health,energy,x,y,direction,spec,stats)
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

let enemiesStats = {
    "boss1":{primary:2000, haste:25, crit:15, vers:0, mastery:34, leech:1, avoidance:0, dodge:0, armor:10, speed:0, stamina:75000},
    "add1":{primary:2000, haste:25, crit:15, vers:0, mastery:34, leech:1, avoidance:0, dodge:0, armor:10, speed:0, stamina:25000},
}


enemies.push(new Enemy("Test1",1500000,100,0,-150,180,"bossTest","boss",enemiesStats["boss1"]))
enemies.push(new Enemy("Test2",650000,100,50,-170,180,"addTest","add",enemiesStats["add1"]))
enemies.push(new Enemy("Test3",650000,100,-50,-170,180,"addTest","add",enemiesStats["add1"]))
enemies.push(new Enemy("Test4",650000,100,100,-180,180,"addTest","add",enemiesStats["add1"]))