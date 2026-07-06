
const express=require('express');
const errorProblem= (err,req,res,next)=>{
   
    console.log("Error Name :", err.name);
    console.log("Error Message :", err.message);
    console.log(err);

    // JWT Expired
    if (err.name == "TokenExpiredError") {

        return res.status(401).json({
            success: false,
            message: "Token has expired. Please login again."
        });

    }

  
    return res.json(err);

  // next()

}

module.exports={errorProblem}