var express = require('express');
var router = express.Router({mergeParams: true});
var trip = require('../models/trip');
var Comment = require('../models/comment');
var Controller = require ('../controller/commentCtrl')
var Midleware = require ('../controller/middleware')
// Comments New
router.get('/new', Midleware.AuthLog, Controller.newComment);

//Comments Create
router.post('/', Midleware.AuthLog, Controller.createComment);



module.exports = router;
