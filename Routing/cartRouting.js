
const express=require('express');
const router = express.Router();
const {addToCartController,allCartList,deleteFromCartList}=require('../Controllers/CartController');
const {isUser}=require('../Middlewares/authMiddleware');
router.post('/addtocart',isUser,addToCartController);

router.get('/allCartListPickles',isUser,allCartList);
router.delete('/deletefromcartlist',isUser,deleteFromCartList);

module.exports=router;