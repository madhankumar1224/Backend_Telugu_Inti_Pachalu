const mongoose=require('mongoose');
const { Schema } = mongoose;


const productImageSchema = new Schema({
    image: {
       type: Buffer,
      // type:String,
        required: true
    },
    contentType: {
        type: String, // image/jpeg, image/png, etc.
        required: true
    },
    fileName: {
        type: String
    }
}, { _id: false });

const productSchema = new Schema({
  productName: String, // String is shorthand for {type: String}
  ProductId: String,
  ProductPrice: String,
  ProductDescription:String,
  PickleDiscount:String,
  PickleCateogry:String,
  pickleImage:[productImageSchema]
 

});



module.exports = mongoose.model('Product', productSchema);