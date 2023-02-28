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
        if(userInfo){
          await fetch(`${import.meta.env.VITE_BACKEND_URL}/usersave`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          });
        }
      }
      /*      else{
        console.log(accepted)
       } */

      setRegistrated(accepted);
    } catch (error) {
      console.log("something went wrong");
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
            />
            <label htmlFor="names">
              <Typography>Name:</Typography>{" "}
            </label>
            <input
              type="text"
              id="names"
              onChange={(e) => setNameOfUser(e.target.value)}
            />
            <label htmlFor="price">
              <Typography>Password:</Typography>{" "}
            </label>
            <input
              type="password"
              id="price"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button>
              <Typography>Create Account</Typography>{" "}
            </button>
          </div>
        </form>
      ) : (
        ""
      )}
      {user && (
        <Typography sx={{ marginTop: "15px" }} variant="h5" className="success">
          successfully created
        </Typography>
      )}
    </div>
  );
}
