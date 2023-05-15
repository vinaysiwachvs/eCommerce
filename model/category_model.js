const mongoose = require("mongoose");
const Categoryschema = new mongoose.schema({
    userid:{
        type: String,
        required: true,
    },
    products:[{
        productid:{
            type:String,
        },
        quantity:{
            type: Number,
            default: 1,
        },
    }],
});
module.exports = mongoose.model("Category",Categoryschema);