const express = require("express")
const app = express()
const bodyparser = require("body-parser")
const cors = require("cors")
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const jwt = require("jsonwebtoken")
app.use(cors());
app.set("view engine", "ejs");
let urlencoded = bodyparser.json();
const Admin = require("./model/AdminModel")
const Employee = require("./model/EmployeeModel")
const Otherpro = require("./model/Otherprofile")



app.post("/adminlogin", urlencoded, (async (req, res) => {

    console.log(req.body);
    try {
        const { email, pwd } = req.body
        let checker = await Admin.findOne({ email })
        console.log(`checker${checker}`);
        if (!(checker)) {
            return res.status(420).send("Invalid email")
        }
        const pwdchecker = await Admin.findOne({
            pwd
        })
        if (!(pwdchecker)) {
            return res.status(421).send("Invalid Password");

        } 
        const key = process.env.JWT_SECRET;
        const token = jwt.sign({
            user_id: email,
        },
            key,
            {
                expiresIn: process.env.JWT_TIMEOUT,
            }
        )

        res.json({ token })
    } catch (error) {
        console.log(error);

    }

}))


app.post("/employeeform", urlencoded, (async (req, res) => {
    console.log(req.body.mobile);
    let employeedata = new Employee({
        ename: req.body.ename, 
        experience: req.body.experience, 
        profile: req.body.profile, 
        mobile: req.body.mobile
    })
    employeedata.save().then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    })
    res.json({
        message: "Uploaded",
        status: "224"
    })
}))
app.get("/adminplace", verifytoken, (req, res) => {
    // console.log(req.query[0]);
    res.json({
        message: "welcome admin"
    })
});

function verifytoken(req, res, next) {
    let token = req.query[0];
    console.log(token);
    if (token != undefined) {
        let Rtoken = token.replaceAll('"', "");

        jwt.verify(Rtoken, process.env.JWT_SECRET, (error, authdata) => {
            if (error) {
                res.status(403)
            }
            else {
                console.log(authdata);
            } next();
        });
    }
    else {
        res.json({ message: "error" });

    }
}
app.post("/fetchdata", (req, res)=>{
    Employee.find({}, (error, result)=>{
        if (error) {
            console.log(`fetchdata${error}`);
        }
        res.send({result})
    })
})
app.post("/otherprofile",urlencoded, ((req, res)=>{
    let otherdata = new Otherpro({
        profile: req.body.other
    }) 
    otherdata.save().then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    })
}))
app.post("/fetchother", (req, res)=>{
    Otherpro.find({}, (error, result)=>{
        if (error) {
            console.log(`fetchdata${error}`);
        }
        res.send({result})
    })
})

app.listen(process.env.PORT, () => {
    console.log("Server is running on 4000 port");
})