import React, { useEffect, useState } from "react";
import "./content.css"
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";


const Content = (props) => {
    const question = props.question;
    const [ansList, setAnsList] = useState(0);

    function getQuestionDesc() {
        const htmlEl = document.createElement('body');
        htmlEl.innerHTML = question.content;
        return htmlEl.innerText;
    }
    const tags = question.tags;
    // const date = new Date()
    // console.log(props.id)
    const getAns = async () => {
        const getAnswerRef = collection(db, "answers")
        const answer = await getDocs(getAnswerRef)
        return answer.docs
    }
    useEffect(() => {
        getAns().then((data) => {
            let requireAns = data.filter((data) => data.data().questionid === props.id)
            setAnsList(requireAns.length)
        })
    }, [props.id])
    return (
        <>
            <div className="card mt-2">
                <div className="card-header">
                    <ul className="d-flex list-unstyled  my-auto" >
                        <li className="totalAns">Answer : {ansList}</li>
                    </ul>
                </div>
                <div className="card-body">
                    <Link className="card-title h5 text-decoration-none " role='button' to={"/AnswerQuestion?" + props.id}>{question.title}</Link>
                    <p className="card-text fs-6 content">{getQuestionDesc()}</p>
                    <div className="d-flex justify-content-between ">
                        <div className="d-flex">
                            {
                                tags.map((tag, i) => {
                                    return (<p key={i} className="tag">{tag}</p>)
                                })
                            }
                        </div>
                        <p className="askedby">
                            Asked By -   <span className=" text-capitalize"> {question.username} </span>
                        </p>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Content