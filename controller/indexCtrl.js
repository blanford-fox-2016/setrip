var express = require ('express')
var Comment = require('../models/comment');
var trip = require('../models/trip');
var User = require('../models/user');
var passport = require('passport');
module.exports = {

  landing : function(req, res){
      res.render("landing");
  },

  register : function(req, res) {
    res.render("register");
  },

  registRoute :  function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user) {
      if (err) {
        console.log(err);
        return res.render("register")
      }
      passport.authenticate("local")(req, res, function() {
        res.redirect("/trips");
      });
    });
  },

  passportLog :function (){
    passport.authenticate("local",
        {
            successRedirect: "/trips",
            failureRedirect: "/login"
        }), function(req, res){
    }
  } ,

  logOut: function(req, res) {
    req.logout();
    res.redirect("/trips");
  }

}
