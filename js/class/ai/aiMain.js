class Ai {

    constructor(creature) {
        this.creature = creature
    }

    ai = {
        "windwalker":() => {
            _ai_windwalker(this.creature)
        },
        "brewmaster":() => {
            _ai_brewmaster(this.creature)
        },
        "mistweaver":() => {
            _ai_mistweaver(this.creature)
        },
        "restorationShaman":() => {
            _ai_restorationShaman(this.creature)
        },
        "holyPriest":() => {
            _ai_holyPriest(this.creature)
        },
        "restorationDruid":() => {
            _ai_restorationDruid(this.creature)
        },
        "balance":() => {
            _ai_balance(this.creature)
        },
        "assassination":() => {
            _ai_assassination(this.creature)
        },
        "havoc":() => {
            _ai_havoc(this.creature)
        },
        "fury":() => {
            _ai_fury(this.creature)
        },
        "arcane":() => {
            _ai_arcane(this.creature)
        },
        "elemental":() => {
            _ai_elemental(this.creature)
        },
        "discipline":() => {
            _ai_discipline(this.creature)
        },
        "holyPaladin":() => {
            _ai_holyPaladin(this.creature)
        },
        "bossTest":() => {
            _ai_bossTest(this.creature)
        }, "addTest":() => {
            _ai_addTest(this.creature)
        },
    }

    run() {
        if (this.ai[this.creature.spec]) { //---------------------------------------------------spec Ai
            this.ai[this.creature.spec]()
        } else {
             //---------------------------------------------------default
            if (Object.keys(this.creature.targetObj).length === 0)  {
                this.getNewTarget()
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
                }
            }
        }
    }

    getLowestHpEnemy() {
        let e = []
        for (let i = 0; i<enemyTargets.length; i++) {
            if (!enemyTargets[i].isDead) {
                e.push(enemyTargets[i])
            }

        }
        e = e.sort((a, b) => a.health > b.health ? 1 : -1) //most injured targets
        return e[0]
    }

    checkBuff(caster,target,buffName) {
        if (target) {
            for (let i = 0; i<target.buffs.length; i++) {
                if (target.buffs[i].name===buffName && target.buffs[i].caster === caster) {
                    return true
                }
            }
        }
    }

    getNewTarget() {
        let newTarget = findNearestEnemy(this.creature)
        this.creature.targetObj = newTarget
        this.creature.target = newTarget.name
        this.creature.castTarget = newTarget.name
    }



}