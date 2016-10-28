var express = require('express');
var router = express.Router();
var trip = require('../models/trip');
var passport = require('passport');
var User = require('../models/user');
var Controller = require ('../controller/indexCtrl')

//Root Route
router.get("/",Controller.landing);


router.get("/register",Controller.register);

// Register Route
router.post("/register",Controller.registRoute);

// Show login form
router.get("/login", function(req, res) {
  res.render("login");
});

router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/trips",
        failureRedirect: "/login"
    }), function(req, res){
});

// logout route
router.get("/logout",Controller.logOut )

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = router;
