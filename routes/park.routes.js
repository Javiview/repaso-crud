const express = require("express");
const router = express.Router();
const Park = require("../models/park.model");

// Aquí los endpoints
router.get("/new", (req, res, next) => {
  res.render("parks/new-park");
});

router.post("/new", (req, res, next) => {

  const newPark = new Park({
    name: req.body.name,
    description: req.body.description,
    active: true
  });

  newPark.save(error => {
    if (error) {
      next(error);
    } else {
      res.redirect("/parks/new");
    }
  });
});
module.exports = router;
