const express = require('express')
const router = express.Router();
const  {getAllTasks,createNewTask,getSingleTask,updateTask,deleteTask,editTask} = require('../controllers/tasks')

//app.get('/api/v1/tasks')  - get all the tasks
// app.post('api/v1/tasks') - create a new task
//app.get('api/v1/tasks/:id') - get single tasks
//app.patch('/api/v1/tasks/:id') - update task
//app.delete('/api/v1/tasks/:id') - delete task

//all routes.
router.route('/').get(getAllTasks).post(createNewTask)
router.route('/:id').get(getSingleTask).patch(updateTask).delete(deleteTask).put(editTask)

module.exports = router;