//initalise mongoose schema for college
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var CollegeSchema = new Schema({
  name: String,
  address: String,
  city: String,
  state: String,
  zip: String,
  phone: String,
  website: String,
  created_at: Date,
  updated_at: Date,
});

//intilise mongoose model
var College = mongoose.model("College", CollegeSchema);
