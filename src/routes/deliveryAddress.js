const express = require("express");
const router = express.Router();

const deliveryAddressController = require("../controllers/DeliveryAddressController");

router.post("/create", deliveryAddressController.create);
router.get("/:idUser/getdefault", deliveryAddressController.getDefault);
router.get("/:idUser", deliveryAddressController.getAll);
router.get("/", deliveryAddressController.getAllAddress);
router.post("/changeselected", deliveryAddressController.changeSelected);

module.exports = router;
