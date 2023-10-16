const express = require('express')
const app = express();
const tasks = require("./routes/tasks")
const connectDB = require('./db/connect')
const notFound = require("./middleware/not-found")
const errorHandler = require('./middleware/error');
//invoking .env file
require('dotenv').config()

//middleware
app.use(express.json());
app.use(express.static('./public'))

//using the basic route for the routes in the tasks

//routes
app.use('/api/v1/tasks',tasks)
app.use(notFound)
app.use(errorHandler)
//app.get('/api/v1/tasks')  - get all the tasks
// app.post('api/v1/tasks') - create a new task
//app.get('api/v1/tasks/:id') - get single tasks
//app.patch('/api/v1/tasks/:id') - update task
//app.delete('/api/v1/tasks/:id') - delete task

const port = process.env.PORT || 3000;

//creating start function so that first we connect to the databse then we start our server.
const start = async () =>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port,console.log("Server is listening at port 3000"))
    }
    catch(err)
    {
        console.log(err);
    }
}

start()