let open_talents = function() {
    if (currentWindow === "talents") {
        close_window()
        return
    }
    currentWindow = "talents"
    let html = "<div class='windowHeader'><span>Talents</span> <div onclick='close_window()'>x</div></div>"

    elements.window.innerHTML = html
}