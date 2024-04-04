const mongoose = require("mongoose");
const book = require("./bookSchema").schema;

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
      minlength: 6,
      maxlength: 20,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
      require: true,
    },
    phoneNumber: {
      type: Number,
    },
    avater: {
      type: String,
    },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: "cart" },
    isadmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
