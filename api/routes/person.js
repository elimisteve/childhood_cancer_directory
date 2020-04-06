const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Person = require('../models').person;
const secret = require('../config/authSecret');

router.post('/signup', function(req, res) {
  console.log(req.body);
  if(!req.body.username || !req.body.password || !req.body.location){
    res.status(400).send({msg: "Must at least post username, password, and location"})
  }else{
    Person.create({
      username: req.body.username,
      password: req.body.password,
      location: req.body.location,
      patient: req.body.patient,
      volunteer: req.body.volunteer,
    }).then((person) =>{
      var token = jwt.sign(JSON.parse(JSON.stringify(person)),'nodeauthsecret' , { expiresIn: 86400 * 30 })
      res.cookie('bearer', 'JWT ' + token)
      res.status(201).send({"person" : person, "token": "JWT " + token } )
  })
    .catch((error) => {
      console.log(error);
      res.status(400).send(error);
    })
  }
});

router.post('/signin', (req,res) => {
  Person.findOne({
    where:{
      username: req.body.username
    }
  }).then((person) => {
    if(!person){
      return res.status(401).send({
        msg: 'Username not found'
      })
    }
    person.comparePassword(req.body.password, (err, isMatch) => {
      if(isMatch && !err) {
        var token = jwt.sign(JSON.parse(JSON.stringify(person)), 'nodeauthsecret', {expiresIn: 86400*30})
        jwt.verify(token, secret, function(err, data){
          console.log(err, data);
        })
        res.cookie('bearer', 'JWT ' + token)
        res.json({success: true, token: 'JWT ' + token});
      } else {
        res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
       }
    })
  })
  .catch((error) => res.status(400).send(error))
})

router.get('/volunteers', (req,res) => {
  Person.findAll({
    where:{
      volunteer: '1'
    }
  }).then((volunteers) =>{
    return res.status(200).send(volunteers)
  }).catch((error) => {
    console.log(error);
    return res.status(500).send("an error occured");
  })
})

router.get('/patients', (req, res) => {
  Person.findAll({
    where: {
      patient: '1' 
    }
  }).then((patients) => {
    return res.status(200).send(patients)
  }).catch((error) => {
    console.log(error);
    return res.status(500).send("an error occured")
  })
})


module.exports = router;