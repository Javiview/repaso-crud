const express = require("express");
const router = express.Router();

const Park = require("../models/park.model");
const Coaster = require("../models/coaster.model");

router.get('/new', (req, res, next) => {
	Park.find({},(error, parksFromDB) => {
    console.log(parksFromDB)
    
		if (error) { 
			next(error); 
		} else { 
			res.render('coasters/new-coaster', { parks: parksFromDB});
		}
	});
});
router.post("/new", (req, res, next) => {

    const newCoaster = new Coaster({
      name: req.body.name,
      description: req.body.description,
      inversions:	req.body.inversions,
        length:		req.body.lenght,
        active:		true,
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


module.exports = router;
