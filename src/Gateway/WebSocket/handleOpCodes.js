const Heartbeat = require('./HeartBeat')


module.exports = {
    handleOpCodes: async (op, m, ws, cache) => {

        if(op == 10) {
            //handle gateway connect

            const hb = new Heartbeat(ws.heartbeat_interval, ws)

            hb.startHeartbeat()

            ws.send(JSON.stringify({
                "op": 2,
                "d": {
                  "token": ws.token,
                  "intents": 513,
                  "properties": {
                    "$os": process.platform,
                    "$browser": "pyxcord",
                    "$device": "pyxcord"
                  }
                }
              }))
        }
    }
}