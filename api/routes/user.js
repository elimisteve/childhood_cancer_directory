const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User= require('../models').user
const Volunteer = require('../models').volunteer;
const Patient = require('../models').patient;
const Help = require('../models').help_type;
const secret = require('../config/authSecret');

router.post('/signup', function(req, res) {
  console.log(req.body);
  if(!req.body.username || !req.body.password || !req.body.location){
    res.status(400).send({msg: "Must at least post username, password, and location"})
  }else{
    User.create({
      user_name: req.body.username,
      password: req.body.password,
      location: req.body.location,
      description: req.body.description,
    }).then((user) =>{
      var token = jwt.sign(JSON.parse(JSON.stringify(user)),'nodeauthsecret' , { expiresIn: 86400 * 30 })
      res.status(201).send({"user" : user, "token": "JWT " + token } )
  })
    .catch((error) => {
      console.log(error);
      res.status(400).send(error);
    })
  }
});

router.post('/signin', (req,res) => {
  User.findOne({
    where:{
      username: req.body.username
    }
  }).then((user) => {
    if(!user){
      return res.status(401).send({
        msg: 'Username not found'
      })
    }
    User.comparePassword(req.body.password, (err, isMatch) => {
      if(isMatch && !err) {
        var token = jwt.sign(JSON.parse(JSON.stringify(user)), 'nodeauthsecret', {expiresIn: 86400*30})
        jwt.verify(token, secret, function(err, data){
          console.log(err, data);
        })
        res.json({success: true, token: 'JWT ' + token});
      } else {
        res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
       }
    })
  })
  .catch((error) => res.status(400).send(error))
})

router.get('/volunteers', (req,res) => {
  User.findAll({
    attributes: ['name', 'location', 'user_name', 'description'],
    include: [{
      model: Volunteer,
      required: true,
      attributes: [],
    }]
  }).then((volunteers) =>{
    return res.status(200).send(volunteers)
  }).catch((error) => {
    console.log(error);
    return res.status(500).send("an error occured");
  })
})

router.get('/patients', (req, res) => {
  User.findAll({
    attributes: ['id', 'name', 'location', 'user_name', 'description'],
    include: [{
      model: Patient,
      required: true,
      attributes: [],
    }]
  }).then((patients) => {
    return res.status(200).send(patients)
  }).catch((error) => {
    console.log(error);
    return res.status(500).send("an error occured")
  })
})

router.get('/patients/:id', function(req, res){
  const id = parseInt(req.params.id);
  if(isNaN(id)){
    return res.status(400).send("not a valid Id");
  }
  User.findOne({
    where: {
      id: id
    },
    attributes: ['id', 'name', 'location', 'user_name', 'description'], //TODO; get help types associated with patient
  }).then((patient) => {
    return res.status(200).send(patient)
  }).catch((error) => {
    return res.status(400).send("error fetching patient");
  })
})

router.get('/volunteers/:id', function(req, res) {
  const id = parseInt(req.params.id);
  if(isNaN(id)){
    return res.status(400).send("not a valid Id");
  }
  User.findOne({
    where: {
      id: id,
    },
    attributes: ['id', 'name', 'location', 'user_name', 'description'], //TODO; get help types associated with patient
    include: [{
      model: Volunteer,
      attributes: ['user_id'],
      include: [{
        model: Help,
        attributes: ['name', 'description', 'id']
      },
    {
      model: Patient,
      include: [{
        model: User,
        attributes: ['id', 'name', 'location', 'description']
      }]
    }]
    }]
  }).then((volunteer) => {
    let resObj = {}
    resObj.id = volunteer.id;
    resObj.location = volunteer.location;
    resObj.description = volunteer.description;
    resObj.patients = volunteer.volunteer.patients.map((patient) => (patient.user));
    resObj.help_types = volunteer.volunteer.help_types.map((ht) => ({'name': ht.name, 'description': ht.description, 'id': ht.id}))
    return res.status(200).send(resObj)
  }).catch((error) => {
    return res.status(400).send("error fetching volunteer");
  })
})

module.exports = router;