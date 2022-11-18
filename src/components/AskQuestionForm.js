import React, { useState } from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar"
import "./AskQuestionForm.css";
import "react-quill/dist/quill.snow.css";
import { TagsInput } from "react-tag-input-component"
import { useAuth } from "./context/AuthContext";
import { addDoc, collection } from 'firebase/firestore'
import { db } from "../firebase";


const AskQuestionForm = () => {

    const { currentUser } = useAuth();
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [tagSelected, setTagSelected] = useState([]);
    const [userInfo, setuserInfo] = useState({
        title: '',
        description: '',
    });
    const ondescription = (value) => {
        setuserInfo({
            ...userInfo,
            description: value
        });
    }
    const onChangeValue = (e) => {
        setuserInfo({
            ...userInfo,
            title: e.target.value
        });
    }
    const postQues = () => {
        if (userInfo.title === '' || userInfo.description === '' || tagSelected.length === 0) {
            setError("Please fill all fields before posting.")
            setTimeout(() => {
                setError("");
            }, 2000)
            return
        }
        if (!currentUser) {
            setError("Please Login !")
            setTimeout(() => {
                setError("");
            }, 2000)
            return
        }
        else
            setError("")


        try {
            createPost().then(() => {
                setSuccess("Question Posted")
                setTimeout(() => {
                    setSuccess("");
                }, 2000)
                // history.push('/');
                setuserInfo({
                    title: "",
                    description: ""
                })
                document.getElementById("titleForm").setAttribute("value", "")
                setTagSelected([])
            });
        }
        catch {
            setError("Question not posted")
            setTimeout(() => {
                setError("");
            }, 2000)
        }
        // if (userInfo.title && tagSelected.length !== 0) {

        // }
        // console.log(currentSessionInfo)
    }
    const date = new Date()
    const postCollectionRef = collection(db, "questions")
    const createPost = async () => {
        let user = currentUser.uid;
        // console.log(user)
        await addDoc(postCollectionRef, {
            title: userInfo.title,
            content: userInfo.description,
            tags: tagSelected,
            username: currentUser.displayName,
            userId: user,
            askedDate: date
            // questionId:

        })
    }
    // console.log(currentUser.uid)
    function stopform(e) {
        e.preventDefault();
        return false
    }
    return (
        <>
            <div className=" d-flex justify-content-center container-fluid pt-0 p-2 w-75">
                <form className="row" onSubmit={stopform}>
                    <div className="col-12 p-2" >
                        <label htmlFor="question" className="form-label h5">Title</label>
                        <p className="form-text">Be specific and imagine you’re asking a question to another person</p>
                        <input name="question" type={"text"} placeholder={"Ask Question here..."} className="form-control"
                            value={userInfo.title} onChange={onChangeValue} id="titleForm" />
                    </div>
                    <div className="col-12 p-2">
                        <label htmlFor="description" className="form-label h5">What are the details of your problem?</label>
                        <p className="form-text">Introduce the problem and expand on what you put in the title.</p>
                        <div className="form-control describe" name="description" >
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
                            {/* <p className="form-text">Char: {charCount}</p> */}
                        </div>
                    </div>
                    <div className="col-12 p-2">
                        <label htmlFor="tags" className="form-label h5">Tags</label>
                        <p className="form-text">Add up to 5 tags to describe what your question is about. And press enter.</p>
                        {/* <div id="tagDiv"></div> */}
                        {/* <input name="tags" className="form-control" onChange={onChangeTagValue} value={userInfo.tags.slice(-1)[0]} placeholder="English, C++, Java, Math..." /> */}

                        <TagsInput
                            name="tags" className="tagsInput form-control"
                            value={tagSelected}
                            onChange={setTagSelected}
                            placeHolder=" English, C++, Java, Math..."
                        />

                    </div>
                    <div className="col-12 d-flex0 ">
                        {success && <p className="text-success text-center">{success}</p>}
                        {error && <p className="text-danger text-center ">{error}</p>}
                        <button type="button" className="btn btn-primary m-2" onClick={postQues}>Post</button>
                    </div>
                </form>
            </div >

        </>
    )
}

export default AskQuestionForm;