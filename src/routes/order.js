const express = require("express");
const router = express.Router();

const orderController = require("../controllers/OrderController");

router.post("/", orderController.create);
router.put("/updatestate", orderController.updateState);
router.get("/", orderController.getAll);

module.exports = router;
