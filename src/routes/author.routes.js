const express = require("express");
const router = express.Router();
const authorController = require("../controllers/author.controller");

router.get("/", authorController.getAll);
router.get("/:id", authorController.getById);
router.post("/", authorController.create);
router.put("/:id", authorController.update);
router.delete("/:id", authorController.remove);

module.exports = router;