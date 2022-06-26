class Pet {
    time = 0
    timer = 0
    timer2 = 1

    health = 100
    maxHealth = 100
    energy = 100
    maxEnergy = 100
    secondaryResource = 0
    maxSecondaryResource = 0
    secondaryResourceName = "Combo"
    moveSpeed = 1
    size = 8
    screenPosition = {x:0,y:0}
    direction = 0
    enemy = false
    mousePos = {x:0,y:0}
    isStunned = false
    isStunnable = false
    isRooted = false
    isInterrupted = false
    isCasting = false
    isChanneling = false
    isMoving = false
    canMoveWhileCasting = false
    channeling = {name:"", time:0, time2:0}
    isRolling = false
    casting = {name:"", time:0, time2:0}
    isDead = false
    playerCharacter = false
    form = ""
    formEffects = []
    spellHistory = []
    talents = []
    buffs = []
    debuffs = []
    absorb = 0
    increaseHealth = 1
    healingIncrease = 1
    damageIncrease = 1
    moveSpeedIncrease = 1
    target = ""
    targetObj = {}
    castTarget = {}
    healingDone = 0
    damageDone = 0
    damageTaken = 0
    aggroMultiplier = 1
    damageReduction = 0
    magicDamageReduction = 0
    reduceEnergyCost = 1
    attackSpeed = 1
    gcd = 0
    id3 = 99
    spec = "pet"
    class = "Pet"
    melee = true
    role = "dps"

    constructor(id,caster,type,duration,data,x,y) {
        this.id = id
        this.caster = caster
        this.type = type //pet / guardian / totem
        if (this.type==="totem") {
            this.melee = false
        }
        this.duration = duration

        this.x = x
        this.y = y

        this.data = data
        this.name = this.data.name
        this.stats = JSON.parse(JSON.stringify(caster.stats))


        this.abilities = this.data.abilities
        this.abilities["Auto Attack"] = new AutoAttack()
        this.abilities["Leech"] = new Leech()

        this.start()
    }

    run() {
        //abilities cds
        Object.keys(this.abilities).forEach((key)=> {
            this.abilities[key].run(this)
            this.abilities[key].incCd(this)
        })

        this.energy += (10*(1+(this.stats.haste/100)))/fps

        if (this.energy>this.maxEnergy) {
            this.energy = this.maxEnergy
        }

        if (this.gcd>0) {
            this.gcd -= progressInSec
        }

        //casting ability
        if (this.isCasting) {
            if (this.casting.time<this.casting.time2) {
                this.casting.time += progressInSec
            } else {
                this.abilities[this.casting.name].endCast(this)
                this.isCasting = false
            }
        }
        //channeling ability
        if (this.isChanneling) {
            if (this.channeling.time<this.channeling.time2) {
                this.channeling.time += progressInSec
                this.channeling.timer += progressInSec
                if (this.channeling.timer>=this.channeling.timer2) {
                    this.channeling.timer = 0
                    this.abilities[this.channeling.name].cast(this)
                }
            } else {
                if (this.abilities[this.channeling.name].endChanneling) {
                    this.abilities[this.channeling.name].endChanneling(this)
                }
                this.isChanneling = false
            }
        }

        //autoattack
        if (this.melee) {
            this.abilities["Auto Attack"].startCast(this)
        }

        //buffs
        for (let i = 0; i<this.buffs.length; i++) {
            if (Array.isArray(this.buffs[i].effect)) {
                //NEW
                for (let j = 0; j<this.buffs[i].effect.length; j++) {
                    if (this.buffs[i].effect[j].name === "move") {
                        this.move((this.buffs[i].effect[j].val*40)/fps,undefined,undefined,true)
                    } else if (this.buffs[i].effect[j].name === "moveSpeed") {
                        if (this.buffs[i].stacks>1) {
                            this.moveSpeedIncrease += this.buffs[i].effect[j].val * this.buffs[i].stacks
                        } else {
                            this.moveSpeedIncrease += this.buffs[i].effect[j].val
                        }
                    } else if (this.buffs[i].effect[j].name === "incAttackSpeed") {
                        this.attackSpeed *= (1+this.buffs[i].effect[j].val)
                    } else if (this.buffs[i].effect[j].name === "increaseHealth") {
                        this.increaseHealth += this.buffs[i].effect[j].val
                    } else if (this.buffs[i].effect[j].name === "moveToTarget") {
                        if (this.buffs[i].effect[j]._end===undefined) {
                            this.direction = getDirection(this,this.buffs[i].effect[j].target)
                            this.move((this.buffs[i].effect[j].val*40)/fps,undefined,undefined,true)
                            if (getDistance(this,this.buffs[i].effect[j].target)<3) {
                                this.buffs[i].effect[j]._end = true
                            }
                        }
                    }
                }
            }
        }

        for (let i = 0; i<this.data.do.length;i++ ) {
            if (this.data.do[i].name==="cast") {
                this.abilities[this.data.do[i].ability].startCast(this)
            } else  if (this.data.do[i].name==="castDot") {
                this.abilities[this.data.do[i].ability].startCast(this)
            } else if (this.data.do[i].name==="goMelee") { //TODO
                let newTarget = findNearestEnemy(this)
                if (newTarget!==false) {
                    this.targetObj = newTarget
                    this.target = newTarget.name
                }
                this.direction = getDirection(this,this.targetObj)
                let dist = getDistance(this,this.targetObj)
                if (dist>4) {
                    this.move(1)
                } else {
                    //ABILITIES //TODO
                }
            }
        }

        if (this.timer<this.timer2) {
            this.timer += progressInSec
        } else {
            this.timer = 0
            this.stats = JSON.parse(JSON.stringify(this.caster.stats))
        }

        this.time += progressInSec
        if (this.time>this.duration) {
            this.end()
            this.caster.pets[this.id] = undefined
        }
    }

    draw() {
        let x = (this.x - player.x)*gameScaling
        let y = (this.y - player.y)*gameScaling
        let x2d = (game2d.canvasW/2)+x
        let y2d = (game2d.canvasH/2)+y
        game2d.drawCircle(x2d,y2d,this.data.size*gameScaling,this.data.color)
    }

    start() {
    }

    end() {
    }

    move(val, forceVal = 0,noInc = false) {
        let speed
        if (!noInc) {
            speed = (val*pxToMeter) * this.moveSpeed * this.moveSpeedIncrease
        } else {
            speed = val
        }

        if (forceVal!==0) {
            speed = forceVal
        }

        let angleInRadian = (this.direction-180) / 180 * Math.PI

        let vx = Math.sin(angleInRadian) * speed
        let vy = Math.cos(angleInRadian) * speed

        this.x += vx
        this.y += vy
    }

    useSec(val) {
        if (val==="all") {
            this.secondaryResource = 0
        } else {
            this.secondaryResource -= val
            if (this.secondaryResource>this.maxSecondaryResource) {
                this.secondaryResource = this.maxSecondaryResource
            }
        }

    }

    useEnergy(val,val2 = 0) {
        if (this.reduceEnergyCost<0) {this.reduceEnergyCost=0}
        this.energy -= val * this.reduceEnergyCost
        if (val2!==0 && this.maxSecondaryResource>0) {
            this.useSec(val2)
        }
    }


}