class Ai {
    constructor(creature) {
        this.creature = creature
    }
    run() {
        //TODO:
        if (this.creature.spec==="bossTest") {//--------------------------------------------------- boss test
            //boss test
            this.creature.abilities["Aoe Test"].startCast(this.creature)


            //no target
            if (Object.keys(this.creature.targetObj).length === 0)  {
                let newTarget = findNearestEnemy(this.creature)
                this.creature.targetObj = newTarget
                this.creature.target = newTarget.name
            } else {
                let b = this.creature
                this.creature.direction = getDirection(b,b.targetObj)

                let dist = getDistance(b,b.targetObj)
                if (dist>4) {
                    b.move(1)
                } else {
                    b.abilities["Auto Attack"].startCast(b)
                }

            }
            //todo:aggro


        } else if (!this.creature.enemy) { //---------------------------------------------------friendly default
            //no target
            if (Object.keys(this.creature.targetObj).length === 0)  {
                let newTarget = findNearestEnemy(this.creature)
                this.creature.targetObj = newTarget
                this.creature.target = newTarget.name
            } else {
                let b = this.creature
                this.creature.direction = getDirection(b,b.targetObj)

                let dist = getDistance(b,b.targetObj)
                let distNeed = 30
                if (b.melee) {
                    distNeed = 4
                }
                if (dist>distNeed) {
                    b.move(1)
                } else {
                    if (b.melee) {
                        b.abilities["Auto Attack"].startCast(b)
                    }
                }
            }


        } else if (this.creature.enemy) {//---------------------------------------------------enemy default
            //enemy default

        }
    }
}