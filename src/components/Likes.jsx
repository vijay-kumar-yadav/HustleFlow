import React, { useState } from 'react'
import { useAuth } from './context/AuthContext'
import upVoteIMG from "../images/upVote.png"
import upVotedIMG from "../images/upVoted.png"
import { db } from '../firebase'
import { arrayUnion, doc, updateDoc, getDoc, arrayRemove } from 'firebase/firestore'
import $ from 'jquery'

const Likes = (props) => {
    const { currentUser } = useAuth();
    const [upVote, setUpVote] = useState(false)
    const [likeCount, setLikeCount] = useState(0)
    const docRef = doc(db, "answers", props.id)
    const createLikes = async () => {
        const user = currentUser.uid;
        await updateDoc(docRef, {
            likes: arrayUnion(user)
        });
    }
    const deleteLikes = async () => {
        const user = currentUser.uid;

        await updateDoc(docRef, {
            likes: arrayRemove(user)
        });
    }
    const getLikes = async () => {
        const likes = await getDoc(docRef)
        return likes
    }

    getLikes().then((likes) => {
        setLikeCount(likes.data()["likes"].length)
        const user = currentUser ? currentUser.uid : "";
        currentUser && likes.data()["likes"].includes(user) ? setUpVote(true) : setUpVote(false)
    })

    function addLike() {
        if (!currentUser) {
            return
        }

        !upVote ?
            createLikes().then(
                () => {

                    getLikes().then((likes) => {
                        const user = currentUser.uid;
                        setLikeCount(likes.data()["likes"].length)
                        likes.data()["likes"].includes(user) ? setUpVote(true) : setUpVote(false)

                    })


                }
            ) :
            deleteLikes().then(
                () => {

                    getLikes().then((likes) => {
                        const user = currentUser.uid;

                        setLikeCount(likes.data()["likes"].length)
                        likes.data()["likes"].includes(user) ? setUpVote(false) : setUpVote(true)
                    })
                }
            )

    }
    if (currentUser) {
        $("#upVote").css("cursor", "pointer");
    }
    return (
        <>
            <div className='d-block' style={{ width: "fit-content", marginRight: "2px" }}>
                <img onClick={addLike} alt='like' id="upVote" src={upVote ? upVotedIMG : upVoteIMG} style={{ width: "30px", height: "30px" }}></img>
                <p className='text-center'>{likeCount}</p>
            </div>


        </>
    )
}

export default Likes