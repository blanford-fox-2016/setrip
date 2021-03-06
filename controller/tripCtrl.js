var express = require ('express')
var Comment = require('../models/comment');
var trip = require('../models/trip');
module.exports = {

  showAll :  function(req, res){
      // Get all trips from DB
      trip.find({}, function(err, alltrips){
         if(err){
             console.log(err);
         } else {
            res.render("trips/index",{trips:alltrips, currentUser: req.user});
         }
      });
  },


  addNew :  function(req, res){
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
  },

  showMore : function(req, res){
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
  },

  tripRoute : function(req, res){
      trip.findById(req.params.id, function(err, foundtrip){
                  res.render("trips/edit", {trip: foundtrip});
          });
  },

  updatedTrip : function(req, res){
      // find and update the correct trip
      trip.findByIdAndUpdate(req.params.id, req.body.trip, function(err, updatedtrip){
         if(err){
             res.redirect("/trips");
         } else {
             //redirect somewhere(show page)
             res.redirect("/trips/" + req.params.id);
         }
      });
  },

  deleteTrip : function(req, res) {
      trip.findByIdAndRemove(req.params.id, function(err) {
          if(err) {
              res.redirect('/trips');
          } else {
              res.redirect('/trips');
          }
      });
  }

}
