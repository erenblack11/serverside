const express = require('express');
const connectDB = require('./db/db');
const fileUpload = require('express-fileupload')
const app = express();
const userRoutes = require('./Routes/userRoutes')

app.use(fileUpload())

app.use(express.json())

// start server
const port = 5000

const start =async ()=> {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, ()=>{
        console.log(`Server running on port ${port}`)
    })
    } catch (error) {
        console.log(error)
    }
}
start()