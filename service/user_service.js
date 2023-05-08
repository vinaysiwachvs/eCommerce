const mongoose = require('mongoose');
const User = require('../model/user_model');


const addUserToDB = async (user)=>{
    try {
        const findUser = await User.findOne({email:user.email})
        if(findUser) throw new Error("User already exists");
        const result =  await user.save();
        console.log(user);
        return result;
        
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}

const getUserfromDB = async()=>{
    try {
        const findUser = await User.find();
        console.log(findUser);
        if(!findUser) throw new Error("Users not found in DB");
        return findUser;
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}

module.exports ={addUserToDB,getUserfromDB};

