const mongoose = require("mongoose");
const book = require("./bookSchema");

const authorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: {
      type: Number,
    },
    hometown: {
      type: String,
    },
    avatar: {
      type: String,
    },
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("author", authorSchema);
