
const express=require('express');
 
const jwt=require('jsonwebtoken');
const Product=require('../Models/productModel');

const addPickleProduct=async (req,res)=>{
       console.log(" inside product controkllersssss"); 
      console.log(req.body);
        console.log(req.files);
try{
        const images = req.files.map(file => ({
            image: file.buffer,
          //image:file.path,
        //  image:"/data/uploads/" + file.filename, //  for disk storage ,local folder saving
            contentType: file.mimetype,
            fileName: file.originalname
        }));

        const product = new Product({
            productName: req.body.pickleName,
            ProductId: req.body.pickleId,
            ProductPrice: req.body.picklePrice,
            ProductDescription: req.body.pickleDescription,
            PickleDiscount: req.body.pickleDiscont,
            PickleCateogry: req.body.pickleCategory,
            pickleImage: images
        });

       const savedProduct = await product.save(); 

      const modifiedProduct = {
    ...savedProduct.toObject(),

    pickleImage: savedProduct.pickleImage.map(img => ({
        fileName: img.fileName,
        contentType: img.contentType,
        image: `data:${img.contentType};base64,${img.image.toString("base64")}`
    }))
};

res.status(201).json({
    message: "Product Added successfully",
    product: modifiedProduct
});

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }

}



const allPickles = async (req, res, next) => {

    try {

        const products = await Product.find({});

        const modifiedProducts = products.map(product => {

            return {

                ...product.toObject(),

                pickleImage: product.pickleImage.map(img => ({

                    fileName: img.fileName,

                    contentType: img.contentType,

                    image: `data:${img.contentType};base64,${img.image.toString("base64")}`

                }))

            };

        });

        res.json(modifiedProducts);

    } catch (error) {

        next(error);

    }

}



const deletePickleProduct =async (req,res,next)=>{

try{


    const {id}=req.params;
    console.log("req.params",req.params);
    // console.log("request",req);

      // 1. Attempt to find and delete the document
    const deletedPickleProduct = await Product.findByIdAndDelete(id);

    // 2. Check if the document existed in the first place
    if (!deletedPickleProduct) {
      return res.status(404).json({ message: "pickle product not found" });
    }

    // 3. Return the deleted document details to the client
    return res.status(200).json({ 
      message: "pickle product deleted successfully", 
      data: deletedPickleProduct 
    });

    }catch(error){
     next(error);
    }

}




const updatePickleProduct =async (req,res,next)=>{
console.log("updatePickleProduct");

console.log("req.body",req.body);
console.log("req.file",req.files);
console.log("req.params",req.params);
    try {

        const { id } = req.params;

        const {

            productName,
            ProductId,
            ProductPrice,
            ProductDescription,
            PickleCateogry,
            PickleDiscount        

        } = req.body;

        const product = await Product.findById(id);

        if (!product) {

            return res.status(404).json({

                message: "Product not found"

            });

        }

        

        product.productName = productName;

        product.ProductId = ProductId;

        product.ProductPrice = ProductPrice;

        product.ProductDescription = ProductDescription;

        product.PickleCateogry = PickleCateogry;

        product.PickleDiscount = PickleDiscount;

   

        if (req.files && req.files.length > 0) {

            product.pickleImage = req.files.map(file => ({

                image: file.buffer,

                contentType: file.mimetype,

                fileName: file.originalname

            }));

        }

        const updatedProduct = await product.save();

    const modifiedupdatedProduct = {
    ...updatedProduct.toObject(),

    pickleImage: updatedProduct.pickleImage.map(img => ({
        fileName: img.fileName,
        contentType: img.contentType,
        image: `data:${img.contentType};base64,${img.image.toString("base64")}`
    }))
    }

        return res.status(200).json({

            message: "Product updated successfully",

            data: modifiedupdatedProduct

        });

    }

    catch (error) {

        console.log(error);

        return res.status(500).json({

            message: "Internal Server Error",

            error: error.message

        });

    }

}



module.exports={addPickleProduct,allPickles,deletePickleProduct,updatePickleProduct};