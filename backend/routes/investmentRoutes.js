var express = require("express");
var investmentRouter = express.Router();
var Investment = require("../models/investment");

investmentRouter.route("/")
    .get(function (req, res) {

        Investment.find({
            user: req.user._id
        }, function (err, investment) {
            if (err) res.status(500).send(err);
            res.send(investment);
        });
    })
    .post(function (req, res) {
        var investment = new Investment(req.body);

        Investment.user = req.user;
        Investment.save(function (err, newInvestment) {
            if (err) res.status(500).send(err);
            res.status(201).send(newInvestment);
            console.log(newInvestment);
        });
    });

investmentRouter.route("/:investmetId")
    .get(function (req, res) {
        Investment.findOne({
            _id: req.params.investmetId,
            user: req.user._id
        }, function (err, investment) {
            if (err) res.status(500).send(err);
            if (!investment) res.status(404).send("No investments found.");
            else res.send(investment);
        });
    })
    .put(function (req, res) {
        Investment.findOneAndUpdate({
            _id: req.params.investmetId,
            user: req.user._id
        }, req.body, {
            new: true
        }, function (err, todo) {
            if (err) res.status(500).send(err);
            res.send(todo);
        });
    })
    .delete(function (req, res) {
        Investment.findOneAndRemove({
            _id: req.params.investmetId,
            user: req.user._id
        }, function (err, investment) {
            if (err) res.status(500).send(err);
            res.send(investment);
        });
    });

module.exports = investmentRouter;