const mongoose = require('mongoose');

const url = new mongoose.Schema({
    shorten_url: {
        type: String,
        unique: true
    },
    full_url: {
        type: String
    },
    creator_ip: {
        type: String
    },
    creator_id: {
        type: String,
        default: 'admin'
    },
    createdAt: {
        type: Date,
        default: Date.now
            //  expires: '30d'
    },
    expireAt: {
        type: Date,
        default: () => Date.now() + 30 * 24 * 60 * 60 * 1000
    },
    stats: {
        type: Object
    },
    hits: {
        type: Array
    }
});

module.exports = Url = mongoose.model('url', url);