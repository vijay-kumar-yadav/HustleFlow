import React, { useEffect, useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../context/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { getDocs, collection, updateDoc, doc, increment } from "firebase/firestore"
import adminIMG from "../../images/admin.png"
import { db } from "../../firebase"

export default function Profile() {
    // const [questionList, setQuestionList] = useState([]);
    const [question, setQuestion] = useState(0)
    const [answer, setAnswer] = useState(0)
    const [totalQues, setTotalQues] = useState(0)
    const [totalAns, setTotalAns] = useState(0)
    const [totalUser, setTotalUser] = useState(0)
    const emailRef = useRef()
    const nameRef = useRef()


    // const passwordRef = useRef()
    // const passwordConfirmRef = useRef()
    const { currentUser, updateName } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()


    if (!currentUser) {
        history.push('/Error')
    }
    const getQues = async () => {
        const getCollectionRef = collection(db, "questions")
        const data = await getDocs(getCollectionRef)
        // setQuestionList(data.docs)
        return data.docs
    }
    const getUsers = async () => {
        const getCollectionRef = collection(db, "users")
        const data = await getDocs(getCollectionRef)
        // setQuestionList(data.docs)
        return data.docs.length
    }

    const getAns = async () => {
        const getCollectionRef = collection(db, "answers")
        const data = await getDocs(getCollectionRef)
        // setQuestionList(data.docs)
        return data.docs
    }
    const updatePerformance = async (total) => {
        const docRef = doc(db, "users", currentUser.uid)
        await updateDoc(docRef, {
            performance: increment(total)
        });
    }
    useEffect(
        () => {
            getQues().then((response) => {
                // console.log(response)
                // console.log(response)
                // console.log(currentUser.uid)
                setTotalQues(response.length)
                const questionAttempted = response.filter((res) => res.data().userId === currentUser.uid)
                // console.log(questionAttempted[0].data().userId)
                setQuestion(questionAttempted.length)
                // console.log(currentUser.uid)
            })
            getAns().then((response) => {
                // console.log(response)
                // console.log(response)
                // console.log(currentUser.uid)
                setTotalAns(response.length)

                const answerAttempted = response.filter((res) => res.data().answerByID === currentUser.uid)
                // console.log(answerAttempted[0].data().answerByID)
                setAnswer(answerAttempted.length)
                // console.log(currentUser.uid)
            })
            getUsers().then((data) =>
                setTotalUser(data))
        }, []
    )


    function handleSubmit(e) {

        e.preventDefault()
        // if (passwordRef.current.value !== passwordConfirmRef.current.value) {
        //     return setError("Passwords do not match")
        // }

        const promises = []
        setLoading(true)
        setError("")

        // if (emailRef.current.value !== currentUser.email) {
        //     promises.push(updateEmail(emailRef.current.value))
        // }
        // if (passwordRef.current.value) {
        //     promises.push(updatePassword(passwordRef.current.value))
        // }
        if (nameRef.current.value) {
            promises.push(updateName(nameRef.current.value))
        }

        Promise.all(promises)
            .then(() => {
                history.push("/")
            })
            .catch(() => {
                setError("Failed to update account")
            })
            .finally(() => {
                setLoading(false)
            })

    }
    // function handleNFT() {
    //     Moralis.enableWeb3();
    //     async function transfernft() {

    //         const options = {
    //             type: 'erc721',
    //             receiver: '0x3014BdE9a0b9E6e0dfBE52c9f3eCa4Ca9E5bc17C',
    //             contract_address: '0x757108b12b540056af2ea0810d76fea2f45fdcb5',
    //             token_id: 2
    //         }
    //         let result = await Moralis.transfer(options);
    //     }
    // }
    return (
        <>
            {
                currentUser.displayName !== "admin" ?
                    <>

                        <Card className="container mt-5">
                            <Card.Body>
                                <div className="d-flex justify-content-center">

                                    <div style={{ width: "fit-content" }} className="bg-black rounded-circle  overflow-hidden">
                                        <img alt="user" src={currentUser.photoURL} style={{ width: "80px", height: "80px" }} />
                                    </div>
                                </div>
                                <hr />
                                <h5 className="text-center">Stats</h5>
                                <div className="container">
                                    <p>Question : <span>{question}</span></p>
                                    <p>Answer : <span>{answer}</span></p>
                                </div>
                            </Card.Body>
                        </Card>
                        <Card style={{ marginTop: "80px" }} className="container">
                            <Card.Body>
                                <h2 className="text-center mb-4">Update Profile</h2>
                                {error && <Alert variant="danger">{error}</Alert>}
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group id="email">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            disabled={true}
                                            ref={emailRef}
                                            required
                                            defaultValue={currentUser.email}
                                        />
                                    </Form.Group>
                                    <Form.Group id="name">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type="name"
                                            ref={nameRef}
                                            defaultValue={currentUser.displayName}
                                        />
                                    </Form.Group>
                                    {/* <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                ref={passwordRef}
                                placeholder="Leave blank to keep the same"
                            />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control
                                type="password"
                                ref={passwordConfirmRef}
                                placeholder="Leave blank to keep the same"
                            />
                        </Form.Group> */}
                                    {/* <a ref="src/components/moralis.html">Gift NFT</a> */}
                                    {/* <Button disabled={loading} className="w-100 mt-3" type="submit">
                                    </Button> */}
                                </Form>
                            </Card.Body>
                        </Card>
                        <div className="w-100 text-center mt-2">
                            <Link to="/" className="text-decoration-none text-primary">Cancel</Link>
                        </div>
                    </> :
                    <>

                        <Card className="container mt-5">
                            <Card.Body>
                                <div className="d-flex justify-content-center">

                                    <div style={{ width: "fit-content" }} className="bg-black rounded-circle  overflow-hidden">
                                        <img alt="user" src={adminIMG} style={{ width: "80px", height: "80px" }} className="bg-light" />
                                    </div>
                                </div>
                                <hr />
                                <h5 className="text-center">Admin Stats</h5>
                                <div className="container">
                                    <p>Total User: <span>{totalUser}</span></p>
                                    <p>Total Question Posted : <span>{totalQues}</span></p>
                                    <p>Total Answer Posted : <span>{totalAns}</span></p>
                                </div>
                            </Card.Body>
                        </Card>
                        <Card style={{ marginTop: "80px" }} className="container">
                            <Card.Body>
                                {/* <h2 className="text-center mb-4">Total User Details</h2> */}

                                {/* {error && <Alert variant="danger">{error}</Alert>}
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group id="email">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            disabled={true}
                                            ref={emailRef}
                                            required
                                            defaultValue={currentUser.email}
                                        />
                                    </Form.Group>
                                    <Form.Group id="name">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type="name"
                                            ref={nameRef}
                                            defaultValue={currentUser.displayName}
                                        />
                                    </Form.Group>

                                    <Button disabled={loading} className="w-100 mt-3" type="submit">
                                        Update
                                    </Button>
                                </Form> */}
                                <Button >
                                    <a href="./moralis.html">

                                        Gift NFT
                                    </a>
                                </Button>
                            </Card.Body>
                        </Card>
                        {/* <div className="w-100 text-center mt-2">
                            <Link to="/" className="text-decoration-none text-primary">Cancel</Link>
                        </div> */}

                    </>

            }


        </>
    )
}