class Pet {
    time = 0
    timer = 0

    constructor(id,caster,ability,type,duration,data,x,y) {
        this.id = id
        this.caster = caster
        this.ability = ability
        this.type = type //pet / guardian / totem
        this.duration = duration

        //centre
        this.x = x
        this.y = y

        this.data = data

        this.start()
    }

    run() {
        if (this.timer<this.data.timer) {
            this.timer += progressInSec
        } else {
            this.timer = 0
            this.doTimer()
        }



        this.time += progressInSec
        if (this.time>this.duration) {
            this.end()
            areas[this.id] = undefined
        }
    }

    draw() {
        let x = this.x - player.x
        let y = this.y - player.y
        let x2d = (game2d.canvasW/2)+x
        let y2d = (game2d.canvasH/2)+y
        game2d.drawCircle(x2d,y2d,12,this.data.color)


    }

    doTimer() {
    }

    start() {

    }

    end() {

    }
}

let pets = []
