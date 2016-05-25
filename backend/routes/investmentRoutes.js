var express = require("express");  
var investmentRouter = express.Router();  
var Investment = require("../models/investment");

investmentRouter.route("/")  
    .get(function (req, res) {

        // Addition: include filtering criteria to the find so that it only finds todo items with a 'user' property with the current user's id.
        Investment.find({user: req.user._id}, function (err, investment) {
            if (err) res.status(500).send(err);
            res.send(investment);
        });
    })
    .post(function (req, res) {
        var investment = new Investment(req.body);

        // Addition: include the user property to this new Todo item
        Investment.user = req.user;
        Investment.save(function (err, newInvestment) {
            if (err) res.status(500).send(err);
            res.status(201).send(newInvestment);
            console.log(newInvestment);
        });
    });

investmentRouter.route("/:investmetId")  
    .get(function (req, res) {
        // Addition: Change to FindOne and include the search criteria for users
        Investment.findOne({_id: req.params.investmetId, user: req.user._id}, function (err, investment) {
            if (err) res.status(500).send(err);
            if (!investment) res.status(404).send("No todo item found.");
            else res.send(investment);
        });
    })
    .put(function (req, res) {
        // Addition: Change to FindOneAndUpdate and include the search criteria for users
        Investment.findOneAndUpdate({_id: req.params.investmetId, user: req.user._id}, req.body, {new: true}, function (err, todo) {
            if (err) res.status(500).send(err);
            res.send(todo);
        });
    })
    .delete(function (req, res) {
        // Addition: Change to FindOneAndRemove and include the search criteria for users
        Investment.findOneAndRemove({_id: req.params.investmetId, user: req.user._id}, function (err, investment) {
            if (err) res.status(500).send(err);
            res.send(investment);
        });
    });

module.exports = investmentRouter;  