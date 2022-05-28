class Ai {
    constructor(creature) {
        this.creature = creature
    }
    run() {
        //TODO:
        if (this.creature.spec==="bossTest") {//--------------------------------------------------- boss test
            this.creature.abilities["Aoe Test"].startCast(this.creature)

            //no target
            if (Object.keys(this.creature.targetObj).length === 0)  {
                let newTarget = findNearestEnemy(this.creature)
                if (newTarget!==false) {
                    this.creature.targetObj = newTarget
                    this.creature.target = newTarget.name
                }
            } else {
                let b = this.creature
                for (let i = 0; i<b.aggro.length; i++) {
                    let currentAggro = b.aggro[b.targetObj.id2]
                    if (currentAggro===undefined) {
                        currentAggro = 0
                    }
                    if (b.targetObj.id2.isDead) {
                        b.aggro[b.targetObj.id2] = 0
                    }
                    if (currentAggro<b.aggro[i]) {
                        b.targetObj = friendlyTargets[i]
                        b.target = friendlyTargets[i].name
                        b.castTarget = friendlyTargets[i]
                    }
                }

                this.creature.direction = getDirection(b,b.targetObj)

                let dist = getDistance(b,b.targetObj)
                if (dist>4) {
                    b.move(1)
                } else {
                    b.abilities["Auto Attack"].startCast(b)
                    if (b.gcd<=0) {
                        b.abilities["Big Dmg"].startCast(b)
                    }
                }
            }


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
                    //TODO:ABILITIES
                    if (this.creature.gcd<=0) {

                    }



                }
            }


        } else if (this.creature.enemy) {//---------------------------------------------------enemy default
            //enemy default

        }
    }
}