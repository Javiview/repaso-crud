const express = require("express");
const router = express.Router();

const Park = require("../models/park.model");
const Coasters = require("../models/coaster.model");

router.get("/new", (req, res, next) => {
  Park.find({}, (error, parksFromDB) => {
    if (error) {
      next(error);
    } else {
      res.render("coasters/new-coaster", { parks: parksFromDB });
    }
  });
});
router.post("/new", (req, res, next) => {
  const newCoaster = new Coasters({
    name: req.body.name,
    description: req.body.description,
    inversions: req.body.inversions,
    length: req.body.lenght,
    active: true,
    park: req.body.park
  });

  newCoaster.save(error => {
    if (error) {
      next(error);
    } else {
      res.redirect("/");
    }
  });
});

router.get("/", (req, res, next) => {
  Coasters.find()
    .populate("park")
    .then(coasterFromDB => {
      res.render("coasters/coasters-index", { coasters: coasterFromDB });
    });
});

router.get("/:coaster_id", (req, res, next) => {
    Coasters.findById(req.params.coaster_id)
      .populate("park")
      .then(coaster => {
        res.render("coasters/coaster-details",coaster);
      });
  });

  // DELETE 
router.get('/delete/:coaster_id', (req, res, next) => {
	Coasters.remove({ _id: req.params.coaster_id }, function(error, coaster) {
        console.log(error)
		if (error) {
			next(error);
		} else {
			res.redirect('/');
		}
	});
});

module.exports = router;
