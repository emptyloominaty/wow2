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
    "boss1":{primary:2000, haste:25, crit:0, vers:0, mastery:1, leech:0, avoidance:0, dodge:0, armor:10, block:0, speed:0, stamina:345000},
    "add1":{primary:1000, haste:10, crit:0, vers:0, mastery:1, leech:0, avoidance:0, dodge:0, armor:10, block:0, speed:0, stamina:53000},
}


enemies.push(new Enemy("Test1",1000000,100,0,-150,180,"bossTest","boss",enemiesStats["boss1"]))
/*enemies.push(new Enemy("Test2",650000,100,50,-170,180,"addTest","add",enemiesStats["add1"]))
enemies.push(new Enemy("Test3",650000,100,-50,-170,180,"addTest","add",enemiesStats["add1"]))
enemies.push(new Enemy("Test4",650000,100,25,-180,180,"addTest","add",enemiesStats["add1"]))
enemies.push(new Enemy("Test5",650000,100,-25,-180,180,"addTest","add",enemiesStats["add1"]))
enemies.push(new Enemy("Test6",650000,100,0,-200,180,"addTest","add",enemiesStats["add1"]))*/