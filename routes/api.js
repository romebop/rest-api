const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja');

// get a list of ninjas from db
router.get('/ninjas', (req, res, next) => {
  Ninja.geoNear(
    {type: "Point", coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]},
    {maxDistance: 100000, spherical: true}
  ).then((ninjas) => {
    res.send(ninjas);
  });
});

// add a new ninja to db
router.post('/ninjas', (req, res, next) => {
  // const ninja = new Ninja(req.body);
  // ninja.save();
  Ninja.create(req.body).then((ninja) => {
    res.send(ninja);
  }).catch(next);
});

// update a ninja in db
router.put('/ninjas/:id', (req, res, next) => {
  console.log('the req.body:', req.body);
  Ninja.findByIdAndUpdate({_id: req.params.id}, req.body).then((ninja) => {
    Ninja.findOne({_id: req.params.id}).then((ninja) => {
      res.send(ninja);
    });
  });
});

// delete a ninja from db
router.delete('/ninjas/:id', (req, res, next) => {
  Ninja.findByIdAndRemove({_id: req.params.id}).then((ninja) => {
    res.send(ninja);
  });
});

module.exports = router;