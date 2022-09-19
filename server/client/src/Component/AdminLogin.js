import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./AdminLogin.css";
export const AdminLogin = () => {
    const naviagte = useNavigate()
    const [tokenid, setTokenid] = useState('')
    const [adminData, setAdminData] = useState({
        email: "",
        pwd: ""
    })
    const Input_Handler = (e) => {
        setAdminData({ ...adminData, [e.target.name]: e.target.value })
    }
    const Form_Handler = async (e) => {
        e.preventDefault();

        await axios.post("/adminlogin", adminData, { headers: { "Content-Type": "application/json" } }).then((res) => {


            console.log(res.data.token);
            setTokenid(res.data.token)
            sessionStorage.setItem("admintoken", JSON.stringify(res.data.token))
            setAdminData({
                email: "",
                pwd: ""
            })
            alert("success")
            naviagte("/admindash")


        }).catch((error) => {
            console.log(error);
            if (error.response.status == 420) {
                alert("Invalid Email")
            }
            if (error.response.status == 421) {
                alert("Invalid Password")
            }
        })

    }


    return (
        <> 
         <div className="loginbackground">
            <div className="logincontent">
                <h4>Welcome Admin</h4>
                <form action="" onSubmit={Form_Handler}>
                    <div className="mb-3 mt-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" placeholder="Enter email" name="email" value={adminData.email} onChange={Input_Handler} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="pwd" className="form-label">Password</label>
                        <input type="password" className="form-control" id="pwd" placeholder="Enter password" name="pwd" value={adminData.pwd} onChange={Input_Handler} />
                    </div>

                    <input type="submit" value="Login" className='btn btn-success loginbutton' />
                </form>
            </div>
        </div>
        </>
    )
}
