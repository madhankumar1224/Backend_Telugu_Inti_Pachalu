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

    // Basic validation
    if (!productId || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Product ID and quantity are required",
      });
    }

    // Find the product
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


    // CASE 1: USER DOES NOT HAVE CART


    if (!cart) {
      cart = new Cart({
        userId: user._id,

        ProductsInCart: [
          {
            productId: productId,
            quantity: quantity,
            unitPrice: product.ProductPrice,
          },
        ],
      });

      await cart.save();

      return res.status(201).json({
        success: true,
        message: "Product added to cart",
        cart,
      });
    }

   
    // CASE 2: USER ALREADY HAS CART


    const existingProduct = cart.ProductsInCart.find(
      (item) =>
        item.productId.toString() === productId.toString()
    );

 
    // CASE 2A: PRODUCT ALREADY EXISTS
   

    if (existingProduct) {
      existingProduct.quantity += Number(quantity);

      await cart.save();

      return res.status(200).json({
        success: true,
        message: "Product quantity updated",
        cart,
      });
    }


    // PRODUCT DOES NOT EXIST
   

    cart.ProductsInCart.push({
      productId: productId,
      quantity: quantity,
      unitPrice: product.ProductPrice,
    });

    await cart.save();

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

module.exports = {
  addToCartController,
};