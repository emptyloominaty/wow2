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
        this.zIndex = 0
        this.text = ""

        let mainDiv = document.createElement("div")
        mainDiv.style.position = "fixed"
        mainDiv.style.top = y+"px"
        mainDiv.style.left = x+"px"
        mainDiv.style.width = width+"px"
        mainDiv.style.height = height+"px"
        mainDiv.style.backgroundColor = backgroundColor
        mainDiv.style.border = "2px solid "+borderColor
        mainDiv.style.borderRadius = "1px"
        mainDiv.style.pointerEvents = "none"
        if (onClick) {
            mainDiv.style.pointerEvents = "auto"
        }
        mainDiv.id = id+"_main"

        elements.creatureBars.appendChild(mainDiv)
        elements[id+"_main"] = document.getElementById(id+"_main")

        let div2 = document.createElement("div")
        div2.style.position = "absolute"
        div2.style.top = "0px"
        div2.style.left = "0px"
        div2.style.width = "0%"
        div2.style.height =  "100%"
        div2.style.overflow = "visible"
        div2.style.backgroundColor = color
        div2.style.pointerEvents= "none"
        div2.id = id

        let span = document.createElement("div")
        span.style.position = "relative"
        span.style.width = "100%"
        span.style.height = "100%"
        span.style.textAlign = "center"
        span.style.fontSize = fontsize+"px"
        span.style.pointerEvents= "none"
        span.style.textShadow = "-1px -1px 1px rgba(0,0,0,0.8), 1px -1px 1px rgba(0,0,0,0.8), -1px 1px 1px #000, 1px 1px 1px rgba(0,0,0,0.8)"
        span.id = id+"_text"


        elements[id+"_main"].appendChild(div2)
        elements[id+"_main"].appendChild(span)

        this.elements = {}
        this.elements.el = document.getElementById(this.id)
        this.elements.text =document.getElementById(this.id+"_text")
        this.elements.main = elements[id+"_main"]

        let click = (e)=> {
            player.targetObj = creatures[this.cId]
            player.target = creatures[this.cId].name
            document.getElementById("raidFrame"+targetSelect).style.outline = "0px solid #fff"
        }
        if (onClick) {
            document.getElementById(id+"_main").addEventListener('click', click)
        }
    }

    setVal(val) {
        this.val = val
    }
    setMaxVal(val) {
        this.maxVal = val
    }

    setText(text) {
        if (this.text!==text) {
            this.text = text
            this.elements.text.textContent = text
        }
    }

    setVisibility(vis) {
        if (!vis) {
            this.elements.main.style.display = "none"
        } else {
            this.elements.main.style.display = "inline-block"
        }
    }

    setPosition(x,y,center = false) {
        if (this.x!==x || this.y!==y) {
            this.x = x
            this.y = y
            if (center) {
                x-= (this.width*gameScaling)/2
                y-= (this.height*gameScaling)/2
            }
            this.elements.main.style.transform = "translate("+x+"px,"+y+"px)"
        }
    }

    setZIndex(val) {
        if (val!==this.zIndex) {
            this.elements.main.style.zIndex = val
            this.zIndex = val
        }
    }

    changeColor(color) {
        this.elements.el.style.backgroundColor = color
    }

    updateSize() {
        if (this.updateS) {
            this.width2 = this.width*gameScaling
            this.elements.text.style.fontSize = (this.fontSize*gameScaling)+"px"

            this.elements.main.style.width = (this.width2)+"px"
            this.elements.main.style.height = (this.height*gameScaling)+"px"
        }
    }
}

let bars = {}