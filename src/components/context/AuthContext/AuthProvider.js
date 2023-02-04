import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../../firebase/firebase.config';


export const authContext = createContext();

const auth = getAuth(app);

const googleAuth = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);

    const signup = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signin = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const modifyInfo = (updateinfo) => {

        return updateProfile(auth.currentUser, updateinfo);
    }

    const modifyPassword = (email) => {

        return sendPasswordResetEmail(auth, email);
    }

    const googleSignin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleAuth);
    }

    const logout = () => {
        // setLoading(true);
        localStorage.removeItem('json-token');
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setLoading(false);
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, [])

    const authValue = {
        signup,
        signin,
        user,
        modifyInfo,
        modifyPassword,
        googleSignin,
        logout,
        loading,
        setLoading
    };
    return (
        <authContext.Provider value={authValue}>
            {children}
        </authContext.Provider>
    );
};

export default AuthProvider;