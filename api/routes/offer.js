const express = require('express');
const passport = require('passport');
const router = express.Router();
require('../config/passport')(passport);
const Offer = require('../models').offer;

router.get('/offers', function(req, res){
  console.log(req);
    Offer.findAll()
    .then((offers) => res.status(200).send(offers))
    .catch((error) => res.status(400).send(error))
  });

  router.get('/offers/:id', function(req, res){
    const id = parseInt(req.params.id)
    if(isNaN(id)){
      return res.status(400).send("Not a valid Id");
    }
    Offer.findOne({
      where: {
      id: id
      }
    }).then((offer) => {
      if(!offer){
        return res.status(401).send("Offer not found");
      }
      return res.status(200).send(offer)
    })
  })

router.post('/offers', passport.authenticate('jwt', { session: false}), function(req, res){
    const { name, description } = req.body;
    if(!name || !description){
      return res.status(400).send("Must provide name and description")
    }
    Offer.create({
      name: name,
      description: description,
    }).then((offer) => {
      res.status(201).send(offer);
    }).catch((error) => {
      console.log(error);
    })
  }
)
module.exports = router;