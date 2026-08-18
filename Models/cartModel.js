const mongoose = require("mongoose");

const { Schema } = mongoose;

const AddedToCartSchema = new Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },

    unitPrice: {
      type: Number,
      required: true,
    },
  },
  {
    _id: true,
  }
);

const cartSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
      unique: true,
    },

    ProductsInCart: {
      type: [AddedToCartSchema],
      default: [],
    },
  }
  //,
//   {
//     timestamps: true,
//   }
);

module.exports = mongoose.model("Cart", cartSchema);