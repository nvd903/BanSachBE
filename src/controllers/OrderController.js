const Order = require("../model/orderSchema");

class OrderController {
  async create(req, res) {
    // body {userID, items: [{itemId, quantity}], totalAmount, deliveryAddressId}
    try {
      const order = new Order(req.body);
      const saved = await order.save();
      res.status(200).json(saved);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getAll(req, res) {
    try {
      const orders = await Order.find().sort({ createdAt: -1 });
      if (orders) {
        res.status(200).json(orders);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async updateState(req, res) {
    try {
      //body{_id, state}
      const order = await Order.findById(req.body._id);
      if (order) {
        order.state = req.body.state;
        order.save();
        res.status(200).json("updated state successfully");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = new OrderController();
