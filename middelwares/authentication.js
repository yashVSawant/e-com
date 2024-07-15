const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

const authenticate = async(req,res,next)=>{

    try{
        const fullToken = req.header('Authorization');
        if(fullToken){
            const token = fullToken.split(" ")[1];
            const user = jwt.verify(token,process.env.KEY);
            const getUser = await User.findById(user.userId);
            if(getUser){
                req.user = getUser;
                next();
            }else{
                res.status(404).json({success:false,message:'user not found!'});
            }
        }else{
            res.status(401).json({success:false,message:'invalid token!'});
        }
        
    }catch(err){
        res.status(500).json({success:false,message:'something went wrong!'});
    }
}

module.exports = {authenticate};