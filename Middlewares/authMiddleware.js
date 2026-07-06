const express=require('express');

const jwt=require('jsonwebtoken');

const isAdmin=async(req,res,next)=>{
    console.log("req.body",req.body);
     console.log("req.header",req.headers);
 try {
        
        if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
            return res.status(401).json({ message: "No token provided or invalid format." });
        }

        const token = req.headers.authorization.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (decoded.role === 'admin') {
            req.user = decoded; 
            return next(); 
        }

        return res.status(403).json({ message: "Access denied. Admins only." });


}catch(error){


    

      next(error)





}
}

module.exports={isAdmin};