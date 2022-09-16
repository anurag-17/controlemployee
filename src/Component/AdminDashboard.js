import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AdminNav } from './AdminNav'

export const AdminDashboard = () => {
    const navigate = useNavigate()
    const [tokenid, setTokenid] = useState(sessionStorage.getItem("admintoken"))
    const [query, setQuery] = useState("")
    const [empdata, setEmpdata] = useState([])
    useEffect(() => {
        axios.get("http://localhost:4000/adminplace", { params: tokenid }).then((res) => {
            console.log(res);

            if (res.data.message == "error") {
                navigate("/")
            }

        }).catch((error) => {
            console.log(error);
        })
        const fetch = async () => {
            await axios.post("http://localhost:4000/fetchdata").then((res) => {

                setEmpdata(res.data.result)
                
            }).catch((error) => {
                console.log(`fetch${error}`);
            })
        }

        fetch()
    }, [])


    return (
        <>
        <AdminNav/>

            <div className="container ">
                <h4 className='contentform'>Employee Details</h4>
               <div>
                <input type="text" name="search" id="" placeholder='Search...' onChange={e=> setQuery(e.target.value)}/>
               </div>

                <table className='table table-hover contentform'>
                    <thead>
                        <tr>
                            <td>Employee Name</td>
                            <td>Profile</td>
                            <td>Experience(in years)</td>
                            <td>Contact No.</td>
                        </tr>
                    </thead>
                    <tbody>
                        {empdata
                        .filter(items=> items.ename.toLowerCase().includes(query)||items.profile.toLowerCase().includes(query))
                        .map((items, index) => {
                            return (
                                <tr key={index}>
                                    <td>{items.ename}</td>
                                    <td>{items.profile}</td>
                                    <td>{items.experience}</td>
                                    <td>{items.mobile}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}
