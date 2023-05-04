import { Box, Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import Header from "./Header";
import { UserAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import Register from "./Register copy";

export default function BusinessRegister(props) {
  //declaring states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registrated, setRegistrated] = useState("");
  const [nameOfUser, setNameOfUser] = useState("");
  const [existingUser, setExinstingUser] = useState(false)
  const [existingEmail, setExinstingEmail] = useState(false)
  const [rigthPassword, setRightPassword] = useState(false)
  const [error, setError] = useState(false)
  const [partIndicator, setPartIndicator] = useState(1)
  const navigate = useNavigate();
  const { createUser } = UserAuth();
  const { user } = UserAuth();
  const { logout } = UserAuth();

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
          if(name != "home"){
            navigate(`/tracks/${name}`)
          }
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
      
      <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} marginTop={"20px"}>
      <Typography sx={{textAlign:"center", marginTop:"10px"}} variant="h5">Create your Business account</Typography>
            <Typography sx={{textAlign:"center",marginBottom:"25px", marginTop:"10px"}} variant="h7"> Register your venue and let people be part of your journey</Typography>
            </Box>
      <Grid display={"flex"} justifyContent={"center"} gap={10}>
      {partIndicator==1?
      !user ? (
         <Grid>
        <form onSubmit={createUserSubmit}>
         {/*  <Grid sx={{border: "1px solid black", borderRadius:"15px", display:"flex", width:"500px", height:"600px", justifyContent:"center", alignItems:"center"}}>*/}
          <Grid >
            <Box display={"flex"} flexDirection={'column'} justifyContent={"center"} alignItems={"center"}>
            <Typography sx={{textAlign:"center", marginBottom:"25px"}} variant="h6">Contact Person account</Typography>
            <Button variant="outlined" sx={{color:"black", borderColor:"#d6d6d6", width:'100%', margin:"10px"}}>Sign up with Google</Button>
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
            {/*<Button variant="outlined" sx={{width:"100%", color:"black", marginTop:"20px",backgroundColor:"#d6d6d6"}}>
              <Typography>Get Started</Typography>{" "}
      </Button>*/}
          </Grid>
         {/* </Grid>*/}
         
        </form>
        </Grid>
      ) : (
        ""
      ):""}
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
      <Register getUpData={props.getUpData}
                  getUpData2={props.getUpData2}
                  getDownData={props.getDownData}
                  getDownData2={props.getDownData2}
                  partInd={partIndicator}/>
  
      </Grid>
      <Box display={"flex"} flexDirection={"column"}>
      <Box display={"flex"} justifyContent={"center"} marginTop={"30px"}>
        <Box width={"150px"}>
        <hr style={{  backgroundColor: partIndicator ==1 ? "black":"#d4d4d4" , boxShadow:"none" }} />
        <Typography sx={{textAlign:"center", marginTop:"10px"}}>Part 1</Typography>
        </Box>
        <Box width={"150px"}>
            <hr style={{  backgroundColor: partIndicator ==1 ? "#d4d4d4":"black", boxShadow:"none" }}/>
        <Typography sx={{textAlign:"center", marginTop:"10px"}}>Part 2</Typography>
            </Box>
      </Box>
      <Button size="large" variant="outlined" sx={{color:"black", margin:"20px"}} onClick={()=> setPartIndicator(2)}>{partIndicator==1 ? "Go next step": "Create your account"} </Button>
      </Box>
    </div>
  );
}
