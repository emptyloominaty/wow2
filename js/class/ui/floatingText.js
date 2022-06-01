class FloatingText {
    duration = 0
    maxDuration = 3
    speed = 1.4
    constructor(x,y,val,type,crit,name,id,targetText = false) {



        this.x = x
        this.y = y
        this.number = val
        this.type = type
        this.id = id

        if (floatingTexts[this.id]!==undefined) {
            let el = document.getElementById(this.id+"_floatText")
            el.remove()
        }

        if (targetText) {
            this.maxDuration = 2
            this.speed = 0.7
        }

        let span = document.createElement("span")
        span.style.position = "fixed"
        span.style.top = ((1-Math.random())*20)+y+"px"
        span.style.left = ((1-Math.random())*20)+x+"px"
        span.style.textAlign = "center"
        span.id = this.id+"_floatText"
        span.textContent = val.toFixed(0)
        span.style.textShadow = "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000"
        if (type==="heal") {
            span.style.color = "#65ff65"
        } else if (type==="damage") {
            span.style.color = "#ff626f"
        }

        if (crit===1) {
            span.style.fontSize = "15px"
        } else {
            span.style.fontSize = "25px"
        }
        if (settings.showFloatingAbilityName && !targetText) {
            span.textContent += " ("+name+")"
        }

        elements.ui.appendChild(span)
        this.element = document.getElementById(this.id+"_floatText")
    }

    run() {
        this.duration += progressInSec
        this.y -= this.speed
        this.element.style.top=this.y+"px"
        if (this.duration>this.maxDuration) {
            this.element.remove()
            floatingTexts[this.id]=undefined
        }
    }
}

let floatingTexts = new Array(1000)
let floatingTextIdx = 0