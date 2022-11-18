import React, { useEffect, useState } from "react";
import Content from "../Content";
import { db } from "../../firebase";
import { collection, getDocs } from 'firebase/firestore'
const Homepage = () => {
    const [postList, setPostList] = useState([]);
    const getQues = async () => {
        const getCollectionRef = collection(db, "questions")
        const data = await getDocs(getCollectionRef)
        setPostList(data.docs)
        console.log()
        console.log(data.docs[0].id)

    }
    useEffect(
        () => {
            getQues()
        }, []
    )

    return (
        <>

            <div className="container" >
                <h1 className="mb-3 text-center">Questions</h1>
                <div className="container">

                    {postList.length !== 0 ?
                        postList.map((doc, j) => {
                            const question = doc.data();
                            return (<Content key={j} question={question} id={doc.id} />)
                        }) :
                        <div class="d-flex justify-content-center">
                            <div class="spinner-border" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>

                    }
                </div>
            </div>

        </>
    )
}

export default Homepage;
