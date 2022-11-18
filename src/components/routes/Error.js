import React from "react";

const Error = () => {
    return (<>
        <div className="bg-secondary d-flex vh-100 justify-content-center align-items-center">
            <div className="text-center ">
                <h3 style={{ cursor: "default" }} > <i className="fa fa-exclamation-triangle text-warning"
                    aria-hidden="true" /> 404 ERROR</h3>
                <h6 style={{ cursor: "default" }} >Page Not Found</h6>
                {/* <button className="btn btn-primary mt-2">Home</button> */}
            </div>
        </div >

    </>)
}


export default Error