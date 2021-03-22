const Heartbeat = require('./HeartBeat')
const Message = require('../../methods/Message')

module.exports = {
    handleOpCodes: async (op, m, ws, cache, emit) => {

      //imagine using if statements lol, srsly change this

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




        if(op == 0) {
          switch (m.t){
             case "MESSAGE_CREATE":
               emit('message', new Message(m.d, ws))
          }
           
        }


    }
}