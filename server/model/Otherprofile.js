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


const otherSchema =  mongoose.Schema({
    "profile" : {
        type : String
    },
   
})
let Otherpro = mongoose.model("Otherpro", otherSchema)
module.exports = Otherpro