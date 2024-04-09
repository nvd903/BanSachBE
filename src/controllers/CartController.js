const mongoose = require("mongoose");

const Cart = require("../model/cartSchema");
const Book = require("../model/bookSchema");

class CartController {
  async getCart(req, res) {
    try {
      const cart = await Cart.find();
      if (!cart) {
        return res.json("do not have a book yet!");
      }
      return res.json(cart);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async getCartById(req, res) {
    try {
      const cart = await Cart.findOne({ user: req.params.id });
      if (cart) {
        return res.status(200).json(cart);
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async createCart(req, res) {
    try {
      const newCart = new Cart(req.body);
      const saveCart = await newCart.save();
      return res.status(200).json(saveCart);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async addToCart(req, res) {
    try {
      const cart = await Cart.findOne({ user: req.params.idUser });
      if (!cart) {
        return res.json("chua co cart");
      } else {
        // kieem tra san pham do co ton taij khong
        const book = await Book.findById(req.body.itemId);
        if (!book) {
          return res.json("san pham khong ton tai");
        } else {
          //kiem tra san pham them da co trong items chua
          const existItem = cart.items.findIndex((item) =>
            item.itemId.equals(book._id)
          );
          if (existItem !== -1) {
            //da co thi tang so luong len 1 va tong tien tang
            cart.items[existItem].quantity++;
          } else {
            cart.items.push(req.body);
          }
        }
      }
      const save = await cart.save();
      return res.json(save);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async changeQuantity(req, res) {
    try {
      const cart = await Cart.findOne({ user: req.params.idUser });
      if (!cart) {
        return res.json("khong co gio hang");
      }
      //log
      const index = cart.items.findIndex(
        (item) => item._id.toString() === req.body.id
      );
      if (index === -1) {
        return res.json("khong co item");
      }
      if (req.body.quantity === 0) {
        cart.items = cart.items.filter((item) => item !== cart.items[index]);
        const save = await cart.save();
        return res.json(save);
      }
      if (req.body.quantity > cart.items[index].quantity) {
        cart.items[index].quantity++;
        const save = await cart.save();
        return res.json(save);
      }
      if (req.body.quantity < cart.items[index].quantity) {
        cart.items[index].quantity--;
        const save = await cart.save();
        return res.json(save);
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async incrementQuantity(req, res) {
    try {
      const cart = await Cart.findOne({ user: req.params.idUser });
      if (!cart) {
        return res.json("khong co gio hang");
      }
      console.log("itemId", req.body.itemId);
      const index = cart.items.findIndex(
        (item) => item.itemId.toString() === req.body.itemId
      );
      if (index === -1) {
        return res.json("khong co item");
      }
      cart.items[index].quantity++;
      const save = await cart.save();
      return res.json(save);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async decrementQuantity(req, res) {
    try {
      const cart = await Cart.findOne({ user: req.params.idUser });
      if (!cart) {
        return res.json("khong co gio hang");
      }
      const index = cart.items.findIndex(
        (item) => item.itemId.toString() === req.body.itemId
      );
      if (index === -1) {
        return res.json("khong co item");
      }
      if (cart.items[index].quantity === 1) {
        cart.items = cart.items.filter((item) => item !== cart.items[index]);
      } else {
        cart.items[index].quantity--;
      }
      const save = await cart.save();
      return res.json(save);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async removecart(req, res) {
    try {
      const cart = await Cart.findOne({ user: req.params.idUser });
      if (!cart) {
        return res.json("khong co gio hang");
      }
      const index = cart.items.findIndex(
        (item) => item.itemId.toString() === req.body.itemId
      );
      if (index === -1) {
        return res.json("khong co item");
      }
      // cart.items = cart.items.filter((item) => item !== cart.items[index]);

      await Cart.updateMany(
        { items: cart.items[index] },
        { $pull: { items: cart.items[index] } }
      );
      // const save = await cart.save();
      return res.json(" remove successful");
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = new CartController();
