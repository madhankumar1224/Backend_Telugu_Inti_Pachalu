

const errorProblem= (err,req,res,next)=>{
    console.log("req message",req.message);

    console.log("err",err);
   res.json(err);
  // next()

}

module.exports={errorProblem}