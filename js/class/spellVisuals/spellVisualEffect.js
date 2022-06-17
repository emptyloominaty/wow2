class SpellVisualEffect {
    constructor(id,x,y,direction,type,data) {
        this.x = x
        this.y = y

        this.direction = direction
        this.type = type //projectile, hot/dot, glow(target), area
        this.data = data
        this.id = id
        if (data.duration) {
            this.duration = data.duration
        }
    }
//(caster.x,caster.y,getDirection(caster,caster.castTarget),"projectile",{size:10,speed:50,target:caster.castTarget,color:"#FF0000",onEnd:{name:"explode",size:1},onRun:{name:"fire",size:0.8}})
    run() {
        if (settings.spellVisuals!==0) {
            if (this.type==="projectile") { //--------------------------------------Projectile
                this.direction = getDirection(this,this.data.target)
                this.move()

                let x = (this.x - player.x)*gameScaling
                let y = (this.y - player.y)*gameScaling
                let x2d = (game2d.canvasW/2)+x
                let y2d = (game2d.canvasH/2)+y

                if (this.data.quadrilateral) {
                    let d = this.data.polygonData
                    game2d.drawQuadrilateral(x2d,y2d,d.x1,d.y1,d.x2,d.y2,d.x3,d.y3,d.x4,d.y4,this.data.color,this.direction)
                } else {
                    game2d.drawCircle(x2d,y2d,this.data.size,this.data.color)
                }



                if (settings.spellVisuals>1) {
                    if (this.data.onRun.name==="fire") {
                        let life = this.data.onRun.life
                        for (let i = 0; i<settings.spellVisuals-1; i++) {
                            addSpellParticle(this.x-(this.data.size/4)+(Math.random()*(this.data.size/2)), this.y-(this.data.size/2)+(Math.random()*(this.data.size)), (this.direction-(182-(Math.random()*4))),
                                "fire", {size:this.data.size/4,speed:-this.data.speed,life:life,color:Math.random(),color1:this.data.onRun.color1, color2:this.data.onRun.color2})
                        }
                    }
                }

                if (getDistance(this,this.data.target)<0.8) {
                    this.end()
                    spellVisualEffects[this.id] = undefined
                }
            } else if (this.type==="rain") {//--------------------------------------Rain
                for (let i = 0; i<settings.spellVisuals*3; i++) {
                    let radius = this.data.size*1.2
                    let pt_angle = Math.random() * 2 * Math.PI
                    let pt_radius_sq = Math.random() * radius * radius
                    let x = this.x-Math.sqrt(pt_radius_sq) * Math.cos(pt_angle)
                    let y = this.y-Math.sqrt(pt_radius_sq) * Math.sin(pt_angle)

                    let x2 = this.x + (this.x-x)/3
                    let y2 = this.y + (this.y-y)/3

                    addSpellParticle(x, y, 0,
                        "rain", {size: 3, speed: this.data.speed, life: 0.3,maxLife:0.3, color: this.data.color,centre:{x:x2 ,y:y2 }})
                }
                this.duration -= progressInSec
                if (this.duration<=0) {
                    spellVisualEffects[this.id] = undefined
                }
            }
            //-----------------------------------------------------------End
        } else {
            this.end()
            spellVisualEffects[this.id] = undefined
        }
    }

    end() {
        //if (settings.spellVisuals>1) {
            //if (this.data.onEnd==="explode") {

            //}
        //}
    }

    move() {
        let speed = (this.data.speed*pxToMeter) * progressInSec //pxtometer
        let angleInRadian = (this.direction-180) / 180 * Math.PI


        let vx = Math.sin(angleInRadian) * speed
        let vy = Math.cos(angleInRadian) * speed

        this.x += vx
        this.y += vy
    }

}

let spellVisualEffects = []

let addSpellVisualEffects = function(x,y,direction,type,data) {
    for (let i = 0; i < spellVisualEffects.length; i++) {
        if (spellVisualEffects[i] === undefined) {
            spellVisualEffects[i] = new SpellVisualEffect(i,x,y,direction,type,data)
            return true
        }
    }
    spellVisualEffects.push(new SpellVisualEffect(spellVisualEffects.length,x,y,direction,type,data))
}