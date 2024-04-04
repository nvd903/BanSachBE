const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    items: [
      {
        itemId: { type: mongoose.Schema.Types.ObjectId, ref: "book" },
        quantity: Number,
      },
    ],
    totalAmount: Number,
    deliveryAddressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "deliveryAddress",
    },
    state: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", OrderSchema);
