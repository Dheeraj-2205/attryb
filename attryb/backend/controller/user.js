const { json } = require('express');
const User = require('../models/User.js');

exports.registerUser = async(req,res)=>{

    try {
        const {name, email,password } = req.body;
        let user = await User.findOne({email});

        if(user){
            return res.status(400).json({
                success : false,
                message : "User already exist"
            });
        };

        user = await User.create({
            name, email ,password
        });
   
        const token = await user.generateToken();
    
        const options = {
            expires : new Date(Date.now() + 2 * 24 *60 *60 *1000),
            httpOnly: true,
            sameSite : process.env.NODE_ENV  === "Development" ? "lax" :"none",
            secure : process.env.NODE_ENV  === "Development" ? false : true
        }

    
        res.status(201).cookie("token", token , options).json({
            success : true,
            message : "User created Succefully",
            user,
            token
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }

}



exports.login = async(req,res) =>{
try {
    const { email, password } = req.body;

    const user = await User.findOne({ email })
      .select("+password");

    //   console.log(user)

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }

    const token = await user.generateToken();

    const options = {
      expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite : process.env.NODE_ENV  === "Development" ? "lax" :"none",
      secure : process.env.NODE_ENV  === "Development" ? false : true
    };

    res.status(200).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}


exports.logout = async(req,res) =>{
    try {
        res.cookie("token", null,{
            expires : new Date(Date.now()),
            sameSite : process.env.NODE_ENV  === "Development" ? "lax" :"none",
            secure : process.env.NODE_ENV  === "Development" ? false : true
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

exports.myProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      console.log(user)
  
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
        console.log("object")
      res.status(500).json({
        
        success: false,
        message: error.message,
      });
    }
  };