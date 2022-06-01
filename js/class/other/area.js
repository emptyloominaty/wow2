class Area {
    time = 0
    timer = 0

    constructor(id,caster,ability,type,duration,data,x,y,radius = 0,width = 0,height = 0) {
        this.id = id
        this.caster = caster
        this.ability = ability
        this.type = type //circle / rectangle
        this.duration = duration

        //centre
        this.x = x
        this.y = y

        //circle
        this.radius = radius

        //rectangle
        this.width = width
        this.height = height

        this.data = data

        this.start()
    }

    findAllCreaturesInside() {
        let inside = []
        if (this.type==="circle") {
            for (let i = 0; i<creatures.length; i++) {
                let distance = getDistance(creatures[i],this)
                if (distance<this.radius || !creatures[i].isEnemy) { //TODO:ENEMY
                    inside.push(creatures[i])
                }
            }
        }
        return inside
    }


    run() {
        if (this.data.type==="hot" || this.data.type==="dot") {
            if (this.timer<this.data.timer) {
                this.timer += progressInSec
            } else {
                this.timer = 0
                this.doTimer()
            }
        }


        this.time += progressInSec
        if (this.time>this.duration) {
            this.end()
            areas[this.id] = undefined
        }
    }

    draw() {
        let x2d = (game2d.canvasW/2)+this.x
        let y2d = (game2d.canvasH/2)+this.y
        game2d.drawCircleStroke(x2d,y2d,this.radius*22,this.data.color,2)
    }

    doTimer(val = 1) {
        let targets = this.findAllCreaturesInside()
        for (let i = 0; i<targets.length;i++) {
            if (i===6) {
                break
            }
            doHeal(this.caster,targets[i],this.ability,undefined,this.ability.spellPower*val)
        }
    }

    start() {

    }

    end() {
        if (this.data.type==="hot" || this.data.type==="dot") {
            this.doTimer(this.timer/this.data.timer)
        }
    }
}

let areas = []
