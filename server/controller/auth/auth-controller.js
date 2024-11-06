const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');  
const user = require('../../models/user');
const registerUser  = async(req , res) => {
    const {userName , email , password} = req.body;
    const checkEmail = await user.findOne({email});
    if(checkEmail) 
        return res.json({sucess : false , message : "email already exists",})
    const checkUser = await user.findOne({userName});
    if(checkUser) 
        return res.json({sucess : false ,message : "username already exists"});
    try{
        const hashPassword = await bcrypt.hash(password , 12);
        const newUser = new user({
            userName , email , password : hashPassword,
        })
        await newUser.save()
        res.status(200).json({success : true , message : "Registration succesful",});
    }catch(err){
        console.log(err);
        res.status(500).send("error");
    }
}
const loginUser = async(req , res) => {
    
    try{
        const { email , password} = req.body;
        const checkEmail = await user.findOne({email});
        if(!checkEmail) 
            return res.json({success : false , message : "user not exists",})
        const checkPass = await bcrypt.compare(password , checkEmail.password)
        if(!checkPass) 
            return res.json({success : false , message : "password is Invalid",}) 
        const token = jwt.sign({
            id : checkEmail._id,
            role : checkEmail.role,
            email : checkEmail.email,
            userName : checkEmail.userName
        },'CLIENT_SECERT_KEY' , {expiresIn : '60m'})
        res.cookie('token' , token , {httpOnly : true , secure : false})
        .json({success : true , message : "you are logged in",
            user : {
                email : checkEmail.email,
                role : checkEmail.role,
                id : checkEmail.id
            }

        });
    }catch{
        console.log(err);
        res.status(500).send({message : "error"});
    }
}
const logout = (req, res) => {
    console.log("logout");
    res.clearCookie("token", { path: '/' }).json({
        success: true,
        message: "logged out successfully"
    });
}

const authMiddleware = async(req , res , next) => {
    const token = req.cookies.token;
    if(!token) return res.status(401).json({
        success : false,
        message :"unathorized user!" 
    })
    try{
        const decoded = jwt.verify(token , 'CLIENT_SECERT_KEY');
        req.user = decoded;
        next()
    }catch{
        res.status(401).json({
            success : false,
            message :"unathorized user!" 
        })
    }
}

module.exports = {registerUser , loginUser , logout , authMiddleware};


