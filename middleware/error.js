//in case of a error in async wrapper function we next execute the errorHandler function. 
//it takes 4 argumnet isted of 3 in regular middleware where 1st is the error object.

const { CustomError } = require("../errors/custome-error");

//if the error is Custom Error one then we will pass status cod e and error message. else we will just use inbuild error one
const errorHandler = (err,req,res,next)=>{
    if(err instanceof CustomError)
    {
        return res.status(err.statusCode).json({msg: err.message})
    }
    return res.status(500).json({msg: `Something went Wrong,please try again`})
}

module.exports = errorHandler;