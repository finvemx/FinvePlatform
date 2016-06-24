var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var Schema = mongoose.Schema;

var Admin = new Schema({
    name: String,
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
});

Admin.pre("save", function (next) {
    var admin = this;
    if (!admin.isModified("password")) return next();

    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) return next(err);

        admin.password = hash;
        next()
    });
});

Admin.methods.toJSON = function () {
    var admin = this.toObject();
    delete admin.password;
    console.log(admin);
    return user;
};

module.exports = mongoose.model("Admin", Admin);