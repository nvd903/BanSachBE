const express = require("express");
const router = express.Router();

const cartController = require("../controllers/CartController");

router.get("/:id", cartController.getCartById);
router.get("/", cartController.getCart);
router.post("/:idUser/addtocart", cartController.addToCart);
router.post("/:idUser/changequantity", cartController.changeQuantity);
router.post("/:idUser/incrementquantity", cartController.incrementQuantity);
router.post("/:idUser/decrementquantity", cartController.decrementQuantity);
router.post("/:idUser/removecart", cartController.removecart);
router.post("/create", cartController.createCart);

module.exports = router;
