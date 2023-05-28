import { Box } from "@mui/system";
import { Button, Fab, Grid, IconButton, List, ListItem, ListItemText, MenuItem, Select, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

export default function  ResetPassword(props) {
const [description, setDescription] = useState("");
const [success, setSuccess] = useState(false);
const navigate = useNavigate();
const {passwordReset} = UserAuth()


 
 function closePopup(e){
  if (e.target === e.currentTarget) {
    if(success){
navigate("/")
props.indicator(false)
    } else{
    // Clicked on the parent element, not on any of its descendants
    props.indicator(false)}
  } }

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
    <Box sx={{width:"300px", backgroundColor:"white", borderRadius:"10px", padding:"30px"}}
    >
 {!success? <Box> <Typography variant="h5">Password reset!</Typography>
 <Typography marginTop={"30px"} variant="h6">We will send an email to the provided email account to reset the password.</Typography>
 <Typography marginTop={"30px"} variant="h6">Email account:</Typography>
  
 
        <textarea id="desc" onChange={(e) => setDescription(e.target.value)} />
        <Button sx={{color:"black",backgroundColor:"#d6d6d6", width:'100%', marginTop:'10px'}} 
        onClick={()=>passwordReset(description, setSuccess)}
         variant="fulfilled">Reset password</Button></Box>: <Typography sx={{color:"green"}}>Password reset email sent successfully.
          </Typography>}
  </Box>
</Box>
)

}
