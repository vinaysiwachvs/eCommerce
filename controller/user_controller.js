const mongoose = require('mongoose');
const User = require('../model/user_model');
const UserService = require('../service/user_service');

const createUser = async(req,res) =>{
    try {
        const {name, email, password } = req.body
        const user = new User({name,email,password});
        const result =  await UserService.addUser(user);
        res.status(201).json({
            message: "User Created Successfully"
        })
    } catch (error) {
        console.log(error.message);
        res.status(400).json({
            message: error.message
        })
    }
}


const getUser = async(req,res)=>{
    try {
        const result = await UserService.getUserfromDB();
        res.status(200).send(result);
    } catch (error) {
        console.log(error.message);
        res.status(400).json({
            message:error.message
        })
    }
}



module.exports = {createUser,getUser};