class DetailsWindow {
    maxVal = 0
    vals = []
    elements = 0

    constructor(x,y,width,height,type,id,hide = false,data = 0) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.type = type
        this.id = id
        this.data = data
        this.hide = hide

        this.html()

        if (hide) {
            document.getElementById(id).style.display = "none"
        }
    }

    html() {
        let detailsHTML = "<div class='detailsWindow' id='"+this.id+"'> <span id='details_type"+this.id+"'>"+this.type+"</span>"
        let a = 0
        for (let i = 0; i<friendlyTargets.length; i++) {
            detailsHTML += "<div id='detailsWindow_Row"+this.id+i+"' data-id='"+i+"' class='detailsWindow_Row' onmouseenter='details.mouseEnter("+i+",\""+this.type+"\")' onmouseleave='details.mouseOut("+i+",\""+this.type+"\")'  onmousemove='details.mouseMove()' >" +
                " <img class='detailsWindow_icon' id='"+this.id+"_icon"+i+"'>" +
                " <div class='detailsWindow_bar'  id='"+this.id+"_bar"+i+"'></div>" +
                " <div class='detailsWindow_text'><span>"+(i+1)+".</span><span class='detailsWindow_name' id='"+this.id+"_name"+i+"'>" +
                "</span>  <span class='detailsWindow_val'  id='"+this.id+"_val"+i+"'></span></div> </div>"
            a++
        }

        this.elements = a

        detailsHTML += "</div>"

        elements.ui.insertAdjacentHTML("beforeend", detailsHTML)

        document.getElementById(this.id).style.border = "1px solid #111"
        document.getElementById(this.id).style.padding = "3px"
        document.getElementById(this.id).style.position = "fixed"
        document.getElementById(this.id).style.top = this.y+"px"
        document.getElementById(this.id).style.left = this.x+"px"
        document.getElementById(this.id).style.width = this.width+"px"
        document.getElementById(this.id).style.height = this.height+"px"


        this.el = {}
        this.el[this.id] =document.getElementById(this.id)
        this.el["details_type"+this.id] = document.getElementById("details_type"+this.id)
        for (let i = 0; i<friendlyTargets.length; i++) {
            this.el[this.id+"_name"+i] = document.getElementById(this.id+"_name"+i)
            this.el[this.id+"_val"+i] = document.getElementById(this.id+"_val"+i)
            this.el[this.id+"_icon"+i] = document.getElementById(this.id+"_icon"+i)
            this.el["detailsWindow_Row"+this.id+i] = document.getElementById("detailsWindow_Row"+this.id+i)
            this.el[this.id+"_bar"+i] = document.getElementById(this.id+"_bar"+i)
        }
    }

    toggle(id,type) {
        if (type==="HPS" || type==="Healing Done") {
            this.data = Number(document.getElementById("detailsWindow_Row"+"details_healingWindow"+id).dataset.id)
            document.getElementById("details_type"+this.id).textContent = "Abilities Healing"
            this.type = "Abilities Healing"
        } else if (type==="DPS" || type==="Damage Done") {
            this.data = Number(document.getElementById("detailsWindow_Row"+"details_damageWindow"+id).dataset.id)
            document.getElementById("details_type"+this.id).textContent = "Abilities Damage"
            this.type = "Abilities Damage"
        } else {
            return
        }
        this.maxVal = 1
        if (this.el[this.id].style.display === "none") {
            this.el[this.id].style.display = "inline"
            this.hide = false
            this.changePosition(mousePosition.x+25,mousePosition.y)
            for (let i = 0; i<this.elements; i++) {
                this.el[this.id+"_name"+i].textContent = ""
                this.el[this.id+"_val"+i].textContent = ""
                this.el[this.id+"_icon"+i].src = ""
                this.el[this.id+"_bar"+i].style.backgroundColor = "rgba(0,0,0,0)"
                this.el[this.id+"_bar"+i].style.width = "0px"
            }
        } else {
            this.hide = true
            this.el[this.id].style.display = "none"
        }
    }

    changePosition(x,y) {
        if (this.el[this.id]) {
            this.el[this.id].style.top = y+"px"
            this.el[this.id].style.left = x+"px"
        }
    }

    run() {
        if (!this.hide) {
            this.vals = []
            for (let i = 0; i<friendlyTargets.length; i++) {
                if (this.type==="DPS" || this.type==="Damage Done") {
                    if (friendlyTargets[i].damageDone>this.maxVal) {
                        this.maxVal = friendlyTargets[i].damageDone
                    }
                    this.vals.push({id:i, val:friendlyTargets[i].damageDone, color:colors[friendlyTargets[i].class], name:friendlyTargets[i].name, target:friendlyTargets[i]})
                } else if (this.type==="HPS" || this.type==="Healing Done") {
                    if (friendlyTargets[i].healingDone>this.maxVal) {
                        this.maxVal = friendlyTargets[i].healingDone
                    }
                    this.vals.push({id:i, val:friendlyTargets[i].healingDone, color:colors[friendlyTargets[i].class], name:friendlyTargets[i].name, target:friendlyTargets[i]})
                }
            }
            if (this.type==="Abilities Healing") {
                if (details.combats[details.combatIdx][this.data]) {
                    let i = 0
                    let obj = details.combats[details.combatIdx][this.data]
                    Object.keys(obj).forEach((key) => {
                        if (obj[key].heal > this.maxVal) {
                            this.maxVal = obj[key].heal
                        }
                        this.vals.push({id: i, val: obj[key].heal, color: colors.details[obj[key].school], name: obj[key].name})
                        i++
                    })
                }
            } else if (this.type==="Abilities Damage") {
                if (details.combats[details.combatIdx][this.data]) {
                    let i = 0
                    let obj = details.combats[details.combatIdx][this.data]
                    Object.keys(obj).forEach((key) => {
                        if (obj[key].damage > this.maxVal) {
                            this.maxVal = obj[key].damage
                        }
                        this.vals.push({id: i, val: obj[key].damage, color:colors.details[obj[key].school], name: obj[key].name})
                        i++
                    })
                }
            }
            this.vals = this.vals.sort((a, b) => a.val < b.val ? 1 : -1)

            let vals = 0

            let valsPercentages = []
            let valsTotal = 0

            if (this.type==="Abilities Healing" || this.type==="Abilities Damage") {
                for (let i = 0; i < this.vals.length; i++) {
                    valsTotal += this.vals[i].val
                }

                for (let i = 0; i < this.vals.length; i++) {
                    valsPercentages[i] = (this.vals[i].val/valsTotal)*100
                }
            }

            for (let i = 0; i<this.vals.length; i++) {
                if (this.vals[i].val!==0) {
                    this.el[this.id+"_name"+i].textContent = this.vals[i].name
                    if (this.type==="HPS" || this.type==="DPS") {
                        this.el[this.id+"_val"+i].textContent = getNumberString(this.vals[i].val/combatTime)
                        this.el[this.id+"_icon"+i].src = iconsPath.specs[this.vals[i].target.spec]
                        this.el["detailsWindow_Row"+this.id+i].dataset.id = this.vals[i].target.id
                    } else if (this.type==="Healing Done" || this.type==="Damage Done") {
                        this.el[this.id+"_val"+i].textContent = getNumberString(this.vals[i].val)+" ("+getNumberString(this.vals[i].val/combatTime)+")"
                        this.el[this.id+"_icon"+i].src = iconsPath.specs[this.vals[i].target.spec]
                        this.el["detailsWindow_Row"+this.id+i].dataset.id = this.vals[i].target.id

                    } else if (this.type==="Abilities Healing" || this.type==="Abilities Damage") {

                        this.el[this.id+"_val"+i].textContent = getNumberString(this.vals[i].val)+" ("+(valsPercentages[i].toFixed(1))+"%)"
                        this.el[this.id+"_icon"+i].src = iconsPath[this.vals[i].name]
                    }
                    vals++

                    this.el[this.id+"_bar"+i].style.backgroundColor = this.vals[i].color
                   this.el[this.id+"_bar"+i].style.width = (this.vals[i].val/this.maxVal*(this.width-34))+"px"
                }
            }

            if (this.type==="Abilities Healing" || this.type==="Abilities Damage") {
               this.el[this.id].style.height = 22+(vals*26)+"px"
            }
        }
    }

}

let detailsDamage = new DetailsWindow(20,200,250,200,"Damage Done","details_damageWindow")
let detailsHealing = new DetailsWindow(20,420,250,200,"Healing Done","details_healingWindow")

let detailsAbilities = new DetailsWindow(20,640,350,200,"Abilities Damage","details_abilitiesWindow",true)

let details = {
    combatIdx: 0,
    combats: [[],[],[],[]],
    doHealing: function(caster,val,ability,overhealing,name) {
        if (name==="") {
          name = ability.name
        }
        if (this.combats[this.combatIdx][caster.id]===undefined) {
            this.combats[this.combatIdx][caster.id] = {}
        }

        if(this.combats[this.combatIdx][caster.id][name]===undefined) {
            let school = ability.school
            if (ability.school===undefined) {
                school = "physical"
            }
            this.combats[this.combatIdx][caster.id][name] = {heal:0,damage:0,damageTaken:0,name:name,casts:0,school:school}
        }

        if (inCombat) {
            if (overhealing>0) {
                caster.healingDone+=val-overhealing
                this.combats[this.combatIdx][caster.id][name].heal += val-overhealing
            } else {
                this.combats[this.combatIdx][caster.id][name].heal += val
                caster.healingDone+=val
            }
        }
    },
    doDamage: function(caster,val,ability) {
        if (inCombat) {
            if (this.combats[this.combatIdx][caster.id]===undefined) {
                this.combats[this.combatIdx][caster.id] = {}
            }

            if(this.combats[this.combatIdx][caster.id][ability.name]===undefined) {
                this.combats[this.combatIdx][caster.id][ability.name] = {heal:0,damage:0,damageTaken:0,name:ability.name,casts:0,school:ability.school}
            }

            this.combats[this.combatIdx][caster.id][ability.name].damage += val
            caster.damageDone += val

        }
    },
    doDamageTaken: function(caster, target, val, ability) {
        if (inCombat) {
            if (this.combats[this.combatIdx][target.id]===undefined) {
                this.combats[this.combatIdx][target.id] = {}
            }

            if(this.combats[this.combatIdx][target.id][ability.name]===undefined) {
                this.combats[this.combatIdx][target.id][ability.name] = {heal:0,damage:0,damageTaken:0,name:ability.name,casts:0,school:ability.school}
            }

            this.combats[this.combatIdx][target.id][ability.name].damageTaken += val
            target.damageTaken += val
        }
    },
    castAbility: function(caster,ability) {
        if (inCombat) {
            if (this.combats[this.combatIdx][caster.id]===undefined) {
                this.combats[this.combatIdx][caster.id] = {}
            }

            if(this.combats[this.combatIdx][caster.id][ability.name]===undefined) {
                this.combats[this.combatIdx][caster.id][ability.name] = {heal:0,damage:0,name:ability.name,casts:0,school:ability.school}
            }

            this.combats[this.combatIdx][caster.id][ability.name].casts++
        }
    },
    mouseEnter: function(id,type) {
        detailsAbilities.toggle(id,type)
    },
    mouseOut: function(id,type) {
        detailsAbilities.toggle(id, type)
    },
    mouseMove: function() {
       detailsAbilities.changePosition(mousePosition.x+25,mousePosition.y)
    }
}
