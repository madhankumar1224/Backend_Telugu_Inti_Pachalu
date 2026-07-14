const express=require('express');
const Users=require('../Models/userModel');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
const SignupController=async (req,res)=>{
    // console.log("req.body",req.body);
// console.log("i got it and won");

const {fullName,emailAddress,phoneNumber,desiredName,MyPassword,confirmPassword,storeName}=req.body;

try{
if (MyPassword !== confirmPassword) {
  return res.status(400).json({ message: "Passwords do not match!" });
}


const finduserALreadyExisted=await Users.find({email:emailAddress});

// console.log("finduserALreadyExisted",finduserALreadyExisted);
if(finduserALreadyExisted.length>=1){                   

    res.json("user already existed")
}else{


    const newuser= new Users({
    name:fullName,
    email:emailAddress,
    phone:phoneNumber,
    password:MyPassword,
    confirmPassword:confirmPassword,
    store:storeName,
    desiredName:desiredName
})






const saveuser=await newuser.save();
    res.status(201).json("your registration has been completed");
}

}catch(error){
    console.log("error",error);
    next(error);
}

        
}



const loginController=async (req,res)=>{

    console.log("login contrller inside",req.body);

try{
    const {email,password}=req.body;
    const userDetails=await Users.find({email:email});
    console.log("userDetails",userDetails);
       if(!userDetails || userDetails.length==0){
       return res.status(404).json("No Email Address found,please signup");
       }


       const match= await bcrypt.compare(password,userDetails[0].password);
       console.log("match",match);
       if(!match){
       return res.status(401).json("invalid password credentials")
       }
        
       if(match){
      const token=  jwt.sign({
        name:userDetails[0].name,role:userDetails[0].role,email:userDetails[0].email,
       
       },process.env.JWT_SECRET_KEY,{expiresIn:'2000s'});

     console.log("token",token);  
     
//      res.cookie('token', token, {
//   httpOnly: false,  // Protects against XSS
//   secure: true,    // Requires HTTPS
//   sameSite: 'strict', // Protects against CSRF
//   maxAge: 3600000  // 1 hour expiration
// });

res.status(200).json({ message: "Login successful" ,token:token,role:userDetails[0].role});
     
     
    }

    }catch(error){
        console.log("error ligin",error);
    }
}



module.exports={SignupController,loginController};