const express = require("express");
const router = express.Router();

// Aquí los endpoints
router.get("/", (req, res, next) => {
  res.render("parks/new-park");
});

module.exports = router;
