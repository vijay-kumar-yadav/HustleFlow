import React, { useEffect, useState } from "react";
import Content from "../Content";
import { db } from "../../firebase";
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore'
import { useAuth } from "../context/AuthContext";
const Homepage = () => {
    const { currentUser } = useAuth();

    //settiing user details when logged in
    // const [question, setQuestion] = useState(0)
    // const [answer, setAnswer] = useState(0)
    const [postList, setPostList] = useState([]);
    const getQues = async () => {
        console.log("I am ques called")

        const getCollectionRef = collection(db, "questions")
        const data = await getDocs(getCollectionRef)
        setPostList(data.docs)
        if (currentUser) {
            const response = data.docs
            const requireQues = response.filter((res) => res.data().userId === currentUser.uid)
            // setQuestion(requireQues.length)
            getAns(requireQues.length)
        }
    }
    const getAns = async (ques) => {
        console.log("I am ans called")

        const getCollectionRef = collection(db, "answers")
        const data = await getDocs(getCollectionRef)
        const response = data.docs
        const requireAns = response.filter((res) => res.data().answerByID === currentUser.uid)
        console.log(requireAns)
        // setAnswer(requireAns.length)
        const ans = requireAns.length
        updateUser(ques, ans);


    }
    const updateUser = async (ques, ans) => {
        console.log(ques, ans)
        const getCollectionRef = doc(db, "users", currentUser.uid)
        await updateDoc(getCollectionRef, {
            userName: currentUser.displayName,
            performance: (Number(ques) + Number(ans)),
            questionAttempted: ques,
            answerAttempted: ans
        })

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
                            return (
                                <Content key={j} question={question} id={doc.id} />)
                        }) :
                        <div class="d-flex justify-content-center">
                            <div class="spinner-border" role="status">
                                <span class="visually-hidden"></span>
                            </div>
                        </div>

                    }
                </div>
            </div>

        </>
    )
}

export default Homepage;
