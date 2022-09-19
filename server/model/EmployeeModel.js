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


const employeeSchema =  mongoose.Schema({
    "ename": {
        type: String
    },
    "experience": {
        type: String
    },
    "profile": {
        type: String
    },
    "mobile": {
        type: String
    }
})

let Employee = mongoose.model("Employee", employeeSchema)
module.exports = Employee;