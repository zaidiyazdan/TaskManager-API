const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async');
const {createCustomError} = require('../errors/custome-error');
// This file will contain all the functions.

const getAllTasks = asyncWrapper(
    //here we had a try catch statement before which i removed by and insted make a asyncWrapper middleware which handles it.
    async (req,res)=>{
            const tasks =await Task.find();
            //if we add something to the find like {completed: true} it will do the matching in db according to it.
            res.status(200).json({tasks});
            // res.status(200).json({tasks, amount: tasks.length})
            // res.status(200).json({status: "success", data: {tasks,nhHits: tasks.length}})
    }
)

const createNewTask = asyncWrapper(
    async (req,res)=>{
    //we need to wrap our await in try and catch to catch error
        const task = await Task.create(req.body)
        res.status(201).json({task});
})

const getSingleTask = asyncWrapper(
    async (req,res,next)=>{
        const {id:taskID} = req.params;
        const task = await Task.findOne({_id:taskID})
        //here we have to return different response in case we have the wrong id.
        if(!task){
            //making our coustom error class.
            //here we are making error by ourself so all this is geing done as the error is not given by the mongodb.
            // const error = new Error('Not found');
            // error.status = 404;

            return next(createCustomError(`No taksk with id ${taskID}`,404));
            // return res.status(404).json({msg: `No task with id : ${taskID}`})
        }
        res.status(200).json({task}); 
    // }catch(err)
    // {   
    //     //error when the syntex is wrong
    //     res.status(500).json({err})
    // }
    //we can have 2 types of error.
    //1.if the syntex is correct but we can not find the item it means there is not task with that id.(we have to handle it ourself)
    //2.if the syntex in wrong then it will give error by the mongoose. 
})

const deleteTask = asyncWrapper(
    async (req,res)=>{
        const {id: taskID} = req.params;
        const data = await Task.findOneAndDelete({_id:taskID});
        if(!data)
        {
            // return res.status(404).json({msg: `no task with id  ${taskID}`})
            return next(createCustomError(`No taksk with id ${taskID}`,404));
        }
        res.status(200).json({msg: `task with id ${taskID} deleted successfully`,data: data}) 
        //we can send other responsed too.
        // res.status(200).send()
        // res.statu(200).json({task: null,status: 'success'})
    // catch(err)
    // {
    //     res.status(500).json({err})
    // }
})

const updateTask =asyncWrapper( async (req,res)=>{
        const {id: taskID} = req.params;
        //it takes 3 arguments 1. key to search, 2. new data , 3. option
        const task = await Task.findOneAndUpdate({_id: taskID},req.body,{new:true,runValidators: true})
        if(!task)
        {
            // res.status(404).json({msg: `No task with id : ${id}`})
            return next(createCustomError(`No taksk with id ${taskID}`,404));
        }
        res.status(200).json({task})
})

//Used in put (Just a demo example)
const editTask =asyncWrapper( async (req,res)=>{
        const {id: taskID} = req.params;
        //it takes 3 arguments 1. key to search, 2. new data , 3. option (overwrite : true is used so that the new data overwrites the old one)
        const task = await Task.findOneAndUpdate({_id: taskID},req.body,{new:true,runValidators: true,overwrite: true})
        if(!task)
        {
            res.status(404).json({msg: `No task with id : ${id}`})
        }
        res.status(200).json({task})
})

module.exports = {getAllTasks,createNewTask,getSingleTask,updateTask,deleteTask,editTask}