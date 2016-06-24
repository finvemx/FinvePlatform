var express = require("express");
var authRoutes = express.Router();
var User = require("../models/User")
var jwt = require("jsonwebtoken");
var config = require("../config");
var bcrypt = require("bcrypt");

authRoutes.post("/login", function (req, res) {
    User.findOne({
        username: req.body.username
    }, function (err, user) {
        if (err) res.status(500).send(err);
        if (!user) {
            res.status(401).send({
                success: false,
                message: "User with the provided username was not found"
            })
        } else if (user) {
            bcrypt.compare(req.body.password, user.password, function (err, match) {
                if (err) throw (err);
                if (!match) res.status(401).send({
                    success: false,
                    message: "Incorrect password"
                });
                else {
                    var token = jwt.sign(user.toObject(), config.secret, {
                        expiresIn: "24h"
                    });
                    res.send({
                        user: user,
                        token: token,
                        success: true,
                        message: "Here's your token!"
                    })
                }
            });
        }
    });
});

authRoutes.post("/signup", function (req, res) {
    User.find({
        username: req.body.username
    }, function (err, existingUser) {
        if (err) res.status(500).send(err);
        if (existingUser.length) res.send.json({
            success: false,
            message: "This username is already taken"
        });
        else {
            var newUser = new User(req.body);
            newUser.save(function (err, userObj) {
                if (err) res.status(500).send(err);
                res.send(newUser);
            })
        }
    })
});

module.exports = authRoutes;