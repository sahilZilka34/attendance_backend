const User = require("../models/user")

exports.isLoggedIn = async(req,res,next)=>{
    const userID = req.params.userid
    if(!userID){
        res.status(400).json
        ({
            success :false,
            Message : "User not found or Signed Up"
        })
    }
    const userExists = await User.findOne({ where: { userID } });
    req.user = userExists;
    next();
}