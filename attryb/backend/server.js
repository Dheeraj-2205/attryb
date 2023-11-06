const app = require('./app');
const connectDb = require('./config/database');

process.on("uncaughtException", (err)=>{
    console.log(err.message);
    console.log(`Shutting down due to uncaught exception`);
    process.exit(1)
})



connectDb();


const server = app.listen(process.env.PORT, () =>{
    console.log(`Server is listening on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})

process.on("unhandleRejection" , (err)=>{
    console.log(`Error , ${err.message}`);
    console.log(`Shutting down the server due to unhandle promise rejction`)
    server.close(()=>{
        process.exit(1)
    })
})




