import { Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "./FooterNOTUSED";
import Header from "./Header";
import { UserAuth } from "../context/AuthContext";

export default function LoginWithFirebase(props) {
  //declaring states and consts
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameOfUser, setNameOfUser] = useState("");
  const [registrateds, setRegistrateds] = useState("");
  const { user } = UserAuth();
  const navigate = useNavigate();
  const { name } = useParams();
  const { signIn } = UserAuth();

  //this is for simply to renavige if someone wants to enter this enpoint regardless they are loggid in
  if (user) {
    navigate("/");
  }

  //this is the submit form for logging in
  const SignInUser = async (event) => {
    event.preventDefault();

    //here we first make the sign in with firebase and if that successful, we retrieve data from mongodb
    await signIn(email, password);
    const data = { password: email };
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const accepted = await response.json();

    setRegistrateds(accepted);
    props.getUpData(accepted);
    if (accepted) {
      props.getUpData2(accepted.user);
      if (name != "home") {
        navigate(`/tracks/${name}`);
      }
    }
  };

  return (
    <div className="logindiv">
      <Header
        title="Login to your account"
        success={registrateds}
        name={email}
      />
      {!user ? (
        <div>
          {name != "home" ? (
            <Typography margin={"15px"}>
              Please log in to see the page of that track!
            </Typography>
          ) : (
            ""
          )}
          <form onSubmit={SignInUser}>
            <div>
              <label htmlFor="names">
                <Typography>Email:</Typography>{" "}
              </label>
              <input
                type="email"
                id="names"
                onChange={(e) => setEmail(e.target.value)}
              />
              {/*           <label htmlFor="name"><Typography>Name:</Typography> </label>
            <input
              type="text"
              id="name"
              onChange={(e) => setNameOfUser(e.target.value)}
            /> */}
              <label htmlFor="prices">
                <Typography>Password:</Typography>{" "}
              </label>
              <input
                type="password"
                id="prices"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button>
                <Typography>LOG IN</Typography>{" "}
              </button>
            </div>
          </form>
        </div>
      ) : (
        ""
      )}
      {user ? (
        <Typography sx={{ marginTop: "15px" }} variant="h5" className="success">
          Welcome{" "}
        </Typography>
      ) : (
        ""
      )}

      <Typography variant="h5" className="success">
        {registrateds}
      </Typography>
      {registrateds == "something went wrong" ? (
        <Typography variant="h5" className="success">
          Please try again
        </Typography>
      ) : (
        ""
      )}
    </div>
  );
}
