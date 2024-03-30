const express = require('express');
const path = require('path'); // Add this line
const connectDB = require('./db/db');
const fileUpload = require('express-fileupload')
const app = express();
const cors = require('cors')
const userRoutes = require('./Routes/userRoutes')

app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "default-src 'self' *;");
  next();
});

// Catch-all route for the frontend
app.get('*', (req, res) => {
    // Redirect to the frontend URL
    res.redirect('https://eshaara.netlify.app');
});

app.use(fileUpload())

app.use(express.json())

app.use("/user", userRoutes)

// start server
const port = 5000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI) // Replace 'YOUR_MONGODB_URI_HERE' with your MongoDB URI
        app.listen(port, () => {
            console.log(`Server running on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}
start()
