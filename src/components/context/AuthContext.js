import React, { useContext, useState, useEffect } from "react"
import { auth } from "../../firebase"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}
const googleLoginProvider = new GoogleAuthProvider()

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    async function signup(email, name, password) {
        const response = await auth.createUserWithEmailAndPassword(email, password)
        return response.user.updateProfile({ displayName: name })

    }
    const signInWithGoogle = () => {
        signInWithPopup(auth, googleLoginProvider).then((response) => {
            console.log(response)
        }).catch((err) => {
            console.log(err)
        })
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        return auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }
    function updateName(name) {
        return currentUser.updateProfile({ displayName: name })
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
        updateName,
        signInWithGoogle
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}