const EventEmitter = require('events')
const WebSocket = require('../Gateway/WebSocket/WebSocket')
const Cache = require('../base/Cache')






class Client extends EventEmitter {
    constructor(options) {
        super()
        this.options = options;
        this.ws = {}
        this.user = {}
        this.cache = new Cache()
    }



    async login (token) {


        this.ws = new WebSocket(token, 8, this.cache)

        this.ws.connect()
        
        this.ws.on('allready', () => {
            this.user = this.cache._get('user')
            this.emit('ready')
        })

        this.ws.on('message', (m) => {
            

            this.emit('message', m)
        })
        
    }



    async setActivity (status, options) {
        this.ws.send(JSON.stringify(
            {
                "op": 3,
                "d": {
                  "since": Date.now(),
                  "activities": [{
                    "name": status,
                    "type": 0
                  }],
                  "status": options?.status || 'online',
                  "afk": false
                }
              }
        ))
    }
}

module.exports = Client;