const express = require("express");
const router = express.Router();

const bookController = require("../controllers/BookController");

router.get("/bestseller/", bookController.getBestSellerList);
router.post("/pagination/", bookController.getBooksLimit);
router.post("/", bookController.createOne);
router.get("/:id", bookController.getABookById);
router.get("/", bookController.getAllBook);
router.post("/listfavourite", bookController.getListFavouriteBooks);
router.put("/", bookController.updateABook);
router.put("/decrementquantity", bookController.decrementQuantity);
router.put("/incrementinventory", bookController.incrementInventoryQuantity);
router.put("/updatepurchasedquantity", bookController.updatePurchasedQuantity);
router.put("/updateprioritypoints", bookController.updatePriorityPoints);
router.put("/updateMany", bookController.updateManyQuantity);
router.delete("/", bookController.deleteABook);

module.exports = router;
