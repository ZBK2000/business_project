import { Button, Typography } from "@mui/material";
import { useState } from "react";
import Header from "./Header";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function UserRegisterWithFirebase() {
  //declaring states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registrated, setRegistrated] = useState("");
  const [nameOfUser, setNameOfUser] = useState("");
  const [existingUser, setExinstingUser] = useState(false)
  const [existingEmail, setExinstingEmail] = useState(false)
  const [rigthPassword, setRightPassword] = useState(false)
  const [error, setError] = useState(false)
  const navigate = useNavigate();
  const { createUser } = UserAuth();
  const { user } = UserAuth();
  const { logout } = UserAuth();
  
  //this is for simply to renavige if someone wants to enter this enpoint regardless they are loggid in
  if (user) {
    navigate("/");
  }

  //this is the submit form for registering
  const createUserSubmit = async (event) => {
    event.preventDefault();
 
    
    //first saving into mongodb and if thats successful we create the account with firebase
    try {
      const data = { user: nameOfUser, password: email };
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/signup`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const accepted = await response.text();
      if (accepted === "successfully registrated") {
        const userInfo = await createUser(email, password, nameOfUser);
        console.log(userInfo)
        if(userInfo){
          await fetch(`${import.meta.env.VITE_BACKEND_URL}/usersave`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          });
        }
      } else if (accepted === "username"){
          setExinstingUser(true)
          setExinstingEmail(false)
          
      } else if (accepted === "username and email"){
        setExinstingUser(true)
        setExinstingEmail(true)
    } else if (accepted === "email"){
      setExinstingUser(false)
      setExinstingEmail(true)
  }
      /*      else{
        console.log(accepted)
       } */

      setRegistrated(accepted);
    } catch (error) {
      if (error.code === "auth/weak-password"){
        setExinstingEmail(false)
        setExinstingUser(false)
          setRightPassword(true)
      } else{
        setExinstingEmail(false)
        setExinstingUser(false)
        setError(true)
      }
     
    }
  };
  return (
    <div>
      <Header title="Create your account" />
      {!user ? (
        <form onSubmit={createUserSubmit}>
          <div>
            <label htmlFor="name">
              <Typography>Email:</Typography>{" "}
            </label>
            <input
              type="email"
              id="name"
              onChange={(e) => setEmail(e.target.value)}
               style={{borderColor: existingEmail?"red":""}}
            />
            <label htmlFor="names">
              <Typography>Name:</Typography>{" "}
            </label>
            <input
              type="text"
              id="names"
              onChange={(e) => setNameOfUser(e.target.value)}
              style={{borderColor: existingUser?"red":""}}
            />
            <label htmlFor="price">
              <Typography>Password: [least 6 character]</Typography>{" "}
            </label>
            <input
              type="password"
              id="price"
              onChange={(e) => setPassword(e.target.value)}
              style={{borderColor: rigthPassword?"red":""}}
            />
            <button>
              <Typography>Create Account</Typography>{" "}
            </button>
          </div>
        </form>
      ) : (
        ""
      )}
      {existingUser && existingEmail && (
        <Typography sx={{ marginTop: "15px" }} variant="h5" className="success">
          Email and username already used
        </Typography>
      )}
      {existingUser && !existingEmail && (
        <Typography sx={{ marginTop: "15px" }} variant="h5" className="success">
          username already used
        </Typography>
      )}
      {!existingUser && existingEmail && (
        <Typography sx={{ marginTop: "15px" }} variant="h5" className="success">
          Email already used
        </Typography>
      )}
       {rigthPassword && (
        <Typography sx={{ marginTop: "15px" }} variant="h5" className="success">
          Not powerful enough password (please provide at least 6 characters)
        </Typography>
      )}
      {error && (
        <Typography sx={{ marginTop: "15px" }} variant="h5" className="success">
          Some error occured please try again
        </Typography>
      )}
    </div>
  );
}
