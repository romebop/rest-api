const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/api');
const mongoose = require('mongoose');

// set up express app
const app = express();

// connect to mongodb
mongoose.connect('mongodb://localhost/ninjas');
mongoose.Promise = global.Promise;

app.use(express.static('public'));

// use body-parser middleware
app.use(bodyParser.json());

// init routes
app.use('/api', router);

// error handling middleware
app.use((err, req, res, next) => {
  //console.log(err);
  res.status(422).send({ error: err.message });
});

// listen for requests
app.listen(process.env.port || 4000, () => {
  console.log('now listening for requests xD');
});