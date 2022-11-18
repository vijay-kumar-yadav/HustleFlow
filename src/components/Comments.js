import React from 'react'
import HTMLReactParser from "html-react-parser";
// import Likes from "./Likes";

const Comments = (props) => {
    return (
        <>
            <div
                key={props.index}
                className=" justify-content-center mb-2 p-2 rounded-4 bg-opacity-25 bg-info d-flex ">

                {/* <Likes id={props.id} askedBy={props.ans.username} /> */}
                <div>
                    {HTMLReactParser(props.ans.content)}
                    <div className="d-flex justify-content-end" >
                        <p className="font-italic mt-0 text-end" >By - {props.ans.username} </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Comments