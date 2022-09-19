const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });


const db = "mongodb+srv://akashhardia:VFjl68aqyxVsX4SN@cluster0.tlbchiy.mongodb.net/controlemployee?retryWrites=true&w=majority"
mongoose.connect(db,{
    useNewUrlParser: true ,
    useUnifiedTopology : true,
   
}).then(()=>{
    console.log("connected to database");
}).catch((error)=>{
    console.log(`admin ${error}`);
})

const adminSchema =  mongoose.Schema({
    "email" : {
        type : String
    },
    "pwd" : {
        type : String
    }
})
let Admin = mongoose.model("Admin", adminSchema)
module.exports = Admin