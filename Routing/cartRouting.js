
const express=require('express');
const router = express.Router();
const {addToCartController}=require('../Controllers/CartController');
const {isUser}=require('../Middlewares/authMiddleware');
router.post('/addtocart',isUser,addToCartController);


module.exports=router;