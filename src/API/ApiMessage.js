var { get, post, patch } = require('axios')
var _axios = require('axios') //need to import this for delete wow :(
var _events = require('events')

class APIMessage extends _events.EventEmitter {
constructor() {
    super()
    this._options = {
        hostname: 'discord.com',
        path: '/api/v8',
        port: 443,
        headers: {}
    }
}

   async _get(endpoint, token) {

       this._options.headers.Authorization = `Bot ${token}`

   }

   async _post (endpoint, data, token) {

    var postaddr = 'https://' + this._options.hostname + this._options.path + endpoint

    console.log(JSON.stringify(data))

    post(postaddr, data, {
        headers: {
            'Authorization': `Bot ${token}`,
            'Content-Type': 'application/json',
        }
    }).catch(e =>{ console.log( e.response.data )})

   }
}

module.exports = APIMessage;