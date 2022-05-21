class SpellQueue {
    done = true
    ability = {}
    time = 0

    run() {
        if (this.time>0) {
            this.time -= progressInSec
        } else if (!this.done) {
            this.done = true
            player.abilities[this.ability.name].startCast(player)
        }
    }

    add(ability,time) {
        this.ability = ability
        this.time = time+progressInSec
        this.done = false
    }

}

let spellQueue = new SpellQueue()