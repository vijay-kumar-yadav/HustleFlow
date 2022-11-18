import React from 'react'
import HTMLReactParser from "html-react-parser";
import Likes from "./Likes";

const Comments = (props) => {
    return (
        <>
            <div class="container mb-2 p-2 rounded-4  bg-opacity-25 bg-secondary" key={props.index}>
                <div class="row">
                    <div class="col-1">
                        <Likes id={props.id} askedBy={props.ans.askedBy} />
                    </div>

                    <div class="col">
                        {HTMLReactParser(props.ans.content)}
                    </div>
                </div>
                <div className="d-flex justify-content-end" >
                    <p className="font-italic mt-0 text-end" >- {props.ans.answerBy} </p>
                </div>
            </div>
            {/* <div
                key={props.index}
                className=" justify-content-center mb-2 p-2 rounded-4 bg-opacity-25 bg-info d-flex ">


                <div>

                  
                </div>
            </div> */}
        </>
    )
}

export default Comments