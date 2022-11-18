import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap"
// import { useAuth } from "../Contexts/AuthContext";

import { Link, useHistory } from "react-router-dom";

export default function Login() {
    console.log("Hi I am Login")
    const emailRef = useRef()
    const passwordRef = useRef()
    // const { login } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    function handleSubmit() {

    }

    return (
        <><div className="container">

            <Card >
                <Card.Body>
                    <h2 className="text-center mb-4">Log In</h2>
                    {/* {error && <Alert variant="danger">{error}</Alert>} */}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100 mt-3" type="submit">
                            {loading ? <div class="spinner-border text-success" role="status">
                                <span class="sr-only"></span>
                            </div> : "Log In"}
                        </Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/forgot-password">Forgot Password?</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Need an account? <Link to="/Signup">Sign Up</Link>
            </div>
        </div>
        </>
    )
}