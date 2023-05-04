import { Box, Button, Typography } from "@mui/material";
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
  const [loginerror, setLoginError] = useState(0)
  const { user } = UserAuth();
  const navigate = useNavigate();
  const { name } = useParams();
  const { signIn } = UserAuth();

  //this is for simply to renavige if someone wants to enter this enpoint regardless they are logged in
  if (user) {
    navigate("/");
  }

  //this is the submit form for logging in
  const SignInUser = async (event) => {
    event.preventDefault();

    //here we first make the sign in with firebase and if that successful, we retrieve data from mongodb
    try {
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
      if (name != "home" && name != "favourite" ) {
        navigate(`/tracks/${name}`);
      } 
    }
  } catch (error) {
    console.log(error)
    if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password'){
        setLoginError(1)
    } else {
      setLoginError(2)
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
          {name != "home" && name != "favourite" ? (
            <Typography margin={"15px"}>
              Please log in to see the page of that track!
            </Typography>
          ) : (
            ""
          )}
          {name == "favourite" ? (
            <Typography margin={"15px"}>
              You have to log in to save favourite tracks
            </Typography>
          ) : (
            ""
          )}
          <form onSubmit={SignInUser}>
          <Box display={"flex"} flexDirection={'column'} justifyContent={"center"} alignItems={"center"}>

<Typography variant="h5">Log in to your account</Typography>
<Typography sx={{textAlign:"center",marginBottom:"25px", marginTop:"10px"}} variant="h7">Welcome back, please enter your details</Typography>
<Button variant="outlined" sx={{color:"black", borderColor:"#d6d6d6", width:'100%', margin:"10px"}}>Continue with Google</Button>
<Button variant="outlined" sx={{color:"black",borderColor:"#38569E", width:'100%', margin:"10px", color:"#38569E"}}>Continue with Facebook</Button>

<Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
<hr style={{  backgroundColor: "#d6d6d6",width:"100px",boxShadow:"none"  }}/>
  <Typography margin={"10px"} sx={{color:"#d6d6d6"}}>OR</Typography>
  <hr style={{  backgroundColor: "#d6d6d6",width:"100px",boxShadow:"none" }} />
</Box>
</Box>
            <div>
              <label htmlFor="names">
                <Typography>Email:</Typography>{" "}
              </label>
              <input
                type="email"
                id="names"
                onChange={(e) => setEmail(e.target.value)}
                style={{borderColor: loginerror==1?"red":""}}
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
                style={{borderColor: loginerror==1?"red":""}}
              />
               <Button type="submit" variant="outlined" sx={{width:"100%", color:"black", marginTop:"20px",backgroundColor:"#d6d6d6"}}>
              <Typography>Log in</Typography>{" "}
               </Button>
            </div>
          </form>
        </div>
      ) : (
        ""
      )}
      {loginerror == 1 ? (
        <Typography sx={{ marginTop: "15px" }} variant="h5" className="success">
          wrong email/password 
        </Typography>
      ) : (
        ""
      )}
    {loginerror == 2 ? (
        <Typography sx={{ marginTop: "15px" }} variant="h5" className="success">
          Error please try again
        </Typography>
      ) : (
        ""
      )}
     
    </div>
  );
}
