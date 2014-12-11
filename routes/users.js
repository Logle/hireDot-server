var express = require('express');
var router = express.Router();
var User =  require('../models').User;

/* GET users listing. */
router.get('/', function(req, res) {
  User.find()
   .limit(25)
   .exec(function(err, users){
   		res.json(users);
   })
});

module.exports = router;
