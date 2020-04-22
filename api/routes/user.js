const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User= require('../models').user
const Volunteer = require('../models').volunteer;
const Patient = require('../models').patient;
const Help = require('../models').help_type;
const secret = require('../config/authSecret');
const { Op } = require('sequelize');

router.post('/signup', function(req, res) {
  if(!req.body.username || !req.body.password || !req.body.location || !req.body.isPatient || !req.body.name){
    res.status(400).send({msg: "Must at least post name, user name, email, password, location, and patient boolean"})
  }else{
    console.log(User)
    User.create({
      name: req.body.name,
      user_name: req.body.username,
      password: req.body.password,
      location: req.body.location,
      description: req.body.description,
    }).then((user) =>{
      user['token'] = jwt.sign(JSON.parse(JSON.stringify(user)),'nodeauthsecret' , { expiresIn: 86400 * 30 })
      if(req.body.isPatient){
        user['isPatient'] = true;
        Patient.create({
          user_id: user.id
        }).then((patient) => {
          patient.setHelp_types(req.body.helpTypeIds);
        })
      }
      else{
        user['isPatient'] = false;
        Volunteer.create({
          user_id: user.id
        }).then((volunteer) => {
          volunteer.setHelp_types(req.body.helpTypeIds)
        })
      }
      user.network = [];
      user.helpTypes = [];
      return res.status(200).send({ user});
  })
    .catch((error) => {
      console.log(error);
      res.status(400).send(error);
    })
  }
});

router.post('/signin', (req,res) => {
  if(!req.body.password || !req.body.username){
    return res.status(400).send('must provide username and password to login');
  }
  getUser(-1, req.body.username)
  .then((user) => {
    if(!user){
      return res.status(401).send({
        msg: 'Username not found'
      })
    }
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(isMatch && !err) {
        var token = jwt.sign(JSON.parse(JSON.stringify(user)), 'nodeauthsecret', {expiresIn: 86400*30})
        jwt.verify(token, secret, function(err, data){
          console.log(err, data);
        })
        user['token'] = token;
        return res.status(200).send(user)
      } else {
        console.log(err);
        res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
       }
    })
  })
  .catch((error) =>
   res.status(400).send(error))
})

router.post('/patients/:patientId/volunteers/:volunteerId', (req,res) => {
  const patientId = parseInt(req.params.patientId), volunteerId = parseInt(req.params.volunteerId);
  if(isNaN(patientId) || isNaN(volunteerId)){
    res.status(400).send('invalid parameters');
  }
  Patient.findOne({
    where: {
      user_id: patientId
    }
  }).then((patient) => {
    patient.addVolunteers(volunteerId).then((pv) =>{
      res.status(200).send(pv);
    }).catch((err) => {
      console.log(err);
    });
  })
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
  getUser(id).then((user) => {
    res.status(200).send(user);
  }).catch((err) => {
    console.log(err);
  })
})

router.get('/volunteers/:id', function(req, res) {
  const id = parseInt(req.params.id);
  if(isNaN(id)){
    return res.status(400).send("not a valid Id");
  }
   getUser(id).then((user) => {
     res.status(200).send(user)
   }).catch((err) => {
     console.log(err)
   });
})

const getUser = async (id=-1, userName='') => {
 let user = await User.findOne({
    where:{
      [Op.or]: [
      {id: id},
      {user_name: userName}
      ]
    },
    include: [
      {
        model: Volunteer,
        include: [{
          model: Help
        },
        {
          model: Patient,
          include: [{
            model: User
          }]
        }
      ] 
      },
      {
        model: Patient,
        include: [{
          model: Help
        },
        {
          model: Volunteer,
          include: [{
            model: User
          }]
        }
      ]
      }
  ]
  })

  if (user.patient) {
    user.isPatient = true;
    user.helpTypes = user.patient.help_types.map((elem) => ({description:  elem.description, id: elem.id, name: elem.name }));
    user.network = user.patient.volunteers.map((elem) => ({ name: elem.user.name, location: elem.user.location, description: elem.user.description }));
  } else {
    user.isPatient = false;
    user.helpTypes = user.volunteer.help_types.map((elem) => ({description: elem.description, id: elem.id, name: elem.name }));
    user.network = user.volunteer.patients.map((elem) => ({ name: elem.user.name, location: elem.user.location, description: elem.user.description }));
  }
  return user;
}


module.exports = router;