var express = require ('express')
var Comment = require('../models/comment');
var trip = require('../models/trip');
var User = require('../models/user');

module.exports = {

    AuthLog : function isLoggedIn(req, res, next) {
        if(req.isAuthenticated()) {
          return next();
        }
        res.redirect('/login');
      },
    checkTrip : function checktripOwnership(req, res, next) {
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

}
