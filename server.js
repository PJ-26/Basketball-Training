require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//const db = require('./dbconfig.js')

const mongoURI = process.env.MONGO_URI;
const mongoose = require("mongoose");
mongoose.Promise = require('bluebird');


mongoose.connect(mongoURI, {useMongoClient: true})
  .then(({db: {databaseName}}) => console.log(`Connected to ${databaseName}`))
  .catch((err => console.error(err)));

const sessionSchema = mongoose.Schema({
  name: String,
  type: String,
  duration: String
});

const Session = mongoose.model("Session", sessionSchema);

const insertSession = session => 
  (new Session(session)).save( (err, newSession) => 
    console.log(err || newSession));

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/index.html');
});

app.post('/', (req,res) => {
  console.log("Post Worked");
  insertSession({ name: req.body.name, type: req.body.type, duration: req.body.duration });
  res.redirect('/')
})

app.listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.PORT}`);
})

console.log("Node working")