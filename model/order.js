const mongoose = require("mongoose");
const Orderschema = new mongoose.schema({
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
    amount:{
        type:Number,
        required:true,
    },
    shippingAddress:{
        type: String,
        required:true,
    },
    city:{
        type: String,
        required:true,
    },
    status:{
        type:String,
        required:true,
        default:"pending",
    },
    dateOrdered: {
        type: Date,
        default: Date.now,
    },
});
module.exports = mongoose.model("Order",Orderschema);