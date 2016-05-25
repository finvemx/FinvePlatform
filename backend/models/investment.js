var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var investmentSchema = new Schema({  
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
//    user: {
//        type: Schema.Types.ObjectId,
//        ref: "User"
//    }
});

module.exports = mongoose.model("Investment", investmentSchema);