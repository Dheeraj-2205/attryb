const { json } = require('express');
const User = require('../models/User.js');

exports.registerUser = async(req,res)=>{

    try {
        const {name, email,password } = req.body;
        let user = await User.findOne({email});

        if(user){
            return res.status(400).json({
                success : true,
                message : "User already exist"
            });
        };

        user = await User.create({
            name, email ,password
        });
   
        const token = await user.generateToken();
    
        const options = {
            expires : new Date(Date.now() + 2 * 24 *60 *60 *1000),
            httpOnly: true
        }

    
        res.status(201).cookie("token", token , options).json({
            success : true,
            message : "User created Succefully",
            user,
            token
        })
    } catch (error) {
        return res.status(500).json({
            success : true,
            message : error.message
        })
    }

}

exports.login = async(req,res)=>{
    try {
        const { email ,password } = req.body;    

        // if (!email || !password) {
        //     return res.status(400).json({
        //         success : false,
        //         message : "Please Enter Your Email"
        //     })
        // }

        const user =  await User.findOne({email}).select("+password")

        if(!user){
            return res.status(400).json({
                success : false,
                message : "User does not exists"
            })
        }

        const isMatch = await user.matchPassword;
        console.log( "64" + isMatch );

        if (!isMatch) {
            return res.status(400).json({
              success: false,
              message: "Incorrect password",
            });
        }

        const token = await user.generateToken();

        console.log(token)

        // localStorage.setItem("token", token);
    
        const options = {
            expires : new Date(Date.now() + 2 * 24 *60 *60 *1000),
            httpOnly: true,
            sameSite: 'strict'
        }
    
        res.status(200).cookie("token", token , options).json({
            success : true,
            user,
            token
        })


    } catch (error) {
        return res.status(500).json({
            success : true,
            message : error.message
        })
    }
}

exports.logout = async(req,res) =>{
    try {
        res.cookie("token", null,{
            expires : new Date(Date.now()),
            httpOnly : true
        }).json({
            success : true,
            message : "Logout Successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

