let open_spellbook = function() {
    currentWindow = "spellbook"
    let html = "<span>Spellbook</span> <div onclick='close_window()'>x</div>"

    elements.window.innerHTML = html
}

let close_window = function() {
    elements.window.innerHTML = ""
    currentWindow = "none"
}

let currentWindow = "none"