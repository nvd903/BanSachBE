const mongoose = require("mongoose");
const genre = require("./genreSchema");
const author = require("./authorSchema");
const comment = require("./commentSchema");

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const bookSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: { type: String },
    thumnel: { type: String, require: true },
    price: { type: Number, require: true },
    inventoryQuantity: { type: Number, require: true },
    purchasedQuantity: { type: Number, default: 0 },
    assessStar: { type: Number },
    genres: [
      { type: mongoose.Schema.Types.ObjectId, ref: "genre", require: true },
    ],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "author",
      required: true,
    },
    priorityPoints: { type: Number, default: 0 },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isAble: { type: Boolean },
  },
  { timestamps: true }
);

module.exports = mongoose.model("book", bookSchema);
