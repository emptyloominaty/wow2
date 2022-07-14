let logsSettings = {id:6,type:"dps",type2:"abilities"}

let open_logs = function(reload = false,type = false) {
    if (type!==false) {
        logsSettings.type = type
    }
    if (currentWindow === "logs" && !reload) {
        close_window()
        return
    } else {
        elements.window.innerHTML = ""
    }
    currentWindow = "logs"
    let html = "<div class='windowHeader'><span>Logs</span> <span>"+creatures[logsSettings.id].name+"("+logsSettings.type+")</span> <div onclick='close_window()'>x</div></div>"
    html += "<div class='windowBody'>"

    html += "<div class='window_logs_header'> <div class='window_logs_header2_1'><button onclick='open_logs(true,\"dps\");'>DPS</button><button onclick='open_logs(true,\"hps\");'>HPS</button><button onclick='open_logs(true,\"dtps\");'>DTPS</button></div> <div class='window_logs_header2_2'><button>Total</button><button>Abilities</button></div> </div>"

    //-------START
    html += "<div class='window_logs_body'>"
    //-------GRAPH
    html += "<div class='window_logs_body_graph' id='window_logs_graph'>"
    html += "<canvas id='logs_graph'></canvas>"
    html += "</div>"
    //-------GRAPH END
    //-------LIST OF RAIDERS
    html += "<div class='window_logs_body_raiderList'>"

    for (let i = 0; i<friendlyTargets.length; i++) {
        html += "<button onclick='logsSettings.id = "+friendlyTargets[i].id+";open_logs(true)' class='window_logs_raiderList_button'>"+friendlyTargets[i].name+"</button>"
    }

    html += "</div>"
    //-------LIST END

    html += "</div>"
    //-------END
    html += "</div>"
    elements.window.innerHTML = html
    let canvasElement = document.getElementById("logs_graph")
    canvasElement.style.border = "1px solid rgba(255,255,255,0.3)"
    let canvas = canvasElement.getContext("2d")

    let graphDiv = document.getElementById("window_logs_graph")

    let drawLine = function(x1,y1,x2,y2,lineWidth,color) {
        canvas.beginPath()
        canvas.moveTo(x1, y1)
        canvas.lineTo(x2, y2)
        canvas.lineWidth = lineWidth
        canvas.strokeStyle = color
        canvas.stroke()
        canvas.closePath()
    }

    let drawCircle = function(x,y,radius,color) {
        canvas.beginPath()
        canvas.fillStyle = color
        canvas.arc(x, y, radius, 0, 2 * Math.PI, false)
        canvas.fill()
        canvas.closePath()
    }

    let drawText = function(x,y,text,font = "12px Courier New",color = "#888",align = "center") {
        canvas.textAlign = align
        canvas.font = font //"16px Courier New"
        canvas.fillStyle = color
        canvas.fillText(text,x,y)
    }

    let canvasW = graphDiv.getBoundingClientRect().width-2
    let canvasH = graphDiv.getBoundingClientRect().height
    canvasElement.width  = canvasW
    canvasElement.height = canvasH
    canvas.clearRect(0,0,canvasW,canvasH)

    //logsSettings = {id:11,type:"dps",type2:"abilities"}
    let timeline
    if (logsSettings.type==="dps") {
        timeline = timelineCombatLog.damageTimeline
    } else if (logsSettings.type==="hps")  {
        timeline = timelineCombatLog.healTimeline
    } else if (logsSettings.type==="dtps")  {
        timeline = timelineCombatLog.damageTakenTimeline
    }
    let timelineI = timeline[logsSettings.id]
    let combatLength = timelineCombatLog.timerNext-1
    //Time
    for (let i = 0; i<combatLength; i++) {
        let textX = 15+(i/combatLength)*canvasW
        drawText(textX,15,i)
        drawLine(textX,20,textX,canvasH,1,"rgba(255,255,255,0.1)")
    }

    let totalVals = []
    let maxVal = 0
    for (let i = 0; i<combatLength; i++) {
        Object.keys(timelineI).forEach(key => {
            let val = timelineI[key][i]
            if (val) {
                if (totalVals[i]) {
                    totalVals[i] += val
                } else {
                    totalVals[i] = val
                }
                /*if (totalVals[i]>maxVal) {
                    maxVal = totalVals[i]
                }*/
            }
        })
    }
    for (let i = 0; i<totalVals.length; i++) {
        if (!totalVals[i]) {
            totalVals[i] = 0
        }
    }

    let totalValsInt = []

    for (let i = 0; i<totalVals.length; i++) {
        if (i>0 && i<combatLength) {
            if (i>2 && i+2<combatLength) {
                totalValsInt[i] = (totalVals[i-2]+totalVals[i-1]+totalVals[i]+totalVals[i+1]+totalVals[i+2])/5
            } else if (i>1 && i+1<combatLength) {
                totalValsInt[i] = (totalVals[i-1]+totalVals[i]+totalVals[i+1])/3
            }
        } else {
            totalValsInt[i] = totalVals[i]
        }
    }

    for (let i = 0; i<totalValsInt.length; i++) {
       if (totalValsInt[i]>maxVal) {
           maxVal = totalValsInt[i]

       }
    }

    for (let i = 0; i<totalValsInt.length; i++) {
        if (totalValsInt[i]) {
            let x = 15+(i/combatLength)*canvasW
            let y = canvasH - ((totalValsInt[i]/(maxVal*1.1))*canvasH)
            drawCircle(x,y,3,"#FFF")
        }
    }

    for (let i = 0; i<totalValsInt.length; i++) {
        if (i>0) {

            let x1 = 15+((i-1)/combatLength)*canvasW
            let y1 = canvasH - ((totalValsInt[i-1]/(maxVal*1.1))*canvasH)

            let x2 = 15+(i/combatLength)*canvasW
            let y2 = canvasH - ((totalValsInt[i]/(maxVal*1.1))*canvasH)

            drawLine(x1,y1,x2,y2,1,"#999")
        }
    }

    //Text
    drawText(0,canvasH*0.1,getNumberString(maxVal),undefined,"#CCC","left")
    drawLine(0,canvasH*0.1,canvasW,canvasH*0.1,1,"rgba(255,255,255,0.1)")

    drawText(0,canvasH*0.55,getNumberString(maxVal/2),undefined,"#CCC","left")
    drawLine(0,canvasH*0.55,canvasW,canvasH*0.55,1,"rgba(255,255,255,0.1)")

    drawText(0,canvasH*0.775,getNumberString(maxVal/4),undefined,"#CCC","left")
    drawLine(0,canvasH*0.775,canvasW,canvasH*0.775,1,"rgba(255,255,255,0.1)")

    drawText(0,canvasH*0.8875,getNumberString(maxVal/8),undefined,"#CCC","left")
    drawLine(0,canvasH*0.8875,canvasW,canvasH*0.8875,1,"rgba(255,255,255,0.1)")

    drawText(0,canvasH*0.94375,getNumberString(maxVal/16),undefined,"#CCC","left")
    drawLine(0,canvasH*0.94375,canvasW,canvasH*0.94375,1,"rgba(255,255,255,0.1)")

    drawText(0,canvasH,0,undefined,"#CCC","left")

    /*for (let i = 0; i<combatLength; i++) {
        Object.keys(timelineI).forEach(key => {
            let val = timelineI[key][i]
            if (val) {
                let x = 15+(i/combatLength)*canvasW
                let y = canvasH - val/100
                drawCircle(x,y,5,"#FFF")
            }
        })
    }*/


}