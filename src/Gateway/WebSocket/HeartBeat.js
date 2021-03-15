const EventEmitter = require('events')

class Heartbeat extends EventEmitter {
    constructor(hi, ws) {
        super()
        this.heartbeat_interval = hi;
        this.ws = ws
    }

    async startHeartbeat() {
        setInterval(() => {
            this.ws.send(JSON.stringify({ "op": 1, "d": 251 }))
        }, this.heartbeat_interval)
    }
}


module.exports = Heartbeat;