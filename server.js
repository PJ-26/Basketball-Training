const express = require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const path = require("path");

require("dotenv").config();
const port = process.env.PORT;
const mongoURI = process.env.MONGO_URI;
mongoose.Promise = require("bluebird");
// app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
mongoose.connect(mongoURI, {useMongoClient: true})
  .then(({db: {databaseName}}) => console.log(`Connected to ${databaseName}`))
  .catch((err => console.error(err)));

const sessionSchema = mongoose.Schema({
  type: String,
  name: String,
  duration: String,
  success: Boolean
});

const userVideosSchema = mongoose.Schema({
  video: String
})

const Session = mongoose.model("Session", sessionSchema);
const UserVideo = mongoose.model('UserVideo', userVideosSchema);

const insertSession = session => 
  (new Session(session)).save( (err, newSession) => 
    console.log(err || newSession));

let session = new Session({type:'Shooting', name:'Around the World', duration:'30 seconds', success: false});

session.save( (err) => console.log(err || session));

app.get('/', (req, res) => { 
  console.log('GET WORKED');
  Session.find( (err, sessions) => {
    if (err) console.error(err)
    else res.json(sessions);
  })
});

app.post('/', (req,res) => {
  console.log("Post Worked");
  
  Session.create({ type: req.body.type, name: req.body.name,
     duration: req.body.duration, success: req.body.success},
     (err, session) => {
    if(err) console.log(err);
    else {
      Session.find((err, sessions) => {
        if (err) console.error(err);
        else res.json(sessions);
      });
    }
  })
})

app.delete('/:session_id', (req, res) => {
  Session.remove({_id:req.params.todo_id}, (err, session) => {
    if(err) console.error(err);
    else {
      console.log("DELETED");
      Session.find( (err, sessions) => {
        if(err) console.error(err);
        else res.json(sessions);
      })
    }
  })
})

app.listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.PORT}`);
})

console.log("Node working")

// const insertVideo = video => 
//   (new UserVideo).save( (err, newVideo) =>
//     console.log(err || newVideo));

// Session.find({sucess:false} ,(err, sessions) => 
//   console.log(err || sessions));

// UserVideo.find( (err, videos) => 
//   console.log(err || videos));


