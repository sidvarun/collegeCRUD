//initialise mongoose schmea for student
var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var StudentSchema = new Schema({
  name: String,
  year_of_batch: Number,
  created_at: Date,
  updated_at: Date,
  college_id: {
    type: Schema.Types.ObjectId,
    ref: "College",
  },
  skills: [String],
});

//initialise mongoose data model
var Student = mongoose.model("Student", StudentSchema);
