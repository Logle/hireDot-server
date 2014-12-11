var express = require('express');
var router = express.Router();
var Project =  require('../models').Project

/* GET users listing. */
router.get('/', function(req, res) {
   Project.find()
   .limit(25)
   .exec(function(err, projects){
   		res.json(projects);
   })
});

module.exports = router;