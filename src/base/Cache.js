const EventEmitter = require('events')

class Cache extends EventEmitter {
    constructor(){
        super();

        this.user = {};
    }

    store(prop, val) {
        this[prop] = val
    }

    _get (prop) {
        console.log(this[prop])
        return this[prop] || 404
    }
}

module.exports = Cache;