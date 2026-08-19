const express=require('express');
const Cart = require("../Models/cartModel");
const Product = require("../Models/productModel");
const Users=require('../Models/userModel');
const addToCartController = async (req, res) => {
  try {
    console.log("req.body:", req.body);
    console.log("req.user:", req.user);

    const { productId, quantity } = req.body;

    const { email } = req.user;

    if (!productId || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Product ID and quantity are required",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Find user
    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Find user's cart
    let cart = await Cart.findOne({
      userId: user._id,
    });


const productQuantity = Number(quantity);
// const productPrice = Number(product.ProductPrice);
const productPrice = Number(product.ProductPrice);
    if (!cart) {

      const totalPrice =
        productQuantity * productPrice;

      cart = new Cart({
        userId: user._id,

        ProductsInCart: [
          {
            productId: productId,
            quantity: quantity,
            unitPrice: product.ProductPrice,
                 totalPrice,
          },
        ],
      });

      await cart.save();

        await cart.populate({
        path: 'ProductsInCart.productId',
        model: 'Product'
      });

      return res.status(201).json({
        success: true,
        message: "Product added to cart",
        cart,
      });
    }

   



    const existingProduct = cart.ProductsInCart.find(
      (item) =>
        item.productId.toString() === productId.toString()
    );

 

   

    if (existingProduct) {
      existingProduct.quantity += Number(quantity);


      existingProduct.totalPrice =
        existingProduct.quantity *
        existingProduct.unitPrice;  

      await cart.save();

       await cart.populate({
        path: 'ProductsInCart.productId',
        model: 'Product'
      });

      return res.status(200).json({
        success: true,
        message: "Product quantity updated",
        cart,
      });
    }


   
 const totalPrice =
      productQuantity * productPrice;

    cart.ProductsInCart.push({
      productId: productId,
      quantity: quantity,
      unitPrice: product.ProductPrice,totalPrice
    });

    await cart.save();
    
     await cart.populate({
      path: 'ProductsInCart.productId',
      model: 'Product'
    });


    return res.status(200).json({
      success: true,
      message: "New product added to cart",
      cart,
    });
  } catch (error) {
    console.error("Add to cart error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while adding to cart",
      error: error.message,
    });
  }
};






const allCartList=async (req,res)=>{


      const { email } = req.user;

 
    // Find user
    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let cart = await Cart.findOne({
      userId: user._id,
    });

  await cart.populate({
      path: 'ProductsInCart.productId',
      model: 'Product'
    });


      return res.status(200).json({
      success: true,
      message: "List of Products Added in Cart",
      cart,
    });
}



const deleteFromCartList = async (req, res) => {
  try {

    const { productId } = req.body;
    const { email } = req.user;

  

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    const user = await Users.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }


    const cart = await Cart.findOne({
      userId: user._id,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

   

    const productExists = cart.ProductsInCart.some(
      (item) =>
        item.productId.toString() === productId.toString()
    );

    if (!productExists) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }


      
    cart.ProductsInCart = cart.ProductsInCart.filter(
      (item) => item.productId.toString() !== productId.toString()
    );

    const updatedTotalPrice = cart.ProductsInCart.reduce(
      (total, item) => total + (item.quantity * item.unitPrice),
      0
    );

    
    cart.totalPrice = updatedTotalPrice;
    await cart.save();



    await cart.populate({
      path: "ProductsInCart.productId",
      model: "Product",
    });


    const cartTotal = cart.ProductsInCart.reduce(
      (total, item) => total + item.totalPrice,
      0
    );

    return res.status(200).json({
      success: true,
      message: "Product removed from cart successfully",
      cart,
      cartTotal,
    });

  } catch (error) {

    console.error(
      "Delete from cart error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to remove product from cart",
      error: error.message,
    });
  }
};




module.exports = {
  addToCartController,allCartList,deleteFromCartList
};