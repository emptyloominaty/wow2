class Ai {
    constructor(creature) {
        this.creature = creature
    }
    run() {
        if (this.creature.spec==="bossTest") {
            this.creature.abilities["Aoe Test"].startCast(this.creature)
        }
    }
}