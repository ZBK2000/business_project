import { createContext, useEffect, useState } from 'react';
import { useContext } from "react"
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile} from "firebase/auth"
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
        
      
          return userCredential.user;
       
      };

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
        <UserContext.Provider value={{createUser, user, logout, signIn}}>
            {children}
        </UserContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(UserContext);
    
  }