let open_settings = function(reload = false) {
    if (currentWindow === "settings" && !reload) {
        close_window()
        return
    } else {
        elements.window.innerHTML = ""
    }
    currentWindow = "settings"

    let settingsList = [

        {name:"Interface",settingKey:"",options:[],category:true},
        {name:"UI Scale",settingKey:"uiScaling",options:[],rangeMin:0.5,rangeMax:1.5,rangeStep:0.1,range:true},
        {name:"Show Scrolling Combat Text",settingKey:"showFloatingAbility",options:[{name:"Off",val:false},{name:"On",val:true}]},
        {name:"Show Floating Combat Text",settingKey:"showTargetFloatingText",options:[{name:"Off",val:false},{name:"On",val:true}]},


        {name:"Graphics",settingKey:"",options:[],category:true},
        {name:"UI Refresh Rate",settingKey:"uiRefreshRate",options:[{name:"Very Low",val:30},{name:"Low",val:10},{name:"Medium",val:6},{name:"High",val:4},{name:"Ultra",val:2}]},
        {name:"Details Refresh Rate",settingKey:"detailsRefreshRate",options:[{name:"Very Low",val:30},{name:"Low",val:10},{name:"Medium",val:6},{name:"High",val:4},{name:"Ultra",val:2}]},
        {name:"Spell Visuals",settingKey:"spellVisuals",options:[{name:"Off",val:0},{name:"Low",val:1},{name:"Medium",val:2},{name:"High",val:3},{name:"Ultra",val:4}]},
        {name:"Spell Glow",settingKey:"spellGlow",options:[{name:"Off",val:false},{name:"On",val:true}]},

        {name:"Sound",settingKey:"",options:[],category:true},

        {name:"Keybinds",settingKey:"",options:[],category:true},
    ]


    let html = "<div class='windowBody'> <div class='windowHeader'><span>Settings</span> <div onclick='close_window()'>x</div></div>"

    for (let i = 0; i<settingsList.length; i++) {
        let classes = "window_settings_flex "
        if (settingsList[i].category) {
            classes += "window_settings_category"
        }

        html += "<div class='"+classes+"'> <span>"+settingsList[i].name+"</span> <div>"

        if (settingsList[i].range) {
            html += "<div><input type='range' onchange='settings[\""+settingsList[i].settingKey+"\"] = Number(this.value); open_settings(true)' step='"+settingsList[i].rangeStep+"' value='"+settings[settingsList[i].settingKey]+"' min='"+settingsList[i].rangeMin+"' max='"+settingsList[i].rangeMax+"' >" +
                "<span>"+settings[settingsList[i].settingKey].toFixed(1)+"</span></div>"
        }

        for (let j = 0; j<settingsList[i].options.length; j++) {
            let option = settingsList[i].options[j]
            let val = option.val
            let classes = "window_settings_button "

            if (val==settings[settingsList[i].settingKey]) {
                classes += "window_settings_button_true"
            }

            if (typeof(val) === typeof(String())) {
                val = "\""+val+"\""
            }

            html+= "<button class='"+classes+"' onclick='settings[\""+settingsList[i].settingKey+"\"] = "+val+"; open_settings(true)'>"+option.name+"</button>"
        }

        html +="</div></div>"
    }

    html+="</div>"

    elements.window.innerHTML = html
}