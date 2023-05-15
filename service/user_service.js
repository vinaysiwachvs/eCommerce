const mongoose = require('mongoose');
const User = require('../model/user_model');


const addUserToDB = async (user)=>{
        await user.save();
        console.log(user);
}

const getUserfromDB = async()=>{
        return await User.find();
}

module.exports ={addUserToDB,getUserfromDB};

