const mongoose = require('mongoose')
require('dotenv').config()

const connectDb = async (url)=>{
    try {
        mongoose.connect(url)
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

module.exports = connectDb