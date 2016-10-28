var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require('method-override'),
    trip  = require("./models/trip"),
    Comment     = require("./models/comment"),
    User        = require("./models/user")
// Requiring Routes
var commentRoutes     = require('./routes/comments'),
    tripRoutes  = require('./routes/trips'),
    indexRoutes        = require('./routes/index')

// mongoose.connect("mongodb://localhost/yelp_camp_v3");
mongoose.connect("mongodb://localhost/setrip");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));
// seedDB();

// Passport Configuration
app.use(require("express-session")({
  secret: "Once again Oso wins cutest dog!",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});



app.use(indexRoutes);
app.use('/trips', tripRoutes);
app.use('/trips/:id/comments', commentRoutes);


app.listen(process.env.PORT || 4000, function(){
   console.log("setript.id sudah jalan di 4000!");
});
