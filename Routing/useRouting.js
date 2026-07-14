
const express=require('express');
const router = express.Router();
const {SignupController,loginController}=require('../Controllers/UserController');
const{isAdmin}=require('../Middlewares/authMiddleware');

router.post('/signup',SignupController);
router.post('/login',loginController);

module.exports=router;           