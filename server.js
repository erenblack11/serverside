const express = require('express');
const connectDB = require('./db/db');
const fileUpload = require('express-fileupload')
const app = express();
const cors = require('cors')
const userRoutes = require('./Routes/userRoutes')

app.use(cors());


app.use(fileUpload())

app.use(express.json())

app.use("/user", userRoutes)

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