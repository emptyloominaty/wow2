class Bar {
    constructor(width,height,val,maxVal,x,y,color,backgroundColor,id,fontsize = 16,borderColor = "#111111",onClick = false,cId = 0,updateS = true) {
        this.x = x
        this.y = y
        this.width = width
        this.width2 = width
        this.height = height
        this.val = val
        this.maxVal = maxVal
        this.color = color
        this.fontSize = fontsize
        this.backgroundColor = backgroundColor
        this.id = id
        this.cId = cId
        this.updateS = updateS

        let div = document.createElement("div")
        div.style.position = "fixed"
        div.style.top = y+"px"
        div.style.left = x+"px"
        div.style.width = width+"px"
        div.style.height = height+"px"
        div.style.backgroundColor = backgroundColor
        div.style.border = "2px solid "+borderColor
        div.style.borderRadius = "1px"
        div.style.pointerEvents= "none"
        if (onClick) {
            div.style.pointerEvents = "auto"
        }

        div.id = id+"_bg"

        let div2 = document.createElement("div")
        div2.style.position = "fixed"
        div2.style.top = (y+2)+"px"
        div2.style.left = (x+2)+"px"
        div2.style.width = width+"px"
        div2.style.height = height+"px"
        div2.style.backgroundColor = color
        div2.style.pointerEvents= "none"
        div2.id = id

        let span = document.createElement("div")
        span.style.position = "fixed"
        span.style.top = (y+2)+"px"
        span.style.left = (x)+"px"
        span.style.width = width+"px"
        span.style.height = height+"px"
        span.style.textAlign = "center"
        span.style.fontSize = fontsize+"px"
        span.style.pointerEvents= "none"
        span.style.textShadow = "-1px -1px 1px rgba(0,0,0,0.8), 1px -1px 1px rgba(0,0,0,0.8), -1px 1px 1px #000, 1px 1px 1px rgba(0,0,0,0.8)"
        span.id = id+"_text"

        elements.creatureBars.appendChild(div)
        elements.creatureBars.appendChild(div2)
        elements.creatureBars.appendChild(span)

        this.elements = {}
        this.elements.el = document.getElementById(this.id)
        this.elements.text =document.getElementById(this.id+"_text")
        this.elements.bg = document.getElementById(this.id+"_bg")

        let click = (e)=> {
            player.targetObj = creatures[this.cId]
            player.target = creatures[this.cId].name
            document.getElementById("raidFrame"+targetSelect).style.outline = "0px solid #fff"
        }
        if (onClick) {
            document.getElementById(id+"_bg").addEventListener('click', click)
        }
    }

    setVal(val) {
        this.val = val
    }
    setMaxVal(val) {
        this.maxVal = val
    }

    setText(text) {
        this.elements.text.textContent = text
    }

    setVisibility(vis) {
        if (!vis) {
            this.elements.el.style.display = "none"
            this.elements.bg.style.display = "none"
            this.elements.text.style.display = "none"
        } else {
            this.elements.el.style.display = "inline-block"
            this.elements.bg.style.display = "inline-block"
            this.elements.text.style.display = "inline-block"
        }
    }

    setPosition(x,y,center = false) {
        if (center) {
            x-= (this.width*gameScaling)/2
            y-= (this.height*gameScaling)/2
        }
        this.elements.el.style.transform = "translate("+x+"px,"+y+"px)"
        this.elements.text.style.transform = "translate("+x+"px,"+y+"px)"
        this.elements.bg.style.transform = "translate("+x+"px,"+y+"px)"

        /*this.elements.el.style.top = (y+2)+"px"
        this.elements.el.style.left = (x+2)+"px"
        this.elements.text.style.top = (y+2)+"px"
        this.elements.text.style.left = x+"px"
        this.elements.bg.style.top = y+"px"
        this.elements.bg.style.left = x+"px"*/

    }

    setZIndex(val) {
        this.elements.el.style.zIndex = val
        this.elements.text.style.zIndex = val
        this.elements.bg.style.zIndex = val
    }

    changeColor(color) {
        this.elements.el.style.backgroundColor = color
    }

    updateSize() {
        if (this.updateS) {
            this.width2 = this.width*gameScaling
            this.elements.text.style.fontSize = (this.fontSize*gameScaling)+"px"

            this.elements.text.style.width = (this.width*gameScaling)+"px"
            this.elements.bg.style.width = (this.width*gameScaling)+"px"

            this.elements.el.style.height = (this.height*gameScaling)+"px"
            this.elements.text.style.height = (this.height*gameScaling)+"px"
            this.elements.bg.style.height = (this.height*gameScaling)+"px"
        }
    }
}

let bars = {}