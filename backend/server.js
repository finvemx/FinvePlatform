var express = require("express");
var app = express();
var morgan = require("morgan");
var cors = require("cors");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var expressJwt = require("express-jwt");
//var bcrypt = require("bcrypt")


var port = process.env.PORT || 5000;
var config = require("./config.js");


mongoose.connect(config.database);

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use("/api", expressJwt({ secret: config.secret }));
app.use("/api/todo", require("./routes/todoRoutes"));
app.use("/auth", require("./routes/authRoutes"));


app.listen(port, function(){
    console.log("Server listening in port " + port);
})
