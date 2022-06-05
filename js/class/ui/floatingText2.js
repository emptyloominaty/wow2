class FloatingText2 {
    duration = 0
    maxDuration = 2.5
    speed = 0.7
    constructor(x,y,val,type,id) {
        this.x = x
        this.y = y

        this.type = type
        this.id = id
        this.crit = false
        this.texts = []

        /*if (floatingTexts[this.id]!==undefined) {
            let el = document.getElementById(this.id+"_floatText")
            el.remove()
        }*/

        let html = "<div id='"+this.id+"_floatText2' style='position: fixed; top:"+y+"px; left:"+x+"px; overflow:visible;' ></div>"


        //    html += "<span class='floatingText2_damage'>KEKW</span>"

        /*let span = document.createElement("span")
        span.style.position = "fixed"
        span.style.top = (y+offsetY)+"px"
        span.style.left = (x+offsetX)+"px"
        span.style.textAlign = "center"
        span.id = this.id+"_floatText2"
        span.style.width = 100+"px"
        span.style.overflow = "visible"


        span.textContent = val
        span.style.textShadow = "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000"



        elements.ui.appendChild(span)
         */

        elements.ui.insertAdjacentHTML("beforeend", html) //TODO: elements.floatingTexts
        this.element =  document.getElementById(this.id+"_floatText2")

    }

    setPosition(x,y) {
        this.x = x
        this.y = y
        this.element.style.top = (y)+"px"
        this.element.style.left = (x)+"px"
    }

    addText(val,type,crit = 1) {
        if(this.x<50 || this.y<50 || this.x>(game2d.canvasW-50) || this.y>(game2d.canvasH-50) ) {
            return false
        }

        let span = document.createElement("span")
        span.style.position = "fixed"
        span.style.top = ((1-Math.random())*(30))+(this.y-25)+"px"
        span.style.left = ((1-Math.random())*(30))+(this.x-35)+"px"
        span.style.textAlign = "center"
        let idd = (performance.now()+Math.random())
        span.id = this.id+"_floatText2"+idd
        span.textContent = val.toFixed(0)
        span.style.overflow = "visible"
        span.style.textShadow = "-1px -1px 0 rgba(0,0,0,0.5), 1px -1px 0 rgba(0,0,0,0.5), -1px 1px 0 #000, 1px 1px 0 rgba(0,0,0,0.5)"
        if (type==="heal") {
            span.style.color = "#79ff74"
        } else if (type==="damage") {
            span.style.color = "#e8e299"
        }

        let font = 12
        let fontCrit = 18

        if (settings.reduceTargetFlaotingHealingFont && type==="heal") {
            font = 6
            fontCrit = 8
        }

        if (crit===1) {
            span.style.fontSize = (font*gameScaling)+"px"
        } else {
            span.style.fontSize = (fontCrit*gameScaling)+"px"
        }

        elements.floatingText2.appendChild(span)
        let element = document.getElementById(this.id+"_floatText2"+idd)
        this.texts.push({element:element,time:0,val:val,crit:crit,type:type,animationData:{}})


    }

    run() {
        for (let i = 0; i<this.texts.length; i++) {
            let text = this.texts[i]
            text.time += progressInSec

            if (text.time<0.1) {
                let size = 1+(text.time*6)
                text.element.style.transform = "scale("+size+", "+size+")"
            } else if (text.time>0.1 && text.time<0.2) {
                let size = 2.2-(text.time*6)
                text.element.style.transform = "scale("+size+", "+size+")"
            } else if (text.time>1) {
                text.element.style.opacity = 2.5-(text.time*2)
            }
            if (text.time>0.1) {
                let y = parseInt(text.element.style.top, 10)
                text.element.style.top = (y-(0.005*gameScaling))+"px"

                if (y<50) {
                    text.element.remove()
                    this.texts.splice(i,1)
                    i--
                    continue
                }
            }
            if (text.time>1.5) {
                text.element.remove()
                this.texts.splice(i,1)
                i--
            }
        }
    }

    removeAll() {
        for (let i = 0; i<this.texts.length; i++) {
            this.texts[i].element.remove()
        }
        this.texts = []
    }
}