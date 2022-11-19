import React, { useState } from "react";
// import questionIMG from "../images/question.png"
// import "./Navbar.css";
// import userIMG from "../Images/user.png"
import adminIMG from "../images/admin.png"

import { Link, useHistory } from "react-router-dom";
import { Alert, NavDropdown } from "react-bootstrap";
import { useAuth } from "./context/AuthContext";

const Navbar = () => {
    // const [userName, setUsername] = useState()
    const [error, setError] = useState("")
    const { currentUser, logout, signInWithGoogle } = useAuth()
    const history = useHistory();
    async function handleLogout() {
        setError('');
        try {
            await logout();
            history.push("/")
        } catch {
            setError('Failed to log out');
        }
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark ">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        {/* <img src={questionIMG} width="30" height="30" alt="logo" style={{ marginRight: "10px" }} /> */}
                        HustleFlow</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/AskQuestion">Ask Question</Link>
                            </li>
                        </ul>
                        {/* <form className="d-flex" role="search">

                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        </form> */}
                        {/* {currentUser ? currentUser.displayName : ""} */}
                        {currentUser ?
                            <>
                                <div className="d-flex">

                                    <div style={{ width: "fit-content", marginRight: "10px" }} className="bg-black rounded-circle  overflow-hidden">
                                        <img className="bg-light" src={adminIMG} alt="user" style={{ width: "30px", height: "30px" }} />
                                    </div>
                                    <NavDropdown className="text-white" title={
                                        currentUser.displayName
                                    }>
                                        <Link className="dropdown-item" to="/Profile" >Profile</Link>
                                        <NavDropdown.Item onClick={handleLogout} >Log out</NavDropdown.Item>
                                    </NavDropdown>
                                </div>
                            </>
                            :
                            <>

                                <button className="btn btn-danger button-google" style={{ marginRight: "5px" }}  ><Link to="/Login" className=" text-decoration-none text-light">Admin Login</Link></button>
                                <button className="btn btn-primary button-google" onClick={signInWithGoogle}>Login With Google</button>

                            </>


                        }
                        {/* <Link className="btn btn-primary button-google" to="/login">Login</Link> */}
                    </div>
                </div>
            </nav>
            {error && <Alert variant="danger">{error}</Alert>}
        </>
    )
}

export default Navbar