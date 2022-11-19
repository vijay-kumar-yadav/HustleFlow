import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { MoralisProvider } from "react-moralis";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

    <>

        <BrowserRouter>
            <MoralisProvider appId="e8BlSjTunaKv32V1Jy4ObcxrFfCeDXPt4wmwLVirvFz6QOOdrm4JwsvtRX9LkVUv">

                <App />
            </MoralisProvider>
        </BrowserRouter>
    </>
);





