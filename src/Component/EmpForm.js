import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const EmpForm = () => {
    const navigate = useNavigate()
    const [otherprofile, setOtherprofile] = useState('')
    const [fetched, setFetched] = useState([])
    const [employeedata, setEmployeedata] = useState({
        ename: "",
        experience: "",
        profile: "",
        mobile: ""
    })
    useEffect(() => {
        const fetch = async () => {
            await axios.post("/fetchother").then((res) => {

                setFetched(res.data.result)

            }).catch((error) => {
                console.log(`fetch${error}`);
            })
        }
                 
        fetch()
    }, )


    const Input_Handler = (e) => {
        e.preventDefault()
        setEmployeedata({ ...employeedata, [e.target.name]: e.target.value })

    }
    const Form_Handler = async (e) => {
        e.preventDefault();
        console.log(employeedata);

        await axios.post("http://localhost:4000/employeeform", employeedata, { headers: { "Content-Type": "application/json" } }).then((res) => {
            console.log(res);
            setEmployeedata({
                ename: "",
                experience: "",
                profile: "",
                mobile: ""
            })
            
        }).catch((error) => { console.log(error); })

    }
    const input_other = (e) => {
        setOtherprofile({ ...otherprofile, [e.target.name]: e.target.value })
    }
    const otheroption = async (e) => {
        e.preventDefault()
        await axios.post("http://localhost:4000/otherprofile", otherprofile, { headers: { "Content-Type": "application/json" } }).then((res) => {
            console.log(res);
            
            setOtherprofile({
                other: ""
            })
            
        }).catch((error) => { console.log(error); })
    }


    return (
        <>
            <div className="container contentform">

                <h3>Employee Form</h3>
                <form action="" onSubmit={Form_Handler}>
                    <div className="form-floating mb-3 mt-3">
                        <input type="text" className="form-control" id="email" placeholder="Enter Name" name="ename" value={employeedata.ename} required onChange={Input_Handler} />
                        <label htmlFor="email" className="form-label">Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <select className="form-select" name='experience' required value={employeedata.experience} onChange={Input_Handler}>
                            <option selected disabled value="" hidden>No. of year</option>
                            <option value="0">0 yr</option>
                            <option value="1+">1+ yr</option>
                            <option value="2+">2+ yr</option>
                            <option value="3+">3+ yr</option>
                            <option value="4+">4+ yr</option>
                            <option value="5+">5+ yr</option>
                            <option value="6+">6+ yr</option>
                            <option value="7+">7+ yr</option>
                            <option value="8+">8+ yr</option>
                            <option value="9+">9+ yr</option>
                            <option value="10+">10+ yr</option>
                            <option value="11+">11+ yr</option>

                        </select>
                        <label htmlFor="pwd" className="form-label">Experience</label>
                    </div>
                    <div className="form-floating mb-3">
                        <select className="form-select" name='profile' value={employeedata.profile} onChange={Input_Handler} >
                            <option disabled selected hidden value="">Please select profile</option>
                            <option value="UI">UI</option>
                            <option value="UX<">UX</option>
                            <option value="PHP">PHP</option>
                            <option value="ANGULAR">ANGULAR</option>
                            <option value="REACT JS">REACT JS</option>
                            <option value="REACT NATIVE">REACT NATIVE</option>
                            <option value="PYTHON">PYTHON</option>
                            <option value="NODE JS">NODE JS</option>
                            <option value="MERN">MERN</option>
                            <option value="MEAN">MEAN</option>
                            <option value="SHOPIFY">SHOPIFY</option>
                            <option value="WORD PRESS">WORD PRESS</option>
                            <option value="FLUTTER">FLUTTER</option>
                            <option value="WIX">WIX</option>
                            <option value="BUSINESS DEVELOPMENT">BUSINESS DEVELOPMENT</option>

                            {fetched.map((items, index) => {
                                return (
                                    <option key={items} value={items.profile}>{items.profile}</option>
                                )
                            })}
                        </select>

                        <label htmlFor="pwd" className="form-label">Profile</label>
                        <div className='otherinput'>
                            <input type="text" name="other" id="" onChange={input_other} />
                            <button className='btn btn-light' onClick={otheroption}>Add</button>
                        </div>
                    </div>
                    <div className="form-floating mb-3 mt-3">
                        <input type="text" className="form-control" placeholder="Enter mobile no." pattern='[0-9]{10}' name="mobile"
                            value={employeedata.mobile} required onChange={Input_Handler} />
                        <label htmlFor="mobile" className="form-label">Contact No.</label>
                    </div>

                    {/* 
                    <div className="form-floating mb-3 mt-3" onChange={Input_Handler}>
                            <input type="text" className="form-control" id="" placeholder="Enter other profile" name="profileother" />
                            <label htmlhtmlFor="other" className="form-label">Other Profile</label>
                        </div> */}
                    <input type="submit" value="Submit" className='btn btn-secondary buttondox' />
                    <Link to="/admindash" className='btn btn-secondary'>Go Back</Link>
                </form>

            </div>
        </>
    )
}
