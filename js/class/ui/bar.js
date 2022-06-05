class Bar {
    constructor(width,height,val,maxVal,x,y,color,backgroundColor,id,fontsize = 16,borderColor = "#111111") {
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

        let div = document.createElement("div")
        div.style.position = "fixed"
        div.style.top = y+"px"
        div.style.left = x+"px"
        div.style.width = width+"px"
        div.style.height = height+"px"
        div.style.backgroundColor = backgroundColor
        div.style.border = "2px solid "+borderColor
        div.style.borderRadius = "1px"
        div.id = id+"_bg"

        let div2 = document.createElement("div")
        div2.style.position = "fixed"
        div2.style.top = (y+2)+"px"
        div2.style.left = (x+2)+"px"
        div2.style.width = width+"px"
        div2.style.height = height+"px"
        div2.style.backgroundColor = color
        div2.id = id

        let span = document.createElement("span")
        span.style.position = "fixed"
        span.style.top = (y+2)+"px"
        span.style.left = (x)+"px"
        span.style.width = width+"px"
        span.style.height = height+"px"
        span.style.textAlign = "center"
        span.style.fontSize = fontsize+"px"
        span.style.textShadow = "-1px -1px 1px rgba(0,0,0,0.8), 1px -1px 1px rgba(0,0,0,0.8), -1px 1px 1px #000, 1px 1px 1px rgba(0,0,0,0.8)"
        span.id = id+"_text"

        elements.creatureBars.appendChild(div)
        elements.creatureBars.appendChild(div2)
        elements.creatureBars.appendChild(span)
    }

    setVal(val) {
        this.val = val
    }
    setMaxVal(val) {
        this.maxVal = val
    }

    setText(text) {
        document.getElementById(this.id+"_text").innerText = text
    }
    setVisibility(vis) {
        if (!vis) {
            document.getElementById(this.id).style.display = "none"
            document.getElementById(this.id+"_bg").style.display = "none"
            document.getElementById(this.id+"_text").style.display = "none"
        } else {
            document.getElementById(this.id).style.display = "inline-block"
            document.getElementById(this.id+"_bg").style.display = "inline-block"
            document.getElementById(this.id+"_text").style.display = "inline-block"
        }
    }

    setPosition(x,y,center = false) {
        if (center) {
            x-= (this.width*gameScaling)/2
            y-= (this.height*gameScaling)/2
        }
        document.getElementById(this.id).style.top = (y+2)+"px"
        document.getElementById(this.id).style.left = (x+2)+"px"

        document.getElementById(this.id+"_text").style.top = (y+2)+"px"
        document.getElementById(this.id+"_text").style.left = x+"px"

        document.getElementById(this.id+"_bg").style.top = y+"px"
        document.getElementById(this.id+"_bg").style.left = x+"px"
    }

    updateSize() {

        this.width2 = this.width*gameScaling
        document.getElementById(this.id+"_text").style.fontSize = (this.fontSize*gameScaling)+"px"

        document.getElementById(this.id+"_text").style.width = (this.width*gameScaling)+"px"
        document.getElementById(this.id+"_bg").style.width = (this.width*gameScaling)+"px"

        document.getElementById(this.id).style.height = (this.height*gameScaling)+"px"
        document.getElementById(this.id+"_text").style.height = (this.height*gameScaling)+"px"
        document.getElementById(this.id+"_bg").style.height = (this.height*gameScaling)+"px"
    }
}

let bars = {}