import { collection, getDocs } from 'firebase/firestore';
import React, { useState } from 'react';
import Content from '../Content';
import { db } from '../../firebase';

const Home = () => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    try {
        const questionRef = collection(db, 'questions')
        getDocs(questionRef).then((response) => {
            setLoading(false)
            console.log()
        })
    }
    catch {
        setError("Data not found!")
    }
    return (
        <>
            {loading ? <div class="spinner-grow" role="status">
                <span class="visually-hidden"></span>
            </div>
                : ""

            }
            {/* <Content question={ } id={ } /> */}
        </>
    )
}

export default Home