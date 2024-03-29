import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useAuth } from "./context/AuthContext"

export default function ForgotPassword() {
    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setMessage("")
            setError("")
            setLoading(true)
            await resetPassword(emailRef.current.value)
            emailRef.current.value = "";

            setMessage("Check your inbox for further instructions")
            setTimeout(() => {
                setMessage("");
            }, 2000);
        } catch {
            setError("Failed to reset password")
        }

        setLoading(false)
    }

    return (
        <>
            <div className="container " >

                <Card style={{ marginTop: "80px" }} className="bg-secondary bg-opacity-10">
                    <Card.Body>
                        <h2 className="text-center mb-4 ">Password Reset</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {message && <Alert variant="success">{message}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" ref={emailRef} required />
                            </Form.Group>
                            <Button disabled={loading} className="mt-3 w-100" type="submit">
                                Reset Password
                            </Button>
                        </Form>
                        <div className="w-100 text-center  mt-3">
                            <Link to="/login" className="text-decoration-none">Login</Link>
                        </div>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    Need an account? <Link to="/signup" className="text-decoration-none">Sign Up</Link>
                </div>
            </div>
        </>
    )
}