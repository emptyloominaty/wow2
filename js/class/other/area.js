class Area {
    time = 0
    timer = 0

    constructor(id,caster,ability,type,duration,data,x,y,drawArea,radius = 0,width = 0,height = 0) {
        this.id = id
        this.caster = caster
        this.ability = ability
        this.type = type //circle / rectangle
        this.duration = duration
        this.direction = 0
        this.speed = 0
        this.moving = false

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
        if (this.data.direction) {
            this.direction = this.data.direction
        }
        if (this.data.speed) {
            this.speed = this.data.speed
        }
        if (this.data.moving) {
            this.moving = this.data.moving
        }

        this.totalTargetHealed = 0
        this.damagedTargets = []
        this.healedTargets = []

        this.done = false

        this.start()
    }

    findAllCreaturesInside(caster = false) {
        let inside = []
        if (this.type==="circle" ||this.type==="circle2") {
            if (!caster) {
                for (let i = 0; i<creatures.length; i++) {
                    let distance = getDistance(creatures[i],this)
                    if (distance<this.radius && !isEnemy(this.caster,creatures[i])) {
                        inside.push(creatures[i])
                    }
                }
            } else {
                let distance = getDistance(this.caster,this)
                if (distance<this.radius) {
                    inside.push(this.caster)
                }
            }
        }
        return inside
    }

    findAllCreaturesInsideEnemy() {
        let inside = []
        if (this.type==="circle" || this.type==="circle2") {
            for (let i = 0; i<creatures.length; i++) {
                let distance = getDistance(creatures[i],this)
                if (distance<this.radius && isEnemy(this.caster,creatures[i]) && !creatures[i].isDead) {
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
                this.doTimer(undefined,this.data.type)
            }
        } else if (this.data.type==="heal" || this.data.type==="damage") {
            let targets = []
            if (this.data.type==="damage") {
                targets = this.findAllCreaturesInsideEnemy()
            } else {
                targets = this.findAllCreaturesInside()
            }

            targets = targets.sort((a, b) => a.health/a.maxHealth > b.health/b.maxHealth ? 1 : -1) //most injured targets
            for (let i = 0; i<targets.length;i++) {
                if ((this.totalTargetHealed>=this.maxTargets && this.maxTargets!=="all" ) ) {
                    break
                }
                if (this.data.type==="heal") {
                    if (this.healedTargets.indexOf(targets[i].id)===-1) {
                        doHeal(this.caster,targets[i],this.ability,undefined,(this.data.spellPower))
                        this.healedTargets.push(targets[i].id)
                        this.totalTargetHealed++
                    }
                } else {
                    if (this.damagedTargets.indexOf(targets[i].id)===-1) {  //
                        doDamage(this.caster, targets[i], this.ability, undefined, (this.data.spellPower))
                        this.damagedTargets.push(targets[i].id)
                        this.totalTargetHealed++
                    }
                }
            }
        } else if (this.data.type==="ringofPeace") {
            let targets = this.findAllCreaturesInsideEnemy()
            for (let i = 0; i<targets.length; i++) {
                targets[i].move(-5)
            }
        } else if (this.data.type==="applyDebuff") {
            let targets = this.findAllCreaturesInsideEnemy()
            for (let i = 0; i<targets.length; i++) {
                applyDebuff(this.caster,targets[i],this.ability)
            }
        } else if (this.data.type==="applyDot") {
            let targets = this.findAllCreaturesInsideEnemy()
            for (let i = 0; i<targets.length; i++) {
                applyDot(this.caster,targets[i],this.ability,this.data.spellPowerDot)
            }
        }  else if (this.data.type==="applyBuff") {
            let targets = this.findAllCreaturesInside()
            for (let i = 0; i<targets.length; i++) {
                applyBuff(this.caster,targets[i],this.ability)
            }
        } else if (this.data.type==="applyBuffOneTarget") {
            let targets = this.findAllCreaturesInside()
            if (targets.length>0) {
                applyBuff(this.caster, targets[0], this.ability)
                this.duration = -1
            }
        } else if (this.data.type==="manaTideTotem") {
            let targets = this.findAllCreaturesInside()
            for (let i = 0; i<targets.length; i++) {
                if (targets[i].resourceName==="Mana") {
                    targets[i].energy += targets[i].energyRegen/fps
                }
            }
        } else if (this.data.type==="spiritLinkTotem") {
            if (this.timer<this.data.timer) {
                this.timer += progressInSec
            } else {
                this.timer = 0

                let targets = this.findAllCreaturesInside()
                let health = 0
                for (let i = 0; i<targets.length; i++) {
                    health += targets[i].health/targets[i].maxHealth
                }
                let avgHealth = health/targets.length
                for (let i = 0; i<targets.length; i++) {
                    targets[i].health = avgHealth*targets[i].maxHealth
                    applyBuff(this.caster,targets[i],{name:"Spirit Link Totem",duration:1,spellPower:0,stacks:1,maxStacks:1,effectValue:0,effect:[{name:"damageReduction",val:0.1}],runBuff:()=>{},endBuff:()=>{},})
                }

            }
        }  else if (this.data.type==="applyBuffToCaster") {
            let targets = this.findAllCreaturesInside(true)
            for (let i = 0; i<targets.length; i++) {
                applyBuff(this.caster,targets[i],this.ability)
            }
        }


        if (this.moving) {
            this.move()
        }

        this.time += progressInSec

        if (this.data.returnBack && this.time>this.duration/2) {
            this.direction -= 180
            this.data.returnBack = false
            this.damagedTargets = []
            this.healedTargets = []
        }

        if (this.time>this.duration) {
            this.end()
            areas[this.id] = undefined
        }
    }

    move() {
        let speed = (this.speed*pxToMeter) * progressInSec
        let angleInRadian = (this.direction-180) / 180 * Math.PI

        let vx = Math.sin(angleInRadian) * speed
        let vy = Math.cos(angleInRadian) * speed

        this.x += vx
        this.y += vy
    }

    draw() {
        if (this.drawArea) {
            let x = (this.x - player.x)*gameScaling
            let y = (this.y - player.y)*gameScaling
            let x2d = (game2d.canvasW/2)+x
            let y2d = (game2d.canvasH/2)+y
            if (this.type==="circle") {
                game2d.drawCircle(x2d,y2d,this.radius*pxToMeter*gameScaling,this.data.color2)
            } else if (this.type==="circle2") {
                game2d.drawCircleStroke(x2d,y2d,this.radius*pxToMeter*gameScaling,this.data.color2,2)
            }
        }
    }

    doTimer(val = 1,type) {
        let targets = []
        if (type==="hot") {
            targets = this.findAllCreaturesInside()
            targets = targets.sort((a, b) => a.health/a.maxHealth > b.health/b.maxHealth ? 1 : -1) //most injured targets
        } else if (type==="dot") {
            targets = this.findAllCreaturesInsideEnemy()
        }

        for (let i = 0; i<targets.length;i++) {
            applyBuff(this.caster,targets[i],this.ability)
        }

        for (let i = 0; i<targets.length;i++) {
            if (i===this.maxTargets) {
                break
            }
            if (type==="hot") {
                doHeal(this.caster, targets[i], this.ability, undefined, (this.ability.spellPower * val))
            } else if (type==="dot") {
                doDamage(this.caster, targets[i], this.ability, undefined, (this.ability.spellPower * val))
            }

            if (this.data.cast) {
                this.caster.abilities[this.data.castName].startCast(this.caster,targets[i],this.ability)
            }
        }
    }

    start() {
        if (this.data.visualEffect) {
            addSpellVisualEffects(this.x,this.y,0,this.data.visualEffect.name,this.data.visualEffect.data)
        }
    }

    end() {
        if (this.data.type==="hot" || this.data.type==="dot") {
            this.doTimer(this.timer/this.data.timer)
        } else if (this.data.type==="stun") {
            let targets = this.findAllCreaturesInsideEnemy()
            for (let i = 0; i<targets.length; i++) {
                applyDebuff(this.caster,targets[i],this.ability)
            }
        } else if (this.data.type==="sigilofFlame") {
            let targets = this.findAllCreaturesInsideEnemy()
            for (let i = 0; i<targets.length; i++) {
                doDamage(this.caster,targets[i],this.ability)
                applyDot(this.caster,targets[i],this.ability,undefined,undefined,this.data.spellPowerDot)
            }
        } else if (this.data.type==="applyDebuffEnd") {
            let targets = this.findAllCreaturesInsideEnemy()
            for (let i = 0; i<targets.length; i++) {
                applyDebuff(this.caster,targets[i],this.ability)
            }
        }
    }
}

let areas = []

let addArea = function(id,caster,ability,type,duration,data,x,y,drawArea,radius = 0,width = 0,height = 0) {
    for (let i = 0; i < areas.length; i++) {
        if (areas[i] === undefined) {
            areas[i] = new Area(i, caster, ability, type, duration, data, x, y, drawArea, radius, width, height)
            return i
        }
    }
    areas.push(new Area(id, caster, ability, type, duration, data, x, y, drawArea, radius, width, height))
    return id
}
