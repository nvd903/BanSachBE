const express = require("express");
const router = express.Router();

const authorController = require("../controllers/AuthorController");
const middlewareController = require("../controllers/MiddlewareController");

router.post("/", authorController.createAnAuthor);
router.put(
  "/:id",
  middlewareController.verifyTokenAndAdminAuth,
  authorController.updateAuthor
);
router.delete(
  "/:id",
  middlewareController.verifyTokenAndAdminAuth,
  authorController.deleteAuthor
);
router.get("/getpage", authorController.getAuthorPerPage);
router.get("/:id", authorController.getById);
router.get("/", authorController.getAllAuthor);

module.exports = router;
