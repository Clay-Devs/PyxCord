
var _events = require('events')
var _apimsg = require('../API/ApiMessage');
var _msg = new _apimsg()
class Message extends _events.EventEmitter{
    constructor(gatewayMessage, WebSocket) {
        super()
        this.client = {
            token: WebSocket.token
        };
        this.channel_id = gatewayMessage.channel_id,
        this.id = gatewayMessage.id,
        this.guild_id = gatewayMessage.guild_id,
        this.author = gatewayMessage.author;
        this.WebSocket = WebSocket;
    }



    async reply (content, mention_user) {
        if(mention_user && typeof mention_user !== 'boolean') return console.error('mention_user must be typeof Boolean')
        //lol even discord.js cant do this XD

        //i guess no embed support yet :)

        var _data = {
            content,
            tts: false, //sorry fam, no tts
            //placehodler for embeds i guess
            message_reference: {
                guild_id: this.guild_id,
                channel_id: this.channel_id,
                message_id: this.id,
                fail_if_not_exists: false,
            },
            allowed_mentions: {
                replied_user: mention_user, //ping in the reply, defaults to false
            }
            

        }


        _msg._post(`/channels/${this.channel_id}/messages`, JSON.stringify(_data), this.client.token)




    }








}

module.exports = Message;