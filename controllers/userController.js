const User = require('../models/user');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const {generateShortUUID,generateToken} = require('../config/generateToken');

// Signup user
const signUp = asyncHandler(async (req, res) => {
  try {
    const { username, password,phoneNumber } = req.body;
    console.log(req.body);
     // check the feilds
    if(!username || !phoneNumber || !password){
        res.send({
            status  : 400,
            message : "Please enter all the required feilds"
        });
        throw new Error("Please Enter all the Feilds");
    }
    // check the user
    const userExists = await User.findOne({ where: { phoneNumber } });
    if(userExists){
        res.send({
            status : 400,
            message :  "User already exists"
        });
        throw new Error("User already exists");
    }
    const newpassword = password.toString();
    const hashedPassword = await bcrypt.hash(newpassword, 10);
    const userID = generateShortUUID();
    console.log(userID);

    const user = await User.create({ userID,username, password: hashedPassword,phoneNumber });

    res.status(201).json({
        user,
        token : generateToken(user.phoneNumber)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Login user
const login = asyncHandler(async(req, res) => {
    // console.log(req.user);
    const { phoneNumber, password } = req.body;
    const newpassword = password.toString();
    const user = await User.findOne({ where: { phoneNumber } });
    if(user && (await user.comparePassword(newpassword))){
        res.json({
            status : 200,
            message : "User logged in successfully",
            ID: user.userID,
            name: user.username,
            PhoneNumber: user.phoneNumber,
            role: user.role,
            token : generateToken(user.phoneNumber)
        });
    }else{
        console.log(error);
        res.status(401);
        throw new Error("Invalid Number or password")
    }
});

// List all users
const listUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

module.exports = {
  signUp,
  login,
  listUsers,
};
