var express = require('express');
var router = express.Router();
var trip = require('../models/trip');

//INDEX - show all trips
router.get("/", function(req, res){
    // Get all trips from DB
    trip.find({}, function(err, alltrips){
       if(err){
           console.log(err);
       } else {
          res.render("trips/index",{trips:alltrips, currentUser: req.user});
       }
    });
});

//CREATE - add new trip to DB
router.post("/", function(req, res){
    // get data from form and add to trips array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newtrip = {name: name, image: image, description: desc, author: author}

    // Create a new trip and save to DB
    trip.create(newtrip, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to trips page
            res.redirect("/trips");
        }
    });
});

//NEW - show form to create new trip
router.get("/new", isLoggedIn, function(req, res){
   res.render("trips/new.ejs");
});

// SHOW - shows more info about one trip
router.get("/:id", isLoggedIn, function(req, res){
    //find the trip with provided ID
    trip.findById(req.params.id).populate("comments").exec(function(err, foundtrip){
        if(err){
            console.log(err);
        } else {
            console.log(foundtrip)
            //render show template with that trip
            res.render("trips/show", {trip: foundtrip});
        }
    });
});

// EDIT trip ROUTE
router.get("/:id/edit", checktripOwnership, function(req, res){
    trip.findById(req.params.id, function(err, foundtrip){
                res.render("trips/edit", {trip: foundtrip});
        });
            });


// UPDATE trip ROUTE
router.put("/:id", function(req, res){
    // find and update the correct trip
    trip.findByIdAndUpdate(req.params.id, req.body.trip, function(err, updatedtrip){
       if(err){
           res.redirect("/trips");
       } else {
           //redirect somewhere(show page)
           res.redirect("/trips/" + req.params.id);
       }
    });
});

// Destroy trip Route
router.delete('/:id', function(req, res) {
    trip.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            res.redirect('/trips');
        } else {
            res.redirect('/trips');
        }
    });
});

// middleware
function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

function checktripOwnership(req, res, next) {
    if(req.isAuthenticated()) {
          // does user own trip
    trip.findById(req.params.id, function(err, foundtrip){

        if(err) {
            res.redirect('back')
            } else {
                if(foundtrip.author.id.equals(req.user._id)) {
                   next();
                } else {
                    res.redirect('back');
                }
            }

    // otherwise redirect
    // If not redirect
    });
} else {
    res.redirect('back');
}
}

module.exports = router;
