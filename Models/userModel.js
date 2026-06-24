const mongoose=require('mongoose');
const { Schema } = mongoose;
const bcrypt=require('bcrypt');
const userSchema = new Schema({
  name: String, // String is shorthand for {type: String}
  email: String,
  phone: String,
  password:{type:String,required:true},
  confirmPassword:String,
  store:String,
  desiredName:String,
  role:{
    type:String,
    default:'user'
  }

});





const saltRounds = 10;

userSchema.pre('save',async function(){

  const user=this;
  console.log("user...",user);

  if (!user.isModified('password')) return next();

try{
    const hash= await bcrypt.hash(user.password, saltRounds);
    user.password=hash;
    user.confirmPassword=undefined;
    // next();
}catch(error){
   console.error("Hashing error:", error);
  next(error)
}


})

module.exports = mongoose.model('Users', userSchema);
