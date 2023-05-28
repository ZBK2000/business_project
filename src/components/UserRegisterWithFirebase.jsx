import { Box, Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import Header from "./Header";
import { UserAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion"
import { toast } from "react-toastify";
import Loading from "./loading";
import ProvideUserName from "./ProvideUserName";

export default function UserRegisterWithFirebase(props) {
  //declaring states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registrated, setRegistrated] = useState("");
  const [nameOfUser, setNameOfUser] = useState("");
  const [existingUser, setExinstingUser] = useState(false)
  const [existingEmail, setExinstingEmail] = useState(false)
  const [rigthPassword, setRightPassword] = useState(false)
  const [provideUserName, setProvideUserName] = useState(false)
  const [error, setError] = useState(false)
  const navigate = useNavigate();
  const { createUser } = UserAuth();
  const { user } = UserAuth();
  const { logout } = UserAuth();
  const { update } = UserAuth();
const {googleSignIn} = UserAuth()
  const {name} = useParams()
  
  //this is for simply to renavige if someone wants to enter this enpoint regardless they are loggid in
  

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
            
            props.indicator(false)
            toast(`Welcome ${nameOfUser}` )
          //  navigate(`/`)
          
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

  const handleGoogleSignIn = async ()=>{
    try {
      const user1 =  await googleSignIn()
      console.log(user1)
      const data = { password: user1.email };
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/GoogleSignIn`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const accepted = await response.json();
      console.log(accepted)
      if(JSON.stringify(accepted.msg)==JSON.stringify("successful login")){
        await update(user1, accepted.userName)
        props.indicator(false)
        toast(`Welcome ${accepted.userName}` )
       
       // navigate(`/`)
      } else if(accepted.msg=="successfully registrated"){
        
          setProvideUserName(true)
          
      }
    } catch (error) {
      console.log(error)
    }
  }

  function closePopup(e){
    if (e.target === e.currentTarget) {
      // Clicked on the parent element, not on any of its descendants
      props.indicator(false)
    } 
  }
  function openLogin(e){
    
      // Clicked on the parent element, not on any of its descendants
      props.indicator(false)
      props.indicatorforLogin(true)
    
  }


  return (
    
    <Box  onClick={(e)=>closePopup(e)} sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      bgcolor: 'rgba(0, 0, 0, 0.5)', // Background color with opacity
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999, // Higher z-index to make sure it's above everything else
    }}>
      <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}>
      <Box sx={{width:"400px",height:"600px", backgroundColor:"white", borderRadius:"10px", padding:"10px"}}>
    <div>
      {!user ? (
        
        <form onSubmit={createUserSubmit}>
         {/*  <Grid sx={{border: "1px solid black", borderRadius:"15px", display:"flex", width:"500px", height:"600px", justifyContent:"center", alignItems:"center"}}>*/}
          <Grid >
            <Box display={"flex"} flexDirection={'column'} justifyContent={"center"} alignItems={"center"}>

            <Typography variant="h5">Create your account</Typography>
            <Typography sx={{textAlign:"center",marginBottom:"25px", marginTop:"10px"}} variant="h7">Sign up now and join others in various activities</Typography>
            <Button onClick={handleGoogleSignIn} variant="outlined" sx={{color:"black", borderColor:"#d6d6d6", width:'100%', margin:"10px"}}>Sign up with Google</Button>
            <Button variant="outlined" sx={{color:"black",borderColor:"#38569E", width:'100%', margin:"10px", color:"#38569E"}}>Sign up with Facebook</Button>
            
            <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <hr style={{  backgroundColor: "#d6d6d6",width:"100px",boxShadow:"none"  }}/>
              <Typography margin={"10px"} sx={{color:"#d6d6d6"}}>OR</Typography>
              <hr style={{  backgroundColor: "#d6d6d6",width:"100px",boxShadow:"none" }} />
            </Box>
            </Box>
            
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
            <Button variant="outlined" type="submit" sx={{width:"100%", color:"black", marginTop:"20px",backgroundColor:"#d6d6d6"}}>
              <Typography >Get Started</Typography>{" "}
            </Button>
            <Typography sx={{width:"100%", textAlign:"center", marginTop:"10px", cursor:"pointer"}} onClick={(e)=>openLogin(e)}> <u>Already have an account</u></Typography>
          </Grid>
         {/* </Grid>*/}
        </form>
      ) : (
        <Loading/>
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
    </Box>

    </motion.div>
    {provideUserName && <ProvideUserName indicator={setProvideUserName} indicator2={props.indicator}/>}
    </Box>
  );
}
