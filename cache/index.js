const mongoose = require("mongoose");
var Schema = mongoose.Schema;
//bring in mongo uri from mlab
//monnect mongodb
var voteSchema = new Schema({
  jName: String,
  congress: Number,
  session: Number,
  chamber: String,
  roll_call: Number,
  source: String,
  url: String,
  bill: {
    bill_id: String,
    number: String,
    api_uri: String,
    title: String,
    latest_action: String
  },
  question: String,
  description: String,
  vote_type: String,
  date: String,
  time: String,
  result: String,
  tie_breaker: String,
  tie_breaker_vote: String,
  document_number: String,
  document_title: String,
  democratic: {
    yes: Number,
    no: Number,
    present: Number,
    not_voting: Number,
    majority_position: String
  },
  republican: {
    yes: Number,
    no: Number,
    present: Number,
    not_voting: Number,
    majority_position: String
  },
  independent: {
    yes: Number,
    no: Number,
    present: Number,
    not_voting: Number
  },
  total: {
    yes: Number,
    no: Number,
    present: Number,
    not_voting: Number
  }
});

var coordsSchema = new Schema({
  destination:String,
  lat:Schema.Decimal,
  lng:Schema.Decimal
})

var Vote = mongoose.model("Vote", voteSchema, "votes");
var Coords = mongoose.model("Coord", coordsSchema,"coords")
const handleMongoCacheSave = async voteObj => {
  const mongoURI = `mongodb://${process.env.M_USER}:${process.env.M_PASS}@ds329058.mlab.com:29058/check-my-rep`;
  await mongoose.connect(mongoURI);

  var vote1 = new Vote(voteObj.vote);
  await vote1.save();
};

const handleMongoFindByJName = async jName => {
  const mongoURI = `mongodb://${process.env.M_USER}:${process.env.M_PASS}@ds329058.mlab.com:29058/check-my-rep`;
  await mongoose.connect(mongoURI);

  return await Vote.find({ jName: jName });
};

const handleKnownCoords = async destination => {
    const mongoURI = `mongodb://${process.env.M_USER}:${process.env.M_PASS}@ds329058.mlab.com:29058/check-my-rep`;
    await mongoose.connect(mongoURI);

    return await coordsSchema.find({destination:destination})
}

const handleMongoCoordSave = async tripObj => {
  const mongoURI = `mongodb://${process.env.M_USER}:${process.env.M_PASS}@ds329058.mlab.com:29058/check-my-rep`;
  await mongoose.connect(mongoURI);

  var vote1 = new Coords(tripObj);
  await vote1.save();
};


module.exports = {
  handleMongoCacheSave,
  handleMongoFindByJName,
  handleKnownCoords,
  handleMongoCoordSave
};
