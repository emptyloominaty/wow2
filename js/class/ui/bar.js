class Bar {
    constructor(width,height,val,maxVal,x,y,color,backgroundColor,id) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.val = val
        this.maxVal = maxVal
        this.color = color
        this.backgroundColor = backgroundColor
        this.id = id

        let div = document.createElement("div")
        div.style.position = "fixed"
        div.style.top = y+"px"
        div.style.left = x+"px"
        div.style.width = width+"px"
        div.style.height = height+"px"
        div.style.backgroundColor = backgroundColor
        div.style.border = "2px solid #111111"
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
        span.id = id+"_text"


        elements.ui.appendChild(div)
        elements.ui.appendChild(div2)
        elements.ui.appendChild(span)
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
}

let bars = {}