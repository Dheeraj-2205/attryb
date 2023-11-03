const  mongoose = require("mongoose")

const connectDb = () =>{
    mongoose.connect(process.env.MONGO_URI).then((data)=>{
        console.log(`database is connected successfully ${data.connection.host}`)
    })
}

module.exports = connectDb