var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var Investment = new Schema({  
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
//    amount: {
//        type: Number,
//        require: true
//    },
//    image: {
//    type; 
//    }
//    
});

module.exports = mongoose.model("Investment", Investment);