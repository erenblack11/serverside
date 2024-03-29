const mongoose = require('mongoose')

const {Schema} = mongoose


const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    letters: {
        type: Array
    },
    numbers: {
        type: Array
    },
    words: {
        type: Array
    },
    data: {
        type: Object
    },
    score: {
        type: Number
    }
}, {collection: "users"})

const User = mongoose.model('User', userSchema)

module.exports = User