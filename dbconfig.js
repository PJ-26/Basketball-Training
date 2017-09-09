const mongoURI =
  "mongodb://pj26:awash1991@ds157320.mlab.com:57320/basketballtraining";
console.log(mongoURI);
const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

mongoose
  .connect(mongoURI, { useMongoClient: true })
  .then(({ db: { databaseName } }) =>
    console.log(`Connected to ${databaseName}`))
  .catch(err => console.error(err));

const sessionSchema = mongoose.Schema({
  name: String,
  type: String,
  duration: String
});

const Session = mongoose.model("Session", sessionSchema);

const insertSession = session =>
  new Session(session).save((err, newSession) =>
    console.log(err || newSession)
  );



module.exports = db;
