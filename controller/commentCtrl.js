var express = require ('express')
var Comment = require('../models/comment');
var trip = require('../models/trip');
var User = require('../models/user');

module.exports = {

  newComment :  function(req, res) {
    // find trip by id
    trip.findById(req.params.id, function(err, trip) {
      if(err) {
        console.log(err)
      } else {
        res.render('comments/new', {trip: trip});
      }
    });
  },
  createComment : function(req, res) {
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
  }

}
