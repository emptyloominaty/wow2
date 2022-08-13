let logsSettings = {id:6,type:"dps",type2:"stacked"}

let open_logs = function(reload = false,type = false,type2 = false) {
    if (type!==false) {
        logsSettings.type = type
    }
    if (type2!==false) {
        logsSettings.type2 = type2
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

    html += "<div class='window_logs_header'> <div class='window_logs_header2_1'><button onclick='open_logs(true,\"dps\");'>DPS</button>" +
        "<button onclick='open_logs(true,\"hps\");'>HPS</button><button onclick='open_logs(true,\"dtps\");'>DTPS</button></div> <div class='window_logs_header2_2'>" +
        "<button onclick='open_logs(true,undefined,\"stacked\");'>Stacked</button><button  onclick='open_logs(true,undefined,\"notstacked\");'>Not Stacked</button></div> </div>"

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

    //---Abilities
    html += "<div id='window_logs_abilities'>"
    html += "</div>"
    //---


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

    let drawRect = function(x,y,w,h,color) {
        canvas.fillStyle = color
        canvas.fillRect(x,y,w,h)
    }

    let drawText = function(x,y,text,font = "12px Courier New",color = "#888",align = "center") {
        canvas.textAlign = align
        canvas.font = font //"16px Courier New"
        canvas.fillStyle = color
        canvas.fillText(text,x,y)
    }

    let fill = function(x1,y1,x2,y2,x3,y3,x4,y4,color) {
        canvas.fillStyle = color
        canvas.beginPath()
        canvas.moveTo(x1, y1)
        canvas.lineTo(x2, y2)
        canvas.lineTo(x3, y3)
        canvas.lineTo(x4, y4)
        canvas.closePath()
        canvas.fill()
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
    for (let i = 10; i<combatLength; i+=10) {
        let textX = 15+(i/combatLength)*canvasW
        drawText(textX,15,i)
        drawLine(textX,20,textX,canvasH,1,"rgba(255,255,255,0.1)")
    }

    let totalVals = []
    let valsAbilities = {}
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
                if (valsAbilities[key]===undefined) {
                    valsAbilities[key] = []
                }
                valsAbilities[key][i] = val
            }
        })
    }
    for (let i = 0; i<totalVals.length; i++) {
        if (!totalVals[i]) {
            totalVals[i] = 0
        }
        Object.keys(valsAbilities).forEach(key => {
            if (!valsAbilities[key][i]) {
                valsAbilities[key][i] = 0
            }
        })
    }

    let totalValsInt = []
    let valsAbilitiesInt = {}

    for (let i = 0; i<totalVals.length; i++) {
        if (i>0 && i<combatLength) {
            if (i>2 && i+2<combatLength) {
                totalValsInt[i] = (totalVals[i-2]+totalVals[i-1]+totalVals[i]+totalVals[i+1]+totalVals[i+2])/5
            } else if (i>1 && i+1<combatLength) {
                totalValsInt[i] = (totalVals[i-1]+totalVals[i]+totalVals[i+1])/5
            } else {
                totalValsInt[i] = totalVals[i]/5
            }
        } else {
            totalValsInt[i] = totalVals[i]/5
        }
        Object.keys(valsAbilities).forEach(key => {
            if (valsAbilitiesInt[key]===undefined) {
                valsAbilitiesInt[key] = []
            }
            if (i>0 && i<combatLength) {
//-------------------------------------------
                let divVal = Math.ceil(combatLength/12)
                if (divVal<5) {
                    divVal = 5
                }
                if (!(divVal % 2)) {
                    divVal++
                }
                let avgg = function(valsAbilitiesInt,key,i,divVal,mid,n) {
                    let a = 0
                    for (let l = 0; l<n; l++) {
                        a += valsAbilities[key][i+l]
                        a += valsAbilities[key][i-l]
                    }
                    return a/divVal
                }

                let checkVal = function(valsAbilitiesInt,key,i,divVal,mid) {
                    for (let o = mid; o>0; o--) {
                        if (i>o && i+o<combatLength) {
                            return avgg(valsAbilitiesInt,key,i,divVal,mid,o)
                        }
                    }
                }

                let avgV = function (valsAbilitiesInt,key,i,divVal) {
                    let mid = Math.floor(divVal/2)
                    return checkVal(valsAbilitiesInt,key,i,divVal,mid)
                }

                if (divVal===1) {
                    valsAbilitiesInt[key][i] = valsAbilities[key][i]/divVal
                } else {
                    valsAbilitiesInt[key][i] = avgV(valsAbilitiesInt,key,i,divVal)
                }
//-------------------------------------------

               /* if (i>2 && i+2<combatLength) {
                    valsAbilitiesInt[key][i] = (valsAbilities[key][i-2]+valsAbilities[key][i-1]+valsAbilities[key][i]+valsAbilities[key][i+1]+valsAbilities[key][i+2])/5
                } else if (i>1 && i+1<combatLength) {
                    valsAbilitiesInt[key][i] = (valsAbilities[key][i-1]+valsAbilities[key][i]+valsAbilities[key][i+1])/5
                } else {
                    valsAbilitiesInt[key][i] = valsAbilities[key][i]/5
                }*/


                /*if (i>2 && i+2<combatLength) {
                    valsAbilitiesInt[key][i] = (valsAbilities[key][i-2]+valsAbilities[key][i-1]+valsAbilities[key][i]+valsAbilities[key][i+1]+valsAbilities[key][i+2])/5
                } else if (i>1 && i+1<combatLength) {
                    valsAbilitiesInt[key][i] = (valsAbilities[key][i-1]+valsAbilities[key][i]+valsAbilities[key][i+1])/5
                } else {
                    valsAbilitiesInt[key][i] = valsAbilities[key][i]/5
                }*/


            } else {
                valsAbilitiesInt[key][i] = valsAbilities[key][i]/5
            }
        })
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
            /*if (logsSettings.type2!=="stacked") {
                drawCircle(x,y,3,"#FFF")
            }*/
            let a = 0
            let yStack = 0
            Object.keys(valsAbilities).forEach(key => {
                if (logsSettings.type2==="stacked") {
                    //drawRect(x,y,w,h,color)
                    yStack += (valsAbilitiesInt[key][i]/(maxVal*1.1))*canvasH
                }/* else {
                    let x = 15+(i/combatLength)*canvasW
                    let y = (canvasH - ((valsAbilitiesInt[key][i]/(maxVal*1.1))*canvasH))-yStack
                    drawCircle(x,y,3,colors.logs[a])
                }*/
                a++
            })
        }
    }

    let yStack = [0,0]
    for (let i = 0; i<totalValsInt.length; i++) {
        if (i>0) {
            let x1 = 15+((i-1)/combatLength)*canvasW
            let y1 = canvasH - ((totalValsInt[i-1]/(maxVal*1.1))*canvasH)

            let x2 = 15+(i/combatLength)*canvasW
            let y2 = canvasH - ((totalValsInt[i]/(maxVal*1.1))*canvasH)
            if (logsSettings.type2!=="stacked") {
                drawLine(x1, y1, x2, y2, 1, "#999")
            }
            let a = 0

            Object.keys(valsAbilities).forEach(key => {
                let x1 = 15+((i-1)/combatLength)*canvasW
                let y1 = (canvasH - ((valsAbilitiesInt[key][i-1]/(maxVal*1.1))*canvasH))-yStack[0]

                let x2 = 15+(i/combatLength)*canvasW
                let y2 = (canvasH - ((valsAbilitiesInt[key][i]/(maxVal*1.1))*canvasH))-yStack[1]

                drawLine(x1,y1,x2,y2,1,colors.logs[a])
                if (logsSettings.type2==="stacked") {


                    yStack[0] += (valsAbilitiesInt[key][i-1] / (maxVal * 1.1)) * canvasH
                    yStack[1] += (valsAbilitiesInt[key][i]/(maxVal*1.1))*canvasH
                }
                a++
            })
            yStack.shift()
            yStack.push(0)
            yStack[0] = 0
        }
    }

    yStack = [0,0]
    if (logsSettings.type2==="stacked") {
        let reverseAbilitiesVals = Object.keys(valsAbilitiesInt).reverse()

        for (let i = 0; i < totalValsInt.length; i++) {
            if (i > 0) {
                let a = 0
                for (let j = 0; j<reverseAbilitiesVals.length ; j++) {
                    let key = reverseAbilitiesVals[j]
                    let xmin = 14 + ((i - 1) / combatLength) * canvasW
                    let xmax = 15 + (i / combatLength) * canvasW

                    //TOP LEFT
                    let x1 = xmin
                    let y1 = (canvasH - ((valsAbilitiesInt[key][i - 1] / (maxVal * 1.1)) * canvasH)) - yStack[0]

                    //BOTTOM LEFT
                    let x2 = xmin
                    let y2 = canvasH-yStack[0]

                    //BOTTOM RIGHT
                    let x3 = xmax
                    let y3 = canvasH-yStack[1]

                    //TOP RIGHT
                    let x4 = xmax
                    let y4 = (canvasH - ((valsAbilitiesInt[key][i] / (maxVal * 1.1)) * canvasH)) - yStack[1]

                    let color = colors.logs[reverseAbilitiesVals.length-1-a]
                    fill(x1, y1, x2, y2, x3, y3, x4, y4, color)

                    yStack[0] += (valsAbilitiesInt[key][i - 1] / (maxVal * 1.1)) * canvasH
                    yStack[1] += (valsAbilitiesInt[key][i] / (maxVal * 1.1)) * canvasH

                    a++
                }
                yStack.shift()
                yStack.push(0)
                yStack[0] = 0
            }
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

    let abilitiesColor = document.getElementById("window_logs_abilities")

    html = ""
    let a = 0
    Object.keys(valsAbilities).forEach(key => {
        html += "<span style='color:"+colors.logs[a]+";padding:2px 5px 2px 5px; '>"+key+"</span>"
        a++
    })
    abilitiesColor.innerHTML += html

}