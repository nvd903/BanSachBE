// const bookRouter = require("./book");
const authRouter = require("./auth");
// const userRouter = require("./user");
// const authorRouter = require("./author");
// const genreRouter = require("./genre");
// const searchRouter = require("./search");
// const cartRouter = require("./cart");
// const deliveryAddressRouter = require("./deliveryAddress");
// const orderRouter = require("./order");

function route(app) {
  app.use("/auth", authRouter);
  // app.use("/user", userRouter);
  // app.use("/book", bookRouter);
  // app.use("/author", authorRouter);
  // app.use("/genre", genreRouter);
  // app.use("/search", searchRouter);
  // app.use("/cart", cartRouter);
  // app.use("/deliveryaddress", deliveryAddressRouter);
  // app.use("/order", orderRouter);
}

module.exports = route;
