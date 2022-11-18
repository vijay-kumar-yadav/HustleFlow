import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "../EditorToolbar"
import { useAuth } from "../context/AuthContext";
// import "./AnswerQuestion.css"
import 'react-quill/dist/quill.bubble.css'
import { db } from "../../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import Comments from "../Comments";
// import { useHistory } from "react-router-dom";
// import $ from "jquery"
// import Likes from "./Likes";
// import $ from "jquery"
const AnswerQuestion = () => {
    // const history = useHistory()
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState({})
    const { currentUser } = useAuth()
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const questionId = window.location.href.split("?")[1];
    const [ansList, setAnsList] = useState([]);
    const [getData, setData] = useState({});
    const getQues = async () => {

        const getCollectionRef = collection(db, "questions")
        const data = await getDocs(getCollectionRef)
        return data.docs
    }
    const getAns = async () => {
        // const [comment, setComment] = useState([])
        const getAnswerRef = collection(db, "answers")
        const answer = await getDocs(getAnswerRef)
        return answer.docs
    }
    useEffect(
        () => {
            getQues().then((data) => {
                const docs = data.filter((doc) => doc.id === questionId)
                setLoading(false)
                return (setData(docs[0].data()))
            })
            getAns().then((data) => {
                let requireAns = data.filter((data) => data.data().questionid === questionId)
                setAnsList(requireAns)
                setComment(
                    requireAns.map((data, index) => {
                        const ans = data.data()
                        return (
                            <Comments id={data.id} index={index} ans={ans} />
                        )
                    })
                )
            })
        }, [questionId]
    )
    // console.log(docs[0].data())
    const [userInfo, setuserInfo] = useState({
        description: '',
    });
    const ondescription = (value) => {
        setuserInfo({
            ...userInfo,
            description: value
        });
    }
    const date = new Date();
    const postCollectionRef = collection(db, "answers")
    const createPost = async () => {
        await addDoc(postCollectionRef, {
            questionid: questionId,
            content: userInfo.description,
            answerAt: date,
            likes: [],
            username: currentUser.displayName

        })
    }
    const postAns = () => {
        // console.log(userInfo.description === "<p><br></p>")
        if (!currentUser) {
            setError("Please Login !")
            setTimeout(() => {
                setError("");
            }, 2000)
            return
        }
        else
            setError("")
        // console.log(typeof userInfo.description)
        if (userInfo.description === '' || userInfo.description === "<p><br></p>" || typeof userInfo.description === 'undefined') {
            setError("Please fill the answer field.")
            setTimeout(() => {
                setError("");
            }, 2000)
            return
        }
        try {
            createPost().then(() => {
                setComment(
                    ansList.map((data, index) => {
                        const ans = data.data()
                        return (
                            <Comments id={index} ans={ans} />
                        )
                    })
                )
                setSuccess("Answer Posted")
                setTimeout(() => {
                    setSuccess("");
                }, 2000)
                document.location.reload()

            });
            // history.push('/')
            setuserInfo("")
        }
        catch {
            setError("Answer not posted")
            setTimeout(() => {
                setError("");
            }, 2000)
        }
        // if (userInfo.title && tagSelected.length !== 0) {

        // }
        // console.log(currentSessionInfo)

    }
    return (
        <>
            {loading ?
                <div className="container d-flex justify-content-center align-items-center vh-100">
                    <div class="spinner-border text-primary" role="status">
                        <span class="sr-only"></span>
                    </div>
                </div> : <div className="container-fluid" >
                    <div className="container">
                        <h2 style={{ marginTop: "80px" }} className="mb-3 ">{getData.title}</h2>
                        <ul className="d-flex list-unstyled  my-auto" >
                            <li className="text-secondary" style={{
                                fontSize: "small",
                                marginRight: "5px"
                            }}>Asked by: <span className="text-dark text-capitalize">{getData.username}</span></li>
                            <li className="totalAns text-secondary ">Answer : <span className="text-dark">{ansList.length}</span></li>
                        </ul>
                        <hr />
                        <ReactQuill
                            value={getData.content}

                            readOnly={true}
                            theme={"bubble"}
                        />
                        <hr />
                        <h4 className="text-center text-bg-success">Answers</h4>
                        {
                            ansList.length !== 0 ?
                                <>
                                    {
                                        comment.map((data) => data)
                                    }
                                </>
                                : ""
                        }
                        {/* <>
                                                        <p>Likes - <span id="like">0</span></p>
                                                        <button className="btn " onClick={() => { document.getElementById("like").innerHTML = 1 }}><Likes /></button>
                                                    </> */}
                        <hr />
                        <div className="container w-100">
                            <EditorToolbar toolbarId={'t1'} />
                            <ReactQuill
                                theme="snow"
                                id="description"
                                value={userInfo.description}
                                onChange={ondescription}
                                placeholder={"Write Description Here..."}
                                modules={modules('t1')}
                                formats={formats}
                            />
                        </div>
                        <div className="text-center mt-3">
                            {success && <p className="text-success text-center">{success}</p>}
                            {error && <p className="text-danger text-center ">{error}</p>}
                            <button className="btn btn-primary" onClick={postAns}>
                                PostAns
                            </button>
                        </div>
                        <hr />

                    </div>

                </div>}
        </>
    )
}

export default AnswerQuestion