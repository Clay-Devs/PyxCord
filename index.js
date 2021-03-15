const Discord = require('./src/index.js')
const Client = require('./src/Client/Client')
const ws = require('./src/Gateway/WebSocket/WebSocket')

module.exports = Discord;
module.exports.WebSocket = ws
module.exports.Client = Client;