var express = require('express');
var router = express.Router();
var trip = require('../models/trip');
var Midleware = require ('../controller/middleware')
var Controller = require ('../controller/tripCtrl')
//INDEX - show all trips
router.get("/",Controller.showAll);

//CREATE - add new trip to DB
router.post("/",Controller.addNew);

//NEW - show form to create new trip
router.get("/new", Midleware.AuthLog, function(req, res){
   res.render("trips/new.ejs");
});

// SHOW - shows more info about one trip
router.get("/:id", Midleware.AuthLog, Controller.showMore );

// EDIT trip ROUTE
router.get("/:id/edit", Midleware.checkTrip, Controller.tripRoute);


// UPDATE trip ROUTE
router.put("/:id", Controller.updatedTrip);

// Destroy trip Route
router.delete('/:id', Controller.deleteTrip);




module.exports = router;
