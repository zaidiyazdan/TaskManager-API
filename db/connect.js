const mongoose = require('mongoose')

// connectDB function is used to connet to DB it takes url as argumnet which is stored in .env file
const connectDB = (url)=>{
    console.log("Connecting to db")
    return mongoose.connect(url,
    {useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true})
}

//Exporting connectDB function and using it in app.js
module.exports = connectDB;