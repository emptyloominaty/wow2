class Area {
    time = 0
    timer = 0

    constructor(id,caster,ability,type,duration,data,x,y,drawArea,radius = 0,width = 0,height = 0) {
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
        this.drawArea = drawArea
        this.maxTargets = this.data.maxTargets
        if (this.maxTargets==="all") {
            this.maxTargets = 999
        }

        this.done = false

        this.start()
    }

    findAllCreaturesInside() {
        let inside = []
        if (this.type==="circle") {
            for (let i = 0; i<creatures.length; i++) {
                let distance = getDistance(creatures[i],this)
                if (distance<this.radius && !isEnemy(this.caster,creatures[i])) {
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
        if (this.data.type==="heal" || this.data.type==="damage") {
            if (!this.done) {
                this.doTimer()
                this.done = true
            }
        }

        this.time += progressInSec
        if (this.time>this.duration) {
            this.end()
            areas[this.id] = undefined
        }
    }

    draw() {
        if (this.drawArea) {
            let x = (this.x - player.x)*gameScaling
            let y = (this.y - player.y)*gameScaling
            let x2d = (game2d.canvasW/2)+x
            let y2d = (game2d.canvasH/2)+y
            if (this.type==="circle") {
                // game2d.drawCircleStroke(x2d,y2d,this.radius*22,this.data.color,2)
                game2d.drawCircle(x2d,y2d,this.radius*pxToMeter*gameScaling,this.data.color2)
            }
        }
    }

    doTimer(val = 1) {
        let targets = this.findAllCreaturesInside()
        //targets = targets.sort(() => 0.5 - Math.random()) //randomise
        targets = targets.sort((a, b) => a.health/a.maxHealth > b.health/b.maxHealth ? 1 : -1) //most injured targets
        for (let i = 0; i<targets.length;i++) {
            if (i===this.maxTargets) {
                break
            }
            doHeal(this.caster,targets[i],this.ability,undefined,(this.ability.spellPower*val))
            if (this.data.cast) {
                this.caster.abilities[this.data.castName].startCast(this.caster,targets[i],this.ability)
            }
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

let addArea = function(id,caster,ability,type,duration,data,x,y,drawArea,radius = 0,width = 0,height = 0) {
    for (let i = 0; i < areas.length; i++) {
        if (areas[i] === undefined) {
            areas[i] = new Area(i, caster, ability, type, duration, data, x, y, drawArea, radius, width, height)
            return true
        }
    }
    areas.push(new Area(id, caster, ability, type, duration, data, x, y, drawArea, radius, width, height))
}
