import { createContext, useEffect, useState } from 'react';
import { useContext } from "react"

import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, GoogleAuthProvider, signInWithPopup, sendEmailVerification, sendPasswordResetEmail} from "firebase/auth"
import {auth} from "../components/firebase"
const UserContext = createContext()

export const AuthContextProvider = ({children}) =>{
    const [user, setUser] =useState({})

    const createUser = async (email, password, nameOfUser) => {
     
          // Create the user with email and password
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
          // Set the user's display name
          await updateProfile(userCredential.user,{
            displayName: nameOfUser,
          } )
        
          await sendEmailVerification(userCredential.user)
          return userCredential.user;
       
      };

      async function passwordReset(mail, success) {
        try {
          
          await sendPasswordResetEmail(auth, mail);
          console.log('Password reset email sent successfully.');
          success(true)
        } catch (error) {
          console.error('Error sending password reset email:', error);
        }
      }
      
    async function update (user, nameOfUser){
        await updateProfile(user,{
            displayName: nameOfUser,
          } )
    }
    const googleSignIn = async()=>{
        const provider = new GoogleAuthProvider()
      const result =  await signInWithPopup(auth, provider)
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            
            return user
            
             
    }  

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
           
            setUser(currentUser)
        })
        return  () => unsubscribe()
        
    }, [])

    const logout = () =>{
        return signOut(auth)
    }

    const signIn = (email, password) =>{
        return signInWithEmailAndPassword(auth, email, password)

    }
    return(
        <UserContext.Provider value={{createUser, user, logout, signIn, googleSignIn, update, passwordReset}}>
            {children}
        </UserContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(UserContext);
    
  }