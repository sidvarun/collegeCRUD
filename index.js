//initialise express
var express = require("express");
var app = express();

app.use(express.json());

//initialise mongoose

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test");
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("connected to mongodb");
});

//insert data into college and student
var College = require("./models/College");
var Student = require("./models/Student");

for (var i = 0; i < 100; i++) {
  var college = new College({
    name: "University of Melbourne" + i,
    address: "123 Main Street",
    city: "Melbourne",
    state: "Victoria",
    zip: "3000",
    phone: "1234567890",
    website: "www.um.edu.au",
    created_at: new Date(),
    updated_at: new Date(),
  });

  college
    .save(function (err) {
      if (err) return console.error(err);
      console.log("college saved");
    })
    .then(function (data) {
      var student = new Student({
        name: "John Doe" + i,
        year_of_batch: 2015,
        created_at: new Date(),
        updated_at: new Date(),
        college_id: data._id,
        skills: ["Java", "C++", "C#"],
      });
      student
        .save(function (err) {
          if (err) return console.error(err);
          console.log("student saved");
        })
        .then(function () {
          console.log("data saved");
        })
        .catch(function (err) {
          console.log(err);
        });
    })
    .catch(function (err) {
      console.log(err);
    });
}

//search college by name
app.get("/college/:name", function (req, res) {
  College.find({ name: req.params.name }, function (err, data) {
    if (err) return console.error(err);
    res.send(data);
  })
    .then(function () {
      console.log("data sent");
    })
    .catch(function (err) {
      console.log(err);
    });
});

//listen
app.listen(3000, function () {
  console.log("listening on port 3000");
});
