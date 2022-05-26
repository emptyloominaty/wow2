class Message {
    time = 0
    done = true
    constructor() {
    }

    update(text,time,color) {
        this.time = time
        this.done = false
        elements._message.style.color = color
        elements._message.textContent = text
        elements._message.style.opacity = "1"
    }

    run() {
        if (!this.done) {
            this.time-=progressInSec
            if (this.time<0.25) {
                elements._message.style.opacity = "0"
            }
            if (this.time<=0) {
                this.done = true
                elements._message.textContent = ""
            }
        }
    }
}

let _message = new Message()