const EventEmitter = require('events')
const WebSocketws = require('ws');
const handleOpCodes = require('./handleOpCodes');



class WebSocket extends EventEmitter {
    constructor(token, version, c) {
        super()
        this.token = token;
        this.version = version;
        this.ws = {};
        this.cache = c;
    }


    async connect() {
        this.ws = new WebSocketws(`wss://gateway.discord.gg/?v=${this.version}&encoding=json`);

        var _emit = (e, d) => { this.emit(e, d) } //have to do this for callback function

        this.ws.on('open', () => {
            this.ws.on('message', (m) => {
                this.ws.token = this.token

                const msg = JSON.parse(m)

                if(msg.d?.heartbeat_interval) {
                    this.ws.heartbeat_interval = msg.d?.heartbeat_interval
                }

                if(msg.op == 0 && msg.t === 'READY') {
                    this.cache.store('user', msg.d?.user)
                    this.emit('allready')
                }

                handleOpCodes.handleOpCodes(msg.op, msg, this.ws, this.cache, function (event, data) {
                    _emit(event, data)
                })


            })
        })
    }

    send(payload) {
        this.ws.send(payload)
    }

}

module.exports = WebSocket;