const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/book_store_db");

    console.log("Connected!!");
  } catch (error) {
    console.log("Failure");
  }
};

module.exports = { connect };
