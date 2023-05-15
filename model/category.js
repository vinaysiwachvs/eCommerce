const mongoose=require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type:String,
        required : true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^[^<>#$\\/]*[\s,.-]*[^<>#$\\/]*$/.test(v);
            },
            message: (props) =>
                `${props.value} contains special characters, only alphanumeric characters and spaces are allowed!`,
        },
    }
});

module.exports= mongoose.model("Category",CategorySchema);
