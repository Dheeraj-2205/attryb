const mongoose =require('mongoose');
const jwt =require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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
        rquired : [true, "Password is required"],
        select : false
    },

    role : {
        type : String,
        default : "user"
    }

});

userSchema.pre("save",async function (next){
    if(this.isModified("password")){
        this.password =  bcrypt.hash(this.password ,10)
    };
    next();
});


userSchema.methods.matchPassword = async function () {
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateToken = function (){
    return jwt.sign({_id : this.id} ,process.env.JWT_TOKEN)
}

module.exports = mongoose.model("User",  userSchema);


