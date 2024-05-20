const mongoose = require("mongoose");
const DeliveryAddress = require("../model/deliveryAddressSchema");
const { trace } = require("../routes/order");

class DeliveryAddressController {
  async create(req, res) {
    try {
      //log
      console.log("body", req.body);
      const newAddress = new DeliveryAddress(req.body);
      const saved = await newAddress.save();
      res.status(200).json(saved);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getDefault(req, res) {
    try {
      const selected = await DeliveryAddress.findOne({
        selected: true,
        idUser: req.params.idUser,
      });
      if (selected) {
        res.status(200).json(selected);
      } else {
        const defaultAddress = await DeliveryAddress.findOne({
          status: "default",
          idUser: req.params.idUser,
        });
        res.status(200).json(defaultAddress);
        if (!defaultAddress) {
          res.status(404).json("chua co dia chi nhan hang");
        }
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getAllAddress(req, res) {
    try {
      const address = await DeliveryAddress.find();
      res.status(200).json(address);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getAll(req, res) {
    try {
      const listAddress = await DeliveryAddress.find({
        idUser: req.params.idUser,
      });
      if (listAddress) {
        res.status(200).json(listAddress);
      } else {
        res.status(404).json("khong co dia chi nao");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async changeSelected(req, res) {
    try {
      const address = await DeliveryAddress.findById(req.body.id);
      if (address) {
        await DeliveryAddress.updateMany(
          { idUser: req.body.idUser },
          { selected: false }
        );
        address.selected = true;
        const saved = await address.save();
        res.status(200).json(saved);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  //xoa dia chi
  deleteAddress = async (req, res) => { 
    try {
      const {addresId} = req.body;
      const address = await DeliveryAddress.findById(addresId);
      if (!address) {
        return res.status(404).json("Khong ton tai dia chi");
      }
      const deleted = await DeliveryAddress.findByIdAndDelete(addresId);
      return res.status(200).json(`xoa thanh cong dia chi co id: ${addresId}`)
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = new DeliveryAddressController();
