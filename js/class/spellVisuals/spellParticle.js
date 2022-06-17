class SpellParticle {
    constructor(id,x,y,direction,type,data) {
        this.x = x
        this.y = y

        this.direction = direction
        this.type = type
        this.data = data
        this.id = id
    }


    run() {
        // ,"fire",{speed:0.5,life:0.8})
        let color
        if (this.type==="fire") {
            color = this.data.color1
            if (this.data.color > 0.5) {
                color = this.data.color2
            }
        } else if (this.type === "rain") {
            color = "rgba(56,191,187,0.52)"
            this.direction = getDirection(this,this.data.centre)
            this.data.size = this.data.life*10
        }

        this.move()

            let x = (this.x - player.x) * gameScaling
            let y = (this.y - player.y) * gameScaling
            let x2d = (game2d.canvasW / 2) + x
            let y2d = (game2d.canvasH / 2) + y


        if (this.type!=="rain") {
            //opacity
            if (this.data.life<0.2) {
                color = pSBC ( 1-(this.data.life*3), color, "rgba(0,0,0,0)", true );
            }
            game2d.drawCircle(x2d, y2d, this.data.size, color)
            this.data.speed -= this.data.speed / 10
        } else {
            //game2d.drawCircle(x2d, y2d, this.data.size, color)
            game2d.drawLineRotate(x2d,y2d,this.data.size/2,this.data.size,180-this.direction, color)
        }

            this.data.life -= progressInSec
            if (this.data.life <= 0) {
                spellParticles[this.id] = undefined
            }

    }

    move() {
        let speed = this.data.speed * progressInSec
        let angleInRadian = (this.direction-180) / 180 * Math.PI


        let vx = Math.sin(angleInRadian) * speed
        let vy = Math.cos(angleInRadian) * speed

        this.x += vx
        this.y += vy
    }

}

let spellParticles = []

let addSpellParticle = function(x,y,direction,type,data) {
    for (let i = 0; i < spellParticles.length; i++) {
        if (spellParticles[i] === undefined) {
            spellParticles[i] = new SpellParticle(i,x,y,direction,type,data)
            return true
        }
    }
    spellParticles.push(new SpellParticle(spellParticles.length,x,y,direction,type,data))
}