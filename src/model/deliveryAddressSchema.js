const mongoose = require("mongoose");

const deliveryAddressSchema = new mongoose.Schema(
  {
    idUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    fullname: { type: String, require: true },
    phone: { type: String, require: true },
    address: { type: String, require: true },
    status: { type: String },
    selected: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("deliveryAddress", deliveryAddressSchema);
