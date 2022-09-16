const mongoose = require("mongoose");
const db = 'mongodb+srv://akashhardia:VFjl68aqyxVsX4SN@cluster0.tlbchiy.mongodb.net/controlemployee?retryWrites=true&w=majority'
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