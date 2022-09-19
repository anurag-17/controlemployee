const mongoose = require("mongoose");
const db = process.env.MONGO_URL
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