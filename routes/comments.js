var express = require('express');
var router = express.Router({mergeParams: true});
var trip = require('../models/trip');
var Comment = require('../models/comment');

// Comments New
router.get('/new', isLoggedIn, function(req, res) {
  // find trip by id
  trip.findById(req.params.id, function(err, trip) {
    if(err) {
      console.log(err)
    } else {
      res.render('comments/new', {trip: trip});
    }
  });
});

//Comments Create
router.post('/', isLoggedIn, function(req, res) {
  // lookup trip using ID
  trip.findById(req.params.id, function(err, trip) {
    if(err) {
      console.log(err);
      res.redirect('/trips');
    } else {
      Comment.create(req.body.comment, function(err, comment) {
        if (err) {
          console.log(err);
        } else {
          // add username and id to comment
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          // save comment
          comment.save();
          trip.comments.push(comment);
          trip.save();
          console.log(comment);
          res.redirect('/trips/' + trip._id);
        }
      })
    }
  })
});


function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = router;
