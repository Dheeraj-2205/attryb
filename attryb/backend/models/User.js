const mongoose =require('mongoose');
const jwt =require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true , "Name is required"]
    },

    email : {
        type : String,
        required : [true , "Email is required"]
    },

    password : {
        type : String ,
        rquired : [true, "Password is required"]
    }

});

userSchema.methods.generateToken = function (){
    return jwt.sign({_id : this.id} ,process.env.JWT_TOKEN)
}

module.exports = mongoose.model("User",  userSchema);


