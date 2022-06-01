class SpellQueue {
    done = true
    ability = {}
    time = 0
//    target = {}

    run() {
        if (this.time>0) {
            this.time -= progressInSec
        } else if (!this.done) {
            if (player.isCasting===false) {
                this.done = true
                player.abilities[this.ability.name].startCast(player)
            }
            this.time+=(player.casting.time2-player.casting.time)+0.005+(progressInSec)
        }
    }

    add(ability,time,target) {
        this.ability = ability
        this.time = time+progressInSec
        this.done = false
 //       this.target = target
    }

}

let spellQueue = new SpellQueue()