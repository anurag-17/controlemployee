import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
export const AdminNav = () => {
    const navigate = useNavigate()
    const logout = () => {
        sessionStorage.removeItem("admintoken")
        navigate("/")
    }

    return (
        <>
            <div className="container">
                <nav class=" navbar-expand-sm bg-ligth navbar-dark">

                    <div class="container-fluid">

                        <ul class="nav justify-content-center">
                            <li class="nav-item">
                                <Link to="/employeeform" className='nav-link'>Register Employee</Link>

                            </li>
                            <li className='nav-item"'>
                                <button className='btn nav-link' onClick={logout}>Logout</button>
                            </li>

                        </ul>
                    </div>

                </nav>
            </div>
        </>
    )
}
