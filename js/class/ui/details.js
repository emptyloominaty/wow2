class DetailsWindow {
    maxVal = 0
    vals = []

    constructor(x,y,width,height,type,id) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.type = type
        this.id = id



        let detailsHTML = "<div class='detailsWindow' id='"+id+"'> "+type

        for (let i = 0; i<friendlyTargets.length; i++) {
            detailsHTML += "<div class='detailsWindow_Row'> <img class='detailsWindow_icon' id='"+id+"_icon"+i+"'> <div class='detailsWindow_bar' id='"+id+"_bar"+i+"'></div> <div class='detailsWindow_text'><span>"+(i+1)+".</span><span class='detailsWindow_name' id='"+id+"_name"+i+"'></span>  <span class='detailsWindow_val'  id='"+id+"_val"+i+"'></span></div> </div>"
        }

        detailsHTML += "</div>"

        elements.ui.insertAdjacentHTML("beforeend", detailsHTML)

        document.getElementById(id).style.border = "1px solid #111"
        document.getElementById(id).style.padding = "3px"
        document.getElementById(id).style.position = "fixed"
        document.getElementById(id).style.top = y+"px"
        document.getElementById(id).style.left = x+"px"
        document.getElementById(id).style.width = width+"px"
        document.getElementById(id).style.height = height+"px"
    }

    run() {
        this.vals = []
        for (let i = 0; i<friendlyTargets.length; i++) {
            if (this.type==="DPS" || this.type==="Damage Done") {
                if (friendlyTargets[i].damageDone>this.maxVal) {
                    this.maxVal = friendlyTargets[i].damageDone
                }
                this.vals.push({id:i, val:friendlyTargets[i].damageDone, color:colors[friendlyTargets[i].class], name:friendlyTargets[i].name, target:friendlyTargets[i]})
            }
            if (this.type==="HPS" || this.type==="Healing Done") {
                if (friendlyTargets[i].healingDone>this.maxVal) {
                    this.maxVal = friendlyTargets[i].healingDone
                }
                this.vals.push({id:i, val:friendlyTargets[i].healingDone, color:colors[friendlyTargets[i].class], name:friendlyTargets[i].name, target:friendlyTargets[i]})
            }
        }
        this.vals = this.vals.sort((a, b) => a.val < b.val ? 1 : -1)


        for (let i = 0; i<this.vals.length; i++) {
            document.getElementById(this.id+"_name"+i).textContent = this.vals[i].name
            if (this.type==="HPS" || this.type==="DPS") {
                document.getElementById(this.id+"_val"+i).textContent = getNumberString(this.vals[i].val/combatTime)
            } else {
                document.getElementById(this.id+"_val"+i).textContent = getNumberString(this.vals[i].val)+" ("+getNumberString(this.vals[i].val/combatTime)+")"
            }


            document.getElementById(this.id+"_bar"+i).style.backgroundColor = this.vals[i].color
            document.getElementById(this.id+"_bar"+i).style.width = (this.vals[i].val/this.maxVal*(this.width-34))+"px"
            document.getElementById(this.id+"_icon"+i).src = iconsPath.specs[this.vals[i].target.spec]

        }
    }

}

let detailsDamage = new DetailsWindow(20,200,250,200,"Damage Done","details_damageWindow")
let detailsHealing = new DetailsWindow(20,420,250,200,"Healing Done","details_healingWindow")