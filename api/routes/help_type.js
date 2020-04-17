const express = require('express');
const passport = require('passport');
const router = express.Router();
require('../config/passport')(passport);
const Help = require('../models').help_type;

router.get('/helpTypes', function(req, res){
  Help.findAll({
    attributes: ['id', 'name', 'description']
  }).then((help) => res.status(200).send(help))
  .catch((error) => res.status(400).send("Error getting help types"))
})

module.exports = router;