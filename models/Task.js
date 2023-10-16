const mongoose = require('mongoose');

//creating TaskSchema using mongoose.
const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'must provide name'],  //or simply do required: ture
        trim: true, //used for removing the leading spaces.
        maxlength: [20, 'name can not be more than 20 char'] //setting max length of string. 
    },
    completed:{
        type: Boolean,
        default: false,
    }
})

//validation in schema


// Exporting a model of schema task
module.exports = mongoose.model('Task',TaskSchema)