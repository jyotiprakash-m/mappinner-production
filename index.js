const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')
const pinRoute = require('./routes/pins')
const userRoute = require('./routes/users')
const app = express()
dotenv.config();
app.use(cors())
app.use(express.json())
const port = process.env.PORT || 8000
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(() => {
    console.log('Mongodb Connected!')
}).catch((err) => console.log(err))


app.use("/api/pins", pinRoute);
app.use("/api/users", userRoute);

app.listen(port, () => {
    console.log('Backend server running on ', port)
})

// Heroku Setup
if (process.env.NODE_ENV == "production") {
    app.use(express.static("client/build"));
    const path = require("path");
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}
