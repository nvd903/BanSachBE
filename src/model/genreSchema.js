const mongoose = require("mongoose");
// const book = require("./bookSchema").schema;

const genreSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    url: { type: String, require: true },
    genreParentId: [{ type: mongoose.Schema.Types.ObjectId, ref: "genre" }],
    genreChildId: { type: mongoose.Schema.Types.ObjectId, ref: "genre" },
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: "book" }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("genre", genreSchema);
