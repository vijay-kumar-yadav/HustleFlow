import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "./context/AuthContext";
import { useHistory } from "react-router-dom";

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError("")
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        } catch {
            setError("Failed to log in")
        }

        setLoading(false)
    }

    return (
        <>
            <div className="container" style={{ marginTop: "80px" }} >
                <div >

                    <Card className="bg-secondary bg-opacity-10">
                        <Card.Body>
                            <h2 className="text-center mb-4">Log In</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" ref={emailRef} required />
                                </Form.Group>
                                <Form.Group id="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" ref={passwordRef} required />
                                </Form.Group>
                                <Button disabled={loading} className="w-100 mt-3 bg-opacity-10" type="submit">
                                    {loading ? <div class="spinner-border text-success" role="status">
                                        <span class="sr-only"></span>
                                    </div> : "Log In"}
                                </Button>
                            </Form>
                            {/* <div className="w-100 text-center mt-3">
                                <Link to="/ForgetPassword" className=" text-decoration-none text-danger">Forgot Password</Link>
                            </div> */}
                        </Card.Body>
                    </Card>
                    {/* <div className="w-100 text-center mt-2">
                        Need an account? <Link to="/signup" className=" text-decoration-none">Sign Up</Link>
                    </div> */}
                </div>
            </div>
        </>
    )
}