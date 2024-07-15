const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.login = async(req,res)=>{
    try {
        const {name , password} = req.body;
        const user = await User.findOne({name:name});
        if(user){
            console.log(user)
            bcrypt.compare(password,user.password,(err,result)=>{
                if(err){
                    res.status(500).json({success:false ,message:'something went wrong in compare!'})                   
                }
                else if(result){
                    res.status(201).json({success:true ,message:'User login succesfull',token:generateAccessToken(user._id,user.name)})
                }else{
                    res.status(401).json({success:false ,message:'incorrect password !'})
                }
            })
        }else{
            res.status(404).json({success:false , message:"user not found!"})
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({success:false , message:"something went wrong!"})
    }
}

exports.signup = (req,res)=>{
    try {
        const {name , password} = req.body;
        if(name && password){
            const saltRound = 10;
            bcrypt.hash(password,saltRound,async(err,hash)=>{
                try{
                    const user = new User({name:name ,password:hash});
                    await user.save();
                    res.status(201).json({success:true , message:"successfully signup!"});
                }catch(err){
                    res.status(500).json({success:false , message:"something went wrong!"});
                }  
            })
            
        }else{
            res.status(403).json({success:false , message:"invalid input !"})
        }
    } catch (err) {
        
        res.status(500).json({success:false , message:"something went wrong!"})
    }
}

function generateAccessToken(id,name){
    return jwt.sign({userId:id , name:name},process.env.KEY);
}